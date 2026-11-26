# Cozy Cup – fiók frontend és helyi demó

## Indítás
A frontend mappában futtasd: `python3 fiok_demo.py`
Nyisd meg: http://127.0.0.1:8765
A dupla kattintással megnyitott HTML (file://) esetén a fiók API nem működik.
Csak kitalált tesztadatokat használj. A demó kizárólag a saját gépen hallgat.
A demó adatbázisa a projektmappán kívül van: ~/.local/share/cozy-cup-demo/users.sqlite3
A két helyi projektpéldány ugyanazt a demó-adatbázist használja. A szerver Ctrl+C-vel állítható le.

## API-szerződés a későbbi backendhez
A fiok.js azonos eredetű /api/auth végpontokat használ.
- POST /api/auth/register: {username, firstname, lastname, email, password}; 201 {ok:true}
- POST /api/auth/login: {email, password}; 200 {user:{id,username,firstname,lastname,email}}, HttpOnly munkamenet-süti
- GET /api/auth/me: 200 {user:...} vagy {user:null}
- POST /api/auth/logout: {}; 200 {user:null}, munkamenet törlése
- Hiba: megfelelő HTTP státusz, {error:"magyar hibaüzenet"}.
A meglévő Spring Boot backend_nora ág regisztrációs végpontja ettől eltér, és a megtekintett változatban nincs jelszóhash-elés vagy login. Éles összekötés előtt a backend csapattal egyeztetni kell az API-t, szerveroldali jogosultságokat, jelszóhash-elést, HTTPS/Secure sütit, CSRF-védelmet, e-mail-ellenőrzést, jelszó-visszaállítást és éles naplózást. A Python demó nem éles telepítésre való.

## Pénztár – kizárólag helyi demó
- POST /api/orders: request_id (UUID), lastname, firstname, email, phone, zip, city, street, note, payment (cod/card_demo), demo_ack (true), items [{id, quantity}].
- 201 (vagy azonos kérés ismétlésekor 200): {order:{number,total,payment}}.
- Az árakat a szerver a termekek.js katalógusból állapítja meg. A szállítás demóára 1490 Ft, 15000 Ft-tól 0 Ft.
- A rendelés a demo_orders táblába kerül; vendégként és belépve is leadható, utóbbi esetben a user_id a munkamenetből származik.
- Csak kitalált tesztadatok használhatók. Nincs valódi fizetés, kiszállítás vagy e-mail küldés.
- A végleges Spring Boot integrációhoz külön rendelési végpont, hitelesített felhasználói jogosultságok és adatbázis-tranzakciós készletkezelés szükséges.
- A backend módosítása után indítsd újra a helyi Python demókiszolgálót.
