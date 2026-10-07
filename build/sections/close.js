// Close section: closing vote (same facts as the opening), the commitment card, and the reusable decision checklist
// with a "Permission in India" column.
// Facts: facts/cdsco-guidance.md, facts/india-ecosystem.md, facts/india-class-licence.md, facts/prior-india-ethics.md,
// refs.js, storyboard_v2.json, notes/_legacy.js (v1 slides 23–25).
const SECTION = "Close";
const NB = " ";

async function build(ui, ctx) {
  const { C, S, M, W, HEX, text } = ui;

  // ------------------------------------------------------------------ cl-vote (legacy 23)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "cl-vote", kicker: "CLOSING VOTE", title: "Would you let a patient use it now?", core: true });
    text(s, "The same three facts as the opening vote", { x: M, y: 1.68, w: 6, h: 0.28, fontSize: 12, bold: true, color: C.accent6 });
    await ui.factRows(s, [
      { icon: "LuCpu", text: "A working prototype" },
      { icon: "LuDatabase", text: "Promising results on public datasets" },
      { icon: "LuFileCheck", text: "A test licence granted" },
    ], { y: 2.05, rowH: 0.8, fontSize: 18 });

    text(s, "Four questions to answer silently before you vote", { x: M, y: 4.38, w: 6, h: 0.28, fontSize: 12, bold: true, color: C.accent6 });
    const qs = ["Which patient?", "Which use?", "Which evidence?", "Who is responsible?"];
    qs.forEach((q, i) => ui.pill(s, M + (i % 2) * 2.98, 4.72 + Math.floor(i / 2) * 0.46, 2.85, q, { color: C.accent2, fill: true, h: 0.38, fontSize: 12, textColor: HEX.dk2 }));

    // Tally: opening split against the closing split.
    const ty = 5.78;
    [["Opening", ty], ["Now", ty + 0.46]].forEach(([label, yy]) => {
      text(s, label, { x: M, y: yy, w: 0.95, h: 0.36, fontSize: 11, bold: true, color: C.accent6, valign: "middle" });
      ["1 = ____", "2 = ____", "3 = ____"].forEach((t, i) => ui.pill(s, M + 1.0 + i * 1.65, yy, 1.5, t, { color: C.accent6, fill: false, dark: true, dash: true, h: 0.36, fontSize: 12 }));
    });

    text(s, "Same three options (one, two or three fingers)", { x: 7.0, y: 1.68, w: 5.73, h: 0.28, fontSize: 12, bold: true, color: C.accent6 });
    ui.optionCards(s, [
      { key: "1", label: "Routine care", sub: "Suitable for a clinician to recommend to patients now" },
      { key: "2", label: "Research study", sub: "Suitable for a study with ethics approval and consent" },
      { key: "3", label: "Not yet", sub: "I need more information before either" },
    ], { y: 2.05, h: 1.0, gap: 0.2 });

    text(s, "A patient-ready decision names", { x: 7.0, y: 5.5, w: 5.73, h: 0.26, fontSize: 11, bold: true, color: C.accent6 });
    const names = ["the patient", "the purpose", "the evidence", "the limits", "who answers"];
    const pw = (5.73 - 0.1 * 4) / 5;
    names.forEach((t, i) => ui.pill(s, 7.0 + i * (pw + 0.1), 5.8, pw, t, { color: C.accent6, fill: false, dark: true, h: 0.34, fontSize: 9.5 }));
    ui.callout(s, "Vote again. Then two people whose vote changed: what changed your mind?", { x: 7.0, y: 6.3, w: 5.73, h: 0.45, dark: true, color: C.accent2, fontSize: 11.5 });
  }

  // ------------------------------------------------------------------ cl-takeaway (legacy 24)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "cl-takeaway", kicker: "TAKEAWAY · 90 SECONDS", title: "Commit to one change in your own project", core: true });
    const cx = M, cw = 6.6, cy = 1.68, ch = 3.3;
    ui.card(s, cx, cy, cw, ch, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: "Commitment card" });
    s.addShape(S.RECTANGLE, { x: cx, y: cy, w: cw, h: 0.5, fill: { color: C.accent2 }, line: { type: "none" }, objectName: "Card header" });
    await ui.iconOnly(s, "LuNotebookPen", cx + 0.2, cy + 0.1, 0.3, HEX.dk2);
    text(s, "COMMITMENT CARD · one device, study or project you are working on", { x: cx + 0.6, y: cy, w: cw - 0.8, h: 0.5, fontSize: 11, bold: true, color: HEX.dk2, valign: "middle", charSpacing: 1 });
    const lines = [
      { lead: "Before ", blank: "(next step)", tail: "," },
      { lead: "I will ", blank: "(action)", tail: "." },
      { lead: "Owner: ", blank: "(name)", tail: "" },
      { lead: "I proceed only if ", blank: "(condition)", tail: "." },
    ];
    for (let i = 0; i < lines.length; i++) {
      const ly = cy + 0.75 + i * 0.66, l = lines[i];
      text(s, l.lead, { x: cx + 0.3, y: ly, w: 2.2, h: 0.4, fontSize: 16, bold: true, color: C.text1, valign: "middle" });
      const lx = cx + 0.3 + (i === 3 ? 2.15 : i === 2 ? 1.0 : 1.05), lw = cw - (lx - cx) - 0.3;
      s.addShape(S.LINE, { x: lx, y: ly + 0.38, w: lw, h: 0, line: { color: C.accent5, width: 1, dashType: "dash" }, objectName: `Blank ${l.blank}` });
      text(s, l.blank, { x: lx, y: ly + 0.4, w: lw, h: 0.22, fontSize: 9, italic: true, color: C.accent5 });
      text(s, l.tail, { x: cx + cw - 0.3, y: ly, w: 0.2, h: 0.4, fontSize: 16, bold: true, color: C.text1, valign: "middle" });
    }
    const timers = [{ icon: "LuTimer", t: `90${NB}s: write` }, { icon: "LuUsersRound", t: `60${NB}s: read it to a neighbour` }, { icon: "LuMegaphone", t: "Two examples for the room" }];
    const tg = 0.15, tw = (cw - 2 * tg) / 3;
    for (let i = 0; i < timers.length; i++) {
      const tx = cx + i * (tw + tg), ty = 5.13;
      ui.card(s, tx, ty, tw, 0.5, { fill: C.background2, radius: 0.25, name: `Timer ${timers[i].t}` });
      await ui.iconDisc(s, timers[i].icon, tx + 0.08, ty + 0.07, 0.36, { bg: C.accent2, fg: HEX.dk2 });
      text(s, timers[i].t, { x: tx + 0.52, y: ty, w: tw - 0.6, h: 0.5, fontSize: 10.5, bold: true, color: C.text1, valign: "middle" });
    }
    ui.callout(s, [
      { text: "Why a card: ", options: { bold: true } },
      { text: "Stanford Biodesign's Principled Decision-Making brief advises teams to write their ethical principles down early, before the pressured moment arrives. This exercise makes that advice personal; keep the card, or copy it into the printed checklist.", options: { bold: false } },
    ], { x: cx, y: 5.82, w: cw, h: 0.93, color: C.accent4, fontSize: 10.5, bold: false });

    // Right: worked example, then one example commitment per stage.
    const rx = 7.45, rw = W - M - rx;
    ui.card(s, rx, 1.68, rw, 1.5, { fill: C.background2, name: "Worked example" });
    s.addShape(S.RECTANGLE, { x: rx, y: 1.86, w: 0.07, h: 1.14, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "Example accent" });
    text(s, "Worked example", { x: rx + 0.22, y: 1.76, w: rw - 0.4, h: 0.26, fontSize: 11, bold: true, color: C.accent1 });
    text(s, "“Before our first home test, I will register the study on CTRI. Owner: me. I proceed only if the ethics committee approves and an independent outcome assessor is named.”", { x: rx + 0.22, y: 2.04, w: rw - 0.4, h: 1.1, fontSize: 11, italic: true, color: C.text1 });

    text(s, "One example commitment per stage", { x: rx, y: 3.33, w: rw, h: 0.26, fontSize: 12, bold: true, color: C.text2 });
    await ui.stepsVertical(s, [
      { title: "Need", detail: "Rewrite the need statement solution-neutral; screen it with ten users before inventing further" },
      { title: "Evidence", detail: "No ‘detects’ claim until tested on data from Indian patients, with results by subgroup" },
      { title: "People", detail: "Name an independent consent-taker before anyone is approached; consent in Odia or Hindi" },
      { title: "Permission", detail: `Confirm the risk class and hold the MD${NB}13 test licence before a unit leaves the lab` },
      { title: "Access", detail: "Cost the whole course for the household, not the device alone; decide rent or sell" },
      { title: "Safety", detail: "Serial number on every unit; ‘report a problem’ in the app; name who can pause a release" },
    ], { x: rx, y: 3.66, w: rw, rowH: 0.53, titleSize: 11, detailSize: 9.5, color: C.accent2 });
  }

  // ------------------------------------------------------------------ cl-checklist (legacy 25)
  {
    const s = ui.newSlide("REFERENCE", SECTION, { id: "cl-checklist", kicker: "REUSABLE TOOL", title: "Patient-impact decision checklist", core: true });
    const stageFill = { fill: { color: HEX.dk2 }, color: HEX.lt1, bold: true, fontSize: 11 };
    const indiaFill = { fill: { color: "E7ECF4" } };
    const go = "□ Go\n□ Not yet";
    ui.matrix(s, ["Stage", "The patient asks", "Evidence to see", "Permission in India (class · form · authority)", "Owner", "Decision"], [
      ["Need", "“Will it help me?”", "A solution-neutral need statement; intended use and claim in one sentence. The wording of the claim sets the evidence bar (Stanford Biodesign)", `Is it a device? D&C Act s.${NB}3(b)(iv): every device regulated since 1${NB}Apr${NB}2020. Risk class A–D by MDR-2017 Rule${NB}4 and the First Schedule; check CDSCO's classification lists`, "", go],
      ["Evidence", "“Is it proven, for people like me?”", `IDEAL-D stage reached; results by subgroup (MRCT 2020); an ISO${NB}14971 risk file; a version log for software`, `Prototypes: test licence MD${NB}12 → MD${NB}13 (CLA; ₹500 per device; 3${NB}years). Study: MD${NB}22 → MD${NB}23 with Seventh Schedule documents; CTRI before the first participant`, "", go],
      ["People", "“Can I say no? Who gains if I say yes?”", "Consent in the participant's language; an independent consent-taker where a patient depends on the researcher (Helsinki 2024, para 27); interests disclosed and managed (ICMR 2017)", `Ethics committee registered with CDSCO (NDCT Rules 2019, Rules${NB}7–8; MDR Rule${NB}50). Companies: UCMPMD 2024. Doctors: IMC 2002 cl.${NB}6.8`, "", go],
      ["Permission", "“Is it allowed for this use?”", `QMS to the Fifth Schedule (ISO${NB}13485-aligned); Essential Principles checklist; Rule${NB}44 labelling; software lifecycle and change control (CDSCO MDSW guidance, 21${NB}Jul${NB}2026)`, `Class A/B: MD${NB}3 → MD${NB}5, State Licensing Authority, notified-body audit. Class C/D: MD${NB}7 → MD${NB}9, CDSCO. Class A non-sterile non-measuring: registration only (G.S.R. 777(E), 2022). Import, any class: MD${NB}14 → MD${NB}15`, "", go],
      ["Access", "“Can I afford it and use it?”", "A capability audit (Cambridge toolkit) plus the Indian demands; the total cost of a course and who pays each step; claims matched to evidence", `NPPA under DPCO 2013: Para${NB}19 ceilings (stents and knee implants, 2017), Para${NB}20 MRP monitoring, trade-margin caps (2021). Claims: UCMPMD 2024, DMRA 1954, ASCI Code. Sellers: MD${NB}41 → MD${NB}42 (State)`, "", go],
      ["Safety", "“Who answers if it fails?”", "A named owner for each step of the harm loop; serial numbers and a registry; monitoring and a rollback trigger for every software change", `MvPI MDAE form (IPC; 1800${NB}180${NB}3024); licence holder reports serious events to CDSCO within 15${NB}days (circular 15${NB}May${NB}2024); PSUR 6-monthly × 2${NB}years, then yearly × 2; Rule${NB}43A suspension`, "", go],
    ], { x: M, y: 1.55, w: W - 2 * M, colW: [1.05, 1.85, 3.45, 3.73, 0.9, 1.15], rowH: 0.7, fontSize: 9, headFill: HEX.dk2,
      cellStyle: (r, c) => (c === 0 ? stageFill : c === 3 ? indiaFill : c === 4 ? { fill: { color: HEX.lt1 } } : c === 5 ? { fontSize: 9.5, color: HEX.dk2 } : null) });
    ui.callout(s, "A workshop synthesis, not a substitute for ethics, scientific, regulatory or quality review. Every ‘Not yet’ needs an owner and a condition for proceeding. A licence, patent, grant or famous partner is not evidence of readiness.", { x: M, y: 6.5, w: W - 2 * M, h: 0.36, color: C.accent3, fontSize: 9.5, bold: false });
  }
}

module.exports = { SECTION, build };
