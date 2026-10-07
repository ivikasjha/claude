// Design system v2: layouts, infographic components, maps, flags and photo frames.
// Every component draws native shapes/text (editable in PowerPoint); only icons, maps, flags and photos are images.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");
const { THEME, HEX, W, H, M, img, vid, dataUri, icon, STATUS } = require("./lib");

const GEN = path.join(__dirname, "assets", "gen");
fs.mkdirSync(GEN, { recursive: true });
const hash = (s) => crypto.createHash("md5").update(s).digest("hex").slice(0, 10);

// Fresh shadow object per call (pptxgenjs mutates option objects).
const shadow = (opacity = 0.14, blur = 6) => ({ type: "outer", blur, offset: 2, angle: 90, color: "000000", opacity });

// Risk-class palette (A -> D), used for ladders, matrices and comparison tables.
const CLASS_COLORS = { A: "3C9D6A", B: "0F7C74", C: "E0962A", D: "C2453A" };

// ---------------------------------------------------------------- generated raster assets
async function gradientBg(key, { from = HEX.dk2, to = "0B1F24", glow = HEX.accent1, glow2 = HEX.accent2 } = {}) {
  const file = path.join(GEN, `bg_${key}.png`);
  if (fs.existsSync(file)) return file;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${from}"/><stop offset="1" stop-color="#${to}"/></linearGradient>
    <radialGradient id="r1" cx="0.88" cy="0.12" r="0.55"><stop offset="0" stop-color="#${glow}" stop-opacity="0.45"/><stop offset="1" stop-color="#${glow}" stop-opacity="0"/></radialGradient>
    <radialGradient id="r2" cx="0.08" cy="0.95" r="0.45"><stop offset="0" stop-color="#${glow2}" stop-opacity="0.22"/><stop offset="1" stop-color="#${glow2}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#g)"/>
  <rect width="1920" height="1080" fill="url(#r1)"/>
  <rect width="1920" height="1080" fill="url(#r2)"/>
  <g stroke="#FFFFFF" stroke-opacity="0.045" fill="none" stroke-width="1.5">
    <circle cx="1700" cy="140" r="420"/><circle cx="1700" cy="140" r="640"/><circle cx="1700" cy="140" r="860"/>
  </g>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(file);
  return file;
}

async function lightBg(key = "light") {
  const file = path.join(GEN, `bg_${key}.png`);
  if (fs.existsSync(file)) return file;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <rect width="1920" height="1080" fill="#FFFFFF"/>
  <defs><radialGradient id="r" cx="0.92" cy="0.05" r="0.5"><stop offset="0" stop-color="#${HEX.accent6}" stop-opacity="0.35"/><stop offset="1" stop-color="#${HEX.accent6}" stop-opacity="0"/></radialGradient></defs>
  <rect width="1920" height="1080" fill="url(#r)"/>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(file);
  return file;
}

// Photo cropped to cover w x h (px) with rounded corners; returns a PNG path.
async function roundedPhoto(file, { w = 1000, h = 667, radius = 48 } = {}) {
  const out = path.join(GEN, `ph_${hash(file + w + h + radius)}.png`);
  if (fs.existsSync(out)) return out;
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`);
  await sharp(file).resize(w, h, { fit: "cover", position: "attention" }).composite([{ input: mask, blend: "dest-in" }]).png({ palette: true, quality: 85, compressionLevel: 9 }).toFile(out);
  return out;
}

// Country flag (country-flag-icons, 3:2) with rounded corners.
async function flagPng(code) {
  const out = path.join(GEN, `flag_${code}.png`);
  if (fs.existsSync(out)) return out;
  const src = path.join(__dirname, "node_modules", "country-flag-icons", "3x2", `${code.toUpperCase()}.svg`);
  const w = 300, h = 200;
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="22" ry="22" fill="#fff"/></svg>`);
  await sharp(src).resize(w, h).composite([{ input: mask, blend: "dest-in" }]).png().toFile(out);
  return out;
}

