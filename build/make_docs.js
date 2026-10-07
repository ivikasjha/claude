// Generates companion documents from the same data that builds the deck:
//   docs/Speaker_Notes.md + .html, docs/References.md + .html, docs/Decision_Checklist_Handout.html
// Run: NODE_PATH=./node_modules node make_docs.js
const fs = require("fs");
const path = require("path");
const { NOTE_DATA, CLOCK } = require("./notes");
const { R } = require("./refs");
const SB = JSON.parse(fs.readFileSync(path.join(__dirname, "storyboard.json"), "utf8"));

const OUT = path.join(__dirname, "..", "docs");
fs.mkdirSync(OUT, { recursive: true });

const mmss = (x) => `${Math.floor(x)}:${String(Math.round((x - Math.floor(x)) * 60)).padStart(2, "0")}`;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const total = SB.slides.reduce((a, s) => a + s.time, 0);

// ---------------- citation map: which slides cite each source
const usedOn = {};
for (const [n, o] of Object.entries(NOTE_DATA)) for (const k of o.src || []) (usedOn[k] = usedOn[k] || new Set()).add(Number(n));

// ---------------- Speaker notes (Markdown)
const md = [];
md.push(`# Speaker notes and facilitator guide`, "");
md.push(`**${SB.title}** — *${SB.subtitle}*  `, `${SB.presenter} · ${SB.length}`, "");
md.push("## Before the session", "");
md.push(
  "- **Disclose precisely.** On slide 2, state your roles in FoGO (founder and principal investigator, Ahilaya Biomedicals Pvt Ltd) and SwaKnee, and any equity, royalty, salary or grant interest.",
  "- **Re-check time-sensitive facts** (all checked 7 October 2026): NPPA knee-implant cap (runs to 15 November 2026); status of MoHFW’s August 2026 proposed MDR-2017 amendments; NMC conduct regulations (2023 regulations in abeyance); UCMPMD amendments; DPDP Rules phase dates.",
  "- **Check your own public claims.** The SwaKnee website source code reviewed for this deck contains the phrases “Clinically Proven” and “cartilage repair and regeneration”. Align live web pages and leaflets with slide 13 before presenting.",
  "- **Media permissions.** Confirm written permission from the FoGO volunteer (face obscured) and from the person in the SwaKnee step videos (no face shown) for use in a public teaching session.",
  "- **Materials:** flipchart and markers (record opening and closing votes), printed checklist handouts (docs/Decision_Checklist_Handout.pdf), index cards for the commitment exercise, a timer.",
  "- **Video playback:** both clips are embedded in the PPTX (click to play). Backup copies: build/assets/video/fogo_prototype.mp4 (12 s) and swaknee_how_to_use.mp4 (20 s, silent).",
  "- **Evidence-status vocabulary** used throughout: Demonstrated · Reported, preliminary · Planned · Not established.",
  ""
);
md.push("## Run sheet", "", "| # | Clock | Min | Slide | Activity |", "|---|---|---|---|---|");
for (const s of SB.slides) {
  const o = NOTE_DATA[s.n];
  if (!o || !s.time) continue;
  md.push(`| ${s.n} | ${mmss(CLOCK[s.n].start)}–${mmss(CLOCK[s.n].end)} | ${s.time} | ${o.title} | ${o.activity || "—"} |`);
}
md.push("", `Scripted total: ${mmss(total)} minutes, leaving 3–5 minutes for discussion within a 35–40 minute slot. If running late, shorten slides 11, 14 and 18 (keep all votes and decisions).`, "");
md.push("## Slide-by-slide notes", "");
const sections = [["purpose", "Purpose"], ["say", "Say"], ["ask", "Ask / run"], ["debrief", "Debrief points"], ["status", "Evidence status"], ["india", "India adaptation"], ["caution", "Caution"], ["transition", "Transition"]];
for (const n of Object.keys(NOTE_DATA).map(Number).sort((a, b) => a - b)) {
  const o = NOTE_DATA[n];
  const c = CLOCK[n];
  md.push(`### Slide ${n} · ${o.title}`, "");
  md.push(c && c.min ? `*Time: ${c.min} min (clock ${mmss(c.start)}–${mmss(c.end)})${o.activity ? ` · Activity: ${o.activity}` : ""}*` : `*Reference slide${o.activity ? ` · ${o.activity}` : ""}*`, "");
  for (const [k, label] of sections) if (o[k]) md.push(`**${label}.** ${o[k].replace(/\n/g, "  \n")}`, "");
  if (o.src && o.src.length) {
    md.push("**Sources.**", "");
    o.src.forEach((k, i) => { const r = R[k]; md.push(`${i + 1}. ${r.cite}${r.url ? ` <${r.url}>` : ""}`); });
    md.push("");
  }
}
fs.writeFileSync(path.join(OUT, "Speaker_Notes.md"), md.join("\n"));

