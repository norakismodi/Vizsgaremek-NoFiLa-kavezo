const matchaRacs = document.getElementById("matcha-racs");
const rendezesSelect = document.getElementById("rendezes-select");
const termekDb = document.getElementById("termek-db");

const matchaTermekek = CozyTermekek.matchaTermekek;

const egyediTermekId = new URLSearchParams(location.search).get("termek");

let kosar = CozyKosar.beolvas();

function termekekMegjelenitese(termekek) {
    if (egyediTermekId !== null) {
        termekek = matchaTermekek.filter(termek => String(termek.id) === egyediTermekId);
    }
    matchaRacs.innerHTML = "";
    if (egyediTermekId !== null && !termekek.length) {
        matchaRacs.innerHTML = '<p class="egyedi-nincs">A keresett termék nem található.</p>';
        termekDb.textContent = "0 termék";
        return;
    }
    termekek.forEach(termek => {
        const kartya = document.createElement("div");
        kartya.className = "matcha-kartya";
        kartya.innerHTML = `
            <img src="${termek.kep}" alt="${termek.nev}">

            <h3>${termek.nev}</h3>

            <p class="termek-leiras">
                ${termek.leiras}
            </p>

            <p class="termek-ar">
                ${termek.ar.toLocaleString("hu-HU")} Ft
            </p>

            <button class="kosar-gomb">
                KOSÁRBA TESZEM
            </button>
        `;
         const gomb = kartya.querySelector(".kosar-gomb");
         gomb.addEventListener("click", () => {
            kosarbaTesz(termek);
         });
         matchaRacs.appendChild(kartya);
        });
        termekDb.textContent = `${termekek.length} termék`;

}

function kosarbaTesz(termek) {
    const letezo = kosar.find(elem => elem.id === termek.id);

    if (letezo) {
        letezo.mennyiseg++;
    } else {
        kosar.push({
            ...termek,
            mennyiseg: 1
        });
    }
    CozyKosar.ment(kosar);
    kosarFrissites();
}

function kosarFrissites() {
    const darab = kosar.reduce(
        (osszeg, termek) => osszeg + termek.mennyiseg,
        0
    );
    const kosarSzam = document.getElementById("kosar-szam");

    if (kosarSzam) {
        kosarSzam.textContent = darab;
    }

}


if (matchaRacs && rendezesSelect && termekDb) {
    rendezesSelect.addEventListener("change", () => {
        let rendezett = [...matchaTermekek];
        const mod = rendezesSelect.value;
        if (mod === "ar-novekvo") {
            rendezett.sort((a, b) => a.ar - b.ar);
        } else if (mod === "ar-csokkeno") {
            rendezett.sort((a, b) => b.ar - a.ar);
        } else if (mod === "nev") {
            rendezett.sort((a, b) =>
                a.nev.localeCompare(b.nev, "hu")
            );
        }
        termekekMegjelenitese(rendezett);
    });

    termekekMegjelenitese(matchaTermekek);
}

kosarFrissites();
if (matchaRacs && egyediTermekId !== null) {
    document.querySelector("main").classList.add("egyedi-nezet");
    const fejlec = document.querySelector(".matcha-termek-fejlec");
    fejlec.querySelector("h2").textContent = "Kiválasztott termék";
    const vissza = document.createElement("a");
    vissza.className = "egyedi-vissza";
    vissza.href = "matchashop.html";
    vissza.textContent = "← Vissza az összes termékhez";
    fejlec.before(vissza);
    const termek = matchaTermekek.find(t => String(t.id) === egyediTermekId);
    if (termek) document.title = termek.nev + " – Cozy Cup";
}
