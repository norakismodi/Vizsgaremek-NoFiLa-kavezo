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
        if path not in {"/api/auth/register", "/api/auth/login", "/api/auth/logout"}:
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
