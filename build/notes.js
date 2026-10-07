// Speaker notes, on-slide source lines and appendix reference pages.
const fs = require("fs");
const path = require("path");
const { R } = require("./refs");

const SB = JSON.parse(fs.readFileSync(path.join(__dirname, "storyboard.json"), "utf8")).slides;
const MISSING = new Set();

function mmss(x) {
  const m = Math.floor(x);
  const s = Math.round((x - m) * 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
const CLOCK = {};
{
  let t = 0;
  for (const s of SB) { CLOCK[s.n] = { start: t, end: t + s.time, min: s.time }; t += s.time; }
}

function ref(k) {
  const r = R[k];
  if (!r) { MISSING.add(k); return `[${k}]`; }
  return r.url ? `${r.cite} ${r.url}` : r.cite;
}

// Compose one slide's notes in a consistent facilitator format.
function N(n, o) {
  const c = CLOCK[n];
  const lines = [`SLIDE ${n} · ${o.title}`];
  if (c && c.min) lines.push(`TIME ${mmss(c.min)} min  (clock ${mmss(c.start)}–${mmss(c.end)})`);
  else lines.push("TIME Reference slide (use during Q&A or as a handout)");
  if (o.activity) lines.push(`ACTIVITY ${o.activity}`);
  lines.push("");
  if (o.purpose) lines.push(`PURPOSE\n${o.purpose}`, "");
  if (o.say) lines.push(`SAY\n${o.say}`, "");
  if (o.ask) lines.push(`ASK / RUN\n${o.ask}`, "");
  if (o.debrief) lines.push(`DEBRIEF POINTS\n${o.debrief}`, "");
  if (o.status) lines.push(`EVIDENCE STATUS\n${o.status}`, "");
  if (o.india) lines.push(`INDIA ADAPTATION\n${o.india}`, "");
  if (o.caution) lines.push(`CAUTION\n${o.caution}`, "");
  if (o.transition) lines.push(`TRANSITION\n${o.transition}`, "");
  if (o.src && o.src.length) {
    lines.push("SOURCES");
    o.src.forEach((k, i) => lines.push(`[${i + 1}] ${ref(k)}`));
    lines.push("");
  }
  lines.push("Sources checked 7 October 2026.");
  return lines.join("\n");
}

const NOTES = {};
const SOURCE_LINE = {};
const NOTE_DATA = {};
function add(n, o, line) { NOTE_DATA[n] = o; NOTES[n] = N(n, o); SOURCE_LINE[n] = line; }

// ---------------------------------------------------------------- 1
add(1, {
  title: "Bridging the Gap: From Innovation to Patient Impact",
  activity: "Opening question to the room",
  purpose: "Start with the person who will use the device, not with the technology.",
  say: "“Imagine the prototype on your desk is about to be used by someone at home — in Bhubaneswar, in Cuttack, or in a village two hours from a neurologist. What would you need to know before you recommended it?”\n“Today we practise that judgement on two devices from my own development work: FoGO, a wearable that detects freezing of gait in Parkinson’s disease and gives a vibration cue, and SwaKnee, a pulsed electromagnetic field (PEMF) system for knee osteoarthritis. The photographs are authentic prototypes.”\n“By the end you should be able to: state an intended use and claim precisely; judge what evidence supports it; recognise consent, conflict-of-interest and affordability burdens; know which Indian permission answers which question; and assign responsibility for safety after launch.”",
  caution: "The decision checklist at the end is a workshop synthesis, not an official regulatory checklist or certification.",
  transition: "“Before we start, you should know my interests.”",
  src: ["fogoDeck", "swaMedia"],
}, "");

// ---------------------------------------------------------------- 2
add(2, {
  title: "My interests, stated first",
  activity: "Disclosure and ground rules (30 seconds)",
  purpose: "Model good conflict-of-interest practice before asking the audience to judge evidence.",
  say: "“I have professional interests in both case studies.” Say them specifically. FoGO: founder and principal investigator, Ahilaya Biomedicals Pvt Ltd (incubated at KIIT TBI); a provisional patent and a design application have been filed; grant funding has been received and a BIRAC BIG proposal is under review. SwaKnee: state your role and any equity, royalty or salary interest. Name any other financial interests.\n“Apply a ‘reasonably perceived’ test to everything I say about these devices — the test used in the University of Cambridge conflict-of-interest policy. The Institute of Medicine defines a conflict of interest as circumstances that create a risk that judgement about a primary interest is unduly influenced by a secondary one — a risk, not an accusation.”\n“Three ground rules: vote before you hear my view; challenge every claim, including mine; and protect identities — no names or photographs of patients from your own practice.”",
  debrief: "Stanford Biodesign teaching treats the physician-innovator role as a predictable source of bias that must be managed, not merely declared (Chao, Riskin & Krummel 2010; Stanford GSB case OIT105). Johnson and Rogers list conflicts of interest among the four ethical challenges of innovation. We return to management on slide 16.",
  transition: "“Let’s make a decision before we look at any details.”",
  src: ["camCoi", "iom", "sbChao", "sbGsbCoi", "johnsonRogers"],
}, "Sources: University of Cambridge COI policy; Institute of Medicine (2009); Chao, Riskin & Krummel (2010); Stanford GSB case OIT105");

// ---------------------------------------------------------------- 3
add(3, {
  title: "Would you let a patient use it? (opening vote)",
  activity: "OPENING VOTE by show of fingers",
  purpose: "Surface the room’s intuitions before any teaching, so we can see the shift at the end.",
  say: "Read the three facts slowly: a working prototype, promising laboratory results, a test licence granted.\n“Hold up one, two or three fingers. One: suitable for routine care. Two: suitable for a research study. Three: not yet — I need more information.”",
  ask: "Count roughly and write the split on the flipchart (1 = __, 2 = __, 3 = __). Ask one person from each group: “What made you choose that?” Do not give the answer yet, and do not say which device this is.",
  debrief: "Keep it brief; the full answer unfolds during the session.\n• A test licence (Form MD-13 under the Medical Devices Rules, 2017) allows small quantities to be made for clinical investigation, test, evaluation, demonstration or training. Devices made under it cannot be sold. It is not permission to treat patients and not, by itself, permission to run a study.\n• A study needs approval from an ethics committee registered with CDSCO and, for an investigational device, Central Licensing Authority permission (Form MD-22 → MD-23), prospective CTRI registration and arrangements for injury compensation.\n• Routine care needs a licence for the intended use and evidence appropriate to the claim.\n“We will vote again at the end with exactly the same options.”",
  caution: "These three facts match FoGO’s real status in August 2026 (alpha prototype, public-dataset results, MD-13 test licence for 25 units). Keep that to yourself until the closing vote (slide 23), then reveal it.",
  transition: "“To judge this well, we borrow three teaching traditions.”",
  src: ["mdr", "md12", "md22", "ndct"],
}, "Teaching case. Test licence: Form MD-13, Medical Devices Rules 2017");

// ---------------------------------------------------------------- 4
add(4, {
  title: "Three teaching traditions, one patient in India",
  purpose: "Credit the frameworks we use and show how each is adapted to Indian practice.",
  say: "Stanford Biodesign: innovation starts from a validated need, not a technology. Its Identify–Invent–Implement process asks teams to observe care, write solution-neutral need statements and screen needs before inventing. Its ‘Principled Decision-Making’ brief asks teams to write down their values early, before pressure arrives.\nHarvard bioethics: the HMS Center for Bioethics teaches through cases; the MRCT Center of Brigham and Women’s Hospital and Harvard provides practical tools on diversity, accessibility, plain-language consent, return of results and post-trial access for devices; the Petrie-Flom Center studies device regulation, home digital health and AI.\nCambridge design and translation: the Engineering Design Centre’s Inclusive Design Toolkit asks who is excluded by a product’s demands; Engineering Better Care (2017; working group chaired by Cambridge’s Prof John Clarkson) adds people, systems, design and risk perspectives; Cambridge’s Institute for Biomedical Innovation (announced January 2026) addresses the gap between a lab prototype and trial-ready devices; Cambridge Judge Business School’s health centre focuses on making proven solutions affordable.",
  india: "Stanford’s process was localised in India through Stanford-India Biodesign (from 2007–08), now the School of International Biodesign at AIIMS and IIT Delhi. Chaturvedi and colleagues (BMJ Innovations 2015) adapted it in an Indian emergency department: 100 needs, filtered to 10. Our regulatory and ethics anchors are CDSCO under MDR-2017, ICMR’s 2017 guidelines, MvPI, NPPA pricing, and the reality that families pay out of pocket for most outpatient devices.",
  caution: "None of these institutions has evaluated or endorsed FoGO or SwaKnee. The Biodesign textbook is Stanford content published by Cambridge University Press, so cite it as Stanford. IDEAL (slide 9) is Oxford-led, not Cambridge.",
  transition: "“Now meet the two people we will keep in mind.”",
  src: ["sbProcess", "sbPrincipled", "sbIndia", "sbChaturvedi", "hmsBioethics", "mrctDiversity", "pfHome", "camIdt", "camEbc", "camIbi", "camCchle"],
}, "Sources: Stanford Biodesign; HMS Center for Bioethics, MRCT Center, Petrie-Flom; Cambridge EDC, Engineering Better Care, CCHLE");

// ---------------------------------------------------------------- 5
add(5, {
  title: "Two people we will follow",
  purpose: "Give every later decision a human face.",
  say: "“Ramesh and Kamala are composites, not real patients, built from situations common in Odisha clinics.”\nRamesh, 71: Parkinson’s disease for eight years; freezes in doorways and when turning; has fallen twice this year; lives with his daughter, who works days and lends him her smartphone.\nKamala, 64: knee osteoarthritis in both knees; lives 30 km from the district hospital; travels by shared auto; her household pays out of pocket and loses wages when someone accompanies her.\n“Every decision today is made for one of them. When you vote, vote for them.”",
  india: "Burden context: about 7.7 lakh people in India were living with Parkinson’s disease in 2019 (India State-Level Disease Burden Initiative, as cited in the FoGO project material). Knee osteoarthritis was found in 28.7% of 5,000 people in a five-site community survey (Pal et al. 2016) — one study, not a national estimate.",
  caution: "Do not attach these personas to the volunteer or demonstrator shown in the photographs or videos.",
  transition: "“Their journey has six stages.”",
  src: ["gbdIndiaNeuro", "palOA"],
}, "Composite personas for teaching; not real patients. Photographs: FoGO and SwaKnee prototypes");

// ---------------------------------------------------------------- 6
add(6, {
  title: "Each stage must answer a patient’s question",
  purpose: "Introduce the six-stage spine of the session; the progress dots on later slides show where we are.",
  say: "Need — Will it help me? Evidence — Is there proof, for people like me? People — Can I freely say no, and are the people asking me free of hidden interests? Permission — Is it allowed for this use? Access — Can I afford it, use it and keep using it? Safety — Who answers if it fails, after the sale?\n“These questions adapt research-ethics principles (ICMR 2017: benefit, risk minimisation, voluntariness, accountability) to the device life cycle. The stages are not strictly sequential: Engineering Better Care’s ‘Sustain’ phase reminds us that access and safety must be designed from the start. We follow Ramesh and Kamala along this path.”",
  transition: "“Stage one: what exactly are we promising?”",
  src: ["icmr", "sbProcess", "camEbc"],
}, "Workshop synthesis adapted from ICMR (2017) principles, the Stanford Biodesign process and Engineering Better Care");

// ---------------------------------------------------------------- 7
add(7, {
  title: "Claim wording sets the evidence bar",
  activity: "Quick call-out: rewrite one need statement",
  purpose: "Show that the intended use and claim decide the regulatory route and the evidence needed.",
  say: "Stanford’s need-statement format is: a way to [address the problem] in [a specific population] in order to [achieve a desired outcome]. It is deliberately solution-neutral. For Ramesh: “A way to reduce freezing-related immobility and falls in people with Parkinson’s disease living at home, in order to preserve safe, independent walking.” Notice: no sensor, no vibration, no app.\nNow compare two claims. “Shows walking patterns” promises information. “Detects freezing of gait in Parkinson’s” promises detection of a disease-related event and, in FoGO, triggers an action (a cue). Under MDR-2017, intended use and claims determine whether a product is a medical device and its risk class (A–D). CDSCO’s Guidance on Medical Device Software (21 July 2026) covers software as a medical device, software in a device and IVD software, including AI and IoT, whenever the intended purpose is medical; risk depends on how far the output drives clinical decisions and how serious the condition is. Calling a product ‘wellness’ does not remove obligations when the real purpose is medical; Simon, Shachar and Cohen (JAMA 2022) describe the liability grey zone of ‘prediagnostic’ wearables.",
  ask: "“Rewrite Kamala’s need without naming any device.” Model answer: “A way to reduce pain and functional limitation in adults with knee osteoarthritis who cannot access or tolerate current options, in order to maintain daily function at an affordable cost.”",
  caution: "FoGO’s project material proposes Class B; that is the developer’s proposal, not a CDSCO classification. Do not state SwaKnee’s class as fact; confirm with CDSCO or a regulatory adviser.",
  transition: "“Let’s look at what FoGO has actually shown.”",
  src: ["sbNeed", "mdr", "mdsw", "pfWearables"],
}, "Sources: Stanford Biodesign, Need Statements (2022); MDR-2017; CDSCO Medical Device Software guidance (21 Jul 2026)");

// ---------------------------------------------------------------- 8
add(8, {
  title: "FoGO: what did the prototype actually show?",
  activity: "Play the embedded 12-second clip, then ‘seen vs inferred’",
  purpose: "Separate what a demonstration shows from what it seems to promise.",
  say: "Introduce FoGO: an ankle module with a six-axis motion sensor streaming at 100 Hz to a phone app, which runs the detection model and, when a freeze is confirmed, triggers a vibrotactile cue from a chest module worn on an adhesive patch.\nPlay the clip (click the video). It shows a volunteer, face obscured, stopping mid-walk to mimic a freeze. The ankle module registers the stop, the app’s detection paths cross their thresholds and the chest module vibrates.\nAsk: “What did you see? What did you infer?” Write two columns on the flipchart.",
  debrief: "Seen: the components work together in a staged demonstration.\nNot shown: detection of real freezes in people with Parkinson’s; performance across many users, homes, turns, doorways and walking aids; tolerability of repeated cues; and any clinical benefit such as fewer falls or more walking.\nA demonstration is valuable for understanding a system; it is not evidence of efficacy.",
  status: "Demonstrated: staged prototype function (volunteer, simulated freeze). Not established: clinical detection performance and benefit.",
  caution: "The project has built three prototype iterations (January 2024 to June 2025); results apply to the version tested. Do not describe the clip as clinical footage.",
  transition: "“So where does FoGO sit on the evidence ladder?”",
  src: ["fogoDeck"],
}, "Source: FoGO project material (Ahilaya Biomedicals, BIRAC BIG), supplied. Staged demonstration; volunteer; simulated freeze");

// ---------------------------------------------------------------- 9
add(9, {
  title: "FoGO has climbed two rungs, not five",
  purpose: "Make the difference between demonstrated, preliminary, planned and unestablished evidence visible.",
  say: "Rung 1, Demonstrated: the alpha prototype works on a volunteer with a simulated freeze; a bench study found the chest had the lowest vibration-perception threshold and the widest usable range of five body sites.\nRung 2, Reported and preliminary: on three public datasets (Daphnet, CuPiD, Turning-in-place) the project reports subject-wise F1 scores of 0.83–0.85 (sensitivity 0.86–0.89, specificity 0.85–0.88) and 0.74–0.80 when tested on an unseen dataset, with 0.15–0.18 false alarms per minute.\nBoth rungs are preclinical — ‘Pre-IDEAL’ in the 2019 update of the IDEAL framework.\nRung 3, Planned: a prospective clinical proof-of-concept with AIIMS Bhubaneswar neurology and rehabilitation advisers, within an 18-month BIRAC BIG project (IDEAL stages 1–2a). A planned study and its targets are not results.\nRungs 4 and 5, Not established: benefit in daily life, and long-term safety and fair performance across groups.",
  debrief: "Context: the best-known public benchmark, Daphnet, recorded 10 patients in a laboratory, of whom 8 froze (237 video-labelled events). Systematic reviews report sensitivities of 73–100% and specificities of 67–100%, mostly in laboratory conditions. So public-dataset F1 scores, however careful, cannot tell us how FoGO performs in Odisha homes.\nIDEAL (McCulloch et al., Lancet 2009; Oxford-led) and IDEAL-D (Sedrakyan et al., BMJ 2016) ask for prospective design, registration and full reporting from the earliest human stages, and suggest that device approval can be staged and tied to registries.\nFor the next rung, ask for: video-annotated reference events; participant-level validation; false alarms per hour and detection latency in real use; and testing in homes, during turns and in doorways.\nCambridge’s Institute for Biomedical Innovation (2026) names the gap between a lab prototype and devices suitable for clinical trials: consistent, documented, version-controlled batches made under a quality system.",
  ask: "“Which rung matters most before Ramesh uses it at home?”",
  status: "1 Demonstrated · 2 Reported, preliminary (project-reported, public datasets) · 3 Planned · 4–5 Not established.",
  transition: "“Here is a realistic decision.”",
  src: ["fogoDeck", "daphnet", "silvaDeLima", "pardoel", "ideal", "idealD", "camIbi"],
}, "Sources: FoGO project material (supplied; project-reported); IDEAL (Lancet 2009; 2019 update); IDEAL-D (BMJ 2016)");

// ---------------------------------------------------------------- 10
add(10, {
  title: "Would you proceed? A home pilot for Ramesh next month",
  activity: "DECISION 1 of 4: vote A/B/C, then pairs name conditions",
  purpose: "Turn the evidence ladder into a concrete decision with conditions and owners.",
  say: "Read the facts: F1 0.83–0.85 on public datasets; ten participants using the device alone at home; ethics approval still pending.\n“A: proceed. B: proceed only with conditions — name them. C: not yet.”",
  ask: "Vote. Give pairs 60 seconds: “If B, which two conditions?” Take three answers.",
  debrief: "Conditions an ethics committee and regulator would expect:\n1. Permissions first: approval from an ethics committee registered with CDSCO; for an unlicensed investigational device, CDSCO permission (MD-22 → MD-23) — the academic-study exemption covers only licensed devices; units built under the MD-13 test licence; prospective CTRI registration before the first participant; insurance and compensation arrangements.\n2. Start supervised: in-clinic sessions with video-annotated freezes before any home use; then home use with a caregiver, stopping rules and a contact number.\n3. Plan for failure: fall-risk assessment, cue limits, an easy off switch, a visible loss-of-monitoring alert.\n4. Consent for fluctuating cognition: ICMR 2017 sections on consent and vulnerability; involve caregivers; plain language (MRCT Clinical Research Glossary).\n5. Data: the app logs gait events; design notice, minimisation and retention now — under the DPDP Rules (notified 13 November 2025) the core obligations apply from about May 2027.\n6. After the study: Declaration of Helsinki 2024 (para 34) requires post-trial provisions to be arranged in advance and disclosed in consent; the MRCT Center’s 2025 device framework shows how (apply by analogy).\n“Not yet” is legitimate while permissions are pending. Wexler and Largent (2023) note that even ‘harmless’ sensor tests on lab members merit independent oversight.",
  caution: "Hypothetical scenario built on real FoGO facts; it does not describe the actual FoGO study plan, which is supervised and AIIMS-based.",
  transition: "“If we do proceed, which failures matter most?”",
  src: ["md12", "md22", "mdr", "ndct", "icmr", "helsinki", "mrctGlossary", "mrctPostTrial", "dpdpRules", "wexler"],
}, "Hypothetical scenario. Sources: MDR-2017 (MD-13, MD-22/23); ICMR (2017); Declaration of Helsinki (2024) para 34");

// ---------------------------------------------------------------- 11
add(11, {
  title: "Rank each failure by harm and likelihood",
  activity: "Risk-map discussion",
  purpose: "Practise risk prioritisation and connect it to testable controls.",
  say: "“Risk combines severity and likelihood. The six failure modes are placed for discussion, not from measured data.”\nMissed freeze: no cue when Ramesh needs one — serious, and possibly critical if he falls. Silent signal loss: the system stops monitoring without telling him — false reassurance. Flat battery mid-walk. False cue: frequent but usually minor. Skin irritation under the strap or patch. Data exposure from the app.\nThe right-hand panel translates a reported number into lived experience: 0.15–0.18 false alarms per minute on public datasets would mean about 9–11 unnecessary vibrations in every hour of walking if those rates held at home. Would Ramesh keep wearing it?",
  debrief: "ISO 14971:2019 approach: identify hazards; estimate and evaluate risk; control it; verify that controls work; and keep monitoring after release. Usability engineering (IEC 62366-1) tests whether real users can operate the controls.\nThe FoGO team’s own risk plan already names missed or false detections (2-of-3 debounce, patient-specific fine-tuning) and discomfort or habituation (cue intensity within the bench-tested range). Ask how each control will be shown to work.\nControls to test first: a visible and tactile loss-of-monitoring alert; cue-intensity limits and an easy stop; performance during turns, in doorways and with walking aids; low-battery warnings; encryption and short data retention.\nEngineering Better Care’s risk perspective and Gerke and colleagues’ ‘system view’: evaluate the whole system — patient, caregiver, phone battery, network, physiotherapist follow-up — not only the algorithm. Kellmeyer and colleagues warn that closed-loop devices can blur accountability when automation fails.",
  ask: "“Which control would you test first, and how would you show it works?”",
  caution: "Placement on the grid is illustrative. The 9–11 per hour figure is an extrapolation from project-reported dataset rates, not a measured home rate.",
  transition: "“Now to Kamala, and a different kind of burden.”",
  src: ["fogoDeck", "iso14971", "iec62366", "camEbc", "pfSystem", "kellmeyer"],
}, "Illustrative ranking. False-alarm rate: FoGO project material (public datasets). Approach: ISO 14971:2019; Gerke et al. (2020)");

// ---------------------------------------------------------------- 12
add(12, {
  title: "A device is also a daily routine",
  activity: "Play the embedded 20-second clip",
  purpose: "Show that use burden is part of benefit–risk.",
  say: "Introduce SwaKnee: a knee applicator and controller that deliver pulsed electromagnetic fields, intended as an adjunct in knee osteoarthritis care.\nPlay the clip: fit the applicator, switch on the controller, rest for the session. It is a company demonstration of use; it shows no clinical response.\n“The supplied leaflet describes 45-minute sessions daily for 45 days. That is 2,025 minutes — about 34 hours of Kamala’s time — before travel, fitting, charging and help from family.”",
  ask: "“Who helps Kamala when the cuff slips, the controller shows an error, or her knee feels warm?”",
  debrief: "Use burden affects adherence, which affects real-world benefit. Each task also makes demands on vision, dexterity, reach and memory — we audit these on slide 18.",
  caution: "The 45 × 45 schedule illustrates time burden. It is not a prescription; current instructions and clinician advice define actual use.",
  transition: "“What can the SwaKnee evidence support?”",
  src: ["swaLeaflet", "swaMedia"],
}, "Sources: SwaKnee leaflet (supplied): 45 min daily for 45 days; company ‘how to use’ footage");

// ---------------------------------------------------------------- 13
add(13, {
  title: "Which claim can this evidence carry?",
  activity: "Claim challenge: one participant defends, one challenges",
  purpose: "Match the strength of a claim to the strength of the evidence.",
  say: "The chart reproduces the company-reported 45-day comparative study: device group n = 40, comparison group n = 42; average VAS pain fell by about 32% versus 14% from baseline. These are average relative changes, not the proportion of people who improved.\nThe callout adds a patient’s yardstick: in knee osteoarthritis, the minimal clinically important improvement in pain is about −19.9 mm, or −40.8%, on a 100 mm scale (Tubach et al. 2005). An average fall of 32% does not tell us how many people reached a change they would notice as important.\nFrom the public summary we also cannot tell: how groups were allocated; whether there was blinding or a sham control; whether the study was prospectively registered on CTRI; how missing data were handled; the between-group difference with its confidence interval; adverse events; or durability beyond 45 days.",
  ask: "Invite one person to defend claim 1 and another to challenge claim 3.",
  debrief: "Claim 1, “less pain on average in one 45-day company study”, is acceptable if clearly labelled as company-reported.\nClaim 2, “clinically proven”, needs independent, prospectively registered, sham-controlled trials and consistent results. Independent evidence on PEMF is mixed: a Cochrane review (2013) found pain probably improves by about 15 points out of 100 more than sham, with function uncertain; meta-analyses of knee OA disagree (Chen 2019 found no pain advantage; Yang 2020 found one); OARSI’s 2019 guideline strongly recommends against electromagnetic therapy.\nClaim 3, “regrows cartilage”, was not measured. No human evidence of cartilage regeneration was found; a pain change cannot establish structural change.\nIndustry sponsorship matters: a Cochrane methodology review found manufacturer-sponsored drug and device studies reach favourable conclusions more often (RR 1.34). The same standard applies to every leaflet and web page — including those of the presenter’s own company.",
  status: "Reported (company study; not peer-reviewed or independently verified). ‘Clinically proven’: not established. Cartilage regrowth: not measured.",
  caution: "The MCII is a within-patient threshold from a four-week cohort, not a between-group minimal important difference; use it to ask whether individuals improved meaningfully, not as a pass/fail test.",
  transition: "“Even a good average can mislead.”",
  src: ["swaEvidence", "tubach", "cochranePemf", "chenPemf", "yangPemf", "oarsi", "lundh"],
}, "Source: Swayogya evidence page (company-reported; not peer-reviewed). Threshold: Tubach et al., Ann Rheum Dis 2005");

// ---------------------------------------------------------------- 14
add(14, {
  title: "An average can hide a patient",
  purpose: "Show, with an independent published case, why subgroup performance matters.",
  say: "Sjoding and colleagues (NEJM 2020), University of Michigan cohort: when the pulse oximeter read 92–96%, arterial oxygen saturation was below 88% in 11.7% of paired measurements for Black patients versus 3.6% for White patients — nearly three times as often. The unit is paired measurements; race was recorded, not skin pigmentation measured; it was observational. It does not justify a race-based correction — it shows that a device that looked accurate on average missed dangerous low oxygen more often in one group.\nRegulators responded: the US FDA’s January 2025 draft guidance asks for clinical testing across a diverse range of skin tones, assessed on the Monk Skin Tone scale.",
  ask: "“Who is missing from our data?” Take two answers for each case.",
  debrief: "Ramesh: people using walking aids; cognitive fluctuation; crowded homes and floor-level living; clothing such as saris or dhotis over the sensor; public datasets with few or no Indian participants.\nKamala: women, people with obesity, manual and agricultural workers, people with other illnesses, rural users.\nThe MRCT Center’s diversity guidance defines diversity broadly — including comorbidities, concurrent medicines and environment — and asks for subgroup reporting. Stanford Biodesign’s JEDI brief asks teams to consider equity at every stage.",
  transition: "“Now the people: consent and conflicts.”",
  src: ["sjoding", "fdaOximeter", "mrctDiversity", "sbJedi"],
}, "Source: Sjoding et al., NEJM 2020 (paired measurements, SpO₂ 92–96%; observational; recorded race)");

// ---------------------------------------------------------------- 15
add(15, {
  title: "Would you proceed? Ramesh’s neurologist is also the inventor",
  activity: "DECISION 2 of 4: vote, then 60-second role-play (patient, recruiter, observer)",
  purpose: "Practise consent when there is a dependent relationship, a language barrier and a request to film.",
  say: "Read the facts: Ramesh asks, “Will saying no change my care?”; the consent form is in English only; the clinic wants to film him for a talk.\n“A: recruit as planned. B: proceed with safeguards — which ones? C: not yet.”",
  ask: "Vote. Then one participant plays Ramesh, one the recruiting neurologist, and one observes for 60 seconds. The observer reports one thing that would make refusal easier.",
  debrief: "• Dependent relationship: the Declaration of Helsinki (2024, para 27) says that when a potential participant is in a dependent relationship with the physician, consent must be sought by an appropriately qualified individual independent of that relationship. State plainly that refusal will not change care.\n• Disclose the inventor’s interest to the ethics committee and in the consent conversation (ICMR 2017; CIOMS Guideline 25); use an independent outcome assessor.\n• Language and understanding: ICMR 2017 requires consent in a language the participant understands, with an impartial witness if the participant cannot read. Put key information first (the US Common Rule’s ‘key information’ requirement is a useful model) and use teach-back; the MRCT Clinical Research Glossary helps explain ‘investigational’ and ‘sham’.\n• Therapeutic misconception (Appelbaum): participants may assume research procedures are care chosen for them; say clearly what is uncertain.\n• Filming: separate, specific and revocable consent for recordings used in teaching or publicity, in writing for public media (the UK GMC’s guidance is a good comparator); gait videos usually identify people, so anonymisation rarely suffices; never make filming a condition of care or of study entry.\nGood answers: B with these safeguards, or C until the consent process is fixed.",
  caution: "Fictional vignette; it does not describe either project’s actual consent procedure.",
  transition: "“Disclosure is only the start.”",
  src: ["helsinki", "icmr", "cioms", "commonRule", "mrctGlossary", "appelbaum", "gmc"],
}, "Hypothetical vignette. Sources: Declaration of Helsinki (2024) para 27; ICMR National Ethical Guidelines (2017); GMC recordings guidance (comparator)");

// ---------------------------------------------------------------- 16
add(16, {
  title: "Disclosure starts the work; management finishes it",
  purpose: "Move from declaring conflicts to managing them.",
  say: "Interests: equity or royalties; grants and institutional reputation; personal reputation.\nRisks: pressure to enrol dependent patients; optimistic reading of outcomes; selective reporting of positive results. A Cochrane methodology review found that manufacturer-sponsored drug and device studies report favourable conclusions more often than other studies (RR 1.34).\nSafeguards: independent consent and outcome assessment; prospective CTRI registration with pre-specified outcomes; publication of all results, including null and negative ones, with a plain-language summary to participants.",
  debrief: "Cambridge’s spinout guidance advises founders to be clear about when they are working for the company and when for research. Harvard Medical School’s 2010 policy moved from disclosure to limits (for example, no industry speakers’ bureaus). The US publishes industry payments to physicians (Open Payments); the UK Cumberlege Review recommended a register of doctors’ financial interests.\nIn India the rules are split: the Uniform Code for Marketing Practices in Medical Devices (2024, amended 2026) is a voluntary code for companies; the IMC 2002 professional conduct regulations (clause 6.8) apply to doctors, because the NMC’s 2023 regulations have been in abeyance since August 2023; ICMR 2017 requires COI disclosure to ethics committees. None removes the need for project-level management.",
  ask: "“Which safeguard is cheapest to add today?” (Usually CTRI registration and naming an independent assessor.)",
  transition: "“Next: which Indian permission answers which question?”",
  src: ["lundh", "sbChao", "sbGsbCoi", "camSpinout", "hmsCoi", "openPayments", "cumberlege", "ucmpmd", "imc2002", "nmcAbeyance", "icmr", "mrctResults"],
}, "Sources: Lundh et al., Cochrane 2017; Stanford GSB case OIT105; Cambridge spinout guidance (2024); UCMPMD 2024; IMC 2002 cl. 6.8");

// ---------------------------------------------------------------- 17
add(17, {
  title: "Each permission answers a different question",
  activity: "“Where is Ramesh’s device on this path today?”",
  purpose: "Give a practical map of the Indian route, anchored in a real project.",
  say: "Test licence: application in Form MD-12, licence in MD-13 (Central Licensing Authority) — make small quantities for test, evaluation, clinical investigation, demonstration or training; not for sale.\nClinical investigation of an investigational device: application in Form MD-22 (Rule 51) with Seventh Schedule documents (clinical investigation plan, investigator’s brochure, risk management, verification and validation, informed consent form, insurance); permission in MD-23 (Rule 52); an ethics committee registered with CDSCO; CTRI registration before the first participant.\nManufacturing licence for sale: Class A/B from the State Licensing Authority (MD-3 → MD-5); Class C/D from the Central Licensing Authority (MD-7 → MD-9); quality management system under the Fifth Schedule (aligned with ISO 13485).\nPost-market: complaint handling, periodic safety update reports (reported as six-monthly for two years, then annually for two), adverse-event and recall duties, and reporting to MvPI. Software follows CDSCO’s Medical Device Software guidance (21 July 2026).\nFoGO today: MD-13 test licence for 25 units (10 August 2026, for evaluation with AIIMS Bhubaneswar and AMTZ), after IEC 60601-1-2 EMC pre-compliance testing (July 2026). Next: an MD-22 application, ethics approval and CTRI registration.",
  debrief: "International comparison: in the US the sponsor proposes, and the IRB decides, whether a device study is significant or non-significant risk (FDA is the final arbiter); significant-risk studies need an investigational device exemption (21 CFR 812), followed by 510(k), De Novo or PMA. In the EU, notified-body CE marking is followed by post-market clinical follow-up under MDR 2017/745; transition deadlines run to 2027–2028 and a targeted revision proposed in December 2025 is under negotiation. Clinical investigations worldwide follow ISO 14155, now in its 2026 edition. Rules differ; the ethical duties do not.\nA licence is not proof of benefit: among 157 US cardiovascular devices with Class I recalls (2013–2022), only 19.1% had any premarket clinical testing (Kadakia et al. 2024).\nRule 51(2) waives the clinical-investigation fee for government-run or government-funded institutions. MoHFW proposed amendments to MDR-2017 in August 2026 to simplify compliance; check their status before the talk.",
  caution: "Simplified overview; device class, study purpose and specific exemptions determine the route. The academic clinical-study exemption applies only to licensed devices with ethics approval and data not used for marketing submissions. FoGO’s ‘Class B (proposed)’ is the developer’s proposal.",
  transition: "“Permission does not mean people can use it.”",
  src: ["mdr", "md12", "md22", "mdrPath", "ndct", "mdsw", "cdscoPms", "fogoDeck", "cfr812", "euMdr", "euProposal", "iso14155", "kadakia"],
}, "Sources: Medical Devices Rules 2017; CDSCO Forms MD-12, MD-22; CDSCO software guidance (2026); FoGO project material. Comparison: 21 CFR 812; EU MDR 2017/745");

// ---------------------------------------------------------------- 18
add(18, {
  title: "Who can’t use it? Audit the demands",
  activity: "Inclusive-design audit: pick one demand to redesign",
  purpose: "Make usability and exclusion an ethical question, not only a design question.",
  say: "The Cambridge Engineering Design Centre’s Inclusive Design Toolkit rates the demands a product makes on seven capabilities: vision, hearing, thinking, communication, locomotion, reach and stretch, and dexterity. Its Exclusion Calculator estimates how many people cannot complete the tasks.\nOn the slide the ratings are illustrative. FoGO asks a person with Parkinson’s to bend and strap an ankle module, stick on a chest patch and pair a phone — high demands on reach, dexterity and thinking. SwaKnee asks an older person with knee osteoarthritis to position an applicator, connect a controller and time a 45-minute session.\nThe FoGO team’s 30+ conversations with patients, caregivers and doctors produced the same request: more comfort and easier use.",
  india: "Add Indian demands the toolkit does not list: language (Odia, Hindi, English), literacy, unreliable power, shared or no smartphone, and dependence on a caregiver. The Exclusion Calculator uses UK population data from 1996–97, so its percentages must not be presented as Indian figures. The MRCT Center’s Accessibility by Design toolkit (2023) adds practical study adaptations: home visits, travel support and accessible consent formats. Usability engineering under IEC 62366-1 turns these into testable requirements.",
  ask: "“Which one demand would you redesign first?” A quick classroom version of the Cambridge simulation tools: try fastening a strap wearing thick gloves.",
  transition: "“And then there is cost.”",
  src: ["camIdt", "mrctAbd", "iec62366", "cam4g9", "fogoDeck"],
}, "Method: Cambridge Engineering Design Centre, Inclusive Design Toolkit. Ratings illustrative. India additions: workshop adaptation");

// ---------------------------------------------------------------- 19
add(19, {
  title: "The price tag is only part of the cost",
  purpose: "Widen affordability from purchase price to the total cost of use.",
  say: "Walk Kamala’s 45 days: buy or rent the device; travel 30 km for fitting and training; about 34 hours of sessions; a family member’s time and lost wages; repairs and support. “Who pays for each step?” For home-use devices this is usually the household, out of pocket.\nIndian precedent: on 16 August 2017 the National Pharmaceutical Pricing Authority capped knee-implant prices; the average price of the widely used cobalt-chromium primary knee fell from ₹1,58,324 to ₹54,720 (65%). The cap has been extended repeatedly, most recently to 15 November 2026. Coronary stents were capped on 13 February 2017 (₹7,260 bare-metal, ₹29,600 drug-eluting). In July 2021 NPPA capped trade margins on five home-use devices (pulse oximeters, BP monitors, nebulisers, digital thermometers, glucometers); 91% of 684 brands cut their MRP, by up to 88%. Home devices are within the reach of price policy. Close with: “Affordability is an ethical design input, not an afterthought.”",
  debrief: "Cambridge Judge Business School’s Centre for Health Leadership and Enterprise describes progress in three phases: develop technologies, integrate them into care at scale, and make proven solutions affordable and widely available. The Harvard Business School Aravind case shows affordability built in through local manufacture (Aurolab lenses) with quality systems. FoGO’s plan targets ₹27,000 plus a ₹3–4,000 annual service plan — a planned price, not a market result.\nResponsible options for an adjunct with modest evidence: rental rather than purchase; clinic-shared devices; a trial period with refund if not tolerated; a transparent statement of the total cost of a course.",
  caution: "Price caps are a trade-off: manufacturers sought to withdraw some premium stents (refused), and observers feared hospitals would shift costs to other charges — a reported concern, not a measured effect. SwaKnee is not an implant and is not covered by the knee-implant cap. Check NPPA for any extension after 15 November 2026.",
  transition: "“Now a commercial decision.”",
  src: ["nppaKnee", "nppaKneeExt", "nppaStent", "nppaTmr", "stentWithdraw", "camCchle", "hbsAravind", "fogoDeck"],
}, "Sources: PIB/NPPA knee-implant order (16 Aug 2017); NPPA trade-margin cap (Jul 2021); Cambridge Judge CCHLE. Journey steps illustrative");

// ---------------------------------------------------------------- 20
add(20, {
  title: "Would you proceed? Launch with this brochure",
  activity: "DECISION 3 of 4: vote, then rewrite one claim",
  purpose: "Practise responsible commercialisation under real pressure.",
  say: "Read the hypothetical brochure: “Clinically proven! Regrows cartilage. Doctor recommended. Avoid surgery forever.” The distributor wants these claims; investors want launch this quarter.\n“A: launch as written. B: launch with claims matched to the evidence. C: not yet.”",
  ask: "Vote. Then ask each table to rewrite one claim in 30 seconds.",
  debrief: "• “Clinically proven” needs independent, controlled replication; one company study is not enough, and guideline bodies are sceptical of PEMF (OARSI 2019).\n• “Regrows cartilage” was not measured, and no human evidence of regeneration was found.\n• “Doctor recommended” implies an endorsement and raises conflict-of-interest questions for the company (marketing code) and the doctor (professional conduct rules).\n• “Avoid surgery forever” is an absolute promise no evidence supports.\nThe Uniform Code for Marketing Practices in Medical Devices (2024, as amended 30 April 2026) requires product information to be accurate, balanced, not misleading and capable of substantiation, and bars gifts and hospitality to healthcare professionals; it is a voluntary code run through industry associations. The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 lists ‘rheumatism’ among conditions for which cure claims may not be advertised — take legal advice on how it applies to device claims. The ASCI Code requires truthful, substantiated claims.\nA better line: “In a company study of 82 adults over 45 days, average pain fell more with SwaKnee than with comparison care. Independent trials are needed to confirm this.”\nStanford’s Principled Decision-Making brief: write the team’s values down before the pressure arrives.",
  caution: "The brochure is hypothetical and does not reproduce any actual SwaKnee material. Check any of your own live web or print claims against this standard before the talk.",
  transition: "“The last decision comes after launch.”",
  src: ["ucmpmd", "dmra", "oarsi", "sbPrincipled", "swaEvidence"],
}, "Hypothetical brochure. Sources: Uniform Code for Marketing Practices in Medical Devices (2024, amended 2026); Drugs and Magic Remedies Act 1954");

// ---------------------------------------------------------------- 21
add(21, {
  title: "Would you proceed? Push tonight’s FoGO update",
  activity: "DECISION 4 of 4",
  purpose: "Show that evidence belongs to a version, and changes need governance.",
  say: "Read the facts: the new detection threshold gives fewer false cues, may miss more freezes, and has been tested on stored data only.\n“A: push to all users tonight. B: staged release after review, with monitoring and rollback. C: not yet.”\nThe screenshot is the real prototype app: the cue was ‘debounced’ — confirmed in two of three windows — before it fired. Changing that rule changes the device’s behaviour.",
  debrief: "A threshold trades sensitivity against specificity: fewer nuisance cues can mean more missed freezes. Evidence for version 1 may not cover version 2.\nCDSCO’s Medical Device Software guidance (21 July 2026) expects lifecycle documentation, version control, validation and documented change management, and says an Algorithm Change Protocol may be devised where applicable — the guidance describes itself as interpreting the Rules, not adding a new control. The US FDA’s predetermined change control plan (PCCP) guidance for AI-enabled device software (December 2024) lets manufacturers pre-specify modifications with a validation protocol and impact assessment — it is not a blank cheque.\nIf the device is in a study: notify the ethics committee, seek an amendment, and re-consent if the change could affect a participant’s decision.\nA good release: shadow mode first; a small staged group; pre-set monitoring metrics and a rollback trigger; tell users and clinicians what changed. Who can pause or reverse the release? Name them.",
  caution: "Hypothetical update; not a report of an actual FoGO release.",
  transition: "“And if, despite all this, someone is harmed?”",
  src: ["mdsw", "mdswDraft", "pccp", "pfSystem", "kellmeyer", "fogoDeck"],
}, "Hypothetical update. Sources: CDSCO Medical Device Software guidance (2026); US FDA PCCP guidance (Dec 2024)");

// ---------------------------------------------------------------- 22
add(22, {
  title: "When harm happens, someone must answer",
  activity: "Assign an owner to each step of the loop",
  purpose: "Make post-market responsibility concrete.",
  say: "Follow a report around the loop. Care: meet the person’s immediate needs. Record: device identity, serial number, software version, context. Report: to the Materiovigilance Programme of India using the Medical Device Adverse Event Reporting Form (helpline 1800-180-3024; mvpi-ipc@gov.in) and through the manufacturer’s statutory channels; in a study, to the sponsor and ethics committee. Investigate: root cause and context. Correct: corrective and preventive action, labelling, software fix or recall. Follow up: the person, and whether the correction worked.\nIndian case: DePuy recalled its ASR metal-on-metal hip systems worldwide in August 2010. About 4,700 ASR surgeries had been done in India (2004–2010). A Health Ministry expert committee chaired by Dr Arun K Agarwal reported on 19 February 2018; by August 2018 only 1,080 patients had been traced. The compensation formula — a ₹20 lakh base adjusted for disability and age — was approved only on 29 November 2018. Traceability and registries matter from day one.",
  debrief: "MvPI was launched on 6 July 2015 at the Indian Pharmacopoeia Commission, Ghaziabad; manufacturers, importers, distributors, healthcare professionals and patients can report. Kramer and colleagues (PLoS Medicine 2013) found that post-market systems in the US, EU, Japan and China rely mainly on passive reporting, so under-reporting is likely: build reporting into the product (serial numbers, an in-app ‘report a problem’ button, a phone line). The UK Cumberlege Review (2020) recommended a Patient Safety Commissioner, redress and device registries.\nAvoid a blanket instruction to stop a needed device; safety decisions need clinical assessment and continuity of care.",
  ask: "“Who in your team owns each of the six steps?”",
  transition: "End with: “Who will still answer the phone after the sale?”",
  src: ["mvpiIpc", "mvpiForm", "asrCommittee", "asrFormula", "kramer2013", "cumberlege", "mdr"],
}, "Sources: MvPI (IPC); ASR: MoHFW expert committee report as reported (2018), PIB compensation formula (29 Nov 2018); Kramer et al. 2013");

// ---------------------------------------------------------------- 23
add(23, {
  title: "Would you let a patient use it now? (closing vote)",
  activity: "CLOSING VOTE with the same options as slide 3",
  purpose: "Let the room see its own change in reasoning.",
  say: "“Same three facts, same three options. Before you vote, answer four questions silently: which patient, which use, which evidence, and who is responsible?”",
  ask: "Vote and compare with the opening split on the flipchart. Ask two people whose vote changed: “What changed your mind?”",
  debrief: "Reveal: “The three facts on slide 3 describe FoGO in August 2026 — an alpha prototype, public-dataset results and an MD-13 test licence for 25 units. My own answer, as the inventor, is option 2 only after ethics approval, MD-23 permission and CTRI registration: a supervised research study, not routine care.” Disclosing this models the behaviour we asked for on slide 2.\nThe goal is better reasons, not agreement with the speaker. Delaying use to resolve important uncertainty is different from blocking useful research: safeguards should be proportionate to the exact use and risk. Access and continuity remain part of the decision.\n“A patient-ready decision names the patient, the purpose, the evidence, the limits and the person responsible.”",
  transition: "“Now make it personal.”",
  src: ["fogoDeck", "md12", "md22"],
}, "Compare with the opening vote");

// ---------------------------------------------------------------- 24
add(24, {
  title: "Commit to one change in your own project",
  activity: "TAKEAWAY EXERCISE: 90 seconds writing, 60 seconds sharing",
  purpose: "Convert discussion into one specific, owned action.",
  say: "“Think of a device, study or project you are working on. Complete the card: Before [next step], I will [action]. Owner: [name]. I proceed only if [condition].”\nExample: “Before our first home test, I will register the study on CTRI. Owner: me. I proceed only if the ethics committee approves and an independent outcome assessor is named.”",
  ask: "Read it to a neighbour. Take two examples from the room.",
  debrief: "This mirrors Stanford’s Principled Decision-Making advice to write commitments down before pressure arrives. Encourage participants to photograph or keep their card; the printable checklist handout has space for it.",
  transition: "“Here is a checklist to keep using.”",
  src: ["sbPrincipled"],
}, "Adapted from Stanford Biodesign, Principled Decision-Making (2022)");

// ---------------------------------------------------------------- 25
add(25, {
  title: "Patient-impact decision checklist",
  activity: "Reusable tool and printed handout",
  purpose: "Leave participants with a tool they can apply to any device decision.",
  say: "Use one row per stage. The evidence column should link to real documents; the owner column names a person or team; every ‘Not yet’ needs an owner and a condition for proceeding.\nRow sources: Need — Stanford need statements. Evidence — IDEAL-D and subgroup reporting (MRCT). People — Declaration of Helsinki 2024, ICMR 2017, conflict-of-interest management. Permission — MDR-2017 and CDSCO’s 2026 software guidance. Access — Cambridge inclusive design, total cost of use, NPPA context. Safety — MvPI reporting, ISO 14971 risk management, change control.",
  caution: "A workshop synthesis, not a substitute for ethics, scientific, regulatory or quality review. One device can meet the conditions for a narrowly defined use and remain unsuitable for another.",
  transition: "Close: thank the audience; point to the appendix and the handout.",
  src: ["sbNeed", "idealD", "mrctDiversity", "helsinki", "icmr", "mdr", "mdsw", "camIdt", "mvpiIpc", "iso14971"],
}, "Workshop synthesis — not a regulatory checklist. Copy, adapt and reuse");

// ---------------------------------------------------------------- 26
add(26, {
  title: "Evidence to request before stronger claims",
  purpose: "Back-pocket slide for Q&A on what each project should show next.",
  say: "FoGO: freeze detection against video-annotated events; participant-level validation; false alarms per hour and latency in real use; cue versus no-cue (or sham) comparison; falls, confidence and walking outcomes; testing in homes, turns and doorways; firmware and model version for every result.\nSwaKnee: a randomised, blinded, sham-controlled design with prospective registration; pain and function compared with patient-important thresholds; adverse events; adherence to 45-minute sessions; durability; structural outcomes only if structural claims are made; the controller and applicator version for every result.",
  src: ["fogoDeck", "swaEvidence", "idealD", "tubach"],
}, "Prompts for evidence review; not a description of completed work");

// ---------------------------------------------------------------- 27
add(27, {
  title: "What independent evidence says",
  purpose: "Back-pocket slide: the independent literature around each case, for Q&A.",
  say: "FoGO domain: the Daphnet benchmark has 10 laboratory patients (8 froze); systematic reviews report sensitivity of 73–100% and specificity of 67–100%, mostly in laboratories; cueing reviews (Ginis 2018) and the RESCUE trial (n = 153) show modest gait gains, but no trial found here showed fewer falls; FoGO’s own results are project-reported on public datasets, with a prospective study planned.\nSwaKnee domain: the Cochrane review (2013; 9 trials, 636 adults, all osteoarthritis sites and electromagnetic field types) found pain probably improves by about 15/100 more than sham, with function uncertain; knee-specific meta-analyses disagree (Chen 2019 found no pain advantage; Yang 2020 found one); OARSI 2019 strongly recommends against electromagnetic therapy; NICE NG226 (2022) advises against several electrotherapies for insufficient evidence; no human evidence of cartilage regeneration was found.",
  caution: "‘Not found’ in our searches is not proof of absence. NICE NG226’s list does not name PEMF explicitly.",
  src: ["daphnet", "silvaDeLima", "pardoel", "ginis", "rescue", "fogoDeck", "cochranePemf", "chenPemf", "yangPemf", "markovicPemf", "oarsi", "nice226", "tubach"],
}, "Sources: Daphnet (2010); Silva de Lima (2017); Ginis (2018); Cochrane (2013); Chen (2019); Yang (2020); OARSI (2019)");

// ---------------------------------------------------------------- appendix reference pages
function pageItems(keys) {
  return keys.map((k) => {
    const r = R[k];
    if (!r) { MISSING.add(k); return { label: k, url: "", detail: "" }; }
    const detail = r.brief || (r.cite.length > 235 ? r.cite.slice(0, r.cite.lastIndexOf(" ", 228)) + " …" : r.cite);
    return { label: r.short, url: r.url, detail };
  });
}
function paged(title, keys, footer, max = 12) {
  const pages = [];
  const per = Math.ceil(keys.length / Math.ceil(keys.length / max)); // balance items across pages
  for (let i = 0; i < keys.length; i += per) {
    const part = Math.floor(i / per) + 1, total = Math.ceil(keys.length / per);
    pages.push({ title: total > 1 ? `${title} (${part}/${total})` : title, rowH: 0.8, footer, items: pageItems(keys.slice(i, i + per)) });
  }
  return pages;
}
const REFS = [
  ...paged("Teaching materials: Stanford Biodesign and Harvard", ["sbProcess", "sbNeed", "sbPrincipled", "sbJedi", "sbChao", "sbGsbCoi", "sbIndia", "sbChaturvedi", "sbTextbook", "hmsBioethics", "mrctDiversity", "mrctAbd", "mrctGlossary", "mrctPostTrial", "mrctResults", "pfHome", "pfSystem", "pfWearables", "pfRemote", "hmsCoi", "catalyst", "hbsAravind", "kramer2013"], "Click a title to open the source. No institution listed has evaluated or endorsed FoGO or SwaKnee."),
  ...paged("Teaching materials: Cambridge, and evaluation frameworks", ["camIdt", "camEbc", "camCebc", "cam4g9", "camIbi", "camCchle", "camCoi", "camSpinout", "camClarkson", "ideal", "idealD", "kellmeyer"], "Engineering Better Care was published by RAEng, AMS and RCP; IDEAL is Oxford-led."),
  ...paged("India: regulation, ethics, pricing and safety", ["mdr", "md12", "md22", "mdrPath", "mdsw", "mdswDraft", "ndct", "icmr", "cdscoPms", "mvpiIpc", "mvpiForm", "dpdpRules", "ucmpmd", "imc2002", "nmcAbeyance", "dmra", "nppaStent", "nppaKnee", "nppaKneeExt", "nppaTmr", "stentWithdraw", "asrCommittee", "asrFormula", "palOA", "gbdIndiaNeuro"], "Checked October 2026. Verify current amendments and extensions before use."),
  ...paged("Ethics and international comparison", ["helsinki", "cioms", "iom", "lundh", "appelbaum", "johnsonRogers", "wexler", "gmc", "commonRule", "cfr812", "pccp", "fdaOximeter", "euMdr", "euProposal", "cumberlege", "openPayments", "iso14971", "iso14155", "iec62366", "kadakia"], "International sources are comparators; Indian law and guidance govern practice in India."),
  ...paged("Case evidence, media and status labels", ["sjoding", "daphnet", "pardoel", "silvaDeLima", "ginis", "rescue", "cochranePemf", "chenPemf", "yangPemf", "markovicPemf", "oarsi", "nice226", "tubach", "fogoDeck", "swaLeaflet", "swaEvidence", "swaMedia"], "Status labels: Demonstrated · Reported, preliminary · Planned · Not established."),
];

module.exports = { NOTES, SOURCE_LINE, REFS, MISSING, CLOCK, NOTE_DATA };
