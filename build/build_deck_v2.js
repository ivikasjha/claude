// Builds the v2 deck from storyboard_v2.json: sections in ./sections, notes in ./notes, references appended.
// Run: NODE_PATH=./node_modules node build_deck_v2.js [out.pptx]
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.APPLY_THEME ||
  "/root/.claude/skills/synced/e64227f8-9add-4a33-ad4c-9b0127e5f904_84b42636-2ecb-4c0e-9e08-f3cf6f9cd1cd/pptx/scripts/apply_theme.js");
const { makeUI, THEME } = require("./ui");
const NC = require("./notes_compose");
const { R } = require("./refs");

const OUT = process.argv[2] || path.join(__dirname, "..", "deck", "From_Innovation_to_Patient_Impact.pptx");

// Reference groups for the appendix: refs.js groups plus NEW_REFS from sections.
const NBSP = " ";
const tidy = (t) => t
  .replace(/(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, `$1${NBSP}$2`)
  .replace(/\b(F1|Rs|RR|n) (?=[0-9=])/g, `$1${NBSP}`)
  .replace(/(\d) (lakh|crore|mm|units)\b/g, `$1${NBSP}$2`);

function refGroups() {
  const all = NC.RALL;
  const used = new Set();
  for (const o of Object.values(NC.NOTES_DATA)) for (const k of o.src || []) used.add(k);
  const items = (pred) => Object.entries(all).filter(([k, r]) => used.has(k) && pred(k, r)).map(([k, r]) => ({ label: r.short, url: r.url, detail: tidy(r.brief || r.cite), supplied: r.group === "media" }));
  const isSB = (k) => /^sb|^hms|^mrct|^pf|^catalyst|^hbs|^kramer/.test(k);
  const isCam = (k) => /^cam|^ideal|^kellmeyer/.test(k);
  return [
    { title: "Teaching materials: Stanford Biodesign and Harvard", footer: "Click a title to open the source. No institution listed has evaluated or endorsed FoGO or SwaKnee.", items: items((k, r) => r.group === "teach" && isSB(k)) },
    { title: "Teaching materials: Cambridge, and evaluation frameworks", footer: "Engineering Better Care: RAEng, AMS and RCP (Cambridge-chaired). IDEAL is Oxford-led. Kellmeyer et al. is a Cambridge University Press journal paper, not University of Cambridge material.", items: items((k, r) => r.group === "teach" && isCam(k)) },
    { title: "India: regulation, guidance, pricing and safety", footer: "Checked October 2026. Verify current amendments and extensions before use.", items: items((k, r) => r.group === "india") },
    { title: "Regulation abroad, ethics and standards", footer: "International sources are comparators; Indian law and guidance govern practice in India.", items: items((k, r) => r.group === "intl" || (r.group === "teach" && !isSB(k) && !isCam(k))) },
    { title: "Case evidence, media and status labels", footer: "Status labels: Demonstrated · Reported, preliminary · Planned · Not established.", items: items((k, r) => r.group === "evid" || r.group === "media") },
  ].filter((g) => g.items.length);
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = NC.SB.title;
  pres.subject = NC.SB.subtitle;
  pres.author = "Dr Vikas Kumar Jha";
  pres.company = "KIIT University, Bhubaneswar";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  const ui = makeUI(pres, { notes: NC.NOTES, sources: NC.SOURCES });
  await ui.defineLayouts();
  const C = ui.C;

  const ctx = { facts: {} };
  const want = NC.SB.sections.flatMap((sec) => sec.slides.map((s) => s.id));
  for (const sec of NC.SB.sections) {
    const file = path.join(__dirname, "sections", sec.name + ".js");
    if (!fs.existsSync(file)) { console.warn("missing section", sec.name); continue; }
    const mod = require(file);
    pres.addSection({ title: sec.section });
    await mod.build(ui, ctx);
  }
  const have = ui.built().map((b) => b.id);
  const missing = want.filter((id) => !have.includes(id));
  const extra = have.filter((id) => id && !want.includes(id));
  if (missing.length) console.warn("storyboard slides not built:", missing.join(", "));
  if (extra.length) console.warn("slides not in storyboard:", extra.join(", "));
  const order = have.filter(Boolean);
  const wrong = want.filter((id) => have.includes(id)).some((id, i, arr) => order.indexOf(id) !== order.indexOf(arr[i - 1]) + 1 && i > 0);
  if (wrong) console.warn("slide order differs from storyboard");

  // Reference pages: entries flow down two columns, then onto further slides.
  pres.addSection({ title: "Sources" });
  {
    const { S, text, M } = ui;
    const colW = 5.9, top = 1.55, bottom = 6.8, gap = 0.16;
    const est = (it) => 0.21 + Math.ceil(it.detail.length / 100) * 0.17 + 0.03;
    const flow = (items, limit) => {
      const pages = []; let page = [[], []], col = 0, y = top;
      for (const it of items) {
        const h = est(it);
        if (y + h > limit && y > top) { if (col === 0) { col = 1; y = top; } else { pages.push(page); page = [[], []]; col = 0; y = top; } }
        page[col].push({ it, y, h }); y += h + gap;
      }
      pages.push(page); return pages;
    };
    for (const group of refGroups()) {
      const n = flow(group.items, bottom).length;
      let limit = top + 0.5, pages;
      while ((pages = flow(group.items, limit)).length > n) limit += 0.05;
      pages.forEach((pg, pi) => {
        const title = pages.length > 1 ? `${group.title} (${pi + 1}/${pages.length})` : group.title;
        const s = ui.newSlide("REFERENCE", "Sources", { id: `ref-${pi}-${group.title.slice(0, 12)}`, kicker: "APPENDIX · SOURCES", title, source: group.footer || "" });
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
  const built = ui.built();
  fs.writeFileSync(path.join(__dirname, "built_index.json"), JSON.stringify(built.map((b) => ({ n: b.n, id: b.id, title: b.title, master: b.master, section: b.section })), null, 1));
  console.log("Wrote", OUT, "slides:", built.length, "| notes missing on:", built.filter((b) => b.id && !b.id.startsWith("ref-") && !NC.NOTES[b.id]).map((b) => b.id).join(", ") || "none", "| missing refs:", [...NC.MISSING].join(", ") || "none");
})().catch((e) => { console.error(e); process.exit(1); });
