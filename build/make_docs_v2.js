// Companion documents for the v2 deck: docs/Speaker_Notes.md/.html, docs/References.md/.html, docs/Decision_Checklist_Handout.html
// Run: NODE_PATH=./node_modules node make_docs_v2.js
const fs = require("fs");
const path = require("path");
const NC = require("./notes_compose");
const { NOTES_DATA, SOURCES, RALL, CLOCK, ORDER, SB, mmss } = NC;

const OUT = path.join(__dirname, "..", "docs");
fs.mkdirSync(OUT, { recursive: true });
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const built = fs.existsSync(path.join(__dirname, "built_index.json")) ? JSON.parse(fs.readFileSync(path.join(__dirname, "built_index.json"), "utf8")) : [];
const numOf = (id) => { const b = built.find((x) => x.id === id); return b ? b.n : "—"; };

// citation map
const usedOn = {};
for (const [id, o] of Object.entries(NOTES_DATA)) for (const k of o.src || []) (usedOn[k] = usedOn[k] || new Set()).add(id);

// ---------------- Speaker notes
const md = [];
md.push(`# Speaker notes and facilitator guide`, "");
md.push(`**${SB.title}** — *${SB.subtitle}*  `, `${SB.presenter}`, "");
md.push(`Two ways to run it: **40-minute workshop** (slides marked core; every vote and decision kept; ${mmss(CLOCK.__core)} scripted) or **75-minute seminar** (all main slides, including the regulatory deep-dive; ${mmss(CLOCK.__total)} scripted). Each slide's notes open with a short core script; the detail below it is for when time allows or someone asks.`, "");
md.push("## Before the session", "");
md.push(
  "- **Disclose precisely.** The disclosure slide names your FoGO role (founder and principal investigator, Ahilaya Biomedicals Pvt Ltd; patent filed; grants; BIRAC BIG proposal under review). Replace “[state role]” with your SwaKnee role, and state any equity, royalty, salary or grant interest.",
  "- **Re-check the SwaKnee evidence page.** The ≈32% vs ≈14% figures (n = 40 vs n = 42) were transcribed from the supplied original deck; the live page could not be reached from the build environment. Be ready to state SwaKnee’s CDSCO class and licence status and CTRI registration.",
  "- **Re-check time-sensitive regulatory facts** (checked 7 October 2026): the draft Medical Devices (Amendment) Rules 2026 on licence timelines (G.S.R. 515(E), 23 Jun 2026) and the Dec 2025 draft on perpetual validity (G.S.R. 883(E)) may have been finalised; G.S.R. 743(E) and 744(E) of 14 Aug 2026 are notified; NPPA knee-implant cap runs to 15 November 2026; NMC conduct regulations remain in abeyance; UCMPMD amended 30 Apr 2026; DPDP Rules phase dates.",
  "- **Official texts to have open:** MDR-2017 consolidated text (cdsco.gov.in), the Second Schedule fee file on cdscomdonline.gov.in, the CDSCO MDSW guidance (21 Jul 2026), the CDSCO classification lists for your device categories.",
  "- **Check your own public claims.** The SwaKnee website source reviewed for this deck says “Clinically Proven”. Align live pages and leaflets with the evidence slides before presenting.",
  "- **Media permissions.** Confirm written permission from the FoGO volunteer (face obscured) and the person in the SwaKnee step videos (no face shown) for public teaching use.",
  "- **Materials:** flipchart and markers, printed checklist handouts (docs/Decision_Checklist_Handout.pdf), index cards, a timer. Test both embedded videos on the venue computer.",
  "- **Evidence-status vocabulary** used throughout: Demonstrated · Reported, preliminary · Planned · Not established.",
  ""
);
for (const [label, pred, total] of [["Run sheet: 40-minute workshop (core slides)", (s) => s.core, CLOCK.__core], ["Run sheet: 75-minute seminar (all slides)", () => true, CLOCK.__total]]) {
  md.push(`## ${label}`, "", "| Slide | Clock | Min | Title | Activity |", "|---|---|---|---|---|");
  let t = 0;
  for (const s of ORDER) {
    if (!pred(s) || !s.time) continue;
    const o = NOTES_DATA[s.id] || {};
    md.push(`| ${numOf(s.id)} | ${mmss(t)}–${mmss(t + s.time)} | ${s.time} | ${o.title || s.title} | ${s.interaction || o.activity || "—"} |`);
    t += s.time;
  }
  md.push("", `Scripted total ${mmss(total)}; keep 3–5 minutes for discussion.`, "");
}
md.push("## Slide-by-slide notes", "");
const sections = [["preflight", "Pre-flight checks"], ["core", "Core script (say this)"], ["purpose", "Purpose"], ["say", "Say"], ["ask", "Ask / run"], ["debrief", "Debrief points"], ["status", "Evidence status"], ["india", "India adaptation"], ["caution", "Caution"], ["transition", "Transition"]];
for (const s of ORDER) {
  const o = NOTES_DATA[s.id];
  if (!o) continue;
  const c = CLOCK[s.id];
  md.push(`### Slide ${numOf(s.id)} · ${o.title || s.title}`, "");
  md.push(c && c.min ? `*Time: ${c.min} min${s.core ? " · core (40-min path)" : " · deep-dive (75-min path)"}${s.interaction ? ` · Activity: ${s.interaction}` : ""}*` : `*Reference slide*`, "");
  for (const [k, label] of sections) {
    if (!o[k]) continue;
    if (k === "preflight") md.push(`**${label}.**`, "", o[k], "");
    else md.push(`**${label}.** ${o[k].replace(/\n/g, "  \n")}`, "");
  }
  if (o.src && o.src.length) {
    md.push("**Sources.**", "");
    o.src.forEach((k, i) => { const r = RALL[k]; md.push(`${i + 1}. ${r ? r.cite : k}${r && r.url ? ` <${r.url}>` : ""}`); });
    md.push("");
  }
}
fs.writeFileSync(path.join(OUT, "Speaker_Notes.md"), md.join("\n"));

