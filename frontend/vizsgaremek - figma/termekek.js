// Közös termékadatok: a webshop és a kereső ugyanazt a katalógust használja.
const CozyTermekek = {
    kaveTermekek: [

    {
        id: 101,
        ajanlas: "Klasszikus reggeli kávéhoz vagy tejes italok alapjaként is kipróbálhatod.",
        nev: "Klasszikus kávépor",
        ar: 2690,
        kep: "kavek/klasszikuskave.png",
        leiras: "Gazdag aromájú klasszikus kávé."
    },

    {
        id: 102,
        ajanlas: "A vaníliás íz jól illik egy habos lattéhoz vagy jeges tejes kávéhoz.",
        nev: "Vaníliás kávépor",
        ar: 2890,
        kep: "kavek/vaniliaskave.png",
        leiras: "Lágy vaníliás ízvilág."
    },

    {
        id: 103,
        ajanlas: "Próbáld ki tejhabbal vagy egy mogyorós desszert mellé.",
        nev: "Mogyorós kávépor",
        ar: 2990,
        kep: "kavek/mogyoroskave.png",
        leiras: "Különleges mogyorós aroma."
    },

    {
        id: 104,
        ajanlas: "Karamellás latte vagy jegeskávé készítéséhez is jó választás.",
        nev: "Karamellás kávépor",
        ar: 2990,
        kep: "kavek/karamellaskave.png",
        leiras: "Édes, krémes karamellás íz."
    },

    {
        id: 105,
        ajanlas: "Tejjel és egy kevés fahéjjal hangulatos, fűszeres kávéital készülhet belőle.",
        nev: "Fahéjas kávépor",
        ar: 2890,
        kep: "kavek/fahejaskave.png",
        leiras: "Melengető fahéjas kávé."
    },

    {
        id: 106,
        ajanlas: "Desszert jellegű tejes kávéhoz ajánljuk.",
        nev: "Ír krémes kávépor",
        ar: 3190,
        kep: "kavek/irkremeskave.png",
        leiras: "Krémes, különleges kávéélmény."
    },

    {
        id: 107,
        ajanlas: "Ha a határozott kávéízt kedveled, önmagában vagy tejjel is kipróbálhatod.",
        nev: "Erős pörkölésű kávépor",
        ar: 2790,
        kep: "kavek/erosporkolesukave.png",
        leiras: "Intenzív, karakteres íz."
    },

    {
        id: 108,
        ajanlas: "A klasszikus kávéíz kedvelőinek, akik koffeinmentes változatot keresnek.",
        nev: "Koffeinmentes kávépor",
        ar: 2990,
        kep: "kavek/koffeinmenteskave.png",
        leiras: "Kávéélmény koffein nélkül."
    },

    {
        id: 109,
        ajanlas: "Tejjel és kakaós ízekkel kombinálva mokkás latte alapja lehet.",
        nev: "Mokkás kávépor",
        ar: 3190,
        kep: "kavek/mokkaskave.png",
        leiras: "Csokoládés, gazdag ízvilág."
    },

    {
        id: 110,
        ajanlas: "Különösen jól illik a mézeskalácsos desszertek és tejes italok mellé.",
        nev: "Mézeskalácsos kávépor",
        ar: 3190,
        kep: "kavek/mezeskalacskave.png",
        leiras: "Fűszeres, ünnepi kávékülönlegesség."
    },

    {
        id: 111,
        ajanlas: "Kókuszos latte vagy jeges tejes kávé alapjaként is kipróbálható.",
        nev: "Kókuszos kávépor",
        ar: 3090,
        kep: "kavek/kokuszoskave.png",
        leiras: "Lágy, egzotikus kókuszos íz."
    },

    {
        id: 112,
        ajanlas: "A pisztáciás íz jól párosítható tejhabbal és desszertekkel.",
        nev: "Pisztáciás kávépor",
        ar: 3390,
        kep: "kavek/pisztaciaskave.png",
        leiras: "Krémes, pisztáciás különlegesség."
    },

    {
        id: 113,
        ajanlas: "Tejes kávékhoz, különösen fehércsokoládés lattéhoz ajánljuk.",
        nev: "Fehércsokoládés kávépor",
        ar: 3290,
        kep: "kavek/fehercsokiskave.png",
        leiras: "Édes fehércsokoládés íz."
    },

    {
        id: 114,
        ajanlas: "A sós-édes ízvilág jól illik egy krémes jegeskávéhoz.",
        nev: "Sós karamellás kávépor",
        ar: 3290,
        kep: "kavek/soskaramellaskave.png",
        leiras: "Édes és sós ízek harmóniája."
    },

    {
        id: 115,
        ajanlas: "Mandulás desszertek mellé vagy tejes kávékhoz is kipróbálható.",
        nev: "Mandulás kávépor",
        ar: 3090,
        kep: "kavek/mandulaskave.png",
        leiras: "Finom mandulás aroma."
    },

    {
        id: 116,
        ajanlas: "A citrusos ízek kedvelőinek, akár jeges változatban is.",
        nev: "Narancsos kávépor",
        ar: 3090,
        kep: "kavek/narancsoskave.png",
        leiras: "Frissítő, gyümölcsös íz."
    },

    {
        id: 117,
        ajanlas: "Málnás tejes kávé vagy gyümölcsös desszert mellé ajánljuk.",
        nev: "Málnás kávépor",
        ar: 3190,
        kep: "kavek/malnaskave.png",
        leiras: "Gyümölcsös, édes kávékülönlegesség."
    },

    {
        id: 118,
        ajanlas: "A chai jellegű fűszeres íz tejjel is jól párosítható.",
        nev: "Fűszeres chai kávépor",
        ar: 3290,
        kep: "kavek/fuszereschaikave.png",
        leiras: "Fahéjas, fűszeres kávéélmény."
    }

],
    kakaoTermekek: [
    {
        id: 201,
        ajanlas: "Meleg vagy hideg kakaóitalhoz, illetve kakaós desszertek ízesítéséhez is kipróbálható.",
        nev: "Klasszikus kakaópor",
        ar: 2490,
        kep: "kako/klasszikuskakaopor.png",
        leiras: "Gazdag, lágy kakaóíz."
    },
    {
        id: 202,
        ajanlas: "Vaníliás tejes kakaóhoz vagy desszertitalokhoz ajánljuk.",
        nev: "Vaníliás kakaópor",
        ar: 2690,
        kep: "kako/vaniliaskakaopor.png",
        leiras: "Lágy, krémes vaníliás íz."
    },
    {
        id: 203,
        ajanlas: "Mogyorós desszertek mellé vagy habos kakaóitalhoz is jó választás.",
        nev: "Mogyorós kakaópor",
        ar: 2790,
        kep: "kako/mogyoroskakaopor.png",
        leiras: "Krémes, mogyorós kakaó."
    },
    {
        id: 204,
        ajanlas: "Tejjel kombinálva karamellás desszertital alapja lehet.",
        nev: "Karamellás kakaópor",
        ar: 2790,
        kep: "kako/karamellaskakaopor.png",
        leiras: "Édes, krémes karamellás íz."
    },
    {
        id: 205,
        ajanlas: "Egy fűszeres, meleg kakaóhoz vagy fahéjas desszert mellé ajánljuk.",
        nev: "Fahéjas kakaópor",
        ar: 2690,
        kep: "kako/fahejaskakaopor.png",
        leiras: "Melengető, fahéjas kakaó."
    },
    {
        id: 206,
        ajanlas: "Krémes jellegű tejes kakaóhoz, desszertitalokhoz is kipróbálható.",
        nev: "Ír krémes kakaópor",
        ar: 2890,
        kep: "kako/irkremeskakaopor.png",
        leiras: "Lágy, krémes kakaókülönlegesség."
    },
    {
        id: 207,
        ajanlas: "Az intenzív csokoládés íz kedvelőinek, meleg vagy hideg kakaóhoz.",
        nev: "Étcsokoládés kakaópor",
        ar: 2890,
        kep: "kako/etcsokoladeskakaopor.png",
        leiras: "Intenzív, gazdag csokoládéíz."
    },
    {
        id: 208,
        ajanlas: "Fehércsokoládés ízvilágú tejes italok és desszertek mellé ajánljuk.",
        nev: "Fehércsokoládés kakaópor",
        ar: 2990,
        kep: "kako/fehercsokoladeskakaopor.png",
        leiras: "Édes, lágy fehércsokoládés íz."
    },
    {
        id: 209,
        ajanlas: "A karamellás és enyhén sós ízek kedvelőinek, habos kakaóhoz.",
        nev: "Sós karamellás kakaópor",
        ar: 2990,
        kep: "kako/soskaramellaskakaopor.png",
        leiras: "Édes és enyhén sós karamell."
    },
    {
        id: 210,
        ajanlas: "Málnás desszertekhez vagy gyümölcsös jellegű kakaóitalhoz illik.",
        nev: "Málnás kakaópor",
        ar: 2890,
        kep: "kako/malnaskakaopor.png",
        leiras: "Gyümölcsös, édes kakaóíz."
    },
    {
        id: 211,
        ajanlas: "Narancsos-csokoládés ízpárosításhoz ajánljuk.",
        nev: "Narancsos kakaópor",
        ar: 2790,
        kep: "kako/narancsoskakaopor.png",
        leiras: "Frissítő, citrusos kakaó."
    },
    {
        id: 212,
        ajanlas: "Kókuszos tejes italokhoz és desszertek mellé is kipróbálható.",
        nev: "Kókuszos kakaópor",
        ar: 2890,
        kep: "kako/kokuszoskakaopor.png",
        leiras: "Krémes, egzotikus kókuszos íz."
    },
    {
        id: 213,
        ajanlas: "Pisztáciás desszert mellé vagy krémes kakaóitalhoz ajánljuk.",
        nev: "Pisztáciás kakaópor",
        ar: 3190,
        kep: "kako/pisztaciaskakaopor.png",
        leiras: "Lágy, diós kakaókülönlegesség."
    },
    {
        id: 214,
        ajanlas: "Mézeskalács és más fűszeres sütemények mellé is illik.",
        nev: "Mézeskalácsos kakaópor",
        ar: 2990,
        kep: "kako/mezeskalacsoskakaopor.png",
        leiras: "Fűszeres, ünnepi kakaó."
    },
    {
        id: 215,
        ajanlas: "Mandulás ízvilágú tejes kakaóhoz ajánljuk.",
        nev: "Mandulás kakaópor",
        ar: 2890,
        kep: "kako/mandulaskakaopor.png",
        leiras: "Lágy, krémes mandulás íz."
    },
    {
        id: 216,
        ajanlas: "A gyümölcsös és fehércsokoládés ízeket kedvelőknek.",
        nev: "Fehércsokoládés-málnás kakaópor",
        ar: 3290,
        kep: "kako/fehercsokoladeskakaopor (2).png",
        leiras: "Fehércsokoládé és málna harmóniája."
    },
    {
        id: 217,
        ajanlas: "Brownie mellé vagy süteményes jellegű desszertitalhoz ajánljuk.",
        nev: "Brownie ízű kakaópor",
        ar: 3190,
        kep: "kako/browniekakaopor.png",
        leiras: "Intenzív, süteményes csokoládéíz."
    },
    {
        id: 218,
        ajanlas: "Marcipános desszertek mellé vagy különleges tejes kakaóhoz.",
        nev: "Marcipános kakaópor",
        ar: 3090,
        kep: "kako/marcipanoskakaopor.png",
        leiras: "Édes, különleges marcipáníz."
    }
],
    matchaTermekek: [
    {
        id: 1,
        ajanlas: "Jeges epres matcha lattéhoz is kipróbálható; a Receptek oldalon ötletet is találsz hozzá.",
        nev: "Epres Matcha",
        ar: 3590,
        kep: "matchak/epresmatchapor.png",
        leiras: "Prémium matcha eperízesítéssel."
    },
    {
        id: 2,
        ajanlas: "Vaníliás matcha latte készítéséhez vagy önmagában is kipróbálható.",
        nev: "Vaníliás Matcha",
        ar: 3490,
        kep: "matchak/vaniliasmatchapor.png",
        leiras: "Lágy, vaníliás matcha."
    },
    {
        id: 3,
        ajanlas: "Hagyományos matcha italhoz vagy tejes matcha lattéhoz is használható.",
        nev: "Original Matcha",
        ar: 3290,
        kep: "matchak/originalmatchapor.png",
        leiras: "Klasszikus, karakteres matcha íz."
    },
    {
        id: 4,
        ajanlas: "Jeges, gyümölcsös matcha italokhoz ajánljuk.",
        nev: "Málnás Matcha",
        ar: 3590,
        kep: "matchak/malnasmatchapor.png",
        leiras: "Gyümölcsös, enyhén savanykás málnaíz."
    },
    {
        id: 5,
        ajanlas: "Áfonyás matcha latte vagy gyümölcsös desszert mellé is illik.",
        nev: "Áfonyás Matcha",
        ar: 3690,
        kep: "matchak/afonyasmatchapor.png",
        leiras: "Kellemesen gyümölcsös áfonyás íz."
    },
    {
        id: 6,
        ajanlas: "Frissítő, citrusos jeges matcha italhoz ajánljuk.",
        nev: "Citromos Matcha",
        ar: 3490,
        kep: "matchak/citromosmatchapor.png",
        leiras: "Frissítő, citrusos matcha."
    },
    {
        id: 7,
        ajanlas: "Mangós, trópusi hangulatú matcha lattéhoz is kipróbálható.",
        nev: "Mangós Matcha",
        ar: 3690,
        kep: "matchak/mangosmatchapor.png",
        leiras: "Trópusi, gyümölcsös mangóíz."
    },
    {
        id: 8,
        ajanlas: "Kókuszos tejitalokkal kombinálva különleges matcha latte készülhet belőle.",
        nev: "Kókuszos Matcha",
        ar: 3590,
        kep: "matchak/kokuszosmatchapor.png",
        leiras: "Lágy, krémes kókuszos íz."
    },
    {
        id: 9,
        ajanlas: "Mentás jeges matcha italhoz vagy önmagában is kipróbálható.",
        nev: "Mentás Matcha",
        ar: 3490,
        kep: "matchak/mentasmatchapor.png",
        leiras: "Friss, mentás ízvilág."
    },
    {
        id: 10,
        ajanlas: "Karamellás tejes matcha latte alapjaként ajánljuk.",
        nev: "Karamellás Matcha",
        ar: 3690,
        kep: "matchak/karamellasmatchapor.png",
        leiras: "Édes, krémes karamellás íz."
    },
    {
        id: 11,
        ajanlas: "Csokoládés jellegű matcha latte vagy desszert mellé is illik.",
        nev: "Csokoládés Matcha",
        ar: 3690,
        kep: "matchak/csokoladesmatchapor.png",
        leiras: "Gazdag, csokoládés ízvilág."
    },
    {
        id: 12,
        ajanlas: "Pisztáciás tejes matcha italhoz és desszertek mellé ajánljuk.",
        nev: "Pisztáciás Matcha",
        ar: 3890,
        kep: "matchak/pisztaciasmatchapor.png",
        leiras: "Különleges, lágy pisztáciás íz."
    }
],
    kiegeszitoTermekek: [
    {
        id: 301,
        ajanlas: "Mindennapi kávé, tea vagy kakaó tálalásához használható.",
        nev: "Kerámiabögre",
        ar: 2490,
        kep: "kiegeszitok/keramiabogre.webp",
        leiras: "Bézs, rusztikus kerámiabögre, 350 ml."
    },
    {
        id: 302,
        ajanlas: "Az átlátszó falon a réteges latte is jól látható.",
        nev: "Üvegbögre",
        ar: 1690,
        kep: "kiegeszitok/uvegbogre.webp",
        leiras: "Átlátszó, füles üvegbögre, 300 ml."
    },
    {
        id: 303,
        ajanlas: "Réteges kávék, matcha latte és más italok tálalásához ajánljuk.",
        nev: "Dupla falú üvegpohár",
        ar: 2990,
        kep: "kiegeszitok/duplafalupohar.webp",
        leiras: "Elegáns, hőszigetelő falú pohár, 250 ml."
    },
    {
        id: 304,
        ajanlas: "Praktikus választás, ha magaddal vinnéd a kedvenc italodat.",
        nev: "Termoszbögre",
        ar: 5990,
        kep: "kiegeszitok/termoszbogre.webp",
        leiras: "Fedeles, bézs utazóbögre, 400 ml."
    },
    {
        id: 305,
        ajanlas: "Jeges kávé és hideg matcha italok tálalásához ajánljuk.",
        nev: "Szívószálas üvegpohár",
        ar: 3490,
        kep: "kiegeszitok/szivoszalaspohar.webp",
        leiras: "Bambuszfedeles pohár üveg szívószállal, 450 ml."
    },
    {
        id: 306,
        ajanlas: "A por és a víz összekeverésére, a matcha habosítására szolgál.",
        nev: "Bambusz matcha habverő",
        ar: 5490,
        kep: "kiegeszitok/bambuszhabvero.webp",
        leiras: "Hagyományos bambusz habverő a matcha elkészítéséhez."
    },
    {
        id: 307,
        ajanlas: "Széles formája helyet biztosít a matcha habverővel történő keveréséhez.",
        nev: "Kerámia matcha tál",
        ar: 6490,
        kep: "kiegeszitok/matchatal.webp",
        leiras: "Zöld mázas, széles kerámiatál a matcha keveréséhez."
    },
    {
        id: 308,
        ajanlas: "A matcha habverő rendezett tárolásához ajánljuk.",
        nev: "Kerámia habverőtartó",
        ar: 2890,
        kep: "kiegeszitok/habverotarto.webp",
        leiras: "Krémszínű tartó a bambusz habverő tárolásához."
    },
    {
        id: 309,
        ajanlas: "A matchapor kis adagokban történő kiméréséhez használható.",
        nev: "Bambusz adagolókanál",
        ar: 1490,
        kep: "kiegeszitok/bambuszkanal.webp",
        leiras: "Ívelt bambuszkanál a matchapor adagolásához."
    },
    {
        id: 310,
        ajanlas: "Az átszitálás segíthet a matchapor csomóinak fellazításában.",
        nev: "Matcha szűrő",
        ar: 1990,
        kep: "kiegeszitok/matchaszuro.webp",
        leiras: "Finom hálós acélszűrő a por átszitálásához."
    },
    {
        id: 311,
        ajanlas: "Latte, cappuccino vagy matcha ital tejhabjához használható.",
        nev: "Elektromos tejhabosító",
        ar: 3990,
        kep: "kiegeszitok/tejhabosito.webp",
        leiras: "Kézi habosító krémes tejhab készítéséhez."
    },
    {
        id: 312,
        ajanlas: "Tej és tejhab adagolásához, latte készítéséhez ajánljuk.",
        nev: "Rozsdamentes tejkiöntő",
        ar: 3490,
        kep: "kiegeszitok/tejkionto.webp",
        leiras: "Fém tejkiöntő, 350 ml, formázott kiöntőcsőrrel."
    },
    {
        id: 313,
        ajanlas: "A porok kényelmes kiméréséhez használható.",
        nev: "Rozsdamentes mérőkanál",
        ar: 1290,
        kep: "kiegeszitok/merokanal.webp",
        leiras: "Tartós acélkanál kávé- és kakaóporhoz."
    },
    {
        id: 314,
        ajanlas: "Szemes kávé kézi őrléséhez ajánljuk.",
        nev: "Kézi kávédaráló",
        ar: 8990,
        kep: "kiegeszitok/kavedaralo.webp",
        leiras: "Klasszikus, fa házas, tekerős kávédaráló."
    },
    {
        id: 315,
        ajanlas: "A szűrődugattyús kávékészítési mód kedvelőinek.",
        nev: "Francia kávéfőző",
        ar: 5490,
        kep: "kiegeszitok/franciakavefozo.webp",
        leiras: "Dugattyús üveg kávéfőző, 600 ml."
    },
    {
        id: 316,
        ajanlas: "Klasszikus kotyogós kávé elkészítéséhez használható.",
        nev: "Kotyogós kávéfőző",
        ar: 6990,
        kep: "kiegeszitok/kotyogos.webp",
        leiras: "Klasszikus alumínium kávéfőző, 3 csészés."
    },
    {
        id: 317,
        ajanlas: "Papírfilterrel, filteres kávé készítéséhez ajánljuk.",
        nev: "Kerámia kávécsepegtető",
        ar: 3990,
        kep: "kiegeszitok/kavecsepegteto.webp",
        leiras: "Krémszínű kerámia tölcsér filteres kávéhoz."
    },
    {
        id: 318,
        ajanlas: "A megfelelő méretű, kúpos filtertartóval használható.",
        nev: "Papír kávéfilter",
        ar: 1490,
        kep: "kiegeszitok/papirfilter.webp",
        leiras: "Kúpos, natúr papírfilter, 40 darabos csomag."
    },
    {
        id: 319,
        ajanlas: "A kávé vagy tea rendezett tárolásához ajánljuk.",
        nev: "Légmentes tárolódoboz",
        ar: 3990,
        kep: "kiegeszitok/tarolodoboz.webp",
        leiras: "Bézs, csatos fedelű tároló kávéhoz vagy teához."
    },
    {
        id: 320,
        ajanlas: "A pohár alá helyezve segíthet megóvni az asztal felületét.",
        nev: "Parafa poháralátét",
        ar: 690,
        kep: "kiegeszitok/poharalatet.webp",
        leiras: "Kerek, természetes parafa poháralátét."
    },
    {
        id: 321,
        ajanlas: "Kávé vagy más tejes ital krémesítéséhez ajánljuk.",
        nev: "Kávétejszín",
        ar: 490,
        kep: "kiegeszitok/kavetejszin.webp",
        leiras: "10%-os kávétejszín, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 322,
        ajanlas: "Habos desszertekhez és a megfelelő elkészítés mellett tejszínhabhoz is használható.",
        nev: "Habtejszín",
        ar: 790,
        kep: "kiegeszitok/habtejszin.webp",
        leiras: "30%-os habtejszín, 200 ml, desszertekhez is.",
        kategoria: "tejszinek"
    },
    {
        id: 323,
        ajanlas: "Növényi alternatíva italok és krémes ételek készítéséhez.",
        nev: "Zabkrém",
        ar: 690,
        kep: "kiegeszitok/zabkrem.webp",
        leiras: "Lágy, zabalapú növényi tejszínhelyettesítő, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 324,
        ajanlas: "Kókuszos desszertekhez, italokhoz és krémes fogásokhoz is kipróbálható.",
        nev: "Kókuszkrém",
        ar: 890,
        kep: "kiegeszitok/kokuszkrem.webp",
        leiras: "Krémes, kókuszalapú növényi alternatíva, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 325,
        ajanlas: "A laktózmentes tejalapú alternatívát keresőknek; nem tejmentes.",
        nev: "Laktózmentes tejszín",
        ar: 690,
        kep: "kiegeszitok/laktozmentes-tejszin.webp",
        leiras: "Laktózmentes, tejalapú tejszín, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 326,
        ajanlas: "Mártásokhoz, levesekhez és főtt krémes ételekhez ajánljuk.",
        nev: "Főzőtejszín",
        ar: 590,
        kep: "kiegeszitok/fozotejszin.webp",
        leiras: "20%-os főzőtejszín mártásokhoz és krémlevesekhez, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 327,
        ajanlas: "Mandulás ízű krémes fogásokhoz vagy desszertekhez is kipróbálható.",
        nev: "Mandulakrém",
        ar: 790,
        kep: "kiegeszitok/mandulakrem.webp",
        leiras: "Enyhén diós ízű, mandulaalapú növényi krém, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 328,
        ajanlas: "Növényi tejszínhelyettesítő krémes ételekhez és italokhoz.",
        nev: "Szójatejszín",
        ar: 690,
        kep: "kiegeszitok/szojatejszin.webp",
        leiras: "Selymes, szójaalapú növényi tejszínhelyettesítő, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 329,
        ajanlas: "Semlegesebb ízű alternatíva ételek krémesítéséhez.",
        nev: "Rizskrém",
        ar: 650,
        kep: "kiegeszitok/rizskrem.webp",
        leiras: "Semleges ízű, rizsalapú növényi krém, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 330,
        ajanlas: "Kesudióalapú krém, desszertekhez és krémes fogásokhoz.",
        nev: "Kesudiókrém",
        ar: 990,
        kep: "kiegeszitok/kesudiokrem.webp",
        leiras: "Krémes, kesudióalapú növényi alternatíva, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 331,
        ajanlas: "Vaníliás ízű tejes kávéhoz és desszertitalokhoz ajánljuk.",
        nev: "Vaníliás kávékrém",
        ar: 790,
        kep: "kiegeszitok/vanilias-kavekrem.webp",
        leiras: "Vaníliás ízesítésű, tejalapú kávékrém, 200 ml.",
        kategoria: "tejszinek"
    },
    {
        id: 332,
        ajanlas: "Karamellás tejes kávé és desszertitalok ízesítéséhez ajánljuk.",
        nev: "Karamellás kávékrém",
        ar: 790,
        kep: "kiegeszitok/karamellas-kavekrem.webp",
        leiras: "Karamellás ízesítésű, tejalapú kávékrém, 200 ml.",
        kategoria: "tejszinek"
    }
]
};
