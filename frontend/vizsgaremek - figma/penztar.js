// A pénztár a demó API szerveroldali árait és visszaigazolását használja.
(() => {
    const $ = id => document.getElementById(id);
    const form = $("penztar-urlap");
    const katalogus = Object.values(CozyTermekek).flat();
    const kosar = CozyKosar.beolvas();
    const tetelek = kosar.map(t => ({ termek: katalogus.find(x => x.id === t.id), mennyiseg: t.mennyiseg }));
    const ervenyes = tetelek.every(t => t.termek && t.mennyiseg >= 1 && t.mennyiseg <= 99);
    const penz = n => new Intl.NumberFormat("hu-HU", {useGrouping:"always"}).format(n) + " Ft";
    const osszeg = ervenyes ? tetelek.reduce((s,t) => s + t.termek.ar*t.mennyiseg,0) : 0;
    const dij = osszeg >= 15000 ? 0 : 1490;
    let keresesAzonosito = null, elozoAdat = "";
    const uzenet = (szoveg, hiba=true) => {
        const e = $("penztar-uzenet");
        e.hidden = !szoveg; e.textContent = szoveg; e.classList.toggle("fiok-hiba",hiba);
    };
    $("kosar-szam").textContent = kosar.reduce((s,t)=>s+t.mennyiseg,0);
    if (!kosar.length) { $("penztar-ures").hidden = false; return; }
    $("penztar-tartalom").hidden = false;
    if (!ervenyes) {
        uzenet("A kosárban érvénytelen termék vagy mennyiség van. Kérjük, módosítsd a kosarad (legfeljebb 99 db termékenként).");
        $("rendeles-gomb").disabled = true; return;
    }
    for (const {termek:t,mennyiseg:n} of tetelek) {
        const row = document.createElement("div"); row.className="penztar-termek";
        const img=document.createElement("img"); img.src=t.kep; img.alt="";
        const info=document.createElement("span"); info.textContent=t.nev+" · "+n+" db";
        const price=document.createElement("strong"); price.textContent=penz(t.ar*n);
        row.append(img,info,price); $("penztar-termekek").append(row);
    }
    $("penztar-reszosszeg").textContent=penz(osszeg);
    $("penztar-szallitas").textContent=dij ? penz(dij) : "Ingyenes";
    $("penztar-vegosszeg").textContent=penz(osszeg+dij);
    $("penztar-szallitas-info").textContent=dij ? "Még "+penz(15000-osszeg)+" az ingyenes szállításig." : "Elérted az ingyenes szállítást!";
    if (!["http:","https:"].includes(location.protocol)) {
        uzenet("A tesztrendeléshez indítsd el a fiok_demo.py kiszolgálót, majd nyisd meg a http://127.0.0.1:8765 címet.");
        $("rendeles-gomb").disabled=true; return;
    }
    fetch("/api/auth/me",{credentials:"same-origin"}).then(r=>r.ok?r.json():null).then(d=>{
        if (!d?.user) return;
        for (const k of ["firstname","lastname","email"]) if (!form.elements[k].value) form.elements[k].value=d.user[k]||"";
        $("penztar-fiok-info").textContent="Bejelentkezve – a fiókod adatait előre kitöltöttük.";
    }).catch(()=>{});
    form.addEventListener("submit",async e=>{
        e.preventDefault();
        const adat=Object.fromEntries(new FormData(form));
        adat.demo_ack=!!form.elements.demo_ack.checked;
        adat.items=tetelek.map(t=>({id:t.termek.id,quantity:t.mennyiseg}));
        const serial=JSON.stringify(adat);
        if (serial!==elozoAdat || !keresesAzonosito) {
            keresesAzonosito=crypto.randomUUID(); elozoAdat=serial;
        }
        adat.request_id=keresesAzonosito;
        const gomb=$("rendeles-gomb"); gomb.disabled=true;
        uzenet("Tesztrendelés feldolgozása…",false);
        try {
            const r=await fetch("/api/orders",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(adat)});
            const d=await r.json().catch(()=>null);
            if (!r.ok || !d?.order) throw new Error(d?.error || "A rendelési API nem elérhető. Ellenőrizd a helyi kiszolgálót.");
            $("rendeles-szam").textContent=d.order.number;
            $("rendeles-osszeg").textContent=penz(d.order.total);
            $("rendeles-fizetes").textContent=d.order.payment==="cod"?"Utánvét (demó)":"Bankkártya (demó)";
            const current=CozyKosar.beolvas();
            const remaining=current.map(t=>({...t,mennyiseg:t.mennyiseg-(tetelek.find(x=>x.termek.id===t.id)?.mennyiseg||0)})).filter(t=>t.mennyiseg>0);
            if (CozyKosar.ment(remaining)) $("kosar-szam").textContent=remaining.reduce((s,t)=>s+t.mennyiseg,0);
            form.reset(); $("penztar-tartalom").hidden=true; $("penztar-siker").hidden=false;
            window.scrollTo(0,0);
        } catch(err) { uzenet(err.message || "A rendelést nem sikerült rögzíteni."); gomb.disabled=false; }
    });
})();
