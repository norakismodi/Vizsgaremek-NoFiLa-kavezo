// Közös terméklista és termékrészletek minden termékkategóriához.
const CozyTermekOldal = (() => {
    const kategoriak = [
        { adat: "kaveTermekek", oldal: "kavek.html", prefix: "kave", cim: "Kávék", db: "kave-termek-db", rendezes: "kave-rendezes-select", gomb: "kave-kosar-gomb" },
        { adat: "matchaTermekek", oldal: "matchashop.html", prefix: "matcha", cim: "Matcha", db: "termek-db", rendezes: "rendezes-select", gomb: "kosar-gomb" },
        { adat: "kakaoTermekek", oldal: "kakao.html", prefix: "kakao", cim: "Kakaók", db: "kakao-termek-db", rendezes: "kakao-rendezes-select", gomb: "kakao-kosar-gomb" },
        { adat: "kiegeszitoTermekek", oldal: "kiegeszitok.html", prefix: "kiegeszito", cim: "Kiegészítők", db: "kiegeszito-termek-db", rendezes: "kiegeszito-rendezes-select", gomb: "kiegeszito-kosar-gomb" }
    ];
    const penz = ar => ar.toLocaleString("hu-HU") + " Ft";
    const elem = (tag, cls, szoveg) => {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (szoveg !== undefined) e.textContent = szoveg;
        return e;
    };
    function url(termek) {
        const kat = kategoriak.find(k => CozyTermekek[k.adat].some(t => t.id === Number(termek.id)));
        return kat ? kat.oldal + "?termek=" + encodeURIComponent(termek.id) : null;
    }
    function link(cim, href, cls) {
        const a = elem("a", cls, cim);
        a.href = href;
        return a;
    }
    function kep(termek) {
        const img = elem("img");
        img.src = termek.kep;
        img.alt = termek.nev;
        img.addEventListener("error", () => {
            if (!img.src.endsWith("termekkep-hianyzik.svg")) img.src = "termekkep-hianyzik.svg";
        });
        return img;
    }
    function kosarFrissites() {
        const szamlalo = document.getElementById("kosar-szam");
        if (szamlalo) szamlalo.textContent = CozyKosar.beolvas().reduce((sum, t) => sum + t.mennyiseg, 0);
    }
    function kosarba(termek, db) {
        if (!Number.isInteger(db) || db < 1 || db > 99) return false;
        const kosar = CozyKosar.beolvas();
        const letezo = kosar.find(t => t.id === termek.id);
        if (letezo) {
            if (!Number.isSafeInteger(letezo.mennyiseg + db)) return false;
            letezo.mennyiseg += db;
        } else kosar.push({ ...termek, mennyiseg: db });
        if (!CozyKosar.ment(kosar)) return false;
        kosarFrissites();
        return true;
    }
    function allapot(hely, termek, db) {
        const siker = kosarba(termek, db);
        hely.replaceChildren();
        hely.classList.toggle("termek-hiba", !siker);
        if (siker) {
            hely.append(elem("span", "", db + " db a kosárba került! "), link("Kosár megtekintése →", "kosar.html"));
        } else hely.textContent = "Nem sikerült a kosárba tenni. Próbáld újra!";
    }
    function listaKartya(t, kat) {
        const kartya = elem("article", kat.prefix + "-kartya");
        const kepLink = link("", url(t), "termek-kep-link");
        kepLink.append(kep(t));
        kepLink.setAttribute("aria-label", t.nev + " – termékrészletek");
        const cim = elem("h3");
        cim.append(link(t.nev, url(t), "termek-nev-link"));
        const gomb = elem("button", kat.gomb, "KOSÁRBA TESZEM");
        gomb.type = "button";
        const jelzes = elem("p", "termek-jelzes");
        jelzes.setAttribute("role", "status");
        gomb.addEventListener("click", () => allapot(jelzes, t, 1));
        kartya.append(kepLink, cim, elem("p", "termek-leiras", t.leiras), elem("p", "termek-ar", penz(t.ar)),
            link("Termékrészletek →", url(t), "termek-reszlet-link"), gomb, jelzes);
        kartya.append(CozyKedvencek.gomb(t));
        return kartya;
    }
    function reszlet(t, kat, main) {
        main.classList.add("termek-reszlet-oldal");
        const vissza = link("← Vissza az összes termékhez", kat.oldal, "egyedi-vissza");
        if (!t) {
            main.replaceChildren(vissza, elem("h1", "", "A keresett termék nem található."));
            return;
        }
        document.title = t.nev + " – Cozy Cup";
        const utvonal = elem("nav", "termek-utvonal");
        utvonal.setAttribute("aria-label", "Navigációs útvonal");
        utvonal.append(link("Főoldal", "home.html"), elem("span", "", " / "), link(kat.cim, kat.oldal), elem("span", "", " / " + t.nev));
        const kartya = elem("article", "termek-reszlet");
        const kepDoboz = elem("div", "termek-reszlet-kep");
        kepDoboz.append(kep(t));
        const adat = elem("div", "termek-reszlet-adatok");
        const ar = elem("p", "termek-ar", penz(t.ar));
        adat.append(elem("p", "termek-reszlet-kategoria", t.kategoria === "tejszinek" ? "Tejszínek és krémek" : kat.cim),
            elem("h1", "", t.nev), ar, elem("h2", "", "A termékről"),
            elem("p", "termek-reszlet-leiras", t.leiras + " " + (t.ajanlas || "")));
        const label = elem("label", "termek-mennyiseg-cim", "Mennyiség (db)");
        label.htmlFor = "termek-mennyiseg";
        const vezerlo = elem("div", "termek-mennyiseg");
        const minusz = elem("button", "", "−"), plusz = elem("button", "", "+");
        minusz.type = plusz.type = "button";
        minusz.setAttribute("aria-label", "Mennyiség csökkentése");
        plusz.setAttribute("aria-label", "Mennyiség növelése");
        const input = elem("input");
        input.id = "termek-mennyiseg"; input.type = "number"; input.min = "1"; input.max = "99"; input.step = "1"; input.value = "1";
        const osszeg = elem("p", "termek-osszeg");
        const db = () => Math.max(1, Math.min(99, Math.trunc(Number(input.value) || 1)));
        function frissit(normalizal = false) {
            const n = db();
            if (normalizal) input.value = String(n);
            minusz.disabled = n <= 1; plusz.disabled = n >= 99;
            osszeg.textContent = "Összesen: " + penz(t.ar * n);
        }
        minusz.addEventListener("click", () => { input.value = String(db() - 1); frissit(true); });
        plusz.addEventListener("click", () => { input.value = String(db() + 1); frissit(true); });
        input.addEventListener("input", () => frissit());
        input.addEventListener("change", () => frissit(true));
        vezerlo.append(minusz, input, plusz);
        const gomb = elem("button", "termek-reszlet-kosar", "KOSÁRBA TESZEM");
        gomb.type = "button";
        const jelzes = elem("p", "termek-jelzes");
        jelzes.setAttribute("role", "status");
        gomb.addEventListener("click", () => { frissit(true); allapot(jelzes, t, db()); });
        frissit();
        adat.append(label, vezerlo, osszeg, gomb, CozyKedvencek.gomb(t, true), jelzes, link("Kosár megtekintése →", "kosar.html", "termek-kosar-link"));
        kartya.append(kepDoboz, adat);
        const ajanlo = elem("section", "termek-ajanlo");
        const racs = elem("div", kat.prefix + "-racs termek-ajanlo-racs");
        const hasonlok = CozyTermekek[kat.adat].filter(x => x.id !== t.id)
            .sort((a, b) => Number(b.kategoria === t.kategoria) - Number(a.kategoria === t.kategoria) || Math.abs(a.id - t.id) - Math.abs(b.id - t.id)).slice(0, 3);
        hasonlok.forEach(x => racs.append(listaKartya(x, kat)));
        ajanlo.append(elem("h2", "", "Ezek is tetszhetnek"), racs);
        main.replaceChildren(utvonal, vissza, kartya, ajanlo);
    }
    function indit() {
        kosarFrissites();
        const kat = kategoriak.find(k => document.getElementById(k.prefix + "-racs"));
        if (!kat) return;
        const racs = document.getElementById(kat.prefix + "-racs");
        const termekDb = document.getElementById(kat.db);
        const rendezes = document.getElementById(kat.rendezes);
        const kategoria = document.getElementById("kiegeszito-kategoria-select");
        const param = new URLSearchParams(location.search);
        const id = param.get("termek");
        const termekek = CozyTermekek[kat.adat];
        if (id !== null) {
            reszlet(termekek.find(t => String(t.id) === id), kat, document.querySelector("main"));
            return;
        }
        if (kategoria && ["osszes","eszkozok","tejszinek"].includes(param.get("kategoria"))) kategoria.value = param.get("kategoria");
        function render() {
            const ts = termekek.filter(t => !kategoria || kategoria.value === "osszes" || (t.kategoria || "eszkozok") === kategoria.value);
            if (rendezes.value === "ar-novekvo") ts.sort((a,b) => a.ar-b.ar);
            else if (rendezes.value === "ar-csokkeno") ts.sort((a,b) => b.ar-a.ar);
            else if (rendezes.value === "nev") ts.sort((a,b) => a.nev.localeCompare(b.nev,"hu"));
            racs.replaceChildren(...ts.map(t => listaKartya(t, kat)));
            termekDb.textContent = ts.length + " termék";
        }
        rendezes.addEventListener("change", render);
        if (kategoria) kategoria.addEventListener("change", render);
        render();
    }
    return { indit, url, kosarFrissites, kartya: t => listaKartya(t, kategoriak.find(k => CozyTermekek[k.adat].some(x => x.id === t.id))) };
})();
