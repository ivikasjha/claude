# Medical Device Ethics and Regulation Workshop

**Bridging the Gap: From Innovation to Patient Impact**
*Ethics, Evidence, Regulation and Responsible Medical Device Translation*
Dr Vikas Kumar Jha · KIIT University, Bhubaneswar

Version 2 (October 2026): an infographic-led deck with a full module on Indian medical device regulation by risk class, CDSCO obligations and guidance, and the comparison with regulators abroad. Two ways to run it: a **40-minute workshop** (24 core slides, 39:30 scripted: every vote and decision, both cases, risk classes, the licence matrix, FoGO's path, the quiz and the India–USA–EU comparison) or a **75-minute seminar** (all 54 main slides, 70:00 scripted, including the full regulatory deep-dive).

## Deliverables

| File | What it is |
|---|---|
| [`deck/From_Innovation_to_Patient_Impact.pptx`](deck/From_Innovation_to_Patient_Impact.pptx) | Editable deck: 54 main slides in seven parts plus appendix (forms, fees, CDSCO guidance list, evidence requests) and clickable source pages. Native shapes, tables and charts; maps and flags as images; embedded FoGO (12 s) and SwaKnee (20 s) clips; speaker notes on every slide with a short core script followed by detail |
| [`deck/From_Innovation_to_Patient_Impact.pdf`](deck/From_Innovation_to_Patient_Impact.pdf) | PDF preview (videos appear as poster frames) |
| [`storyboard/Storyboard.pdf`](storyboard/Storyboard.pdf) · [`.md`](storyboard/Storyboard.md) | Slide-by-slide storyboard with thumbnails, message, visual, interaction, timing and which path (core / deep-dive) each slide belongs to |
| [`docs/Speaker_Notes.pdf`](docs/Speaker_Notes.pdf) · [`.md`](docs/Speaker_Notes.md) | Facilitator guide: pre-session checks, run sheets for both paths, core script and detailed notes per slide with sources |
| [`docs/References.pdf`](docs/References.pdf) · [`.md`](docs/References.md) | Source citations grouped by theme, with the slides that cite each source |
| [`docs/Decision_Checklist_Handout.pdf`](docs/Decision_Checklist_Handout.pdf) · [`.docx`](docs/Decision_Checklist_Handout.docx) | One-page reusable patient-impact decision checklist with the Indian permission column (print or edit) |
| [`build/facts/`](build/facts/) | The research behind the regulatory content: every fact with a confidence tag (confirmed / likely / unverified) and its source URL |
| [`original/`](original/) | The supplied deck this rebuild started from |

## Structure

| Part | Slides | What it covers |
|---|---|---|
| Opening | 7 | India's device moment (market, imports, 2030 target, all devices regulated since 2020), disclosure, opening vote, the three teaching traditions, two composite patients, the six-stage journey |
| 1 · Need and evidence | 12 | Need statements and claim wording; "is it a medical device in India?"; FoGO prototype video, iterations and the IDEAL evidence ladder; decision 1; ISO 14971 risk map; SwaKnee routine and claim-versus-evidence; independent evidence on cueing and PEMF; subgroup performance |
| 2 · People | 4 | Decision 2 (inventor-clinician consent); what valid consent requires in India (ICMR 2017, NDCT 2019, Helsinki 2024); conflicts of interest and the rules in India and abroad |
| 3 · Permission in India | 14 | Regulatory architecture (D&C Act 1940, MDR-2017, CDSCO, State authorities, notified bodies, labs, MvPI, BIS, NPPA); timeline to 2026; risk classes A–D with examples; which licence, authority and form for each class and activity; the manufacturing-licence route with fees and timelines; import, registration and reliance on foreign approvals; eight ongoing duties; clinical investigation; software as a device (CDSCO MDSW guidance 2026); post-market and materiovigilance; FoGO on the Indian path; a classification quiz; policy and ecosystem map |
| 4 · Permission abroad | 8 | World map of regulators; class equivalence across six systems; US FDA; EU MDR; UK, Japan, Australia, China, Canada; India–USA–EU side by side; the standards and reliance routes that travel |
| 5 · Access and safety | 6 | Inclusive-design audit; total cost of use and NPPA; decision 4 (brochure claims); decision 5 (software update); the harm loop with the ASR hip case |
| Close | 3 | Closing vote, commitment exercise, reusable checklist |
| Appendix | 4 + sources | MDR-2017 forms at a glance; fees and timelines by class; CDSCO guidance documents; evidence to request; clickable source pages |

Evidence labels on every case claim: Demonstrated · Reported, preliminary · Planned · Not established.

## Before presenting

- The disclosure slide shows “[state role]” for the SwaKnee interest until you edit it.
- Regulatory facts were checked on 7 October 2026 against gazette notifications, CDSCO documents and professional summaries; official PDFs on cdsco.gov.in could not be opened from the build environment, so rule sub-numbers carry a “verify” tag where the facts file is not confirmed. Have the consolidated MDR-2017 text and the CDSCO fee file open on the day.
- Re-check the SwaKnee evidence-page figures and state SwaKnee's class and licence status; align your own web claims with the evidence slides.
- The slide 1 notes list the remaining pre-session checks.

## Rebuild

```bash
cd build
npm install                                        # pptxgenjs, react-icons, react, react-dom, sharp, @svg-maps/world, @svg-maps/india, country-flag-icons
NODE_PATH=./node_modules node build_deck_v2.js     # writes deck/From_Innovation_to_Patient_Impact.pptx and built_index.json
NODE_PATH=./node_modules node make_docs_v2.js      # writes docs/*.md and *.html
python3 make_handout_docx.py                       # writes docs/Decision_Checklist_Handout.docx
python3 make_storyboard_v2.py <renders> ../storyboard   # thumbnails from a PDF render of the deck
NODE_PATH=./node_modules node build_section.js india    # render one section to check it
```

Content lives in `build/sections/*.js` (slides, one module per part), `build/notes/*.js` (speaker notes and source lines, keyed by slide id), `build/refs.js` (citations), `build/storyboard_v2.json` (order, messages, timings, core flags) and `build/facts/*.md` (verified facts). The design system is `build/ui.js` (layouts, components, maps, flags, photo frames); the theme is in `build/lib.js`. `DESIGN.md` records the composition rules.

## Media

Authentic prototype photographs and clips come from supplied project material (FoGO BIRAC BIG presentation; SwaKnee product assets and “how to use” step videos). No identifiable faces are shown; the FoGO volunteer's face is obscured. Confirm consent for public teaching use before presenting. Maps are drawn from `@svg-maps` data and flags from `country-flag-icons`.
