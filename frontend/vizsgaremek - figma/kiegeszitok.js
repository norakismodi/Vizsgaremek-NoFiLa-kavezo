const kiegeszitoRacs = document.getElementById("kiegeszito-racs");

const rendezesSelect = document.getElementById(
    "kiegeszito-rendezes-select"
);

const termekDb = document.getElementById(
    "kiegeszito-termek-db"
);

const kiegeszitoTermekek = CozyTermekek.kiegeszitoTermekek;


const egyediTermekId = new URLSearchParams(location.search).get("termek");

let kosar = CozyKosar.beolvas();


function kiegeszitokMegjelenitese(termekek) {
    if (egyediTermekId !== null) {
        termekek = kiegeszitoTermekek.filter(termek => String(termek.id) === egyediTermekId);
    }

    kiegeszitoRacs.innerHTML = "";
    if (egyediTermekId !== null && !termekek.length) {
        kiegeszitoRacs.innerHTML = '<p class="egyedi-nincs">A keresett termék nem található.</p>';
        termekDb.textContent = "0 termék";
        return;
    }


    termekek.forEach(termek => {

        const kartya = document.createElement("div");

        kartya.className = "kiegeszito-kartya";

        kartya.innerHTML = `
            <img src="${termek.kep}"
                 alt="${termek.nev}">

            <h3>${termek.nev}</h3>

            <p class="termek-leiras">
                ${termek.leiras}
            </p>

            <p class="termek-ar">
                ${termek.ar.toLocaleString("hu-HU")} Ft
            </p>

            <button class="kiegeszito-kosar-gomb"
                    type="button">
                KOSÁRBA TESZEM
            </button>
        `;

        const gomb = kartya.querySelector(
            ".kiegeszito-kosar-gomb"
        );

        gomb.addEventListener("click", () => {
            kosarbaTesz(termek);
        });

        kiegeszitoRacs.appendChild(kartya);
    });

    termekDb.textContent = `${termekek.length} termék`;
}

function kosarbaTesz(termek) {

    const letezo = kosar.find(
        elem => elem.id === termek.id
    );

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

    const szamlalo = document.getElementById(
        "kosar-szam"
    );

    if (szamlalo) {
        szamlalo.textContent = darab;
    }
}

const kategoriaSelect = document.getElementById("kiegeszito-kategoria-select");
const urlKategoria = new URLSearchParams(location.search).get("kategoria");
if (["osszes", "eszkozok", "tejszinek"].includes(urlKategoria)) {
    kategoriaSelect.value = urlKategoria;
}

function termekekSzureseEsRendezese() {

    const kategoria = kategoriaSelect.value;
    let rendezett = kiegeszitoTermekek.filter(termek =>
        kategoria === "osszes" || (termek.kategoria || "eszkozok") === kategoria
    );

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

    kiegeszitokMegjelenitese(rendezett);
}

rendezesSelect.addEventListener("change", termekekSzureseEsRendezese);
kategoriaSelect.addEventListener("change", termekekSzureseEsRendezese);
termekekSzureseEsRendezese();

kosarFrissites();

if (egyediTermekId !== null) {
    const main = document.querySelector("main");
    main.classList.add("egyedi-nezet");
    const fejlec = document.querySelector(".kiegeszito-termek-fejlec");
    fejlec.querySelector("h2").textContent = "Kiválasztott termék";
    const vissza = document.createElement("a");
    vissza.className = "egyedi-vissza";
    vissza.href = "kiegeszitok.html";
    vissza.textContent = "← Vissza az összes termékhez";
    fejlec.before(vissza);
    const termek = kiegeszitoTermekek.find(t => String(t.id) === egyediTermekId);
    if (termek) document.title = termek.nev + " – Cozy Cup";
}
