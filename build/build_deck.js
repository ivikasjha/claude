// Builds "Bridging the Gap: From Innovation to Patient Impact" as an editable PPTX.
// Run: NODE_PATH=./node_modules node build_deck.js
const path = require("path");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.APPLY_THEME ||
  "/root/.claude/skills/synced/e64227f8-9add-4a33-ad4c-9b0127e5f904_84b42636-2ecb-4c0e-9e08-f3cf6f9cd1cd/pptx/scripts/apply_theme.js");
const { THEME, HEX, W, M, img, vid, dataUri, icon, STATUS } = require("./lib");
const { NOTES, SOURCE_LINE, REFS } = require("./notes");

const OUT = process.argv[2] || path.join(__dirname, "..", "deck", "From_Innovation_to_Patient_Impact.pptx");

const STAGES = ["Need", "Evidence", "People", "Permission", "Access", "Safety"];

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "Bridging the Gap: From Innovation to Patient Impact";
  pres.subject = "Ethics, Evidence, Regulation and Responsible Medical Device Translation";
  pres.author = "Dr Vikas Kumar Jha";
  pres.company = "KIIT University, Bhubaneswar";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const C = pres.SchemeColor;
  const S = pres.shapes;

  // ---------- Layouts ----------
  const footerNum = (hex) => ({ x: 12.2, y: 6.98, w: 0.55, h: 0.28, fontSize: 10, color: hex, align: "right" });
  pres.defineSlideMaster({
    title: "TITLE_DARK",
    background: { color: HEX.dk2 },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: M, y: 1.0, w: 7.2, h: 0.32, fontSize: 13, bold: true, color: C.accent2, charSpacing: 3, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: M, y: 1.45, w: 7.3, h: 2.45, fontSize: 44, bold: true, color: C.background1, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "subtitle", type: "body", x: M, y: 4.05, w: 6.9, h: 0.85, fontSize: 18, color: C.accent6, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "presenter", type: "body", x: M, y: 5.35, w: 6.9, h: 0.8, fontSize: 15, color: C.background1, margin: 0, align: "left", valign: "top" }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: HEX.lt1 },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: M, y: 0.42, w: 8.6, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 1.5, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.76, w: 11.8, h: 0.9, fontSize: 34, bold: true, color: C.text1, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "source", type: "body", x: M, y: 6.98, w: 11.0, h: 0.3, fontSize: 10, color: C.accent5, margin: 0, align: "left", valign: "top" }, text: "" } },
    ],
    slideNumber: footerNum(HEX.accent5),
  });
  pres.defineSlideMaster({
    title: "DARK",
    background: { color: HEX.dk2 },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: M, y: 0.42, w: 8.6, h: 0.3, fontSize: 12, bold: true, color: C.accent2, charSpacing: 1.5, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.76, w: 11.8, h: 0.9, fontSize: 34, bold: true, color: C.background1, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "source", type: "body", x: M, y: 6.98, w: 11.0, h: 0.3, fontSize: 10, color: C.accent6, margin: 0, align: "left", valign: "top" }, text: "" } },
    ],
    slideNumber: footerNum(HEX.accent6),
  });
  pres.defineSlideMaster({
    title: "REFERENCE",
    background: { color: HEX.lt1 },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: M, y: 0.42, w: 8.6, h: 0.3, fontSize: 12, bold: true, color: C.accent5, charSpacing: 1.5, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: M, y: 0.76, w: 11.8, h: 0.7, fontSize: 28, bold: true, color: C.text1, margin: 0, align: "left", valign: "top" }, text: "" } },
      { placeholder: { options: { name: "source", type: "body", x: M, y: 6.98, w: 11.0, h: 0.3, fontSize: 10, color: C.accent5, margin: 0, align: "left", valign: "top" }, text: "" } },
    ],
    slideNumber: footerNum(HEX.accent5),
  });

  // ---------- Helpers ----------
  let n = 0;
  function newSlide(master, section, { kicker, title, source, stage }) {
    n += 1;
    const s = pres.addSlide({ masterName: master, sectionTitle: section });
    if (kicker) s.addText(kicker, { placeholder: "kicker" });
    if (title) s.addText(title, { placeholder: "title" });
    const src = source !== undefined ? source : SOURCE_LINE[n];
    if (src) s.addText(src, { placeholder: "source" });
    if (stage !== undefined) tracker(s, stage, master === "DARK");
    if (NOTES[n]) s.addNotes(NOTES[n]);
    return s;
  }

  // Six-dot progress tracker (top right); the active stage is larger and filled.
  function tracker(s, active, dark) {
    const x0 = 10.55, y = 0.5, step = 0.4;
    STAGES.forEach((name, i) => {
      const on = i === active;
      const d = on ? 0.24 : 0.14;
      const cx = x0 + i * step;
      s.addShape(S.OVAL, {
        x: cx - d / 2, y: y - d / 2, w: d, h: d,
        fill: i <= active ? { color: on ? C.accent1 : (dark ? C.accent6 : C.accent6) } : { color: dark ? C.text2 : C.background1 },
        line: { color: i <= active ? C.accent1 : (dark ? C.accent6 : C.accent5), width: 1 },
        objectName: `Progress ${name}`,
      });
    });
  }

  function text(s, t, o) {
    return s.addText(t, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontSize: 16, color: C.text1 }, o));
  }

  async function iconCircle(s, name, x, y, d, { fg = HEX.lt1, bg = C.accent1, bgTrans = 0, line } = {}) {
    s.addShape(S.OVAL, { x, y, w: d, h: d, fill: { color: bg, transparency: bgTrans }, line: line || { type: "none" }, objectName: `Icon disc ${name}` });
    const p = d * 0.22;
    s.addImage({ data: await icon(name, fg), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: name.replace(/^Lu/, "") + " icon" });
  }

  function statusChip(s, x, y, key, { w = 2.1, label, dark = false } = {}) {
    const st = STATUS[key];
    const h = 0.36;
    s.addShape(S.ROUNDED_RECTANGLE, {
      x, y, w, h, rectRadius: 0.18,
      fill: st.fill ? { color: C[st.color] } : { color: dark ? C.text2 : C.background1 },
      line: { color: C[st.color], width: 1.5, dashType: st.dash === "dash" ? "dash" : "solid" },
      objectName: `Status ${st.label}`,
    });
    text(s, label || st.label, { x, y, w, h, fontSize: 12, bold: true, align: "center", valign: "middle", color: st.fill ? C.background1 : (dark ? C.background1 : C[st.color]) });
  }

  // Three answer cards used by every vote and "Would you proceed?" slide.
  function optionCards(s, opts, { x = 7.0, y = 1.95, w = 5.73, h = 1.2, gap = 0.28 } = {}) {
    opts.forEach((o, i) => {
      const yy = y + i * (h + gap);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: yy, w, h, rectRadius: 0.14, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 1 }, objectName: `Option ${o.key}` });
      s.addShape(S.OVAL, { x: x + 0.25, y: yy + (h - 0.7) / 2, w: 0.7, h: 0.7, fill: { color: C.accent2 }, line: { type: "none" }, objectName: `Option badge ${o.key}` });
      text(s, o.key, { x: x + 0.25, y: yy + (h - 0.7) / 2, w: 0.7, h: 0.7, fontSize: 24, bold: true, align: "center", valign: "middle", color: C.text2 });
      const runs = [{ text: o.label, options: { fontSize: 22, bold: true, color: C.background1, breakLine: !!o.sub } }];
      if (o.sub) runs.push({ text: o.sub, options: { fontSize: 15, color: C.accent6 } });
      text(s, runs, { x: x + 1.2, y: yy, w: w - 1.4, h, valign: "middle" });
    });
  }

  async function factRows(s, facts, { x = M, y = 2.24, w = 5.9, rowH = 1.48, dark = true, fontSize = 20 } = {}) {
    for (let i = 0; i < facts.length; i++) {
      const f = facts[i];
      const yy = y + i * rowH;
      await iconCircle(s, f.icon, x, yy, 0.62, { fg: dark ? HEX.dk2 : HEX.lt1, bg: dark ? C.accent6 : C.accent1 });
      text(s, f.text, { x: x + 0.85, y: yy, w: w - 0.85, h: 0.62, fontSize, valign: "middle", color: dark ? C.background1 : C.text1, italic: !!f.italic });
    }
  }

  function arrow(s, x, y, w, color = C.accent5) {
    s.addShape(S.LINE, { x, y, w, h: 0, line: { color, width: 2, endArrowType: "triangle" }, objectName: "Arrow" });
  }

  // =====================================================================
  // OPENING
  // =====================================================================
  pres.addSection({ title: "Opening" });

  // 1. Title
  {
    n += 1;
    const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "Opening" });
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
    const ix = 8.15, iw = 2.2, ih = 2.09, iy = 2.55;
    s.addImage({ path: img("title_fogo.jpg"), x: ix, y: iy, w: iw, h: ih, altText: "FoGO chest cue module and ankle strap module (alpha prototype)" });
    s.addImage({ path: img("title_swaknee.jpg"), x: ix + iw + 0.3, y: iy, w: iw, h: ih, altText: "SwaKnee controller connected to its knee applicator" });
    text(s, [{ text: "FoGO", options: { bold: true, color: C.background1, breakLine: true } }, { text: "Freezing-of-gait wearable", options: { color: C.accent6 } }], { x: ix, y: iy + ih + 0.15, w: iw, h: 0.6, fontSize: 13 });
    text(s, [{ text: "SwaKnee", options: { bold: true, color: C.background1, breakLine: true } }, { text: "PEMF knee system", options: { color: C.accent6 } }], { x: ix + iw + 0.3, y: iy + ih + 0.15, w: iw, h: 0.6, fontSize: 13 });
    text(s, "Authentic device photographs", { x: ix, y: iy - 0.42, w: 4.7, h: 0.3, fontSize: 11, color: C.accent6, italic: true });
    s.addNotes(NOTES[n]);
  }

  // 2. Disclosure
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "DISCLOSURE", title: "My interests, stated first" });
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 2.0, w: 6.2, h: 4.3, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Disclosure panel" });
    await iconCircle(s, "LuHandshake", M + 0.45, 2.35, 0.95, { bg: C.accent2 });
    text(s, "I have professional interests in FoGO and SwaKnee.", { x: M + 0.45, y: 3.5, w: 5.4, h: 1.05, fontSize: 26, bold: true });
    // specific interests; the SwaKnee role is completed by the presenter (see slide 1 notes, pre-flight)
    const interests = [
      [{ text: "FoGO  ", options: { bold: true, color: C.accent1 } }, { text: "founder, Ahilaya Biomedicals; patent filed", options: { color: C.text1 } }],
      [{ text: "SwaKnee  ", options: { bold: true, color: C.accent1 } }, { text: "[state role]", options: { bold: true, color: C.accent2 } }],
    ];
    interests.forEach((runs, i) => {
      s.addShape(S.LINE, { x: M + 0.45, y: 4.78 + i * 0.62, w: 5.3, h: 0, line: { color: C.accent6, width: 1 }, objectName: "Interest rule" });
      text(s, runs, { x: M + 0.45, y: 4.84 + i * 0.62, w: 5.4, h: 0.5, fontSize: 17, valign: "middle" });
    });
    const rules = [
      { icon: "LuVote", t: "Vote before my view" },
      { icon: "LuSearch", t: "Challenge every claim" },
      { icon: "LuLock", t: "Protect identities" },
    ];
    for (let i = 0; i < rules.length; i++) {
      const y = 2.35 + i * 1.4;
      await iconCircle(s, rules[i].icon, 7.45, y, 0.85);
      text(s, rules[i].t, { x: 8.55, y, w: 4.2, h: 0.85, fontSize: 20, valign: "middle" });
    }
  }

  // 3. Opening vote
  {
    const s = newSlide("DARK", "Opening", { kicker: "OPENING VOTE", title: "Would you let a patient use it?" });
    await factRows(s, [
      { icon: "LuWrench", text: "Working prototype" },
      { icon: "LuFlaskConical", text: "Promising dataset results" },
      { icon: "LuFileCheck", text: "Test licence granted" },
    ]);
    optionCards(s, [
      { key: "1", label: "Routine care" },
      { key: "2", label: "Research study" },
      { key: "3", label: "Not yet" },
    ]);
    text(s, "Show 1, 2 or 3 fingers", { x: M, y: 6.2, w: 5.9, h: 0.5, fontSize: 20, bold: true, color: C.accent2 });
  }

  // 4. Three teaching traditions
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "LENSES", title: "Three traditions, one Indian patient" });
    const cols = [
      { icon: "LuCompass", org: "Stanford Biodesign", lens: "Start from the need" },
      { icon: "LuScale", org: "Harvard bioethics", lens: "Respect every person" },
      { icon: "LuLayers", org: "Cambridge design", lens: "Design for whole systems" },
    ];
    const cw = 3.75, gap = 0.44;
    for (let i = 0; i < cols.length; i++) {
      const x = M + i * (cw + gap);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 2.05, w: cw, h: 2.7, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Lens ${cols[i].org}` });
      await iconCircle(s, cols[i].icon, x + 0.35, 2.35, 0.95);
      text(s, cols[i].org, { x: x + 0.35, y: 3.5, w: cw - 0.6, h: 0.5, fontSize: 23, bold: true });
      text(s, cols[i].lens, { x: x + 0.35, y: 4.02, w: cw - 0.6, h: 0.55, fontSize: 20, color: C.text2 });
      s.addShape(S.LINE, { x: x + cw / 2, y: 4.9, w: 0, h: 0.3, line: { color: C.accent5, width: 1.5, endArrowType: "triangle" }, objectName: "Arrow down" });
    }
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 5.3, w: 12.13, h: 1.25, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "India banner" });
    await iconCircle(s, "LuMapPin", M + 0.3, 5.5, 0.85, { bg: C.accent2, fg: HEX.dk2 });
    text(s, "India", { x: M + 1.4, y: 5.3, w: 1.4, h: 1.25, fontSize: 22, bold: true, valign: "middle", color: C.background1 });
    ["CDSCO", "ICMR", "MvPI", "NPPA"].forEach((a, i) => text(s, a, { x: M + 3.2 + i * 2.2, y: 5.3, w: 1.9, h: 1.25, fontSize: 22, valign: "middle", color: C.accent6 }));
  }

  // 5. Two people we will follow
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "PATIENTS", title: "Two people we will follow" });
    const people = [
      { name: "Ramesh, 71", facts: ["Parkinson’s disease", "Freezes in doorways", "Lives with his daughter"], icons: ["LuBrain", "LuFootprints", "LuHouse"], device: "FoGO", photo: "thumb_fogo.jpg", alt: "FoGO ankle module worn above a sandal" },
      { name: "Kamala, 64", facts: ["Knee osteoarthritis", "30 km from the clinic", "Pays out of pocket"], icons: ["LuBone", "LuBus", "LuWallet"], device: "SwaKnee", photo: "thumb_swaknee.jpg", alt: "SwaKnee controller and applicator" },
    ];
    for (let i = 0; i < 2; i++) {
      const p = people[i];
      const x = M + i * 6.25;
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 1.95, w: 5.88, h: 3.95, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Persona ${p.name}` });
      await iconCircle(s, "LuUser", x + 0.35, 2.25, 0.9, { bg: i === 0 ? C.accent1 : C.accent2, fg: i === 0 ? HEX.lt1 : HEX.dk2 });
      text(s, p.name, { x: x + 1.45, y: 2.25, w: 4.2, h: 0.9, fontSize: 28, bold: true, valign: "middle" });
      for (let j = 0; j < 3; j++) {
        const y = 3.45 + j * 0.62;
        s.addImage({ data: await icon(p.icons[j], HEX.accent1), x: x + 0.45, y: y + 0.04, w: 0.38, h: 0.38, altText: p.facts[j] });
        text(s, p.facts[j], { x: x + 1.0, y, w: 2.55, h: 0.48, fontSize: 17, valign: "middle" });
      }
      s.addImage({ path: img(p.photo), x: x + 3.75, y: 3.4, w: 1.8, h: 1.8, altText: p.alt });
      text(s, p.device, { x: x + 3.75, y: 5.28, w: 1.8, h: 0.4, fontSize: 15, bold: true, align: "center", color: C.accent1 });
    }
  }

  // 6. Journey map
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "THE JOURNEY", title: "Every stage answers a patient question" });
    const qs = ["“Will it help?”", "“Is it proven?”", "“Can I refuse?”", "“Is it allowed?”", "“Can I afford it?”", "“Who answers?”"];
    const icons = ["LuTarget", "LuMicroscope", "LuHand", "LuLandmark", "LuIndianRupee", "LuSiren"];
    const x0 = M + 0.2, step = 2.05, d = 1.45, y = 2.95;
    s.addShape(S.LINE, { x: x0 + d / 2, y: y + d / 2, w: step * 5, h: 0, line: { color: C.accent6, width: 3 }, objectName: "Journey line" });
    for (let i = 0; i < 6; i++) {
      const x = x0 + i * step;
      await iconCircle(s, icons[i], x, y, d, { bg: C.accent1 });
      text(s, STAGES[i], { x: x - 0.3, y: y + d + 0.3, w: d + 0.6, h: 0.45, fontSize: 22, bold: true, align: "center" });
      text(s, qs[i], { x: x - 0.3, y: y + d + 0.8, w: d + 0.6, h: 0.85, fontSize: 18, italic: true, align: "center", color: C.text2 });
    }
  }

  // =====================================================================
  // 1 NEED AND CLAIM
  // =====================================================================
  pres.addSection({ title: "Need and claim" });

  // 7. Claim wording sets the evidence bar
  {
    const s = newSlide("CONTENT", "Need and claim", { kicker: "NEED", title: "Wording sets the evidence bar", stage: 0 });
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 2.15, w: 4.9, h: 3.8, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "Need statement card" });
    text(s, "STANFORD NEED STATEMENT", { x: M + 0.4, y: 2.5, w: 4.1, h: 0.35, fontSize: 13, bold: true, color: C.accent2, charSpacing: 1.5 });
    text(s, [
      { text: "A way to ", options: { color: C.background1 } },
      { text: "[address\u00A0problem]", options: { color: C.accent2, bold: true } },
      { text: " in ", options: { color: C.background1 } },
      { text: "[population]", options: { color: C.accent2, bold: true } },
      { text: " to ", options: { color: C.background1 } },
      { text: "[achieve\u00A0outcome]", options: { color: C.accent2, bold: true } },
    ], { x: M + 0.4, y: 3.05, w: 4.1, h: 2.6, fontSize: 30 });

    const rows = [
      { claim: "“Shows walking patterns”", out: "Low bar", key: "low" },
      { claim: "“Detects Parkinson’s freezing”", out: "High bar: proof, licence", key: "high" },
    ];
    for (let i = 0; i < rows.length; i++) {
      const y = 2.15 + i * 2.2;
      const r = rows[i];
      s.addShape(S.ROUNDED_RECTANGLE, { x: 5.95, y, w: 3.55, h: 1.6, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Claim card" });
      text(s, r.claim, { x: 6.2, y, w: 3.1, h: 1.6, fontSize: 20, italic: true, valign: "middle" });
      arrow(s, 9.65, y + 0.8, 0.6, r.key === "high" ? C.accent3 : C.accent5);
      s.addShape(S.ROUNDED_RECTANGLE, { x: 10.4, y, w: 2.33, h: 1.6, rectRadius: 0.12, fill: { color: r.key === "high" ? C.accent3 : C.accent5, transparency: r.key === "high" ? 0 : 0 }, line: { type: "none" }, objectName: "Claim consequence" });
      text(s, r.out, { x: 10.55, y, w: 2.05, h: 1.6, fontSize: 17, bold: true, color: C.background1, valign: "middle", align: "center" });
    }
  }

  // =====================================================================
  // 2 EVIDENCE
  // =====================================================================
  pres.addSection({ title: "Evidence" });

  // 8. FoGO video
  {
    const s = newSlide("DARK", "Evidence", { kicker: "EVIDENCE · FoGO", title: "What did the prototype show?", stage: 1 });
    const vw = 5.9, vh = vw / (1384 / 1080);
    s.addMedia({ type: "video", path: vid("fogo_prototype.mp4"), cover: "data:" + dataUri(img("fogo_video_poster.png")), x: M, y: 1.85, w: vw, h: vh, objectName: "FoGO prototype clip (12 s)" });
    text(s, "Staged demo · volunteer · simulated freeze", { x: M, y: 1.85 + vh + 0.08, w: vw, h: 0.3, fontSize: 11, italic: true, color: C.accent6 });
    const colX = [7.0, 10.03];
    const heads = [{ t: "Seen", c: C.accent6, k: "demonstrated" }, { t: "Not yet shown", c: C.accent2, k: "planned" }];
    const items = [["Stop sensed", "Stop flagged as freeze", "Chest vibrates"], ["Real freezes", "Many users", "Fewer falls"]];
    for (let c = 0; c < 2; c++) {
      text(s, heads[c].t, { x: colX[c], y: 2.0, w: 2.75, h: 0.5, fontSize: 22, bold: true, color: heads[c].c });
      for (let i = 0; i < 3; i++) {
        const y = 2.75 + i * 1.2;
        s.addShape(S.ROUNDED_RECTANGLE, { x: colX[c], y, w: 2.7, h: 0.98, rectRadius: 0.12, fill: { color: c === 0 ? C.accent1 : C.text2 }, line: { color: c === 0 ? C.accent1 : C.accent2, width: 1.25, dashType: c === 0 ? "solid" : "dash" }, objectName: heads[c].t + " item" });
        text(s, items[c][i], { x: colX[c] + 0.15, y, w: 2.4, h: 0.98, fontSize: 20, bold: true, color: C.background1, valign: "middle" });
      }
    }
  }

  // 9. Evidence ladder
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "EVIDENCE · FoGO", title: "FoGO has climbed two rungs, not five", stage: 1 });
    const rungs = [
      { t: "Staged demo, volunteer", k: "demonstrated", ideal: "Pre-IDEAL" },
      { t: "Public datasets\nF1 0.83–0.85", k: "reported", ideal: "Pre-IDEAL" },
      { t: "Prospective patient study", k: "planned", ideal: "1–2a" },
      { t: "Benefit in daily life", k: "notyet", ideal: "2b–3" },
      { t: "Long-term safety and fairness", k: "notyet", ideal: "4" },
    ];
    const bw = 2.2, bh = 0.56, x0 = M, yBase = 6.3;
    for (let i = 0; i < rungs.length; i++) {
      const r = rungs[i];
      const st = STATUS[r.k];
      const x = x0 + i * (bw + 0.27);
      const y = yBase - (i + 1) * bh;
      const filled = r.k === "demonstrated" || r.k === "reported";
      s.addShape(S.RECTANGLE, { x, y, w: bw, h: yBase - y, fill: { color: filled ? C.accent1 : C.background2, transparency: r.k === "reported" ? 45 : 0 }, line: { color: C[st.color], width: 1.5, dashType: st.dash === "dash" ? "dash" : "solid" }, objectName: `Rung ${i + 1}` });
      text(s, String(i + 1), { x: x + 0.15, y: y + 0.08, w: 0.5, h: 0.45, fontSize: 22, bold: true, color: filled ? C.background1 : C[st.color] });
      text(s, r.t, { x, y: y - 1.47, w: bw, h: 0.85, fontSize: 15, bold: true, valign: "bottom" });
      statusChip(s, x, y - 0.5, r.k, { w: bw });
      text(s, (r.ideal.startsWith("Pre") ? "" : "IDEAL ") + r.ideal, { x, y: yBase + 0.08, w: bw, h: 0.3, fontSize: 12, color: C.accent5 });
    }
  }

  // 10. Decision 1: home pilot
  {
    const s = newSlide("DARK", "Evidence", { kicker: "WOULD YOU PROCEED? 1/4", title: "Home pilot for Ramesh next month?", stage: 1 });
    await factRows(s, [
      { icon: "LuDatabase", text: "F1 0.83–0.85 on public data" },
      { icon: "LuHouse", text: "Ten users, alone at home" },
      { icon: "LuUser", text: "Ramesh fell twice; asks to join" },
    ]);
    optionCards(s, [
      { key: "A", label: "Proceed" },
      { key: "B", label: "Proceed with conditions" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // 11. Risk map
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "EVIDENCE · RISK", title: "Rank failures by harm and likelihood", stage: 1 });
    const gx = 2.0, gy = 1.95, cw = 2.55, ch = 1.38;
    const lik = ["Rare", "Possible", "Frequent"];
    const sev = ["Critical", "Serious", "Minor"];
    // cell risk level = severity rank + likelihood rank
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const score = (2 - r) + c; // 0..4
        const col = score >= 3 ? C.accent3 : score === 2 ? C.accent2 : C.accent1;
        s.addShape(S.RECTANGLE, { x: gx + c * cw, y: gy + r * ch, w: cw, h: ch, fill: { color: col, transparency: score >= 3 ? 72 : score === 2 ? 70 : 82 }, line: { color: C.background1, width: 2 }, objectName: `Risk cell ${sev[r]} ${lik[c]}` });
      }
      text(s, sev[r], { x: M, y: gy + r * ch, w: 1.3, h: ch, fontSize: 15, bold: true, valign: "middle", align: "right", color: C.text2 });
    }
    lik.forEach((l, c) => text(s, l, { x: gx + c * cw, y: gy + 3 * ch + 0.08, w: cw, h: 0.35, fontSize: 15, bold: true, align: "center", color: C.text2 }));
    text(s, "Likelihood", { x: gx, y: gy + 3 * ch + 0.45, w: 3 * cw, h: 0.3, fontSize: 12, align: "center", color: C.accent5 });
    text(s, "Severity", { x: M, y: gy - 0.05, w: 1.3, h: 0.3, fontSize: 12, align: "right", color: C.accent5 });
    const pts = [
      { t: "Missed freeze", r: 0, c: 1, dx: 0.15, dy: 0.2, ic: "LuFootprints" },
      { t: "Silent signal loss", r: 0, c: 1, dx: 0.15, dy: 0.75, ic: "LuWifiOff" },
      { t: "Flat battery mid-walk", r: 1, c: 1, dx: 0.15, dy: 0.45, ic: "LuBatteryLow" },
      { t: "Data exposure", r: 1, c: 0, dx: 0.15, dy: 0.45, ic: "LuLock" },
      { t: "False cue", r: 2, c: 2, dx: 0.15, dy: 0.45, ic: "LuVibrate" },
      { t: "Skin irritation", r: 2, c: 1, dx: 0.15, dy: 0.45, ic: "LuHand" },
    ];
    for (const p of pts) {
      const x = gx + p.c * cw + p.dx, y = gy + p.r * ch + p.dy;
      s.addShape(S.ROUNDED_RECTANGLE, { x, y, w: cw - 0.3, h: 0.46, rectRadius: 0.23, fill: { color: C.background1 }, line: { color: C.text2, width: 0.75 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 3, offset: 1, angle: 90 }, objectName: `Failure ${p.t}` });
      s.addImage({ data: await icon(p.ic, HEX.dk2), x: x + 0.1, y: y + 0.07, w: 0.32, h: 0.32, altText: p.t });
      text(s, p.t, { x: x + 0.5, y, w: cw - 0.85, h: 0.46, fontSize: 13, bold: true, valign: "middle" });
    }
    s.addShape(S.ROUNDED_RECTANGLE, { x: 9.95, y: 1.95, w: 2.78, h: 4.14, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "False-alarm burden panel" });
    text(s, "9–16", { x: 10.2, y: 2.15, w: 2.3, h: 0.95, fontSize: 54, bold: true, color: C.accent2 });
    text(s, "false cues per walking hour, if dataset rates held", { x: 10.2, y: 3.1, w: 2.35, h: 0.95, fontSize: 15, color: C.background1 });
    text(s, "Reported: 0.15–0.27/min", { x: 10.2, y: 4.05, w: 2.35, h: 0.5, fontSize: 12, italic: true, color: C.accent6 });
    s.addShape(S.LINE, { x: 10.2, y: 4.65, w: 2.3, h: 0, line: { color: C.accent6, width: 0.75 }, objectName: "Divider" });
    text(s, "Which control first?", { x: 10.2, y: 4.8, w: 2.35, h: 1.1, fontSize: 19, bold: true, color: C.background1 });
  }

  // 12. SwaKnee video
  {
    const s = newSlide("DARK", "Evidence", { kicker: "EVIDENCE · SWAKNEE", title: "A device is also a daily routine", stage: 1 });
    const vw = 6.4, vh = vw / 1.4;
    s.addMedia({ type: "video", path: vid("swaknee_how_to_use.mp4"), cover: "data:" + dataUri(img("swaknee_video_poster.png")), x: M, y: 1.85, w: vw, h: vh, objectName: "SwaKnee how-to-use clip (20 s)" });
    text(s, "Company demonstration of use · not outcome footage", { x: M, y: 1.85 + vh + 0.08, w: vw, h: 0.3, fontSize: 11, italic: true, color: C.accent6 });
    text(s, "≈34 hours", { x: 7.55, y: 1.8, w: 5.2, h: 1.1, fontSize: 60, bold: true, color: C.accent2 });
    text(s, "45 minutes a day for 45 days", { x: 7.55, y: 3.05, w: 5.2, h: 0.5, fontSize: 20, color: C.accent6 });
    s.addShape(S.LINE, { x: 7.55, y: 3.85, w: 5.0, h: 0, line: { color: C.accent6, width: 0.75 }, objectName: "Divider" });
    await iconCircle(s, "LuCircleHelp", 7.55, 4.55, 0.85, { bg: C.accent6, fg: HEX.dk2 });
    text(s, "Who helps Kamala when something goes wrong?", { x: 8.6, y: 4.45, w: 4.1, h: 1.6, fontSize: 26, bold: true, color: C.background1 });
  }

  // 13. Claim vs evidence
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "EVIDENCE · SWAKNEE", title: "Which claim can this evidence carry?", stage: 1 });
    s.addChart(pres.charts.BAR, [{ name: "Average VAS pain reduction at day 45 (%)", labels: ["SwaKnee (n=40)", "Comparison (n=42)"], values: [32, 14] }], {
      x: M, y: 1.9, w: 5.6, h: 3.55, barDir: "col", barGapWidthPct: 70,
      chartColors: [HEX.accent1, HEX.accent5], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"',
      dataLabelFontSize: 16, dataLabelFontBold: true, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      showTitle: true, title: "Average pain reduction at day 45, company-reported (%)", titleFontSize: 13, titleColor: HEX.dk1, titleFontFace: "+mn-lt",
      showLegend: false, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
      valAxisMinVal: 0, valAxisMaxVal: 40, objectName: "SwaKnee company-reported pain chart",
    });
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 5.75, w: 5.6, h: 0.75, rectRadius: 0.1, fill: { color: C.accent2, transparency: 82 }, line: { color: C.accent2, width: 1, dashType: "dash" }, objectName: "MCII callout" });
    text(s, [{ text: "Important change per patient ≈ 41% ", options: { bold: true } }, { text: "(Tubach 2005)", options: { color: C.text2 } }], { x: M + 0.2, y: 5.75, w: 5.3, h: 0.75, fontSize: 16, valign: "middle" });
    const claims = [
      { t: "“Less pain on average, one company study”", k: "reported", label: "Reported" },
      { t: "“Clinically proven”", k: "notyet", label: "Not established" },
      { t: "“Regrows cartilage”", k: "notyet", label: "Not measured" },
    ];
    for (let i = 0; i < claims.length; i++) {
      const y = 2.0 + i * 1.55;
      s.addShape(S.ROUNDED_RECTANGLE, { x: 6.75, y, w: 5.98, h: 1.4, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Claim row" });
      text(s, claims[i].t, { x: 6.95, y, w: 3.35, h: 1.4, fontSize: 17, italic: true, valign: "middle" });
      statusChip(s, 10.45, y + 0.52, claims[i].k, { w: 2.1, label: claims[i].label });
    }
  }

  // 14. Average hides a patient
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "EVIDENCE · EQUITY", title: "An average can hide a patient", stage: 1 });
    s.addChart(pres.charts.BAR, [{ name: "Hidden low oxygen (%)", labels: ["Black patients", "White patients"], values: [11.7, 3.6] }], {
      x: M, y: 1.9, w: 5.6, h: 4.55, barDir: "col", barGapWidthPct: 70,
      chartColors: [HEX.accent3, HEX.accent5], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0.0"%"',
      dataLabelFontSize: 16, dataLabelFontBold: true, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      showTitle: true, title: "Oximeter read 92–96% but arterial saturation was <88%", titleFontSize: 13, titleColor: HEX.dk1, titleFontFace: "+mn-lt",
      showLegend: false, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
      valAxisMinVal: 0, valAxisMaxVal: 15, objectName: "Pulse oximetry occult hypoxaemia chart",
    });
    text(s, "Who is missing from our data?", { x: 6.85, y: 2.0, w: 5.9, h: 1.0, fontSize: 28, bold: true, color: C.text2 });
    const prompts = [
      { ic: "LuFootprints", t: "Ramesh: walking aids, crowded homes" },
      { ic: "LuBone", t: "Kamala: obesity, other illnesses, rural care" },
      { ic: "LuUsersRound", t: "Report results by subgroup" },
    ];
    for (let i = 0; i < prompts.length; i++) {
      const y = 3.15 + i * 1.12;
      await iconCircle(s, prompts[i].ic, 6.85, y, 0.66);
      text(s, prompts[i].t, { x: 7.75, y, w: 5.0, h: 0.66, fontSize: 18, valign: "middle" });
    }
  }

  // =====================================================================
  // 3 PEOPLE
  // =====================================================================
  pres.addSection({ title: "People" });

  // 15. Decision 2: consent
  {
    const s = newSlide("DARK", "People", { kicker: "WOULD YOU PROCEED? 2/4", title: "His neurologist is the inventor", stage: 2 });
    await factRows(s, [
      { icon: "LuMessageCircle", text: "“Will saying no change my care?”", italic: true },
      { icon: "LuLanguages", text: "Consent form: English only" },
      { icon: "LuMapPin", text: "Only neurologist within 100 km" },
    ]);
    optionCards(s, [
      { key: "A", label: "Recruit now" },
      { key: "B", label: "Proceed with safeguards" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // 16. Conflicts of interest
  {
    const s = newSlide("CONTENT", "People", { kicker: "CONFLICTS OF INTEREST", title: "Disclose, then manage", stage: 2 });
    const cols = [
      { h: "Interests", c: C.accent2, items: [["LuIndianRupee", "Equity or royalties"], ["LuLandmark", "Grants, institution"], ["LuMegaphone", "Reputation"]] },
      { h: "Risks", c: C.accent3, items: [["LuUsers", "Pressure to enrol"], ["LuEye", "Optimistic reading"], ["LuFileText", "Selective reporting"]] },
      { h: "Safeguards", c: C.accent1, items: [["LuUserCheck", "Independent assessor"], ["LuClipboardCheck", "CTRI registration"], ["LuBookOpen", "Publish all results"]] },
    ];
    const cw = 3.6, gap = 0.67;
    for (let i = 0; i < 3; i++) {
      const x = M + i * (cw + gap);
      const col = cols[i];
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 1.95, w: cw, h: 4.6, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `COI column ${col.h}` });
      s.addShape(S.ROUNDED_RECTANGLE, { x: x + 0.3, y: 2.2, w: cw - 0.6, h: 0.55, rectRadius: 0.27, fill: { color: col.c }, line: { type: "none" }, objectName: `COI header ${col.h}` });
      text(s, col.h, { x: x + 0.3, y: 2.2, w: cw - 0.6, h: 0.55, fontSize: 18, bold: true, align: "center", valign: "middle", color: C.background1 });
      for (let j = 0; j < 3; j++) {
        const y = 3.1 + j * 1.1;
        s.addImage({ data: await icon(col.items[j][0], HEX.dk2), x: x + 0.35, y: y + 0.1, w: 0.48, h: 0.48, altText: col.items[j][1] });
        text(s, col.items[j][1], { x: x + 1.0, y, w: cw - 1.2, h: 0.7, fontSize: 17, valign: "middle" });
      }
      if (i < 2) arrow(s, x + cw + 0.08, 4.25, gap - 0.16, C.accent5);
    }
  }

  // =====================================================================
  // 4 PERMISSION AND ACCESS
  // =====================================================================
  pres.addSection({ title: "Permission and access" });

  // 17. CDSCO pathway
  {
    const s = newSlide("CONTENT", "Permission and access", { kicker: "PERMISSION · INDIA", title: "Each permission answers a different question", stage: 3 });
    const steps = [
      { ic: "LuWrench", h: "Test\nlicence", f: "MD-12 → MD-13", q: "Make units for testing?" },
      { ic: "LuUsers", h: "Clinical\ninvestigation", f: "MD-22 → MD-23 · ethics · CTRI", q: "Test in people?" },
      { ic: "LuPackage", h: "Manufacturing\nlicence", f: "Class A/B: State · C/D: Central", q: "Sell for this use?" },
      { ic: "LuSiren", h: "Post-market\nduties", f: "PSUR · MvPI · recall", q: "Still safe?" },
    ];
    const cw = 2.66, gap = 0.5;
    for (let i = 0; i < 4; i++) {
      const x = M + i * (cw + gap);
      const st = steps[i];
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 2.0, w: cw, h: 3.0, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Pathway ${st.h.replace("\n", " ")}` });
      await iconCircle(s, st.ic, x + 0.25, 2.25, 0.75, { bg: C.accent4 });
      text(s, st.h, { x: x + 0.25, y: 3.18, w: cw - 0.45, h: 0.68, fontSize: 19, bold: true });
      text(s, st.q, { x: x + 0.25, y: 3.92, w: cw - 0.45, h: 0.4, fontSize: 17, italic: true, color: C.accent4 });
      text(s, st.f, { x: x + 0.25, y: 4.42, w: cw - 0.4, h: 0.4, fontSize: 13, color: C.text2 });
      if (i < 3) arrow(s, x + cw + 0.1, 3.5, gap - 0.2, C.accent4);
    }
    // FoGO today: where a real project sits on the path
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 5.5, w: 12.13, h: 0.7, rectRadius: 0.35, fill: { color: C.accent2, transparency: 85 }, line: { color: C.accent2, width: 1 }, objectName: "FoGO today ribbon" });
    text(s, [
      { text: "FoGO TODAY   ", options: { bold: true, color: C.text1, charSpacing: 1 } },
      { text: "✓ MD-13 test licence, 25 units (Aug 2026)   ", options: { color: C.accent1, bold: true } },
      { text: "→  Next: MD-22, ethics, CTRI", options: { color: C.text2 } },
    ], { x: M + 0.3, y: 5.5, w: 11.6, h: 0.7, fontSize: 16, valign: "middle" });
    // The risk-class detail and the US/EU comparison are in the speaker notes.
  }

  // 18. Inclusive design: exclusion audit
  {
    const s = newSlide("CONTENT", "Permission and access", { kicker: "INCLUSIVE DESIGN", title: "Who can’t use it?", stage: 4 });
    const caps = [
      ["LuEye", "Vision", 2, 2], ["LuEar", "Hearing", 1, 1], ["LuBrain", "Thinking", 3, 2], ["LuMessageCircle", "Communication", 1, 1],
      ["LuPersonStanding", "Locomotion", 2, 2], ["LuMove", "Reach and stretch", 3, 2], ["LuHand", "Dexterity", 3, 2],
    ];
    const lvl = { 1: C.accent1, 2: C.accent2, 3: C.accent3 };
    const x0 = M, y0 = 2.35, rh = 0.56, c1 = 4.05, c2 = 5.85;
    text(s, "FoGO", { x: c1 - 0.6, y: 1.9, w: 1.2, h: 0.35, fontSize: 16, bold: true, align: "center", color: C.accent1 });
    text(s, "SwaKnee", { x: c2 - 0.7, y: 1.9, w: 1.4, h: 0.35, fontSize: 16, bold: true, align: "center", color: C.accent1 });
    for (let i = 0; i < caps.length; i++) {
      const y = y0 + i * rh;
      if (i % 2 === 0) s.addShape(S.RECTANGLE, { x: x0, y, w: 6.2, h: rh, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Row band" });
      s.addImage({ data: await icon(caps[i][0], HEX.dk2), x: x0 + 0.15, y: y + 0.11, w: 0.34, h: 0.34, altText: caps[i][1] });
      text(s, caps[i][1], { x: x0 + 0.65, y, w: 2.6, h: rh, fontSize: 16, valign: "middle" });
      [c1, c2].forEach((cx, j) => {
        const v = caps[i][2 + j];
        s.addShape(S.OVAL, { x: cx - 0.17, y: y + rh / 2 - 0.17, w: 0.34, h: 0.34, fill: { color: lvl[v] }, line: { type: "none" }, objectName: `Demand ${caps[i][1]} ${j ? "SwaKnee" : "FoGO"}` });
      });
    }
    const ly = y0 + caps.length * rh + 0.15;
    [["Low", 1], ["Medium", 2], ["High", 3]].forEach(([t, v], i) => {
      s.addShape(S.OVAL, { x: x0 + 0.15 + i * 1.65, y: ly + 0.07, w: 0.22, h: 0.22, fill: { color: lvl[v] }, line: { type: "none" }, objectName: "Legend dot" });
      text(s, t, { x: x0 + 0.45 + i * 1.65, y: ly, w: 1.3, h: 0.36, fontSize: 13, color: C.text2, valign: "middle" });
    });
    s.addShape(S.ROUNDED_RECTANGLE, { x: 7.3, y: 1.95, w: 5.43, h: 4.32, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "India additions" });
    text(s, "INDIA ADDS", { x: 7.65, y: 2.2, w: 4.8, h: 0.32, fontSize: 13, bold: true, color: C.accent2, charSpacing: 1.5 });
    const adds = [["LuLanguages", "Language"], ["LuBookA", "Literacy"], ["LuPlug", "Power cuts"], ["LuSmartphone", "No smartphone"], ["LuUsers", "Caregiver needed"]];
    for (let i = 0; i < adds.length; i++) {
      const y = 2.7 + i * 0.72;
      s.addImage({ data: await icon(adds[i][0], HEX.accent6), x: 7.65, y: y + 0.06, w: 0.4, h: 0.4, altText: adds[i][1] });
      text(s, adds[i][1], { x: 8.25, y, w: 4.3, h: 0.52, fontSize: 18, color: C.background1, valign: "middle" });
    }
  }

  // 19. Affordability
  {
    const s = newSlide("CONTENT", "Permission and access", { kicker: "ACCESS", title: "Price is only part of the cost", stage: 4 });
    const steps = [
      { ic: "LuWallet", t: "Buy or rent" },
      { ic: "LuBus", t: "Travel" },
      { ic: "LuClock", t: "34 hours" },
      { ic: "LuUsers", t: "Family time" },
      { ic: "LuWrench", t: "Repairs" },
    ];
    const step = 1.62, d = 0.9, x0 = M + 0.25, y = 2.2;
    s.addShape(S.LINE, { x: x0 + d / 2, y: y + d / 2, w: step * 4, h: 0, line: { color: C.accent6, width: 3 }, objectName: "Cost journey line" });
    for (let i = 0; i < steps.length; i++) {
      const x = x0 + i * step;
      await iconCircle(s, steps[i].ic, x, y, d, { bg: i === 0 ? C.accent1 : C.accent2, fg: i === 0 ? HEX.lt1 : HEX.dk2 });
      text(s, steps[i].t, { x: x - 0.3, y: y + d + 0.15, w: d + 0.6, h: 0.4, fontSize: 15, bold: true, align: "center" });
      // empty answer slot: the room names the payer
      s.addShape(S.ROUNDED_RECTANGLE, { x: x - 0.2, y: 4.0, w: d + 0.4, h: 0.62, rectRadius: 0.1, fill: { color: C.background1 }, line: { color: C.accent2, width: 1.25, dashType: "dash" }, objectName: `Payer slot ${steps[i].t}` });
      text(s, "?", { x: x - 0.2, y: 4.0, w: d + 0.4, h: 0.62, fontSize: 22, bold: true, align: "center", valign: "middle", color: C.accent2 });
    }
    text(s, "Who pays each step?", { x: M, y: 5.0, w: 7.7, h: 0.7, fontSize: 30, bold: true, color: C.text2 });
    s.addShape(S.ROUNDED_RECTANGLE, { x: 8.95, y: 1.95, w: 3.78, h: 3.75, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "NPPA precedent" });
    text(s, "NPPA PRECEDENT", { x: 9.25, y: 2.3, w: 3.2, h: 0.35, fontSize: 12, bold: true, color: C.accent2, charSpacing: 1.5 });
    text(s, "91%", { x: 9.25, y: 2.8, w: 3.2, h: 0.95, fontSize: 54, bold: true, color: C.background1 });
    text(s, "of home-device brands cut prices", { x: 9.25, y: 3.85, w: 3.3, h: 0.8, fontSize: 17, color: C.accent6 });
    text(s, "Trade-margin cap, July 2021", { x: 9.25, y: 4.95, w: 3.3, h: 0.45, fontSize: 16, bold: true, color: C.accent2 });
  }

  // 20. Decision 3: brochure
  {
    const s = newSlide("DARK", "Permission and access", { kicker: "WOULD YOU PROCEED? 3/4", title: "Launch with this brochure?", stage: 4 });
    // hypothetical brochure mock-up
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 1.95, w: 2.95, h: 3.9, rectRadius: 0.1, fill: { color: C.background1 }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.35, blur: 8, offset: 3, angle: 90 }, objectName: "Hypothetical brochure" });
    text(s, "Clinically proven!", { x: M + 0.25, y: 2.25, w: 2.5, h: 0.55, fontSize: 22, bold: true, color: C.accent3 });
    text(s, "Regrows cartilage", { x: M + 0.25, y: 2.85, w: 2.5, h: 0.5, fontSize: 20, bold: true, color: C.text1 });
    text(s, "Doctor recommended", { x: M + 0.25, y: 3.4, w: 2.5, h: 0.45, fontSize: 17, color: C.text2 });
    text(s, "Avoid surgery forever", { x: M + 0.25, y: 3.9, w: 2.5, h: 0.45, fontSize: 17, color: C.text2 });
    text(s, "HYPOTHETICAL", { x: M + 0.25, y: 5.2, w: 2.5, h: 0.35, fontSize: 12, bold: true, color: C.accent5, charSpacing: 2 });
    await factRows(s, [
      { icon: "LuBriefcase", text: "Distributor insists" },
      { icon: "LuTrendingDown", text: "Cash lasts 3 months" },
    ], { x: 3.85, y: 2.2, w: 2.95, rowH: 1.6, fontSize: 18 });
    optionCards(s, [
      { key: "A", label: "Launch as written" },
      { key: "B", label: "Fix claims first" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // =====================================================================
  // 5 SAFETY
  // =====================================================================
  pres.addSection({ title: "Lifetime safety" });

  // 21. Decision 4: software update
  {
    const s = newSlide("DARK", "Lifetime safety", { kicker: "WOULD YOU PROCEED? 4/4", title: "Push tonight’s FoGO update?", stage: 5 });
    s.addImage({ path: img("fogo_app_cue_rounded.png"), x: M, y: 1.95, w: 2.3, h: 4.59, altText: "FoGO prototype app showing an active vibration cue and its detection paths" });
    await factRows(s, [
      { icon: "LuVibrate", text: "Fewer false cues" },
      { icon: "LuFootprints", text: "May miss more freezes" },
      { icon: "LuDatabase", text: "Tested on stored data" },
    ], { x: 3.3, w: 3.35, fontSize: 18 });
    optionCards(s, [
      { key: "A", label: "Push to everyone" },
      { key: "B", label: "Staged release with rollback" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // 22. Harm response loop
  {
    const s = newSlide("CONTENT", "Lifetime safety", { kicker: "SAFETY", title: "When harm happens, who answers?", stage: 5 });
    const nodes = ["Care", "Record", "Report", "Investigate", "Correct", "Follow up"];
    const icons = ["LuHeartPulse", "LuFileText", "LuBell", "LuSearch", "LuWrench", "LuPhone"];
    const cx = 3.6, cy = 4.15, R = 1.72, d = 0.9;
    s.addShape(S.OVAL, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, fill: { type: "none" }, line: { color: C.accent6, width: 3 }, objectName: "Response loop" });
    s.addShape(S.OVAL, { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fill: { color: C.text2 }, line: { type: "none" }, objectName: "Patient centre" });
    text(s, "Patient", { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fontSize: 18, bold: true, align: "center", valign: "middle", color: C.background1 });
    for (let i = 0; i < 6; i++) {
      const a = (-90 + i * 60) * Math.PI / 180;
      const x = cx + R * Math.cos(a) - d / 2, y = cy + R * Math.sin(a) - d / 2;
      await iconCircle(s, icons[i], x, y, d, { bg: i === 2 ? C.accent2 : C.accent1, fg: i === 2 ? HEX.dk2 : HEX.lt1 });
      const left = Math.cos(a) < -0.1, bottom = Math.sin(a) > 0.9;
      if (bottom) text(s, nodes[i], { x: x - 0.55, y: y + d + 0.06, w: d + 1.1, h: 0.4, fontSize: 16, bold: true, align: "center" });
      else text(s, nodes[i], { x: left ? x - 1.55 : x + d + 0.12, y: y + 0.24, w: 1.45, h: 0.42, fontSize: 16, bold: true, align: left ? "right" : "left" });
    }
    s.addShape(S.ROUNDED_RECTANGLE, { x: 7.75, y: 1.95, w: 4.98, h: 4.6, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: "ASR case card" });
    text(s, "INDIA", { x: 8.05, y: 2.2, w: 4.4, h: 0.35, fontSize: 12, bold: true, color: C.accent3, charSpacing: 1.5 });
    text(s, "ASR metal-on-metal hips", { x: 8.05, y: 2.6, w: 4.4, h: 0.5, fontSize: 22, bold: true });
    text(s, "≈4,700 implanted in India; recalled 2010", { x: 8.05, y: 3.12, w: 4.4, h: 0.75, fontSize: 16, color: C.text2 });
    text(s, [{ text: "1,080", options: { fontSize: 44, bold: true, color: C.accent3 } }, { text: "  traced by 2018", options: { fontSize: 17, color: C.accent3, bold: true } }], { x: 8.05, y: 3.9, w: 4.4, h: 0.85, valign: "middle" });
    text(s, "Report harm: MvPI 1800-180-3024", { x: 8.05, y: 5.55, w: 4.4, h: 0.7, fontSize: 15, color: C.accent1, bold: true });
  }

  // =====================================================================
  // CLOSE
  // =====================================================================
  pres.addSection({ title: "Close" });

  // 23. Closing vote
  {
    const s = newSlide("DARK", "Close", { kicker: "CLOSING VOTE", title: "Would you let a patient use it now?" });
    const qs = ["Which patient?", "Which use?", "Which evidence?", "Who is responsible?"];
    for (let i = 0; i < qs.length; i++) {
      const y = 1.95 + i * 1.0;
      s.addShape(S.ROUNDED_RECTANGLE, { x: M, y, w: 5.9, h: 0.7, rectRadius: 0.35, fill: { color: C.accent6, transparency: 82 }, line: { color: C.accent6, width: 1 }, objectName: `Closing question ${i + 1}` });
      text(s, qs[i], { x: M + 0.35, y, w: 5.3, h: 0.7, fontSize: 21, bold: true, valign: "middle", color: C.background1 });
    }
    optionCards(s, [
      { key: "1", label: "Routine care" },
      { key: "2", label: "Research study" },
      { key: "3", label: "Not yet" },
    ]);
    text(s, "Did your vote change? Why?", { x: M, y: 5.95, w: 5.9, h: 0.5, fontSize: 20, bold: true, color: C.accent2 });
  }

  // 24. Takeaway exercise
  {
    const s = newSlide("CONTENT", "Close", { kicker: "TAKEAWAY · 90 SECONDS", title: "Commit to one change" });
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 1.95, w: 8.0, h: 4.6, rectRadius: 0.15, fill: { color: C.background2 }, line: { color: C.accent1, width: 1.5, dashType: "dash" }, objectName: "Commitment card" });
    const lines = [
      ["Before ", "[next step]", ", I will ", "[action]", "."],
      ["Owner: ", "[name]"],
      ["I proceed only if ", "[condition]", "."],
    ];
    for (let i = 0; i < lines.length; i++) {
      const runs = lines[i].map((t, j) => ({ text: t, options: { color: j % 2 ? C.accent1 : C.text1, bold: j % 2 === 1 } }));
      text(s, runs, { x: M + 0.45, y: 2.35 + i * 1.3, w: 7.2, h: 1.0, fontSize: 26, valign: "middle" });
    }
    await iconCircle(s, "LuUsers", 9.25, 2.85, 1.2, { bg: C.accent2, fg: HEX.dk2 });
    text(s, "Write it.\nShare it.\nKeep it.", { x: 9.25, y: 4.3, w: 3.48, h: 1.5, fontSize: 24, bold: true, color: C.text2 });
  }

  // 25. Reusable decision checklist
  {
    const s = newSlide("REFERENCE", "Close", { kicker: "REUSABLE TOOL", title: "Patient-impact decision checklist" });
    const hdr = (t) => ({ text: t, options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 }, fontSize: 13, valign: "middle" } });
    const cell = (t, o = {}) => ({ text: t, options: Object.assign({ fontSize: 13, color: HEX.dk1, valign: "middle" }, o) });
    const rows = [
      ["Need", "Is the need validated with patients and clinicians?", "Need statement, observation notes", "Clinical lead"],
      ["Evidence", "Does evidence match the claim, users and version? Are failures controlled?", "Protocol, subgroups, risk file, version log", "Study lead"],
      ["People", "Can people refuse freely? Are conflicts managed?", "Consent in local language, COI plan", "Investigator, ethics committee"],
      ["Permission", "Which CDSCO permission covers this use?", "Class, licence or permission, CTRI", "Regulatory lead"],
      ["Access", "Can users afford, use and maintain it? Do claims match evidence?", "Total cost, service plan, claims review", "Product and service"],
      ["Safety", "Who records, reports and acts on harm?", "Complaint log, MvPI route, update plan", "Manufacturer, clinic"],
    ];
    const tbl = [[hdr("Stage"), hdr("Ask before proceeding"), hdr("Evidence to see"), hdr("Owner"), hdr("Go?")]];
    rows.forEach((r, i) => {
      const fill = { color: i % 2 ? HEX.lt1 : HEX.lt2 };
      tbl.push([cell(r[0], { bold: true, fill, color: HEX.accent1 }), cell(r[1], { fill }), cell(r[2], { fill }), cell(r[3], { fill }), cell("☐ Yes  ☐ Not yet", { fill, fontSize: 12 })]);
    });
    s.addTable(tbl, { x: M, y: 1.6, w: 12.13, colW: [1.35, 3.85, 3.2, 2.2, 1.53], rowH: 0.66, border: { type: "solid", color: "D5DFDD", pt: 0.75 }, margin: [0.04, 0.1, 0.04, 0.1], objectName: "Decision checklist" });
    text(s, "For every “Not yet”: name the owner and the condition for proceeding.", { x: M, y: 6.4, w: 12.1, h: 0.4, fontSize: 15, bold: true, color: C.text2 });
  }

  // =====================================================================
  // APPENDIX
  // =====================================================================
  pres.addSection({ title: "Appendix" });

  // 26. Evidence requests
  {
    const s = newSlide("REFERENCE", "Appendix", { kicker: "APPENDIX · CASE REVIEW", title: "Evidence to request before stronger claims" });
    const hdr = (t) => ({ text: t, options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 }, fontSize: 13, valign: "middle" } });
    const cell = (t, o = {}) => ({ text: t, options: Object.assign({ fontSize: 12, color: HEX.dk1, valign: "middle" }, o) });
    const rows = [
      ["Outcome", "Freeze detection against video-annotated events; falls, confidence, walking", "Pain and function with minimal important difference; structural outcomes only if claimed"],
      ["Comparison", "Participant-level validation; cue vs no-cue or sham cue", "Randomised, blinded sham comparison; co-interventions recorded"],
      ["Who", "Disease stage, walking aids, homes, turning and doorways", "Age, BMI, severity, comorbidities, rural access"],
      ["Burden and harm", "False cues, missed events, signal loss, skin, data", "Adverse events, adherence to 45-minute sessions, support needs"],
      ["Version", "Firmware and model version for every result", "Controller and applicator version for every result"],
    ];
    const tbl = [[hdr("Question"), hdr("FoGO"), hdr("SwaKnee")]];
    rows.forEach((r, i) => {
      const fill = { color: i % 2 ? HEX.lt1 : HEX.lt2 };
      tbl.push([cell(r[0], { bold: true, fill }), cell(r[1], { fill }), cell(r[2], { fill })]);
    });
    s.addTable(tbl, { x: M, y: 1.65, w: 12.13, colW: [1.6, 5.26, 5.27], rowH: 0.78, border: { type: "solid", color: "D5DFDD", pt: 0.75 }, margin: [0.05, 0.1, 0.05, 0.1], objectName: "Evidence request table" });
  }

  // 27. What independent evidence says
  {
    const s = newSlide("REFERENCE", "Appendix", { kicker: "APPENDIX · EVIDENCE CONTEXT", title: "What independent evidence says" });
    const cols = [
      { h: "Freezing-of-gait detection and cueing (FoGO)", rows: [
        ["LuDatabase", "Best-known benchmark: 10 patients, laboratory only (Daphnet, 2010)"],
        ["LuActivity", "One review: sensitivity 73–100%, specificity 67–100%, mostly in laboratories"],
        ["LuVibrate", "Cueing: modest gait gains (RESCUE trial); no trial found showing fewer falls"],
        ["LuHourglass", "FoGO: F1 0.83–0.85 on public data; prospective study planned (project-reported)"],
      ] },
      { h: "PEMF for knee osteoarthritis (SwaKnee)", rows: [
        ["LuBookOpen", "Cochrane 2013 (all OA sites): pain probably eases ≈15/100 more than sham"],
        ["LuSplit", "Meta-analyses disagree on pain (Chen 2019, knee; Yang 2020, all OA sites)"],
        ["LuCircleX", "OARSI 2019: electromagnetic therapy strongly recommended against"],
        ["LuBone", "No human evidence found of cartilage regrowth"],
      ] },
    ];
    for (let c = 0; c < 2; c++) {
      const x = M + c * 6.2;
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 1.65, w: 5.93, h: 4.95, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Evidence context ${c}` });
      text(s, cols[c].h, { x: x + 0.3, y: 1.85, w: 5.4, h: 0.45, fontSize: 17, bold: true, color: C.accent1 });
      for (let r = 0; r < 4; r++) {
        const y = 2.5 + r * 1.0;
        s.addImage({ data: await icon(cols[c].rows[r][0], HEX.dk2), x: x + 0.3, y: y - 0.02, w: 0.38, h: 0.38, altText: cols[c].rows[r][1] });
        text(s, cols[c].rows[r][1], { x: x + 0.95, y, w: 4.75, h: 0.85, fontSize: 15, valign: "top" });
      }
    }
  }

  // 28+. Reference slides (clickable): entries flow down two columns, then onto further slides.
  {
    const colW = 5.9, top = 1.62, bottom = 6.78, gap = 0.16;
    const est = (it) => 0.21 + Math.ceil(it.detail.length / 100) * 0.17 + 0.03; // label + wrapped 10 pt lines
    const flow = (items, limit) => {
      const pages = [];
      let page = [[], []], col = 0, y = top;
      for (const it of items) {
        const h = est(it);
        if (y + h > limit && y > top) {
          if (col === 0) { col = 1; y = top; }
          else { pages.push(page); page = [[], []]; col = 0; y = top; }
        }
        page[col].push({ it, y, h });
        y += h + gap;
      }
      pages.push(page);
      return pages;
    };
    for (const group of REFS) {
      // fewest pages first, then the lowest column limit that still fits them, so columns end level
      const n = flow(group.items, bottom).length;
      let limit = top + 0.5, pages;
      while ((pages = flow(group.items, limit)).length > n) limit += 0.05;
      pages.forEach((pg, pi) => {
        const title = pages.length > 1 ? `${group.title} (${pi + 1}/${pages.length})` : group.title;
        const s = newSlide("REFERENCE", "Appendix", { kicker: "APPENDIX · SOURCES", title, source: group.footer || "" });
        s.addNotes(`REFERENCE SLIDE · ${title}\nClickable source list for participants and for Q&A. Each linked title opens the source; the line below gives the full citation. Sources checked 7 October 2026.`);
        pg.forEach((colItems, c) => colItems.forEach(({ it, y, h }) => {
          const x = M + c * (colW + 0.33);
          const label = it.url
            ? { text: it.label, options: { bold: true, fontSize: 12, color: C.accent1, hyperlink: { url: it.url, tooltip: it.url }, breakLine: true } }
            : { text: it.label + (it.supplied ? "" : " · no public link"), options: { bold: true, fontSize: 12, color: C.accent1, breakLine: true } };
          text(s, [label, { text: it.detail, options: { fontSize: 10, color: C.text2 } }], { x, y, w: colW, h });
        }));
      });
    }
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("Wrote", OUT, "slides:", n);
})().catch((e) => { console.error(e); process.exit(1); });
