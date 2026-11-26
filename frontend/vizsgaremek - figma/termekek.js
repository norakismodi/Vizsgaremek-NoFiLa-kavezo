// Közös termékadatok: a webshop és a kereső ugyanazt a katalógust használja.
const CozyTermekek = {
    kaveTermekek: [

    {
        id: 101,
        nev: "Klasszikus kávépor",
        ar: 2690,
        kep: "kavek/klasszikuskave.png",
        leiras: "Gazdag aromájú klasszikus kávé."
    },

    {
        id: 102,
        nev: "Vaníliás kávépor",
        ar: 2890,
        kep: "kavek/vaniliaskave.png",
        leiras: "Lágy vaníliás ízvilág."
    },

    {
        id: 103,
        nev: "Mogyorós kávépor",
        ar: 2990,
        kep: "kavek/mogyoroskave.png",
        leiras: "Különleges mogyorós aroma."
    },

    {
        id: 104,
        nev: "Karamellás kávépor",
        ar: 2990,
        kep: "kavek/karamellaskave.png",
        leiras: "Édes, krémes karamellás íz."
    },

    {
        id: 105,
        nev: "Fahéjas kávépor",
        ar: 2890,
        kep: "kavek/fahejaskave.png",
        leiras: "Melengető fahéjas kávé."
    },

    {
        id: 106,
        nev: "Ír krémes kávépor",
        ar: 3190,
        kep: "kavek/irkremeskave.png",
        leiras: "Krémes, különleges kávéélmény."
    },

    {
        id: 107,
        nev: "Erős pörkölésű kávépor",
        ar: 2790,
        kep: "kavek/erosporkolesukave.png",
        leiras: "Intenzív, karakteres íz."
    },

    {
        id: 108,
        nev: "Koffeinmentes kávépor",
        ar: 2990,
        kep: "kavek/koffeinmenteskave.png",
        leiras: "Kávéélmény koffein nélkül."
    },

    {
        id: 109,
        nev: "Mokkás kávépor",
        ar: 3190,
        kep: "kavek/mokkaskave.png",
        leiras: "Csokoládés, gazdag ízvilág."
    },

    {
        id: 110,
        nev: "Mézeskalácsos kávépor",
        ar: 3190,
        kep: "kavek/mezeskalacskave.png",
        leiras: "Fűszeres, ünnepi kávékülönlegesség."
    },

    {
        id: 111,
        nev: "Kókuszos kávépor",
        ar: 3090,
        kep: "kavek/kokuszoskave.png",
        leiras: "Lágy, egzotikus kókuszos íz."
    },

    {
        id: 112,
        nev: "Pisztáciás kávépor",
        ar: 3390,
        kep: "kavek/pisztaciaskave.png",
        leiras: "Krémes, pisztáciás különlegesség."
    },

    {
        id: 113,
        nev: "Fehércsokoládés kávépor",
        ar: 3290,
        kep: "kavek/fehercsokiskave.png",
        leiras: "Édes fehércsokoládés íz."
    },

    {
        id: 114,
        nev: "Sós karamellás kávépor",
        ar: 3290,
        kep: "kavek/soskaramellaskave.png",
        leiras: "Édes és sós ízek harmóniája."
    },

    {
        id: 115,
        nev: "Mandulás kávépor",
        ar: 3090,
        kep: "kavek/mandulaskave.png",
        leiras: "Finom mandulás aroma."
    },

    {
        id: 116,
        nev: "Narancsos kávépor",
        ar: 3090,
        kep: "kavek/narancsoskave.png",
        leiras: "Frissítő, gyümölcsös íz."
    },

    {
        id: 117,
        nev: "Málnás kávépor",
        ar: 3190,
        kep: "kavek/malnaskave.png",
        leiras: "Gyümölcsös, édes kávékülönlegesség."
    },

    {
        id: 118,
        nev: "Fűszeres chai kávépor",
        ar: 3290,
        kep: "kavek/fuszereschaikave.png",
        leiras: "Fahéjas, fűszeres kávéélmény."
    }

],
    kakaoTermekek: [
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
],
    matchaTermekek: [
    {
        id: 1,
        nev: "Epres Matcha",
        ar: 3590,
        kep: "matchak/epresmatchapor.png",
        leiras: "Prémium matcha eperízesítéssel."
    },
    {
        id: 2,
        nev: "Vaníliás Matcha",
        ar: 3490,
        kep: "matchak/vaniliasmatchapor.png",
        leiras: "Lágy, vaníliás matcha."
    },
    {
        id: 3,
        nev: "Original Matcha",
        ar: 3290,
        kep: "matchak/originalmatchapor.png",
        leiras: "Klasszikus, karakteres matcha íz."
    },
    {
        id: 4,
        nev: "Málnás Matcha",
        ar: 3590,
        kep: "matchak/malnasmatchapor.png",
        leiras: "Gyümölcsös, enyhén savanykás málnaíz."
    },
    {
        id: 5,
        nev: "Áfonyás Matcha",
        ar: 3690,
        kep: "matchak/afonyasmatchapor.png",
        leiras: "Kellemesen gyümölcsös áfonyás íz."
    },
    {
        id: 6,
        nev: "Citromos Matcha",
        ar: 3490,
        kep: "matchak/citromosmatchapor.png",
        leiras: "Frissítő, citrusos matcha."
    },
    {
        id: 7,
        nev: "Mangós Matcha",
        ar: 3690,
        kep: "matchak/mangosmatchapor.png",
        leiras: "Trópusi, gyümölcsös mangóíz."
    },
    {
        id: 8,
        nev: "Kókuszos Matcha",
        ar: 3590,
        kep: "matchak/kokuszosmatchapor.png",
        leiras: "Lágy, krémes kókuszos íz."
    },
    {
        id: 9,
        nev: "Mentás Matcha",
        ar: 3490,
        kep: "matchak/mentasmatchapor.png",
        leiras: "Friss, mentás ízvilág."
    },
    {
        id: 10,
        nev: "Karamellás Matcha",
        ar: 3690,
        kep: "matchak/karamellasmatchapor.png",
        leiras: "Édes, krémes karamellás íz."
    },
    {
        id: 11,
        nev: "Csokoládés Matcha",
        ar: 3690,
        kep: "matchak/csokoladesmatchapor.png",
        leiras: "Gazdag, csokoládés ízvilág."
    },
    {
        id: 12,
        nev: "Pisztáciás Matcha",
        ar: 3890,
        kep: "matchak/pisztaciasmatchapor.png",
        leiras: "Különleges, lágy pisztáciás íz."
    }
],
    kiegeszitoTermekek: [
    {
        id: 301,
        nev: "Kerámiabögre",
        ar: 2490,
        kep: "kiegeszitok/keramiabogre.webp",
        leiras: "Bézs, rusztikus kerámiabögre, 350 ml."
    },
    {
        id: 302,
        nev: "Üvegbögre",
        ar: 1690,
        kep: "kiegeszitok/uvegbogre.webp",
        leiras: "Átlátszó, füles üvegbögre, 300 ml."
    },
    {
        id: 303,
        nev: "Dupla falú üvegpohár",
        ar: 2990,
        kep: "kiegeszitok/duplafalupohar.webp",
        leiras: "Elegáns, hőszigetelő falú pohár, 250 ml."
    },
    {
        id: 304,
        nev: "Termoszbögre",
        ar: 5990,
        kep: "kiegeszitok/termoszbogre.webp",
        leiras: "Fedeles, bézs utazóbögre, 400 ml."
    },
    {
        id: 305,
        nev: "Szívószálas üvegpohár",
        ar: 3490,
        kep: "kiegeszitok/szivoszalaspohar.webp",
        leiras: "Bambuszfedeles pohár üveg szívószállal, 450 ml."
    },
    {
        id: 306,
        nev: "Bambusz matcha habverő",
        ar: 5490,
        kep: "kiegeszitok/bambuszhabvero.webp",
        leiras: "Hagyományos bambusz habverő a matcha elkészítéséhez."
    },
    {
        id: 307,
        nev: "Kerámia matcha tál",
        ar: 6490,
        kep: "kiegeszitok/matchatal.webp",
        leiras: "Zöld mázas, széles kerámiatál a matcha keveréséhez."
    },
    {
        id: 308,
        nev: "Kerámia habverőtartó",
        ar: 2890,
        kep: "kiegeszitok/habverotarto.webp",
        leiras: "Krémszínű tartó a bambusz habverő tárolásához."
    },
    {
        id: 309,
        nev: "Bambusz adagolókanál",
        ar: 1490,
        kep: "kiegeszitok/bambuszkanal.webp",
        leiras: "Ívelt bambuszkanál a matchapor adagolásához."
    },
    {
        id: 310,
        nev: "Matcha szűrő",
        ar: 1990,
        kep: "kiegeszitok/matchaszuro.webp",
        leiras: "Finom hálós acélszűrő a por átszitálásához."
    },
    {
        id: 311,
        nev: "Elektromos tejhabosító",
        ar: 3990,
        kep: "kiegeszitok/tejhabosito.webp",
        leiras: "Kézi habosító krémes tejhab készítéséhez."
    },
    {
        id: 312,
        nev: "Rozsdamentes tejkiöntő",
        ar: 3490,
        kep: "kiegeszitok/tejkionto.webp",
        leiras: "Fém tejkiöntő, 350 ml, formázott kiöntőcsőrrel."
    },
    {
        id: 313,
        nev: "Rozsdamentes mérőkanál",
        ar: 1290,
        kep: "kiegeszitok/merokanal.webp",
        leiras: "Tartós acélkanál kávé- és kakaóporhoz."
    },
    {
        id: 314,
        nev: "Kézi kávédaráló",
        ar: 8990,
        kep: "kiegeszitok/kavedaralo.webp",
        leiras: "Klasszikus, fa házas, tekerős kávédaráló."
    },
    {
        id: 315,
        nev: "Francia kávéfőző",
        ar: 5490,
        kep: "kiegeszitok/franciakavefozo.webp",
        leiras: "Dugattyús üveg kávéfőző, 600 ml."
    },
    {
        id: 316,
        nev: "Kotyogós kávéfőző",
        ar: 6990,
        kep: "kiegeszitok/kotyogos.webp",
        leiras: "Klasszikus alumínium kávéfőző, 3 csészés."
    },
    {
        id: 317,
        nev: "Kerámia kávécsepegtető",
        ar: 3990,
        kep: "kiegeszitok/kavecsepegteto.webp",
        leiras: "Krémszínű kerámia tölcsér filteres kávéhoz."
    },
    {
        id: 318,
        nev: "Papír kávéfilter",
        ar: 1490,
        kep: "kiegeszitok/papirfilter.webp",
        leiras: "Kúpos, natúr papírfilter, 40 darabos csomag."
    },
    {
        id: 319,
        nev: "Légmentes tárolódoboz",
        ar: 3990,
        kep: "kiegeszitok/tarolodoboz.webp",
        leiras: "Bézs, csatos fedelű tároló kávéhoz vagy teához."
    },
    {
        id: 320,
        nev: "Parafa poháralátét",
        ar: 690,
        kep: "kiegeszitok/poharalatet.webp",
        leiras: "Kerek, természetes parafa poháralátét."
    },
    {
        id: 321,
        nev: "Kávétejszín",
        ar: 490,
        kep: "kiegeszitok/kavetejszin.webp",
        leiras: "10%-os kávétejszín, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 322,
        nev: "Habtejszín",
        ar: 790,
        kep: "kiegeszitok/habtejszin.webp",
        leiras: "30%-os habtejszín, 200 ml, desszertekhez is.",
        kategoria: "tejszinek"
    },
    {
        id: 323,
        nev: "Zabkrém",
        ar: 690,
        kep: "kiegeszitok/zabkrem.webp",
        leiras: "Lágy, zabalapú növényi tejszínhelyettesítő, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 324,
        nev: "Kókuszkrém",
        ar: 890,
        kep: "kiegeszitok/kokuszkrem.webp",
        leiras: "Krémes, kókuszalapú növényi alternatíva, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 325,
        nev: "Laktózmentes tejszín",
        ar: 690,
        kep: "kiegeszitok/laktozmentes-tejszin.webp",
        leiras: "Laktózmentes, tejalapú tejszín, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 326,
        nev: "Főzőtejszín",
        ar: 590,
        kep: "kiegeszitok/fozotejszin.webp",
        leiras: "20%-os főzőtejszín mártásokhoz és krémlevesekhez, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 327,
        nev: "Mandulakrém",
        ar: 790,
        kep: "kiegeszitok/mandulakrem.webp",
        leiras: "Enyhén diós ízű, mandulaalapú növényi krém, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 328,
        nev: "Szójatejszín",
        ar: 690,
        kep: "kiegeszitok/szojatejszin.webp",
        leiras: "Selymes, szójaalapú növényi tejszínhelyettesítő, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 329,
        nev: "Rizskrém",
        ar: 650,
        kep: "kiegeszitok/rizskrem.webp",
        leiras: "Semleges ízű, rizsalapú növényi krém, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 330,
        nev: "Kesudiókrém",
        ar: 990,
        kep: "kiegeszitok/kesudiokrem.webp",
        leiras: "Krémes, kesudióalapú növényi alternatíva, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 331,
        nev: "Vaníliás kávékrém",
        ar: 790,
        kep: "kiegeszitok/vanilias-kavekrem.webp",
        leiras: "Vaníliás ízesítésű, tejalapú kávékrém, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 332,
        nev: "Karamellás kávékrém",
        ar: 790,
        kep: "kiegeszitok/karamellas-kavekrem.webp",
        leiras: "Karamellás ízesítésű, tejalapú kávékrém, 200 ml.",
        kategoria: "tejszinek"
    }
]
};