// ---------------- References
const groups = [
  ["teach", "Teaching materials: Stanford Biodesign, Harvard, Cambridge"],
  ["india", "India: regulation, guidance, ethics, pricing and safety"],
  ["intl", "Regulation abroad and international frameworks"],
  ["evid", "Ethics frameworks and independent evidence"],
  ["media", "Case material and media (supplied)"],
];
const rm = ["# Source citations", "", `All sources checked 7 October 2026. Web access in the preparation environment was search-based; each URL below appeared in a search result or comes from supplied project material. “Slides” lists where each source is cited.`, ""];
for (const [g, title] of groups) {
  const keys = Object.keys(RALL).filter((k) => RALL[k].group === g && usedOn[k]).sort((a, b) => RALL[a].cite.localeCompare(RALL[b].cite));
  if (!keys.length) continue;
  rm.push(`## ${title}`, "");
  for (const k of keys) {
    const r = RALL[k];
    const slides = [...usedOn[k]].map(numOf).filter((n) => n !== "—").sort((a, b) => a - b).join(", ") || "appendix";
    rm.push(`- ${r.cite}${r.url ? ` <${r.url}>` : ""} — *Slides: ${slides}*`);
  }
  rm.push("");
}
rm.push("## Notes on attribution", "",
  "- *Biodesign: The Process of Innovating Medical Technologies* is Stanford Biodesign content published by Cambridge University Press; it is cited as Stanford material.",
  "- *Engineering Better Care* (2017) was published by the Royal Academy of Engineering, Academy of Medical Sciences and Royal College of Physicians; its working group was chaired by Prof P. John Clarkson (University of Cambridge).",
  "- The IDEAL and IDEAL-D frameworks are Oxford-led (IDEAL Collaboration), not Cambridge.",
  "- Regulatory facts were verified from gazette notifications, CDSCO documents and PIB releases where search results exposed them, otherwise from consistent professional summaries; the facts files in build/facts record the confidence tag of every item. Official PDFs on cdsco.gov.in could not be fetched from the build environment; re-check rule numbers against the consolidated MDR-2017 text before citing them formally.",
  "- FoGO results are project-reported (Ahilaya Biomedicals); SwaKnee results are company-reported (Swayogya); neither has been independently verified or peer-reviewed. No cited institution has evaluated or endorsed either device.", "");
