// Section: Appendix (ap-*). Four REFERENCE tables for Q&A and the handout: forms, fees and clocks, CDSCO guidance, evidence to request.
// Facts: build/facts/india-class-licence.md, build/facts/cdsco-guidance.md, refs.js, notes/_legacy.js (slide 26). Nothing else.
const SECTION = "Appendix";
const NB = " "; // non-breaking space inside numbers, dates, form names and G.S.R. numbers

async function build(ui) {
  const { C, S, M, W, HEX, CLASS_COLORS, text } = ui;
  const STATE = "E6F2EF", CENTRAL = "E7ECF4"; // pale teal (State Licensing Authority) / pale indigo (Central, CDSCO)
  const MONTHS = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";
  // Keep numbers, dates, form names and gazette numbers on one line.
  const nb = (t) => String(t)
    .replace(/ (?=[\d₹$≈−])/g, NB)
    .replace(new RegExp(`(\\d) (?=(${MONTHS}|days|months|years|units|pages|lakh|crore|per|mm|patients|adults|trials|devices|categories|events)\\b)`, "g"), "$1" + NB)
    .replace(/G\.S\.R\. /g, "G.S.R." + NB)
    .replace(/Rule (?=\d)/g, "Rule" + NB)
    .replace(/Rules (?=\d)/g, "Rules" + NB)
    .replace(/Class (?=[A-D]\b)/g, "Class" + NB)
    .replace(/MD-(\d)/g, "MD‑$1"); // U+2011 non-breaking hyphen inside form names
  const cell = (t, o) => ({ text: nb(t), options: o || {} });
  const span = (t, n, o) => ({ text: nb(t), options: Object.assign({ colspan: n, align: "center" }, o || {}) });
  const legendPill = (s, x, y, w, label, color) => ui.pill(s, x, y, w, label, { color, fill: false, h: 0.3, fontSize: 9.5 });

  // ================================================================ ap-forms
  {
    const s = ui.newSlide("REFERENCE", SECTION, { id: "ap-forms", kicker: "APPENDIX · FORMS", title: "MDR-2017 forms at a glance" });
    const sla = { fill: { color: STATE }, color: HEX.accent1, bold: true, fontSize: 11, align: "center" };
    const cla = { fill: { color: CENTRAL }, color: HEX.accent4, bold: true, fontSize: 11, align: "center" };
    const rows = [
      ["Manufacture", "Class A, non-sterile and non-measuring", "Online registration", "Registration number", "Online portal", "G.S.R. 777(E), 14 Oct 2022: self-certified Essential Principles checklist and undertaking; no licence", "O"],
      ["Manufacture", "Class A sterile or measuring; Class B", "MD-3", "MD-5", "State (SLA)", "Rule 20; a Rule 13 notified body audits the site against the Fifth Schedule QMS", "S"],
      ["Manufacture", "Class C; Class D", "MD-7", "MD-9", "Central (CLA)", "Rules 21–23; CDSCO Medical Device Officers inspect the site before grant", "C"],
      ["Loan licence", "Class A; Class B", "MD-4", "MD-6", "State (SLA)", "Same fee as the manufacturing licence (Second Schedule)", "S"],
      ["Loan licence", "Class C; Class D", "MD-8", "MD-10", "Central (CLA)", "MD-10 issued by the CLA since G.S.R. 188(E), 6 Mar 2019", "C"],
      ["Test licence", "Make units for study, test, evaluation, demonstration or training", "MD-12", "MD-13", "Central (CLA)", "₹500 per device. FoGO holds MD-13 for 25 units (10 Aug 2026)", "C"],
      ["Test licence", "Import units for the same purposes", "MD-16", "MD-17", "Central (CLA)", "US$100 per device", "C"],
      ["Clinical investigation", "Investigational device, any class", "MD-22", "MD-23", "Central (CLA)", "Chapter VII; Seventh Schedule dossier, including the ethics committee approval", "C"],
      ["New device, no predicate", "Import or manufacture under Rule 63", "MD-26", "MD-27", "Central (CLA)", "Local study waivable if approved in the US, UK, Australia, Canada, Japan or EU (G.S.R. 744(E), 14 Aug 2026) and marketed 2 years", "C"],
      ["Import", "Any class, through an Indian authorised agent", "MD-14", "MD-15", "Central (CLA)", "Rules 34–36; decision within 9 months", "C"],
      ["Sale and distribution", "Any device, including IVDs", "MD-41", "MD-42", "State (SLA)", "Rule 87A (G.S.R. 754(E), 30 Sep 2022); ₹3,000; deemed granted unless rejected in 10 days", "S"],
    ];
    const who = rows.map((r) => r[6]);
    const body = rows.map((r) => r.slice(0, 6).map((v, ci) => cell(v, ci === 2 || ci === 3 ? { align: "center" } : {})));
    ui.matrix(s, ["Activity", "Class or scope", "Apply in", "Granted as", "Who decides", "Rule, schedule or note"], body, {
      y: 1.6, colW: [1.55, 2.55, 1.05, 1.05, 1.25, 4.68], rowH: [0.34, 0.44, 0.44, 0.34, 0.34, 0.34, 0.44, 0.34, 0.34, 0.44, 0.34, 0.44], fontSize: 10, headFill: HEX.dk2,
      cellStyle: (r, c) => {
        const k = who[r];
        if (c === 2 || c === 3) return k === "O" ? { fontSize: 9.5, color: HEX.dk2, bold: true, align: "center" } : Object.assign({}, k === "S" ? sla : cla);
        if (c === 4) return { fill: { color: k === "S" ? STATE : k === "C" ? CENTRAL : HEX.lt2 }, color: k === "S" ? HEX.accent1 : k === "C" ? HEX.accent4 : HEX.dk2, bold: true, fontSize: 9.5, align: "center" };
        if (c === 5 || c === 1) return { fontSize: 9.5, color: HEX.dk1 };
        return {};
      },
    });
    // Legend beside the title.
    legendPill(s, 8.6, 1.02, 1.85, "State · SLA (teal)", C.accent1);
    legendPill(s, 10.55, 1.02, 2.18, "Central · CDSCO, CLA (indigo)", C.accent4);
    text(s, [
      { text: "Also named in the Rules: ", options: { bold: true, color: C.text1 } },
      { text: nb("MD-2 and MD-40 are 'Certificates of Registration' alongside MD-42 (G.S.R. 743(E), 14 Aug 2026); MD-44, a test-report form, is proposed in draft G.S.R. 883(E), 4 Dec 2025. IVD performance-evaluation forms are omitted because their numbers were not verified. Every application is filed on cdscomdonline.gov.in."), options: {} },
    ], { x: M, y: 6.4, w: W - 2 * M, h: 0.4, fontSize: 9.5, color: C.text2, valign: "top" });
  }

  // ================================================================ ap-fees
  {
    const s = ui.newSlide("REFERENCE", SECTION, { id: "ap-fees", kicker: "APPENDIX · FEES AND TIMELINES", title: "Fees and statutory clocks by class (Second Schedule)" });
    const colW = [2.73, 2.35, 2.35, 2.35, 2.35];
    const header = ["Second Schedule fee", "Class A · low risk", "Class B · low–moderate", "Class C · moderate–high", "Class D · high"];
    // Class colour bars above the four class columns.
    let bx = M + colW[0];
    ["A", "B", "C", "D"].forEach((k, i) => { s.addShape(S.RECTANGLE, { x: bx + 0.02, y: 1.5, w: colW[i + 1] - 0.04, h: 0.07, fill: { color: CLASS_COLORS[k] }, line: { type: "none" }, objectName: `Class bar ${k}` }); bx += colW[i + 1]; });
    const c4 = (v) => cell(v, { align: "center" });
    const feeRows = [
      [cell("Who licenses manufacture"), c4("State Licensing Authority"), c4("State Licensing Authority"), c4("Central Licensing Authority (CDSCO)"), c4("Central Licensing Authority (CDSCO)")],
      [cell("Manufacturing or loan licence · MD-5/MD-6 (A, B) · MD-9/MD-10 (C, D)"), c4("₹5,000/site + ₹500/device (non-sterile, non-measuring: registration only)"), c4("₹5,000/site + ₹500/device"), c4("₹50,000/site + ₹1,000/device"), c4("₹50,000/site + ₹1,000/device")],
      [cell("Retention fee every 5 years (licence is perpetual)"), c4("₹5,000/site + ₹500/device"), c4("₹5,000/site + ₹500/device"), c4("₹50,000/site + ₹1,000/device"), c4("₹50,000/site + ₹1,000/device")],
      [cell("Import licence · MD-15 (US dollars)"), c4("US$1,000/site + US$50/device"), c4("US$2,000/site + US$1,000/device"), c4("US$3,000/site + US$1,500/device"), c4("US$3,000/site + US$1,500/device")],
      [cell("Test licence · MD-13 (make) · MD-17 (import)"), span("All classes: ₹500 per device to make (MD-13) · US$100 per device to import (MD-17)", 4)],
      [cell("Sale registration · MD-42 (Rule 87A)"), span("All classes: ₹3,000, with a ₹3,000 retention fee", 4)],
    ];
    ui.matrix(s, header, feeRows, {
      y: 1.6, colW, rowH: [0.34, 0.34, 0.46, 0.34, 0.34, 0.34, 0.34], fontSize: 10, headFill: HEX.dk2,
      cellStyle: (r, c) => {
        if (c === 0) return { fontSize: 9.5 };
        if (r === 0) return { fill: { color: c <= 2 ? STATE : CENTRAL }, color: c <= 2 ? HEX.accent1 : HEX.accent4, bold: true, fontSize: 9.5 };
        return { fontSize: 9.5 };
      },
    });
    const clockRows = [
      [cell("Manufacturing licence, current rules"), c4("Licence on documents within 45 days (no prior audit); notified-body audit within 120 days after grant"), c4("Notified-body audit within 90 days, before grant; reported end-to-end: up to 140 days"), c4("Inspection within 60 days (Rule 23(1)); decision within 45 days of the report (Rule 21(4)); reported: 105 to 150 days"), c4("As Class C")],
      [cell("Draft G.S.R. 515(E), 23 Jun 2026 (not final on 7 Oct 2026)"), c4("No change proposed"), c4("30 + 30 + 20 + 15 + 20 days: 140 → 115 days"), c4("Rule 21(4) 45 → 30 days; Rule 23(1) 60 → 55 days: 105 → 90 days"), c4("As Class C")],
      [cell("Import licence · MD-15; retention fee missed"), span("Import: decision within 9 months of application (6 to 9 months in practice). Retention: late fee 2% a month; licence deemed cancelled after 180 days unpaid (manufacture) or 90 days (import)", 4)],
    ];
    ui.matrix(s, ["Statutory clock", "Class A", "Class B", "Class C", "Class D"], clockRows, {
      y: 4.25, colW, rowH: [0.34, 0.62, 0.48, 0.48], fontSize: 10, headFill: HEX.accent4,
      cellStyle: (r, c) => {
        if (c === 0) return { fontSize: 9.5 };
        if (r === 1) return { fontSize: 9.5, fill: { color: "FBF1E3" }, color: HEX.dk1 };
        return { fontSize: 9.5 };
      },
    });
    ui.callout(s, [
      { text: "Where the numbers come from: ", options: { bold: true } },
      { text: nb("Second Schedule, Medical Devices Rules 2017 (G.S.R. 78(E), 31 Jan 2017). G.S.R. 743(E), 14 Aug 2026, adds a Ninth Schedule of testing fees under Rules 19 and 69 (amounts not captured). Draft G.S.R. 883(E), 4 Dec 2025, restates perpetual validity for MD-2, MD-5, MD-6, MD-9, MD-10 and MD-15. Clinical-investigation (MD-22) fee: verify on cdscomdonline.gov.in before quoting."), options: { bold: false } },
    ], { y: 6.32, h: 0.46, fontSize: 9.5, color: C.accent2 });
  }

  // ================================================================ ap-guidance
  {
    const s = ui.newSlide("REFERENCE", SECTION, { id: "ap-guidance", kicker: "APPENDIX · CDSCO GUIDANCE", title: "CDSCO documents to keep at hand" });
    const rows = [
      ["Medical Devices Rules, 2017 (consolidated text)", "G.S.R. 78(E); 'mdr, 2017' PDF on cdsco.gov.in", "31 Jan 2017; in force 1 Jan 2018", "Classes A–D (Rule 4, First Schedule); licences by class; Fifth Schedule QMS; Rule 44 labelling; Chapter VII clinical investigation; Rule 63 devices without a predicate", "In force"],
      ["FAQ on Medical Devices Rules, 2017", "CDSCO/FAQ/MD/01/2018; IVD FAQ 03-2022; addendum", "2018; Mar 2022", "Licensing in plain language; Rule 13 notified bodies (NABCB-accredited) audit Class A and B sites; IVD examples: specimen tubes Class A, alcohol analyser Class B", "Final"],
      ["Regulatory pathway under MDR-2017", "RegulatoryMDR-2017.pdf", "—", "One-sheet map of forms and authorities: MD-3/MD-5 and MD-7/MD-9 manufacture, MD-14/MD-15 import, MD-12/MD-13 test licence", "Overview"],
      ["Device classification lists", "Public notices of 3 Sep 2020; category-wise lists", "3 Sep 2020 onward", "About 1,866 devices in 24 categories (Class B alone 779) and 80 IVDs in 3; later: paediatric (23 Aug 2021), cardiovascular revised (Apr 2025), interventional radiology (187)", "Living lists"],
      ["Checklist for Form MD-22", "ChecklisFormMD-22MD.pdf", "—", "Seventh Schedule dossier: investigation plan, investigator's brochure, design V&V, Essential Principles checklist, consent form, ethics approval; pilot, pivotal or post-marketing", "Checklist"],
      ["Guidance on Medical Device Software", "CDSCO/MD/GD/MDSW/01/2026", "21 Jul 2026 (draft 21 Oct 2025)", "62 pages: SaMD, software in devices, cloud and networked systems, AI/ML, IVD software; class by intended use; lifecycle, cybersecurity, AI change planning, post-market duties", "Final"],
      ["Guidance on post-market surveillance", "'Draft Guidance on PMS' (2018); CDSCO/IVD/GD/PMS/01/2022", "2018; 7 Jul 2022", "PMS expectations for licence holders; the IVD draft targets Class C and D and point-of-care or home-use IVDs; neither reported as finalised", "Draft"],
      ["Materiovigilance circular and forms", "Circular of 15 May 2024; MvPI MDAE form v1.2; IPC draft IVD-MD AE form", "15 May 2024; 17 Feb 2025", "Every licence holder reports suspected unexpected serious adverse events to MvPI (IPC; helpline 1800-180-3024); FSCA form for recalls and corrections", "Circular"],
      ["Fee help file; testing laboratories", "nmd_fee.pdf (cdscomdonline.gov.in); gazette 2237.pdf", "2017; 2018", "Second Schedule fees by class; Central Medical Device Testing Laboratories: NIB Noida (IVDs), CDTL Chennai, CDL Kolkata, RDTL Guwahati, CDTL Mumbai", "Reference"],
    ];
    const statusStyle = (v) => v === "In force" || v === "Final" ? { fill: { color: HEX.accent1 }, color: HEX.lt1, bold: true, align: "center" }
      : v === "Draft" ? { fill: { color: HEX.accent2 }, color: HEX.lt1, bold: true, align: "center" }
      : { fill: { color: HEX.lt2 }, color: HEX.dk2, bold: true, align: "center" };
    ui.matrix(s, ["Document", "Number or file", "Date", "What it covers", "Status"], rows.map((r) => r.map((v) => cell(v))), {
      y: 1.6, colW: [2.25, 2.3, 1.3, 5.18, 1.1], rowH: [0.34, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 0.42], fontSize: 10, headFill: HEX.dk2,
      cellStyle: (r, c, v) => (c === 4 ? statusStyle(v) : c === 3 ? { fontSize: 9.5 } : c === 1 || c === 2 ? { fontSize: 9.5, color: HEX.dk2 } : {}),
    });
    // Amendment strip: the gazette notifications a team must know, in date order.
    const am = [
      { n: "G.S.R. 102(E)", d: "11 Feb 2020", t: "All devices regulated from 1 Apr 2020; Chapter IIIA registration", c: C.accent4 },
      { n: "G.S.R. 754(E)", d: "30 Sep 2022", t: "Rule 87A: MD-41 → MD-42 for sale, stocking and distribution", c: C.accent4 },
      { n: "G.S.R. 777(E)", d: "14 Oct 2022", t: "Class A non-sterile non-measuring: registration, no licence", c: C.accent4 },
      { n: "G.S.R. 743(E)", d: "14 Aug 2026", t: "Rule 44(p) sterilisation-site label from 14 Feb 2027; Ninth Schedule", c: C.accent1 },
      { n: "G.S.R. 744(E)", d: "14 Aug 2026", t: "EU approvals added to the Rule 63 waiver; Class A QMS self-certification", c: C.accent1 },
      { n: "Drafts", d: "4 Dec 2025 · 23 Jun 2026", t: "G.S.R. 883(E): perpetual validity, MD-44. G.S.R. 515(E): licence clocks", c: C.accent2 },
    ];
    const gap = 0.14, cw = (W - 2 * M - gap * (am.length - 1)) / am.length, cy = 6.1, ch = 0.7;
    text(s, "Amendments to know, by gazette number", { x: M, y: 5.86, w: 6, h: 0.22, fontSize: 9.5, bold: true, color: C.accent5 });
    am.forEach((a, i) => {
      const x = M + i * (cw + gap);
      ui.card(s, x, cy, cw, ch, { fill: C.background2, name: `Amendment ${a.n}` });
      s.addShape(S.RECTANGLE, { x, y: cy + 0.1, w: 0.06, h: ch - 0.2, fill: { color: a.c }, line: { type: "none" }, objectName: "Amendment bar" });
      text(s, [{ text: nb(a.n) + " · ", options: { bold: true, color: a.c } }, { text: nb(a.d), options: { color: C.accent5, breakLine: true } }, { text: nb(a.t), options: { color: C.text1 } }], { x: x + 0.16, y: cy + 0.05, w: cw - 0.24, h: ch - 0.1, fontSize: 9, valign: "middle", paraSpaceAfter: 1 });
    });
  }

  // ================================================================ ap-evidence-requests (legacy slide 26 as a matrix)
  {
    const s = ui.newSlide("REFERENCE", SECTION, { id: "ap-evidence-requests", kicker: "APPENDIX · CASE REVIEW", title: "Evidence to request before stronger claims" });
    const rows = [
      ["Outcome", "Freeze detection against video-annotated events; then falls, confidence and walking outcomes, not only an F1 score", "Pain and function against patient-important thresholds; structural (cartilage) outcomes only if structural claims are made", "Daphnet benchmark: 10 patients, 237 video-labelled events, laboratory (2010). Knee-OA pain MCII: −19.9 mm, −40.8% (Tubach 2005)"],
      ["Comparison", "Participant-level validation on unseen users; cue versus no-cue or sham cue", "Randomised, blinded, sham-controlled; prospectively registered (CTRI); co-interventions recorded", "RESCUE trial: n = 153, home cueing, modest gait gains, falls not counted (2007). Cochrane 2013: 9 trials, 636 adults, pain about 15/100 better than sham"],
      ["Who and where", "Disease stage, walking aids; homes, turns and doorways, not only the laboratory", "Age, BMI, severity, comorbidities; rural access and supervision", "Wearable reviews: sensitivity 73–100%, specificity 67–100%, mostly laboratory (2017). Knee OA 28.7% in a five-site Indian community survey (2016)"],
      ["Burden and harm", "False cues per hour and latency in real use; missed events, signal loss, skin, data", "Adverse events; adherence to 45-minute daily sessions over 45 days; support needs; durability after the course", "ISO 14971:2019 risk management; IEC 62366-1 usability engineering; ISO 14155:2026 good clinical practice for device studies"],
      ["Version", "Firmware and model version stated for every result", "Controller and applicator version stated for every result", "CDSCO software guidance (21 Jul 2026): software lifecycle and AI change planning"],
      ["Status today", "Public datasets only: F1 0.83–0.85 subject-wise, 0.74–0.80 cross-dataset; 0.15–0.18 false alarms per minute; MD-13 test licence for 25 units (10 Aug 2026); AIIMS Bhubaneswar proof-of-concept planned", "Company-reported 45-day comparison: n = 40 vs 42, about 32% vs 14% VAS pain reduction; not peer-reviewed; OARSI 2019 and NICE NG226 advise against electrotherapy for OA", "IDEAL-D: evaluate devices in stages, with the claim matched to the stage (Sedrakyan 2016)"],
    ];
    ui.matrix(s, ["Question", "FoGO · freezing-of-gait wearable (Class B, proposed)", "SwaKnee · PEMF knee system", "Benchmark or standard"], rows.map((r) => r.map((v) => cell(v))), {
      y: 1.6, colW: [1.45, 3.85, 3.85, 2.98], rowH: [0.36, 0.58, 0.58, 0.58, 0.58, 0.42, 0.72], fontSize: 10, headFill: HEX.dk2,
      cellStyle: (r, c) => {
        if (r === 5 && c > 0) return { fill: { color: "FBF1E3" }, fontSize: 9.5 };
        if (c === 3) return { fontSize: 9.5, color: HEX.dk2 };
        return {};
      },
    });
    // Status panel: both devices sit at the same evidence step; the rule for Q&A.
    const py = 5.72, ph = 1.06, pw = (W - 2 * M - 2 * 0.2) / 3;
    const panel = async (i, title, chip, body, icon, col) => {
      const x = M + i * (pw + 0.2);
      ui.card(s, x, py, pw, ph, { fill: C.background2, name: `Status ${title}` });
      await ui.iconDisc(s, icon, x + 0.16, py + 0.14, 0.4, { bg: col, bgTrans: 85, fg: HEX.dk2 });
      text(s, title, { x: x + 0.66, y: py + 0.14, w: chip ? pw - 2.85 : pw - 0.9, h: 0.4, fontSize: 11.5, bold: true, valign: "middle", color: C.text1 });
      if (chip) ui.statusChip(s, x + pw - 2.0, py + 0.17, chip, { w: 1.85 });
      text(s, nb(body), { x: x + 0.16, y: py + 0.6, w: pw - 0.32, h: ph - 0.66, fontSize: 9.5, color: C.text2 });
    };
    await panel(0, "FoGO", "reported", "Detection on public data and a bench cue study; no person with Parkinson's has yet used it at home. The claim today: 'being developed to detect and cue'.", "LuFootprints", C.accent1);
    await panel(1, "SwaKnee", "reported", "One company-reported comparison, not peer-reviewed; OARSI and NICE guidelines advise against the modality. The claim today: 'reported pain reduction in one study'.", "LuBone", C.accent2);
    await panel(2, "Rule for the Q&A", null, "Before accepting a stronger adjective (validated, proven, safe), ask which row above it rests on, and which device version produced the number.", "LuScale", C.accent4);
  }
}

module.exports = { SECTION, build };
