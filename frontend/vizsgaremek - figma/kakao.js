const kakaoRacs = document.getElementById("kakao-racs");

const rendezesSelect = document.getElementById(
    "kakao-rendezes-select"
);

const termekDb = document.getElementById(
    "kakao-termek-db"
);

const kakaoTermekek = CozyTermekek.kakaoTermekek;


const egyediTermekId = new URLSearchParams(location.search).get("termek");

let kosar = CozyKosar.beolvas();


function kakaokMegjelenitese(termekek) {
    if (egyediTermekId !== null) {
        termekek = kakaoTermekek.filter(termek => String(termek.id) === egyediTermekId);
    }

    kakaoRacs.innerHTML = "";
    if (egyediTermekId !== null && !termekek.length) {
        kakaoRacs.innerHTML = '<p class="egyedi-nincs">A keresett termék nem található.</p>';
        termekDb.textContent = "0 termék";
        return;
    }


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

if (egyediTermekId !== null) {
    const main = document.querySelector("main");
    main.classList.add("egyedi-nezet");
    const fejlec = document.querySelector(".kakao-termek-fejlec");
    fejlec.querySelector("h2").textContent = "Kiválasztott termék";
    const vissza = document.createElement("a");
    vissza.className = "egyedi-vissza";
    vissza.href = "kakao.html";
    vissza.textContent = "← Vissza az összes termékhez";
    fejlec.before(vissza);
    const termek = kakaoTermekek.find(t => String(t.id) === egyediTermekId);
    if (termek) document.title = termek.nev + " – Cozy Cup";
}
