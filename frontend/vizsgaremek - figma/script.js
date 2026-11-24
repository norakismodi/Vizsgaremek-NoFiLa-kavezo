const matchaRacs = document.getElementById("matcha-racs");
const rendezesSelect = document.getElementById("rendezes-select");
const termekDb = document.getElementById("termek-db");

const matchaTermekek = [
    {
        id: 1,
        nev: "Epres Matcha",
        ar: 3590,
        kep: "termekkep-hianyzik.svg",
        leiras: "Prémium matcha eperízesítéssel."
    },
    {
        id: 2,
        nev: "Vaníliás Matcha",
        ar: 3490,
        kep: "termekkep-hianyzik.svg",
        leiras: "Lágy, vaníliás matcha."
    }
];

let kosar = CozyKosar.beolvas();

function termekekMegjelenitese(termekek) {
    matchaRacs.innerHTML = "";
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