fs.writeFileSync(path.join(OUT, "References.md"), rm.join("\n"));

// ---------------- HTML renderer
function mdToHtml(src, title) {
  const lines = src.split("\n");
  let html = "", inList = false, inTable = false, ol = false;
  const inline = (t) => esc(t).replace(/&lt;(https?:[^&]+?)&gt;/g, '<a href="$1">$1</a>').replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
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

// ---------------- One-page checklist handout (A4 landscape), with the Indian permission column
const rows = [
  ["Need", "Will it help me?", "Is the need validated with patients and clinicians? Is the need statement solution-neutral? Is the intended purpose medical (so it is a device)?", "Need statement; observation notes; intended-use statement"],
  ["Evidence", "Is there proof, for people like me?", "Does the evidence match the exact claim, users and device version? Are failure modes controlled? What is demonstrated, reported, planned?", "Protocol; subgroup results; risk file (ISO 14971); version log"],
  ["People", "Can I freely refuse?", "Is consent independent of any dependent relationship, in the person’s language? Are conflicts disclosed and managed? Ethics committee registered; CTRI entry before enrolment", "Consent form and process; COI management plan; EC approval; CTRI entry"],
  ["Permission", "Is it allowed for this use?", "Risk class (A–D)? Test licence MD-13; clinical investigation MD-23; manufacturing licence MD-5 (State, A/B) or MD-9 (Central, C/D); import MD-15; Class A non-sterile non-measuring registration", "Classification rationale; licence or permission; QMS (Fifth Schedule); essential-principles checklist"],
  ["Access", "Can I afford and use it?", "What is the total cost of use? Who is excluded by its demands (vision, dexterity, language, power, phone)? Do marketing claims match the evidence (UCMPMD, DMRA)?", "Cost of a full course; inclusive-design audit; service plan; claims review"],
  ["Safety", "Who answers later?", "Who records, reports (MvPI) and acts on harm? PSUR schedule? How are updates validated, released and rolled back?", "Complaint log; MvPI route; PSUR calendar; change-control and rollback plan"],
];
const handout = `<!doctype html><html><head><meta charset="utf-8"><title>Patient-impact decision checklist</title><style>
@page { size: A4 landscape; margin: 11mm 12mm; }
body { font-family: Calibri, Carlito, Arial, sans-serif; color: #17262B; font-size: 10pt; margin: 0; }
.head { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1.2pt solid #0E3B3D; padding-bottom: 4pt; margin-bottom: 6pt; }
h1 { font-family: Cambria, Caladea, Georgia, serif; color: #0E3B3D; font-size: 20pt; margin: 0; }
.sub { color: #0F7C74; font-size: 10pt; }
table { border-collapse: collapse; width: 100%; }
th { background: #0E3B3D; color: #fff; text-align: left; padding: 5pt 6pt; font-size: 9.5pt; }
td { border-bottom: 0.6pt solid #C9D6D3; padding: 4pt 6pt; vertical-align: top; font-size: 9pt; }
td.stage { font-weight: bold; color: #0F7C74; width: 9%; } td.q { font-style: italic; width: 13%; }
td.box { width: 15%; } td.own { width: 10%; }
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
<p style="font-size:9pt;margin:4pt 0 0">India anchors: MDR-2017 (Class A–D; MD-13 test licence; MD-22/23 clinical investigation; MD-5 State / MD-9 Central manufacturing; MD-15 import) · ethics committee registered with CDSCO · CTRI · ICMR 2017 · MvPI 1800-180-3024 · UCMPMD 2024 · DPDP Rules 2025</p></div>
</div>
<div class="foot">Workshop synthesis adapted from Stanford Biodesign (need statements, Principled Decision-Making), Harvard MRCT Center (diversity, plain-language consent), Cambridge Engineering Design Centre (inclusive design), IDEAL-D, Declaration of Helsinki (2024), ICMR (2017) and CDSCO guidance. Not a regulatory checklist or certification. A licence, patent, grant or institutional association is not evidence of readiness. Checked 7 October 2026.</div>
</body></html>`;
fs.writeFileSync(path.join(OUT, "Decision_Checklist_Handout.html"), handout);
console.log("docs written to", OUT);
