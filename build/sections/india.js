// Section: Permission in India. Regulation by risk class, licences and forms, CDSCO duties,
// clinical investigation, software, post-market, the FoGO worked example, a quiz and the ecosystem.
// Facts: build/facts/india-class-licence.md, cdsco-guidance.md, india-examples.md, india-ecosystem.md; refs.js; legacy notes 17.
const SECTION = "Permission: regulation in India";
const NB = " "; // non-breaking space inside numbers, dates and form names
const STAGE = 3; // "Permission" on the six-dot tracker

async function build(ui, ctx) {
  const { C, S, M, W, text, img, CLASS_COLORS } = ui;
  const STATE = "E6F2EF", CENTRAL = "E7ECF4"; // pale teal (State) / pale indigo (Central) cell fills

  // ---------------------------------------------------------------- helpers composed from ui primitives
  function box(s, x, y, w, h, label, { fill = C.accent4, color = C.background1, fontSize = 12, bold = true, name = "Box", align = "center", radius = 0.1, line } = {}) {
    ui.card(s, x, y, w, h, { fill, radius, name, line });
    text(s, label, { x: x + 0.12, y, w: w - 0.24, h, fontSize, bold, color, align, valign: "middle" });
  }
  function line(s, x, y, w, h, { color = C.accent5, width = 1.5, arrow = false, flipV = false, flipH = false, dash = false, name = "Connector" } = {}) {
    const o = { x, y, w, h, line: { color, width, dashType: dash ? "dash" : "solid" }, objectName: name };
    if (arrow) o.line.endArrowType = "triangle";
    if (flipV) o.flipV = true;
    if (flipH) o.flipH = true;
    s.addShape(S.LINE, o);
  }
  const bullets = (items, extra = {}) => items.map((t, j) => ({ text: t, options: Object.assign({ bullet: { indent: 10 }, breakLine: j < items.length - 1 }, extra) }));

  // ================================================================ in-div
  await ui.sectionDivider(SECTION, {
    id: "in-div", num: 3, kicker: "PART 3 · PERMISSION IN INDIA", title: "Who allows what, for which device?",
    blurb: "One Act, one set of Rules, four risk classes. How a wearable like FoGO moves from a test licence to a State manufacturing licence, and what never stops afterwards.",
    items: [
      { icon: "LuLayers", text: "Four risk classes and the First Schedule rules that decide them" },
      { icon: "LuFileCheck", text: "Which licence, from which authority, with which form and fee" },
      { icon: "LuSiren", text: "What a licence holder must keep doing: PSURs, MvPI reports, change control" },
    ],
    photo: { file: img("fogo_emc_test.jpg"), caption: "FoGO ankle module under IEC 60601-1-2 EMC pre-compliance testing, July 2026" },
  });

  // ================================================================ in-architecture (light)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-architecture", kicker: "INDIA · THE SYSTEM", title: "India's regulatory architecture", stage: STAGE, core: true });
    // Tier 1: the Act. Tier 2: the Rules. Tier 3: two licensing authorities. Tier 4: supporting institutions.
    box(s, M, 1.72, W - 2 * M, 0.48, "Drugs and Cosmetics Act, 1940  ·  s.3(b): a medical device is regulated as a 'drug'  ·  all devices notified from 1" + NB + "Apr" + NB + "2020 (S.O." + NB + "648(E))", { fill: C.text2, fontSize: 12.5, name: "Tier Act" });
    line(s, W / 2, 2.2, 0, 0.14, { color: C.accent5, width: 2 });
    box(s, M, 2.34, W - 2 * M, 0.48, "Medical Devices Rules, 2017  ·  G.S.R." + NB + "78(E), 31" + NB + "Jan" + NB + "2017  ·  in force 1" + NB + "Jan" + NB + "2018  ·  Rule 4: Class A, B, C, D by the First Schedule", { fill: C.accent4, fontSize: 12.5, name: "Tier Rules" });
    const cw2 = (W - 2 * M - 0.23) / 2, cx1 = M + cw2 / 2, cx2 = M + cw2 + 0.23 + cw2 / 2;
    line(s, W / 2, 2.82, 0, 0.12, { color: C.accent5, width: 2 });
    line(s, cx1, 2.94, cx2 - cx1, 0, { color: C.accent5, width: 2 });
    line(s, cx1, 2.94, 0, 0.1, { color: C.accent5, width: 2 });
    line(s, cx2, 2.94, 0, 0.1, { color: C.accent5, width: 2 });
    const auth = [
      { x: M, col: C.accent4, icon: "LuLandmark", title: "Central Licensing Authority", sub: "CDSCO, headed by the DCGI, New Delhi; Medical Device and Diagnostics Division", items: [
        "Manufacture Class C and D: MD-7 → MD-9",
        "Import, every class: MD-14 → MD-15",
        "Test licences MD-12 → MD-13; clinical investigation MD-22 → MD-23",
        "No predicate in India: MD-26 → MD-27 (Rule 63); Medical Device Officers inspect C/D sites",
      ] },
      { x: M + cw2 + 0.23, col: C.accent1, icon: "LuBuilding2", title: "State Licensing Authority", sub: "State or UT Drugs Controller, one per State", items: [
        "Manufacture Class A and B: MD-3 → MD-5 (loan licence MD-4 → MD-6)",
        "Relies on a registered notified body's QMS audit of the site (Rule 13)",
        "Sale, stocking, distribution: MD-41 → MD-42 (Rule 87A, since 30" + NB + "Sep" + NB + "2022)",
        "Class A non-sterile, non-measuring: online registration instead of a licence (G.S.R." + NB + "777(E), 2022)",
      ] },
    ];
    for (const a of auth) {
      ui.card(s, a.x, 3.04, cw2, 1.5, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: `Authority ${a.title}` });
      s.addShape(S.RECTANGLE, { x: a.x, y: 3.04 + 0.2, w: 0.07, h: 1.1, fill: { color: a.col }, line: { type: "none" }, objectName: "Authority accent" });
      await ui.iconDisc(s, a.icon, a.x + 0.22, 3.16, 0.44, { bg: a.col, bgTrans: 85, fg: a.col === C.accent4 ? "3D5A80" : "0F7C74" });
      text(s, [{ text: a.title, options: { bold: true, fontSize: 13.5, breakLine: true } }, { text: a.sub, options: { fontSize: 9.5, color: C.accent5 } }], { x: a.x + 0.78, y: 3.1, w: cw2 - 0.95, h: 0.56, color: C.text1, valign: "middle" });
      text(s, bullets(a.items), { x: a.x + 0.22, y: 3.72, w: cw2 - 0.4, h: 0.8, fontSize: 10, color: C.text2, paraSpaceAfter: 1 });
    }
    text(s, "WHO ELSE IS IN THE ROOM", { x: M, y: 4.66, w: 6, h: 0.22, fontSize: 9.5, bold: true, color: C.accent5, charSpacing: 1.5 });
    await ui.cardGrid(s, [
      { icon: "LuShieldCheck", title: "Notified bodies", body: ["Audit Class A/B sites for the Fifth Schedule QMS (Rule 13)", "NABCB-accredited; e.g. TUV Rheinland, Intertek"], color: C.accent4 },
      { icon: "LuFlaskConical", title: "Testing labs", body: ["Rule 19 Central Medical Device Testing Labs; NABL labs", "AMTZ: EMC, electrical safety, biomaterials"], color: C.accent4 },
      { icon: "LuUsers", title: "Ethics committees · CTRI", body: ["EC registered with CDSCO approves the study", "CTRI registration before the first participant"], color: C.accent2 },
      { icon: "LuSiren", title: "MvPI · IPC Ghaziabad", body: ["Device adverse-event reports since 6" + NB + "Jul" + NB + "2015", "MDAE form; helpline 1800" + NB + "180" + NB + "3024"], color: C.accent3 },
      { icon: "LuRuler", title: "BIS", body: ["IS" + NB + "23485 = ISO" + NB + "13485 + Essential Principles", "~1,200 device standards; 214 critical devices"], color: C.accent1 },
      { icon: "LuIndianRupee", title: "NPPA", body: ["DPCO 2013 ceiling prices: stents, knee implants", "Trade-margin caps on five home devices (2021)"], color: C.accent1 },
    ], { y: 4.9, h: 1.9, cols: 6, gap: 0.15, titleSize: 11, bodySize: 9.5, iconD: 0.4 });
  }

  // ================================================================ in-timeline (dark)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "in-timeline", kicker: "INDIA · HOW WE GOT HERE", title: "From a handful of notified devices to all of them", stage: STAGE });
    ui.timeline(s, [
      { date: "1940", label: "Drugs & Cosmetics Act", detail: "Devices regulated as 'drugs' under s.3(b)" },
      { date: "2005", label: "First device notifications", detail: "37 categories regulated by early 2020" },
      { date: "31" + NB + "Jan" + NB + "2017", label: "MDR-2017 notified", detail: "G.S.R." + NB + "78(E); four risk classes, GHTF-style rules", big: true, color: C.accent2 },
      { date: "1" + NB + "Jan" + NB + "2018", label: "Rules in force", detail: "First notified bodies registered May 2018" },
      { date: "1" + NB + "Apr" + NB + "2020", label: "All devices regulated", detail: "S.O." + NB + "648(E); Chapter IIIA registration opens" },
      { date: "1" + NB + "Oct" + NB + "2021", label: "Registration mandatory", detail: "18-month voluntary window closes" },
      { date: "1" + NB + "Oct" + NB + "2022", label: "Class A/B licence due", detail: "Sale registration MD-41/42 from 30" + NB + "Sep" + NB + "2022" },
      { date: "26" + NB + "Apr" + NB + "2023", label: "NMDP 2023", detail: "Cabinet: US$" + NB + "50" + NB + "bn sector by 2030" },
      { date: "1" + NB + "Oct" + NB + "2023", label: "Class C/D licence due", detail: "Phase-in complete; 6-month transition order" },
      { date: "2026", label: "Software guidance", detail: "MDSW 21" + NB + "Jul; amendments 14" + NB + "Aug; draft timelines", color: C.accent2 },
    ], { dark: true, y: 3.3, labelH: 1.05, inset: 1.0 });
    text(s, "2026: THREE DOCUMENTS TO READ BEFORE YOU FILE", { x: M, y: 5.05, w: 8, h: 0.22, fontSize: 9.5, bold: true, color: C.accent2, charSpacing: 1.5 });
    await ui.cardGrid(s, [
      { title: "MDSW guidance", badge: "21" + NB + "Jul" + NB + "2026", badgeColor: C.accent2, body: "CDSCO/MD/GD/MDSW/01/2026, 62 pages: SaMD, AI/ML, cybersecurity, change control, post-market" },
      { title: "G.S.R." + NB + "743(E)", badge: "14" + NB + "Aug" + NB + "2026", badgeColor: C.accent1, body: "Sterilisation-site licence number on labels from 14" + NB + "Feb" + NB + "2027; Ninth Schedule testing fees" },
      { title: "G.S.R." + NB + "744(E)", badge: "14" + NB + "Aug" + NB + "2026", badgeColor: C.accent1, body: "EU approvals added to the Rule 63 trial waiver; Class A QMS self-certification revised" },
      { title: "Draft G.S.R." + NB + "515(E)", badge: "23" + NB + "Jun" + NB + "2026", badgeColor: C.accent3, body: "Licence timelines: Class B 140 → 115 days; C/D 105 → 90 days. Not final on 7" + NB + "Oct" + NB + "2026" },
    ], { y: 5.3, h: 1.5, cols: 4, gap: 0.2, dark: true, titleSize: 12, bodySize: 10, iconD: 0.3 });
  }

  // ================================================================ in-classes (light)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-classes", kicker: "INDIA · RISK CLASSES", title: "Four risk classes decide the route", stage: STAGE, core: true });
    ui.classLadder(s, [
      { cls: "A", risk: "Low risk", examples: ["Dressings, bandages", "Non-sterile exam gloves", "Clinical thermometer", "Deep-tissue EM stimulator (CDSCO rehab list)"], route: "State · MD-5 (NSNM: register only)" },
      { cls: "B", risk: "Low-moderate risk", examples: ["Hypodermic needles, syringes", "BP monitors (non-invasive)", "Hearing aids", "TENS systems (CDSCO list)", "FoGO · Class B (proposed)"], route: "State · MD-3 → MD-5" },
      { cls: "C", risk: "Moderate-high risk", examples: ["Infusion pumps", "X-ray, MRI systems", "Lung ventilators", "Haemodialysis machines", "Orthopaedic implants (joints: C or D, verify)"], route: "Central · MD-7 → MD-9" },
      { cls: "D", risk: "High risk", examples: ["Heart valves", "Implantable pacemakers", "Coronary, drug-eluting stents", "Intra-uterine devices", "Contact with CNS or central circulation"], route: "Central · MD-7 → MD-9" },
    ], { x: M, y: 1.75, w: 7.45, h: 4.7 });
    const rx = 8.35, rw = W - M - rx;
    text(s, "FIRST SCHEDULE, PART I: FOUR RULE FAMILIES", { x: rx, y: 1.72, w: rw, h: 0.22, fontSize: 9.5, bold: true, color: C.accent5, charSpacing: 1.5 });
    await ui.stepsVertical(s, [
      { title: "Non-invasive", detail: "Intact skin only → A; channels or stores blood or body fluids → B" },
      { title: "Invasive", detail: "Body orifice vs surgical; transient, short-term, long-term; implants → C or D" },
      { title: "Active", detail: "Therapeutic energy → B; hazardous energy or monitoring vital processes → C" },
      { title: "Special rules", detail: "Medicinal substance → D; non-viable animal tissue → D; IVDs under Part II" },
    ], { x: rx, y: 2.0, w: rw, rowH: 0.74, color: C.accent4, titleSize: 12, detailSize: 10 });
    ui.card(s, rx, 5.0, rw, 1.55, { fill: C.background2, name: "Where our devices sit" });
    text(s, "WHERE OUR TWO DEVICES WOULD SIT", { x: rx + 0.2, y: 5.08, w: rw - 0.4, h: 0.22, fontSize: 9.5, bold: true, color: C.accent5, charSpacing: 1.5 });
    ui.pill(s, rx + 0.2, 5.36, 1.55, "Class B (proposed)", { color: CLASS_COLORS.B, h: 0.3, fontSize: 9.5 });
    text(s, "FoGO: active wearable plus app that cues. The developer's proposal, not a CDSCO classification.", { x: rx + 1.85, y: 5.33, w: rw - 2.05, h: 0.5, fontSize: 9.5, color: C.text2 });
    ui.pill(s, rx + 0.2, 5.94, 1.55, "Class to be confirmed", { color: C.accent2, fill: false, dash: true, h: 0.3, fontSize: 9.5 });
    text(s, "SwaKnee: CDSCO's rehabilitation list puts 'deep-tissue electromagnetic stimulation' in Class A; the active-therapeutic rule suggests B.", { x: rx + 1.85, y: 5.9, w: rw - 2.05, h: 0.62, fontSize: 9.5, color: C.text2 });
  }

  // ================================================================ in-licence-matrix (light)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-licence-matrix", kicker: "INDIA · WHICH LICENCE", title: "Which licence, from which authority, with which form", stage: STAGE, core: true });
    const f = (a, b) => "MD-" + a + " → MD-" + b;
    const rows = [
      ["Manufacture", "Online registration + Essential Principles self-certification (G.S.R." + NB + "777(E), 14" + NB + "Oct" + NB + "2022)", f(3, 5), f(7, 9), "State (A/B) · Central (C/D)"],
      ["Loan licence", "—", f(4, 6), f(8, 10), "State (A/B) · Central (C/D)"],
      ["Import", f(14, 15), f(14, 15), f(14, 15), "Central, every class"],
      ["Test licence: make or import for study, demo, training", f(12, 13) + "  ·  " + f(16, 17), f(12, 13) + "  ·  " + f(16, 17), f(12, 13) + "  ·  " + f(16, 17), "Central"],
      ["Clinical investigation", f(22, 23), f(22, 23), f(22, 23), "Central + registered ethics committee"],
      ["No predicate in India (Rule 63)", f(26, 27), f(26, 27), f(26, 27), "Central"],
      ["Sale, stocking, distribution", f(41, 42) + " (Rule 87A)", f(41, 42) + " (Rule 87A)", f(41, 42) + " (Rule 87A)", "State"],
    ];
    const who = (r, c) => {
      if (c === 0) return null;
      if (r <= 1) return { fill: { color: c === 3 ? CENTRAL : STATE } };
      if (r === 6) return { fill: { color: STATE } };
      return { fill: { color: CENTRAL } };
    };
    ui.matrix(s, ["Activity", "Class A · non-sterile, non-measuring", "Class A sterile or measuring · Class B", "Class C · Class D", "Who decides"], rows,
      { y: 1.7, colW: [2.35, 2.75, 2.45, 2.1, 2.48], rowH: 0.46, fontSize: 10.5, cellStyle: who });
    // Fee pills (Second Schedule; confirmed) and the colour legend.
    const fees = [
      { w: 2.35, t: "A/B licence: ₹5,000/site + ₹500/device", c: C.accent1 },
      { w: 2.55, t: "C/D licence: ₹50,000/site + ₹1,000/device", c: C.accent4 },
      { w: 3.1, t: "Import: US$1,000–3,000/site + $50–1,500/device", c: C.accent4 },
      { w: 1.6, t: "MD-13: ₹500/device", c: C.accent4 },
      { w: 1.85, t: "MD-41/42: ₹3,000", c: C.accent1 },
    ];
    let fx = M;
    for (const p of fees) { ui.pill(s, fx, 5.62, p.w, p.t.replace(/ (\d)/g, NB + "$1"), { color: p.c, h: 0.32, fontSize: 9.5 }); fx += p.w + 0.17; }
    ui.callout(s, [
      { text: "Teal = State Licensing Authority · Indigo = Central (CDSCO).  ", options: { bold: true } },
      { text: "Licences are perpetual: pay the retention fee (same amount) every 5" + NB + "years; late fee 2% a month; a manufacturing licence lapses after 180" + NB + "days unpaid. Clinical-investigation fee: see the Second Schedule (verify).", options: { bold: false } },
    ], { y: 6.12, h: 0.62, fontSize: 11 });
  }

  // ================================================================ in-manufacturing-route (dark)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "in-manufacturing-route", kicker: "INDIA · GETTING A LICENCE", title: "The route to a manufacturing licence", stage: STAGE, core: true });
    ui.chevronFlow(s, [
      { title: "1 · Build the QMS", color: C.accent1, detail: "Fifth Schedule (ISO" + NB + "13485-aligned; BIS IS" + NB + "23485 bundles QMS and Essential Principles). A certificate is not a legal precondition, but auditors expect alignment. Start-ups: 3–6 months, ₹3–8" + NB + "lakh (consultancy estimate)." },
      { title: "2 · Apply online", color: C.accent4, detail: "cdscomdonline.gov.in: Form MD-3 (Class A/B, to the State) or MD-7 (Class C/D, to CDSCO) with site and device details and the Essential Principles checklist." },
      { title: "3 · Audit or inspection", color: C.accent4, detail: "A: licence on documents within 45" + NB + "days; notified-body audit within 120" + NB + "days after. B: notified-body audit within 90" + NB + "days, before grant. C/D: CDSCO Medical Device Officers inspect within 60" + NB + "days (Rule" + NB + "23(1))." },
      { title: "4 · Licence", color: C.accent2, detail: "MD-5 (State, A/B) or MD-9 (Central, C/D). C/D decision within 45" + NB + "days of the inspection report (Rule" + NB + "21(4)). Perpetual: no renewal application." },
      { title: "5 · Keep it", color: C.accent1, detail: "Retention fee every 5" + NB + "years (same amount); 2% a month late fee; deemed cancelled after 180" + NB + "days unpaid. Rule" + NB + "43A: suspension or cancellation after show-cause." },
    ], { y: 1.85, h: 0.7, detailH: 1.65, dark: true, fontSize: 12 });
    await ui.statTiles(s, [
      { value: "₹5,000 + ₹500", label: "Class A/B licence fee", sub: "per site + per distinct device; the same again at each 5-year retention", icon: "LuIndianRupee", color: C.accent1 },
      { value: "₹50,000 + ₹1,000", label: "Class C/D licence fee", sub: "per site + per device; CDSCO inspection, not a notified-body audit", icon: "LuIndianRupee", color: C.accent4 },
      { value: "4–5 months", label: "Typical MD-5 journey", sub: "consultancy estimate including the notified-body audit", icon: "LuTimer", color: C.accent2 },
      { value: "140 → 115 days", label: "Class B cap, draft 2026", sub: "G.S.R." + NB + "515(E), 23" + NB + "Jun" + NB + "2026; C/D 105 → 90 days; not final", icon: "LuHourglass", color: C.accent2 },
    ], { y: 4.5, h: 1.62, dark: true, valueSize: 24 });
    ui.callout(s, "Class A is granted on self-certification and audited after; Class B is audited before grant; Class C and D are inspected by CDSCO. Higher class, closer scrutiny.", { y: 6.27, h: 0.5, dark: true, fontSize: 12 });
  }

  // ================================================================ in-import-registration (light)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-import-registration", kicker: "INDIA · IMPORT AND REGISTRATION", title: "Importing, registering and relying on foreign approvals", stage: STAGE });
    const lw = 6.05, rx = M + lw + 0.3, rw = W - M - rx;
    ui.card(s, M, 1.72, lw, 4.5, { fill: C.background2, name: "Import route" });
    await ui.iconDisc(s, "LuShip", M + 0.2, 1.9, 0.44, { bg: C.accent4 });
    text(s, [{ text: "Import: Central Licensing Authority, every class", options: { bold: true, fontSize: 13, breakLine: true } }, { text: "Rules 34–36, MDR-2017 · Form MD-14 → licence MD-15", options: { fontSize: 9.5, color: C.accent5 } }], { x: M + 0.78, y: 1.86, w: lw - 1.0, h: 0.52, color: C.text1, valign: "middle" });
    await ui.stepsVertical(s, [
      { title: "Appoint an Indian authorised agent", detail: "The agent or importer files on the Medical Device online system (cdscomdonline.gov.in)" },
      { title: "Apply in Form MD-14 to CDSCO", detail: "One route for Class A to D; the overseas site may be inspected" },
      { title: "Pay Second Schedule fees in US dollars", detail: "A: $1,000/site + $50/device · B: $2,000 + $1,000 · C/D: $3,000 + $1,500" },
      { title: "Decision within 9" + NB + "months", detail: "Practitioners quote 6–9 months; MD-15 is perpetual with a 5-yearly retention fee (90-day grace)" },
      { title: "Report what happens abroad", detail: "Rule 38: withdrawal, restriction or cancellation elsewhere → CDSCO within 15" + NB + "days. Test imports: MD-16 → MD-17, $100/device" },
    ], { x: M + 0.25, y: 2.55, w: lw - 0.45, rowH: 0.74, color: C.accent4, titleSize: 11.5, detailSize: 9.5 });
    // Right: Class A registration-only route, then reliance on foreign approvals.
    ui.card(s, rx, 1.72, rw, 2.1, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Class A registration" });
    await ui.iconDisc(s, "LuClipboardCheck", rx + 0.2, 1.9, 0.44, { bg: C.accent1, bgTrans: 85, fg: "0F7C74" });
    text(s, [{ text: "Class A non-sterile, non-measuring: register, don't license", options: { bold: true, fontSize: 12.5, breakLine: true } }, { text: "G.S.R." + NB + "777(E), 14" + NB + "Oct" + NB + "2022 (Sixth Amendment)", options: { fontSize: 9.5, color: C.accent5 } }], { x: rx + 0.78, y: 1.86, w: rw - 1.0, h: 0.52, color: C.text1, valign: "middle" });
    text(s, bullets([
      "Upload on the online system: site name and address; device details; an undertaking that the device is Class A, non-sterile, non-measuring; a self-certified Essential Principles checklist",
      "Registration number goes on the label; 'Reg." + NB + "No.' wording proposed in the Dec" + NB + "2025 draft",
      "QMS self-certification revised by G.S.R." + NB + "744(E), Aug" + NB + "2026. Sterile or measuring Class A still needs MD-5",
    ]), { x: rx + 0.2, y: 2.45, w: rw - 0.4, h: 1.3, fontSize: 9.5, color: C.text2, paraSpaceAfter: 2 });
    ui.card(s, rx, 4.0, rw, 2.22, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Reliance" });
    await ui.iconDisc(s, "LuGlobe", rx + 0.2, 4.18, 0.44, { bg: C.accent2, bgTrans: 85, fg: "E0962A" });
    text(s, [{ text: "Reliance: no predicate in India, approved abroad", options: { bold: true, fontSize: 12.5, breakLine: true } }, { text: "Rule 63, Chapter VIII · Form MD-26 → permission MD-27", options: { fontSize: 9.5, color: C.accent5 } }], { x: rx + 0.78, y: 4.14, w: rw - 1.0, h: 0.52, color: C.text1, valign: "middle" });
    text(s, bullets([
      "CDSCO may waive the local clinical investigation if the device is approved in the US, UK, Australia, Canada, Japan or, since 14" + NB + "Aug" + NB + "2026 (G.S.R." + NB + "744(E)), the EU",
      "Conditions: marketed there for at least 2" + NB + "years; CDSCO satisfied with safety, performance and post-market data",
      "A post-marketing clinical investigation in India is still required",
    ]), { x: rx + 0.2, y: 4.72, w: rw - 0.4, h: 1.05, fontSize: 9.5, color: C.text2, paraSpaceAfter: 2 });
    const flags = ["US", "GB", "AU", "CA", "JP", "EU"];
    for (let i = 0; i < flags.length; i++) await ui.flag(s, flags[i], rx + 0.25 + i * 0.62, 5.76, 0.5);
    text(s, "recognised regulators", { x: rx + 4.05, y: 5.76, w: rw - 4.2, h: 0.34, fontSize: 9, italic: true, color: C.accent5, valign: "middle" });
    ui.callout(s, "About 70% of what India uses is imported (Parliamentary Standing Committee, Mar" + NB + "2024). Every importer is a licence holder with the same post-market duties as a manufacturer.", { y: 6.37, h: 0.48, fontSize: 11.5 });
  }

  // ================================================================ in-obligations (dark): eight duties around the licence
  {
    const s = ui.newSlide("DARK", SECTION, { id: "in-obligations", kicker: "INDIA · WHAT A LICENCE HOLDER MUST DO", title: "Eight duties that never stop", stage: STAGE, core: true });
    const cells = [
      { icon: "LuShieldCheck", title: "Essential Principles", sub: "Rule 6 · EP checklist", items: ["Checklist filed with every application", "Class A non-sterile, non-measuring: self-certified"] },
      { icon: "LuClipboardCheck", title: "Quality management system", sub: "Fifth Schedule · IS" + NB + "23485", items: ["ISO" + NB + "13485-aligned manual, procedures, records", "Notified-body audit (A/B) or CDSCO inspection (C/D)"] },
      { icon: "LuTag", title: "Labelling", sub: "Rule 44 · Fourth Schedule", items: ["Name, manufacturer, net quantity, month and year of manufacture and expiry, licence number", "From 14" + NB + "Feb" + NB + "2027: sterilisation-site licence number (S.M.L.)"] },
      { icon: "LuBarcode", title: "Unique Device Identification", sub: "Rule 46 · date deferred", items: ["Fixed start date removed by G.S.R." + NB + "918(E), 31" + NB + "Dec" + NB + "2021", "No date fixed in 2026: plan the UDI anyway"] },
      { centre: true, icon: "LuBadgeCheck", title: "Your licence", sub: "MD-5 or MD-9 · perpetual", items: ["Retention fee every 5" + NB + "years, same amount", "Rule 43A: suspension or cancellation after show-cause for non-compliance"] },
      { icon: "LuRuler", title: "Standards", sub: "Rule 7 · BIS, then ISO/IEC", items: ["BIS: ~1,200 device standards; 214 critical devices prioritised", "Testing fees now in a Ninth Schedule (G.S.R." + NB + "743(E))"] },
      { icon: "LuArchive", title: "Records and traceability", sub: "Chapter IIIA · Rule 87A", items: ["Batch or serial number and software version for every unit", "Registration number on the label; sellers hold MD-42"] },
      { icon: "LuRefreshCw", title: "Change control", sub: "MDSW guidance, 21" + NB + "Jul" + NB + "2026", items: ["Version control, validation, documented change management", "Major change: prior approval; minor: notification (verify)"] },
      { icon: "LuSiren", title: "Vigilance", sub: "Rule 38 · MvPI circular 15" + NB + "May" + NB + "2024", items: ["Serious adverse events: report within 15" + NB + "days", "Action abroad → CDSCO within 15" + NB + "days; MDAE form to MvPI"] },
    ];
    const gx = M, gy = 1.72, gw = W - 2 * M, gh = 5.05, gap = 0.18, cw = (gw - 2 * gap) / 3, ch = (gh - 2 * gap) / 3;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i], r = Math.floor(i / 3), k = i % 3, x = gx + k * (cw + gap), y = gy + r * (ch + gap);
      if (c.centre) {
        ui.card(s, x, y, cw, ch, { fill: C.accent2, name: "Licence card" });
        await ui.iconDisc(s, c.icon, x + 0.2, y + 0.18, 0.5, { bg: C.text2, fg: "FFFFFF" });
        text(s, [{ text: c.title, options: { bold: true, fontSize: 14, breakLine: true } }, { text: c.sub, options: { fontSize: 9.5, bold: true } }], { x: x + 0.82, y: y + 0.14, w: cw - 1.0, h: 0.6, color: C.text2, valign: "middle" });
        text(s, bullets(c.items), { x: x + 0.2, y: y + 0.82, w: cw - 0.4, h: ch - 0.9, fontSize: 10.5, color: C.text2, paraSpaceAfter: 2 });
      } else {
        s.addShape(S.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 0.75 }, objectName: `Duty ${c.title}` });
        await ui.iconDisc(s, c.icon, x + 0.2, y + 0.18, 0.5, { bg: C.accent1, fg: "FFFFFF" });
        text(s, [{ text: c.title, options: { bold: true, fontSize: 13, color: C.background1, breakLine: true } }, { text: c.sub, options: { fontSize: 9.5, color: C.accent2, bold: true } }], { x: x + 0.82, y: y + 0.14, w: cw - 1.0, h: 0.6, valign: "middle" });
        text(s, bullets(c.items), { x: x + 0.2, y: y + 0.82, w: cw - 0.4, h: ch - 0.9, fontSize: 10, color: C.accent6, paraSpaceAfter: 2 });
      }
    }
  }

  // ================================================================ in-clinical-investigation (light): swimlane from shapes
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-clinical-investigation", kicker: "INDIA · TESTING IN PEOPLE", title: "Clinical investigation under MDR-2017", stage: STAGE, core: true });
    const lanes = [
      { name: "Sponsor / investigator", icon: "LuBuilding2", col: C.accent1 },
      { name: "Ethics committee", icon: "LuUsers", col: C.accent2 },
      { name: "CDSCO (CLA)", icon: "LuLandmark", col: C.accent4 },
      { name: "CTRI", icon: "LuDatabase", col: C.accent3 },
    ];
    const lx = M, ly = 1.72, lw = 8.3, laneH = 1.0, labW = 1.2;
    for (let i = 0; i < lanes.length; i++) {
      const y = ly + i * laneH;
      s.addShape(S.RECTANGLE, { x: lx, y, w: lw, h: laneH, fill: { color: i % 2 ? "F6F9F8" : C.background2 }, line: { color: "E3EAE8", width: 0.5 }, objectName: `Lane ${lanes[i].name}` });
      s.addShape(S.RECTANGLE, { x: lx, y, w: 0.07, h: laneH, fill: { color: lanes[i].col }, line: { type: "none" }, objectName: "Lane accent" });
      await ui.iconDisc(s, lanes[i].icon, lx + 0.18, y + 0.12, 0.34, { bg: lanes[i].col });
      text(s, lanes[i].name, { x: lx + 0.16, y: y + 0.5, w: labW - 0.2, h: 0.46, fontSize: 9.5, bold: true, color: C.text1 });
    }
    // Boxes: [laneIndex, label]; five columns left to right, joined by elbow connectors.
    const steps = [
      [0, "1 · Study units under MD-13; Seventh Schedule dossier"],
      [1, "2 · Registered ethics committee approves protocol, consent"],
      [2, "3 · Form MD-22 reviewed → permission MD-23"],
      [3, "4 · Register before the first participant"],
      [0, "5 · Pilot → pivotal; SAEs, compensation, final report"],
    ];
    const bx0 = lx + labW + 0.12, bgap = 0.3, bw = (lw - labW - 0.24 - 4 * bgap) / 5, bh = 0.8;
    const pos = steps.map(([lane], i) => ({ x: bx0 + i * (bw + bgap), y: ly + lane * laneH + (laneH - bh) / 2 }));
    steps.forEach(([lane, label], i) => {
      const p = pos[i];
      ui.card(s, p.x, p.y, bw, bh, { fill: C.background1, line: { color: lanes[lane].col, width: 1.5 }, radius: 0.08, name: `Step ${i + 1}` });
      text(s, label, { x: p.x + 0.08, y: p.y + 0.04, w: bw - 0.16, h: bh - 0.08, fontSize: 9, color: C.text1, valign: "middle" });
    });
    for (let i = 0; i < pos.length - 1; i++) {
      const a = pos[i], b = pos[i + 1], x1 = a.x + bw, y1 = a.y + bh / 2, x2 = b.x, y2 = b.y + bh / 2, xm = (x1 + x2) / 2;
      line(s, x1, y1, xm - x1, 0, { color: C.accent5, width: 1.5 });
      line(s, xm, Math.min(y1, y2), 0, Math.abs(y2 - y1), { color: C.accent5, width: 1.5 });
      line(s, xm, y2, x2 - xm, 0, { color: C.accent5, width: 1.5, arrow: true });
    }
    // Right: Seventh Schedule checklist and exemptions.
    const rx = lx + lw + 0.3, rw = W - M - rx;
    ui.card(s, rx, 1.72, rw, 2.4, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Seventh Schedule" });
    await ui.iconDisc(s, "LuListChecks", rx + 0.18, 1.88, 0.4, { bg: C.accent4, bgTrans: 85, fg: "3D5A80" });
    text(s, [{ text: "Seventh Schedule dossier", options: { bold: true, fontSize: 12, breakLine: true } }, { text: "Filed with Form MD-22 (CDSCO checklist)", options: { fontSize: 9, color: C.accent5 } }], { x: rx + 0.7, y: 1.84, w: rw - 0.85, h: 0.48, color: C.text1, valign: "middle" });
    text(s, bullets(["Clinical investigation plan", "Investigator's brochure", "Design-control documents", "Design verification and validation report", "Essential Principles checklist", "Informed consent form", "Investigator undertaking", "Ethics committee approval", "Pilot, pivotal or post-marketing study?"]), { x: rx + 0.18, y: 2.38, w: rw - 0.36, h: 1.7, fontSize: 9.5, color: C.text2, paraSpaceAfter: 0.5 });
    ui.card(s, rx, 4.25, rw, 1.6, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Exemptions" });
    await ui.iconDisc(s, "LuGlobe", rx + 0.18, 4.4, 0.4, { bg: C.accent2, bgTrans: 85, fg: "E0962A" });
    text(s, "Exemptions and shortcuts", { x: rx + 0.7, y: 4.38, w: rw - 0.85, h: 0.44, fontSize: 12, bold: true, color: C.text1, valign: "middle" });
    text(s, bullets([
      "Rule 63 proviso: approved in the US, UK, Australia, Canada, Japan or (since Aug" + NB + "2026) the EU, marketed ≥" + NB + "2" + NB + "years → local study may be waived; post-marketing study still due",
      "Academic study of a licensed device: ethics approval; data not for marketing (verify the Rule text)",
    ]), { x: rx + 0.18, y: 4.84, w: rw - 0.36, h: 0.98, fontSize: 9, color: C.text2, paraSpaceAfter: 2 });
    ui.callout(s, "Before the first participant: ethics approval, MD-23 permission, CTRI registration, insurance and compensation arrangements. Pilot = exploratory first-in-human; pivotal = confirmatory. Fee waived for government institutions (Rule 51(2)).", { y: 5.95, h: 0.65, fontSize: 11 });
  }

  // ================================================================ in-software (dark)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "in-software", kicker: "INDIA · SOFTWARE AND AI", title: "When the software is the device", stage: STAGE });
    // Classification grid: three criteria from the MDSW guidance (medical purpose, significance of the information, severity of the condition).
    const gx = M, gy = 1.72, labW = 1.3, cwid = 1.72, chgt = 0.86, g = 0.08;
    text(s, "Significance of the information for the clinical decision  →", { x: gx + labW + g, y: gy, w: 3 * cwid + 2 * g, h: 0.26, fontSize: 10, bold: true, color: C.accent6, align: "center", valign: "middle" });
    const colsL = ["Inform clinical management", "Drive clinical management", "Treat or diagnose"];
    const rowsL = ["Non-serious", "Serious", "Critical"];
    colsL.forEach((t, k) => box(s, gx + labW + g + k * (cwid + g), gy + 0.3, cwid, 0.36, t, { fill: C.text2, fontSize: 9.5, line: { color: C.accent6, width: 0.5 }, name: `Grid column ${t}` }));
    text(s, "Severity of the healthcare situation  ↓", { x: gx, y: gy + 0.3, w: labW, h: 0.36, fontSize: 9, bold: true, color: C.accent6, valign: "middle" });
    const trans = [[88, 78, 66], [78, 66, 52], [66, 52, 36]];
    rowsL.forEach((t, r) => {
      const y = gy + 0.72 + r * (chgt + g);
      box(s, gx, y, labW, chgt, t, { fill: C.text2, fontSize: 10, align: "left", line: { color: C.accent6, width: 0.5 }, name: `Grid row ${t}` });
      colsL.forEach((_, k) => {
        s.addShape(S.ROUNDED_RECTANGLE, { x: gx + labW + g + k * (cwid + g), y, w: cwid, h: chgt, rectRadius: 0.06, fill: { color: C.accent3, transparency: trans[r][k] }, line: { color: C.accent6, width: 0.5 }, objectName: `Grid cell ${r}${k}` });
      });
    });
    const cellX = (k) => gx + labW + g + k * (cwid + g), cellY = (r) => gy + 0.72 + r * (chgt + g);
    text(s, "lowest risk", { x: cellX(0), y: cellY(0), w: cwid, h: chgt, fontSize: 9, italic: true, color: C.background1, align: "center", valign: "middle" });
    text(s, "highest risk", { x: cellX(2), y: cellY(2), w: cwid, h: chgt, fontSize: 9, italic: true, color: C.background1, align: "center", valign: "middle" });
    ui.pill(s, cellX(1) + 0.1, cellY(1) + 0.26, cwid - 0.2, "FoGO app · B (proposed)", { color: C.accent2, fill: false, dash: true, h: 0.32, fontSize: 9, dark: true, textColor: C.background1 });
    text(s, "Plus the third criterion: is the medical purpose stated? Illustrative placement of the FoGO app; CDSCO's guidance sets the rule.", { x: gx, y: gy + 0.72 + 3 * (chgt + g), w: labW + 3 * cwid + 3 * g, h: 0.4, fontSize: 9, italic: true, color: C.accent6 });
    // Right: the FoGO app example with the real prototype screenshot.
    const rx = 7.75, rw = W - M - rx;
    s.addShape(S.ROUNDED_RECTANGLE, { x: rx, y: gy, w: rw, h: 3.55, rectRadius: 0.12, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 0.75 }, objectName: "FoGO app card" });
    await ui.imageFrame(s, img("fogo_app_cue.png"), { x: rx + 0.2, y: gy + 0.2, w: 1.45, h: 3.15, radius: 30, alt: "FoGO prototype app showing a cue" });
    text(s, [
      { text: "FoGO app: software that drives the device", options: { bold: true, fontSize: 12.5, color: C.background1, breakLine: true } },
      { text: "Reads the 100" + NB + "Hz ankle stream, runs the detection model, confirms a freeze in 2 of 3 windows, then fires the chest cue.", options: { fontSize: 10, color: C.accent6, breakLine: true } },
      { text: " ", options: { fontSize: 5, breakLine: true } },
      ...bullets([
        "Software driving a device: classified with the device (verify); FoGO proposes Class B",
        "Consultancy reading: retrospective analysis only → A; real-time parameters, no diagnosis → B; informs diagnosis or treatment → C",
        "Every result carries a firmware and model version; a threshold change is a design change",
      ], { fontSize: 10, color: C.accent6 }),
    ], { x: rx + 1.85, y: gy + 0.18, w: rw - 2.05, h: 3.2, paraSpaceAfter: 3 });
    ui.chevronFlow(s, [
      { title: "Intended purpose", detail: "Is the purpose medical? Classify by what the output drives", color: C.accent4 },
      { title: "Lifecycle documents", detail: "Requirements, architecture, versions, risk file (ISO" + NB + "14971)", color: C.accent4 },
      { title: "Verify & validate", detail: "Tests per version; clinical evidence sized to the claim", color: C.accent4 },
      { title: "Cybersecurity", detail: "Threat model, updates, data protection (DPDP Rules 2025)", color: C.accent4 },
      { title: "Change control · ACP", detail: "Algorithm Change Protocol where applicable; re-validate", color: C.accent2 },
      { title: "Post-market", detail: "Log versions; PSUR and MvPI reports per version", color: C.accent4 },
    ], { y: 5.48, h: 0.56, detailH: 0.7, dark: true, fontSize: 11 });
  }

  // ================================================================ in-postmarket (light): loop + MvPI tiles
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-postmarket", kicker: "INDIA · AFTER THE LICENCE", title: "Post-market duties and materiovigilance", stage: STAGE, core: true });
    const lx = M, lw = 7.6, gap = 0.34, cw = (lw - 2 * gap) / 3, ch = 1.5, yTop = 1.72, yBot = 4.4;
    const loop = [
      { icon: "LuHeartPulse", title: "Care", detail: "Meet the person's immediate needs; keep the device and its data", col: C.accent3 },
      { icon: "LuFileText", title: "Record", detail: "Device identity, serial number, software version, context, outcome", col: C.accent4 },
      { icon: "LuSiren", title: "Report", detail: "MDAE form to MvPI; licence holder → CDSCO within 15" + NB + "days; in a study, sponsor and ethics committee", col: C.accent3 },
      { icon: "LuSearch", title: "Investigate", detail: "Root cause; trend across units; update the ISO" + NB + "14971 risk file", col: C.accent4 },
      { icon: "LuWrench", title: "Correct", detail: "CAPA; label or software fix; recall via the FSCA form to MvPI. No stand-alone recall rule yet", col: C.accent2 },
      { icon: "LuRepeat", title: "Follow up", detail: "The person, the fix, and the PSUR: 6-monthly for 2" + NB + "years, then yearly for 2", col: C.accent1 },
    ];
    const place = [[0, yTop], [1, yTop], [2, yTop], [2, yBot], [1, yBot], [0, yBot]];
    for (let i = 0; i < loop.length; i++) {
      const [k, y] = place[i], x = lx + k * (cw + gap), c = loop[i];
      ui.card(s, x, y, cw, ch, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: `Loop ${c.title}` });
      await ui.iconDisc(s, c.icon, x + 0.18, y + 0.16, 0.46, { bg: c.col });
      text(s, [{ text: `${i + 1} · ${c.title}`, options: { bold: true, fontSize: 13 } }], { x: x + 0.74, y: y + 0.16, w: cw - 0.9, h: 0.46, color: C.text1, valign: "middle" });
      text(s, c.detail, { x: x + 0.18, y: y + 0.72, w: cw - 0.36, h: ch - 0.8, fontSize: 10, color: C.text2 });
    }
    // Loop arrows: top row right, right side down, bottom row left, left side up.
    for (let k = 0; k < 2; k++) {
      line(s, lx + (k + 1) * cw + k * gap + 0.04, yTop + ch / 2, gap - 0.08, 0, { color: C.accent5, width: 2, arrow: true });
      line(s, lx + (k + 1) * cw + k * gap + 0.04, yBot + ch / 2, gap - 0.08, 0, { color: C.accent5, width: 2, arrow: true, flipH: true });
    }
    line(s, lx + 2 * (cw + gap) + cw / 2, yTop + ch + 0.05, 0, yBot - yTop - ch - 0.1, { color: C.accent5, width: 2, arrow: true });
    line(s, lx + cw / 2, yTop + ch + 0.05, 0, yBot - yTop - ch - 0.1, { color: C.accent5, width: 2, arrow: true, flipV: true });
    // Reporting windows in the middle band.
    const chips = [
      { t: "Serious adverse event → CDSCO ≤" + NB + "15" + NB + "days", c: C.accent3 },
      { t: "Regulatory action abroad → CDSCO ≤" + NB + "15" + NB + "days (Rule 38)", c: C.accent4 },
      { t: "PSUR: every 6" + NB + "months × 2" + NB + "years, then yearly × 2", c: C.accent1 },
      { t: "Rule 43A: suspension or cancellation", c: C.accent2 },
    ];
    const cx0 = lx + cw / 2 + 0.35, cwd = (lx + 2 * (cw + gap) + cw / 2 - 0.35) - cx0, half = (cwd - 0.15) / 2;
    chips.forEach((p, i) => ui.pill(s, cx0 + (i % 2) * (half + 0.15), 3.42 + Math.floor(i / 2) * 0.44, half, p.t, { color: p.c, fill: false, h: 0.34, fontSize: 9.5 }));
    ui.callout(s, "DePuy ASR hips, 2013 alert: about 4,700 implanted in India, only 882 patients traceable. Traceability starts on day one.", { x: lx, y: 6.1, w: lw, h: 0.55, fontSize: 11, color: C.accent3 });
    // Right: MvPI in numbers.
    const rx = lx + lw + 0.3, rw = W - M - rx;
    await ui.statTiles(s, [
      { value: "6" + NB + "Jul" + NB + "2015", label: "MvPI launched", sub: "IPC Ghaziabad, National Coordination Centre", valueSize: 22 },
      { value: "174", label: "Monitoring centres", sub: "hospitals and colleges, ~2022; ~97% of reports", color: C.accent4 },
    ], { x: rx, y: 1.72, w: rw, h: 1.55, gap: 0.18, valueSize: 28 });
    await ui.statTiles(s, [
      { value: "35,391", label: "Reports 2018–24", sub: "2026 analysis; 1,931 in 2015–19, 1,277 serious", color: C.accent3 },
      { value: "1800-180-3024", label: "MvPI helpline", sub: "MDAE form v1.2; mvpi-ipc@gov.in", color: C.accent2, valueSize: 16 },
    ], { x: rx, y: 3.45, w: rw, h: 1.55, gap: 0.18, valueSize: 28 });
    ui.card(s, rx, 5.18, rw, 1.47, { fill: C.background2, name: "Reporting becomes a duty" });
    text(s, [{ text: "Reporting is becoming a duty", options: { bold: true, fontSize: 11.5, breakLine: true } }, ...bullets([
      "CDSCO circular 15" + NB + "May" + NB + "2024: every licence holder reports suspected unexpected serious adverse events to MvPI",
      "Mar" + NB + "2025: expert committee under MvPI; 15" + NB + "Jul" + NB + "2025: NMC tells medical colleges to form device adverse-event committees",
    ], { fontSize: 9.5, color: C.text2 })], { x: rx + 0.18, y: 5.26, w: rw - 0.36, h: 1.35, color: C.text1, paraSpaceAfter: 2 });
  }

  // ================================================================ in-fogo-path (dark)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "in-fogo-path", kicker: "INDIA · WORKED EXAMPLE", title: "FoGO on the Indian path", stage: STAGE, core: true });
    const done = C.accent1, next = C.accent2;
    ui.timeline(s, [
      { date: "2024–25", label: "Alpha prototype", detail: "3 iterations, Jan" + NB + "2024–Jun" + NB + "2025; public-dataset F1 0.83–0.85", color: done },
      { date: "Jul" + NB + "2026", label: "EMC pre-compliance", detail: "IEC" + NB + "60601-1-2 pre-compliance test, not yet certification", color: done },
      { date: "10" + NB + "Aug" + NB + "2026", label: "Test licence MD-13", detail: "25 units for evaluation; fee ₹500/device; valid 3" + NB + "years", color: done, big: true },
      { date: "Next", label: "Ethics approval", detail: "Committee registered with CDSCO; consent in Odia and Hindi", color: next },
      { date: "Next", label: "MD-22 → MD-23", detail: "Seventh Schedule dossier; fee: verify (waived for govt institutions, Rule 51(2))", color: next },
      { date: "Next", label: "CTRI registration", detail: "Before the first participant", color: next },
      { date: "2027 (est.)", label: "Proof-of-concept study", detail: "AIIMS Bhubaneswar; 18-month BIRAC BIG proposal under review", color: next },
      { date: "After study", label: "MD-3 → MD-5", detail: "Class B (proposed); State; notified-body audit; ₹5,000 + ₹500; est. 4–5 months", color: next },
    ], { dark: true, y: 3.35, labelH: 1.15, inset: 0.9 });
    const stepX = (W - 2 * M - 1.8) / 7, todayX = M + 0.9 + 2.5 * stepX;
    ui.pill(s, todayX - 0.7, 3.35 - 0.15, 1.4, "TODAY · 7" + NB + "OCT" + NB + "2026", { color: C.accent3, h: 0.3, fontSize: 9 });
    // Bottom: status cards.
    const cards = [
      { key: "demonstrated", title: "Done", body: "Prototype function, EMC pre-compliance and an MD-13 test licence for 25 units. Units made under MD-13 cannot be sold or used in routine care." },
      { key: "planned", title: "Next 12–18 months", body: "Ethics approval, MD-23, CTRI, a proof-of-concept study (IDEAL stages 1–2a), then the QMS and an MD-5 application. Not yet funded, approved or permitted." },
      { key: "notyet", title: "Estimates, not facts", label: "Estimates", body: "Durations and prices are consultancy or developer estimates: MD-5 in 4–5 months; ISO" + NB + "13485 in 3–6 months for ₹3–8" + NB + "lakh; planned price ₹27,000 + ₹3–4,000 a year." },
    ];
    const cw = (W - 2 * M - 2 * 0.22) / 3;
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i], x = M + i * (cw + 0.22), y = 5.3, h = 1.5;
      s.addShape(S.ROUNDED_RECTANGLE, { x, y, w: cw, h, rectRadius: 0.12, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 0.75 }, objectName: `Status card ${c.title}` });
      text(s, c.title, { x: x + 0.2, y: y + 0.14, w: cw - 2.3, h: 0.34, fontSize: 13, bold: true, color: C.background1, valign: "middle" });
      ui.statusChip(s, x + cw - 2.05, y + 0.14, c.key, { w: 1.85, dark: true, label: c.label });
      text(s, c.body, { x: x + 0.2, y: y + 0.56, w: cw - 0.4, h: h - 0.62, fontSize: 10, color: C.accent6 });
    }
  }

  // ================================================================ in-quiz (dark)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "in-quiz", kicker: "WOULD YOU PROCEED? 3/5 · QUICK QUIZ", title: "Classify these four devices", stage: STAGE, core: true });
    await ui.cardGrid(s, [
      { icon: "LuThermometer", title: "Digital thermometer", body: ["Measures body temperature at home", "Battery powered; a display, no app", "Notified as a 'drug' from 1" + NB + "Jan" + NB + "2021", "NPPA trade-margin cap since Jul" + NB + "2021"], color: C.accent1 },
      { icon: "LuMagnet", title: "PEMF knee device", body: ["Pulsed electromagnetic field to the knee", "45-minute sessions at home (leaflet)", "Applicator plus mains-powered controller", "Leaflet: adjunct for knee osteoarthritis"], color: C.accent2 },
      { icon: "LuWatch", title: "Wearable + app that cues", body: ["Ankle sensor streams to a phone app", "App detects freezing of gait", "Chest module vibrates a cue", "Holds an MD-13 test licence for 25 units"], color: C.accent2 },
      { icon: "LuHeartPulse", title: "Coronary stent", body: ["Implanted in a coronary artery", "Stays in the body permanently", "Drug-eluting; NPPA ceiling price", "Notified before 2020: licensed since 2018"], color: C.accent3 },
    ], { y: 1.72, h: 2.75, cols: 4, gap: 0.22, dark: true, titleSize: 13, bodySize: 11, iconD: 0.5 });
    text(s, "THREE QUESTIONS THAT DECIDE IT", { x: M, y: 4.62, w: 6, h: 0.22, fontSize: 9.5, bold: true, color: C.accent2, charSpacing: 1.5 });
    const qs = [
      { icon: "LuSyringe", t: "Does it enter the body, and for how long? Intact skin, body orifice, surgery; transient, short or long term." },
      { icon: "LuZap", t: "Is it active? Energy delivered, software driving an action, monitoring of vital physiological processes." },
      { icon: "LuTag", t: "What does the label claim? Intended use fixes the class, the authority and the evidence." },
    ];
    const qw = (W - 2 * M - 2 * 0.22) / 3;
    for (let i = 0; i < qs.length; i++) {
      const x = M + i * (qw + 0.22);
      await ui.iconDisc(s, qs[i].icon, x, 4.9, 0.44, { bg: C.accent6, fg: "0E3B3D" });
      text(s, qs[i].t, { x: x + 0.56, y: 4.86, w: qw - 0.6, h: 0.62, fontSize: 10, color: C.background1 });
    }
    const legend = [["A", "Registration only if non-sterile, non-measuring; else State MD-5"], ["B", "State Licensing Authority · MD-3 → MD-5"], ["C", "Central (CDSCO) · MD-7 → MD-9"], ["D", "Central (CDSCO) · MD-7 → MD-9"]];
    const lw = (W - 2 * M - 3 * 0.2) / 4;
    legend.forEach(([k, t], i) => {
      const x = M + i * (lw + 0.2);
      ui.numBadge(s, x, 5.68, 0.42, k, { bg: CLASS_COLORS[k], fg: C.background1, fontSize: 14 });
      text(s, t, { x: x + 0.52, y: 5.66, w: lw - 0.55, h: 0.46, fontSize: 9.5, color: C.accent6, valign: "middle" });
    });
    ui.callout(s, "Tables, 90 seconds: write the class, the authority and the form for each device. Watch for the trap: a Class A device can still need a State licence.", { y: 6.28, h: 0.5, dark: true, fontSize: 11.5 });
  }

  // ================================================================ in-ecosystem (light)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "in-ecosystem", kicker: "INDIA · POLICY AND ECOSYSTEM", title: "Where India builds devices", stage: STAGE });
    const park = "0F7C74", amtz = "E0962A", kiit = "3D5A80";
    await ui.mapPanel(s, "india", { x: M, y: 1.68, w: 3.9, highlights: { hp: park, tn: park, mp: park, up: park, ap: amtz, or: kiit }, labelSize: 9.5, markers: [
      { id: "hp", label: "Device park · HP", side: "right", color: park, dy: 0.05 },
      { id: "up", label: "Device park · UP", side: "right", color: park, dy: 0.1 },
      { id: "mp", label: "Device park · MP", side: "right", color: park },
      { id: "tn", label: "Device park · TN", side: "right", color: park },
      { id: "ap", label: "AMTZ · Visakhapatnam", side: "right", color: amtz, w: 1.7 },
      { id: "or", label: "KIIT · Bhubaneswar", side: "right", color: kiit, w: 1.5, dy: -0.05 },
    ] });
    ui.pill(s, M, 6.28, 1.5, "Device park", { color: park, h: 0.28, fontSize: 9 });
    ui.pill(s, M + 1.6, 6.28, 1.05, "AMTZ", { color: amtz, h: 0.28, fontSize: 9 });
    ui.pill(s, M + 2.75, 6.28, 1.15, "KIIT TBI", { color: kiit, h: 0.28, fontSize: 9 });
    const rx = 5.1, rw = W - M - rx;
    await ui.stepsVertical(s, [
      { title: "National Medical Devices Policy 2023", detail: "Cabinet, 26" + NB + "Apr" + NB + "2023: US$" + NB + "11" + NB + "bn (2023) → US$" + NB + "50" + NB + "bn by 2030; six strategies, incl. an export council" },
      { title: "PLI for medical devices · ₹3,420" + NB + "crore", detail: "FY2020-21 to FY2027-28; 5% on incremental sales; by Mar" + NB + "2025: 27 projects, ₹1,153" + NB + "crore, 54 products" },
      { title: "Four medical device parks · ₹400" + NB + "crore", detail: "Up to ₹100" + NB + "crore each for shared infrastructure: Himachal, Tamil Nadu, Madhya Pradesh, Uttar Pradesh" },
      { title: "PRIP · ₹5,000" + NB + "crore  ·  Strengthening scheme · ₹500" + NB + "crore", detail: "Industry–academia R&D; Nov" + NB + "2024 scheme: clusters ₹110" + NB + "cr, clinical studies ₹100" + NB + "cr, skills ₹100" + NB + "cr" },
      { title: "AMTZ Visakhapatnam  ·  EPCMD (22" + NB + "Sep" + NB + "2022)", detail: "NABL EMC, electrical-safety and biomaterial labs; 3D printing; KIHT; export council at YEIDA, Noida" },
      { title: "BIRAC BIG  ·  MedTech Mitra  ·  KIIT TBI", detail: "BIG: up to ₹50" + NB + "lakh for 18 months; MedTech Mitra (ICMR + CDSCO) hand-holding; FoGO sits at KIIT TBI" },
    ], { x: rx, y: 1.72, w: rw, rowH: 0.6, color: C.accent1, titleSize: 11.5, detailSize: 9.5 });
    await ui.statTiles(s, [
      { value: "~70%", label: "Imported", sub: "Standing Committee, Mar" + NB + "2024", icon: "LuShip", color: C.accent3 },
      { value: "US$" + NB + "8.18" + NB + "bn", label: "Imports, FY2023-24", sub: "~60% electro-medical equipment", icon: "LuTrendingUp", color: C.accent4, valueSize: 19 },
      { value: "US$" + NB + "4.1" + NB + "bn", label: "Exports, FY2024-25", sub: "from US$" + NB + "2.5" + NB + "bn in FY2020-21", icon: "LuPlane", color: C.accent1, valueSize: 19 },
    ], { x: rx, y: 5.42, w: rw, h: 1.42, gap: 0.2, valueSize: 24 });
  }
}

module.exports = { SECTION, build };
