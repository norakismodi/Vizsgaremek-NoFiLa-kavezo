// Közös, élő termékkereső minden oldalhoz.
const CozyKereso = (() => {
    const csoportok = [
        [CozyTermekek.kaveTermekek, "kavek.html", "Kávék"],
        [CozyTermekek.matchaTermekek, "matchashop.html", "Matcha"],
        [CozyTermekek.kakaoTermekek, "kakao.html", "Kakaók"],
        [CozyTermekek.kiegeszitoTermekek, "kiegeszitok.html", "Kiegészítők"]
    ];
    const normalizal = szoveg => String(szoveg || "").toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const katalogus = csoportok.flatMap(([termekek, oldal, kategoria]) =>
        termekek.map(termek => ({
            ...termek, oldal, kategoria,
            nevKereses: normalizal(termek.nev),
            szovegKereses: normalizal(termek.nev + " " + termek.leiras)
        })));
    function keres(szoveg) {
        const szavak = normalizal(szoveg).trim().split(/\s+/).filter(Boolean);
        if (!szavak.length) return [];
        const pont = t => szavak.filter(szo => t.nevKereses.includes(szo)).length;
        return katalogus.filter(t => szavak.every(szo => t.szovegKereses.includes(szo)))
            .sort((a, b) => pont(b) - pont(a) || a.nev.localeCompare(b.nev, "hu"));
    }

    const gomb = document.getElementById("globalis-kereso-gomb");
    if (!gomb) return { keres };
    const panel = document.createElement("section");
    panel.id = "globalis-kereso";
    panel.className = "globalis-kereso";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Termékkereső");
    panel.innerHTML = `
        <div class="kereso-fejlec">
            <label for="globalis-kereso-mezo">Termékkereső</label>
            <button type="button" class="kereso-bezar" aria-label="Kereső bezárása">×</button>
        </div>
        <input id="globalis-kereso-mezo" type="search" placeholder="Pl. csokoládé, vanília, matcha..." autocomplete="off">
        <p class="kereso-allapot" role="status" aria-live="polite">Kezdj el gépelni a kereséshez!</p>
        <ul class="kereso-talalatok"></ul>`;
    gomb.closest(".header").appendChild(panel);
    const mezo = panel.querySelector("input");
    const allapot = panel.querySelector(".kereso-allapot");
    const lista = panel.querySelector(".kereso-talalatok");

    function megjelenit() {
        lista.replaceChildren();
        const szoveg = mezo.value.trim();
        if (!szoveg) {
            allapot.textContent = "Kezdj el gépelni a kereséshez!";
            return;
        }
        const talalatok = keres(szoveg);
        allapot.textContent = talalatok.length
            ? talalatok.length + " találat"
            : "Nincs találat. Próbálj másik keresőkifejezést!";
        for (const termek of talalatok) {
            const sor = document.createElement("li");
            const link = document.createElement("a");
            link.href = termek.oldal + "?termek=" + encodeURIComponent(termek.id);
            const kep = document.createElement("img");
            kep.src = termek.kep;
            kep.alt = "";
            kep.loading = "lazy";
            kep.addEventListener("error", () => {
                if (!kep.src.endsWith("termekkep-hianyzik.svg")) kep.src = "termekkep-hianyzik.svg";
            });
            const adatok = document.createElement("span");
            const nev = document.createElement("strong");
            nev.textContent = termek.nev;
            const kat = document.createElement("small");
            kat.textContent = termek.kategoria;
            adatok.append(nev, kat);
            const ar = document.createElement("span");
            ar.className = "kereso-ar";
            ar.textContent = termek.ar.toLocaleString("hu-HU") + " Ft";
            link.append(kep, adatok, ar);
            sor.appendChild(link);
            lista.appendChild(sor);
        }
    }
    function nyit() {
        panel.hidden = false;
        gomb.setAttribute("aria-expanded", "true");
        mezo.focus();
        megjelenit();
    }
    function zar(fokusz = false) {
        panel.hidden = true;
        gomb.setAttribute("aria-expanded", "false");
        if (fokusz) gomb.focus();
    }
    gomb.addEventListener("click", () => panel.hidden ? nyit() : zar(true));
    panel.querySelector(".kereso-bezar").addEventListener("click", () => zar(true));
    mezo.addEventListener("input", megjelenit);
    mezo.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            const elso = lista.querySelector("a");
            if (elso) elso.click();
        }
        if (e.key === "ArrowDown") {
            const elso = lista.querySelector("a");
            if (elso) { e.preventDefault(); elso.focus(); }
        }
    });
    document.addEventListener("keydown", e => {
        if (!panel.hidden && e.key === "Escape") zar(true);
    });
    document.addEventListener("click", e => {
        if (!panel.hidden && !panel.contains(e.target) && !gomb.contains(e.target)) zar();
    });
    return { keres };
})();
