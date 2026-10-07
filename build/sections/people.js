// People section: divider, decision 2 (inventor-neurologist), consent in India, conflicts of interest.
// Facts: facts/cdsco-guidance.md, facts/prior-india-ethics.md, facts/prior-intl-evidence.md, facts/prior-india-sources.md,
// refs.js, storyboard_v2.json, notes/_legacy.js (slides 10, 15, 16, 21).
const SECTION = "People";
const NB = " "; // non-breaking space inside numbers, dates and rule references

async function build(ui, ctx) {
  const { C, S, M, W, HEX, text } = ui;

  // ------------------------------------------------------------------ pp-div
  {
    const s = await ui.sectionDivider(SECTION, {
      id: "pp-div", num: 2, kicker: "PART 2 · PEOPLE",
      title: "Can they say no, and who gains if they say yes?",
      blurb: "Consent that is free and understood, and interests that are declared and managed: the people side of translation, under Indian rules.",
      items: [
        { icon: "LuHand", text: "Decision 2 of 5: Ramesh's neurologist is also the inventor" },
        { icon: "LuListChecks", text: "What valid consent requires in India: ICMR 2017, NDCT 2019, Helsinki 2024" },
        { icon: "LuScale", text: "Conflicts of interest: disclose, then manage; the rules in India and abroad" },
      ],
    });
    // Right-hand panel: three questions a participant would ask, each with the rule that answers it.
    const px = 8.9, py = 1.5, pw = 3.85, ph = 4.5;
    s.addShape(S.ROUNDED_RECTANGLE, { x: px, y: py, w: pw, h: ph, rectRadius: 0.14, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 1 }, objectName: "Participant questions panel" });
    text(s, "WHAT A PARTICIPANT WOULD ASK", { x: px + 0.25, y: py + 0.22, w: pw - 0.5, h: 0.3, fontSize: 10, bold: true, color: C.accent2, charSpacing: 1.5 });
    const qs = [
      { icon: "LuHand", q: "“Can I freely say no?”", a: `Helsinki 2024, para${NB}27: in a dependent relationship, consent must be sought by someone independent of it` },
      { icon: "LuLanguages", q: "“Do I understand what I am agreeing to?”", a: `ICMR 2017, s.${NB}5: a language the participant understands; an impartial witness if they cannot read` },
      { icon: "LuScale", q: "“Who gains if I say yes?”", a: `ICMR 2017: interests disclosed to the ethics committee; IMC 2002 cl.${NB}6.8 and UCMPMD 2024 for doctors and companies` },
    ];
    for (let i = 0; i < qs.length; i++) {
      const yy = py + 0.72 + i * 1.22;
      await ui.iconDisc(s, qs[i].icon, px + 0.25, yy + 0.02, 0.5, { bg: C.accent2, fg: HEX.dk2 });
      text(s, [
        { text: qs[i].q, options: { bold: true, fontSize: 13, color: C.background1, breakLine: true } },
        { text: qs[i].a, options: { fontSize: 10, color: C.accent6 } },
      ], { x: px + 0.9, y: yy - 0.04, w: pw - 1.15, h: 1.15, fontSize: 13, paraSpaceAfter: 2 });
    }
  }

  // ------------------------------------------------------------------ pp-decision2 (legacy 15)
  {
    const s = ui.newSlide("DARK", SECTION, { id: "pp-decision2", kicker: "WOULD YOU PROCEED? 2/5", title: "His neurologist is the inventor", stage: 2, core: true });
    text(s, "A fictional vignette built on real consent rules; it describes neither project's actual procedure", { x: M, y: 1.72, w: 6.1, h: 0.3, fontSize: 10.5, italic: true, color: C.accent6 });
    await ui.factRows(s, [
      { icon: "LuMessageCircleQuestion", text: "“Will saying no change my care?”" },
      { icon: "LuFileText", text: "Consent form: English only" },
      { icon: "LuMapPin", text: `Only neurologist within 100${NB}km` },
    ], { y: 2.15, rowH: 1.22, fontSize: 18 });
    // Twist strip (optional, if time allows).
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 5.45, w: 5.9, h: 0.52, rectRadius: 0.1, fill: { color: C.background1, transparency: 92 }, line: { color: C.accent2, width: 1, dashType: "dash" }, objectName: "Twist strip" });
    await ui.iconDisc(s, "LuVideo", M + 0.12, 5.54, 0.34, { bg: C.accent2, fg: HEX.dk2 });
    text(s, [
      { text: "Twist, if time allows: ", options: { bold: true, color: C.accent2 } },
      { text: "the clinic also wants to film him for a talk. Does that change your vote?", options: { color: C.background1 } },
    ], { x: M + 0.58, y: 5.45, w: 5.2, h: 0.52, fontSize: 11.5, valign: "middle" });
    ui.callout(s, "Vote A, B or C. Then 60 seconds of role-play: Ramesh, the recruiting neurologist, an observer. Observer: what would make refusal easier?", { x: M, y: 6.15, w: 5.9, h: 0.6, dark: true, color: C.accent2, fontSize: 11.5 });

    text(s, "Three options", { x: 7.0, y: 1.72, w: 5.73, h: 0.3, fontSize: 12, bold: true, color: C.accent6 });
    ui.optionCards(s, [
      { key: "A", label: "Recruit as planned", sub: "The neurologist takes consent himself, this week" },
      { key: "B", label: "Proceed with safeguards", sub: "Which ones? Name two" },
      { key: "C", label: "Not yet", sub: "Fix the consent process before anyone is approached" },
    ], { y: 2.1, h: 1.15, gap: 0.25 });
    // Who answers what: the three fixes an ethics committee would expect, as pills under the options.
    const fixes = ["Independent consent-taker", "Odia or Hindi, teach-back", "Interest disclosed to the EC"];
    fixes.forEach((f, i) => ui.pill(s, 7.0 + i * 1.95, 6.25, 1.83, f, { color: C.accent6, fill: false, dark: true, dash: true, h: 0.34, fontSize: 9.5 }));
  }

  // ------------------------------------------------------------------ pp-consent-india
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "pp-consent-india", kicker: "PEOPLE · CONSENT IN INDIA", title: "What valid consent requires in India", stage: 2 });
    const lx = M, lw = 6.55;
    text(s, "Eight requirements of valid consent · ICMR 2017 ss. 5–7 · NDCT Rules 2019", { x: lx, y: 1.62, w: lw, h: 0.28, fontSize: 12, bold: true, color: C.text2 });
    await ui.stepsVertical(s, [
      { title: "Information, key facts first", detail: `Purpose, procedures, risks, benefits, alternatives; the US Common Rule (45${NB}CFR${NB}46.116) starts with key information` },
      { title: "A language the participant understands", detail: "Odia or Hindi, not English only; plain words; teach-back (MRCT plain-language glossary)" },
      { title: "An impartial witness if the participant cannot read", detail: "A literate witness unconnected to the research signs with the participant (ICMR 2017, s. 5)" },
      { title: "Legally authorised representative where capacity is impaired", detail: "Fluctuating cognition, older and dependent people: LAR consent plus assent (ICMR 2017, s. 6)" },
      { title: "Audio-visual recording where the rules require it", detail: "NDCT Rules: vulnerable participants in new-drug trials; ICMR allows AV documentation, witness in frame" },
      { title: "Re-consent when anything material changes", detail: "New risks, a new software version or protocol: ethics-committee amendment, then the participant again" },
      { title: "Withdrawal at any time, without penalty", detail: "Refusal or withdrawal must not change care (ICMR 2017; CIOMS 2016 Guideline 9)" },
      { title: "Compensation for research-related injury", detail: "Free medical management and compensation; insurance is on the CDSCO Form MD-22 checklist" },
    ], { x: lx, y: 2.0, w: lw, rowH: 0.585, titleSize: 11.5, detailSize: 9.5 });

    // Right column: the gate before the first participant, then three special cases.
    const rx = 7.45, rw = W - M - rx;
    ui.card(s, rx, 1.62, rw, 1.66, { fill: C.background2, name: "Gate panel" });
    s.addShape(S.RECTANGLE, { x: rx, y: 1.82, w: 0.07, h: 1.26, fill: { color: C.accent4 }, line: { type: "none" }, objectName: "Gate accent" });
    text(s, "Before the first participant is approached", { x: rx + 0.25, y: 1.7, w: rw - 0.4, h: 0.28, fontSize: 12, bold: true, color: C.accent4 });
    const gate = [
      { icon: "LuBadgeCheck", t: "Ethics committee registered with CDSCO", d: `NDCT Rules 2019, Rules${NB}7–8; MDR-2017 refers to the ethics committee in Rule${NB}50` },
      { icon: "LuFileCheck", t: "CLA permission, Form MD-22 → MD-23", d: "Seventh Schedule: consent form, investigation plan, insurance; start within one year" },
      { icon: "LuClipboardCheck", t: "CTRI registration", d: "prospectively, before the first participant is enrolled; pre-specified outcomes" },
    ];
    for (let i = 0; i < gate.length; i++) {
      const gy = 2.02 + i * 0.4, g = gate[i];
      await ui.iconDisc(s, g.icon, rx + 0.25, gy + 0.02, 0.32, { bg: C.accent4, bgTrans: 80, fg: HEX.dk2 });
      text(s, [
        { text: g.t, options: { bold: true, color: C.text1 } },
        { text: " · " + g.d, options: { fontSize: 9.5, color: C.text2 } },
      ], { x: rx + 0.68, y: gy, w: rw - 0.85, h: 0.38, fontSize: 10.5, valign: "middle" });
    }

    text(s, "Three special cases", { x: rx, y: 3.42, w: rw, h: 0.26, fontSize: 12, bold: true, color: C.text2 });
    const cases = [
      { icon: "LuStethoscope", color: C.accent3, t: `Dependent relationship · Helsinki 2024, para${NB}27`, d: "Consent must be sought by an appropriately qualified person independent of that relationship; disclose the inventor's interest (CIOMS 2016, Guideline 25)." },
      { icon: "LuShieldAlert", color: C.accent2, t: `Vulnerable participants · ICMR 2017, s.${NB}6`, d: "Fluctuating cognition, old age, poverty or dependence on the clinic: extra ethics-committee scrutiny, LAR consent with assent, caregivers involved." },
      { icon: "LuCamera", color: C.accent4, t: "Filming and recordings · separate consent", d: "Specific, revocable, in writing for public media; a gait video identifies a person; never a condition of care or of study entry (UK GMC as comparator)." },
    ];
    const cy0 = 3.74, ch = 0.92, cg = 0.09;
    for (let i = 0; i < cases.length; i++) {
      const cy = cy0 + i * (ch + cg), c = cases[i];
      ui.card(s, rx, cy, rw, ch, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: `Case ${c.t}` });
      s.addShape(S.RECTANGLE, { x: rx, y: cy + 0.16, w: 0.07, h: ch - 0.32, fill: { color: c.color }, line: { type: "none" }, objectName: "Case accent" });
      await ui.iconDisc(s, c.icon, rx + 0.22, cy + 0.08, 0.34, { bg: c.color, bgTrans: 80, fg: HEX.dk2 });
      text(s, c.t, { x: rx + 0.66, y: cy + 0.06, w: rw - 0.85, h: 0.38, fontSize: 11, bold: true, valign: "middle", color: C.text1 });
      text(s, c.d, { x: rx + 0.22, y: cy + 0.44, w: rw - 0.4, h: ch - 0.46, fontSize: 9.5, color: C.text2 });
    }
  }

  // ------------------------------------------------------------------ pp-coi (legacy 16)
  {
    const s = ui.newSlide("CONTENT", SECTION, { id: "pp-coi", kicker: "CONFLICTS OF INTEREST", title: "Disclose, then manage", stage: 2, core: true });
    const cols = [
      { title: "Interests", color: C.accent5, icon: "LuCoins", rows: [
        { icon: "LuCoins", t: "Equity, royalties or salary from the company that will sell the device" },
        { icon: "LuBanknote", t: `Grants and institutional reputation: ₹25.5${NB}lakh received; a BIRAC BIG proposal under review` },
        { icon: "LuAward", t: "Personal reputation as inventor, clinician and principal investigator" },
      ] },
      { title: "Risks", color: C.accent3, icon: "LuTriangleAlert", rows: [
        { icon: "LuUsers", t: "Pressure to enrol dependent patients: Ramesh and his only neurologist" },
        { icon: "LuEye", t: "Optimistic reading of outcomes; participants assume research is care chosen for them" },
        { icon: "LuFileX", t: `Selective reporting: industry-sponsored drug and device studies reach favourable conclusions more often, RR${NB}1.34 (Lundh 2017)` },
      ] },
      { title: "Safeguards", color: C.accent1, icon: "LuShieldCheck", rows: [
        { icon: "LuUserCheck", t: "Independent consent-taker and independent outcome assessor" },
        { icon: "LuClipboardList", t: "Prospective CTRI registration with pre-specified outcomes" },
        { icon: "LuBookOpen", t: "Publish every result, null and negative included; plain-language summary to participants (MRCT 2017)" },
      ] },
    ];
    const gap = 0.18, cw = (W - 2 * M - 2 * gap) / 3, hy = 1.68, hh = 0.5, by = hy + hh + 0.12, bh = 2.2;
    ui.chevronFlow(s, cols.map((c) => ({ title: c.title, color: c.color })), { y: hy, h: hh, gap, fontSize: 13 });
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i], cx = M + i * (cw + gap);
      ui.card(s, cx, by, cw, bh, { fill: C.background1, line: { color: "E3EAE8", width: 0.75 }, shadowOn: true, name: `COI column ${c.title}` });
      s.addShape(S.RECTANGLE, { x: cx, y: by + 0.2, w: 0.07, h: bh - 0.4, fill: { color: c.color }, line: { type: "none" }, objectName: `COI accent ${c.title}` });
      for (let j = 0; j < c.rows.length; j++) {
        const yy = by + 0.18 + j * 0.66, r = c.rows[j];
        await ui.iconDisc(s, r.icon, cx + 0.25, yy + 0.08, 0.38, { bg: c.color, bgTrans: 80, fg: HEX.dk2 });
        text(s, r.t, { x: cx + 0.75, y: yy, w: cw - 0.95, h: 0.58, fontSize: 10.5, valign: "middle", color: C.text1 });
      }
    }

    // Rules strip: India vs abroad.
    const sy = by + bh + 0.22;
    text(s, "THE RULES, IN INDIA AND ABROAD", { x: M, y: sy, w: 6, h: 0.24, fontSize: 9.5, bold: true, color: C.accent5, charSpacing: 2 });
    text(s, "None of these replaces project-level management: independent consent and assessment, a registered protocol, full publication.", { x: 4.0, y: sy, w: W - M - 4.0, h: 0.24, fontSize: 9.5, italic: true, align: "right", color: C.accent5 });
    const rows = [
      { label: "India", flags: ["IN"], color: C.accent1, y: sy + 0.32, cards: [
        { t: `UCMPMD 2024 (amended 30${NB}Apr${NB}2026)`, d: `Voluntary code for device companies (DoP circular, 6${NB}Sep${NB}2024): no gifts, travel or hospitality for health professionals; claims accurate and capable of substantiation; complaints to ECMPMD within 90${NB}days` },
        { t: `IMC 2002 Regulations, clause${NB}6.8`, d: `Doctors: no gifts, travel or hospitality from the pharmaceutical and allied health industry (inserted 10${NB}Dec${NB}2009); the NMC 2023 regulations have been in abeyance since 23${NB}Aug${NB}2023` },
        { t: "ICMR 2017 · NDCT Rules 2019", d: "Interests disclosed to the ethics committee and in the consent conversation; an ethics committee registered with CDSCO reviews the investigation plan" },
      ] },
      { label: "Abroad", flags: ["US", "GB"], color: C.accent4, y: sy + 0.32 + 1.0, cards: [
        { t: "USA · Open Payments (Sunshine Act)", d: "Manufacturers of drugs and devices report consulting fees, travel, research payments, royalties and ownership interests to physicians every year; CMS publishes them" },
        { t: "USA · Harvard Medical School policy, 2010", d: "From disclosure to limits: faculty barred from industry speakers' bureaus; the model for ‘disclose, then manage’ in this session" },
        { t: "UK · Cumberlege Review, 2020", d: "First Do No Harm recommended an expanded GMC register of all doctors' financial and non-pecuniary interests, a Patient Safety Commissioner and device registries" },
      ] },
    ];
    const lw = 1.15, cg = 0.12, ccw = (W - 2 * M - lw - 3 * cg) / 3, rh = 0.9;
    for (const r of rows) {
      s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: r.y, w: lw, h: rh, rectRadius: 0.1, fill: { color: r.color }, line: { type: "none" }, objectName: `Rules row ${r.label}` });
      let fx = M + 0.12;
      for (const f of r.flags) { await ui.flag(s, f, fx, r.y + 0.12, 0.42); fx += 0.5; }
      text(s, r.label, { x: M + 0.1, y: r.y + 0.46, w: lw - 0.2, h: 0.36, fontSize: 12, bold: true, color: C.background1, valign: "middle" });
      for (let i = 0; i < r.cards.length; i++) {
        const cx = M + lw + cg + i * (ccw + cg), c = r.cards[i];
        ui.card(s, cx, r.y, ccw, rh, { fill: C.background2, name: `Rule ${c.t}` });
        text(s, [
          { text: c.t, options: { bold: true, fontSize: 10.5, color: C.text1, breakLine: true } },
          { text: c.d, options: { fontSize: 9, color: C.text2 } },
        ], { x: cx + 0.15, y: r.y + 0.07, w: ccw - 0.3, h: rh - 0.12, fontSize: 10.5, paraSpaceAfter: 1 });
      }
    }
  }
}

module.exports = { SECTION, build };
