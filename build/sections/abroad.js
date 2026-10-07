// Section: Permission abroad (ab-*). USA, EU, UK, Japan, Australia, China, Canada, IMDRF, MDSAP, WHO and the standards that travel.
// Facts: build/facts/international.md, build/facts/india-class-licence.md (plus UDI/PSUR rows from facts/cdsco-guidance.md), refs.js.
const SECTION = "Permission: regulation abroad";
const NB = " ";
const STAGE = 3; // Permission

async function build(ui) {
  const { C, S, M, HEX, CLASS_COLORS, text, img } = ui;
  const EU27 = ["at", "be", "bg", "hr", "cy", "cz", "dk", "ee", "fi", "fr", "de", "gr", "hu", "ie", "it", "lv", "lt", "lu", "mt", "nl", "pl", "pt", "ro", "sk", "si", "es", "se"];
  const bullets = (items) => items.map((t, j) => ({ text: t, options: { bullet: { indent: 10 }, breakLine: j < items.length - 1 } }));
  const lead = (head, body) => [{ text: head, options: { bold: true } }, { text: body, options: { bold: false } }];

  // Diagonal connector with an arrow head at (x2, y2).
  function link(s, x1, y1, x2, y2, color, width = 1.5) {
    const o = { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.001, h: Math.abs(y2 - y1) || 0.001, line: { color, width, endArrowType: "triangle" }, objectName: "Link" };
    if (x2 < x1) o.flipH = true;
    if (y2 < y1) o.flipV = true;
    s.addShape(S.LINE, o);
  }

  // ------------------------------------------------------------------ ab-div
  await ui.sectionDivider(SECTION, {
    id: "ab-div", num: 4, kicker: "PART 4 · PERMISSION ABROAD", title: "Same questions, different answers",
    blurb: "What is it for, how risky is it, what evidence, who keeps watching? Every regulator asks the same four questions and answers with different forms, fees and clocks.",
    items: [
      { icon: "LuGlobe", text: "Who regulates where, and the forum that links them: IMDRF, MDSAP, WHO" },
      { icon: "LuLayers", text: "Risk classes mapped across India, the USA, the EU, Japan, Canada and Australia" },
      { icon: "LuFileStack", text: "One dossier, many markets: the standards and reliance routes that travel" },
    ],
    photo: { file: img("fogo_module.jpg"), caption: "FoGO ankle module, 2026: one device, classified separately in every jurisdiction" },
  });

  // ------------------------------------------------------------------ ab-map (DARK)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ab-map", kicker: "ABROAD · REGULATORS", title: "Where the rules come from", stage: STAGE, core: true });
    const hl = { in: HEX.accent2 };
    for (const k of EU27) hl[k] = HEX.accent1;
    for (const k of ["us", "gb", "jp", "cn", "au", "ca", "br", "sg"]) hl[k] = HEX.accent4;
    await ui.mapPanel(s, "world", {
      x: M, y: 1.6, w: 7.4, highlights: hl, dark: true, labelSize: 10, markers: [
        { id: "in", label: "CDSCO", color: C.accent2, side: "below", w: 1.0 },
        { id: "us", label: "FDA", side: "below", dy: 0.08, w: 0.9 },
        { id: "ca", label: "Health Canada", side: "above", w: 1.4 },
        { id: "gb", label: "MHRA", side: "left", w: 0.9 },
        { id: "de", label: "EU notified bodies", side: "right", w: 1.7, color: C.accent1 },
        { id: "cn", label: "NMPA", side: "above", w: 0.9 },
        { id: "jp", label: "PMDA", side: "right", w: 0.9 },
        { id: "sg", label: "HSA", side: "right", w: 0.8 },
        { id: "au", label: "TGA", side: "below", w: 0.9 },
        { id: "br", label: "ANVISA", side: "right", w: 1.0 },
      ],
    });
    // Legend under the map.
    const legend = [[C.accent2, "India · CDSCO, IMDRF affiliate since Sept 2024"], [C.accent1, "EU-27 · MDR 2017/745, ≈48 notified bodies"], [C.accent4, "IMDRF Management Committee regulators"]];
    let lx = M;
    for (const [col, lab] of legend) {
      s.addShape(S.OVAL, { x: lx, y: 6.6, w: 0.18, h: 0.18, fill: { color: col }, line: { type: "none" }, objectName: `Legend ${lab}` });
      const lw = lab.length * 0.058 + 0.2;
      text(s, lab, { x: lx + 0.26, y: 6.52, w: lw, h: 0.34, fontSize: 9.5, color: C.background1, valign: "middle" });
      lx += 0.26 + lw + 0.15;
    }
    await ui.cardGrid(s, [
      { icon: "LuGlobe", title: "IMDRF: the regulators' forum", color: C.accent2, body: "Founded 2011 as successor to the GHTF. 12 Management Committee members (Swissmedic joined March 2025); WHO is an observer. India's CDSCO became an Affiliate Member after the Seattle session, September 2024: working-group access, no vote." },
      { icon: "LuShieldCheck", title: "MDSAP: one audit, five regulators", color: C.accent1, body: "A single ISO 13485-based audit by an authorised organisation satisfies TGA, ANVISA, Health Canada, MHLW/PMDA and FDA. Observers: EU, Singapore HSA, UK MHRA, WHO Prequalification. Mandatory for Canada Class II–IV licences." },
      { icon: "LuBookOpen", title: "WHO: the model and the list", color: C.accent4, body: "Global Model Regulatory Framework (2017): start with basic controls (law, authority, A–D classes, vigilance, reliance), then expand. WHO-Listed Authorities: 39 agencies after the 7 Aug 2025 designations; first device-regulator list on 23 Jul 2026." },
    ], { x: 8.3, w: 4.43, y: 1.6, h: 5.0, cols: 1, gap: 0.18, dark: true, titleSize: 12, bodySize: 9.5, iconD: 0.44 });
  }

  // ------------------------------------------------------------------ ab-classes (CONTENT)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ab-classes", kicker: "ABROAD · CLASSES", title: "Risk classes across six systems", stage: STAGE, core: true });
    const tier = ["D", "C", "B", "A"];
    const usTier = { "III (PMA)": "D", "II (510(k))": "B", "I (mostly exempt)": "A" };
    const rows = [
      ["Highest risk · pacemaker", "D", "D", "III", "IV", "IV", "III (PMA)"],
      ["Moderate–high · infusion pump", "C", "C", "IIb", "III", "III", "II (510(k))"],
      ["Low–moderate · syringe", "B", "B", "IIa", "II", "II", "II (510(k))"],
      ["Lowest risk · exam gloves", "A", "A", "I", "I", "I", "I (mostly exempt)"],
      ["Who decides", "Principles only (N77:2012)", "SLA for A, B · CLA for C, D", "Self-declare I · notified body Is–III", "Notification · RCB · MHLW/PMDA", "MDEL (I) · MDL (II–IV)", "510(k) · De Novo · PMA"],
    ];
    ui.matrix(s, ["Risk tier · example", "GHTF / IMDRF", "India MDR-2017", "EU MDR · UK · Australia", "Japan PMD Act", "Canada", "USA FDA"], rows, {
      y: 1.72, colW: [2.3, 1.65, 1.75, 2.0, 1.75, 1.45, 1.23], rowH: [0.46, 0.5, 0.5, 0.5, 0.5, 0.64], fontSize: 10.5, headFill: HEX.accent4,
      cellStyle: (r, c, v) => {
        if (r === 4) return { fontSize: 9, color: HEX.dk2, bold: c === 0 };
        if (c === 0) return { fill: { color: HEX.lt2 } };
        const key = c === 6 ? usTier[v] : tier[r];
        return { fill: { color: CLASS_COLORS[key] }, color: HEX.lt1, bold: true, align: "center", fontSize: 12 };
      },
    });
    await ui.cardGrid(s, [
      { icon: "LuLayers", title: "Same rules underneath", color: C.accent1, body: "GHTF/SG1/N77:2012 principles → India First Schedule (Rule 4), EU Annex VIII (22 rules), Japan, Canada and Australia. Four tiers, one logic: invasiveness, duration, energy, body site." },
      { icon: "LuTriangleAlert", title: "The US is the exception", color: C.accent4, body: "Three classes assigned by product code, not by rules. Class II (510(k)) absorbs most of B and C, so an EU IIb device is often US Class II; some EU III implants are too." },
      { icon: "LuFlag", title: "For an Indian team", color: C.accent2, body: "Classify per jurisdiction: rule wording differs and the class decides the route. A Class B wearable in India maps to EU IIa, Japan II, Canada II; in the US expect Class II and a predicate search." },
    ], { y: 5.0, h: 1.75, cols: 3, titleSize: 12.5, bodySize: 10, iconD: 0.44 });
  }

  // ------------------------------------------------------------------ ab-usa (DARK)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ab-usa", kicker: "ABROAD · UNITED STATES", title: "US FDA: three classes, three doors", stage: STAGE });
    ui.chevronFlow(s, [
      { title: "Classify", detail: "Class I · II · III, by product code" },
      { title: "Study", detail: `IDE for significant-risk trials (21${NB}CFR${NB}812); IRB decides risk` },
      { title: "Submit", detail: "510(k) · De Novo · PMA", color: C.accent2 },
      { title: "QMSR", detail: `ISO 13485:2016 via 21${NB}CFR${NB}820, from 2${NB}Feb${NB}2026` },
      { title: "Watch", detail: "MAUDE reports · recalls · UDI in GUDID" },
    ], { x: M, y: 1.72, w: 8.0, h: 0.6, detailH: 0.5, dark: true, fontSize: 11 });
    await ui.cardGrid(s, [
      { icon: "LuDoorOpen", title: "510(k)", color: C.accent1, body: ["Class II (and some Class I): substantial equivalence to a predicate", `Fee $26,067 · small business $6,517 (FY2026)`, `Goal: 95% decided within 90${NB}FDA days`, "3,238 clearances in 2025"] },
      { icon: "LuLightbulb", title: "De Novo", color: C.accent2, body: ["Novel low–moderate-risk device with no predicate; creates a new classification", "Fee $173,782 · small business $43,446", "Later devices can cite the De Novo device as a predicate", "27 grants reported for 2025"] },
      { icon: "LuShieldAlert", title: "PMA", color: C.accent3, body: ["Class III: reasonable assurance of safety and effectiveness, usually with clinical data", "Fee $579,272 · small business $144,818", `Goal: 285 calendar days total time (FY2025–27)`, "41 originals + 2,210 supplements in 2025"] },
    ], { x: M, y: 2.95, w: 8.0, h: 2.75, cols: 3, gap: 0.2, dark: true, titleSize: 14, bodySize: 9.5, iconD: 0.44 });
    ui.callout(s, lead("For an Indian exporter: ", `qualify as a small business (≤ US$100${NB}m gross receipts) and every fee drops to one quarter; build the QMS to ISO 13485:2016 once (India Fifth Schedule, FDA QMSR, MDSAP); run the predicate search before the design freeze.`),
      { x: M, y: 5.9, w: 8.0, h: 0.85, dark: true, fontSize: 10.5, bold: false });
    const tiles = [
      { value: "1,246", label: "Breakthrough designations", sub: "2016–2025; 185 reached the market; 136 in 2025", icon: "LuRocket", color: C.accent2 },
      { value: "79 : 1", label: "510(k)s per original PMA", sub: "3,238 clearances vs 41 approvals in 2025", icon: "LuScale", color: C.accent1 },
      { value: "$11,423", label: "Annual establishment registration", sub: "No small-business discount; hardship waiver possible", icon: "LuBuilding2", color: C.accent4 },
    ];
    for (let i = 0; i < tiles.length; i++) await ui.statTiles(s, [tiles[i]], { x: 8.85, y: 1.72 + i * 1.7, w: 3.88, h: 1.55, dark: true, valueSize: 30 });
  }

  // ------------------------------------------------------------------ ab-eu (CONTENT)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ab-eu", kicker: "ABROAD · EUROPEAN UNION", title: "EU MDR: notified bodies and CE marking", stage: STAGE });
    // EU class ladder composed locally (classLadder is hard-wired to A–D labels).
    const bands = [
      { cls: "I", color: CLASS_COLORS.A, risk: "Low risk", items: ["Manufacturer self-declares conformity", "Is / Im / Ir: notified body for that aspect only"] },
      { cls: "IIa", color: CLASS_COLORS.B, risk: "Low–moderate", items: ["Notified body certifies QMS and technical file", "Clinical evaluation, Art. 61"] },
      { cls: "IIb", color: CLASS_COLORS.C, risk: "Moderate–high", items: ["Notified body; deeper technical review", "PMCF, Annex XIV Part B"] },
      { cls: "III", color: CLASS_COLORS.D, risk: "High · implants, AIMDs", items: ["Notified body; clinical investigation generally expected", `Legacy MDD certificates end 31${NB}Dec${NB}2027`] },
    ];
    const LX = M, LY = 1.75, LW = 6.0, LH = 2.7, bw = LW / bands.length, base = LY + LH;
    bands.forEach((b, i) => {
      const bh = LH * (0.64 + (0.36 * i) / (bands.length - 1)), xx = LX + i * bw, yy = base - bh;
      s.addShape(S.RECTANGLE, { x: xx, y: yy, w: bw - 0.08, h: bh, fill: { color: b.color }, line: { type: "none" }, objectName: `EU Class ${b.cls}` });
      text(s, `Class ${b.cls}`, { x: xx + 0.14, y: yy + 0.1, w: bw - 0.3, h: 0.4, fontSize: 18, bold: true, color: C.background1 });
      text(s, b.risk, { x: xx + 0.14, y: yy + 0.5, w: bw - 0.3, h: 0.3, fontSize: 10, italic: true, color: C.background1 });
      text(s, bullets(b.items), { x: xx + 0.1, y: yy + 0.86, w: bw - 0.26, h: bh - 0.95, fontSize: 9.5, color: C.background1, paraSpaceAfter: 2 });
    });
    s.addShape(S.RIGHT_ARROW, { x: LX, y: base + 0.12, w: LW, h: 0.28, fill: { color: "D5DFDD" }, line: { type: "none" }, objectName: "EU risk arrow" });
    text(s, "Increasing risk   →   more notified-body scrutiny, more clinical evidence", { x: LX + 0.2, y: base + 0.12, w: LW - 0.6, h: 0.28, fontSize: 10.5, bold: true, color: C.text1, valign: "middle" });

    await ui.cardGrid(s, [
      { icon: "LuFileCheck", title: "Self-declaration", color: CLASS_COLORS.A, body: "Class I non-sterile, non-measuring, non-reusable-surgical. The manufacturer signs the EU Declaration of Conformity and affixes the CE mark. Still needed: technical file, clinical evaluation, EUDAMED actor registration (SRN)." },
      { icon: "LuBadgeCheck", title: "Notified body route", color: C.accent4, body: "Is/Im/Ir, IIa, IIb, III. About 48 bodies designated under MDR (early 2026). Time to certificate 13–18 months is typical; 58% of that time sits with the manufacturer. By end-2025: 25,978 MDR applications, 13,953 certificates issued." },
    ], { x: 6.9, w: 5.83, y: 1.75, h: 2.05, cols: 2, gap: 0.2, titleSize: 12.5, bodySize: 9.5, iconD: 0.42 });
    ui.callout(s, lead("For an Indian exporter: ", `register as an actor in EUDAMED (SRN, mandatory from 28${NB}May${NB}2026); book a notified body early, because the queue, not the test, is the critical path; reuse the ISO 13485 QMS and ISO 14971 risk file from the CDSCO dossier.`),
      { x: 6.9, y: 3.98, w: 5.83, h: 0.95, color: C.accent1, fontSize: 10.5, bold: false });

    // Timeline with every label below the line (ui.timeline puts labels above when alternate is off).
    const events = [
      { date: "2017", label: "MDR 2017/745 adopted", detail: "replaces MDD and AIMDD", color: C.accent4 },
      { date: `26${NB}May${NB}2021`, label: "Fully applicable", detail: "22 rules, Annex VIII", color: C.accent4 },
      { date: `Mar${NB}2023`, label: "Regulation 2023/607", detail: "transition extended; sell-off date removed", color: C.accent4 },
      { date: `16${NB}Dec${NB}2025`, label: "Targeted revision proposed", detail: "COM(2025) 1023; under negotiation", color: C.accent2, big: true },
      { date: `28${NB}May${NB}2026`, label: "EUDAMED mandatory", detail: "first four modules", color: C.accent1 },
      { date: `31${NB}Dec${NB}2027`, label: "Legacy Class III, IIb implants", detail: "MDD certificates end", color: C.accent3 },
      { date: `31${NB}Dec${NB}2028`, label: "Other IIb, IIa, Is, Im", detail: "end of transition", color: C.accent3 },
    ];
    const TY = 5.3, TW = 12.13, inset = 0.85, step = (TW - 2 * inset) / (events.length - 1), lw = Math.min(step * 0.98, 2.2);
    s.addShape(S.LINE, { x: M, y: TY, w: TW, h: 0, line: { color: C.accent4, width: 2.5 }, objectName: "EU timeline" });
    events.forEach((e, i) => {
      const cx = M + inset + i * step, d = e.big ? 0.3 : 0.2;
      s.addShape(S.OVAL, { x: cx - d / 2, y: TY - d / 2, w: d, h: d, fill: { color: e.color }, line: { color: C.background1, width: 2 }, objectName: `Milestone ${e.date}` });
      ui.pill(s, cx - 0.55, TY + 0.22, 1.1, e.date, { color: e.color, h: 0.28, fontSize: 10 });
      text(s, [{ text: e.label, options: { bold: true, breakLine: true } }, { text: e.detail, options: { color: C.text2, fontSize: 9.5 } }], { x: cx - lw / 2, y: TY + 0.58, w: lw, h: 0.9, fontSize: 10.5, align: "center", valign: "top", color: C.text1 });
    });
  }

  // ------------------------------------------------------------------ ab-others (DARK)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ab-others", kicker: "ABROAD · UK, JAPAN, AUSTRALIA, CHINA, CANADA", title: "Five more systems in one view", stage: STAGE });
    const cards = [
      { code: "GB", country: "UK", reg: "MHRA", badge: "CE recognition + reliance", color: C.accent4, items: ["UK MDR 2002; UKCA via UK Approved Bodies", `CE still accepted: MDD devices to 30${NB}Jun${NB}2028, MDR devices to 30${NB}Jun${NB}2030`, "≈90% of devices on the GB market remain CE-marked", "International reliance route: FDA, Health Canada, TGA, EU approvals", `PMS Regulations in force 16${NB}Jun${NB}2025; Feb 2026 consultation on indefinite CE recognition`] },
      { code: "JP", country: "Japan", reg: "PMDA · MHLW", badge: "Classes I–IV, MAH", color: C.accent1, items: ["PMD Act; GHTF-based Classes I–IV; JMDN codes", "I: notification · II–III: RCB certification where a standard exists · IV: MHLW approval after PMDA review", "Foreign makers act through a Japanese MAH or D-MAH and register as Foreign Manufacturer", "MDSAP member; WHO-Listed Authority since Aug 2025"] },
      { code: "AU", country: "Australia", reg: "TGA", badge: "ARTG + reliance", color: C.accent2, items: ["Therapeutic Goods Act 1989; Classes I, Is, Im, Ir, IIa, IIb, III", "Inclusion in the ARTG through an Australian sponsor", "Accepts comparable-regulator evidence: CE certificates, FDA 510(k)/PMA, Health Canada, Japan, MDSAP (2018), Singapore HSA (2022)", "Australian classification, sponsor and vigilance still apply"] },
      { code: "CN", country: "China", reg: "NMPA", badge: "Local testing", color: C.accent3, items: [`State Council Order 739, in force 1${NB}Jun${NB}2021; MAH regime`, "I: filing · II: provincial MPA registration · III: central NMPA; all imports via central NMPA", "II/III: type testing at an NMPA-authorised centre; Class II review target 60 working days", "Clinical evaluation unless on the exemption catalogue or shown equivalent"] },
      { code: "CA", country: "Canada", reg: "Health Canada", badge: "Classes I–IV, MDSAP", color: C.accent1, items: ["Medical Devices Regulations SOR/98-282; Classes I–IV", "I: establishment licence (MDEL) · II–IV: Medical Device Licence (MDL)", "MDSAP certificate mandatory for II–IV: the sole QMS route since 2019", "Since Jan 2026: REP + CESG electronic submissions", "WHO-Listed Authority since Aug 2025"] },
    ];
    const gap = 0.18, cw = (12.13 - gap * 4) / 5, cy = 1.72, ch = 4.0;
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i], x = M + i * (cw + gap);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: cy, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 0.75 }, objectName: `Card ${c.country}` });
      await ui.flag(s, c.code, x + 0.18, cy + 0.2, 0.6);
      text(s, [{ text: c.country, options: { bold: true, fontSize: 13, breakLine: true } }, { text: c.reg, options: { fontSize: 10, color: C.accent6 } }], { x: x + 0.9, y: cy + 0.12, w: cw - 1.0, h: 0.58, color: C.background1, valign: "middle" });
      ui.pill(s, x + 0.18, cy + 0.84, cw - 0.36, c.badge, { color: c.color, h: 0.26, fontSize: 9 });
      text(s, bullets(c.items), { x: x + 0.18, y: cy + 1.22, w: cw - 0.34, h: ch - 1.34, fontSize: 9.5, color: C.background1, paraSpaceAfter: 3 });
    }
    const half = (12.13 - 0.2) / 2;
    ui.callout(s, lead("What travels: ", "an ISO 13485 QMS and an MDSAP audit · a CE certificate or FDA decision (TGA and MHRA accept them) · the clinical evaluation and the ISO 14971 risk file."), { x: M, y: 5.95, w: half, h: 0.8, dark: true, color: C.accent1, fontSize: 10.5, bold: false });
    ui.callout(s, lead("What stays local: ", "a sponsor or MAH in-country · classification under local rules · registration, labelling and vigilance reporting to that regulator."), { x: M + half + 0.2, y: 5.95, w: half, h: 0.8, dark: true, color: C.accent3, fontSize: 10.5, bold: false });
  }

  // ------------------------------------------------------------------ ab-compare (CONTENT)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ab-compare", kicker: "ABROAD · SIDE BY SIDE", title: "India, USA and EU compared", stage: STAGE, core: true });
    const colW = [1.5, 3.3, 3.1, 3.25, 0.98];
    const V = { Similar: C.accent1, Lighter: CLASS_COLORS.A, Heavier: C.accent2 };
    const rows = [
      ["Law", `Drugs and Cosmetics Act 1940; Medical Devices Rules 2017, in force 1${NB}Jan${NB}2018`, `21${NB}CFR Part 812 (IDE studies) and Part 820 (QMSR); MDUFA user fees`, "Regulation (EU) 2017/745, amended by 2023/607 and 2024/1860", "Similar"],
      ["Regulator", "CDSCO (Central Licensing Authority) for C, D and all imports; State Licensing Authorities for A, B", "FDA · CDRH, one federal agency", "National competent authorities plus ≈48 notified bodies (NANDO); EMA coordinating role proposed Dec 2025", "Similar"],
      ["Classes", "A · B · C · D: Rule 4, First Schedule (GHTF A–D)", "I · II · III by product code; II spans GHTF B and C", "I (Is, Im, Ir) · IIa · IIb · III: 22 rules, Annex VIII", "Similar"],
      ["Premarket route", "A/B: MD-3 → MD-5 (SLA, notified-body audit); C/D: MD-7 → MD-9 (CLA); import: MD-14 → MD-15", "Class I mostly exempt; 510(k) · De Novo · PMA; Breakthrough designation", "Class I self-declaration; Is to III via a notified body → CE mark with NB number", "Lighter"],
      ["Clinical evidence", "Test licence MD-12 → MD-13 for study units; investigation permission MD-22 → MD-23 plus a registered ethics committee", `IDE (21${NB}CFR${NB}812) for significant-risk studies, IRB decides; PMA expects clinical data`, "Clinical evaluation for every device (Art. 61), kept current by PMCF (Annex XIV Part B)", "Heavier"],
      ["QMS standard", "Fifth Schedule QMS (ISO 13485-aligned)", `QMSR: 21${NB}CFR${NB}820 incorporates ISO 13485:2016, from 2${NB}Feb${NB}2026`, "ISO 13485:2016; QMS certified by the notified body", "Similar"],
      ["Audit body", "NABCB-accredited notified bodies audit A/B sites; CDSCO Medical Device Officers inspect C/D", "FDA inspection (Compliance Program 7382.850) or an MDSAP audit", "Notified body audit and surveillance; EUDAMED actor registration (SRN)", "Similar"],
      ["UDI", `Rule 46 deferred "till further orders" (G.S.R. 918(E), 31${NB}Dec${NB}2021)`, "UDI on labels, records in GUDID; Class I consumer devices added 2022", `UDI and device registration in EUDAMED, mandatory from 28${NB}May${NB}2026`, "Lighter"],
      ["Post-market", "PSUR six-monthly for 2 years then yearly for 2; MvPI adverse-event reporting (IPC, since 2015)", "Adverse events into MAUDE; recall database; UDI expected in recall notices", "Vigilance reporting; PMCF keeps the clinical evaluation current; EUDAMED surveillance module", "Similar"],
      ["Time (reported ranges)", "A: licence ≤45 days; B: up to 140 days; C/D: 105–150 days; import ≤9 months", `510(k): 90${NB}FDA-day goal, 127–159 calendar days historically; PMA: 285-day goal`, "Certificate in 13–18 months typical; 6–12 months for QMS-only (Team-NB 2025)", "Lighter"],
      ["Cost (reported ranges)", "A/B ₹5,000 per site + ₹500 per device; C/D ₹50,000 + ₹1,000; import US$1,000–3,000 per site + $50–1,500 per device", "510(k) $26,067 (small $6,517); De Novo $173,782; PMA $579,272; + $11,423 a year", "No public tariff; notified-body quotes vary, reported order of magnitude tens of thousands of euros", "Lighter"],
    ];
    ui.matrix(s, ["", "India · CDSCO", "USA · FDA", "EU · MDR 2017/745", "India is"], rows, {
      y: 1.98, colW, rowH: [0.32, ...rows.map(() => 0.4)], fontSize: 9, headFill: HEX.dk2,
      cellStyle: (r, c, v) => {
        if (c === 4) return { fill: { color: V[v] }, color: HEX.lt1, bold: true, align: "center", fontSize: 9.5 };
        if (c === 1) return { fill: { color: r % 2 === 0 ? "FBF1E3" : "FDF7EE" } };
        if (c === 2) return { fill: { color: r % 2 === 0 ? "E7ECF4" : "F1F4F8" } };
        if (c === 3) return { fill: { color: r % 2 === 0 ? "E3F0EE" : "F0F7F5" } };
        return null;
      },
    });
    // Flags above the three jurisdiction columns.
    const x1 = M + colW[0], x2 = x1 + colW[1], x3 = x2 + colW[2];
    await ui.flag(s, "IN", x1 + colW[1] / 2 - 0.27, 1.57, 0.54);
    await ui.flag(s, "US", x2 + colW[2] / 2 - 0.27, 1.57, 0.54);
    await ui.flag(s, "EU", x3 + colW[3] / 2 - 0.27, 1.57, 0.54);
    text(s, "Similar · Lighter · Heavier: presenter's reading", { x: x3 + colW[3] - 1.2, y: 1.63, w: 2.2, h: 0.28, fontSize: 8, italic: true, color: C.accent5, align: "right" });
  }

  // ------------------------------------------------------------------ ab-standards (DARK)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ab-standards", kicker: "ABROAD · WHAT TRAVELS", title: "One dossier, many markets", stage: STAGE, core: true });
    await ui.cardGrid(s, [
      { icon: "LuClipboardCheck", title: "ISO 13485:2016", color: C.accent1, body: `Quality management. Reconfirmed 31${NB}Oct${NB}2025; basis of FDA QMSR, MDSAP and India's Fifth Schedule` },
      { icon: "LuShieldAlert", title: "ISO 14971:2019", color: C.accent1, body: "Risk management, with ISO/TR 24971:2020 guidance; IEC 60601-1 now references it undated" },
      { icon: "LuStethoscope", title: "ISO 14155:2026", color: C.accent1, body: `Clinical investigation GCP; published 23${NB}Mar${NB}2026, no transition; estimands, CEC and DMC` },
      { icon: "LuFlaskConical", title: "ISO 10993-1", color: C.accent1, body: "Biological evaluation inside the risk process; endpoints by contact type and duration" },
      { icon: "LuZap", title: "IEC 60601-1 ed. 3.2", color: C.accent4, body: "Electrical safety and essential performance (2005 + A1:2012 + A2:2020); EMC via 60601-1-2" },
      { icon: "LuCode", title: "IEC 62304", color: C.accent4, body: `Software life cycle (2006 + A1:2015); edition 2 due Aug${NB}2026: two safety classes, AI/ML` },
      { icon: "LuMousePointerClick", title: "IEC 62366-1", color: C.accent4, body: "Usability engineering (2015 + A1:2020): find use errors before patients do" },
      { icon: "LuLock", title: "IEC 81001-5-1:2021", color: C.accent4, body: `Cybersecurity life cycle; FDA-recognised; EU harmonisation due 27${NB}May${NB}2028` },
    ], { y: 1.7, h: 2.75, cols: 4, gap: 0.18, dark: true, titleSize: 11.5, bodySize: 9.5, iconD: 0.36 });

    text(s, "Reliance routes an Indian dossier can use", { x: M, y: 4.55, w: 6, h: 0.24, fontSize: 10.5, bold: true, color: C.accent2 });
    const ry = 4.82, rh = 1.1;
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: ry, w: 2.1, h: rh, rectRadius: 0.1, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "India hub" });
    await ui.flag(s, "IN", M + 0.15, ry + 0.16, 0.54);
    text(s, [{ text: "India · CDSCO", options: { bold: true, fontSize: 11, breakLine: true } }, { text: "IMDRF affiliate 2024; MDR-2017 technical file, QMS and risk file", options: { fontSize: 9 } }], { x: M + 0.8, y: ry + 0.08, w: 1.25, h: rh - 0.16, color: HEX.dk2, valign: "middle" });
    ui.arrow(s, M + 2.18, ry + rh / 2, 0.42, C.accent2, 2.5);
    const sat = [
      { code: "US", cap: "FDA · MDSAP member; its decisions count for TGA and MHRA reliance" },
      { code: "EU", cap: "CE certificate: accepted by TGA; valid in Great Britain to 2028 / 2030" },
      { code: "JP", cap: "MHLW/PMDA · MDSAP member; WHO-Listed Authority, Aug 2025" },
      { code: "AU", cap: "TGA · accepts CE, FDA, Canada, Japan, MDSAP and HSA evidence" },
      { code: "CA", cap: "Health Canada · MDSAP mandatory (II–IV); WHO-Listed Authority" },
    ];
    const sx0 = M + 2.72, sgap = 0.14, tw = (12.73 - sx0 - sgap * 4) / 5;
    for (let i = 0; i < sat.length; i++) {
      const x = sx0 + i * (tw + sgap);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: ry, w: tw, h: rh, rectRadius: 0.1, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 0.75 }, objectName: `Reliance ${sat[i].code}` });
      await ui.flag(s, sat[i].code, x + (tw - 0.48) / 2, ry + 0.1, 0.48);
      text(s, sat[i].cap, { x: x + 0.08, y: ry + 0.46, w: tw - 0.16, h: rh - 0.5, fontSize: 9, color: C.background1, align: "center", valign: "top" });
    }
    ui.callout(s, lead("Lessons for Indian innovators: ", "write the technical file once to ISO 13485 and ISO 14971; run the first study to ISO 14155:2026; choose the first foreign market by reliance: TGA and MHRA accept FDA and CE decisions, so one of those two unlocks three markets."),
      { y: 6.08, h: 0.72, dark: true, color: C.accent2, fontSize: 10.5, bold: false });
  }
}

module.exports = { SECTION, build };
