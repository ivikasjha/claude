// Component demo: one slide per component family. Not part of the deck.
const SECTION = "Demo";
async function build(ui) {
  const { C, M, W, text, img } = ui;
  const SP = "/tmp/claude-0/-home-user/9e4b9fe4-ecb0-53c7-a8dc-1aafb6b2898c/scratchpad/restored/";

  await ui.sectionDivider(SECTION, { id: "demo-div", num: 4, kicker: "PART 4 · PERMISSION", title: "Regulation in India: who allows what, for which device?", blurb: "From the 1940 Act to the 2017 Rules, and how a Class B wearable reaches the market.", items: [{ icon: "LuLayers", text: "Four risk classes and what decides them" }, { icon: "LuFileCheck", text: "Which licence, from which authority, with which form" }, { icon: "LuSiren", text: "What every licence holder must keep doing" }], photo: { file: SP + "fogo_emc_test.jpg", caption: "FoGO ankle module under EMC pre-compliance testing, 2026" } });

  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "demo-stats", kicker: "INDIA · THE SCENARIO", title: "India's medical device moment", stage: 3 });
    await ui.statTiles(s, [
      { value: "US$ 12 bn", label: "Market size, 2023", sub: "≈1.5% of the world market", icon: "LuChartBar" },
      { value: "70–80%", label: "Imported", sub: "by value of consumption", icon: "LuShip", color: C.accent3 },
      { value: "US$ 50 bn", label: "2030 ambition", sub: "National Medical Devices Policy 2023", icon: "LuTarget", color: C.accent2 },
      { value: "1 Apr 2020", label: "All devices regulated", sub: "S.O. 648(E), 11 Feb 2020", icon: "LuGavel", color: C.accent4 },
    ]);
    ui.chevronFlow(s, [
      { title: "Need", detail: "Observe care, write a solution-neutral need" },
      { title: "Classify", detail: "Intended use → Class A/B/C/D" },
      { title: "Test licence", detail: "MD-12 → MD-13 for test units" },
      { title: "Investigate", detail: "MD-22 → MD-23, ethics, CTRI" },
      { title: "Licence", detail: "MD-5 (State) or MD-9 (Central)" },
      { title: "Sustain", detail: "PSUR, MvPI, change control" },
    ], { y: 3.7, h: 0.66, detailH: 1.0 });
    ui.callout(s, "Regulation is a sequence of questions, each answered by a different permission.", { y: 6.15 });
  }

  {
    const s = ui.newSlide("DARK", SECTION, { id: "demo-timeline", kicker: "INDIA · HOW WE GOT HERE", title: "From ten notified devices to all devices", stage: 3 });
    ui.timeline(s, [
      { date: "1940", label: "Drugs & Cosmetics Act", detail: "Devices can be notified as 'drugs'" },
      { date: "2005", label: "Ten devices notified", detail: "Stents, catheters, implants" },
      { date: "2017", label: "Medical Devices Rules", detail: "G.S.R. 78(E); in force 1 Jan 2018", big: true, color: C.accent2 },
      { date: "2020", label: "All devices regulated", detail: "From 1 April 2020" },
      { date: "2022", label: "Class A/B licensing", detail: "Mandatory from 1 Oct 2022" },
      { date: "2023", label: "Class C/D licensing", detail: "Mandatory from 1 Oct 2023" },
      { date: "2026", label: "Software guidance", detail: "MDSW guidance, 21 Jul 2026" },
    ], { dark: true, y: 3.9 });
  }

  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "demo-ladder", kicker: "INDIA · RISK CLASSES", title: "Four classes decide the route", stage: 3 });
    ui.classLadder(s, [
      { cls: "A", name: "Low", risk: "Low risk", examples: ["Thermometers", "Tongue depressors", "Surgical dressings"], route: "State licence · MD-5" },
      { cls: "B", name: "Low–moderate", risk: "Low–moderate risk", examples: ["BP monitors", "Hypodermic needles", "Suction equipment", "FoGO (proposed)"], route: "State licence · MD-5" },
      { cls: "C", name: "Moderate–high", risk: "Moderate–high risk", examples: ["Ventilators", "Bone fixation plates", "Dialysis machines"], route: "Central licence · MD-9" },
      { cls: "D", name: "High", risk: "High risk", examples: ["Heart valves", "Coronary stents", "Implantable defibrillators"], route: "Central licence · MD-9" },
    ], { w: 7.2 });
    await ui.cardGrid(s, [
      { icon: "LuScanLine", title: "Non-invasive", body: "Rules 1–4 of the First Schedule", color: C.accent4 },
      { icon: "LuSyringe", title: "Invasive", body: "Rules 5–8: duration and body site", color: C.accent4 },
      { icon: "LuZap", title: "Active", body: "Rules 9–13: energy, software, diagnosis", color: C.accent4 },
      { icon: "LuAsterisk", title: "Special", body: "Rules 14–22: contraceptives, disinfectants, IVDs", color: C.accent4 },
    ], { x: 8.1, w: 4.63, h: 4.6, cols: 1, gap: 0.15, titleSize: 12, bodySize: 10, iconD: 0.46 });
  }

  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "demo-matrix", kicker: "INDIA · LICENCES", title: "Which licence, from whom, with which form", stage: 3 });
    const sla = { fill: { color: "E6F2EF" } }, cla = { fill: { color: "E7ECF4" } };
    ui.matrix(s, ["Activity", "Class A (non-sterile, non-measuring)", "Class A (sterile/measuring) & B", "Class C & D", "Who decides"],
      [
        ["Manufacture", "Registration (online)", "MD-3 → MD-5", "MD-7 → MD-9", "State (A/B) · Central (C/D)"],
        ["Loan licence", "—", "MD-4 → MD-6", "MD-8 → MD-10", "State · Central"],
        ["Import", "MD-14 → MD-15", "MD-14 → MD-15", "MD-14 → MD-15", "Central"],
        ["Test licence", "MD-12 → MD-13", "MD-12 → MD-13", "MD-12 → MD-13", "Central"],
        ["Clinical investigation", "MD-22 → MD-23", "MD-22 → MD-23", "MD-22 → MD-23", "Central + ethics committee"],
        ["Sale / wholesale", "MD-41 → MD-42", "MD-41 → MD-42", "MD-41 → MD-42", "State"],
      ], { colW: [2.0, 2.6, 2.6, 2.3, 2.63], rowH: 0.52, cellStyle: (r, c) => (c === 2 ? sla : c === 3 ? cla : null) });
    ui.callout(s, "Demo values; final slide uses verified forms and fees.", { y: 5.8, color: C.accent3 });
  }

  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "demo-compare", kicker: "ABROAD · COMPARISON", title: "Three systems, one logic", stage: 3 });
    await ui.compareColumns(s, [
      { title: "India · CDSCO", color: C.accent2, flag: await ui.flagPng("IN"), items: ["Classes A, B, C, D (MDR-2017)", "State licence for A/B; Central for C/D", "Notified-body audit (A/B); CDSCO inspection (C/D)", "QMS: Fifth Schedule (ISO 13485-aligned)", "Post-market: PSUR, MvPI"] },
      { title: "USA · FDA", color: C.accent4, flag: await ui.flagPng("US"), items: ["Classes I, II, III", "510(k), De Novo, PMA; IDE for studies", "QMSR (ISO 13485) from 2 Feb 2026", "User fees per submission", "MAUDE, recalls, UDI"] },
      { title: "EU · MDR 2017/745", color: C.accent1, flag: await ui.euFlagPng(), items: ["Classes I, IIa, IIb, III", "Notified bodies issue CE certificates", "Clinical evaluation + PMCF", "EUDAMED, UDI", "Transition to 2027/2028"] },
    ], { h: 4.4 });
    ui.callout(s, "Same questions everywhere: what is it for, how risky is it, what evidence, who keeps watching?", { y: 6.35 });
  }

  {
    const s = ui.newSlide("DARK", SECTION, { id: "demo-map", kicker: "ABROAD · REGULATORS", title: "Where the rules come from", stage: 3 });
    const hl = { in: "E0962A", us: "3D5A80", gb: "3D5A80", jp: "3D5A80", cn: "3D5A80", au: "3D5A80", ca: "3D5A80", br: "3D5A80", sg: "3D5A80", de: "0F7C74", fr: "0F7C74", it: "0F7C74", es: "0F7C74", nl: "0F7C74", pl: "0F7C74", se: "0F7C74", ie: "0F7C74", be: "0F7C74", at: "0F7C74", pt: "0F7C74", fi: "0F7C74", dk: "0F7C74", cz: "0F7C74", gr: "0F7C74", hu: "0F7C74", ro: "0F7C74" };
    await ui.mapPanel(s, "world", { x: M, y: 1.6, w: 8.2, highlights: hl, dark: true, markers: [
      { id: "in", label: "CDSCO", color: C.accent2, side: "below" }, { id: "us", label: "FDA", side: "below", dy: 0.1 }, { id: "gb", label: "MHRA", side: "left" }, { id: "de", label: "EU notified bodies", side: "below", dy: 0.1 },
      { id: "jp", label: "PMDA", side: "right" }, { id: "cn", label: "NMPA", side: "above" }, { id: "au", label: "TGA", side: "below" }, { id: "ca", label: "Health Canada", side: "above" }, { id: "br", label: "ANVISA", side: "right" }, { id: "sg", label: "HSA", side: "right" },
    ] });
    await ui.cardGrid(s, [
      { icon: "LuGlobe", title: "IMDRF", body: "Regulators' forum since 2011; India an affiliate" },
      { icon: "LuShield", title: "MDSAP", body: "One audit for five regulators" },
      { icon: "LuBookOpen", title: "WHO model framework", body: "Global Model Regulatory Framework, 2017" },
    ], { x: 9.1, w: 3.63, h: 4.4, cols: 1, dark: true, titleSize: 12, bodySize: 10, iconD: 0.46 });
  }

  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "demo-india", kicker: "INDIA · ECOSYSTEM", title: "Where India builds devices", stage: 3 });
    await ui.mapPanel(s, "india", { x: M, y: 1.5, w: 4.4, highlights: { hp: "0F7C74", mp: "0F7C74", tn: "0F7C74", up: "0F7C74", ap: "E0962A", or: "3D5A80" }, markers: [
      { id: "hp", label: "Nalagarh park", side: "right" }, { id: "up", label: "Noida park", side: "right" }, { id: "mp", label: "Ujjain park", side: "right" }, { id: "tn", label: "Oragadam park", side: "right" }, { id: "ap", label: "AMTZ, Vizag", color: C.accent2, side: "right" }, { id: "or", label: "KIIT, Bhubaneswar", color: C.accent4, side: "right" },
    ] });
    await ui.stepsVertical(s, [
      { title: "National Medical Devices Policy 2023", detail: "Six strategies; US$50 bn market by 2030" },
      { title: "PLI for medical devices", detail: "₹3,420 crore across four segments" },
      { title: "Four medical device parks", detail: "Common testing and infrastructure" },
      { title: "AMTZ and test labs", detail: "EMC, biocompatibility, electrical safety under one roof" },
      { title: "BIRAC, DST, Startup India", detail: "Grants from idea to prototype" },
    ], { x: 5.6, w: 7.0, rowH: 0.9 });
    ui.barChart(s, { categories: ["2020", "2021", "2022", "2023"], series: [{ name: "Imports (US$ bn)", values: [5.2, 6.9, 7.5, 8.1] }], x: 5.6, y: 6.0, w: 7.0, h: 1.0, horizontal: true, labelSize: 8 });
  }

  {
    const s = ui.newSlide("DARK", SECTION, { id: "demo-decision", kicker: "WOULD YOU PROCEED? 1/5", title: "Home pilot for Ramesh next month?", stage: 1 });
    await ui.factRows(s, [{ icon: "LuDatabase", text: "F1 0.83–0.85 on public data" }, { icon: "LuHouse", text: "Ten users, alone at home" }, { icon: "LuUser", text: "Ramesh fell twice; asks to join" }]);
    ui.optionCards(s, [{ key: "A", label: "Proceed" }, { key: "B", label: "Proceed with conditions" }, { key: "C", label: "Not yet" }]);
    await ui.imageFrame(s, img("thumb_fogo.jpg"), { x: M, y: 5.4, w: 1.6, h: 1.2, dark: true, radius: 30, caption: "FoGO ankle module" });
  }
}
module.exports = { SECTION, build };
