// Build one section (or several) into a scratch deck and render PNGs for visual checks.
// Usage: NODE_PATH=./node_modules node build_section.js <section-name> [<section-name> ...] [--out DIR]
// Sections live in ./sections/<name>.js and export: async function build(ui, ctx) { ... }
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require(process.env.APPLY_THEME ||
  "/root/.claude/skills/synced/e64227f8-9add-4a33-ad4c-9b0127e5f904_84b42636-2ecb-4c0e-9e08-f3cf6f9cd1cd/pptx/scripts/apply_theme.js");
const { makeUI, THEME } = require("./ui");
const SOFFICE = "/root/.claude/skills/synced/e64227f8-9add-4a33-ad4c-9b0127e5f904_84b42636-2ecb-4c0e-9e08-f3cf6f9cd1cd/pptx/scripts/office/soffice.py";

(async () => {
  const args = process.argv.slice(2);
  const oi = args.indexOf("--out");
  const outDir = oi >= 0 ? args[oi + 1] : path.join(__dirname, "..", "..", "render", args[0] || "section");
  const names = args.filter((a, i) => a !== "--out" && (oi < 0 || i !== oi + 1));
  if (!names.length) { console.error("name a section"); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  let notes = {}, sources = {};
  for (const nm of names) {
    const np = path.join(__dirname, "notes", nm + ".js");
    if (fs.existsSync(np)) { const mod = require(np); notes = Object.assign(notes, mod.NOTES || {}); sources = Object.assign(sources, mod.SOURCES || {}); }
  }
  const ui = makeUI(pres, { notes, sources });
  await ui.defineLayouts();
  const ctx = { facts: {} };
  for (const nm of names) {
    const mod = require(path.join(__dirname, "sections", nm + ".js"));
    pres.addSection({ title: mod.SECTION || nm });
    await mod.build(ui, ctx);
  }
  const pptx = path.join(outDir, "section.pptx");
  await pres.writeFile({ fileName: pptx });
  await applyTheme(pptx, THEME);
  console.log("wrote", pptx, "slides:", ui.built().length);
  // Render: pptx -> pdf -> jpg (s-NN.jpg). Skip with --no-render.
  if (!args.includes("--no-render")) {
    execFileSync("python3", [SOFFICE, "--headless", "--convert-to", "pdf", "--outdir", outDir, pptx], { stdio: "ignore", timeout: 300000 });
    for (const f of fs.readdirSync(outDir)) if (/^s-\d+\.jpg$/.test(f)) fs.unlinkSync(path.join(outDir, f));
    execFileSync("pdftoppm", ["-jpeg", "-r", "60", path.join(outDir, "section.pdf"), path.join(outDir, "s")], { stdio: "ignore" });
    const imgs = fs.readdirSync(outDir).filter((f) => /^s-\d+\.jpg$/.test(f)).sort();
    console.log("rendered", imgs.length, "slides in", outDir);
    ui.built().forEach((b, i) => console.log(`  ${String(i + 1).padStart(2, "0")}  ${b.id || ""}  ${b.title || ""}`));
  }
})().catch((e) => { console.error(e); process.exit(1); });
