// A kedvencek oldal ugyanazokat a termékkártyákat használja, mint a webshop.
(() => {
    const racs=document.getElementById("kedvenc-racs");
    const ures=document.getElementById("kedvenc-ures");
    const db=document.getElementById("kedvenc-db");
    function render() {
        const ids=CozyKedvencek.beolvas();
        const aktiv=document.activeElement?.dataset?.kedvencId;
        const termekek=ids.map(id=>CozyKedvencek.termekek.get(id)).filter(Boolean);
        racs.replaceChildren(...termekek.map(t=>CozyTermekOldal.kartya(t)));
        db.textContent=termekek.length+" mentett termék";
        ures.hidden=termekek.length!==0;
        if(aktiv && !ids.includes(Number(aktiv))) {
            const kov=racs.querySelector(".kedvenc-gomb") || ures.querySelector("a");
            kov?.focus();
        }
    }
    document.addEventListener("cozy:kedvencek",render);
    CozyTermekOldal.kosarFrissites();
    render();
})();
