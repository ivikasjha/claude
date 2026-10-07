// Section "Need and evidence": ev-div … ev-subgroups (storyboard_v2.json, section "evidence").
// Facts come from facts/cdsco-guidance.md, facts/prior-intl-evidence.md, facts/india-class-licence.md, refs.js,
// storyboard_v2.json and the legacy v1 notes (notes/_legacy.js 7–14, 27).
const SECTION = "Need and evidence";

async function build(ui, ctx) {
  const { C, S, M, W, HEX, text, img, vid, dataUri } = ui;

  // ---- small local helpers (composed from ui primitives; no new components) ----
  // Icon + text row (used on evidence panels).
  async function iconRow(s, icon, x, y, w, t, { d = 0.34, bg = C.accent1, fg = HEX.lt1, fontSize = 11, color = C.text1, h = 0.5, bgTrans = 0 } = {}) {
    await ui.iconDisc(s, icon, x, y + (h - d) / 2, d, { bg, fg, bgTrans });
    text(s, t, { x: x + d + 0.14, y, w: w - d - 0.14, h, fontSize, color, valign: "middle" });
  }
  // Horizontal rule.
  function hline(s, x, y, w, color = "D5DFDD", width = 0.75) {
    s.addShape(S.LINE, { x, y, w, h: 0, line: { color, width }, objectName: "Rule" });
  }

  // =====================================================================================
  // ev-div — section divider
  // =====================================================================================
  await ui.sectionDivider(SECTION, {
    id: "ev-div", num: 1, kicker: "PART 1 · NEED AND EVIDENCE",
    title: "What are we promising, and what has been shown?",
    blurb: "Two devices, two patients. First the wording of the need and the claim; then what each prototype has demonstrated, reported, planned or not yet established.",
    items: [
      { icon: "LuTarget", text: "A solution-neutral need, and a claim ladder that sets the evidence bar" },
      { icon: "LuScanLine", text: "Is it a medical device in India? The intended purpose decides, not the technology" },
      { icon: "LuChartBar", text: "FoGO and SwaKnee on the evidence ladder, with a decision to vote on" },
    ],
    photo: { file: img("fogo_system.jpg"), caption: "FoGO alpha prototype (V3, 2025): phone app, chest module on an adhesive patch, ankle module" },
  });

  // =====================================================================================
  // nd-claim — Wording sets the evidence bar (legacy 7)
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "nd-claim", kicker: "NEED · WORDING", title: "Wording sets the evidence bar", stage: 0, core: true });

    // Left: Stanford need statement card
    ui.card(s, M, 1.75, 4.9, 2.9, { fill: C.background2, name: "Need statement card" });
    await ui.iconDisc(s, "LuTarget", M + 0.2, 1.95, 0.5, { bg: C.accent1 });
    text(s, "Stanford Biodesign need statement", { x: M + 0.85, y: 1.95, w: 3.9, h: 0.5, fontSize: 14, bold: true, valign: "middle" });
    text(s, [
      { text: "A way to ", options: { color: C.text2 } },
      { text: "[address the problem]", options: { bold: true, color: C.accent4 } },
      { text: " in ", options: { color: C.text2 } },
      { text: "[a specific population]", options: { bold: true, color: C.accent1 } },
      { text: " in order to ", options: { color: C.text2 } },
      { text: "[achieve a desired outcome]", options: { bold: true, color: C.accent2 } },
    ], { x: M + 0.2, y: 2.55, w: 4.5, h: 0.7, fontSize: 12.5 });
    text(s, [
      { text: "Ramesh: ", options: { bold: true } },
      { text: "a way to " },
      { text: "reduce freezing-related immobility and falls", options: { bold: true, color: C.accent4 } },
      { text: " in " },
      { text: "people with Parkinson's disease living at home", options: { bold: true, color: C.accent1 } },
      { text: ", in order to " },
      { text: "preserve safe, independent walking", options: { bold: true, color: C.accent2 } },
      { text: "." },
    ], { x: M + 0.2, y: 3.3, w: 4.5, h: 0.95, fontSize: 11.5, color: C.text1 });
    text(s, "No sensor, no vibration, no app: the need stays solution-neutral.", { x: M + 0.2, y: 4.25, w: 4.5, h: 0.3, fontSize: 10.5, italic: true, color: C.accent5 });

    ui.callout(s, "Your turn (60 s): rewrite Kamala's need without naming any device.", { x: M, y: 4.85, w: 4.9, h: 0.6, color: C.accent2, fontSize: 12 });

    ui.card(s, M, 5.65, 4.9, 1.05, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, name: "Why wording matters" });
    await ui.iconDisc(s, "LuGavel", M + 0.18, 5.83, 0.4, { bg: C.accent4, bgTrans: 85, fg: HEX.dk2 });
    text(s, [
      { text: "Why the words matter. ", options: { bold: true } },
      { text: "Under MDR-2017 the intended use and the claims decide whether a product is a medical device and which class (A–D) it falls in. CDSCO's software guidance (21 Jul 2026) grades risk by how far the output drives clinical decisions and how serious the condition is." },
    ], { x: M + 0.7, y: 5.72, w: 4.05, h: 0.95, fontSize: 9.5, color: C.text2, valign: "middle" });

    // Right: four-rung claim ladder
    const lx = 5.8, lw = 6.93, cols = 4, gap = 0.1, base = 6.4;
    const cw = (lw - gap * (cols - 1)) / cols;
    const rungs = [
      { name: "INFORMATION", claim: "“Shows your walking patterns”", color: C.accent6, fg: C.text2, sub: C.text2,
        evidence: ["Bench accuracy", "Usability"],
        permission: ["No medical purpose: outside MDR-2017", "Real purpose decides, not the label"] },
      { name: "MONITORING", claim: "“Tracks your gait for your neurologist”", color: C.accent1, fg: C.background1, sub: C.background1,
        evidence: ["Analytical validation of the measure", "Software V&V, cybersecurity", "Usability in Indian clinics"],
        permission: ["Medical purpose: a device", "SaMD class by MDSW guidance 2026", "Licence MD-5 (State) or MD-9 (Central)"] },
      { name: "DETECTION", claim: "“Detects freezing of gait in Parkinson's”", color: C.accent4, fg: C.background1, sub: C.background1,
        evidence: ["Sensitivity, specificity vs video-labelled freezes", "False alarms per hour, latency", "Homes, turns, doorways, walking aids"],
        permission: ["Test units: MD-12 → MD-13", "Clinical investigation: MD-22 → MD-23", "Registered ethics committee, CTRI", "Then the licence"] },
      { name: "TREATMENT", claim: "“Reduces freezing and falls”", color: C.accent3, fg: C.background1, sub: C.background1,
        evidence: ["Prospective controlled trial: falls, walking, confidence", "Durability and safety over time", "Fair performance across groups"],
        permission: ["All of the detection rung", "Claims control: UCMPMD 2024, DMRA 1954, ASCI", "Label per Rule 44; vigilance after launch"] },
    ];
    rungs.forEach((r, i) => {
      const h = 2.95 + i * 0.58, x = lx + i * (cw + gap), y = base - h;
      s.addShape(S.RECTANGLE, { x, y, w: cw, h, fill: { color: r.color }, line: { type: "none" }, objectName: `Claim rung ${r.name}` });
      text(s, r.name, { x: x + 0.12, y: y + 0.1, w: cw - 0.24, h: 0.25, fontSize: 9.5, bold: true, color: r.fg, charSpacing: 1 });
      text(s, r.claim, { x: x + 0.12, y: y + 0.36, w: cw - 0.24, h: 0.62, fontSize: 11.5, bold: true, italic: true, color: r.fg });
      const runs = [{ text: "Evidence needed", options: { bold: true, breakLine: true, color: r.fg } }];
      r.evidence.forEach((e) => runs.push({ text: e, options: { bullet: { indent: 8 }, breakLine: true, color: r.sub } }));
      runs.push({ text: "Permission in India", options: { bold: true, breakLine: true, color: r.fg } });
      r.permission.forEach((p, j) => runs.push({ text: p, options: { bullet: { indent: 8 }, breakLine: j < r.permission.length - 1, color: r.sub } }));
      text(s, runs, { x: x + 0.1, y: y + 1.02, w: cw - 0.2, h: h - 1.1, fontSize: 9.5, paraSpaceAfter: 2 });
    });
    s.addShape(S.RIGHT_ARROW, { x: lx, y: base + 0.1, w: lw, h: 0.28, fill: { color: "D5DFDD" }, line: { type: "none" }, objectName: "Claim arrow" });
    text(s, "Stronger claim   →   more evidence, more permissions, closer scrutiny", { x: lx + 0.2, y: base + 0.1, w: lw - 0.6, h: 0.28, fontSize: 10.5, bold: true, color: C.text1, valign: "middle" });
  }

  // =====================================================================================
  // nd-isdevice — Is it a medical device in India?
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "nd-isdevice", kicker: "NEED · IS IT A DEVICE?", title: "Is it a medical device in India?", stage: 0 });

    const qcard = async (x, y, w, h, icon, title, body, { fill = C.accent4 } = {}) => {
      s.addShape(S.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" }, objectName: `Question ${title}` });
      await ui.iconDisc(s, icon, x + 0.15, y + 0.15, 0.42, { bg: C.background1, bgTrans: 80, fg: HEX.lt1 });
      text(s, title, { x: x + 0.68, y: y + 0.15, w: w - 0.8, h: 0.42, fontSize: 12, bold: true, color: C.background1, valign: "middle" });
      text(s, body, { x: x + 0.15, y: y + 0.65, w: w - 0.3, h: h - 0.75, fontSize: 9.5, color: C.background1, paraSpaceAfter: 2 });
    };

    await qcard(M, 1.75, 2.55, 2.55, "LuCircleHelp", "1 · What is it for?", [
      { text: "D&C Act 1940, s.3(b)(iv): devices intended for use in human beings for the diagnosis, treatment, mitigation or prevention of disease or disorder.", options: { breakLine: true } },
      { text: "All such devices were notified on 11 Feb 2020 (S.O. 648(E)) and regulated from 1 Apr 2020.", options: {} },
    ]);
    // Yes branch
    text(s, "Medical purpose", { x: 3.15, y: 2.05, w: 0.8, h: 0.4, fontSize: 9, bold: true, color: C.accent1, align: "center", valign: "bottom" });
    ui.arrow(s, 3.2, 2.5, 0.7, C.accent1, 2);
    // No branch
    text(s, "No medical purpose", { x: 3.15, y: 3.52, w: 0.8, h: 0.4, fontSize: 9, bold: true, color: C.accent5, align: "center", valign: "bottom" });
    ui.arrow(s, 3.2, 4.0, 0.7, C.accent5, 2);

    await qcard(3.95, 1.75, 2.75, 1.65, "LuCpu", "2 · Software doing medical work?", [
      { text: "SaMD or software in a device: CDSCO guidance CDSCO/MD/GD/MDSW/01/2026 (21 Jul 2026). Class follows the medical purpose, how far the output drives clinical decisions, and the severity of the condition. AI and IoT included.", options: {} },
    ]);
    ui.arrow(s, 6.75, 2.5, 0.5, C.accent1, 2);
    await qcard(7.3, 1.75, 2.75, 1.65, "LuLayers", "3 · Which risk class?", [
      { text: "Rule 4 and First Schedule Part I: non-invasive, invasive (orifice or surgical; transient, short- or long-term), active (energy, diagnosis, substances) and special rules → Class A (low) to D (high).", options: {} },
    ]);
    ui.arrow(s, 10.1, 2.5, 0.45, C.accent1, 2);
    await qcard(10.6, 1.75, 2.13, 1.65, "LuFileCheck", "Regulated device", [
      { text: "Class A/B: State licence MD-5 (Class A non-sterile non-measuring: registration only).", options: { breakLine: true } },
      { text: "Class C/D: Central licence MD-9. Import: MD-15.", options: {} },
    ], { fill: C.accent1 });

    // Outside MDR bar
    s.addShape(S.ROUNDED_RECTANGLE, { x: 3.95, y: 3.68, w: 8.78, h: 0.62, rectRadius: 0.1, fill: { color: C.background2 }, line: { color: C.accent5, width: 1, dashType: "dash" }, objectName: "Outside MDR" });
    await ui.iconDisc(s, "LuCircleOff", 4.1, 3.82, 0.34, { bg: C.accent5 });
    text(s, [
      { text: "Outside MDR-2017 ", options: { bold: true } },
      { text: "when no medical purpose is claimed (fitness, wellness, administration). The real purpose and the claims decide, not the label or the technology: calling a product “wellness” does not remove obligations if its purpose is medical (Simon, Shachar & Cohen, JAMA 2022)." },
    ], { x: 4.55, y: 3.68, w: 8.1, h: 0.62, fontSize: 9.5, color: C.text1, valign: "middle" });

    // Worked examples
    await ui.cardGrid(s, [
      { icon: "LuWatch", title: "FoGO", badge: "Device", badgeColor: C.accent1, color: C.accent1, body: ["Claim: detects freezing of gait and cues the user", "Software drives the cue: SaMD rules apply", "Class: developer proposes B; say “likely B or C” until CDSCO confirms"] },
      { icon: "LuMagnet", title: "SwaKnee", badge: "Device", badgeColor: C.accent1, color: C.accent1, body: ["Claim: pulsed electromagnetic field for knee osteoarthritis pain", "Active therapeutic device delivering energy", "Class: likely B under the First Schedule; verify on CDSCO lists"] },
      { icon: "LuActivity", title: "Fitness band", badge: "Not a device", badgeColor: C.accent5, color: C.accent5, body: ["Claim: counts steps, “stay active”", "No disease named, no diagnosis", "Adds “detects arrhythmia”? Then it is a device"] },
      { icon: "LuCalendarDays", title: "Hospital app", badge: "Not a device", badgeColor: C.accent5, color: C.accent5, body: ["Appointments, queues, billing", "No medical purpose in the output", "Adds triage or dosing advice? Re-check"] },
    ], { y: 4.55, h: 2.2, cols: 4, gap: 0.18, titleSize: 12, bodySize: 9.5, iconD: 0.44 });
  }

  // =====================================================================================
  // ev-fogo-video — What did the prototype show? (legacy 8)
  // =====================================================================================
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ev-fogo-video", kicker: "EVIDENCE · FoGO", title: "What did the prototype show?", stage: 1, core: true });
    const vw = 5.3, vh = vw / (1384 / 1080);
    s.addMedia({ type: "video", path: vid("fogo_prototype.mp4"), cover: "data:" + dataUri(img("fogo_video_poster.png")), x: M, y: 1.75, w: vw, h: vh, objectName: "FoGO prototype clip (12 s)" });
    text(s, "12 s staged demonstration · volunteer · simulated freeze · face obscured · not clinical footage", { x: M, y: 1.75 + vh + 0.08, w: vw, h: 0.3, fontSize: 10, italic: true, color: C.accent6 });
    ui.callout(s, "Watch, then: what did you see? What did you infer?", { x: M, y: 6.3, w: vw, h: 0.5, dark: true, color: C.accent2, fontSize: 12 });

    // System diagram
    const nx = [6.25, 8.62, 10.99], nw = 1.74, ny = 1.75, nh = 1.45;
    const nodes = [
      { icon: "LuWatch", title: "Ankle module", body: "6-axis motion sensor streams at 100 Hz" },
      { icon: "LuSmartphone", title: "Phone app", body: "Detection model; 2-of-3 debounce confirms a freeze" },
      { icon: "LuVibrate", title: "Chest module", body: "Vibrotactile cue on an adhesive patch" },
    ];
    for (let i = 0; i < 3; i++) {
      const n = nodes[i], x = nx[i];
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: ny, w: nw, h: nh, rectRadius: 0.12, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 1 }, objectName: `Node ${n.title}` });
      await ui.iconDisc(s, n.icon, x + 0.15, ny + 0.14, 0.42, { bg: C.accent6, fg: HEX.dk2 });
      text(s, n.title, { x: x + 0.65, y: ny + 0.14, w: nw - 0.75, h: 0.42, fontSize: 11.5, bold: true, color: C.background1, valign: "middle" });
      text(s, n.body, { x: x + 0.15, y: ny + 0.64, w: nw - 0.3, h: nh - 0.7, fontSize: 9.5, color: C.accent6 });
      if (i < 2) {
        ui.arrow(s, x + nw + 0.06, ny + 0.72, 0.5, C.accent2, 2);
        text(s, i === 0 ? "Bluetooth" : "≈255 ms", { x: x + nw, y: ny + 0.3, w: 0.63, h: 0.36, fontSize: 9, bold: true, color: C.accent2, align: "center", valign: "bottom" });
      }
    }
    text(s, "Detection-to-cue latency ≈255 ms and 100 Hz sampling are project-reported bench values, not clinical measurements.", { x: 6.25, y: 3.26, w: 6.48, h: 0.3, fontSize: 9, italic: true, color: C.accent6 });

    // Seen vs not yet shown
    const colX = [6.25, 9.63], colW = 3.1;
    ui.statusChip(s, colX[0], 3.65, "demonstrated", { w: 2.0, label: "Seen (demonstrated)", dark: true });
    ui.statusChip(s, colX[1], 3.65, "notyet", { w: 2.0, label: "Not yet shown", dark: true });
    const seen = ["Stop sensed by the ankle module", "App thresholds crossed; flagged as a freeze", "Chest module vibrates on cue"];
    const notyet = ["Real freezes in people with Parkinson's", "A freeze told from a voluntary stop or a doorway pause", "Many users, homes, turns, walking aids", "Tolerability of repeated cues", "Fewer falls or more walking"];
    for (let i = 0; i < seen.length; i++) await iconRow(s, "LuCheck", colX[0], 4.12 + i * 0.52, colW, seen[i], { d: 0.3, bg: C.accent1, color: C.background1, fontSize: 10.5 });
    for (let i = 0; i < notyet.length; i++) await iconRow(s, "LuX", colX[1], 4.12 + i * 0.52, colW, notyet[i], { d: 0.3, bg: C.accent3, color: C.background1, fontSize: 10.5 });
  }

  // =====================================================================================
  // ev-fogo-iterations — Three iterations, three kinds of proof
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ev-fogo-iterations", kicker: "EVIDENCE · FoGO", title: "Three iterations, three kinds of proof", stage: 1 });
    const pw = 2.88, ph = 2.1, gap = 0.2, py = 1.75;
    const photos = [
      { file: "fogo_v1.jpg", cap: "V1 · Jan 2024 · boxed electronics, wired motor", status: "demonstrated", label: "Demonstrated", what: "Bench function: sensing electronics and a vibration motor working from a box" },
      { file: "fogo_v2.jpg", cap: "V2 · 2024–25 · two wearable modules", status: "demonstrated", label: "Demonstrated", what: "Wearable form: ankle sensor case and a small chest vibrotactile unit" },
      { file: "fogo_v3.jpg", cap: "V3 · Jun 2025 · alpha system with app", status: "demonstrated", label: "Demonstrated", what: "Integrated system: ankle strap, adhesive chest patch, phone app; the staged demo" },
      { file: "fogo_emc_test.jpg", cap: "EMC pre-compliance · Jul 2026", status: "reported", label: "Pre-compliance, not certified", what: "IEC 60601-1-2 pre-compliance run; formal testing for the dossier still to come" },
    ];
    for (let i = 0; i < photos.length; i++) {
      const p = photos[i], x = M + i * (pw + gap);
      await ui.imageFrame(s, img(p.file), { x, y: py, w: pw, h: ph, caption: p.cap, alt: p.cap });
      ui.statusChip(s, x, 4.3, p.status, { w: 2.0, label: p.label });
      text(s, p.what, { x, y: 4.72, w: pw, h: 0.5, fontSize: 10, color: C.text2 });
    }
    text(s, "None of these is clinical evidence: each prototype answered an engineering question. The MD-13 test licence allows 25 units for investigation, test and demonstration; they cannot be sold.", { x: M, y: 5.22, w: 12.13, h: 0.28, fontSize: 10, italic: true, color: C.accent5 });

    ui.timeline(s, [
      { date: "Jan 2024", label: "V1 bench prototype", color: C.accent1 },
      { date: "Jun 2025", label: "V3 alpha system", color: C.accent1 },
      { date: "Jul 2026", label: "EMC pre-compliance (IEC 60601-1-2)", color: C.accent1 },
      { date: "10 Aug 2026", label: "Form MD-13 test licence, 25 units", color: C.accent4, big: true },
      { date: "Planned", label: "Clinical proof-of-concept (MD-22 → MD-23, ethics, CTRI)", color: C.accent2 },
    ], { y: 6.5, alternate: false, labelH: 0.62, inset: 0.95, fontSize: 10.5 });
  }

  // =====================================================================================
  // ev-ladder — FoGO has climbed two rungs, not five (legacy 9)
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ev-ladder", kicker: "EVIDENCE · FoGO", title: "FoGO has climbed two rungs, not five", stage: 1, core: true });
    const rungs = [
      { k: 5, q: "Safe and fair over time?", d: "Long-term safety; fair performance across users, aids and homes", st: "notyet" },
      { k: 4, q: "Helps in daily life?", d: "Fewer falls, more walking, confidence. No cueing trial has yet shown fewer falls", st: "notyet" },
      { k: 3, q: "Detects real freezes in people?", d: "Prospective proof-of-concept with AIIMS Bhubaneswar advisers; BIRAC BIG proposal under review; not yet funded, approved or permitted", st: "planned" },
      { k: 2, q: "Detects on recorded data?", d: "F1 0.83–0.85 subject-wise on Daphnet, CuPiD and Turning-in-place; 0.74–0.80 on an unseen dataset; project-reported, not peer-reviewed", st: "reported" },
      { k: 1, q: "Works as a system?", d: "Staged demo: a volunteer's simulated freeze sensed, flagged and cued; bench study of five cue sites (chest most sensitive)", st: "demonstrated" },
    ];
    const fillFor = { demonstrated: { color: C.accent1, t: 0 }, reported: { color: C.accent1, t: 55 }, planned: { color: C.accent2, t: 45 }, notyet: { color: C.accent3, t: 70 } };
    const rowH = 0.78, rowGap = 0.04;
    rungs.forEach((r, i) => {
      const y = 1.75 + i * (rowH + rowGap), bw = 0.75 + (r.k - 1) * 0.42, f = fillFor[r.st];
      s.addShape(S.RECTANGLE, { x: M, y, w: bw, h: rowH, fill: { color: f.color, transparency: f.t }, line: { type: "none" }, objectName: `Rung ${r.k}` });
      ui.numBadge(s, M + 0.12, y + (rowH - 0.5) / 2, 0.5, r.k, { bg: r.st === "demonstrated" ? C.background1 : C.text1, fg: r.st === "demonstrated" ? C.accent1 : C.background1, fontSize: 15 });
      const tx = M + bw + 0.15;
      text(s, [{ text: r.q, options: { bold: true, breakLine: true } }, { text: r.d, options: { fontSize: 9.5, color: C.text2 } }], { x: tx, y: y + 0.02, w: 5.2 - tx, h: rowH - 0.04, fontSize: 12, color: C.text1 });
      ui.statusChip(s, 5.3, y + (rowH - 0.34) / 2, r.st, { w: 1.85 });
    });
    s.addShape(S.RIGHT_ARROW, { x: M, y: 5.95, w: 6.55, h: 0.26, fill: { color: "D5DFDD" }, line: { type: "none" }, objectName: "Ladder arrow" });
    text(s, "Pre-IDEAL (bench, datasets)   →   IDEAL 1–2a (first in humans)   →   2b–4 (comparison, long-term)", { x: M + 0.15, y: 5.95, w: 6.2, h: 0.26, fontSize: 9.5, bold: true, color: C.text1, valign: "middle" });

    ui.barChart(s, {
      categories: ["Daphnet", "CuPiD", "Turning-in-place", "Cross-dataset, low", "Cross-dataset, high"],
      series: [{ name: "F1 (subject-wise)", values: [0.85, 0.83, 0.84, 0.74, 0.80] }],
      x: 7.5, y: 1.72, w: 5.23, h: 2.55, colors: [HEX.accent1, HEX.accent1, HEX.accent1, HEX.accent4, HEX.accent4], max: 1, valueFmt: "0.00", labelSize: 9,
      title: "F1 score by public dataset (project-reported; indigo = unseen dataset)",
    });
    await ui.statTiles(s, [
      { value: "0.15–0.18", label: "False alarms per minute", sub: "Subject-wise; ≈0.21–0.27/min cross-dataset (project chart)", icon: "LuBellRing", color: C.accent3, valueSize: 24 },
      { value: "n = 10", label: "Daphnet benchmark", sub: "Lab, 8 froze, 237 video-labelled events", icon: "LuDatabase", color: C.accent4, valueSize: 24 },
    ], { x: 7.5, y: 4.4, w: 5.23, h: 1.45, gap: 0.18 });
    ui.callout(s, "The rungs are questions, not a compulsory sequence. Which rung matters most before Ramesh uses it at home?", { y: 6.05, h: 0.6 });
  }

  // =====================================================================================
  // ev-decision1 — Would you proceed? 1/5 (legacy 10)
  // =====================================================================================
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ev-decision1", kicker: "WOULD YOU PROCEED? 1/5", title: "Home pilot for Ramesh next month?", stage: 1, core: true });
    text(s, "A hypothetical scenario built on real FoGO facts", { x: M, y: 1.75, w: 5.9, h: 0.3, fontSize: 10.5, italic: true, color: C.accent6 });
    await ui.factRows(s, [
      { icon: "LuDatabase", text: "F1 0.83–0.85 on public data" },
      { icon: "LuHouse", text: "Ten users, alone at home" },
      { icon: "LuUser", text: "Ramesh fell twice; asks to join" },
    ]);
    ui.optionCards(s, [
      { key: "A", label: "Proceed" },
      { key: "B", label: "Proceed with conditions", sub: "Name them" },
      { key: "C", label: "Not yet" },
    ]);
    ui.callout(s, "Vote A, B or C. Then pairs, 60 seconds: if B, which two conditions?", { x: M, y: 6.15, w: 5.9, h: 0.55, dark: true, color: C.accent2, fontSize: 12 });
  }

  // =====================================================================================
  // ev-risk — Rank failures by harm and likelihood (legacy 11)
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ev-risk", kicker: "EVIDENCE · RISK", title: "Rank failures by harm and likelihood", stage: 1, core: true });
    const gx = 1.4, gy = 1.85, cw = 1.85, ch = 1.1;
    const sev = ["Critical", "Serious", "Minor"], lik = ["Rare", "Possible", "Frequent"];
    const level = (r, c) => { const sc = (3 - r) + (c + 1); return sc >= 5 ? "high" : sc === 4 ? "med" : "low"; };
    const lcol = { high: "C2453A", med: "E0962A", low: "3C9D6A" }, ltr = { high: 70, med: 72, low: 80 };
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const lv = level(r, c);
      s.addShape(S.RECTANGLE, { x: gx + c * cw, y: gy + r * ch, w: cw, h: ch, fill: { color: lcol[lv], transparency: ltr[lv] }, line: { color: "FFFFFF", width: 1.5 }, objectName: `Risk cell ${sev[r]} ${lik[c]}` });
    }
    for (let r = 0; r < 3; r++) text(s, sev[r], { x: M, y: gy + r * ch, w: 0.75, h: ch, fontSize: 10.5, bold: true, align: "right", valign: "middle", color: C.text2 });
    for (let c = 0; c < 3; c++) text(s, lik[c], { x: gx + c * cw, y: gy + 3 * ch + 0.04, w: cw, h: 0.28, fontSize: 10.5, bold: true, align: "center", color: C.text2 });
    text(s, "SEVERITY ↑", { x: M, y: 1.6, w: 0.8, h: 0.22, fontSize: 9, bold: true, color: C.accent5, align: "right" });
    text(s, "LIKELIHOOD →", { x: gx + 3 * cw - 1.2, y: gy + 3 * ch + 0.34, w: 1.2, h: 0.22, fontSize: 9, bold: true, color: C.accent5, align: "right" });
    const modes = [
      { r: 0, c: 1, icon: "LuCircleX", t: "Missed freeze: no cue, possible fall" },
      { r: 1, c: 1, icon: "LuWifiOff", t: "Silent signal loss: false reassurance" },
      { r: 1, c: 2, icon: "LuBatteryLow", t: "Flat battery mid-walk" },
      { r: 2, c: 2, icon: "LuBellRing", t: "False cue: minor, but frequent" },
      { r: 2, c: 1, icon: "LuBandage", t: "Skin irritation under strap or patch" },
      { r: 1, c: 0, icon: "LuLock", t: "Data exposure from the app" },
    ];
    for (const m of modes) {
      const x = gx + m.c * cw + 0.1, y = gy + m.r * ch + (ch - 0.5) / 2, lv = level(m.r, m.c);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y, w: cw - 0.2, h: 0.5, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: lcol[lv], width: 1 }, shadow: ui.shadow(0.1, 4), objectName: `Failure ${m.t}` });
      await ui.iconDisc(s, m.icon, x + 0.08, y + 0.09, 0.32, { bg: lcol[lv] });
      text(s, m.t, { x: x + 0.46, y, w: cw - 0.7, h: 0.5, fontSize: 9, bold: true, color: C.text1, valign: "middle" });
    }
    text(s, "Placement is illustrative, for discussion; not from measured data.", { x: M, y: 5.62, w: 6.4, h: 0.25, fontSize: 9, italic: true, color: C.accent5 });

    // Right: stat, ISO 14971 chevrons, controls
    const rx = 7.2, rw = 5.53;
    ui.card(s, rx, 1.75, rw, 1.2, { fill: C.background1, line: { color: "D5DFDD", width: 0.75 }, shadowOn: true, name: "False-cue stat" });
    s.addShape(S.RECTANGLE, { x: rx, y: 2.0, w: 0.07, h: 0.7, fill: { color: C.accent3 }, line: { type: "none" }, objectName: "Stat accent" });
    text(s, "9–16", { x: rx + 0.25, y: 1.8, w: 1.5, h: 1.1, fontSize: 36, bold: true, color: C.accent3, valign: "middle" });
    text(s, [
      { text: "unnecessary vibrations per walking hour", options: { bold: true, breakLine: true, fontSize: 12 } },
      { text: "if the reported 0.15–0.27 false alarms per minute held at home. An extrapolation from dataset rates, not a measured home rate. Would Ramesh keep wearing it?", options: { fontSize: 9.5, color: C.accent5 } },
    ], { x: rx + 1.75, y: 1.82, w: rw - 1.95, h: 1.08, fontSize: 12, color: C.text1, valign: "middle" });

    {
      // Five narrow chevrons: drawn directly so the title can use the full chevron width (chevronFlow pads 0.36 in).
      const steps = ["Identify", "Estimate", "Control", "Verify", "Monitor"], cg = 0.06, sw = (rw - cg * 4) / 5, cy = 3.15, chh = 0.56;
      steps.forEach((t, i) => {
        const x = rx + i * (sw + cg);
        s.addShape(i === 0 ? S.PENTAGON : S.CHEVRON, { x, y: cy, w: sw, h: chh, fill: { color: C.accent4 }, line: { type: "none" }, objectName: `ISO 14971 step ${t}` });
        text(s, t, { x: x + (i === 0 ? 0.02 : 0.2), y: cy, w: sw - (i === 0 ? 0.22 : 0.32), h: chh, fontSize: 10, bold: true, color: C.background1, align: "center", valign: "middle" });
      });
    }
    text(s, "ISO 14971:2019 risk management · IEC 62366-1 usability engineering · ask how each control will be shown to work", { x: rx, y: 3.78, w: rw, h: 0.28, fontSize: 9.5, italic: true, color: C.accent5 });

    ui.card(s, rx, 4.15, rw, 1.65, { fill: C.background2, name: "Controls card" });
    await ui.iconDisc(s, "LuShieldCheck", rx + 0.15, 4.3, 0.4, { bg: C.accent1 });
    text(s, "Controls to test first", { x: rx + 0.65, y: 4.3, w: rw - 0.8, h: 0.4, fontSize: 12.5, bold: true, valign: "middle" });
    text(s, [
      "Visible and tactile loss-of-monitoring alert", "Cue-intensity limit (within the bench-tested range) and an easy stop", "Performance during turns, in doorways and with walking aids",
      "Low-battery warning before a walk", "Encryption and short data retention (DPDP Rules 2025)",
    ].map((t, i, a) => ({ text: t, options: { bullet: { indent: 10 }, breakLine: i < a.length - 1 } })), { x: rx + 0.15, y: 4.75, w: rw - 0.3, h: 1.0, fontSize: 10, color: C.text2, paraSpaceAfter: 2 });

    ui.callout(s, "Which control would you test first, and how would you show that it works?", { y: 6.05, h: 0.6 });
  }

  // =====================================================================================
  // ev-swaknee-video — A device is also a daily routine (legacy 12)
  // =====================================================================================
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ev-swaknee-video", kicker: "EVIDENCE · SwaKnee", title: "A device is also a daily routine", stage: 1, core: true });
    const vw = 5.6, vh = vw / 1.4;
    s.addMedia({ type: "video", path: vid("swaknee_how_to_use.mp4"), cover: "data:" + dataUri(img("swaknee_video_poster.png")), x: M, y: 1.75, w: vw, h: vh, objectName: "SwaKnee how-to-use clip (20 s)" });
    text(s, "20 s company demonstration of use · fit, switch on, rest · shows no clinical response · no faces", { x: M, y: 1.75 + vh + 0.08, w: vw, h: 0.3, fontSize: 10, italic: true, color: C.accent6 });
    ui.statusChip(s, M, 6.3, "reported", { w: 2.6, label: "Reported: company material", dark: true });

    const rx = 6.5;
    text(s, "≈34 hours", { x: rx, y: 1.68, w: 3.9, h: 1.0, fontSize: 54, bold: true, color: C.accent2, valign: "middle" });
    text(s, "45 min a day × 45 days = 2,025 minutes", { x: rx, y: 2.7, w: 3.95, h: 0.32, fontSize: 13, color: C.background1, bold: true });
    text(s, "of Kamala's time, before travel, fitting, charging and help from family (leaflet schedule: an illustration, not a prescription)", { x: rx, y: 3.04, w: 3.95, h: 0.5, fontSize: 10, italic: true, color: C.accent6 });
    await ui.imageFrame(s, img("swaknee_controller_applicator.jpg"), { x: 10.6, y: 1.75, w: 2.13, h: 2.13, caption: "Controller and knee applicator", dark: true });

    await ui.stepsVertical(s, [
      { title: "Fit the applicator around the knee", detail: "Strap cuff; connect the cable to the controller" },
      { title: "Switch on the controller", detail: "Power button; status light; mains or charged battery" },
      { title: "Rest for the 45-minute session", detail: "Seated or lying; every day" },
      { title: "Repeat for 45 days", detail: "Charge, store, travel for follow-up; family helps when it slips" },
    ], { x: rx, y: 3.65, w: 6.23, rowH: 0.6, dark: true, color: C.accent2, titleSize: 12, detailSize: 9.5 });
    ui.callout(s, "Who helps Kamala when the cuff slips, the controller shows an error, or her knee feels warm?", { x: rx, y: 6.1, w: 6.23, h: 0.6, dark: true, color: C.accent2, fontSize: 12 });
  }

  // =====================================================================================
  // ev-swaknee-claims — Which claim can this evidence carry? (legacy 13)
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ev-swaknee-claims", kicker: "EVIDENCE · SwaKnee", title: "Which claim can this evidence carry?", stage: 1, core: true });
    ui.barChart(s, {
      categories: ["SwaKnee, n = 40", "Comparison care, n = 42"], series: [{ name: "Average VAS pain reduction", values: [32, 14] }],
      x: M, y: 1.72, w: 4.9, h: 2.75, colors: [HEX.accent2, HEX.accent5], max: 40, valueFmt: "\"≈\"0\"%\"", labelSize: 11,
      title: "Average VAS pain reduction at 45 days (company-reported, one study)",
    });
    ui.callout(s, [
      { text: "Patient's yardstick (MCII, knee OA): ", options: { bold: true } },
      { text: "−19.9 mm, or −40.8%, on a 100 mm pain scale before a person calls the change important (Tubach 2005). An average fall of 32% does not say how many people reached it.", options: { bold: false } },
    ], { x: M, y: 4.62, w: 4.9, h: 0.82, color: C.accent4, fontSize: 10, bold: false });
    ui.card(s, M, 5.58, 4.9, 0.55, { fill: C.background2, name: "Sponsorship note" });
    await ui.iconDisc(s, "LuScale", M + 0.12, 5.66, 0.38, { bg: C.accent5 });
    text(s, "Industry-sponsored drug and device studies reach favourable conclusions more often: RR 1.34 (Lundh et al., Cochrane 2017).", { x: M + 0.6, y: 5.58, w: 4.2, h: 0.55, fontSize: 9.5, color: C.text2, valign: "middle" });
    ui.callout(s, "One of you defends claim 1; another challenges claim 3.", { x: M, y: 6.25, w: 4.9, h: 0.5, color: C.accent2, fontSize: 11.5 });

    const rx = 5.8;
    const claims = [
      { n: 1, q: "“Less pain on average in one 45-day company study”", st: "reported", label: "Reported (company)", verdict: "Acceptable if labelled company-reported, not peer-reviewed" },
      { n: 2, q: "“Clinically proven”", st: "notyet", label: "Not established", verdict: "Needs independent, registered, sham-controlled trials with consistent results" },
      { n: 3, q: "“Regrows cartilage”", st: "notyet", label: "Not measured", verdict: "No structural outcome measured; no human evidence of regeneration found" },
    ];
    claims.forEach((c, i) => {
      const y = 1.75 + i * 0.97, h = 0.85;
      ui.card(s, rx, y, 6.93, h, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: `Claim ${c.n}` });
      ui.numBadge(s, rx + 0.15, y + (h - 0.5) / 2, 0.5, c.n, { fontSize: 15 });
      text(s, c.q, { x: rx + 0.78, y, w: 2.65, h, fontSize: 12.5, bold: true, italic: true, valign: "middle", color: C.text1 });
      ui.arrow(s, rx + 3.5, y + h / 2, 0.3, C.accent5, 1.5);
      ui.statusChip(s, rx + 3.9, y + (h - 0.34) / 2, c.st, { w: 1.6, label: c.label });
      text(s, c.verdict, { x: rx + 5.6, y, w: 1.25, h, fontSize: 9, color: C.text2, valign: "middle" });
    });

    ui.card(s, rx, 4.7, 6.93, 2.05, { fill: C.background2, name: "Not reported card" });
    await ui.iconDisc(s, "LuFileQuestion", rx + 0.15, 4.85, 0.42, { bg: C.accent3 });
    text(s, "What the public summary does not report", { x: rx + 0.7, y: 4.85, w: 6.0, h: 0.42, fontSize: 12.5, bold: true, valign: "middle" });
    const nr1 = ["How groups were allocated", "Blinding or a sham control", "Prospective CTRI registration", "How missing data were handled"];
    const nr2 = ["Between-group difference with its confidence interval", "Adverse events", "Durability beyond 45 days", "Device and firmware version studied"];
    text(s, nr1.map((t, i) => ({ text: t, options: { bullet: { indent: 10 }, breakLine: i < nr1.length - 1 } })), { x: rx + 0.15, y: 5.35, w: 3.2, h: 1.3, fontSize: 10.5, color: C.text2, paraSpaceAfter: 3 });
    text(s, nr2.map((t, i) => ({ text: t, options: { bullet: { indent: 10 }, breakLine: i < nr2.length - 1 } })), { x: rx + 3.5, y: 5.35, w: 3.3, h: 1.3, fontSize: 10.5, color: C.text2, paraSpaceAfter: 3 });
  }

  // =====================================================================================
  // ev-pemf — What independent evidence says (legacy 27, promoted into the main deck)
  // =====================================================================================
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ev-pemf", kicker: "EVIDENCE · INDEPENDENT", title: "What independent evidence says about cueing and PEMF", stage: 1 });
    const cols = [
      { x: M, title: "FoGO domain · detecting and cueing freezing of gait", color: C.accent1, icon: "LuFootprints", rows: [
        { icon: "LuDatabase", t: [{ text: "Daphnet benchmark (Bächlin 2010): ", options: { bold: true } }, { text: "10 patients in a laboratory, 8 froze, 237 video-labelled freezes" }], pill: "Benchmark, n = 10", pc: C.accent4 },
        { icon: "LuSearch", t: [{ text: "Silva de Lima 2017, systematic review: ", options: { bold: true } }, { text: "sensitivity 73–100%, specificity 67–100%, mostly laboratory studies" }], pill: "Lab-dominant", pc: C.accent2 },
        { icon: "LuHouse", t: [{ text: "RESCUE trial (n = 153, home cueing): ", options: { bold: true } }, { text: "small gait gains and lower freezing severity in freezers; fall counts not measured" }], pill: "Falls not measured", pc: C.accent2 },
        { icon: "LuBookOpen", t: [{ text: "Ginis 2018 narrative review: ", options: { bold: true } }, { text: "no trial found showing fewer falls from cueing, continuous or on-demand" }], pill: "Fewer falls: not shown", pc: C.accent3 },
        { icon: "LuWatch", t: [{ text: "FoGO: ", options: { bold: true } }, { text: "project-reported F1 on public datasets; prospective study planned, not done" }], pill: "Reported, preliminary", pc: C.accent1 },
      ] },
      { x: 6.78, title: "SwaKnee domain · PEMF for knee osteoarthritis", color: C.accent4, icon: "LuMagnet", rows: [
        { icon: "LuBookMarked", t: [{ text: "Cochrane 2013 (9 trials, 636 adults, all OA sites and field types): ", options: { bold: true } }, { text: "pain probably improves ≈15/100 more than sham; function uncertain" }], pill: "Moderate: pain only", pc: C.accent1 },
        { icon: "LuScale", t: [{ text: "Chen 2019 (knee, 8 RCTs): ", options: { bold: true } }, { text: "no pain advantage vs placebo. " }, { text: "Yang 2020 (all sites, 16 RCTs): ", options: { bold: true } }, { text: "an advantage" }], pill: "Reviews disagree", pc: C.accent2 },
        { icon: "LuGavel", t: [{ text: "OARSI 2019 guideline: ", options: { bold: true } }, { text: "electromagnetic therapy strongly recommended against (low-quality evidence)" }], pill: "Strongly against", pc: C.accent3 },
        { icon: "LuLandmark", t: [{ text: "NICE NG226 (2022): ", options: { bold: true } }, { text: "do not offer listed electrotherapies, insufficient evidence of benefit (list does not name PEMF)" }], pill: "Insufficient evidence", pc: C.accent3 },
        { icon: "LuBone", t: [{ text: "Cartilage regrowth: ", options: { bold: true } }, { text: "no human evidence found in any review; pooled outcomes are pain, stiffness, function" }], pill: "Not established", pc: C.accent3 },
      ] },
    ];
    const cwid = 5.95, hy = 1.75, hh = 0.5, r0 = 2.38, rh = 0.8;
    for (const c of cols) {
      s.addShape(S.ROUNDED_RECTANGLE, { x: c.x, y: hy, w: cwid, h: hh, rectRadius: 0.1, fill: { color: c.color }, line: { type: "none" }, objectName: `Column head ${c.title}` });
      await ui.iconDisc(s, c.icon, c.x + 0.1, hy + 0.08, 0.34, { bg: C.background1, bgTrans: 80, fg: HEX.lt1 });
      text(s, c.title, { x: c.x + 0.55, y: hy, w: cwid - 0.65, h: hh, fontSize: 12.5, bold: true, color: C.background1, valign: "middle" });
      for (let i = 0; i < c.rows.length; i++) {
        const r = c.rows[i], y = r0 + i * rh;
        await ui.iconDisc(s, r.icon, c.x + 0.08, y + (rh - 0.4) / 2, 0.4, { bg: C.accent6, fg: HEX.dk2 });
        text(s, r.t, { x: c.x + 0.6, y, w: cwid - 0.6 - 1.55, h: rh, fontSize: 10.5, color: C.background1, valign: "middle" });
        ui.pill(s, c.x + cwid - 1.45, y + (rh - 0.3) / 2, 1.45, r.pill, { color: r.pc, h: 0.3, fontSize: 9 });
        if (i < c.rows.length - 1) hline(s, c.x, y + rh, cwid, C.accent6, 0.5);
      }
    }
    text(s, "“Not found” in our searches is not proof of absence. Cochrane 2013 pooled all osteoarthritis sites and field types; NICE NG226's list does not name PEMF explicitly.", { x: M, y: 6.45, w: 12.13, h: 0.32, fontSize: 9.5, italic: true, color: C.accent6 });
  }

  // =====================================================================================
  // ev-subgroups — An average can hide a patient (legacy 14)
  // =====================================================================================
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ev-subgroups", kicker: "EVIDENCE · EQUITY", title: "An average can hide a patient", stage: 1 });
    ui.barChart(s, {
      categories: ["Black patients", "White patients"], series: [{ name: "Occult hypoxaemia", values: [11.7, 3.6] }],
      x: M, y: 1.72, w: 5.2, h: 2.75, colors: [HEX.accent3, HEX.accent4], max: 14, valueFmt: "0.0\"%\"", labelSize: 11,
      title: "Arterial saturation below 88% while the oximeter read 92–96% (% of paired readings)",
    });
    ui.card(s, M, 4.6, 5.2, 0.95, { fill: C.background2, name: "Sjoding detail" });
    text(s, [
      { text: "Sjoding et al., NEJM 2020. ", options: { bold: true } },
      { text: "88 of 749 vs 99 of 2,778 paired measurements (95% CI 8.5–16.0 vs 2.7–4.7), University of Michigan cohort. Observational; race recorded, pigmentation not measured. It shows a device that looked accurate on average missing dangerous hypoxaemia three times as often in one group; it does not justify a race-based correction." },
    ], { x: M + 0.15, y: 4.65, w: 4.9, h: 0.85, fontSize: 9.5, color: C.text2, valign: "middle" });
    ui.card(s, M, 5.7, 5.2, 1.05, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "FDA response" });
    await ui.iconDisc(s, "LuFlag", M + 0.15, 5.88, 0.42, { bg: C.accent4 });
    ui.pill(s, M + 3.45, 5.78, 1.6, "Regulator response", { color: C.accent4, h: 0.26, fontSize: 9 });
    text(s, [
      { text: "US FDA draft guidance, 7 Jan 2025: ", options: { bold: true } },
      { text: "clinical testing of pulse oximeters across a diverse range of skin tones, assessed on the Monk Skin Tone scale." },
    ], { x: M + 0.7, y: 6.05, w: 4.4, h: 0.65, fontSize: 10, color: C.text1, valign: "middle" });

    const rx = 6.1, rw = 6.63;
    text(s, "Who is missing from our data?", { x: rx, y: 1.72, w: rw, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
    await ui.cardGrid(s, [
      { icon: "LuFootprints", title: "Ramesh · FoGO", color: C.accent1, body: ["People using walking aids", "Cognitive fluctuation", "Crowded homes, floor-level living", "Saris or dhotis over the sensor", "Public datasets with few or no Indian participants"] },
      { icon: "LuPersonStanding", title: "Kamala · SwaKnee", color: C.accent2, body: ["Women", "People with obesity", "Manual and agricultural workers", "People with other illnesses and medicines", "Rural users far from follow-up"] },
    ], { x: rx, y: 2.15, w: rw, h: 2.9, cols: 2, gap: 0.2, titleSize: 12.5, bodySize: 10.5, iconD: 0.48 });
    ui.card(s, rx, 5.2, rw, 0.85, { fill: C.background2, name: "Diversity guidance" });
    await ui.iconDisc(s, "LuUsers", rx + 0.15, 5.36, 0.42, { bg: C.accent1 });
    text(s, [
      { text: "MRCT Center diversity guidance (2020): ", options: { bold: true } },
      { text: "diversity includes comorbidities, concurrent medicines and environment; report subgroups. " },
      { text: "Stanford Biodesign health equity: ", options: { bold: true } },
      { text: "equity is decided at identify, invent and implement." },
    ], { x: rx + 0.7, y: 5.25, w: rw - 0.85, h: 0.75, fontSize: 9.5, color: C.text2, valign: "middle" });
    ui.callout(s, "Take two answers for each patient. Who would our data miss?", { x: rx, y: 6.2, w: rw, h: 0.55, color: C.accent2, fontSize: 12 });
  }
}

module.exports = { SECTION, build };
