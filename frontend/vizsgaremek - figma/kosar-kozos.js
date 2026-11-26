const CozyKosar = (() => {
    const kulcs = "cozyKosar";
    const termekKepek = {
    "321": "kiegeszitok/kavetejszin.webp",
    "322": "kiegeszitok/habtejszin.webp",
    "323": "kiegeszitok/zabkrem.webp",
    "324": "kiegeszitok/kokuszkrem.webp",
    "325": "kiegeszitok/laktozmentes-tejszin.webp",
    "326": "kiegeszitok/fozotejszin.webp",
    "327": "kiegeszitok/mandulakrem.webp",
    "328": "kiegeszitok/szojatejszin.webp",
    "329": "kiegeszitok/rizskrem.webp",
    "330": "kiegeszitok/kesudiokrem.webp",
    "331": "kiegeszitok/vanilias-kavekrem.webp",
    "332": "kiegeszitok/karamellas-kavekrem.webp",
    "301": "kiegeszitok/keramiabogre.webp",
    "302": "kiegeszitok/uvegbogre.webp",
    "303": "kiegeszitok/duplafalupohar.webp",
    "304": "kiegeszitok/termoszbogre.webp",
    "305": "kiegeszitok/szivoszalaspohar.webp",
    "306": "kiegeszitok/bambuszhabvero.webp",
    "307": "kiegeszitok/matchatal.webp",
    "308": "kiegeszitok/habverotarto.webp",
    "309": "kiegeszitok/bambuszkanal.webp",
    "310": "kiegeszitok/matchaszuro.webp",
    "311": "kiegeszitok/tejhabosito.webp",
    "312": "kiegeszitok/tejkionto.webp",
    "313": "kiegeszitok/merokanal.webp",
    "314": "kiegeszitok/kavedaralo.webp",
    "315": "kiegeszitok/franciakavefozo.webp",
    "316": "kiegeszitok/kotyogos.webp",
    "317": "kiegeszitok/kavecsepegteto.webp",
    "318": "kiegeszitok/papirfilter.webp",
    "319": "kiegeszitok/tarolodoboz.webp",
    "320": "kiegeszitok/poharalatet.webp",
    "1": "matchak/epresmatchapor.png",
    "2": "matchak/vaniliasmatchapor.png",
    "3": "matchak/originalmatchapor.png",
    "4": "matchak/malnasmatchapor.png",
    "5": "matchak/afonyasmatchapor.png",
    "6": "matchak/citromosmatchapor.png",
    "7": "matchak/mangosmatchapor.png",
    "8": "matchak/kokuszosmatchapor.png",
    "9": "matchak/mentasmatchapor.png",
    "10": "matchak/karamellasmatchapor.png",
    "11": "matchak/csokoladesmatchapor.png",
    "12": "matchak/pisztaciasmatchapor.png",
    "101": "kavek/klasszikuskave.png",
    "102": "kavek/vaniliaskave.png",
    "103": "kavek/mogyoroskave.png",
    "104": "kavek/karamellaskave.png",
    "105": "kavek/fahejaskave.png",
    "106": "kavek/irkremeskave.png",
    "107": "kavek/erosporkolesukave.png",
    "108": "kavek/koffeinmenteskave.png",
    "109": "kavek/mokkaskave.png",
    "110": "kavek/mezeskalacskave.png",
    "111": "kavek/kokuszoskave.png",
    "112": "kavek/pisztaciaskave.png",
    "113": "kavek/fehercsokiskave.png",
    "114": "kavek/soskaramellaskave.png",
    "115": "kavek/mandulaskave.png",
    "116": "kavek/narancsoskave.png",
    "117": "kavek/malnaskave.png",
    "118": "kavek/fuszereschaikave.png",
    "201": "kako/klasszikuskakaopor.png",
    "202": "kako/vaniliaskakaopor.png",
    "203": "kako/mogyoroskakaopor.png",
    "204": "kako/karamellaskakaopor.png",
    "205": "kako/fahejaskakaopor.png",
    "206": "kako/irkremeskakaopor.png",
    "207": "kako/etcsokoladeskakaopor.png",
    "208": "kako/fehercsokoladeskakaopor.png",
    "209": "kako/soskaramellaskakaopor.png",
    "210": "kako/malnaskakaopor.png",
    "211": "kako/narancsoskakaopor.png",
    "212": "kako/kokuszoskakaopor.png",
    "213": "kako/pisztaciaskakaopor.png",
    "214": "kako/mezeskalacsoskakaopor.png",
    "215": "kako/mandulaskakaopor.png",
    "216": "kako/fehercsokoladeskakaopor (2).png",
    "217": "kako/browniekakaopor.png",
    "218": "kako/marcipanoskakaopor.png"
};

    function beolvas() {
        try {
            const adat = JSON.parse(localStorage.getItem(kulcs));
            if (!Array.isArray(adat)) return [];
            return adat.filter(t => t && Number.isSafeInteger(Number(t.id)) &&
                typeof t.nev === "string" && Number.isFinite(t.ar) && t.ar >= 0 &&
                Number.isSafeInteger(t.mennyiseg) && t.mennyiseg > 0)
                .map(t => ({ ...t, id: Number(t.id),
                    kep: termekKepek[t.id] || "termekkep-hianyzik.svg" }));
        } catch {
            return [];
        }
    }

    function ment(kosar) {
        try {
            localStorage.setItem(kulcs, JSON.stringify(kosar));
            return true;
        } catch {
            alert("A kosár mentése nem sikerült. Ellenőrizd a böngésző tárhelybeállításait.");
            return false;
        }
    }

    return { beolvas, ment };
})();
