# Medical Device Ethics Workshop

**Bridging the Gap: From Innovation to Patient Impact**
*Ethics, Evidence, Regulation and Responsible Medical Device Translation*
Dr Vikas Kumar Jha · KIIT University, Bhubaneswar · interactive session, 35–40 minutes

## Deliverables

| File | What it is |
|---|---|
| [`deck/From_Innovation_to_Patient_Impact.pptx`](deck/From_Innovation_to_Patient_Impact.pptx) | Editable deck: 25 main slides (35 min scripted) + 11 appendix slides (evidence context, clickable sources). Native charts, shapes and tables; embedded FoGO (12 s) and SwaKnee (20 s) clips. Every slide’s notes open with a short core script, followed by detail for questions; slide 1 notes carry the pre-session checks |
| [`deck/From_Innovation_to_Patient_Impact.pdf`](deck/From_Innovation_to_Patient_Impact.pdf) | PDF preview (videos appear as poster frames) |
| [`storyboard/Storyboard.pdf`](storyboard/Storyboard.pdf) · [`.md`](storyboard/Storyboard.md) | Slide-by-slide storyboard: message, visual, interaction, evidence status, timing, sources |
| [`docs/Speaker_Notes.pdf`](docs/Speaker_Notes.pdf) · [`.md`](docs/Speaker_Notes.md) | Facilitator guide: pre-session checks, run sheet, core script and detailed notes per slide, with sources |
| [`docs/References.pdf`](docs/References.pdf) · [`.md`](docs/References.md) | Source citations grouped by theme, with the slides that cite each source |
| [`docs/Decision_Checklist_Handout.pdf`](docs/Decision_Checklist_Handout.pdf) · [`.docx`](docs/Decision_Checklist_Handout.docx) | One-page reusable patient-impact decision checklist (print or edit) |
| [`original/`](original/) | The supplied deck this rebuild started from |

## Session design

- **Story spine:** two composite patients, Ramesh (Parkinson’s, FoGO) and Kamala (knee osteoarthritis, SwaKnee), followed through six stages: Need → Evidence → People → Permission → Access → Safety.
- **Interaction:** opening vote (slide 3), four “Would you proceed?” decisions, each with a fact that argues against the safe answer (slides 10, 15, 20, 21), closing re-vote (slide 23), commitment exercise (slide 24), reusable checklist (slide 25).
- **Timing:** 35:00 scripted, leaving 3–5 minutes for discussion. Slides 14 and 18 are marked optional if running behind. 21 of 25 main slides carry 30 words or fewer; the exceptions are the evidence ladder, risk map, permission map and checklist.
- **Evidence labels on every case claim:** Demonstrated · Reported, preliminary · Planned · Not established.
- **Teaching lenses:** Stanford Biodesign (need statements, Principled Decision-Making, Stanford-India Biodesign) · Harvard (HMS Center for Bioethics, MRCT Center, Petrie-Flom, HBS cases) · Cambridge (Engineering Design Centre inclusive design, Engineering Better Care, Institute for Biomedical Innovation, Judge CCHLE), adapted to India (CDSCO MDR-2017, ICMR 2017, MvPI, NPPA, UCMPMD 2024, DPDP Rules 2025) with selective US/EU/UK comparison.

## Rebuild

```bash
cd build
npm install                                        # pptxgenjs, react-icons, react, react-dom, sharp
NODE_PATH=./node_modules node build_deck.js        # writes deck/From_Innovation_to_Patient_Impact.pptx
NODE_PATH=./node_modules node make_docs.js         # writes docs/*.md and *.html
python3 make_handout_docx.py                       # writes docs/Decision_Checklist_Handout.docx
python3 wordcount.py ../deck/From_Innovation_to_Patient_Impact.pptx
```

Content lives in `build/notes.js` (speaker notes, source lines), `build/refs.js` (citations) and `build/storyboard.json` (timings); layout in `build/build_deck.js`; theme colours and fonts in `build/lib.js`. `build_deck.js` uses the theme helper from the Claude pptx skill (set `APPLY_THEME` to its path if it lives elsewhere).

## Before presenting

Slide 2 shows “[state role]” for your SwaKnee interest until you edit it. The slide 1 notes list the other checks: re-check the SwaKnee evidence-page figures, state SwaKnee’s licence and CTRI status, align your own web claims, and confirm time-sensitive Indian rules (NPPA cap expiry, MDR-2017 amendments, NMC regulations).

## Media

Authentic prototype photographs and clips come from supplied project material (FoGO BIRAC BIG presentation; SwaKnee product assets and “how to use” step videos). No identifiable faces are shown; the FoGO volunteer’s face is obscured. Confirm consent for public teaching use before presenting.
