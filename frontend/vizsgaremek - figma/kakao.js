const kakaoRacs = document.getElementById("kakao-racs");

const rendezesSelect = document.getElementById(
    "kakao-rendezes-select"
);

const termekDb = document.getElementById(
    "kakao-termek-db"
);

const kakaoTermekek = [
    {
        id: 201,
        nev: "Klasszikus kakaópor",
        ar: 2490,
        kep: "kako/klasszikuskakaopor.png",
        leiras: "Gazdag, lágy kakaóíz."
    },
    {
        id: 202,
        nev: "Vaníliás kakaópor",
        ar: 2690,
        kep: "kako/vaniliaskakaopor.png",
        leiras: "Lágy, krémes vaníliás íz."
    },
    {
        id: 203,
        nev: "Mogyorós kakaópor",
        ar: 2790,
        kep: "kako/mogyoroskakaopor.png",
        leiras: "Krémes, mogyorós kakaó."
    },
    {
        id: 204,
        nev: "Karamellás kakaópor",
        ar: 2790,
        kep: "kako/karamellaskakaopor.png",
        leiras: "Édes, krémes karamellás íz."
    },
    {
        id: 205,
        nev: "Fahéjas kakaópor",
        ar: 2690,
        kep: "kako/fahejaskakaopor.png",
        leiras: "Melengető, fahéjas kakaó."
    },
    {
        id: 206,
        nev: "Ír krémes kakaópor",
        ar: 2890,
        kep: "kako/irkremeskakaopor.png",
        leiras: "Lágy, krémes kakaókülönlegesség."
    },
    {
        id: 207,
        nev: "Étcsokoládés kakaópor",
        ar: 2890,
        kep: "kako/etcsokoladeskakaopor.png",
        leiras: "Intenzív, gazdag csokoládéíz."
    },
    {
        id: 208,
        nev: "Fehércsokoládés kakaópor",
        ar: 2990,
        kep: "kako/fehercsokoladeskakaopor.png",
        leiras: "Édes, lágy fehércsokoládés íz."
    },
    {
        id: 209,
        nev: "Sós karamellás kakaópor",
        ar: 2990,
        kep: "kako/soskaramellaskakaopor.png",
        leiras: "Édes és enyhén sós karamell."
    },
    {
        id: 210,
        nev: "Málnás kakaópor",
        ar: 2890,
        kep: "kako/malnaskakaopor.png",
        leiras: "Gyümölcsös, édes kakaóíz."
    },
    {
        id: 211,
        nev: "Narancsos kakaópor",
        ar: 2790,
        kep: "kako/narancsoskakaopor.png",
        leiras: "Frissítő, citrusos kakaó."
    },
    {
        id: 212,
        nev: "Kókuszos kakaópor",
        ar: 2890,
        kep: "kako/kokuszoskakaopor.png",
        leiras: "Krémes, egzotikus kókuszos íz."
    },
    {
        id: 213,
        nev: "Pisztáciás kakaópor",
        ar: 3190,
        kep: "kako/pisztaciaskakaopor.png",
        leiras: "Lágy, diós kakaókülönlegesség."
    },
    {
        id: 214,
        nev: "Mézeskalácsos kakaópor",
        ar: 2990,
        kep: "kako/mezeskalacsoskakaopor.png",
        leiras: "Fűszeres, ünnepi kakaó."
    },
    {
        id: 215,
        nev: "Mandulás kakaópor",
        ar: 2890,
        kep: "kako/mandulaskakaopor.png",
        leiras: "Lágy, krémes mandulás íz."
    },
    {
        id: 216,
        nev: "Fehércsokoládés-málnás kakaópor",
        ar: 3290,
        kep: "kako/fehercsokoladeskakaopor (2).png",
        leiras: "Fehércsokoládé és málna harmóniája."
    },
    {
        id: 217,
        nev: "Brownie ízű kakaópor",
        ar: 3190,
        kep: "kako/browniekakaopor.png",
        leiras: "Intenzív, süteményes csokoládéíz."
    },
    {
        id: 218,
        nev: "Marcipános kakaópor",
        ar: 3090,
        kep: "kako/marcipanoskakaopor.png",
        leiras: "Édes, különleges marcipáníz."
    }
];


let kosar = CozyKosar.beolvas();


function kakaokMegjelenitese(termekek) {

    kakaoRacs.innerHTML = "";

    termekek.forEach(termek => {

        const kartya = document.createElement("div");

        kartya.className = "kakao-kartya";

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

            <button class="kakao-kosar-gomb"
                    type="button">
                KOSÁRBA TESZEM
            </button>
        `;

        const gomb = kartya.querySelector(
            ".kakao-kosar-gomb"
        );

        gomb.addEventListener("click", () => {
            kosarbaTesz(termek);
        });

        kakaoRacs.appendChild(kartya);
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

rendezesSelect.addEventListener("change", () => {

    let rendezett = [...kakaoTermekek];

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

    kakaokMegjelenitese(rendezett);
});

kakaokMegjelenitese(kakaoTermekek);

kosarFrissites();
