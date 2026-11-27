// Kedvencek: csak termékazonosítók, böngészőnként tárolva.
const CozyKedvencek = (() => {
    const kulcs = "cozyKedvencek";
    const katalogus = Object.values(CozyTermekek).flat();
    const termekek = new Map(katalogus.map(t => [t.id,t]));
    const svg = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>';
    function beolvas() {
        try {
            const a = JSON.parse(localStorage.getItem(kulcs));
            return Array.isArray(a) ? [...new Set(a.filter(id => Number.isInteger(id) && termekek.has(id)))] : [];
        } catch { return []; }
    }
    const jelzes = document.createElement("p");
    jelzes.className = "kedvenc-ertesites";
    jelzes.setAttribute("role","status");
    jelzes.hidden = true;
    document.body.append(jelzes);
    let timer;
    function ertesit(szoveg) {
        clearTimeout(timer);
        jelzes.hidden = false; jelzes.textContent = szoveg;
        timer = setTimeout(() => { jelzes.hidden = true; },3000);
    }
    function gombFrissit(gomb, ids) {
        const aktiv = ids.includes(Number(gomb.dataset.kedvencId));
        const t = termekek.get(Number(gomb.dataset.kedvencId));
        if (!t) return;
        gomb.setAttribute("aria-pressed",String(aktiv));
        gomb.setAttribute("aria-label", t.nev + (aktiv ? " – eltávolítás a kedvencekből" : " – mentés a kedvencekhez"));
        gomb.title = aktiv ? "Eltávolítás a kedvencekből" : "Mentés a kedvencekhez";
        const szoveg = gomb.querySelector(".kedvenc-gomb-szoveg");
        if (szoveg) szoveg.textContent = aktiv ? "Kedvencekben" : "Kedvencekhez adom";
    }
    function frissit() {
        const ids = beolvas();
        const szamlalo = document.getElementById("kedvenc-szam");
        if (szamlalo) szamlalo.textContent = ids.length;
        const ikon = document.getElementById("kedvenc-ikon");
        if (ikon) ikon.setAttribute("aria-label","Kedvenceim – " + ids.length + " termék");
        document.querySelectorAll("[data-kedvenc-id]").forEach(g => gombFrissit(g,ids));
        document.dispatchEvent(new CustomEvent("cozy:kedvencek"));
    }
    function valt(id) {
        const ids = beolvas();
        const aktiv = ids.includes(id);
        const uj = aktiv ? ids.filter(x=>x!==id) : [...ids,id];
        try { localStorage.setItem(kulcs,JSON.stringify(uj)); }
        catch { ertesit("A kedvencek mentése nem sikerült. Ellenőrizd a böngésző tárhelyét."); return; }
        frissit();
        ertesit(aktiv ? "Eltávolítva a kedvencekből." : "Hozzáadva a kedvencekhez!");
    }
    function gomb(t, szoveges=false) {
        const b = document.createElement("button");
        b.type="button";
        b.className="kedvenc-gomb" + (szoveges ? " kedvenc-gomb-nagy" : "");
        b.dataset.kedvencId=t.id;
        b.innerHTML=svg;
        if(szoveges) {
            const s=document.createElement("span"); s.className="kedvenc-gomb-szoveg"; b.append(s);
        }
        gombFrissit(b,beolvas());
        b.addEventListener("click",()=>valt(t.id));
        return b;
    }
    // A főoldali link mellé kerül a gomb, nem a link belsejébe.
    document.querySelectorAll(".kiskartya.termek-link").forEach(a=>{
        const id=Number(new URL(a.href,location.href).searchParams.get("termek"));
        const t=termekek.get(id);
        if(!t) return;
        const wrapper=document.createElement("div");wrapper.className="kedvenc-kiemelt";
        a.before(wrapper);wrapper.append(a,gomb(t));
    });
    window.addEventListener("storage",e=>{if(e.key===kulcs||e.key===null)frissit();});
    window.addEventListener("pageshow",frissit);
    frissit();
    return { beolvas, gomb, frissit, termekek };
})();
