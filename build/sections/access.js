// Access and safety section: divider, inclusive-design audit, affordability and NPPA, decision 4 (brochure),
// decision 5 (software update), and the harm loop with MvPI.
// Facts: facts/india-ecosystem.md, facts/cdsco-guidance.md, facts/prior-india-ethics.md, facts/india-examples.md,
// facts/india-class-licence.md, refs.js, storyboard_v2.json, notes/_legacy.js (v1 slides 18–22).
const SECTION = "Access and safety";
const NB = " "; // non-breaking space inside numbers, dates and form references
const STAGE_ACCESS = 4, STAGE_SAFETY = 5;

async function build(ui, ctx) {
  const { C, S, M, W, HEX, text } = ui;
  const bullets = (items, o = {}) => items.map((t, j) => ({ text: t, options: Object.assign({ bullet: { indent: 10 }, breakLine: j < items.length - 1 }, o) }));
  const hline = (s, x, y, w, color, { width = 1, dash = false } = {}) =>
    s.addShape(S.LINE, { x, y, w, h: 0, line: { color, width, dashType: dash ? "dash" : "solid" }, objectName: "Rule" });

  // ------------------------------------------------------------------ ac-div
  {
    await ui.sectionDivider(SECTION, {
      id: "ac-div", num: 5, kicker: "PART 5 · ACCESS AND SAFETY",
      title: "Can they afford it, use it, and who answers later?",
      blurb: "Capability audits, the total cost of a course and honest brochures before launch; a named owner for every step after it.",
      items: [
        { icon: "LuAccessibility", text: "Who can't use it? Seven capabilities, plus the demands India adds" },
        { icon: "LuIndianRupee", text: "Total cost of use, and how far NPPA's price powers reach under DPCO 2013" },
        { icon: "LuSiren", text: "Decisions 4 and 5: a brochure, a software update; then the harm loop and MvPI" },
      ],
      photo: { file: ui.img("swaknee_tablet_controller.jpg"), caption: "SwaKnee tablet controller and knee applicator (supplied product photograph; no patient shown)" },
    });
  }

  // ------------------------------------------------------------------ ac-inclusive (legacy 18)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ac-inclusive", kicker: "ACCESS · INCLUSIVE DESIGN", title: "Who can't use it? Audit the demands a device makes", stage: STAGE_ACCESS });
    const tw = 8.25;
    text(s, "Illustrative ratings of the demand each task makes on the seven capabilities of the Cambridge EDC Inclusive Design Toolkit", { x: M, y: 1.6, w: tw, h: 0.26, fontSize: 10.5, italic: true, color: C.accent5 });
    const demand = {
      High: { fill: { color: "F6DCD9" }, color: "A8372D", bold: true, align: "center" },
      Medium: { fill: { color: "FBEBD3" }, color: "9A5E12", bold: true, align: "center" },
      Low: { fill: { color: "DCEFE3" }, color: "2E7A52", bold: true, align: "center" },
    };
    ui.matrix(s, ["Capability", "What FoGO asks of Ramesh", "Demand", "What SwaKnee asks of Kamala", "Demand"], [
      ["Vision", "Read the app screen; see the LED and the pairing prompts", "Medium", "Read the controller display; set the session timer", "Medium"],
      ["Hearing", "App alerts only; the cue itself is a vibration", "Low", "Beeps and error tones from the controller", "Low"],
      ["Thinking", "Pair the phone, keep the charging routine, trust a cue mid-freeze", "High", `Keep a 45-minute daily schedule for 45${NB}days; read error codes`, "Medium"],
      ["Communication", "Report a fault; consent and instructions in Odia or Hindi", "Medium", "Follow written steps; ask for help when the cuff slips", "Medium"],
      ["Locomotion", "Walk and turn with an ankle module while freezing", "High", `Travel to the clinic for fitting and follow-up`, "Medium"],
      ["Reach and stretch", "Bend to the ankle; place the chest patch", "High", "Bend to wrap the applicator around the knee", "High"],
      ["Dexterity", "Strap buckle, adhesive patch, a small charging port", "High", "Fasten the cuff; connect the cable to the controller", "Medium"],
    ], { x: M, y: 1.9, w: tw, colW: [1.5, 2.6, 0.78, 2.6, 0.77], rowH: 0.49, fontSize: 10, cellStyle: (r, c, v) => ((c === 2 || c === 4) && demand[v]) ? demand[v] : null });
    ui.callout(s, [
      { text: "Pick one demand to redesign first. ", options: { bold: true } },
      { text: "Classroom simulation: fasten the strap wearing thick gloves. FoGO's team reports consulting 30+ potential users; the common ask was comfort and easier use (project-reported).", options: { bold: false } },
    ], { x: M, y: 6.05, w: tw, h: 0.7, color: C.accent2, fontSize: 10.5, bold: false });

    // Right: the demands India adds, then the two cautions.
    const rx = 9.1, rw = W - M - rx;
    text(s, "India adds demands the toolkit does not list", { x: rx, y: 1.6, w: rw, h: 0.28, fontSize: 12, bold: true, color: C.text2 });
    const adds = [
      { icon: "LuLanguages", t: "Language", d: "Odia, Hindi or English on screen, in the leaflet and at consent" },
      { icon: "LuBookOpen", t: "Literacy", d: "Pictorial steps and teach-back, not a printed manual" },
      { icon: "LuPlugZap", t: "Power", d: "Cuts and voltage swings: charging routines fail first" },
      { icon: "LuSmartphone", t: "Smartphone", d: "Shared, old, or none; no data plan for updates" },
      { icon: "LuHandHelping", t: "Caregiver", d: "Fitting, charging and reporting fall on a relative" },
    ];
    for (let i = 0; i < adds.length; i++) {
      const yy = 1.98 + i * 0.6, a = adds[i];
      await ui.iconDisc(s, a.icon, rx, yy + 0.04, 0.44, { bg: C.accent1, bgTrans: 85, fg: HEX.dk2 });
      text(s, [
        { text: a.t, options: { bold: true, breakLine: true } },
        { text: a.d, options: { fontSize: 9.5, color: C.text2 } },
      ], { x: rx + 0.58, y: yy - 0.02, w: rw - 0.6, h: 0.58, fontSize: 11, color: C.text1 });
    }
    ui.card(s, rx, 5.02, rw, 0.78, { fill: C.background2, name: "Exclusion calculator caution" });
    s.addShape(S.RECTANGLE, { x: rx, y: 5.14, w: 0.07, h: 0.54, fill: { color: C.accent3 }, line: { type: "none" }, objectName: "Caution bar" });
    text(s, [
      { text: "Exclusion Calculator: ", options: { bold: true } },
      { text: "its percentages rest on UK survey data (1996–97); never present them as Indian figures.", options: { bold: false } },
    ], { x: rx + 0.2, y: 5.06, w: rw - 0.3, h: 0.7, fontSize: 9.5, color: C.text1, valign: "middle" });
    ui.card(s, rx, 5.92, rw, 0.83, { fill: C.background2, name: "Make it testable" });
    s.addShape(S.RECTANGLE, { x: rx, y: 6.04, w: 0.07, h: 0.59, fill: { color: C.accent4 }, line: { type: "none" }, objectName: "Testable bar" });
    text(s, [
      { text: "Make it testable: ", options: { bold: true } },
      { text: `IEC${NB}62366-1 usability engineering turns each demand into a requirement; MRCT Accessibility by Design (2023) adds home visits, travel support and accessible consent formats.`, options: { bold: false } },
    ], { x: rx + 0.2, y: 5.96, w: rw - 0.3, h: 0.75, fontSize: 9.5, color: C.text1, valign: "middle" });
  }

  // ------------------------------------------------------------------ ac-cost (legacy 19)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "ac-cost", kicker: "ACCESS · AFFORDABILITY", title: "Price is only part of the cost", stage: STAGE_ACCESS, core: true });
    const lw = 8.3, steps = 6, gap = 0.08, sw = (lw - gap * (steps - 1)) / steps;
    text(s, "Kamala's 45 days with SwaKnee: six costs, and a question for each", { x: M, y: 1.6, w: lw, h: 0.26, fontSize: 12, bold: true, color: C.text2 });
    ui.chevronFlow(s, [
      { title: "Buy or rent", detail: `Device, applicator, GST; seller holds MD${NB}42`, color: C.accent4 },
      { title: `Travel 30${NB}km`, detail: "To the clinic for fitting; return visits", color: C.accent4 },
      { title: "Fit and learn", detail: "Clinician time; steps in Odia or Hindi", color: C.accent4 },
      { title: `≈34${NB}hours`, detail: `45${NB}min × 45${NB}days at home (leaflet schedule)`, color: C.accent2 },
      { title: "Family time", detail: "A relative fits and charges it; lost wages", color: C.accent4 },
      { title: "Repairs, support", detail: "Spares, service plan, a phone line that answers", color: C.accent4 },
    ], { x: M, y: 1.92, w: lw, h: 0.58, gap, detailH: 0.66, fontSize: 11 });
    for (let i = 0; i < steps; i++) ui.pill(s, M + i * (sw + gap), 3.3, sw, "Who pays? ______", { color: C.accent2, fill: false, dash: true, h: 0.32, fontSize: 9.5 });

    // NPPA panel: powers, then a timeline of device price actions.
    const py = 3.72, ph = 3.03;
    ui.card(s, M, py, lw, ph, { fill: C.background2, name: "NPPA panel" });
    s.addShape(S.RECTANGLE, { x: M, y: py + 0.15, w: 0.07, h: 0.62, fill: { color: C.accent4 }, line: { type: "none" }, objectName: "NPPA accent" });
    text(s, [
      { text: "NPPA can reach devices. ", options: { bold: true, color: C.accent4 } },
      { text: "Devices are ‘drugs’ under the 1940 Act, so the Drugs (Prices Control) Order 2013 applies.", options: { bold: false } },
    ], { x: M + 0.22, y: py + 0.1, w: lw - 0.4, h: 0.3, fontSize: 11.5, color: C.text1, valign: "middle" });
    ui.pill(s, M + 0.22, py + 0.46, 3.2, `Para${NB}19: ceiling prices in the public interest`, { color: C.accent4, fill: true, h: 0.3, fontSize: 9.5 });
    ui.pill(s, M + 3.55, py + 0.46, 4.5, `Para${NB}20: MRP monitoring, no rise above 10% in 12${NB}months`, { color: C.accent4, fill: false, dash: true, h: 0.3, fontSize: 9.5 });
    ui.timeline(s, [
      { date: `13${NB}Feb${NB}2017`, label: "Coronary stents capped", detail: `₹7,260 bare-metal · ₹29,600 drug-eluting; cuts up to 85% and 74%. Now in Schedule${NB}I, revised yearly by WPI`, color: C.accent4 },
      { date: `16${NB}Aug${NB}2017`, label: `Knee implants, Para${NB}19`, detail: "Cobalt-chromium primary knee ₹1,58,324 → ₹54,720 (−65%); NPPA found an average trade margin of 313%", color: C.accent4, big: true },
      { date: `13${NB}Jul${NB}2021`, label: "Trade margin ≤70% on PTD", detail: "Pulse oximeters, BP monitors, nebulisers, thermometers, glucometers: 91% of 684 brands cut MRP, by up to 88%", color: C.accent1 },
      { date: `15${NB}Nov${NB}2026`, label: "Knee-implant cap runs to", detail: "Extended year by year since 2017; check NPPA for the next notice. SwaKnee is not an implant: no cap applies to it", color: C.accent2 },
    ], { x: M + 0.2, y: py + ph - 0.33, w: lw - 0.4, alternate: false, fontSize: 11, labelH: 1.25, inset: 1.0, lineColor: C.accent5 });

    // Right column: FoGO planned price, the abroad lens, responsible options.
    const rx = 9.2, rw = W - M - rx;
    ui.card(s, rx, 1.6, rw, 1.68, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "FoGO planned price" });
    s.addShape(S.RECTANGLE, { x: rx, y: 1.8, w: 0.07, h: 1.28, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Price accent" });
    text(s, "FoGO's planned price", { x: rx + 0.22, y: 1.68, w: rw - 0.4, h: 0.26, fontSize: 11, bold: true, color: C.text1 });
    text(s, "₹27,000", { x: rx + 0.22, y: 1.94, w: 2.0, h: 0.55, fontSize: 26, bold: true, color: C.accent2, valign: "middle" });
    text(s, `+ ₹3–4,000 a year service plan`, { x: rx + 0.22, y: 2.5, w: rw - 0.4, h: 0.26, fontSize: 10.5, color: C.text2 });
    ui.statusChip(s, rx + 0.22, 2.84, "planned", { w: 2.4, label: "Planned, not a market price" });
    ui.card(s, rx, 3.42, rw, 1.33, { fill: C.background2, name: "Abroad lens" });
    text(s, [
      { text: "Lens from abroad. ", options: { bold: true, color: C.accent4 } },
      { text: "Cambridge CCHLE: develop → integrate at scale → make affordable. HBS Aravind case: Aurolab lenses made locally under a quality system, so affordability was designed in, not discounted later.", options: { bold: false } },
    ], { x: rx + 0.18, y: 3.5, w: rw - 0.36, h: 1.2, fontSize: 9.5, color: C.text1 });
    ui.card(s, rx, 4.9, rw, 1.85, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Responsible options" });
    await ui.iconDisc(s, "LuHandCoins", rx + 0.18, 5.02, 0.4, { bg: C.accent1, bgTrans: 85, fg: HEX.dk2 });
    text(s, "Responsible options for an adjunct with modest evidence", { x: rx + 0.68, y: 5.0, w: rw - 0.85, h: 0.44, fontSize: 10.5, bold: true, color: C.text1, valign: "middle" });
    text(s, bullets([
      "Rent rather than sell; clinic-shared devices",
      "A trial period with a refund if not tolerated",
      "State the total cost of a course up front",
      "Price the service plan, not only the box",
    ], { fontSize: 9.5, color: C.text2 }), { x: rx + 0.18, y: 5.5, w: rw - 0.36, h: 1.2, paraSpaceAfter: 2 });
  }

  // ------------------------------------------------------------------ ac-decision3 (legacy 20)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "ac-decision3", kicker: "WOULD YOU PROCEED? 4/5", title: "Launch with this brochure?", stage: STAGE_ACCESS, core: true });
    const lw = 5.9;
    // Brochure mock-up (hypothetical; reproduces no actual SwaKnee material).
    ui.card(s, M, 1.68, lw, 1.22, { fill: C.background1, radius: 0.1, name: "Brochure mock-up" });
    ui.pill(s, M + 0.15, 1.8, 1.9, "HYPOTHETICAL BROCHURE", { color: C.accent3, fill: true, h: 0.24, fontSize: 8.5 });
    text(s, "Knee relief at home", { x: M + 2.2, y: 1.76, w: lw - 2.35, h: 0.3, fontSize: 12, bold: true, color: C.accent5, align: "right", valign: "middle" });
    const claims = ["Clinically proven!", "Regrows cartilage", "Doctor recommended", "Avoid surgery forever"];
    for (let i = 0; i < claims.length; i++) {
      const cx = M + 0.2 + (i % 2) * (lw / 2), cy = 2.04 + Math.floor(i / 2) * 0.4;
      await ui.iconOnly(s, "LuStar", cx, cy + 0.06, 0.26, HEX.accent2);
      text(s, claims[i], { x: cx + 0.36, y: cy, w: lw / 2 - 0.5, h: 0.38, fontSize: 15, bold: true, color: HEX.dk1, valign: "middle" });
    }
    text(s, "Kamala's son found it online. Invented for teaching; not actual SwaKnee material.", { x: M, y: 2.94, w: lw, h: 0.26, fontSize: 9.5, italic: true, color: C.accent6 });

    text(s, "The pressures", { x: M, y: 3.22, w: lw, h: 0.26, fontSize: 12, bold: true, color: C.accent6 });
    const pressures = [
      { icon: "LuStore", t: "The distributor insists on these four claims" },
      { icon: "LuHourglass", t: `Cash lasts 3${NB}months` },
      { icon: "LuUsers", t: "If the company folds, today's users lose service and support" },
    ];
    for (let i = 0; i < pressures.length; i++) {
      const yy = 3.5 + i * 0.38;
      await ui.iconDisc(s, pressures[i].icon, M, yy, 0.32, { bg: C.accent6, fg: HEX.dk2 });
      text(s, pressures[i].t, { x: M + 0.46, y: yy, w: lw - 0.5, h: 0.32, fontSize: 13, color: C.background1, valign: "middle" });
    }
    ui.callout(s, "Vote A, B or C. Then each table rewrites one claim in 30 seconds.", { x: M, y: 4.62, w: lw, h: 0.38, dark: true, color: C.accent2, fontSize: 11.5 });

    ui.optionCards(s, [
      { key: "A", label: "Launch as written", sub: "The distributor is happy; cash arrives" },
      { key: "B", label: "Fix the claims first, then launch", sub: "Honest wording this week; keep users supported" },
      { key: "C", label: "Not yet", sub: "No launch until independent trials report" },
    ], { y: 1.68, h: 0.9, gap: 0.15 });
    text(s, "The codes behind each answer: UCMPMD 2024 (amended 30 Apr 2026) · DMRA 1954 · ASCI Code I.1 · IMC 2002 cl. 6.8", { x: 7.0, y: 4.62, w: 5.73, h: 0.38, fontSize: 9.5, italic: true, color: C.accent6, valign: "middle" });

    // What you may say: the brochure corrected.
    ui.matrix(s, ["Brochure claim", "Why it fails the Indian codes", "What you may say (suggested wording)"], [
      ["“Clinically proven!”", `One company study (n${NB}=${NB}82), not independently replicated; OARSI 2019 recommends against electromagnetic therapy`, "“In one company study of 82 adults over 45 days, average pain fell more than with comparison care. Independent trials are needed.”"],
      ["“Regrows cartilage”", "Never measured; no human evidence of cartilage regeneration found", "“Intended to ease pain as an adjunct to care. No effect on cartilage has been shown.”"],
      ["“Doctor recommended”", `Implied endorsement: UCMPMD 2024 bars inducements and unsubstantiated claims; IMC 2002 cl.${NB}6.8 binds the doctor`, "“Ask your doctor whether it suits you. It does not replace the care your doctor advises.”"],
      ["“Avoid surgery forever”", "An absolute cure promise; DMRA 1954 Schedule lists ‘rheumatism’; ASCI Code I.1 demands substantiation", "“It does not prevent or replace surgery. If pain persists, see your orthopaedic surgeon.”"],
    ], { x: M, y: 5.08, w: W - 2 * M, colW: [1.75, 4.45, 5.93], rowH: 0.3, fontSize: 9, headFill: HEX.accent2, headColor: HEX.dk2 });
  }

  // ------------------------------------------------------------------ sf-decision4 (legacy 21)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "sf-decision4", kicker: "WOULD YOU PROCEED? 5/5", title: "Push tonight's FoGO update?", stage: STAGE_SAFETY, core: true });
    const iw = 1.5, ih = iw / 0.501;
    s.addImage({ path: ui.img("fogo_app_cue_rounded.png"), x: M, y: 1.68, w: iw, h: ih, altText: "FoGO prototype app showing an active vibration cue and the research panel" });
    text(s, "Real prototype app: the cue fired after a debounced 2-of-3 window. Change the rule, change the device.", { x: M, y: 1.68 + ih + 0.06, w: 1.9, h: 0.7, fontSize: 9, italic: true, color: C.accent6 });

    const fx = 2.6, fw = 4.1;
    text(s, "Tonight's build (hypothetical update)", { x: fx, y: 1.68, w: fw, h: 0.26, fontSize: 12, bold: true, color: C.accent6 });
    await ui.factRows(s, [
      { icon: "LuBellOff", text: `Fewer false cues. Today's build fires about 9–11 an hour of walking (0.15–0.18 per minute on public datasets)` },
      { icon: "LuEyeOff", text: "May miss more freezes: sensitivity traded for specificity" },
      { icon: "LuDatabase", text: "Tested on stored data only; no user has walked with it" },
    ], { x: fx, y: 2.05, w: fw, rowH: 0.98, fontSize: 13 });
    ui.callout(s, "Vote. Then name who in your team can pause or reverse a release.", { x: fx, y: 4.98, w: fw, h: 0.44, dark: true, color: C.accent2, fontSize: 11.5 });

    ui.optionCards(s, [
      { key: "A", label: "Push to all users tonight", sub: "Everyone gets the new threshold at once" },
      { key: "B", label: "Staged release after review", sub: "Shadow mode, a small group, monitoring, rollback trigger" },
      { key: "C", label: "Not yet", sub: "Validate with new users first; ask the ethics committee" },
    ], { y: 1.68, h: 0.95, gap: 0.18 });
    text(s, "Evidence belongs to a version: results for version 1 may not cover version 2.", { x: 7.0, y: 4.98, w: 5.73, h: 0.44, fontSize: 11, italic: true, color: C.accent6, valign: "middle" });

    // Change-control strip: India, USA, and the study rule.
    text(s, "CHANGES NEED GOVERNANCE", { x: M, y: 5.5, w: 6, h: 0.24, fontSize: 9.5, bold: true, color: C.accent2, charSpacing: 2 });
    const cards = [
      { flag: "IN", t: `CDSCO software guidance, 21${NB}Jul${NB}2026`, d: `CDSCO/MD/GD/MDSW/01/2026: lifecycle documentation, version control, verification and validation, documented change management; an Algorithm Change Protocol where applicable. Interprets MDR-2017, adds no new control.` },
      { flag: "US", t: `FDA PCCP guidance, Dec${NB}2024 (revised Aug${NB}2025)`, d: "Pre-specify the planned modifications, the validation protocol and an impact assessment; changes inside the plan need no new submission. Not a blank cheque: the plan is reviewed first." },
      { icon: "LuGitBranch", t: "If users are study participants", d: "Notify the ethics committee, seek a protocol amendment, re-consent where the change could affect a participant's decision. Release well: shadow mode → small staged group → pre-set metrics → rollback trigger → tell users and clinicians." },
    ];
    const cg = 0.2, cw = (W - 2 * M - 2 * cg) / 3, cy = 5.76, ch = 1.09;
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i], cx = M + i * (cw + cg);
      s.addShape(S.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cw, h: ch, rectRadius: 0.1, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 0.75 }, objectName: `Governance ${c.t}` });
      if (c.flag) await ui.flag(s, c.flag, cx + 0.14, cy + 0.1, 0.42);
      else await ui.iconDisc(s, c.icon, cx + 0.14, cy + 0.08, 0.34, { bg: C.accent2, fg: HEX.dk2 });
      text(s, c.t, { x: cx + 0.66, y: cy + 0.06, w: cw - 0.8, h: 0.34, fontSize: 10.5, bold: true, color: C.background1, valign: "middle" });
      text(s, c.d, { x: cx + 0.14, y: cy + 0.4, w: cw - 0.28, h: ch - 0.44, fontSize: 8.5, color: C.accent6 });
    }
  }

  // ------------------------------------------------------------------ sf-harm (legacy 22)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "sf-harm", kicker: "SAFETY", title: "When harm happens, who answers?", stage: STAGE_SAFETY, core: true });
    const fw = W - 2 * M, steps = 6, gap = 0.08, sw = (fw - gap * (steps - 1)) / steps;
    text(s, "Suppose Ramesh falls after a missed cue. Follow the report around the loop and write an owner under each step.", { x: M, y: 1.6, w: fw, h: 0.26, fontSize: 12, bold: true, color: C.text2 });
    ui.chevronFlow(s, [
      { title: "1 · Care", detail: "Meet his immediate needs; keep the device and its data; no blanket ‘stop using it’", color: C.accent3 },
      { title: "2 · Record", detail: "Device identity, serial number, software version, context, outcome", color: C.accent4 },
      { title: "3 · Report", detail: `MvPI MDAE form; licence holder → CDSCO ≤${NB}15${NB}days; in a study → sponsor and ethics committee`, color: C.accent3 },
      { title: "4 · Investigate", detail: `Root cause and context; trend across units; update the ISO${NB}14971 risk file`, color: C.accent4 },
      { title: "5 · Correct", detail: "CAPA; labelling or software fix; recall through the FSCA form to MvPI", color: C.accent2 },
      { title: "6 · Follow up", detail: `The person; did the fix work; PSUR 6-monthly for 2${NB}years, then yearly for 2`, color: C.accent1 },
    ], { x: M, y: 1.92, w: fw, h: 0.58, gap, detailH: 0.72, fontSize: 11 });
    for (let i = 0; i < steps; i++) ui.pill(s, M + i * (sw + gap), 3.36, sw, "Owner: ________", { color: C.accent2, fill: false, dash: true, h: 0.32, fontSize: 9.5 });

    // ASR hip case: the Indian reference for traceability and redress.
    const px = M, pw = 7.45, py = 3.85, ph = 2.9;
    ui.card(s, px, py, pw, ph, { fill: C.background2, name: "ASR case panel" });
    text(s, [
      { text: "India's reference case: DePuy ASR metal-on-metal hips, ", options: { bold: true, color: C.accent3 } },
      { text: `recalled worldwide in Aug${NB}2010; CDSCO device alert Dec${NB}2013; import licence cancelled`, options: { bold: false } },
    ], { x: px + 0.18, y: py + 0.08, w: pw - 0.36, h: 0.3, fontSize: 10.5, color: C.text1, valign: "middle" });
    await ui.statTiles(s, [
      { value: "≈4,700", label: "ASR hips in India", sub: "Surgeries 2004–2010; patients had to be found through a helpline", icon: "LuUsers", color: C.accent3 },
      { value: "1,080", label: `Traced by Aug${NB}2018`, sub: `275 had revision surgery (Agarwal committee, 19${NB}Feb${NB}2018)`, icon: "LuSearch", color: C.accent4 },
      { value: `₹20${NB}lakh`, label: "Compensation base", sub: `Formula approved 29${NB}Nov${NB}2018; awards ₹30${NB}lakh to ₹1.23${NB}crore by disability and age`, icon: "LuBanknote", color: C.accent2, valueSize: 24 },
    ], { x: px + 0.18, y: py + 0.45, w: pw - 0.36, h: 1.78, gap: 0.16, valueSize: 26 });
    ui.callout(s, "Traceability starts on day one: a serial number on every unit, a registry, an in-app ‘report a problem’ button, a phone line that answers.", { x: px + 0.18, y: py + 2.32, w: pw - 0.36, h: 0.48, color: C.accent3, fontSize: 10 });

    // MvPI reporting card and the abroad comparison.
    const rx = px + pw + 0.25, rw = W - M - rx;
    ui.card(s, rx, py, rw, ph, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "MvPI card" });
    s.addShape(S.RECTANGLE, { x: rx, y: py + 0.18, w: 0.07, h: ph - 0.36, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "MvPI accent" });
    text(s, `Report to MvPI (IPC Ghaziabad, since 6${NB}Jul${NB}2015)`, { x: rx + 0.22, y: py + 0.08, w: rw - 0.35, h: 0.3, fontSize: 11, bold: true, color: C.text1, valign: "middle" });
    const rows = [
      { icon: "LuFileText", t: "MDAE form v1.2", d: "Open to makers, importers, distributors, clinicians and patients; FSCA form for recalls" },
      { icon: "LuPhone", t: `1800${NB}180${NB}3024 · mvpi-ipc@gov.in`, d: "Helpline Mon–Fri 09:00–17:30; 174 monitoring centres (2022 figure)" },
      { icon: "LuGavel", t: `CDSCO circular, 15${NB}May${NB}2024`, d: "Every licence holder must report suspected unexpected serious adverse events to MvPI" },
      { icon: "LuGlobe", t: "Abroad: mostly passive too", d: "US, EU, Japan and China rely mainly on passive reporting (Kramer 2013); the UK Cumberlege Review (2020) urged a device registry and a Patient Safety Commissioner" },
    ];
    for (let i = 0; i < rows.length; i++) {
      const yy = py + 0.45 + i * 0.6, r = rows[i];
      await ui.iconDisc(s, r.icon, rx + 0.22, yy + 0.03, 0.4, { bg: C.accent1, bgTrans: 85, fg: HEX.dk2 });
      text(s, [
        { text: r.t, options: { bold: true, breakLine: true } },
        { text: r.d, options: { fontSize: 9, color: C.text2 } },
      ], { x: rx + 0.72, y: yy - 0.03, w: rw - 0.9, h: 0.6, fontSize: 10, color: C.text1 });
    }
  }
}

module.exports = { SECTION, build };