// ---------------- References (Markdown)
const groups = [
  ["teach", "Teaching materials: Stanford Biodesign, Harvard, Cambridge"],
  ["india", "India: regulation, ethics, pricing and safety"],
  ["evid", "Ethics frameworks, evidence and international comparison"],
  ["media", "Case material and media (supplied)"],
];
const rm = ["# Source citations", "", `All sources checked 7 October 2026. Web access in the preparation environment was search-based; each URL below appeared in a search result or comes from supplied project material. “Slides” lists where each source is cited.`, ""];
for (const [g, title] of groups) {
  rm.push(`## ${title}`, "");
  const keys = Object.keys(R).filter((k) => R[k].group === g).sort((a, b) => R[a].cite.localeCompare(R[b].cite));
  for (const k of keys) {
    const r = R[k];
    const slides = usedOn[k] ? [...usedOn[k]].sort((a, b) => a - b).join(", ") : "appendix only";
    rm.push(`- ${r.cite}${r.url ? ` <${r.url}>` : ""} — *Slides: ${slides}*`);
  }
  rm.push("");
}
rm.push("## Notes on attribution", "",
  "- *Biodesign: The Process of Innovating Medical Technologies* is Stanford Biodesign content published by Cambridge University Press; it is cited as Stanford material.",
  "- *Engineering Better Care* (2017) was published by the Royal Academy of Engineering, Academy of Medical Sciences and Royal College of Physicians; its working group was chaired by Prof P. John Clarkson (University of Cambridge), and Cambridge’s Centre for Engineering Better Care maintains the toolkit.",
  "- The IDEAL and IDEAL-D frameworks are Oxford-led (IDEAL Collaboration), not Cambridge.",
  "- FoGO results are project-reported (Ahilaya Biomedicals); SwaKnee results are company-reported (Swayogya); neither has been independently verified or peer-reviewed. No cited institution has evaluated or endorsed either device.", "");
fs.writeFileSync(path.join(OUT, "References.md"), rm.join("\n"));

