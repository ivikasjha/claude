// Opening section: title, India's moment, disclosure, opening vote, three lenses, two patients, six-stage journey.
// Facts: facts/india-ecosystem.md, facts/india-class-licence.md, refs.js, storyboard_v2.json, notes/_legacy.js (slides 1–6).
const SECTION = "Opening";
const NB = " "; // non-breaking space inside numbers and dates

async function build(ui, ctx) {
  const { C, S, M, W, HEX, text, img } = ui;

  // ------------------------------------------------------------------ op-title
  {
    const s = ui.newSlide("TITLE_DARK", SECTION, { id: "op-title", source: "", core: true });
    s.addText("MEDICAL DEVICE ETHICS WORKSHOP", { placeholder: "kicker" });
    s.addText([
      { text: "Bridging the Gap:", options: { fontSize: 26, color: C.accent6, breakLine: true } },
      { text: "From Innovation to Patient Impact", options: { fontSize: 44, color: C.background1 } },
    ], { placeholder: "title" });
    s.addText("Ethics, Evidence, Regulation and Responsible Medical Device Translation", { placeholder: "subtitle" });
    s.addText([
      { text: "Dr Vikas Kumar Jha", options: { bold: true, breakLine: true } },
      { text: "KIIT University, Bhubaneswar", options: { fontSize: 14, color: C.accent6 } },
    ], { placeholder: "presenter" });

    // Two authentic device photographs, rounded, with labels.
    const px = 8.3, pw = 2.05, ph = 2.0, py = 2.0, gap = 0.33;
    text(s, "Authentic device photographs · no patients shown", { x: px, y: 1.6, w: 4.43, h: 0.3, fontSize: 11, italic: true, color: C.accent6 });
    await ui.imageFrame(s, img("title_fogo.jpg"), { x: px, y: py, w: pw, h: ph, alt: "FoGO chest cue module and ankle strap module (alpha prototype)", dark: true, radius: 44 });
    await ui.imageFrame(s, img("title_swaknee.jpg"), { x: px + pw + gap, y: py, w: pw, h: ph, alt: "SwaKnee controller connected to its knee applicator", dark: true, radius: 44 });
    text(s, [
      { text: "FoGO", options: { bold: true, color: C.background1, breakLine: true } },
      { text: "Freezing-of-gait wearable · alpha prototype", options: { color: C.accent6, fontSize: 10.5 } },
    ], { x: px, y: py + ph + 0.12, w: pw + 0.1, h: 0.7, fontSize: 13 });
    text(s, [
      { text: "SwaKnee", options: { bold: true, color: C.background1, breakLine: true } },
      { text: "Pulsed electromagnetic field (PEMF) knee system", options: { color: C.accent6, fontSize: 10.5 } },
    ], { x: px + pw + gap, y: py + ph + 0.12, w: pw + 0.1, h: 0.7, fontSize: 13 });

    // Six-stage strip: the spine of the session.
    const stages = [
      { n: "Need", i: "LuSearch" }, { n: "Evidence", i: "LuFlaskConical" }, { n: "People", i: "LuUsers" },
      { n: "Permission", i: "LuFileCheck" }, { n: "Access", i: "LuWallet" }, { n: "Safety", i: "LuShieldCheck" },
    ];
    const sw = 4.43 / stages.length, d = 0.44, sy = 5.42;
    text(s, "Six stages · six patient questions · two composite patients", { x: px, y: 5.02, w: 4.43, h: 0.3, fontSize: 10.5, bold: true, color: C.accent6 });
    s.addShape(S.LINE, { x: px + sw / 2, y: sy + d / 2, w: sw * (stages.length - 1), h: 0, line: { color: C.accent6, width: 1 }, objectName: "Stage connector" });
    for (let i = 0; i < stages.length; i++) {
      const cx = px + i * sw + sw / 2;
      await ui.iconDisc(s, stages[i].i, cx - d / 2, sy, d, { bg: C.accent6, fg: HEX.dk2 });
      text(s, stages[i].n, { x: cx - sw / 2, y: sy + d + 0.08, w: sw, h: 0.28, fontSize: 9.5, bold: true, align: "center", color: C.background1 });
    }

    // Session shape pills under the presenter block.
    const pills = ["2 devices", "2 patients", "6 stages", "5 decisions", "2 votes"];
    pills.forEach((p, i) => ui.pill(s, M + i * 1.35, 6.45, 1.2, p, { color: C.accent2, fill: false, dark: true, h: 0.3, fontSize: 10 }));
  }

  // ------------------------------------------------------------------ op-india
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "op-india", kicker: "INDIA · WHY NOW", title: "India's medical device moment", core: true });
    await ui.statTiles(s, [
      { value: `US$${NB}11${NB}bn`, label: "Market size, 2023", sub: `≈1.5% of the world market · NMDP 2023 Cabinet release, 26${NB}Apr${NB}2023`, icon: "LuChartBar", color: HEX.accent1 },
      { value: "≈70%", label: "Imported", sub: `Parliamentary Standing Committee, Mar 2024 · US$${NB}8.18${NB}bn imported in FY24`, icon: "LuShip", color: HEX.accent3 },
      { value: `US$${NB}50${NB}bn`, label: "Target by 2030", sub: "National Medical Devices Policy 2023: six strategies, regulatory streamlining first", icon: "LuTarget", color: HEX.accent2 },
      { value: `1${NB}Apr${NB}2020`, label: "All devices regulated", sub: `S.O. 648(E), 11${NB}Feb${NB}2020: every device a 'drug' under the 1940 Act`, icon: "LuGavel", color: HEX.accent4 },
    ], { y: 1.65, h: 1.7 });

    text(s, "One device's regulatory journey under the Medical Devices Rules, 2017 (MDR-2017)", { x: M, y: 3.5, w: 9, h: 0.26, fontSize: 12, bold: true, color: C.text2 });
    ui.chevronFlow(s, [
      { title: "Need", color: C.accent1, detail: "Observe care; write a solution-neutral need; fix the intended use and the claim" },
      { title: "Classify", color: C.accent4, detail: "Rule 4 + First Schedule: A low · B low-moderate · C moderate-high · D high risk" },
      { title: "Test licence", color: C.accent4, detail: `MD-12 → MD-13 (Central): prototypes for test, evaluation, demonstration; Rs${NB}500 per device; no sale` },
      { title: "Investigate", color: C.accent4, detail: "MD-22 → MD-23 permission (Seventh Schedule); registered ethics committee; CTRI registration" },
      { title: "Licence", color: C.accent4, detail: "MD-3 → MD-5, State (A/B; notified-body audit) · MD-7 → MD-9, Central (C/D; CDSCO inspection)" },
      { title: "Sustain", color: C.accent3, detail: "Retention fee every 5 years; MvPI adverse-event reports; CDSCO alerts and recalls" },
    ], { y: 3.8, h: 0.56, detailH: 1.2, fontSize: 12 });

    // Phase-in pills (G.S.R. 102(E)).
    text(s, "MDR-2017 phase-in", { x: M, y: 5.85, w: 1.5, h: 0.3, fontSize: 11, bold: true, color: C.text1, valign: "middle" });
    const phase = [
      { t: `In force 1${NB}Jan${NB}2018`, c: C.accent5, f: false },
      { t: `All devices 1${NB}Apr${NB}2020`, c: C.accent4, f: true },
      { t: `Registration 1${NB}Oct${NB}2021`, c: C.accent4, f: false },
      { t: `A/B licences 1${NB}Oct${NB}2022`, c: C.accent1, f: true },
      { t: `C/D licences 1${NB}Oct${NB}2023`, c: C.accent3, f: true },
    ];
    phase.forEach((p, i) => ui.pill(s, 2.15 + i * 2.08, 5.85, 1.98, p.t, { color: p.c, fill: p.f, h: 0.3, fontSize: 9.5 }));

    ui.callout(s, "Regulation is a sequence of permissions, each answering a different patient question: the same six stages structure this session.", { y: 6.27, h: 0.48, fontSize: 12.5 });
  }

  // ------------------------------------------------------------------ op-disclosure
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "op-disclosure", kicker: "DISCLOSURE", title: "My interests, stated first", core: true });
    const lx = M, lw = 7.3;
    text(s, "Interests in the two case devices", { x: lx, y: 1.68, w: lw, h: 0.26, fontSize: 12, bold: true, color: C.text2 });

    // FoGO card
    ui.card(s, lx, 2.0, lw, 2.6, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Interest card FoGO" });
    s.addShape(S.RECTANGLE, { x: lx, y: 2.3, w: 0.07, h: 2.0, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Card accent FoGO" });
    await ui.iconDisc(s, "LuFootprints", lx + 0.3, 2.2, 0.52, { bg: C.accent1, bgTrans: 85, fg: HEX.dk2 });
    text(s, [
      { text: "FoGO · Ahilaya Biomedicals Pvt Ltd", options: { bold: true, fontSize: 15, breakLine: true } },
      { text: "Freezing-of-gait wearable · incubated at KIIT TBI", options: { fontSize: 10.5, color: C.accent5 } },
    ], { x: lx + 0.95, y: 2.18, w: 4.3, h: 0.6, fontSize: 15, color: C.text1 });
    ui.pill(s, lx + lw - 2.05, 2.25, 1.85, "Alpha prototype · MD-13", { color: C.accent1, fill: false, h: 0.3, fontSize: 9.5 });
    const fogoRows = [
      { icon: "LuUser", t: "Founder and principal investigator" },
      { icon: "LuFileBadge", t: "Provisional patent 202531119165 and a design application filed" },
      { icon: "LuBanknote", t: `₹25.5${NB}lakh in grants: Startup Odisha · DST NIDHI PRAYAS · Startup India Seed Fund` },
      { icon: "LuHourglass", t: `BIRAC Biotechnology Ignition Grant proposal under review (BIG: up to ₹50${NB}lakh over 18${NB}months)` },
    ];
    for (let i = 0; i < fogoRows.length; i++) {
      const yy = 2.92 + i * 0.4;
      await ui.iconDisc(s, fogoRows[i].icon, lx + 0.3, yy, 0.32, { bg: C.accent1, bgTrans: 85, fg: HEX.dk2 });
      text(s, fogoRows[i].t, { x: lx + 0.75, y: yy, w: lw - 1.0, h: 0.32, fontSize: 11.5, valign: "middle", color: C.text1 });
    }

    // SwaKnee card
    ui.card(s, lx, 4.8, lw, 1.2, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Interest card SwaKnee" });
    s.addShape(S.RECTANGLE, { x: lx, y: 5.05, w: 0.07, h: 0.7, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Card accent SwaKnee" });
    await ui.iconDisc(s, "LuActivity", lx + 0.3, 4.98, 0.52, { bg: C.accent2, bgTrans: 85, fg: HEX.dk2 });
    text(s, [
      { text: "SwaKnee · Swayogya Rehab Solutions", options: { bold: true, fontSize: 15, breakLine: true } },
      { text: "Pulsed electromagnetic field (PEMF) knee system", options: { fontSize: 10.5, color: C.accent5 } },
    ], { x: lx + 0.95, y: 4.96, w: 4.3, h: 0.6, fontSize: 15, color: C.text1 });
    await ui.iconDisc(s, "LuPenTool", lx + 0.3, 5.58, 0.32, { bg: C.accent2, fg: HEX.dk2 });
    text(s, "[state role and any equity, royalty or salary interest]", { x: lx + 0.75, y: 5.58, w: lw - 1.0, h: 0.32, fontSize: 12, bold: true, valign: "middle", color: C.accent2 });

    // Ground rules panel
    const rx = 8.2, rw = W - M - rx;
    text(s, "Three ground rules for today", { x: rx, y: 1.68, w: rw, h: 0.26, fontSize: 12, bold: true, color: C.text2 });
    ui.card(s, rx, 2.0, rw, 4.0, { fill: C.background2, name: "Ground rules panel" });
    const rules = [
      { icon: "LuHand", t: "Vote before you hear my view", d: "Record your intuition first; we compare it with the closing vote on the same options." },
      { icon: "LuMessageSquareWarning", t: "Challenge every claim, including mine", d: "Ask of each claim: what is the evidence, who measured it, and who paid for it?" },
      { icon: "LuEyeOff", t: "Protect identities", d: "No names or photographs of patients from your own practice; personas here are composites." },
    ];
    for (let i = 0; i < rules.length; i++) {
      const yy = 2.22 + i * 1.25;
      ui.numBadge(s, rx + 0.25, yy, 0.5, i + 1, { bg: C.accent2, fg: C.text2, fontSize: 15 });
      text(s, [
        { text: rules[i].t, options: { bold: true, fontSize: 13, breakLine: true } },
        { text: rules[i].d, options: { fontSize: 10.5, color: C.text2 } },
      ], { x: rx + 0.95, y: yy - 0.04, w: rw - 1.2, h: 1.1, fontSize: 13, color: C.text1, paraSpaceAfter: 3 });
    }

    ui.callout(s, "A conflict of interest is a set of circumstances that creates a risk that judgement about a primary interest will be unduly influenced by a secondary interest (Institute of Medicine, 2009): a risk, not an accusation. Test everything I say by whether a conflict would be reasonably perceived (University of Cambridge policy).", { y: 6.2, h: 0.58, fontSize: 11, bold: false });
  }

  // ------------------------------------------------------------------ op-vote
  {
    const s = ui.newSlide("DARK", SECTION, { id: "op-vote", kicker: "OPENING VOTE", title: "Would you let a patient use it?", core: true });
    text(s, "Three facts about one device (not named yet)", { x: M, y: 1.7, w: 6, h: 0.28, fontSize: 12, bold: true, color: C.accent6 });
    await ui.factRows(s, [
      { icon: "LuCpu", text: "A working prototype" },
      { icon: "LuDatabase", text: "Promising results on public datasets" },
      { icon: "LuFileCheck", text: "A test licence granted" },
    ], { y: 2.15, rowH: 1.15, fontSize: 19 });

    text(s, "Three options (one, two or three fingers)", { x: 7.0, y: 1.7, w: 5.73, h: 0.28, fontSize: 12, bold: true, color: C.accent6 });
    ui.optionCards(s, [
      { key: "1", label: "Routine care", sub: "Suitable for a clinician to recommend to patients now" },
      { key: "2", label: "Research study", sub: "Suitable for a study with ethics approval and consent" },
      { key: "3", label: "Not yet", sub: "I need more information before either" },
    ], { y: 2.1, h: 1.12, gap: 0.22 });

    // Tally boxes for the flipchart split.
    text(s, "Record the split on the flipchart", { x: M, y: 5.4, w: 6, h: 0.28, fontSize: 12, bold: true, color: C.accent6 });
    ["1 = ____", "2 = ____", "3 = ____"].forEach((t, i) => ui.pill(s, M + i * 2.0, 5.75, 1.8, t, { color: C.accent6, fill: false, dark: true, dash: true, h: 0.4, fontSize: 13 }));

    ui.callout(s, "Hold up one, two or three fingers, then tell your neighbour why. We vote again at the end with exactly the same options.", { y: 6.3, h: 0.48, dark: true, fontSize: 12.5 });
  }

  // ------------------------------------------------------------------ op-lenses
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "op-lenses", kicker: "LENSES", title: "Three teaching traditions, one Indian patient", core: true });
    await ui.cardGrid(s, [
      { icon: "LuLightbulb", title: "Stanford Biodesign", badge: "NEED", color: C.accent2, body: [
        "Identify → Invent → Implement: start from a validated need, not a technology",
        "Need Statements (Student Guide, 2022): solution-neutral, screened before inventing",
        "Principled Decision-Making (2022): write the team's ethical principles early",
        "India: Stanford-India Biodesign since 2007 (32 fellows, 14 technologies, 13 companies), now the School of International Biodesign at AIIMS; an AIIMS emergency-department study filtered 100 needs to 10 (Chaturvedi 2015)",
      ] },
      { icon: "LuScale", title: "Harvard research ethics", badge: "PEOPLE", color: C.accent3, body: [
        "HMS Center for Bioethics: case-based teaching of research ethics",
        "MRCT Center (Brigham and Harvard): Diversity guidance (2020), Accessibility by Design toolkit (2023), plain-language glossary, post-trial access for devices (2025)",
        "Petrie-Flom Center: Diagnosing in the Home; ethics of remote device monitoring (Cohen, Gerke & Kramer 2020)",
        "HMS conflict-of-interest policy (2010): disclose, then manage",
      ] },
      { icon: "LuPencilRuler", title: "Cambridge design and translation", badge: "ACCESS · SAFETY", color: C.accent4, body: [
        "Engineering Design Centre Inclusive Design Toolkit and Exclusion Calculator: who is excluded by a product's demands?",
        "Engineering Better Care (2017; working group chaired by Prof John Clarkson): people, systems, design and risk, with a 'Sustain' phase",
        "Institute for Biomedical Innovation (announced January 2026): from lab prototype to trial-ready device",
        "Cambridge Judge CCHLE: making proven solutions affordable",
      ] },
    ], { y: 1.72, h: 3.05, titleSize: 14, bodySize: 10.5, iconD: 0.52 });
    text(s, "None of these institutions has evaluated or endorsed FoGO or SwaKnee. The Biodesign textbook is Stanford content published by Cambridge University Press.", { x: M, y: 4.85, w: W - 2 * M, h: 0.24, fontSize: 9.5, italic: true, color: C.accent5 });

    // India adaptation band
    const by = 5.18, bh = 1.6;
    ui.card(s, M, by, W - 2 * M, bh, { fill: C.background2, name: "India band" });
    s.addShape(S.RECTANGLE, { x: M, y: by + 0.2, w: 0.07, h: bh - 0.4, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "India band accent" });
    text(s, "Applied to Indian rules and Indian patients", { x: M + 0.3, y: by + 0.1, w: 8, h: 0.28, fontSize: 12.5, bold: true, color: C.accent1 });
    const band = [
      { icon: "LuGavel", color: C.accent4, t: "CDSCO · MDR-2017", d: "Permission: Rule 4 classes A–D; licences MD-5 / MD-9; test licence MD-13" },
      { icon: "LuScale", color: C.accent2, t: "ICMR 2017", d: "People: National Ethical Guidelines; ethics committees registered under NDCT Rules 2019" },
      { icon: "LuSiren", color: C.accent3, t: "MvPI · IPC", d: `Safety: adverse-event reporting since 6${NB}Jul${NB}2015; 174 monitoring centres` },
      { icon: "LuIndianRupee", color: C.accent1, t: "NPPA · DPCO 2013", d: "Access: ceiling prices on stents and knee implants (2017); trade-margin caps (2021)" },
      { icon: "LuRuler", color: C.accent5, t: "BIS", d: "Standards: Indian Standards; Essential Principles checklist (Class A self-certified)" },
      { icon: "LuLock", color: C.accent4, t: "DPDP Rules 2025", d: "Data: personal health data from apps and cloud; phased commencement" },
    ];
    const bw = (W - 2 * M - 0.5) / band.length;
    for (let i = 0; i < band.length; i++) {
      const bx = M + 0.3 + i * bw, b = band[i];
      await ui.iconDisc(s, b.icon, bx, by + 0.48, 0.4, { bg: b.color, bgTrans: 80, fg: HEX.dk2 });
      text(s, b.t, { x: bx + 0.48, y: by + 0.48, w: bw - 0.55, h: 0.4, fontSize: 10.5, bold: true, valign: "middle", color: C.text1 });
      text(s, b.d, { x: bx, y: by + 0.95, w: bw - 0.15, h: 0.62, fontSize: 9.5, color: C.text2 });
    }
  }

  // ------------------------------------------------------------------ op-patients
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "op-patients", kicker: "PATIENTS", title: "Two people we will follow", core: true });
    text(s, "Ramesh and Kamala are composites, not real patients, built from situations common in Odisha clinics. Every decision today is made for one of them: when you vote, vote for them.", { x: M, y: 1.6, w: W - 2 * M, h: 0.34, fontSize: 11.5, italic: true, color: C.text2 });

    async function persona(p) {
      const { x, y, w, h, color } = p;
      ui.card(s, x, y, w, h, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: `Persona ${p.name}` });
      s.addShape(S.RECTANGLE, { x, y: y + 0.3, w: 0.07, h: h - 0.6, fill: { color }, line: { type: "none" }, objectName: `Persona accent ${p.name}` });
      await ui.imageFrame(s, p.photo, { x: x + 0.3, y: y + 0.25, w: 2.0, h: 2.0, alt: p.alt, radius: 40 });
      const tx = x + 2.55, tw = w - 2.55 - 0.25;
      text(s, [
        { text: `${p.name}, ${p.age}`, options: { fontSize: 22, bold: true, breakLine: true } },
        { text: p.condition, options: { fontSize: 11, color: C.text2 } },
      ], { x: tx, y: y + 0.22, w: tw, h: 0.95, fontSize: 22, color: C.text1 });
      text(s, p.stat, { x: tx, y: y + 1.17, w: tw, h: 0.5, fontSize: 24, bold: true, color, valign: "middle" });
      text(s, [
        { text: p.statLabel, options: { bold: true, breakLine: true } },
        { text: p.statSub, options: { fontSize: 9.5, color: C.accent5 } },
      ], { x: tx, y: y + 1.68, w: tw, h: 0.62, fontSize: 10.5, color: C.text1 });
      for (let i = 0; i < p.facts.length; i++) {
        const yy = y + 2.48 + i * 0.42;
        await ui.iconDisc(s, p.facts[i].icon, x + 0.3, yy, 0.32, { bg: color, bgTrans: 85, fg: HEX.dk2 });
        text(s, p.facts[i].t, { x: x + 0.75, y: yy, w: w - 1.0, h: 0.32, fontSize: 11, valign: "middle", color: C.text1 });
      }
      const dy = y + h - 0.5;
      s.addShape(S.LINE, { x: x + 0.3, y: dy - 0.08, w: w - 0.55, h: 0, line: { color: "E3EAE8", width: 0.75 }, objectName: "Persona rule" });
      text(s, [{ text: "Device in this story: ", options: { color: C.accent5 } }, { text: p.device, options: { bold: true } }], { x: x + 0.3, y: dy, w: w - 2.5, h: 0.3, fontSize: 10.5, valign: "middle", color: C.text1 });
      ui.pill(s, x + w - 2.15, dy, 1.9, p.deviceStatus, { color, fill: false, h: 0.28, fontSize: 9.5 });
    }

    const cw = (W - 2 * M - 0.25) / 2;
    await persona({
      x: M, y: 2.05, w: cw, h: 4.7, color: C.accent1, name: "Ramesh", age: 71, photo: img("fogo_ankle_in_use.jpg"), alt: "FoGO ankle module worn by a volunteer, legs only",
      condition: "Parkinson's disease with freezing of gait",
      stat: `≈7.7${NB}lakh`, statLabel: "people living with Parkinson's disease in India, 2019",
      statSub: "India State-Level Disease Burden Initiative (GBD 2019), as cited in the FoGO project material",
      facts: [
        { icon: "LuClock", t: "Parkinson's disease for eight years" },
        { icon: "LuFootprints", t: "Freezes in doorways and when turning" },
        { icon: "LuTriangleAlert", t: "Has fallen twice this year" },
        { icon: "LuSmartphone", t: "Lives with his daughter, who works days and lends him her smartphone" },
      ],
      device: "FoGO, freezing-of-gait wearable", deviceStatus: "Alpha prototype · MD-13",
    });
    await persona({
      x: M + cw + 0.25, y: 2.05, w: cw, h: 4.7, color: C.accent4, name: "Kamala", age: 64, photo: img("swaknee_controller_applicator.jpg"), alt: "SwaKnee controller and knee applicator",
      condition: "Knee osteoarthritis in both knees",
      stat: "28.7%", statLabel: `knee osteoarthritis in a five-site community survey (n${NB}=${NB}5,000)`,
      statSub: "Pal et al., Indian J Orthop 2016 (one study, not national)",
      facts: [
        { icon: "LuBone", t: "Osteoarthritis in both knees" },
        { icon: "LuMapPin", t: `Lives 30${NB}km from the clinic at the district hospital` },
        { icon: "LuBus", t: "Travels by shared auto; someone must accompany her" },
        { icon: "LuWallet", t: "Household pays out of pocket and loses wages on clinic days" },
      ],
      device: "SwaKnee, PEMF knee system", deviceStatus: "Product · 45-min daily sessions",
    });
  }

  // ------------------------------------------------------------------ op-journey
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "op-journey", kicker: "THE JOURNEY", title: "Every stage answers a patient question", core: true });
    ui.tracker(s, -1, false);
    const stages = [
      { name: "Need", q: "“Will it help me?”", icon: "LuSearch", color: C.accent1, who: "Clinic · SIB at AIIMS", detail: "Observe care, write a solution-neutral need, state the intended use and the claim. The School of International Biodesign (AIIMS, IIT Delhi) teaches the method in India." },
      { name: "Evidence", q: "“Is there proof, for people like me?”", icon: "LuFlaskConical", color: C.accent4, who: "CDSCO · CTRI", detail: "Clinical investigation permission MD-22 → MD-23 (Seventh Schedule documents); prospective CTRI registration; ISO 14155 good clinical practice." },
      { name: "People", q: "“Can I freely say no?”", icon: "LuUsers", color: C.accent2, who: "Ethics committee · ICMR", detail: "Ethics committee registered under the NDCT Rules 2019; ICMR 2017 guidelines on consent (s.5), vulnerability (s.6) and device trials (s.7.7); interests disclosed." },
      { name: "Permission", q: "“Is it allowed for this use?”", icon: "LuFileCheck", color: C.accent4, who: "CDSCO · State licensing authority", detail: "Manufacturing licence MD-5 (Class A/B, State) or MD-9 (Class C/D, Central); test licence MD-13 for prototypes; import licence MD-15 for any class." },
      { name: "Access", q: "“Can I afford it and keep using it?”", icon: "LuWallet", color: C.accent1, who: "NPPA · families", detail: `DPCO 2013 ceiling prices: coronary stents (Feb 2017), knee implants (Aug 2017, cap continued to 15${NB}Nov${NB}2026); most outpatient devices are paid for out of pocket.` },
      { name: "Safety", q: "“Who answers if it fails?”", icon: "LuShieldCheck", color: C.accent3, who: "MvPI at IPC · CDSCO", detail: `Adverse-event reporting since 6${NB}Jul${NB}2015 through 174 monitoring centres; CDSCO alerts, recalls and licence cancellation (DePuy ASR hip, 2013).` },
    ];
    const cw = (W - 2 * M) / stages.length, ly = 3.1, d = 0.78;
    s.addShape(S.LINE, { x: M + cw / 2, y: ly, w: cw * (stages.length - 1), h: 0, line: { color: "C9D6D3", width: 2.5 }, objectName: "Journey line" });
    for (let i = 0; i < stages.length; i++) {
      const st = stages[i], cx = M + i * cw + cw / 2;
      text(s, st.name, { x: cx - cw / 2, y: 1.72, w: cw, h: 0.36, fontSize: 15, bold: true, align: "center", color: st.color });
      text(s, st.q, { x: cx - cw / 2 + 0.08, y: 2.08, w: cw - 0.16, h: 0.56, fontSize: 11.5, italic: true, align: "center", color: C.text2 });
      await ui.iconDisc(s, st.icon, cx - d / 2, ly - d / 2, d, { bg: st.color, fg: HEX.lt1, line: { color: C.background1, width: 2 } });
      ui.numBadge(s, cx - d / 2 - 0.06, ly - d / 2 - 0.06, 0.3, i + 1, { fontSize: 10 });
      ui.pill(s, cx - 0.93, 3.8, 1.86, st.who, { color: st.color, fill: true, h: 0.32, fontSize: 9.5 });
      text(s, st.detail, { x: cx - 0.93, y: 4.22, w: 1.86, h: 1.6, fontSize: 10.5, color: C.text1, align: "left" });
    }
    text(s, "ANSWERED IN INDIA BY", { x: M, y: 3.54, w: W - 2 * M, h: 0.22, fontSize: 9, bold: true, align: "center", color: C.accent5, charSpacing: 2 });
    ui.callout(s, "The six dots at the top of later slides show which stage we are in. Stages are not strictly sequential: Engineering Better Care's 'Sustain' phase means access and safety are designed in from the start, not added after launch.", { y: 6.0, h: 0.62, fontSize: 12, bold: false });
  }
}

module.exports = { SECTION, build };
