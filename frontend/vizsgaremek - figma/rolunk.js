// A közös kosár darabszáma a bemutatkozó oldalon.
const kosarSzamlalo = document.getElementById("kosar-szam");
if (kosarSzamlalo) {
    const kosar = CozyKosar.beolvas();
    kosarSzamlalo.textContent = kosar.reduce((osszeg, termek) => osszeg + termek.mennyiseg, 0);
}