// ---------------- HTML renderer (minimal Markdown → HTML for print)
function mdToHtml(src, title) {
  const lines = src.split("\n");
  let html = "", inList = false, inTable = false, ol = false;
  const inline = (t) => esc(t)
    .replace(/&lt;(https?:[^&]+?)&gt;/g, '<a href="$1">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
  const close = () => { if (inList) { html += ol ? "</ol>" : "</ul>"; inList = false; } if (inTable) { html += "</table>"; inTable = false; } };
  for (const l of lines) {
    if (/^\|/.test(l)) {
      if (/^\|[-| ]+\|$/.test(l)) continue;
      const cells = l.split("|").slice(1, -1).map((c) => c.trim());
      if (!inTable) { close(); html += "<table>"; inTable = true; html += "<tr>" + cells.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr>"; }
      else html += "<tr>" + cells.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
      continue;
    }
    if (/^- /.test(l)) { if (!inList || ol) { close(); html += "<ul>"; inList = true; ol = false; } html += `<li>${inline(l.slice(2))}</li>`; continue; }
    if (/^\d+\. /.test(l)) { if (!inList || !ol) { close(); html += "<ol>"; inList = true; ol = true; } html += `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`; continue; }
    close();
    if (/^### /.test(l)) html += `<h3>${inline(l.slice(4))}</h3>`;
    else if (/^## /.test(l)) html += `<h2>${inline(l.slice(3))}</h2>`;
    else if (/^# /.test(l)) html += `<h1>${inline(l.slice(2))}</h1>`;
    else if (l.trim()) html += `<p>${inline(l).replace(/ {2}$/gm, "").replace(/  \n/g, "<br>")}</p>`;
  }
  close();
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
@page { size: A4; margin: 16mm 15mm; }
body { font-family: Calibri, Carlito, Arial, sans-serif; font-size: 10.5pt; color: #17262B; line-height: 1.38; }
h1 { font-family: Cambria, Caladea, Georgia, serif; color: #0E3B3D; font-size: 22pt; margin: 0 0 6pt; }
h2 { font-family: Cambria, Caladea, Georgia, serif; color: #0F7C74; font-size: 15pt; margin: 16pt 0 6pt; border-bottom: 0.6pt solid #D5DFDD; padding-bottom: 3pt; }
h3 { font-family: Cambria, Caladea, Georgia, serif; color: #0E3B3D; font-size: 12.5pt; margin: 14pt 0 4pt; break-after: avoid; }
p { margin: 3pt 0 6pt; } li { margin: 2pt 0; }
table { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin: 6pt 0; }
th { background: #0E3B3D; color: #fff; text-align: left; padding: 4pt 6pt; }
td { border-bottom: 0.5pt solid #D5DFDD; padding: 3pt 6pt; vertical-align: top; }
a { color: #0F7C74; word-break: break-all; }
</style></head><body>${html}</body></html>`;
}
fs.writeFileSync(path.join(OUT, "Speaker_Notes.html"), mdToHtml(md.join("\n"), "Speaker notes"));
fs.writeFileSync(path.join(OUT, "References.html"), mdToHtml(rm.join("\n"), "Source citations"));

// ---------------- One-page decision checklist handout (A4 landscape)
const rows = [
  ["Need", "Will it help me?", "Is the need validated with patients and clinicians? Is the need statement solution-neutral?", "Need statement; observation notes"],
  ["Evidence", "Is there proof, for people like me?", "Does the evidence match the exact claim, users and device version? What is demonstrated, reported, planned?", "Protocol; subgroup results; failure modes; version log"],
  ["People", "Can I freely refuse?", "Is consent independent of any dependent relationship, in the person’s language? Are conflicts disclosed and managed?", "Consent form and process; COI management plan; CTRI entry"],
  ["Permission", "Is it allowed for this use?", "Which CDSCO permission covers this use: test licence (MD-13), clinical investigation (MD-23), manufacturing licence?", "Class; licence or permission; registered ethics committee approval"],
  ["Access", "Can I afford and use it?", "What is the total cost of use? Who is excluded by its demands (vision, dexterity, language, power, phone)?", "Cost of a full course; inclusive-design audit; service plan"],
  ["Safety", "Who answers later?", "Who records, reports (MvPI) and acts on harm? How are updates validated, released and rolled back?", "Complaint log; MvPI route; change-control and rollback plan"],
];
const handout = `<!doctype html><html><head><meta charset="utf-8"><title>Patient-impact decision checklist</title><style>
@page { size: A4 landscape; margin: 11mm 12mm; }
body { font-family: Calibri, Carlito, Arial, sans-serif; color: #17262B; font-size: 10pt; margin: 0; }
.head { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1.2pt solid #0E3B3D; padding-bottom: 4pt; margin-bottom: 6pt; }
h1 { font-family: Cambria, Caladea, Georgia, serif; color: #0E3B3D; font-size: 20pt; margin: 0; }
.sub { color: #0F7C74; font-size: 10pt; }
table { border-collapse: collapse; width: 100%; }
th { background: #0E3B3D; color: #fff; text-align: left; padding: 5pt 6pt; font-size: 9.5pt; }
td { border-bottom: 0.6pt solid #C9D6D3; padding: 5pt 6pt; vertical-align: top; font-size: 9.5pt; }
td.stage { font-weight: bold; color: #0F7C74; width: 9%; } td.q { font-style: italic; width: 14%; }
td.box { width: 13%; } td.own { width: 11%; }
.chk { display: inline-block; width: 9pt; height: 9pt; border: 0.8pt solid #17262B; margin-right: 3pt; vertical-align: -1pt; }
.bottom { display: grid; grid-template-columns: 1.35fr 1fr; gap: 10pt; margin-top: 8pt; }
.card { border: 1pt dashed #0F7C74; border-radius: 6pt; padding: 7pt 10pt; font-size: 10.5pt; }
.card p { margin: 5pt 0; } .line { display: inline-block; border-bottom: 0.6pt solid #17262B; width: 150pt; }
.key span { display: inline-block; padding: 1pt 6pt; border-radius: 8pt; font-size: 8.5pt; font-weight: bold; margin: 2pt 3pt 2pt 0; }
.d { background: #0F7C74; color: #fff; } .r { border: 1pt solid #0F7C74; color: #0F7C74; } .p { border: 1pt dashed #E0962A; color: #B5701A; } .x { border: 1pt solid #C2453A; color: #C2453A; }
.foot { font-size: 8pt; color: #6E7F7D; margin-top: 6pt; }
</style></head><body>
<div class="head"><div><h1>Patient-impact decision checklist</h1><div class="sub">${esc(SB.title)} · ${esc(SB.presenter)}</div></div>
<div class="sub">For every “Not yet”: name the owner and the condition for proceeding.</div></div>
<table><tr><th>Stage</th><th>Patient’s question</th><th>Ask before proceeding</th><th>Evidence to see</th><th>Owner</th><th>Go?</th></tr>
${rows.map((r) => `<tr><td class="stage">${r[0]}</td><td class="q">“${esc(r[1])}”</td><td>${esc(r[2])}</td><td class="box">${esc(r[3])}</td><td class="own"></td><td class="box"><span class="chk"></span>Yes<br><span class="chk"></span>Not yet — condition:</td></tr>`).join("")}
</table>
<div class="bottom">
<div class="card"><b>My commitment</b>
<p>Before <span class="line"></span>, I will <span class="line"></span>.</p>
<p>Owner: <span class="line"></span> &nbsp; I proceed only if <span class="line"></span>.</p></div>
<div class="card key"><b>Label every claim</b><br><span class="d">Demonstrated</span><span class="r">Reported, preliminary</span><span class="p">Planned</span><span class="x">Not established</span>
<p style="font-size:9pt;margin:4pt 0 0">India anchors: MDR-2017 (MD-13 test licence; MD-22/23 clinical investigation; MD-5/MD-9 manufacturing) · ethics committee registered with CDSCO · CTRI · ICMR 2017 · MvPI 1800-180-3024 · UCMPMD 2024 · DPDP Rules 2025</p></div>
</div>
<div class="foot">Workshop synthesis adapted from Stanford Biodesign (need statements, Principled Decision-Making), Harvard MRCT Center (diversity, plain-language consent), Cambridge Engineering Design Centre (inclusive design), IDEAL-D, Declaration of Helsinki (2024), ICMR (2017) and CDSCO guidance. Not a regulatory checklist or certification. Checked 7 October 2026.</div>
</body></html>`;
fs.writeFileSync(path.join(OUT, "Decision_Checklist_Handout.html"), handout);
console.log("docs written to", OUT);
