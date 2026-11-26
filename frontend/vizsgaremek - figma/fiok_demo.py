"""Cozy Cup – helyi fiók-demó, nem éles backend. Python 3, külső csomag nélkül."""
import argparse
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
from collections import defaultdict, deque
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parent
COOKIE = "cozy_demo_session"
TTL = 8 * 3600
ROUNDS = 600_000
PUBLIC = {".html", ".css", ".js", ".png", ".webp", ".jpg", ".jpeg", ".svg", ".ico"}
DB = None
ATTEMPTS = defaultdict(deque)
from threading import Lock
LOCK = Lock()


def load_catalog():
    # A közös, projektben tárolt JS-katalógus ismert szerkezetéből olvassuk az árakat.
    source = (ROOT / "termekek.js").read_text(encoding="utf-8")
    result = {}
    for block in re.findall(r"\{([^{}]+)\}", source):
        pid = re.search(r"\bid:\s*(\d+)\s*,", block)
        name = re.search(r'\bnev:\s*("(?:[^"\\]|\\.)*")\s*,', block)
        price = re.search(r"\bar:\s*(\d+)\s*,", block)
        if pid and name and price:
            key = int(pid.group(1))
            if key in result:
                raise ValueError("Ismétlődő termékazonosító")
            result[key] = (json.loads(name.group(1)), int(price.group(1)))
    if not result:
        raise ValueError("Üres termékkatalógus")
    return result

CATALOG = load_catalog()

def connection():
    db = sqlite3.connect(DB, timeout=5)
    db.row_factory = sqlite3.Row
    return db

