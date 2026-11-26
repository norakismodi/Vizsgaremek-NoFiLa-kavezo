// Közös fiókkezelés. A munkamenetet a kiszolgáló HttpOnly sütije kezeli.
const CozyFiok = (() => {
    const ikon = document.getElementById("fiok-ikon");
    const vendeg = document.getElementById("fiok-vendeg");
    const profil = document.getElementById("fiok-profil");
    const belepes = document.getElementById("belepes-urlap");
    const reg = document.getElementById("regisztracio-urlap");
    const uzenet = document.getElementById("fiok-uzenet");
    const api = "/api/auth";
    function jelzes(szoveg, hiba = false) {
        if (!uzenet) return;
        uzenet.hidden = !szoveg;
        uzenet.textContent = szoveg;
        uzenet.classList.toggle("fiok-hiba", hiba);
    }
    async function keres(ut, adat) {
        if (!["http:", "https:"].includes(location.protocol)) {
            throw new Error("A fiók használatához indítsd el a helyi kiszolgálót: python3 fiok_demo.py, majd nyisd meg a http://127.0.0.1:8765 címet.");
        }
        let valasz;
        try {
            valasz = await fetch(api + ut, {
                method: adat === undefined ? "GET" : "POST",
                credentials: "same-origin",
                headers: adat === undefined ? {} : { "Content-Type": "application/json" },
                body: adat === undefined ? undefined : JSON.stringify(adat)
            });
        } catch {
            throw new Error("A fiókkiszolgáló nem elérhető.");
        }
        const eredmeny = await valasz.json().catch(() => null);
        if (!eredmeny) throw new Error("A fiókkiszolgáló nem elérhető ezen a címen.");
        if (!valasz.ok) throw new Error(eredmeny.error || "A művelet nem sikerült.");
        return eredmeny;
    }
    function frissit(felhasznalo) {
        if (ikon) {
            ikon.classList.toggle("fiok-aktiv", !!felhasznalo);
            ikon.title = felhasznalo ? "Fiókom – bejelentkezve" : "Bejelentkezés / regisztráció";
            ikon.setAttribute("aria-label", ikon.title);
        }
        if (!vendeg) return;
        vendeg.hidden = !!felhasznalo;
        profil.hidden = !felhasznalo;
        if (felhasznalo) {
            document.getElementById("fiok-udvozles").textContent = "Szia, " + felhasznalo.firstname + "!";
            document.getElementById("fiok-email").textContent = felhasznalo.email;
            document.getElementById("fiok-nev").textContent = felhasznalo.username;
        }
    }
    function valt(regisztracio) {
        belepes.hidden = regisztracio;
        reg.hidden = !regisztracio;
        document.getElementById("belepes-ful").setAttribute("aria-pressed", String(!regisztracio));
        document.getElementById("regisztracio-ful").setAttribute("aria-pressed", String(regisztracio));
        jelzes("");
    }
    async function kuld(urlap, ut) {
        const gomb = urlap.querySelector('button[type="submit"]');
        const adat = Object.fromEntries(new FormData(urlap));
        if (urlap === reg && adat.password !== document.getElementById("reg-jelszo2").value) {
            jelzes("A két jelszó nem egyezik.", true);
            return;
        }
        gomb.disabled = true;
        jelzes("Feldolgozás...");
        try {
            const eredmeny = await keres(ut, adat);
            urlap.reset();
            if (ut === "/register") {
                valt(false);
                belepes.elements.email.value = adat.email;
                jelzes("Sikeres regisztráció! Most már bejelentkezhetsz.");
                belepes.elements.password.focus();
            } else {
                frissit(eredmeny.user);
                jelzes("Sikeres bejelentkezés!");
            }
        } catch (hiba) {
            jelzes(hiba.message, true);
        } finally {
            gomb.disabled = false;
        }
    }
    if (vendeg) {
        document.getElementById("belepes-ful").addEventListener("click", () => valt(false));
        document.getElementById("regisztracio-ful").addEventListener("click", () => valt(true));
        belepes.addEventListener("submit", e => { e.preventDefault(); kuld(belepes, "/login"); });
        reg.addEventListener("submit", e => { e.preventDefault(); kuld(reg, "/register"); });
        document.getElementById("kijelentkezes").addEventListener("click", async e => {
            e.currentTarget.disabled = true;
            try {
                await keres("/logout", {});
                frissit(null);
                valt(false);
                jelzes("Sikeresen kijelentkeztél.");
            } catch (hiba) { jelzes(hiba.message, true); }
            finally { document.getElementById("kijelentkezes").disabled = false; }
        });
        valt(new URLSearchParams(location.search).get("mod") === "regisztracio");
    }
    if (vendeg || ["http:", "https:"].includes(location.protocol)) {
        keres("/me").then(adat => frissit(adat.user)).catch(hiba => {
            if (vendeg) jelzes(hiba.message, true);
        });
    }
    return { frissit };
})();