// EU flag is not a country code in the pack; draw it (12 gold stars on blue).
async function euFlagPng() {
  const out = path.join(GEN, "flag_EU.png");
  if (fs.existsSync(out)) return out;
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2, cx = 150 + Math.cos(a) * 60, cy = 100 + Math.sin(a) * 60;
    const pts = Array.from({ length: 10 }, (_, k) => { const r = k % 2 ? 5.5 : 13, t = -Math.PI / 2 + (k * Math.PI) / 5; return `${(cx + Math.cos(t) * r).toFixed(1)},${(cy + Math.sin(t) * r).toFixed(1)}`; }).join(" ");
    return `<polygon points="${pts}" fill="#FFCC00"/>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" rx="22" fill="#003399"/>${stars}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

// ---------------------------------------------------------------- maps
function pathBBoxes(d) {
  // Returns the bbox of the largest sub-path (handles M/m/L/l/H/h/V/v/Z used by @svg-maps).
  const tok = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  let cmd = null, x = 0, y = 0, sx = 0, sy = 0, i = 0;
  let boxes = [], b = null;
  const pt = (px, py) => { if (!b) b = [px, py, px, py]; else { b[0] = Math.min(b[0], px); b[1] = Math.min(b[1], py); b[2] = Math.max(b[2], px); b[3] = Math.max(b[3], py); } };
  while (i < tok.length) {
    const t = tok[i];
    if (/[a-zA-Z]/.test(t)) {
      cmd = t; i++;
      if (cmd === "z" || cmd === "Z") { x = sx; y = sy; if (b) boxes.push(b); b = null; }
      continue;
    }
    switch (cmd) {
      case "m": x += +tok[i]; y += +tok[i + 1]; sx = x; sy = y; pt(x, y); i += 2; cmd = "l"; break;
      case "M": x = +tok[i]; y = +tok[i + 1]; sx = x; sy = y; pt(x, y); i += 2; cmd = "L"; break;
      case "l": x += +tok[i]; y += +tok[i + 1]; pt(x, y); i += 2; break;
      case "L": x = +tok[i]; y = +tok[i + 1]; pt(x, y); i += 2; break;
      case "h": x += +tok[i]; pt(x, y); i += 1; break;
      case "H": x = +tok[i]; pt(x, y); i += 1; break;
      case "v": y += +tok[i]; pt(x, y); i += 1; break;
      case "V": y = +tok[i]; pt(x, y); i += 1; break;
      default: i++;
    }
  }
  if (b) boxes.push(b);
  boxes.sort((p, q) => (q[2] - q[0]) * (q[3] - q[1]) - (p[2] - p[0]) * (p[3] - p[1]));
  return boxes[0] || [0, 0, 0, 0];
}

async function renderMap(pkg, key, { highlights = {}, base = "D5DFDD", stroke = "FFFFFF", pxW = 1800 } = {}) {
  const map = pkg.default || pkg;
  const [, , vw, vh] = map.viewBox.split(" ").map(Number);
  const out = path.join(GEN, `map_${key}_${hash(JSON.stringify(highlights) + base + stroke)}.png`);
  if (!fs.existsSync(out)) {
    const paths = map.locations.map((l) => `<path d="${l.path}" fill="#${highlights[l.id] || base}" stroke="#${stroke}" stroke-width="0.6"/>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${map.viewBox}" width="${pxW}" height="${Math.round((pxW * vh) / vw)}">${paths}</svg>`;
    await sharp(Buffer.from(svg)).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(out);
  }
  const centers = {};
  for (const l of map.locations) { const b = pathBBoxes(l.path); centers[l.id] = [(b[0] + b[2]) / 2 / vw, (b[1] + b[3]) / 2 / vh]; }
  // Bounding boxes mislead for multi-part countries; place markers on the mainland.
  const OVERRIDE = key === "world" ? { us: [0.175, 0.54], ca: [0.16, 0.40], ru: [0.68, 0.3], fr: [0.475, 0.455], dk: [0.49, 0.37], no: [0.5, 0.3] } : {};
  Object.assign(centers, OVERRIDE);
  return { file: out, aspect: vh / vw, centers };
}

