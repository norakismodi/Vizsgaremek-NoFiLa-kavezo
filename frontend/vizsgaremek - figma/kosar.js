let kosar = CozyKosar.beolvas();

const kosarLista = document.getElementById("kosar-lista");
const reszosszegElem = document.getElementById("reszosszeg");
const vegosszegElem = document.getElementById("vegosszeg");
const kosarSzamElem = document.getElementById("kosar-szam");

function penzFormazas(osszeg) {
    return osszeg.toLocaleString("hu-HU") + " Ft";

}

function kosarMentese() {
    CozyKosar.ment(kosar);
    kosarMegjelenitese();

}

function mennyisegModositas(id, valtozas) {
    const termek = kosar.find(
        elem => String(elem.id) === String(id)
    );

    if (!termek) {
        return;
    }

    termek.mennyiseg += valtozas;

    if (termek.mennyiseg <= 0) {

        kosar = kosar.filter(
            elem => String(elem.id) !== String(id)
        );

    }
    kosarMentese();

}


function termekTorles(id) {

    kosar = kosar.filter(
        elem => String(elem.id) !== String(id)
    );

    kosarMentese();

}

function kosarMegjelenitese() {

    kosarLista.innerHTML = "";

    if (kosar.length === 0) {

        kosarLista.innerHTML = `
            <div class="ures-kosar">
                <h3>A kosarad jelenleg üres ☕</h3>
                <p>
                    Fedezd fel termékeinket,
                    és találd meg a kedvencedet!
                </p>
            </div>
        `;

    }

    kosar.forEach(termek => {

        const teljesAr = termek.ar * termek.mennyiseg;
        const kartya = document.createElement("div");

        kartya.className = "kosar-termek";

        kartya.innerHTML = `
            <img src="termekkep-hianyzik.svg" alt="">

            <div class="kosar-termek-adatok">

                <h3></h3>

                <p>
                    ${penzFormazas(termek.ar)} / db
                </p>

                <div class="mennyiseg-vezerlo">

                    <button class="csokkentes"
                            type="button">−</button>

                    <span>${termek.mennyiseg}</span>

                    <button class="noveles"
                            type="button">+</button>

                </div>

            </div>

            <div class="kosar-termek-jobb">

                <span class="kosar-termek-ar">
                    ${penzFormazas(teljesAr)}
                </span>

                <button class="torles-gomb"
                        type="button">
                    Törlés
                </button>

            </div>
        `;

        kartya.querySelector("img").src = termek.kep;
        kartya.querySelector("img").alt = termek.nev;
        const nevCim = kartya.querySelector("h3");
        const termekUrl = CozyTermekOldal.url(termek);
        if (termekUrl) {
            const link = document.createElement("a");
            link.href = termekUrl;
            link.className = "kosar-termek-nev-link";
            link.textContent = termek.nev;
            nevCim.append(link);
        } else nevCim.textContent = termek.nev;

        kartya.querySelector(".csokkentes")
            .addEventListener("click", () => {

                mennyisegModositas(termek.id, -1);

            });

        kartya.querySelector(".noveles")
            .addEventListener("click", () => {

                mennyisegModositas(termek.id, 1);

            });

        kartya.querySelector(".torles-gomb")
            .addEventListener("click", () => {

                termekTorles(termek.id);

            });

        kosarLista.appendChild(kartya);

    });

    const osszeg = kosar.reduce(
        (total, termek) => {

            return total + termek.ar * termek.mennyiseg;

        }, 0
    );

    reszosszegElem.textContent = penzFormazas(osszeg);

    vegosszegElem.textContent = penzFormazas(osszeg);
    const penztarGomb = document.querySelector(".penztar-gomb");
    penztarGomb.disabled = !kosar.length;
    const szallitas = document.getElementById("kosar-szallitas");
    const info = document.getElementById("kosar-szallitas-info");
    szallitas.textContent = !kosar.length ? "–" : osszeg >= 15000 ? "Ingyenes" : penzFormazas(1490);
    info.textContent = osszeg >= 15000 ? "Elérted az ingyenes szállítást!" : "Még " + penzFormazas(15000-osszeg) + " az ingyenes szállításig." ;

    const darab = kosar.reduce(
        (total, termek) => {

            return total + termek.mennyiseg;

        }, 0
    );
 
    kosarSzamElem.textContent = darab;

}

kosarMegjelenitese();

document.querySelector(".penztar-gomb").addEventListener("click", () => { if (kosar.length) location.href = "penztar.html"; });
