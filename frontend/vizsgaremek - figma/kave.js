const kaveRacs = document.getElementById("kave-racs");

const rendezesSelect = document.getElementById(
    "kave-rendezes-select"
);

const termekDb = document.getElementById(
    "kave-termek-db"
);

const kaveTermekek = [

    {
        id: 101,
        nev: "Klasszikus kávépor",
        ar: 2690,
        kep: "",
        leiras: "Gazdag aromájú klasszikus kávé."
    },

    {
        id: 102,
        nev: "Vaníliás kávépor",
        ar: 2890,
        kep: "",
        leiras: "Lágy vaníliás ízvilág."
    },

    {
        id: 103,
        nev: "Mogyorós kávépor",
        ar: 2990,
        kep: "",
        leiras: "Különleges mogyorós aroma."
    },

    {
        id: 104,
        nev: "Karamellás kávépor",
        ar: 2990,
        kep: "",
        leiras: "Édes, krémes karamellás íz."
    },

    {
        id: 105,
        nev: "Fahéjas kávépor",
        ar: 2890,
        kep: "",
        leiras: "Melengető fahéjas kávé."
    },

    {
        id: 106,
        nev: "Ír krémes kávépor",
        ar: 3190,
        kep: "",
        leiras: "Krémes, különleges kávéélmény."
    },

    {
        id: 107,
        nev: "Erős pörkölésű kávépor",
        ar: 2790,
        kep: "",
        leiras: "Intenzív, karakteres íz."
    },

    {
        id: 108,
        nev: "Koffeinmentes kávépor",
        ar: 2990,
        kep: "",
        leiras: "Kávéélmény koffein nélkül."
    },

    {
        id: 109,
        nev: "Mokás kávépor",
        ar: 3190,
        kep: "",
        leiras: "Csokoládés, gazdag ízvilág."
    },

    {
        id: 110,
        nev: "Mézeskalácsos kávépor",
        ar: 3190,
        kep: "",
        leiras: "Fűszeres, ünnepi kávékülönlegesség."
    },

    {
        id: 111,
        nev: "Kókuszos kávépor",
        ar: 3090,
        kep: "",
        leiras: "Lágy, egzotikus kókuszos íz."
    },

    {
        id: 112,
        nev: "Pisztáciás kávépor",
        ar: 3390,
        kep: "",
        leiras: "Krémes, pisztáciás különlegesség."
    },

    {
        id: 113,
        nev: "Fehércsokoládés kávépor",
        ar: 3290,
        kep: "",
        leiras: "Édes fehércsokoládés íz."
    },

    {
        id: 114,
        nev: "Sós karamellás kávépor",
        ar: 3290,
        kep: "",
        leiras: "Édes és sós ízek harmóniája."
    },

    {
        id: 115,
        nev: "Mandulás kávépor",
        ar: 3090,
        kep: "",
        leiras: "Finom mandulás aroma."
    },

    {
        id: 116,
        nev: "Narancsos kávépor",
        ar: 3090,
        kep: "",
        leiras: "Frissítő, gyümölcsös íz."
    },

    {
        id: 117,
        nev: "Málnás kávépor",
        ar: 3190,
        kep: "",
        leiras: "Gyümölcsös, édes kávékülönlegesség."
    },

    {
        id: 118,
        nev: "Fűszeres chai kávépor",
        ar: 3290,
        kep: "y",
        leiras: "Fahéjas, fűszeres kávéélmény."
    }

];


let kosar = JSON.parse(
    localStorage.getItem("cozyKosar")
) || [];



function kavekMegjelenitese(termekek) {
    kaveRacs.innerHTML = "";

    termekek.forEach(termek => {

        const kartya = document.createElement("div");

        kartya.className = "kave-kartya";

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

            <button class="kave-kosar-gomb"
                    type="button">
                KOSÁRBA TESZEM
            </button>
        `;

        const gomb = kartya.querySelector(
            ".kave-kosar-gomb"
        );

        gomb.addEventListener("click", () => {
            kosarbaTesz(termek);
        });

        kaveRacs.appendChild(kartya);
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
    localStorage.setItem(
        "cozyKosar",
        JSON.stringify(kosar)
    );
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
    let rendezett = [...kaveTermekek];
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
    kavekMegjelenitese(rendezett);
});

kavekMegjelenitese(kaveTermekek);
kosarFrissites();