// ---------------------------------------------------------------- bound UI
function makeUI(pres, { notes = {}, sources = {}, stages = ["Need", "Evidence", "People", "Permission", "Access", "Safety"] } = {}) {
  const C = pres.SchemeColor;
  const S = pres.shapes;
  let n = 0;
  const built = [];

  async function defineLayouts() {
    const dark = await gradientBg("dark");
    const section = await gradientBg("section", { from: "0E3B3D", to: "17262B", glow: HEX.accent2, glow2: HEX.accent1 });
    const light = await lightBg();
    const footerNum = (hex) => ({ x: 12.2, y: 6.98, w: 0.55, h: 0.28, fontSize: 10, color: hex, align: "right" });
    const ph = (name, o) => ({ placeholder: { options: Object.assign({ name, type: "body", margin: 0, align: "left", valign: "top" }, o), text: "" } });
    pres.defineSlideMaster({
      title: "TITLE_DARK", background: { path: dark },
      objects: [
        ph("kicker", { x: M, y: 0.95, w: 7.2, h: 0.32, fontSize: 13, bold: true, color: C.accent2, charSpacing: 3 }),
        ph("title", { type: "title", x: M, y: 1.4, w: 7.4, h: 2.5, fontSize: 44, bold: true, color: C.background1 }),
        ph("subtitle", { x: M, y: 4.05, w: 7.0, h: 0.85, fontSize: 18, color: C.accent6 }),
        ph("presenter", { x: M, y: 5.35, w: 7.0, h: 0.8, fontSize: 15, color: C.background1 }),
      ],
    });
    pres.defineSlideMaster({
      title: "SECTION", background: { path: section },
      objects: [
        ph("kicker", { x: M, y: 2.3, w: 8.0, h: 0.32, fontSize: 13, bold: true, color: C.accent2, charSpacing: 3 }),
        ph("title", { type: "title", x: M, y: 2.7, w: 8.2, h: 1.6, fontSize: 42, bold: true, color: C.background1 }),
        ph("subtitle", { x: M, y: 4.35, w: 7.6, h: 1.0, fontSize: 17, color: C.accent6 }),
      ],
    });
    pres.defineSlideMaster({
      title: "CONTENT", background: { path: light },
      objects: [
        ph("kicker", { x: M, y: 0.4, w: 8.6, h: 0.3, fontSize: 12, bold: true, color: C.accent1, charSpacing: 1.5 }),
        ph("title", { type: "title", x: M, y: 0.72, w: 11.2, h: 0.8, fontSize: 30, bold: true, color: C.text1 }),
        ph("source", { x: M, y: 7.0, w: 11.3, h: 0.3, fontSize: 9.5, color: C.accent5 }),
      ],
      slideNumber: footerNum(HEX.accent5),
    });
    pres.defineSlideMaster({
      title: "DARK", background: { path: dark },
      objects: [
        ph("kicker", { x: M, y: 0.4, w: 8.6, h: 0.3, fontSize: 12, bold: true, color: C.accent2, charSpacing: 1.5 }),
        ph("title", { type: "title", x: M, y: 0.72, w: 11.2, h: 0.8, fontSize: 30, bold: true, color: C.background1 }),
        ph("source", { x: M, y: 7.0, w: 11.3, h: 0.3, fontSize: 9.5, color: C.accent6 }),
      ],
      slideNumber: footerNum(HEX.accent6),
    });
    pres.defineSlideMaster({
      title: "REFERENCE", background: { color: HEX.lt1 },
      objects: [
        ph("kicker", { x: M, y: 0.4, w: 8.6, h: 0.3, fontSize: 12, bold: true, color: C.accent5, charSpacing: 1.5 }),
        ph("title", { type: "title", x: M, y: 0.72, w: 11.8, h: 0.7, fontSize: 26, bold: true, color: C.text1 }),
        ph("source", { x: M, y: 7.0, w: 11.3, h: 0.3, fontSize: 9.5, color: C.accent5 }),
      ],
      slideNumber: footerNum(HEX.accent5),
    });
  }

  function tracker(s, active, dark) {
    const x0 = 10.55, y = 0.5, step = 0.4;
    stages.forEach((name, i) => {
      const on = i === active, d = on ? 0.24 : 0.14, cx = x0 + i * step;
      s.addShape(S.OVAL, {
        x: cx - d / 2, y: y - d / 2, w: d, h: d,
        fill: i <= active ? { color: on ? C.accent1 : C.accent6 } : { color: dark ? C.text2 : C.background1 },
        line: { color: i <= active ? C.accent1 : (dark ? C.accent6 : C.accent5), width: 1 },
        objectName: `Progress ${name}`,
      });
    });
  }

  // Slides are identified by id; notes and source lines are looked up by id.
  function newSlide(master, section, { id, kicker, title, source, stage, core } = {}) {
    n += 1;
    const s = pres.addSlide({ masterName: master, sectionTitle: section });
    if (kicker) s.addText(kicker, { placeholder: "kicker" });
    if (title) s.addText(title, { placeholder: "title" });
    const src = source !== undefined ? source : sources[id];
    if (src && master !== "SECTION" && master !== "TITLE_DARK") s.addText(src, { placeholder: "source" });
    if (stage !== undefined) tracker(s, stage, master === "DARK");
    if (id && notes[id]) s.addNotes(notes[id]);
    built.push({ n, id, title, master, section, core: !!core });
    s.__id = id; s.__n = n;
    return s;
  }

  const dark = (s) => s.__dark === true;
  function text(s, t, o) {
    return s.addText(t, Object.assign({ isTextBox: true, margin: 0, valign: "top", fontSize: 14, color: C.text1 }, o));
  }

  async function iconDisc(s, name, x, y, d, { fg = HEX.lt1, bg = C.accent1, bgTrans = 0, line } = {}) {
    s.addShape(S.OVAL, { x, y, w: d, h: d, fill: { color: bg, transparency: bgTrans }, line: line || { type: "none" }, objectName: `Icon disc ${name}` });
    const p = d * 0.22;
    s.addImage({ data: await icon(name, fg), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: name.replace(/^Lu/, "") + " icon" });
  }

  async function iconOnly(s, name, x, y, d, hex = HEX.accent1) {
    s.addImage({ data: await icon(name, hex), x, y, w: d, h: d, altText: name.replace(/^Lu/, "") + " icon" });
  }

  function pill(s, x, y, w, label, { color = C.accent1, fill = true, h = 0.3, fontSize = 10, dark = false, dash = false, textColor } = {}) {
    s.addShape(S.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: fill ? { color } : { color: dark ? C.text2 : C.background1 }, line: { color, width: 1.25, dashType: dash ? "dash" : "solid" }, objectName: `Pill ${label}` });
    const onMarigold = fill && (color === C.accent2 || color === HEX.accent2);
    text(s, label, { x, y, w, h, fontSize, bold: true, align: "center", valign: "middle", color: textColor || (fill ? (onMarigold ? C.text2 : C.background1) : color) });
  }

  function statusChip(s, x, y, key, { w = 2.0, label, dark = false } = {}) {
    const st = STATUS[key];
    pill(s, x, y, w, label || st.label, { color: C[st.color], fill: st.fill, h: 0.34, fontSize: 11, dark, dash: st.dash === "dash", textColor: st.fill ? C.background1 : (dark ? C.background1 : C[st.color]) });
  }

  function numBadge(s, x, y, d, label, { bg = C.accent2, fg = C.text2, fontSize } = {}) {
    s.addShape(S.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" }, objectName: `Badge ${label}` });
    text(s, String(label), { x, y, w: d, h: d, fontSize: fontSize || d * 32, bold: true, align: "center", valign: "middle", color: fg });
  }

  function card(s, x, y, w, h, { fill = C.background2, line, radius = 0.14, shadowOn = false, name = "Card" } = {}) {
    const o = { x, y, w, h, rectRadius: radius, fill: { color: fill }, line: line || { type: "none" }, objectName: name };
    if (shadowOn) o.shadow = shadow();
    s.addShape(S.ROUNDED_RECTANGLE, o);
  }

  function arrow(s, x, y, w, color = C.accent5, width = 2) {
    s.addShape(S.LINE, { x, y, w, h: 0, line: { color, width, endArrowType: "triangle" }, objectName: "Arrow" });
  }
  function vline(s, x, y, h, color = C.accent6, width = 1) {
    s.addShape(S.LINE, { x, y, w: 0, h, line: { color, width }, objectName: "Rule" });
  }

  // Three answer cards used by every vote and "Would you proceed?" slide.
  function optionCards(s, opts, { x = 7.0, y = 1.95, w = 5.73, h = 1.2, gap = 0.28 } = {}) {
    opts.forEach((o, i) => {
      const yy = y + i * (h + gap);
      s.addShape(S.ROUNDED_RECTANGLE, { x, y: yy, w, h, rectRadius: 0.14, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent6, width: 1 }, objectName: `Option ${o.key}` });
      numBadge(s, x + 0.25, yy + (h - 0.7) / 2, 0.7, o.key, { fontSize: 22 });
      const runs = [{ text: o.label, options: { fontSize: 20, bold: true, color: C.background1, breakLine: !!o.sub } }];
      if (o.sub) runs.push({ text: o.sub, options: { fontSize: 13, color: C.accent6 } });
      text(s, runs, { x: x + 1.2, y: yy, w: w - 1.4, h, valign: "middle" });
    });
  }

  async function factRows(s, facts, { x = M, y = 2.24, w = 5.9, rowH = 1.48, dark = true, fontSize = 18 } = {}) {
    for (let i = 0; i < facts.length; i++) {
      const f = facts[i], yy = y + i * rowH;
      await iconDisc(s, f.icon, x, yy, 0.62, { fg: dark ? HEX.dk2 : HEX.lt1, bg: dark ? C.accent6 : C.accent1 });
      text(s, f.text, { x: x + 0.85, y: yy, w: w - 0.85, h: 0.62, fontSize, valign: "middle", color: dark ? C.background1 : C.text1, italic: !!f.italic });
    }
  }

  // Big-number tiles in a row. tiles: [{ value, label, sub, icon, color }]
  async function statTiles(s, tiles, { x = M, y = 1.75, w = W - 2 * M, h = 1.55, gap = 0.22, dark = false, valueSize = 34 } = {}) {
    const tw = (w - gap * (tiles.length - 1)) / tiles.length;
    for (let i = 0; i < tiles.length; i++) {
      const t = tiles[i], xx = x + i * (tw + gap), col = t.color || C.accent1;
      s.addShape(S.ROUNDED_RECTANGLE, { x: xx, y, w: tw, h, rectRadius: 0.12, fill: { color: dark ? C.background1 : C.background1, transparency: dark ? 90 : 0 }, line: { color: dark ? C.accent6 : "D5DFDD", width: dark ? 1 : 0.75 }, shadow: dark ? undefined : shadow(0.1), objectName: `Stat ${t.label}` });
      s.addShape(S.RECTANGLE, { x: xx, y: y + 0.25, w: 0.07, h: h - 0.5, fill: { color: col }, line: { type: "none" }, objectName: "Stat accent" });
      if (t.icon) await iconDisc(s, t.icon, xx + tw - 0.62, y + 0.2, 0.44, { bg: col, bgTrans: dark ? 0 : 85, fg: dark ? HEX.lt1 : (typeof col === "string" && /^[0-9A-F]{6}$/i.test(col) ? col : HEX.accent1) });
      const longest = Math.max(...tiles.map((q) => String(q.value).length));
      const vs = t.valueSize || (longest > 11 ? valueSize * 0.62 : longest > 8 ? valueSize * 0.8 : valueSize);
      text(s, t.value, { x: xx + 0.25, y: y + 0.15, w: tw - (t.icon ? 0.95 : 0.45), h: 0.75, fontSize: vs, bold: true, color: dark ? C.background1 : col, valign: "middle" });
      text(s, t.label, { x: xx + 0.25, y: y + 0.9, w: tw - 0.4, h: 0.32, fontSize: 12, bold: true, color: dark ? C.accent6 : C.text1 });
      if (t.sub) text(s, t.sub, { x: xx + 0.25, y: y + 1.2, w: tw - 0.4, h: h - 1.25, fontSize: 9.5, color: dark ? C.accent6 : C.accent5 });
    }
  }

  // Horizontal chevron process. steps: [{ title, detail, color }]
  function chevronFlow(s, steps, { x = M, y = 1.9, w = W - 2 * M, h = 0.72, gap = 0.08, detailH = 1.2, dark = false, fontSize = 12 } = {}) {
    const sw = (w - gap * (steps.length - 1)) / steps.length;
    steps.forEach((st, i) => {
      const xx = x + i * (sw + gap), col = st.color || C.accent4;
      s.addShape(i === 0 ? S.PENTAGON : S.CHEVRON, { x: xx, y, w: sw, h, fill: { color: col }, line: { type: "none" }, objectName: `Step ${st.title}` });
      text(s, st.title, { x: xx + (i === 0 ? 0.14 : 0.36), y, w: sw - (i === 0 ? 0.4 : 0.6), h, fontSize, bold: true, color: C.background1, valign: "middle" });
      if (st.detail) text(s, st.detail, { x: xx + 0.05, y: y + h + 0.12, w: sw - 0.15, h: detailH, fontSize: fontSize - 1.5, color: dark ? C.accent6 : C.text2, paraSpaceAfter: 2 });
    });
  }

  // Horizontal timeline. events: [{ date, label, detail, color, big }]
  function timeline(s, events, { x = M, y = 3.6, w = W - 2 * M, dark = false, fontSize = 11, alternate = true, lineColor, inset = 1.0, labelH = 1.1 } = {}) {
    s.addShape(S.LINE, { x, y, w, h: 0, line: { color: lineColor || (dark ? C.accent6 : C.accent4), width: 2.5 }, objectName: "Timeline" });
    const x0 = x + inset, span = w - 2 * inset, step = span / (events.length - 1 || 1);
    const lw = Math.min(step * (alternate ? 1.6 : 0.95), 2.4);
    events.forEach((e, i) => {
      const cx = x0 + i * step, up = alternate ? i % 2 === 0 : true, col = e.color || C.accent1, d = e.big ? 0.3 : 0.2;
      s.addShape(S.OVAL, { x: cx - d / 2, y: y - d / 2, w: d, h: d, fill: { color: col }, line: { color: dark ? C.text2 : C.background1, width: 2 }, objectName: `Milestone ${e.date}` });
      pill(s, cx - 0.5, up ? y - 0.55 : y + 0.25, 1.0, e.date, { color: col, h: 0.28, fontSize: 10 });
      const ty = up ? y - 0.65 - labelH : y + 0.62;
      const lx = Math.max(x, Math.min(x + w - lw, cx - lw / 2));
      text(s, [{ text: e.label, options: { bold: true, breakLine: !!e.detail } }, { text: e.detail || "", options: { color: dark ? C.accent6 : C.text2, fontSize: fontSize - 1 } }], { x: lx, y: ty, w: lw, h: labelH, fontSize, align: "center", valign: up ? "bottom" : "top", color: dark ? C.background1 : C.text1 });
    });
  }

  // Four rising risk-class bands (A -> D). bands: [{ cls, name, risk, examples, route }]
  function classLadder(s, bands, { x = M, y = 1.85, w = 7.4, h = 4.6, dark = false } = {}) {
    const bw = w / bands.length, base = y + h;
    bands.forEach((b, i) => {
      const bh = h * (0.58 + (0.42 * i) / (bands.length - 1)), xx = x + i * bw, yy = base - bh, col = CLASS_COLORS[b.cls] || C.accent4;
      const tc = b.cls === "C" ? C.text2 : C.background1;  // ink on marigold for contrast
      s.addShape(S.RECTANGLE, { x: xx, y: yy, w: bw - 0.08, h: bh, fill: { color: col }, line: { type: "none" }, objectName: `Class ${b.cls}` });
      text(s, b.label || `Class ${b.cls}`, { x: xx + 0.15, y: yy + 0.12, w: bw - 0.3, h: 0.45, fontSize: 20, bold: true, color: tc });
      text(s, b.risk, { x: xx + 0.15, y: yy + 0.55, w: bw - 0.3, h: 0.35, fontSize: 11, italic: true, color: tc });
      text(s, b.examples.map((e) => ({ text: e, options: { bullet: { indent: 10 }, breakLine: true } })), { x: xx + 0.1, y: yy + 0.95, w: bw - 0.3, h: bh - 1.45, fontSize: 10.5, color: tc, paraSpaceAfter: 2 });
      if (b.route) text(s, b.route, { x: xx + 0.15, y: base - 0.5, w: bw - 0.3, h: 0.42, fontSize: 10, bold: true, color: tc, valign: "bottom" });
    });
    s.addShape(S.RIGHT_ARROW, { x, y: base + 0.12, w, h: 0.28, fill: { color: dark ? C.accent6 : "D5DFDD" }, line: { type: "none" }, objectName: "Risk arrow" });
    text(s, "Increasing risk   →   more evidence, higher authority, closer scrutiny", { x: x + 0.2, y: base + 0.12, w: w - 0.6, h: 0.28, fontSize: 10.5, bold: true, color: dark ? C.text2 : C.text1, valign: "middle" });
  }

  // Comparison matrix as a native table. header: [..], rows: [[..]], cellStyle(r,c,val) -> {fill,color,bold}
  function matrix(s, header, rows, { x = M, y = 1.75, w = W - 2 * M, colW, rowH = 0.5, fontSize = 11, headFill = HEX.dk2, headColor = HEX.lt1, zebra = true, cellStyle, firstColBold = true, border = "D5DFDD" } = {}) {
    const hdr = header.map((t) => ({ text: t, options: { bold: true, color: headColor, fill: { color: headFill }, fontSize: fontSize + 0.5, valign: "middle" } }));
    const body = rows.map((r, ri) => r.map((v, ci) => {
      const base = { fontSize, color: HEX.dk1, valign: "middle", fill: { color: zebra && ri % 2 === 0 ? HEX.lt2 : HEX.lt1 } };
      if (ci === 0 && firstColBold) Object.assign(base, { bold: true, color: HEX.dk2 });
      const extra = cellStyle ? cellStyle(ri, ci, v) || {} : {};
      const txt = typeof v === "object" && v !== null && v.text !== undefined ? v.text : String(v);
      const vo = typeof v === "object" && v !== null && v.options ? v.options : {};
      return { text: txt, options: Object.assign(base, extra, vo) };
    }));
    s.addTable([hdr, ...body], { x, y, w, colW, rowH, border: { type: "solid", color: border, pt: 0.75 }, margin: [0.04, 0.08, 0.04, 0.08], objectName: "Matrix" });
  }

  // Grid of icon cards. cards: [{ icon, title, body, badge, color }]
  async function cardGrid(s, cards, { x = M, y = 1.8, w = W - 2 * M, h = 4.9, cols = 3, gap = 0.22, dark = false, titleSize = 14, bodySize = 11, iconD = 0.56, shadowOn = true } = {}) {
    const rows = Math.ceil(cards.length / cols), cw = (w - gap * (cols - 1)) / cols, ch = (h - gap * (rows - 1)) / rows;
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i], r = Math.floor(i / cols), k = i % cols, xx = x + k * (cw + gap), yy = y + r * (ch + gap), col = c.color || C.accent1;
      s.addShape(S.ROUNDED_RECTANGLE, { x: xx, y: yy, w: cw, h: ch, rectRadius: 0.12, fill: dark ? { color: C.background1, transparency: 90 } : { color: C.background1 }, line: dark ? { color: C.accent6, width: 0.75 } : { color: "E3EAE8", width: 0.75 }, shadow: !dark && shadowOn ? shadow(0.08) : undefined, objectName: `Card ${c.title}` });
      let tx = xx + 0.2;
      if (c.icon) { await iconDisc(s, c.icon, xx + 0.2, yy + 0.2, iconD, { bg: col, bgTrans: dark ? 0 : 85, fg: dark ? HEX.lt1 : HEX.dk2 }); tx = xx + 0.2 + iconD + 0.15; }
      if (c.badge) pill(s, xx + cw - 1.35, yy + 0.2, 1.15, c.badge, { color: c.badgeColor || col, h: 0.26, fontSize: 9 });
      text(s, c.title, { x: tx, y: yy + 0.2, w: cw - (tx - xx) - 0.2 - (c.badge ? 1.2 : 0), h: iconD, fontSize: titleSize, bold: true, valign: "middle", color: dark ? C.background1 : C.text1 });
      const body = Array.isArray(c.body) ? c.body.map((b, j) => ({ text: b, options: { bullet: { indent: 10 }, breakLine: j < c.body.length - 1 } })) : c.body;
      if (body) text(s, body, { x: xx + 0.2, y: yy + 0.2 + iconD + 0.12, w: cw - 0.4, h: ch - iconD - 0.5, fontSize: bodySize, color: dark ? C.accent6 : C.text2, paraSpaceAfter: 3 });
    }
  }

  // Rounded photo with optional caption bar.
  async function imageFrame(s, file, { x, y, w, h, caption, alt, radius = 48, dark = false, px = 1000 } = {}) {
    const ph = await roundedPhoto(file, { w: px, h: Math.round((px * h) / w), radius });
    s.addImage({ path: ph, x, y, w, h, altText: alt || caption || path.basename(file) });
    if (caption) text(s, caption, { x, y: y + h + 0.06, w, h: 0.3, fontSize: 9.5, italic: true, color: dark ? C.accent6 : C.accent5 });
  }

  // Key message / quote box with accent bar.
  function callout(s, t, { x = M, y = 6.1, w = W - 2 * M, h = 0.6, color = C.accent2, dark = false, fontSize = 13, bold = true, fill } = {}) {
    s.addShape(S.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || color, transparency: fill ? 0 : (dark ? 80 : 88) }, line: { type: "none" }, objectName: "Callout" });
    s.addShape(S.RECTANGLE, { x, y: y + 0.1, w: 0.07, h: h - 0.2, fill: { color }, line: { type: "none" }, objectName: "Callout bar" });
    text(s, t, { x: x + 0.3, y, w: w - 0.45, h, fontSize, bold, valign: "middle", color: dark ? C.background1 : C.text1 });
  }

  // Numbered vertical steps with a connector line. steps: [{ title, detail }]
  async function stepsVertical(s, steps, { x = M, y = 1.85, w = 5.8, rowH = 0.95, dark = false, color = C.accent1, titleSize = 13, detailSize = 10.5 } = {}) {
    vline(s, x + 0.27, y + 0.3, rowH * (steps.length - 1), dark ? C.accent6 : "C9D6D3", 2);
    steps.forEach((st, i) => {
      const yy = y + i * rowH;
      numBadge(s, x, yy, 0.54, i + 1, { bg: color, fg: C.background1, fontSize: 15 });
      text(s, [{ text: st.title, options: { bold: true, breakLine: !!st.detail } }, { text: st.detail || "", options: { color: dark ? C.accent6 : C.text2, fontSize: detailSize } }], { x: x + 0.75, y: yy - 0.02, w: w - 0.75, h: rowH - 0.08, fontSize: titleSize, color: dark ? C.background1 : C.text1 });
    });
  }

  // Side-by-side columns with coloured headers. cols: [{ title, color, items: [..], flag }]
  async function compareColumns(s, cols, { x = M, y = 1.8, w = W - 2 * M, h = 4.9, gap = 0.2, dark = false, fontSize = 11 } = {}) {
    const cw = (w - gap * (cols.length - 1)) / cols.length;
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i], xx = x + i * (cw + gap), col = c.color || C.accent4;
      s.addShape(S.ROUNDED_RECTANGLE, { x: xx, y, w: cw, h, rectRadius: 0.12, fill: dark ? { color: C.background1, transparency: 90 } : { color: C.background2 }, line: { type: "none" }, objectName: `Column ${c.title}` });
      s.addShape(S.ROUNDED_RECTANGLE, { x: xx, y, w: cw, h: 0.62, rectRadius: 0.12, fill: { color: col }, line: { type: "none" }, objectName: `Column head ${c.title}` });
      s.addShape(S.RECTANGLE, { x: xx, y: y + 0.35, w: cw, h: 0.27, fill: { color: col }, line: { type: "none" }, objectName: "Column head square" });
      let tx = xx + 0.2;
      if (c.flag) { s.addImage({ path: c.flag, x: xx + 0.18, y: y + 0.14, w: 0.51, h: 0.34, altText: c.title + " flag" }); tx = xx + 0.8; }
      text(s, c.title, { x: tx, y, w: cw - (tx - xx) - 0.15, h: 0.62, fontSize: fontSize + 3, bold: true, color: C.background1, valign: "middle" });
      const runs = c.items.map((it, j) => ({ text: it, options: { bullet: { indent: 10 }, breakLine: j < c.items.length - 1 } }));
      text(s, runs, { x: xx + 0.18, y: y + 0.78, w: cw - 0.36, h: h - 0.9, fontSize, color: dark ? C.background1 : C.text1, paraSpaceAfter: 4 });
    }
  }

  // Native bar chart with theme styling.
  function barChart(s, { categories, series, x = M, y = 1.8, w = 6, h = 4, colors = [HEX.accent1], horizontal = false, title, max, showLegend = false, valueFmt = "0" , labelSize = 10 }) {
    s.addChart(pres.charts.BAR, series.map((sr) => ({ name: sr.name, labels: categories, values: sr.values })), {
      x, y, w, h, barDir: horizontal ? "bar" : "col", chartColors: colors, showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: valueFmt, dataLabelFontSize: labelSize, dataLabelFontFace: "+mn-lt", dataLabelColor: HEX.dk1,
      catAxisLabelFontFace: "+mn-lt", valAxisLabelFontFace: "+mn-lt", catAxisLabelFontSize: labelSize, valAxisLabelFontSize: 9, catAxisLabelColor: HEX.dk1, valAxisLabelColor: HEX.accent5,
      valGridLine: { color: "E3EAE8", size: 0.5 }, catGridLine: { style: "none" }, valAxisMaxVal: max, showLegend, legendFontFace: "+mn-lt", legendFontSize: 10, legendPos: "b",
      showTitle: !!title, title, titleFontFace: "+mn-lt", titleFontSize: 11, titleColor: HEX.accent5, barGapWidthPct: 60, valAxisLineShow: false,
    });
  }

  function doughnut(s, { labels, values, x, y, w, h, colors, title, holePct = 55, showLegend = true }) {
    s.addChart(pres.charts.DOUGHNUT, [{ name: title || "share", labels, values }], {
      x, y, w, h, chartColors: colors, holeSize: holePct, showPercent: true, showValue: false, dataLabelFontFace: "+mn-lt", dataLabelFontSize: 10, dataLabelColor: HEX.lt1,
      showLegend, legendPos: "b", legendFontFace: "+mn-lt", legendFontSize: 10, showTitle: !!title, title, titleFontFace: "+mn-lt", titleFontSize: 11, titleColor: HEX.accent5,
    });
  }

  // Maps: draw the raster, then native markers/labels on top. highlights: {id: hex}; markers: [{ id, label, color, dx, dy, side }]
  async function mapPanel(s, which, { x, y, w, highlights, markers = [], base, stroke, dark = false, labelSize = 10 }) {
    const pkg = which === "world" ? require("@svg-maps/world") : require("@svg-maps/india");
    const m = await renderMap(pkg, which, { highlights, base: base || (dark ? "1E4A4B" : "DCE5E2"), stroke: stroke || (dark ? "0E3B3D" : "FFFFFF") });
    const h = w * m.aspect;
    s.addImage({ path: m.file, x, y, w, h, altText: which === "world" ? "World map with highlighted regulators" : "Map of India with highlighted states" });
    for (const mk of markers) {
      const c = m.centers[mk.id]; if (!c) continue;
      const cx = x + c[0] * w + (mk.dx || 0), cy = y + c[1] * h + (mk.dy || 0), col = mk.color || C.accent2;
      s.addShape(S.OVAL, { x: cx - 0.09, y: cy - 0.09, w: 0.18, h: 0.18, fill: { color: col }, line: { color: dark ? C.text2 : C.background1, width: 1.5 }, objectName: `Marker ${mk.label}` });
      if (mk.label) {
        const lw = mk.w || 1.5, side = mk.side || "right";
        const lx = side === "right" ? cx + 0.14 : side === "left" ? cx - 0.14 - lw : cx - lw / 2;
        const ly = side === "below" ? cy + 0.12 : side === "above" ? cy - 0.42 : cy - 0.15;
        // translucent backing keeps labels legible over coloured fills
        const bw = Math.min(lw, 0.075 * labelSize * 0.55 * mk.label.length + 0.2);
        const bx = side === "left" ? lx + lw - bw : side === "right" ? lx : cx - bw / 2;
        s.addShape(S.ROUNDED_RECTANGLE, { x: bx, y: ly + 0.02, w: bw, h: 0.26, rectRadius: 0.13, fill: { color: dark ? C.text2 : C.background1, transparency: 15 }, line: { type: "none" }, objectName: `Label backing ${mk.label}` });
        text(s, mk.label, { x: lx, y: ly, w: lw, h: 0.3, fontSize: labelSize, bold: true, color: dark ? C.background1 : C.text1, align: side === "left" ? "right" : side === "right" ? "left" : "center", valign: "middle" });
      }
    }
    return { h, centers: m.centers };
  }

  async function flag(s, code, x, y, w = 0.6) {
    const f = code.toUpperCase() === "EU" ? await euFlagPng() : await flagPng(code);
    s.addImage({ path: f, x, y, w, h: (w * 2) / 3, altText: `${code.toUpperCase()} flag` });
  }

  // Section divider with numeral, title, blurb and three "in this section" items.
  async function sectionDivider(section, { id, num, kicker, title, blurb, items = [], photo, core }) {
    const s = newSlide("SECTION", section, { id, kicker, title, core });
    s.addText(blurb || "", { placeholder: "subtitle" });
    text(s, String(num).padStart(2, "0"), { x: M - 0.05, y: 0.55, w: 4, h: 1.6, fontSize: 96, bold: true, color: C.accent6, transparency: 70, fontFace: THEME.headFontFace });
    for (let i = 0; i < items.length; i++) {
      const yy = 5.55 + i * 0.5;
      await iconDisc(s, items[i].icon || "LuCircleCheck", M, yy, 0.36, { bg: C.accent2, fg: HEX.dk2 });
      text(s, items[i].text, { x: M + 0.5, y: yy, w: 7.5, h: 0.36, fontSize: 13, color: C.background1, valign: "middle" });
    }
    if (photo) await imageFrame(s, photo.file, { x: 8.9, y: 1.5, w: 3.85, h: 4.5, caption: photo.caption, dark: true });
    return s;
  }

  return {
    C, S, M, W, H, HEX, CLASS_COLORS, defineLayouts, newSlide, built: () => built, tracker, text, iconDisc, iconOnly, pill, statusChip, numBadge, card, arrow, vline,
    optionCards, factRows, statTiles, chevronFlow, timeline, classLadder, matrix, cardGrid, imageFrame, callout, stepsVertical, compareColumns, barChart, doughnut, mapPanel, flag, sectionDivider, shadow, img, vid, dataUri, icon, STATUS, roundedPhoto, flagPng, euFlagPng,
  };
}

module.exports = { makeUI, gradientBg, lightBg, roundedPhoto, flagPng, euFlagPng, renderMap, shadow, CLASS_COLORS, THEME, HEX, W, H, M, img, vid, dataUri, icon, STATUS };
