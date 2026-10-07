// Composes speaker notes (keyed by slide id) from the per-section notes modules in ./notes.
const fs = require("fs");
const path = require("path");
const { R } = require("./refs");

const SB = JSON.parse(fs.readFileSync(path.join(__dirname, "storyboard_v2.json"), "utf8"));
const ORDER = SB.sections.flatMap((sec) => sec.slides.map((s) => Object.assign({ section: sec.name }, s)));

function mmss(x) { const m = Math.floor(x), s = Math.round((x - m) * 60); return `${m}:${String(s).padStart(2, "0")}`; }
const CLOCK = {};
{
  let t = 0, tc = 0;
  for (const s of ORDER) {
    CLOCK[s.id] = { start: t, end: t + (s.time || 0), min: s.time || 0, coreStart: s.core ? tc : null, coreEnd: s.core ? tc + (s.time || 0) : null };
    t += s.time || 0; if (s.core) tc += s.time || 0;
  }
  CLOCK.__total = t; CLOCK.__core = tc;
}

// Load section notes modules.
const NOTES_DATA = {}, SOURCES = {}, NEW_REFS = {}, MISSING = new Set();
const dir = path.join(__dirname, "notes");
if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".js") && !f.startsWith("_"))) {
  const m = require(path.join(dir, f));
  Object.assign(NOTES_DATA, m.NOTES_DATA || {}); Object.assign(SOURCES, m.SOURCES || {}); Object.assign(NEW_REFS, m.NEW_REFS || {});
}
const RALL = Object.assign({}, NEW_REFS, R);
function ref(k) { const r = RALL[k]; if (!r) { MISSING.add(k); return `[${k}]`; } return r.url ? `${r.cite} ${r.url}` : r.cite; }

function compose(id, o) {
  const c = CLOCK[id], sb = ORDER.find((s) => s.id === id) || {};
  const lines = [`SLIDE · ${o.title || sb.title}`];
  if (c && c.min) lines.push(`TIME ${mmss(c.min)} min · full run clock ${mmss(c.start)}–${mmss(c.end)}${sb.core ? ` · 40-min core clock ${mmss(c.coreStart)}–${mmss(c.coreEnd)}` : " · deep-dive slide: skip in the 40-minute version"}`);
  else lines.push("TIME Reference slide (Q&A or handout)");
  if (o.activity || sb.interaction) lines.push(`ACTIVITY ${o.activity || sb.interaction}`);
  lines.push("");
  if (o.preflight) lines.push(`PRE-FLIGHT CHECKS (before the session)\n${o.preflight}`, "");
  if (o.core) lines.push(`CORE SCRIPT (say this; about ${o.core.split(/\s+/).length} words)\n${o.core}`, "", "DETAIL BELOW: use if time allows or if asked", "");
  if (o.purpose) lines.push(`PURPOSE\n${o.purpose}`, "");
  if (o.say) lines.push(`SAY\n${o.say}`, "");
  if (o.ask) lines.push(`ASK / RUN\n${o.ask}`, "");
  if (o.debrief) lines.push(`DEBRIEF POINTS\n${o.debrief}`, "");
  if (o.status) lines.push(`EVIDENCE STATUS\n${o.status}`, "");
  if (o.india) lines.push(`INDIA ADAPTATION\n${o.india}`, "");
  if (o.caution) lines.push(`CAUTION\n${o.caution}`, "");
  if (o.transition) lines.push(`TRANSITION\n${o.transition}`, "");
  if (o.src && o.src.length) { lines.push("SOURCES"); o.src.forEach((k, i) => lines.push(`[${i + 1}] ${ref(k)}`)); lines.push(""); }
  lines.push("Sources checked 7 October 2026.");
  return lines.join("\n");
}

const NOTES = {};
for (const [id, o] of Object.entries(NOTES_DATA)) NOTES[id] = compose(id, o);

module.exports = { NOTES, NOTES_DATA, SOURCES, NEW_REFS, RALL, MISSING, CLOCK, ORDER, SB, mmss };