def init():
    with connection() as db:
        db.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY, username TEXT NOT NULL COLLATE NOCASE UNIQUE,
                firstname TEXT NOT NULL, lastname TEXT NOT NULL,
                email TEXT NOT NULL COLLATE NOCASE UNIQUE,
                salt BLOB NOT NULL, password_hash BLOB NOT NULL
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id),
                expires INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS demo_orders (
                number TEXT PRIMARY KEY, request_id TEXT NOT NULL UNIQUE,
                payload_hash TEXT NOT NULL, user_id INTEGER REFERENCES users(id),
                created_at INTEGER NOT NULL, contact_json TEXT NOT NULL,
                items_json TEXT NOT NULL, subtotal INTEGER NOT NULL,
                shipping INTEGER NOT NULL, total INTEGER NOT NULL,
                payment TEXT NOT NULL, status TEXT NOT NULL
            );
        """)

def password_hash(password, salt):
    return hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, ROUNDS)

def public_user(row):
    return {k: row[k] for k in ("id", "username", "firstname", "lastname", "email")}

def token_hash(token):
    return hashlib.sha256(token.encode()).hexdigest()

class Handler(BaseHTTPRequestHandler):
    def json_response(self, status, data, cookie=None):
        payload = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        if cookie:
            self.send_header("Set-Cookie", cookie)
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def error(self, status, message):
        self.json_response(status, {"error": message})

    def session_token(self):
        try:
            jar = SimpleCookie(self.headers.get("Cookie", ""))
            return jar[COOKIE].value if COOKIE in jar else ""
        except Exception:
            return ""

    def user(self):
        token = self.session_token()
        if not token:
            return None
        with connection() as db:
            row = db.execute(
                "SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires>?",
                (token_hash(token), int(time.time()))
            ).fetchone()
        return public_user(row) if row else None

    def do_GET(self):
        path = urlsplit(self.path).path
        if path == "/api/auth/me":
            self.json_response(200, {"user": self.user()})
            return
        if path.startswith("/api/"):
            self.error(404, "Ismeretlen végpont.")
            return
        file = (ROOT / unquote(path).lstrip("/")).resolve() if path != "/" else ROOT / "home.html"
        if not file.is_relative_to(ROOT) or file.suffix.lower() not in PUBLIC or not file.is_file():
            self.send_error(404)
            return
        import mimetypes
        content = file.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mimetypes.guess_type(file.name)[0] or "application/octet-stream")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def do_POST(self):
        path = urlsplit(self.path).path
        if path not in {"/api/auth/register", "/api/auth/login", "/api/auth/logout", "/api/orders"}:
            self.error(404, "Ismeretlen végpont.")
            return
        # Csak a helyi, azonos eredetű frontend küldhet módosító kérést.
        host = self.headers.get("Host", "")
        port = self.server.server_port
        if host not in {f"127.0.0.1:{port}", f"localhost:{port}"} or self.headers.get("Origin") != "http://" + host:
            self.error(403, "Nem engedélyezett eredet.")
            return
        if self.headers.get_content_type() != "application/json":
            self.error(415, "JSON formátum szükséges.")
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 8192:
                raise ValueError()
            data = json.loads(self.rfile.read(size))
            if not isinstance(data, dict):
                raise ValueError()
        except (ValueError, UnicodeError):
            self.error(400, "Érvénytelen adatok.")
            return
        if path == "/api/orders":
            self.place_order(data)
            return
        if path.endswith("/logout"):
            token = self.session_token()
            if token:
                with connection() as db:
                    db.execute("DELETE FROM sessions WHERE token_hash=?", (token_hash(token),))
            self.json_response(200, {"user": None}, f"{COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict")
            return
        key = (self.client_address[0], path)
        now = time.monotonic()
        with LOCK:
            queue = ATTEMPTS[key]
            while queue and queue[0] < now - 60:
                queue.popleft()
            if len(queue) >= 15:
                self.error(429, "Túl sok próbálkozás. Próbáld újra egy perc múlva.")
                return
            queue.append(now)
        email = data.get("email")
        password = data.get("password")
        if not isinstance(email, str) or not isinstance(password, str) or len(password) > 128:
            self.error(400, "Érvénytelen adatok.")
            return
        email = email.strip().lower()
        if path.endswith("/register"):
            self.register(data, email, password)
        else:
            self.login(email, password)

    def register(self, data, email, password):
        fields = [data.get(k) for k in ("username", "firstname", "lastname")]
        if not all(isinstance(v, str) for v in fields):
            self.error(400, "Minden mező kitöltése szükséges.")
            return
        username, firstname, lastname = [v.strip() for v in fields]
        if not (3 <= len(username) <= 60 and 1 <= len(firstname) <= 80 and 1 <= len(lastname) <= 80
                and len(email) <= 254 and re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email)
                and 12 <= len(password) <= 128):
            self.error(400, "Ellenőrizd a mezőket. A jelszó legalább 12 karakter legyen.")
            return
        salt = secrets.token_bytes(16)
        hashed = password_hash(password, salt)
        try:
            with connection() as db:
                db.execute("INSERT INTO users(username,firstname,lastname,email,salt,password_hash) VALUES(?,?,?,?,?,?)",
                           (username, firstname, lastname, email, salt, hashed))
        except sqlite3.IntegrityError:
            self.error(409, "Ez az e-mail-cím vagy felhasználónév már foglalt.")
            return
        self.json_response(201, {"ok": True})

    def login(self, email, password):
        with connection() as db:
            row = db.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
            candidate = password_hash(password, row["salt"] if row else bytes(16))
            if not row or not hmac.compare_digest(candidate, row["password_hash"]):
                self.error(401, "Hibás e-mail-cím vagy jelszó.")
                return
            token = secrets.token_urlsafe(32)
            old = self.session_token()
            db.execute("DELETE FROM sessions WHERE expires<=? OR token_hash=?", (int(time.time()), token_hash(old)))
            db.execute("INSERT INTO sessions VALUES(?,?,?)", (token_hash(token), row["id"], int(time.time()) + TTL))
        self.json_response(200, {"user": public_user(row)}, f"{COOKIE}={token}; Path=/; Max-Age={TTL}; HttpOnly; SameSite=Strict")


    def place_order(self, data):
        # A kliens csak azonosítókat és mennyiségeket ad meg; árakat nem fogadunk el.
        if data.get("demo_ack") is not True or data.get("payment") not in ("cod", "card_demo"):
            self.error(400, "Jelöld be a tesztrendelés elfogadását és válassz fizetési módot.")
            return
        request_id = data.get("request_id")
        if not isinstance(request_id, str) or not re.fullmatch(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", request_id):
            self.error(400, "Érvénytelen rendelésazonosító.")
            return
        fields = {}
        for key, minimum, maximum in [
            ("lastname",1,80),("firstname",1,80),("email",3,254),("phone",6,30),
            ("zip",4,4),("city",1,100),("street",1,200),("note",0,500)
        ]:
            value = data.get(key, "" if key == "note" else None)
            if not isinstance(value, str) or not minimum <= len(value.strip()) <= maximum:
                self.error(400, "Ellenőrizd a kapcsolattartási és szállítási adatokat.")
                return
            fields[key] = value.strip()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", fields["email"]) or not re.fullmatch(r"[0-9]{4}", fields["zip"]) or not re.fullmatch(r"[+0-9() /-]{6,30}", fields["phone"]) or sum(c.isdigit() for c in fields["phone"]) < 6:
            self.error(400, "Érvénytelen e-mail, telefonszám vagy irányítószám.")
            return
        items = data.get("items")
        if not isinstance(items, list) or not 1 <= len(items) <= len(CATALOG):
            self.error(400, "A kosár üres vagy érvénytelen.")
            return
        seen = set()
        lines = []
        for item in items:
            if not isinstance(item, dict):
                self.error(400, "Érvénytelen termék.")
                return
            pid, qty = item.get("id"), item.get("quantity")
            if type(pid) is not int or type(qty) is not int or pid not in CATALOG or pid in seen or not 1 <= qty <= 99:
                self.error(400, "Ismeretlen termék vagy érvénytelen mennyiség.")
                return
            seen.add(pid)
            name, price = CATALOG[pid]
            lines.append({"id":pid,"name":name,"quantity":qty,"price":price})
        subtotal = sum(t["price"] * t["quantity"] for t in lines)
        shipping = 0 if subtotal >= 15000 else 1490
        user = self.user()
        user_id = user["id"] if user else None
        payment = data["payment"]
        # Azonos kérés ismétlésekor ne keletkezzen új rendelés.
        payload = json.dumps({"user_id":user_id,"fields":fields,"items":lines,"payment":payment}, ensure_ascii=False, sort_keys=True)
        digest = hashlib.sha256(payload.encode()).hexdigest()
        with connection() as db:
            db.execute("BEGIN IMMEDIATE")
            row = db.execute("SELECT * FROM demo_orders WHERE request_id=?", (request_id,)).fetchone()
            if row:
                if not hmac.compare_digest(row["payload_hash"], digest):
                    self.error(409, "A rendelésazonosító már foglalt.")
                    return
                receipt = {"number":row["number"],"total":row["total"],"payment":row["payment"]}
                status = 200
            else:
                number = "CC-" + secrets.token_hex(6).upper()
                total = subtotal + shipping
                db.execute("""INSERT INTO demo_orders
                    (number,request_id,payload_hash,user_id,created_at,contact_json,items_json,subtotal,shipping,total,payment,status)
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                    (number,request_id,digest,user_id,int(time.time()),json.dumps(fields,ensure_ascii=False),
                     json.dumps(lines,ensure_ascii=False),subtotal,shipping,total,payment,"demo_received"))
                receipt = {"number":number,"total":total,"payment":payment}
                status = 201
        self.json_response(status, {"order":receipt})


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--db", type=Path, default=Path.home() / ".local/share/cozy-cup-demo/users.sqlite3")
    args = parser.parse_args()
    DB = args.db.expanduser().resolve()
    os.umask(0o077)
    DB.parent.mkdir(parents=True, exist_ok=True)
    init()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    print(f"Cozy Cup helyi demó: http://127.0.0.1:{args.port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
