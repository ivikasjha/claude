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

  async function factRows(s, facts, { x = M, y = 2.05, w = 5.9, rowH = 0.95, dark = true, fontSize = 20 } = {}) {
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
    const ix = 8.15, iw = 2.2, ih = 2.09, iy = 2.0;
    s.addImage({ path: img("title_fogo.jpg"), x: ix, y: iy, w: iw, h: ih, altText: "FoGO ankle sensor module beside its strap, with a ruler for scale" });
    s.addImage({ path: img("title_swaknee.jpg"), x: ix + iw + 0.3, y: iy, w: iw, h: ih, altText: "SwaKnee controller connected to its knee applicator" });
    text(s, [{ text: "FoGO", options: { bold: true, color: C.background1, breakLine: true } }, { text: "Freezing-of-gait wearable", options: { color: C.accent6 } }], { x: ix, y: iy + ih + 0.15, w: iw, h: 0.6, fontSize: 13 });
    text(s, [{ text: "SwaKnee", options: { bold: true, color: C.background1, breakLine: true } }, { text: "PEMF knee system", options: { color: C.accent6 } }], { x: ix + iw + 0.3, y: iy + ih + 0.15, w: iw, h: 0.6, fontSize: 13 });
    text(s, "Authentic prototype photographs", { x: ix, y: iy - 0.42, w: 4.7, h: 0.3, fontSize: 11, color: C.accent6, italic: true });
    s.addNotes(NOTES[n]);
  }

  // 2. Disclosure
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "BEFORE WE START", title: "My interests, stated first" });
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 2.0, w: 6.2, h: 4.3, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Disclosure panel" });
    await iconCircle(s, "LuHandshake", M + 0.45, 2.45, 1.0, { bg: C.accent2 });
    text(s, "I have professional interests in FoGO and SwaKnee.", { x: M + 0.45, y: 3.7, w: 5.4, h: 1.2, fontSize: 26, bold: true, fontFace: undefined });
    text(s, "Judge my evidence as you would anyone else’s.", { x: M + 0.45, y: 5.05, w: 5.4, h: 0.9, fontSize: 18, color: C.text2 });
    const rules = [
      { icon: "LuVote", t: "Vote before hearing my view" },
      { icon: "LuSearch", t: "Challenge every claim" },
      { icon: "LuLock", t: "Protect every identity" },
    ];
    for (let i = 0; i < rules.length; i++) {
      const y = 2.15 + i * 1.4;
      await iconCircle(s, rules[i].icon, 7.45, y, 0.85);
      text(s, rules[i].t, { x: 8.55, y, w: 4.2, h: 0.85, fontSize: 20, valign: "middle" });
    }
  }

  // 3. Opening vote
  {
    const s = newSlide("DARK", "Opening", { kicker: "OPENING VOTE", title: "Would you let a patient use it?" });
    await factRows(s, [
      { icon: "LuWrench", text: "Working prototype" },
      { icon: "LuFlaskConical", text: "Promising lab results" },
      { icon: "LuFileCheck", text: "Test licence granted" },
    ], { y: 2.2, rowH: 1.1 });
    optionCards(s, [
      { key: "1", label: "Routine care" },
      { key: "2", label: "Research study" },
      { key: "3", label: "Not yet" },
    ]);
    text(s, "Show 1, 2 or 3 fingers", { x: M, y: 5.75, w: 5.9, h: 0.5, fontSize: 20, bold: true, color: C.accent2 });
  }

  // 4. Three teaching traditions
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "THE LENSES WE BORROW", title: "Three teaching traditions, one patient in India" });
    const cols = [
      { icon: "LuCompass", org: "Stanford Biodesign", lens: "Start from a validated need" },
      { icon: "LuScale", org: "Harvard bioethics", lens: "Respect persons and their choices" },
      { icon: "LuLayers", org: "Cambridge design", lens: "Design for people and whole systems" },
    ];
    const cw = 3.75, gap = 0.44;
    for (let i = 0; i < cols.length; i++) {
      const x = M + i * (cw + gap);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 1.95, w: cw, h: 2.75, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Lens ${cols[i].org}` });
      await iconCircle(s, cols[i].icon, x + 0.35, 2.25, 0.85);
      text(s, cols[i].org, { x: x + 0.35, y: 3.25, w: cw - 0.6, h: 0.45, fontSize: 20, bold: true });
      text(s, cols[i].lens, { x: x + 0.35, y: 3.72, w: cw - 0.6, h: 0.8, fontSize: 17, color: C.text2 });
      s.addShape(S.LINE, { x: x + cw / 2, y: 4.75, w: 0, h: 0.45, line: { color: C.accent5, width: 1.5, endArrowType: "triangle" }, objectName: "Arrow down" });
    }
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 5.3, w: 12.13, h: 1.25, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "India banner" });
    await iconCircle(s, "LuMapPin", M + 0.3, 5.5, 0.85, { bg: C.accent2, fg: HEX.dk2 });
    text(s, [
      { text: "Adapted for India  ", options: { bold: true, color: C.background1 } },
      { text: "CDSCO · ICMR · MvPI · NPPA · out-of-pocket care", options: { color: C.accent6 } },
    ], { x: M + 1.4, y: 5.3, w: 10.5, h: 1.25, fontSize: 20, valign: "middle" });
  }

  // 5. Two people we will follow
  {
    const s = newSlide("CONTENT", "Opening", { kicker: "OUR PATIENTS TODAY", title: "Two people we will follow" });
    const people = [
      { name: "Ramesh, 71", facts: ["Parkinson’s disease", "Freezes in doorways", "Lives with his daughter"], icons: ["LuBrain", "LuFootprints", "LuHouse"], device: "FoGO", photo: "thumb_fogo.jpg", alt: "FoGO ankle module" },
      { name: "Kamala, 64", facts: ["Knee osteoarthritis", "30 km from the clinic", "Pays out of pocket"], icons: ["LuBone", "LuBus", "LuWallet"], device: "SwaKnee", photo: "thumb_swaknee.jpg", alt: "SwaKnee controller and applicator" },
    ];
    for (let i = 0; i < 2; i++) {
      const p = people[i];
      const x = M + i * 6.25;
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 1.95, w: 5.88, h: 4.6, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Persona ${p.name}` });
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
    const s = newSlide("CONTENT", "Opening", { kicker: "THE PATH FROM IDEA TO IMPACT", title: "Each stage must answer a patient’s question" });
    const qs = ["“Will it help me?”", "“Is there proof?”", "“Can I say no?”", "“Is it allowed?”", "“Can I afford it?”", "“Who answers later?”"];
    const icons = ["LuTarget", "LuMicroscope", "LuHand", "LuLandmark", "LuIndianRupee", "LuSiren"];
    const x0 = M + 0.2, step = 2.05, d = 1.4, y = 2.3;
    s.addShape(S.LINE, { x: x0 + d / 2, y: y + d / 2, w: step * 5, h: 0, line: { color: C.accent6, width: 3 }, objectName: "Journey line" });
    for (let i = 0; i < 6; i++) {
      const x = x0 + i * step;
      await iconCircle(s, icons[i], x, y, d, { bg: C.accent1 });
      text(s, STAGES[i], { x: x - 0.3, y: y + d + 0.3, w: d + 0.6, h: 0.45, fontSize: 22, bold: true, align: "center" });
      text(s, qs[i], { x: x - 0.3, y: y + d + 0.8, w: d + 0.6, h: 0.85, fontSize: 18, italic: true, align: "center", color: C.text2 });
    }
    text(s, "We follow Ramesh and Kamala along this path.", { x: M, y: 5.95, w: 12.1, h: 0.45, fontSize: 18, italic: true, color: C.accent5 });
  }

  // =====================================================================
  // 1 NEED AND CLAIM
  // =====================================================================
  pres.addSection({ title: "Need and claim" });

  // 7. Claim wording sets the evidence bar
  {
    const s = newSlide("CONTENT", "Need and claim", { kicker: "1 · NEED AND CLAIM", title: "Claim wording sets the evidence bar", stage: 0 });
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 1.95, w: 4.9, h: 4.55, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "Need statement card" });
    text(s, "NEED STATEMENT", { x: M + 0.4, y: 2.25, w: 4.1, h: 0.35, fontSize: 13, bold: true, color: C.accent2, charSpacing: 1.5 });
    text(s, [
      { text: "A way to ", options: { color: C.background1 } },
      { text: "[outcome]", options: { color: C.accent2, bold: true } },
      { text: " in ", options: { color: C.background1 } },
      { text: "[population]", options: { color: C.accent2, bold: true } },
      { text: " with ", options: { color: C.background1 } },
      { text: "[problem]", options: { color: C.accent2, bold: true } },
    ], { x: M + 0.4, y: 2.8, w: 4.1, h: 2.2, fontSize: 28 });
    text(s, "Stanford Biodesign format", { x: M + 0.4, y: 5.7, w: 4.1, h: 0.4, fontSize: 14, italic: true, color: C.accent6 });

    const rows = [
      { claim: "“Shows walking patterns”", out: "Lower promise", key: "low" },
      { claim: "“Detects freezing of gait in Parkinson’s”", out: "Medical purpose: class, proof, licence", key: "high" },
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
    const s = newSlide("DARK", "Evidence", { kicker: "2 · EVIDENCE · FoGO", title: "What did the prototype actually show?", stage: 1 });
    const vw = 5.9, vh = vw / (1384 / 1080);
    s.addMedia({ type: "video", path: vid("fogo_prototype.mp4"), cover: "data:" + dataUri(img("fogo_video_poster.png")), x: M, y: 1.85, w: vw, h: vh, objectName: "FoGO prototype clip (12 s)" });
    text(s, "12 s · staged demonstration · simulated freeze · face obscured", { x: M, y: 1.85 + vh + 0.08, w: vw, h: 0.3, fontSize: 11, italic: true, color: C.accent6 });
    const colX = [7.0, 10.0];
    const heads = [{ t: "Seen", c: C.accent6, k: "demonstrated" }, { t: "Not yet shown", c: C.accent2, k: "planned" }];
    const items = [["Ankle sensor registers a stop", "App flags a possible freeze", "Chest module vibrates"], ["Real freezes, in real homes", "Many different users", "Fewer falls or better walking"]];
    for (let c = 0; c < 2; c++) {
      text(s, heads[c].t, { x: colX[c], y: 2.0, w: 2.75, h: 0.5, fontSize: 22, bold: true, color: heads[c].c });
      for (let i = 0; i < 3; i++) {
        const y = 2.75 + i * 1.2;
        s.addShape(S.ROUNDED_RECTANGLE, { x: colX[c], y, w: 2.75, h: 0.98, rectRadius: 0.12, fill: { color: c === 0 ? C.accent1 : C.text2 }, line: { color: c === 0 ? C.accent1 : C.accent2, width: 1.25, dashType: c === 0 ? "solid" : "dash" }, objectName: heads[c].t + " item" });
        text(s, items[c][i], { x: colX[c] + 0.15, y, w: 2.45, h: 0.98, fontSize: 16, color: C.background1, valign: "middle" });
      }
    }
  }

  // 9. Evidence ladder
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "2 · EVIDENCE · FoGO", title: "FoGO has climbed two rungs, not five", stage: 1 });
    const rungs = [
      { t: "Prototype works on a volunteer", k: "demonstrated", ideal: "Pre-IDEAL" },
      { t: "Detection tested on public datasets", k: "reported", ideal: "Pre-IDEAL" },
      { t: "Prospective study in people with Parkinson’s", k: "planned", ideal: "1–2a" },
      { t: "Benefit in daily life", k: "notyet", ideal: "2b–3" },
      { t: "Long-term safety and fair performance", k: "notyet", ideal: "4" },
    ];
    const bw = 2.3, bh = 0.6, x0 = M, yBase = 6.3;
    for (let i = 0; i < rungs.length; i++) {
      const r = rungs[i];
      const st = STATUS[r.k];
      const x = x0 + i * (bw + 0.15);
      const y = yBase - (i + 1) * bh;
      const filled = r.k === "demonstrated" || r.k === "reported";
      s.addShape(S.RECTANGLE, { x, y, w: bw, h: yBase - y, fill: { color: filled ? C.accent1 : C.background2, transparency: r.k === "reported" ? 45 : 0 }, line: { color: C[st.color], width: 1.5, dashType: st.dash === "dash" ? "dash" : "solid" }, objectName: `Rung ${i + 1}` });
      text(s, String(i + 1), { x: x + 0.15, y: y + 0.08, w: 0.5, h: 0.45, fontSize: 22, bold: true, color: filled ? C.background1 : C[st.color] });
      text(s, r.t, { x, y: y - 1.37, w: bw, h: 0.85, fontSize: 15, bold: true, valign: "bottom" });
      statusChip(s, x, y - 0.47, r.k, { w: bw });
      text(s, (r.ideal.startsWith("Pre") ? "" : "IDEAL stage ") + r.ideal, { x, y: yBase + 0.08, w: bw, h: 0.3, fontSize: 12, color: C.accent5 });
    }
    text(s, "NEXT RUNG", { x: M, y: 2.0, w: 4.6, h: 0.32, fontSize: 13, bold: true, color: C.accent2, charSpacing: 1.5 });
    text(s, "A prospective study in people with Parkinson’s, with independent event labels", { x: M, y: 2.35, w: 4.6, h: 1.1, fontSize: 19, color: C.text2 });
  }

  // 10. Decision 1: home pilot
  {
    const s = newSlide("DARK", "Evidence", { kicker: "WOULD YOU PROCEED? · DECISION 1 OF 4", title: "A home pilot for Ramesh next month?", stage: 1 });
    await factRows(s, [
      { icon: "LuDatabase", text: "Strong accuracy on public datasets" },
      { icon: "LuHouse", text: "Ten participants, alone at home" },
      { icon: "LuHourglass", text: "Ethics approval still pending" },
    ], { y: 2.2, rowH: 1.1 });
    optionCards(s, [
      { key: "A", label: "Proceed" },
      { key: "B", label: "Proceed with conditions", sub: "Name them" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // 11. Risk map
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "2 · EVIDENCE · FoGO RISKS", title: "Rank each failure by harm and likelihood", stage: 1 });
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
    text(s, "Likelihood →", { x: gx, y: gy + 3 * ch + 0.45, w: 3 * cw, h: 0.3, fontSize: 12, align: "center", color: C.accent5 });
    text(s, "Severity ↑", { x: M, y: gy - 0.05, w: 1.3, h: 0.3, fontSize: 12, align: "right", color: C.accent5 });
    const pts = [
      { t: "Missed freeze", r: 0, c: 1, dx: 0.15, dy: 0.2, ic: "LuFootprints" },
      { t: "Silent signal loss", r: 0, c: 1, dx: 0.15, dy: 0.75, ic: "LuWifiOff" },
      { t: "Flat battery mid-walk", r: 1, c: 1, dx: 0.15, dy: 0.45, ic: "LuBatteryLow" },
      { t: "Data exposure", r: 1, c: 0, dx: 0.15, dy: 0.45, ic: "LuLock" },
      { t: "False cue", r: 2, c: 2, dx: 0.15, dy: 0.2, ic: "LuVibrate" },
      { t: "Skin irritation", r: 2, c: 1, dx: 0.15, dy: 0.45, ic: "LuHand" },
    ];
    for (const p of pts) {
      const x = gx + p.c * cw + p.dx, y = gy + p.r * ch + p.dy;
      s.addShape(S.ROUNDED_RECTANGLE, { x, y, w: cw - 0.3, h: 0.46, rectRadius: 0.23, fill: { color: C.background1 }, line: { color: C.text2, width: 0.75 }, shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 3, offset: 1, angle: 90 }, objectName: `Failure ${p.t}` });
      s.addImage({ data: await icon(p.ic, HEX.dk2), x: x + 0.1, y: y + 0.07, w: 0.32, h: 0.32, altText: p.t });
      text(s, p.t, { x: x + 0.5, y, w: cw - 0.85, h: 0.46, fontSize: 13, bold: true, valign: "middle" });
    }
    s.addShape(S.ROUNDED_RECTANGLE, { x: 9.95, y: 1.95, w: 2.78, h: 4.14, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "Question panel" });
    await iconCircle(s, "LuShieldCheck", 10.25, 2.25, 0.8, { bg: C.accent2, fg: HEX.dk2 });
    text(s, "Which control would you test first?", { x: 10.25, y: 3.3, w: 2.25, h: 1.8, fontSize: 22, bold: true, color: C.background1 });
    text(s, "Illustrative ranking for discussion", { x: 10.25, y: 5.2, w: 2.3, h: 0.7, fontSize: 13, italic: true, color: C.accent6 });
  }

  // 12. SwaKnee video
  {
    const s = newSlide("DARK", "Evidence", { kicker: "2 · EVIDENCE · SWAKNEE", title: "A device is also a daily routine", stage: 1 });
    const vw = 6.4, vh = vw / 1.4;
    s.addMedia({ type: "video", path: vid("swaknee_how_to_use.mp4"), cover: "data:" + dataUri(img("swaknee_video_poster.png")), x: M, y: 1.85, w: vw, h: vh, objectName: "SwaKnee how-to-use clip (20 s)" });
    text(s, "20 s · company demonstration of use · not clinical-outcome footage", { x: M, y: 1.85 + vh + 0.08, w: vw, h: 0.3, fontSize: 11, italic: true, color: C.accent6 });
    text(s, "≈34 hours", { x: 7.55, y: 1.95, w: 5.2, h: 1.1, fontSize: 60, bold: true, color: C.accent2 });
    text(s, "45 minutes a day for 45 days", { x: 7.55, y: 3.05, w: 5.2, h: 0.5, fontSize: 20, color: C.accent6 });
    s.addShape(S.LINE, { x: 7.55, y: 3.85, w: 5.0, h: 0, line: { color: C.accent6, width: 0.75 }, objectName: "Divider" });
    await iconCircle(s, "LuCircleHelp", 7.55, 4.2, 0.75, { bg: C.accent6, fg: HEX.dk2 });
    text(s, "Who helps Kamala when something goes wrong?", { x: 8.5, y: 4.15, w: 4.2, h: 1.3, fontSize: 22, bold: true, color: C.background1 });
  }

  // 13. Claim vs evidence
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "2 · EVIDENCE · SWAKNEE", title: "Which claim can this evidence carry?", stage: 1 });
    s.addChart(pres.charts.BAR, [{ name: "Average VAS pain reduction at day 45 (%)", labels: ["SwaKnee (n=40)", "Comparison (n=42)"], values: [32, 14] }], {
      x: M, y: 1.9, w: 5.6, h: 4.55, barDir: "col", barGapWidthPct: 70,
      chartColors: [HEX.accent1, HEX.accent5], showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: '0"%"',
      dataLabelFontSize: 16, dataLabelFontBold: true, dataLabelColor: HEX.dk1, dataLabelFontFace: "+mn-lt",
      showTitle: true, title: "Average pain reduction at day 45, company-reported (%)", titleFontSize: 13, titleColor: HEX.dk1, titleFontFace: "+mn-lt",
      showLegend: false, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLabelFontFace: "+mn-lt", catAxisLineShow: false,
      valAxisMinVal: 0, valAxisMaxVal: 40, objectName: "SwaKnee company-reported pain chart",
    });
    const claims = [
      { t: "“Less pain on average in one 45-day company study”", k: "reported", label: "Reported" },
      { t: "“Clinically proven”", k: "notyet", label: "Needs independent trials" },
      { t: "“Regrows cartilage”", k: "notyet", label: "Not measured" },
    ];
    for (let i = 0; i < claims.length; i++) {
      const y = 2.0 + i * 1.5;
      s.addShape(S.ROUNDED_RECTANGLE, { x: 6.75, y, w: 5.98, h: 1.25, rectRadius: 0.12, fill: { color: C.background2 }, line: { type: "none" }, objectName: "Claim row" });
      text(s, claims[i].t, { x: 6.95, y, w: 3.35, h: 1.25, fontSize: 17, italic: true, valign: "middle" });
      statusChip(s, 10.45, y + 0.44, claims[i].k, { w: 2.1, label: claims[i].label });
    }
  }

  // 14. Average hides a patient
  {
    const s = newSlide("CONTENT", "Evidence", { kicker: "2 · EVIDENCE · EQUITY", title: "An average can hide a patient", stage: 1 });
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
      const y = 3.3 + i * 0.95;
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
    const s = newSlide("DARK", "People", { kicker: "WOULD YOU PROCEED? · DECISION 2 OF 4", title: "Ramesh’s neurologist is also the inventor", stage: 2 });
    await factRows(s, [
      { icon: "LuMessageCircle", text: "“Will saying no change my care?”", italic: true },
      { icon: "LuLanguages", text: "Consent form in English only" },
      { icon: "LuCamera", text: "Clinic wants to film him for a talk" },
    ], { y: 2.2, rowH: 1.1 });
    optionCards(s, [
      { key: "A", label: "Recruit as planned" },
      { key: "B", label: "Proceed with safeguards", sub: "Which ones?" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // 16. Conflicts of interest
  {
    const s = newSlide("CONTENT", "People", { kicker: "3 · PEOPLE · CONFLICTS OF INTEREST", title: "Disclosure starts the work; management finishes it", stage: 2 });
    const cols = [
      { h: "Interests", c: C.accent2, items: [["LuCircleDollarSign", "Equity or royalties"], ["LuLandmark", "Grants and institution"], ["LuMegaphone", "Reputation"]] },
      { h: "Risks", c: C.accent3, items: [["LuUsers", "Pressure to enrol"], ["LuEye", "Optimistic outcome reading"], ["LuFileText", "Selective reporting"]] },
      { h: "Safeguards", c: C.accent1, items: [["LuUserCheck", "Independent consent and assessment"], ["LuClipboardCheck", "Prospective CTRI registration"], ["LuBookOpen", "Publish all results"]] },
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
    const s = newSlide("CONTENT", "Permission and access", { kicker: "4 · PERMISSION · INDIA", title: "Each permission answers a different question", stage: 3 });
    const steps = [
      { ic: "LuWrench", h: "Test licence", f: "MD-12 → MD-13", q: "Make units for testing?" },
      { ic: "LuUsers", h: "Clinical investigation", f: "MD-22 → MD-23 · ethics committee · CTRI", q: "Test in people?" },
      { ic: "LuPackage", h: "Manufacturing licence", f: "Class A/B: State · C/D: Central", q: "Sell for this use?" },
      { ic: "LuSiren", h: "Post-market duties", f: "Complaints · PSUR · MvPI · recall", q: "Still safe?" },
    ];
    const cw = 2.78, gap = 0.333;
    for (let i = 0; i < 4; i++) {
      const x = M + i * (cw + gap);
      const st = steps[i];
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: 1.95, w: cw, h: 3.05, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: `Pathway ${st.h}` });
      await iconCircle(s, st.ic, x + 0.25, 2.18, 0.7, { bg: C.accent4 });
      text(s, st.h, { x: x + 0.25, y: 3.0, w: cw - 0.45, h: 0.45, fontSize: 18, bold: true });
      text(s, st.q, { x: x + 0.25, y: 3.45, w: cw - 0.45, h: 0.75, fontSize: 17, italic: true, color: C.accent4 });
      text(s, st.f, { x: x + 0.25, y: 4.2, w: cw - 0.45, h: 0.7, fontSize: 13, color: C.text2 });
      if (i < 3) arrow(s, x + cw + 0.03, 3.45, gap - 0.06, C.accent4);
    }
    // risk class strip
    const classes = ["A", "B", "C", "D"];
    text(s, "Risk class", { x: M, y: 5.3, w: 1.4, h: 0.5, fontSize: 15, bold: true, valign: "middle" });
    classes.forEach((c, i) => {
      s.addShape(S.ROUNDED_RECTANGLE, { x: 2.1 + i * 0.95, y: 5.3, w: 0.8, h: 0.5, rectRadius: 0.1, fill: { color: C.accent4, transparency: 75 - i * 22 }, line: { type: "none" }, objectName: `Class ${c}` });
      text(s, c, { x: 2.1 + i * 0.95, y: 5.3, w: 0.8, h: 0.5, fontSize: 16, bold: true, align: "center", valign: "middle", color: i >= 2 ? C.background1 : C.text1 });
    });
    text(s, "Class sets the authority and the evidence expected", { x: 6.0, y: 5.3, w: 6.7, h: 0.5, fontSize: 15, valign: "middle", color: C.text2 });
    text(s, [
      { text: "Compare  ", options: { bold: true, color: C.accent4 } },
      { text: "US: IDE → 510(k) / De Novo / PMA   ·   EU: clinical evaluation → CE mark → post-market follow-up", options: { color: C.text2 } },
    ], { x: M, y: 6.05, w: 12.1, h: 0.45, fontSize: 14, valign: "middle" });
  }

  // 18. Inclusive design: exclusion audit
  {
    const s = newSlide("CONTENT", "Permission and access", { kicker: "5 · ACCESS · INCLUSIVE DESIGN", title: "Who can’t use it? Audit the demands", stage: 4 });
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
    [["Low", 1], ["Medium", 2], ["High demand", 3]].forEach(([t, v], i) => {
      s.addShape(S.OVAL, { x: x0 + 0.15 + i * 1.65, y: ly + 0.07, w: 0.22, h: 0.22, fill: { color: lvl[v] }, line: { type: "none" }, objectName: "Legend dot" });
      text(s, t, { x: x0 + 0.45 + i * 1.65, y: ly, w: 1.3, h: 0.36, fontSize: 13, color: C.text2, valign: "middle" });
    });
    s.addShape(S.ROUNDED_RECTANGLE, { x: 7.3, y: 1.95, w: 5.43, h: 4.6, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "India additions" });
    text(s, "ADD FOR INDIA", { x: 7.65, y: 2.2, w: 4.8, h: 0.32, fontSize: 13, bold: true, color: C.accent2, charSpacing: 1.5 });
    const adds = [["LuLanguages", "Odia, Hindi or English?"], ["LuBookA", "Low literacy"], ["LuPlug", "Unreliable power"], ["LuSmartphone", "Shared or no smartphone"], ["LuUsers", "Depends on a caregiver"]];
    for (let i = 0; i < adds.length; i++) {
      const y = 2.7 + i * 0.72;
      s.addImage({ data: await icon(adds[i][0], HEX.accent6), x: 7.65, y: y + 0.06, w: 0.4, h: 0.4, altText: adds[i][1] });
      text(s, adds[i][1], { x: 8.25, y, w: 4.3, h: 0.52, fontSize: 18, color: C.background1, valign: "middle" });
    }
  }

  // 19. Affordability
  {
    const s = newSlide("CONTENT", "Permission and access", { kicker: "5 · ACCESS", title: "The price tag is only part of the cost", stage: 4 });
    const steps = [
      { ic: "LuWallet", t: "Buy or rent" },
      { ic: "LuBus", t: "Travel for fitting" },
      { ic: "LuClock", t: "34 hours of sessions" },
      { ic: "LuUsers", t: "Family time" },
      { ic: "LuWrench", t: "Repairs and support" },
    ];
    const step = 1.62, d = 0.9, x0 = M + 0.25, y = 2.2;
    s.addShape(S.LINE, { x: x0 + d / 2, y: y + d / 2, w: step * 4, h: 0, line: { color: C.accent6, width: 3 }, objectName: "Cost journey line" });
    for (let i = 0; i < steps.length; i++) {
      const x = x0 + i * step;
      await iconCircle(s, steps[i].ic, x, y, d, { bg: i === 0 ? C.accent1 : C.accent2, fg: i === 0 ? HEX.lt1 : HEX.dk2 });
      text(s, steps[i].t, { x: x - 0.3, y: y + d + 0.15, w: d + 0.6, h: 0.75, fontSize: 15, bold: true, align: "center" });
    }
    text(s, "Kamala’s 45 days: who pays for each step?", { x: M, y: 4.35, w: 7.7, h: 0.5, fontSize: 20, italic: true, color: C.text2 });
    s.addShape(S.ROUNDED_RECTANGLE, { x: 8.95, y: 1.95, w: 3.78, h: 4.55, rectRadius: 0.15, fill: { color: C.text2 }, line: { type: "none" }, objectName: "NPPA precedent" });
    text(s, "INDIAN PRECEDENT", { x: 9.25, y: 2.2, w: 3.2, h: 0.35, fontSize: 12, bold: true, color: C.accent2, charSpacing: 1.5 });
    text(s, "2017", { x: 9.25, y: 2.6, w: 3.2, h: 0.95, fontSize: 54, bold: true, color: C.background1 });
    text(s, "NPPA capped prices of coronary stents and knee implants", { x: 9.25, y: 3.6, w: 3.2, h: 1.3, fontSize: 18, color: C.accent6 });
    text(s, "Affordability is an ethical design input.", { x: 9.25, y: 5.15, w: 3.2, h: 1.0, fontSize: 17, bold: true, color: C.background1 });
  }

  // 20. Decision 3: brochure
  {
    const s = newSlide("DARK", "Permission and access", { kicker: "WOULD YOU PROCEED? · DECISION 3 OF 4", title: "Launch with this brochure?", stage: 4 });
    // hypothetical brochure mock-up
    s.addShape(S.ROUNDED_RECTANGLE, { x: M, y: 1.95, w: 2.95, h: 3.9, rectRadius: 0.1, fill: { color: C.background1 }, line: { type: "none" }, shadow: { type: "outer", color: "000000", opacity: 0.35, blur: 8, offset: 3, angle: 90 }, objectName: "Hypothetical brochure" });
    text(s, "Clinically proven!", { x: M + 0.25, y: 2.25, w: 2.5, h: 0.55, fontSize: 22, bold: true, color: C.accent3 });
    text(s, "Regrows cartilage", { x: M + 0.25, y: 2.85, w: 2.5, h: 0.5, fontSize: 20, bold: true, color: C.text1 });
    text(s, "Doctor recommended", { x: M + 0.25, y: 3.4, w: 2.5, h: 0.45, fontSize: 17, color: C.text2 });
    text(s, "Avoid surgery forever", { x: M + 0.25, y: 3.9, w: 2.5, h: 0.45, fontSize: 17, color: C.text2 });
    text(s, "HYPOTHETICAL", { x: M + 0.25, y: 5.2, w: 2.5, h: 0.35, fontSize: 12, bold: true, color: C.accent5, charSpacing: 2 });
    await factRows(s, [
      { icon: "LuBriefcase", text: "Distributor wants these claims" },
      { icon: "LuTrendingUp", text: "Investors want launch this quarter" },
    ], { x: 3.85, y: 2.2, w: 2.95, rowH: 1.6, fontSize: 18 });
    optionCards(s, [
      { key: "A", label: "Launch as written" },
      { key: "B", label: "Launch, claims matched to evidence" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // =====================================================================
  // 5 SAFETY
  // =====================================================================
  pres.addSection({ title: "Lifetime safety" });

  // 21. Decision 4: software update
  {
    const s = newSlide("DARK", "Lifetime safety", { kicker: "WOULD YOU PROCEED? · DECISION 4 OF 4", title: "Push tonight’s FoGO update?", stage: 5 });
    s.addImage({ path: img("fogo_app_cue.png"), x: M, y: 1.85, w: 2.42, h: 4.83, altText: "FoGO prototype app showing an active vibration cue and its detection paths" });
    await factRows(s, [
      { icon: "LuVibrate", text: "Fewer false cues" },
      { icon: "LuFootprints", text: "May miss more freezes" },
      { icon: "LuDatabase", text: "Tested on stored data only" },
    ], { x: 3.35, y: 2.2, w: 3.5, rowH: 1.1 });
    optionCards(s, [
      { key: "A", label: "Push to all users" },
      { key: "B", label: "Staged release after review", sub: "Monitor, roll back" },
      { key: "C", label: "Not yet" },
    ]);
  }

  // 22. Harm response loop
  {
    const s = newSlide("CONTENT", "Lifetime safety", { kicker: "6 · SAFETY", title: "When harm happens, someone must answer", stage: 5 });
    const nodes = ["Care", "Record", "Report", "Investigate", "Correct", "Follow up"];
    const icons = ["LuHeartPulse", "LuFileText", "LuBell", "LuSearch", "LuWrench", "LuPhone"];
    const cx = 3.6, cy = 4.3, R = 1.75, d = 0.9;
    s.addShape(S.OVAL, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, fill: { type: "none" }, line: { color: C.accent6, width: 3 }, objectName: "Response loop" });
    s.addShape(S.OVAL, { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fill: { color: C.text2 }, line: { type: "none" }, objectName: "Patient centre" });
    text(s, "Patient", { x: cx - 0.85, y: cy - 0.85, w: 1.7, h: 1.7, fontSize: 18, bold: true, align: "center", valign: "middle", color: C.background1 });
    for (let i = 0; i < 6; i++) {
      const a = (-90 + i * 60) * Math.PI / 180;
      const x = cx + R * Math.cos(a) - d / 2, y = cy + R * Math.sin(a) - d / 2;
      await iconCircle(s, icons[i], x, y, d, { bg: i === 2 ? C.accent2 : C.accent1, fg: i === 2 ? HEX.dk2 : HEX.lt1 });
      const left = Math.cos(a) < -0.1;
      const lx = left ? x - 1.55 : x + d + 0.12;
      text(s, nodes[i], { x: lx, y: y + 0.24, w: 1.45, h: 0.42, fontSize: 16, bold: true, align: left ? "right" : "left" });
    }
    s.addShape(S.ROUNDED_RECTANGLE, { x: 7.75, y: 1.95, w: 4.98, h: 4.6, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: "ASR case card" });
    text(s, "INDIAN CASE", { x: 8.05, y: 2.2, w: 4.4, h: 0.35, fontSize: 12, bold: true, color: C.accent3, charSpacing: 1.5 });
    text(s, "ASR metal-on-metal hips", { x: 8.05, y: 2.6, w: 4.4, h: 0.55, fontSize: 22, bold: true });
    text(s, "Recalled globally in 2010. India’s expert committee set a compensation formula in 2018.", { x: 8.05, y: 3.25, w: 4.4, h: 1.3, fontSize: 17, color: C.text2 });
    text(s, "Many implanted patients were never traced.", { x: 8.05, y: 4.65, w: 4.4, h: 0.9, fontSize: 18, bold: true, color: C.accent3 });
    text(s, "Report suspected device harm to MvPI.", { x: 8.05, y: 5.65, w: 4.4, h: 0.6, fontSize: 15, color: C.accent1, bold: true });
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
      const y = 2.05 + i * 0.95;
      s.addShape(S.ROUNDED_RECTANGLE, { x: M, y, w: 5.9, h: 0.72, rectRadius: 0.36, fill: { color: C.accent6, transparency: 82 }, line: { color: C.accent6, width: 1 }, objectName: `Closing question ${i + 1}` });
      text(s, qs[i], { x: M + 0.35, y, w: 5.3, h: 0.72, fontSize: 21, bold: true, valign: "middle", color: C.background1 });
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
    const s = newSlide("CONTENT", "Close", { kicker: "TAKEAWAY EXERCISE · 90 SECONDS", title: "Commit to one change in your own project" });
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
    await iconCircle(s, "LuUsers", 9.25, 2.1, 1.0, { bg: C.accent2, fg: HEX.dk2 });
    text(s, "Write it. Read it to a neighbour. Keep it.", { x: 9.25, y: 3.35, w: 3.48, h: 1.7, fontSize: 22, bold: true, color: C.text2 });
    text(s, "Use the checklist on the next slide.", { x: 9.25, y: 5.3, w: 3.48, h: 0.9, fontSize: 16, color: C.accent5 });
  }

  // 25. Reusable decision checklist
  {
    const s = newSlide("REFERENCE", "Close", { kicker: "REUSABLE TOOL", title: "Patient-impact decision checklist" });
    const hdr = (t) => ({ text: t, options: { bold: true, color: HEX.lt1, fill: { color: HEX.dk2 }, fontSize: 13, valign: "middle" } });
    const cell = (t, o = {}) => ({ text: t, options: Object.assign({ fontSize: 12, color: HEX.dk1, valign: "middle" }, o) });
    const rows = [
      ["Need", "Is the need validated with patients and clinicians?", "Need statement, observation notes", "Clinical lead"],
      ["Evidence", "Does evidence match the exact claim and users?", "Protocol, subgroup results, failure modes", "Study lead"],
      ["People", "Can people refuse freely? Are conflicts managed?", "Consent in local language, COI plan", "Investigator, ethics committee"],
      ["Permission", "Which CDSCO permission covers this use?", "Class, licence or permission, CTRI", "Regulatory lead"],
      ["Access", "Can intended users afford, use and maintain it?", "Total cost, training, service plan", "Product and service"],
      ["Safety", "Who records, reports and acts on harm?", "Complaint log, MvPI route, update plan", "Manufacturer, clinic"],
    ];
    const tbl = [[hdr("Stage"), hdr("Ask before proceeding"), hdr("Evidence to see"), hdr("Owner"), hdr("Go?")]];
    rows.forEach((r, i) => {
      const fill = { color: i % 2 ? HEX.lt1 : HEX.lt2 };
      tbl.push([cell(r[0], { bold: true, fill, color: HEX.accent1 }), cell(r[1], { fill }), cell(r[2], { fill }), cell(r[3], { fill }), cell("☐ Yes  ☐ Not yet", { fill, fontSize: 12 })]);
    });
    s.addTable(tbl, { x: M, y: 1.65, w: 12.13, colW: [1.35, 3.85, 3.2, 2.2, 1.53], rowH: 0.62, border: { type: "solid", color: "D5DFDD", pt: 0.75 }, margin: [0.04, 0.1, 0.04, 0.1], objectName: "Decision checklist" });
    text(s, "For every “Not yet”: name the owner and the condition for proceeding.", { x: M, y: 6.25, w: 12.1, h: 0.45, fontSize: 15, bold: true, color: C.accent2 });
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
    s.addTable(tbl, { x: M, y: 1.65, w: 12.13, colW: [2.0, 5.06, 5.07], rowH: 0.78, border: { type: "solid", color: "D5DFDD", pt: 0.75 }, margin: [0.05, 0.1, 0.05, 0.1], objectName: "Evidence request table" });
  }

  // 27+. Reference slides (clickable)
  for (const page of REFS) {
    const s = newSlide("REFERENCE", "Appendix", { kicker: "APPENDIX · SOURCES", title: page.title, source: page.footer || "" });
    const colW = 5.9;
    page.items.forEach((it, i) => {
      const col = i < Math.ceil(page.items.length / 2) ? 0 : 1;
      const row = col === 0 ? i : i - Math.ceil(page.items.length / 2);
      const x = M + col * (colW + 0.33);
      const y = 1.65 + row * (page.rowH || 0.86);
      const runs = [
        { text: it.label, options: { bold: true, fontSize: 13, color: C.accent1, hyperlink: it.url ? { url: it.url, tooltip: it.url } : undefined, breakLine: true } },
        { text: it.detail, options: { fontSize: 11, color: C.text2 } },
      ];
      text(s, runs, { x, y, w: colW, h: (page.rowH || 0.86) - 0.06 });
    });
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("Wrote", OUT, "slides:", n);
})().catch((e) => { console.error(e); process.exit(1); });
