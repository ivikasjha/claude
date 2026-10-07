# Prior research notes (session 1): Indian regulatory pathway sources with URLs

#################### Indian regulatory and ethics pathway for medical devices (CDSCO / MDR-2017, ICMR, MvPI, NM
- [cdsco-mdsw-2026] Guidance Document on Medical Device Software under the Medical Devices Rules, 2017 (Doc No. CDSCO/MD/GD/MDSW/01/2026) | Central Drugs Standard Control Organisation (CDSCO), Medical Devices Division, MoHFW | 2026 | https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/Guidance-document-on-Medical-Device-Software-under-MDR-2017.pdf | guidance | search-confirmed
    * The final guidance exists on the official CDSCO site. It also appeared at a cdsco.mohfw.gov.in mirror of the same path.
    * Secondary sources (Mondaq, NatLawReview, LexOrbis, AsiaActual, Operon) consistently report a CDSCO circular of 21 July 2026 that released the final document, numbered CDSCO/MD/GD/MDSW/01/2026.
    * It revises a draft published in October 2025, after stakeholder comments.
    * Scope covers Software as a Medical Device (SaMD), Software in a Medical Device (SiMD) and IVD software. AI, IoT, digital therapeutics and advanced analytics are included when the intended purpose is medical.
    * Expectations include a QMS proportionate to software risk class and lifecycle technical documentation: architecture, requirements, design, version control, release management, V&V, cybersecurity and clinical evaluation where applicable.
    * Reported newer expectations include usability validation for Indian clinical workflows, risk management for cybersecurity and AI bias, a Software Bill of Materials (SBOM), and predetermined or documented change-management protocols.
    * This is guidance that interprets the D&C Act 1940 and MDR-2017. It does not replace the statutory rules.
    IN: Directly applies to FoGO, whose phone app and detection algorithm generate cues for a medical purpose. Intended-use wording ('detects freezing of gait and cues the patient') puts it in medical-device territory. 'Wellness' labelling cannot be used to sidestep this.
- [mdsw-secondary] CDSCO publishes guidance on Medical Device Software under MDR-2017 (secondary legal analyses) | Mondaq; National Law Review; LexOrbis; Deccan Herald; AsiaActual; MedDeviceGuide | 2026 | https://natlawreview.com/article/code-compliance-decoding-indias-medical-device-software-guidance | news | search-confirmed
    * Corroborates the 21 July 2026 release date and the document number.
    * Corroborates the October 2025 draft that preceded the final version.
    * Other URLs seen: https://www.mondaq.com/india/healthcare/1826286/cdsco-publishes-guidance-on-medical-device-software-under-mdr-2017 ; https://www.lexorbis.com/cdsco-issues-guidance-on-medical-device-software-under-the-medical-devices-rules-2017/ ; https://www.deccanherald.com/health/healthcare/explained-cdscos-updated-medical-device-software-guidance-heres-everything-that-has-changed-4082957 ; https://asiaactual.com/blog/india-medical-device-software-guidance/
    IN: Use only as corroboration. Cite the CDSCO PDF itself on the slide.
- [mdr-2017-text] Medical Devices Rules, 2017 (G.S.R. 78(E), 31 January 2017; in force 1 January 2018), consolidated text on the CDSCO site | Ministry of Health and Family Welfare / CDSCO | 2017 (consolidated copy uploaded 2022) | https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2022/m_device/mdr,%202017%20(1).pdf | regulation | search-confirmed
    * Classification is risk-based: Class A (low), B (low-moderate), C (moderate-high), D (high). Confirmed via secondary snippets that summarise the Rules.
    * Manufacturing licences for sale or distribution: Class A/B are granted by the State Licensing Authority. Class C/D, and import licences for all classes, are granted by the Central Licensing Authority (DCGI/CDSCO).
    * Manufacturing QMS follows the Fifth Schedule, aligned with ISO 13485. NABCB-accredited Notified Bodies audit Class A/B manufacturers.
    * Defines an 'academic clinical study' as a study for academic purposes on a device for an approved or new intended use, new material, improved design or new population.
    * Rule 50 refers to the ethics committee for clinical investigation.
    * Rule 51(2): government-run or government-funded organisations, institutes and hospitals pay no fee for clinical-investigation applications.
    * The G.S.R. number and commencement date come from memory and were not re-verified in this session.
    IN: This is the core statute for both case studies. FoGO is an investigational, unlicensed system. SwaKnee is said to be commercialised, so it needs an appropriate manufacturing licence for its class. Verify its actual licence status before stating it.
    Q: Class C (moderate high risk), and Class D (high risk)
- [cdsco-form-md12] Form MD-12: Application for licence to manufacture medical devices for clinical investigations, test, evaluation, examination, demonstration or training (and MD-13 test licence) | CDSCO | 2017 | https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/medical-device/12MD.pdf | regulation | search-confirmed
    * MD-12 is the application to the Central Licensing Authority. The licence is granted in Form MD-13.
    * It permits manufacture of small quantities of Class A to D devices for clinical investigation, test, evaluation, demonstration or training.
    * Devices made under a test licence cannot be sold commercially.
    * The checklist requires a justification of quantity, test protocols and applicable standards (secondary sources: Operon Strategist, Corpbiz).
    IN: Relevant to FoGO prototypes built for the planned BIRAC-funded proof-of-concept. A test licence is not marketing authorisation and not clinical-investigation permission.
    Q: cannot be sold commercially on the Indian market under any circumstances
- [cdsco-form-md22] Form MD-22 (application for permission to conduct clinical investigation) with CDSCO checklist; permission granted in Form MD-23 | CDSCO | 2017 | https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/medical-device/22MD.pdf | regulation | search-confirmed
    * Clinical investigation of an investigational device needs Central Licensing Authority permission. The application is MD-22 with Seventh Schedule documents, and the permission is MD-23.
    * The checklist (https://www.cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/medical-device/ChecklisFormMD-22MD.pdf) asks for: design verification and validation data; Essential Principles checklist; electrical, mechanical, reliability and software V&V; risk management report; biocompatibility and animal data; labelling; sponsor-investigator agreement; insurance; AE reporting forms; Investigator's Brochure; Clinical Investigation Plan; CRF; Informed Consent Form.
    * MDR-2017 distinguishes pilot investigations (exploratory or first-in-human) from pivotal (confirmatory) ones. One secondary snippet garbled these definitions, so check the wording in the Rules.
    IN: FoGO's planned prospective proof-of-concept would probably fall here unless CDSCO or a regulatory adviser confirms an exemption. The checklist works as a readiness audit for academic inventors.
- [cdsco-regulatory-overview] Regulatory pathway under MDR-2017 (CDSCO overview document) | CDSCO | n.d. (post-2017) | https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/medical-device/RegulatoryMDR-2017.pdf | guidance | search-confirmed
    * Official CDSCO overview of the MDR-2017 forms and pathways. It appeared in results for both MD-12/13 and MD-22/23 queries.
    * Its contents were not read in detail in this session because WebFetch is blocked.
    IN: Best official single-page reference to point students to.
- [ikigai-ci] De-coding the Clinical Investigation process under the Medical Device Rules, 2017 | Ikigai Law | c. 2019-2020 | https://www.ikigailaw.com/article/188/de-coding-the-clinical-investigation-process-under-the-medical-device-rules-2017 | other | search-confirmed
    * New medical devices without a predicate generally need clinical investigation before approval. Low-risk Class A devices are exempt from this requirement.
    * Rule 51(2) waives the fee for government-run or government-funded institutions.
    IN: KIIT and similar institutions should check whether they qualify for fee waivers. Private universities may not.
    Q: no fee is payable by any organization, institute, or hospital
- [nishith-mdr] Analysis of Medical Devices Rules, 2017 | Nishith Desai Associates | 2017 | https://nishithdesai.com/Content/document/pdf/ResearchPapers/Analysis-of-Medical-Devices-Rules-2017.pdf | other | search-confirmed
    * Secondary legal summary of the A to D classes and the SLA/CLA split in licensing authority.
    * Notes the ISO 13485-aligned QMS and the role of notified bodies for Class A/B.
    * Other secondary sources seen: https://azbpartners.com/bank/medical-devices-rules-2017 ; https://business.medicaldialogues.in/ministry-of-health-notifies-medical-device-rules-2017-here-are-5-major-takeaways
    IN: Use as background only. Cite the Rules themselves on slides.
- [mvpi-ipc] Materiovigilance Programme of India (MvPI): launch, structure and reporting | Indian Pharmacopoeia Commission (NCC-MvPI), MoHFW; SCTIMST (National Collaborating Centre); NHSRC | 2015 (launch); IPC PvPI/MvPI newsletter 2026 | https://nhsrcindia.org/hi/node/10346 | guidance | search-confirmed
    * MoHFW approved MvPI to monitor the safety and quality of medical devices used in India.
    * The DCGI formally launched it at IPC Ghaziabad on 6 July 2015.
    * IPC is the National Coordination Centre. SCTIMST, Thiruvananthapuram, is a National Collaborating Centre.
    * It aims to promote and evaluate adverse-event reports and to monitor trends.
    * Supporting URLs: https://thieme-connect.com/products/ejournals/abstract/10.1055/a-1195-1945 (peer-reviewed article on MvPI) ; https://ipc.gov.in/images/pvpi/PvPI-Newsletter-Vol.-16-Issue-1-2026-January-to-March-2026.pdf (IPC newsletter, Jan-Mar 2026).
    * The specific name and fields of the reporting form ('Medical Device Adverse Event Reporting Form') and the helpline or email were not confirmed in this session.
    IN: Any clinician, patient or manufacturer can report. For SwaKnee, burns, skin reactions, pain flare or device malfunction should be reportable. For FoGO, missed freezing episodes and falls should be reportable. Licensing-authority reporting under licence conditions is a separate, parallel duty.
    Q: formally launched at the Indian Pharmacopeia Commission (IPC), Ghaziabad
- [mdr-amend-aug2026] Centre moves to simplify medical device regulations (proposed amendments to MDR-2017) | Current-affairs digests (SuperKalam; Raman Academy) reporting MoHFW proposal | 2026 (25 August 2026) | https://superkalam.com/current-affairs/25-08-2026/centre-moves-to-simplify-medical-device-regulations-pg12-f79c8d1e-567e-4a77-b96e-931a5a57f99e | news | search-confirmed
    * Around 25 August 2026, MoHFW proposed amendments to MDR-2017.
    * The stated aim is to balance public-health safety with ease of doing business, remove procedural redundancies, align with global benchmarks, cut compliance costs and speed patient access.
    * The specific provisions, the draft G.S.R. number and whether the amendments have been finalised were NOT confirmed.
    * Second URL: https://ramanacademy.in/daily-current-affairs/25-august-2026
    IN: Live example of the 'speed vs safety' tension, which suits a discussion prompt.
    Q: strike a pragmatic balance between public health safety and Ease of Doing Business
- [emergo-india-2024] India Medical Device Regulatory Whitepaper | Emergo by UL | 2024 | https://www.emergobyul.com/sites/default/files/2024-07/RLC24CS1578348-India-Medical-Device-Whitepaper.pdf | other | search-confirmed
    * Industry overview of the Indian device pathway as of mid-2024.
    * Contents were not read in detail because fetch is blocked.
    IN: Background reading for students.
- [ndct-2019] New Drugs and Clinical Trials Rules, 2019 (copy hosted by RGCB) | MoHFW (G.S.R. 227(E), 19 March 2019) | 2019 | https://rgcb.res.in/documents/New drugs and clinical trial rules 2019.pdf | regulation | search-confirmed
    * The URL appeared in a search result. It is an institutional copy, not the official Gazette.
    * From memory, not re-verified: NDCT Rules Chapter III requires ethics committees for clinical trials to register with the CLA (Form CT-01, registration CT-02). Ethics committees for biomedical and health research register with the authority under the Department of Health Research. Registration lasts 5 years. NDCT also sets compensation for trial injury or death.
    * From memory: MDR-2017 originally referred to ethics committees registered under Rule 122DD of the Drugs and Cosmetics Rules, a role now taken over by NDCT registration. Confirm the exact cross-reference.
    IN: A device clinical investigation needs review by a CDSCO-registered ethics committee. Non-regulatory academic research needs a DHR-registered committee (NECRBHR/Naitik). Check whether KIIT's ethics committee holds either registration.
- [icmr-neg-2017] National Ethical Guidelines for Biomedical and Health Research Involving Human Participants | Indian Council of Medical Research (ICMR) | 2017 |  | guidance | memory-unverified
    * The 12 general principles include essentiality, voluntariness, non-exploitation, social responsibility, privacy and confidentiality, risk minimisation, professional competence, maximisation of benefit, institutional arrangements, transparency and accountability, totality of responsibility, and environmental protection.
    * Structure from memory: Sec 2 general ethical issues (benefit-risk, compensation for research-related harm, ancillary care, conflict of interest, post-trial access); Sec 4 ethical review; Sec 5 informed consent; Sec 6 vulnerability; Sec 7 clinical trials of drugs and other interventions, with a sub-section on medical devices; Sec 11 biological materials and datasets.
    * Conflicts of interest must be disclosed to the ethics committee and participants, and managed.
    * People with cognitive impairment or older people may be vulnerable. LAR consent and assent apply.
    * The ethics committee, not the investigator, decides exemption or expedited review.
    * URL not search-confirmed. The presenter's original deck cites ethics.ncdirindia.org/asset/pdf/ICMR_National_Ethical_Guidelines.pdf.
    IN: Use as the ethical backbone for consent, conflicts of interest and vulnerability, especially Parkinson's patients with fluctuating cognition in FoGO.
- [icmr-ai-2023] Ethical Guidelines for Application of Artificial Intelligence in Biomedical Research and Healthcare | ICMR (with DHR) | 2023 |  | guidance | memory-unverified
    * Released around March 2023. Its 10 principles: autonomy; safety and risk minimisation; trustworthiness; data privacy; accountability and liability; optimisation of data quality; accessibility, equity and inclusiveness; collaboration; non-discrimination and fairness; validity.
    * It stresses human oversight, bias assessment, external validation and an ethics-committee role for AI studies.
    IN: FoGO's algorithm was trained or tested on public, mostly non-Indian datasets. Raise generalisability and bias concerns (gait, footwear, floor surfaces, sari or dhoti clothing).
- [nmdp-2023] National Medical Devices Policy, 2023 | Department of Pharmaceuticals, Government of India (Union Cabinet approval) | 2023 |  | regulation | memory-unverified
    * Approved by the Union Cabinet on about 26 April 2023.
    * It aims to grow the sector from about USD 11 billion to USD 50 billion by 2030.
    * Six strategies: regulatory streamlining, enabling infrastructure, R&D and innovation, investment, human resources, and brand positioning and awareness.
    IN: Frames the national push for indigenous devices like FoGO and SwaKnee. Contrast industrial growth goals with patient-safety duties.
- [dpdp-2023-2025] Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025 | Ministry of Electronics and IT (MeitY) | 2023 / 2025 |  | regulation | memory-unverified
    * The Act received assent on 11 August 2023. The Rules were notified in about mid-November 2025, with phased commencement: Board provisions immediately, consent managers in about 12 months, most data-fiduciary duties in about 18 months (around May 2027).
    * Obligations include notice and consent, purpose limitation, reasonable security safeguards, breach notification to the Board and affected people, verifiable parental consent for children's data, and erasure when the purpose is served.
    * There is a research and statistical exemption if data are not used for decisions about specific individuals and Rule standards are met.
    * The Act has no separate 'sensitive health data' category. The older IT (SPDI) Rules 2011 did class medical records as sensitive.
    * Which provisions are in force as of October 2026 was NOT confirmed.
    IN: FoGO's phone app collects continuous gait and possibly location data. Teach consent, data minimisation, retention and breach readiness as design requirements now, even before the full commencement date.
- [ctri] Clinical Trials Registry - India (CTRI), ICMR-NIMS | ICMR National Institute of Medical Statistics | 2007 (launch); mandatory for regulatory trials since 15 June 2009 |  | guidance | memory-unverified
    * Prospective registration before enrolling the first participant is expected for CDSCO-regulated trials and investigations. ICMR guidelines also expect it for other interventional research.
    * From memory: MDR-2017 clinical-investigation permission conditions require CTRI registration before enrolment. The exact clause was not confirmed.
    IN: Ask whether SwaKnee's comparative study (n=40 vs n=42) was registered on CTRI. Registration status affects how much weight the evidence deserves.
- [cdsco-licensing-timeline] Notifications bringing all medical devices under regulation (S.O. 648(E) and G.S.R. 102(E), 11 Feb 2020) and phased mandatory licensing | MoHFW / CDSCO | 2020-2023 |  | regulation | memory-unverified
    * From 1 April 2020, all devices intended for medical use were notified as 'drugs' under the D&C Act and brought within MDR-2017, with an initial registration phase on the online portal.
    * Licensing became mandatory for Class A/B from 1 October 2022 and for Class C/D from 1 October 2023.
    * Later changes (2024-2026) may have moved some Class A non-sterile, non-measuring devices to a registration-only route. Not confirmed.
    IN: Before 2022-23, many Indian devices reached the market without device-specific licences. Students should know this is a recent regime.
- [ucmpmd-2024] Uniform Code for Marketing Practices in Medical Devices (UCMPMD), 2024 | Department of Pharmaceuticals, Government of India | 2024 |  | guidance | memory-unverified
    * Notified in about September 2024. It restricts gifts, travel and hospitality for healthcare professionals, regulates samples and promotional claims, and sets complaint mechanisms through industry associations.
    * Its legal enforceability is debated (it is a code, not a statute).
    IN: Directly relevant to responsible commercialisation of SwaKnee: claims in leaflets, incentives to orthopaedists or physiotherapists, and inventor-clinician conflicts of interest.
- [nppa-devices] NPPA price regulation of medical devices (DPCO 2013): coronary stents (Feb 2017) and knee implants (Aug 2017) price caps; MRP monitoring of notified devices | National Pharmaceutical Pricing Authority (NPPA), Department of Pharmaceuticals | 2017 onward |  | regulation | memory-unverified
    * Coronary stent ceiling prices were fixed in February 2017. Orthopaedic knee-implant ceiling prices were fixed in August 2017 (widely reported as reductions of about 65-70%).
    * Under DPCO paragraph 20, NPPA monitors devices that are notified as drugs (non-scheduled), limiting annual MRP increases to about 10%.
    IN: Affordability lens for SwaKnee (knee OA). The knee-implant price cap shows that the state will step in on device pricing. SwaKnee is not an implant, so it is not under that cap.
- [nih-ide] IDE Exemption Criteria and Study Risk Determination | NIH Clinical Center, Office of Research Compliance | n.d. | https://www.cc.nih.gov/orcs/ide/exemption-criteria-study-risk-determination | guidance | search-confirmed
    * The US comparator is 21 CFR 812. Investigational device studies are sorted into exempt, non-significant risk (IRB oversight only) or significant risk (FDA IDE required).
    * The 21 CFR 812 specifics come from memory. The page appeared in search but was not read.
    IN: India has no formal NSR/SR split delegated to ethics committees. CDSCO permission (MD-22/23) is the default for investigational devices. This is a useful contrast slide.
- [uk-eu-2026] UK draft Medical Devices (Amendment) Regulations 2026 (MHRA) and European Commission proposal to simplify EU MDR/IVDR | Hogan Lovells; Latham & Watkins; Crowell & Moring (law-firm summaries) | 2025-2026 | https://www.hoganlovells.com/en/publications/uk-medical-devices-reform-mhra-publishes | news | search-confirmed
    * In about May 2026 the MHRA published draft 2026 amendment regulations to modernise pre-market requirements.
    * The European Commission has proposed simplifying the EU MDR/IVDR.
    * EU URL: https://www.crowell.com/en/insights/client-alerts/european-commission-proposes-simplifying-the-rules-on-eu-medical-and-in-vitro-diagnostic-devices
    * Shows a global 2025-26 trend toward 'simplification', parallel to India's August 2026 proposal.
    IN: A selective comparison: regulators worldwide are rebalancing speed and safety at the same time.
FACTS:
  - MDR-2017 has four risk classes: A (low), B (low-moderate), C (moderate-high), D (high). ['mdr-2017-text', 'nishith-mdr'] high
  - The State Licensing Authority grants manufacturing licences for Class A/B devices. The Central Licensing Authority (CDSCO/DCGI) grants them for Class C/D and grants import licences for all classes. ['mdr-2017-text', 'nishith-mdr'] high
  - Manufacturing licence forms are MD-3 (application) and MD-5 (licence) for Class A/B, and MD-7 (application) and MD-9 (licence) for Class C/D. Loan-licence variants are MD-4/MD-6 and MD-8/MD-10. ['mdr-2017-text'] medium
  - A test licence to manufacture small quantities for clinical investigation, test, evaluation, demonstration or training is applied for to the CLA in Form MD-12 and granted in Form MD-13. Such devices cannot be sold. ['cdsco-form-md12'] high
  - Permission for clinical investigation of an investigational medical device is applied for to the CLA in Form MD-22 (with Seventh Schedule documents) and granted in Form MD-23. ['cdsco-form-md22', 'cdsco-regulatory-overview'] high
  - Clinical performance evaluation of a new IVD uses Form MD-24 (application) and MD-25 (permission). Import licences use MD-14 (application) and MD-15 (licence). Permission for a new device without a predicate uses MD-26/MD-27 (import) and MD-28/MD-29 (manufacture). ['mdr-2017-text'] medium
  - Rule 51(2) of MDR-2017 waives the clinical-investigation application fee for organisations, institutes or hospitals run or funded by Central or State Government. ['ikigai-ci'] high
  - MDR-2017 defines an 'academic clinical study'. There is a conditional academic exemption from CLA permission, as the presenter's original deck states for Rule 51(3). It applies to studies on already-licensed devices, with ethics-committee approval, where the data are not used for regulatory or marketing submissions. The exact sub-rule number and conditions were not confirmed in this session. ['mdr-2017-text'] low
  - New devices without a predicate generally need clinical investigation before approval. Class A devices are exempt from this requirement. ['ikigai-ci'] medium
  - The Fifth Schedule QMS is aligned with ISO 13485. NABCB-accredited Notified Bodies audit Class A/B manufacturing sites. ['mdr-2017-text', 'nishith-mdr'] high
  - All medical devices were brought under regulation from 1 April 2020 (S.O. 648(E), 11 Feb 2020). Licensing became mandatory for Class A/B from 1 October 2022 and for Class C/D from 1 October 2023. ['cdsco-licensing-timeline'] medium
  - On 21 July 2026, CDSCO issued the final Guidance Document on Medical Device Software under MDR-2017 (Doc No. CDSCO/MD/GD/MDSW/01/2026), replacing an October 2025 draft. It covers SaMD, SiMD, IVD software, AI, IoT and digital therapeutics. ['cdsco-mdsw-2026', 'mdsw-secondary'] high
  - The 2026 MDSW guidance expects QMS proportionate to risk class and lifecycle technical documentation. Expectations include cybersecurity, an SBOM, AI-bias risk management, usability validation in Indian clinical workflows and documented change management. ['cdsco-mdsw-2026', 'mdsw-secondary'] medium
  - MvPI was launched at IPC Ghaziabad by the DCGI on 6 July 2015. IPC is the National Coordination Centre and SCTIMST, Thiruvananthapuram, is a National Collaborating Centre. ['mvpi-ipc'] high
  - In late August 2026, MoHFW proposed amendments to MDR-2017 to ease compliance and align with global benchmarks. Their content and status (draft vs final) are unconfirmed. ['mdr-amend-aug2026'] low
  - Clinical-investigation ethics committees must be registered with the CLA under NDCT Rules 2019 (Form CT-01/CT-02). Registration is valid for 5 years. ['ndct-2019'] medium
  - ICMR's 2017 National Ethical Guidelines contain sections on informed consent, vulnerability, conflicts of interest and compensation for research-related harm. Section 7 covers clinical trials, including medical devices. ['icmr-neg-2017'] medium
  - ICMR's 2023 AI ethics guidelines set out 10 principles, including autonomy, safety, data privacy, accountability, data quality, equity, non-discrimination and validity. ['icmr-ai-2023'] medium
  - The Union Cabinet approved the National Medical Devices Policy 2023 in April 2023, targeting a USD 50 billion sector by 2030 through six strategies. ['nmdp-2023'] medium
  - The DPDP Act 2023 was enacted in August 2023. The DPDP Rules 2025 were notified in November 2025, with most fiduciary obligations phased in over about 18 months. ['dpdp-2023-2025'] medium
  - NPPA capped coronary stent prices in February 2017 and knee-implant prices in August 2017 under DPCO 2013. ['nppa-devices'] medium
  - In the US, 21 CFR 812 lets an IRB classify a device study as non-significant risk (IRB oversight only) or significant risk (FDA IDE needed). India relies on CLA permission (MD-22/23) as the default. ['nih-ide'] medium
CAUTIONS:
  ! Searching stopped early. The shared WebSearch budget (200 per turn across all agents) and the Consensus monthly quota both ran out after 11 searches. Every memory-unverified item (ICMR 2017 sections, ICMR AI 2023, NMDP 2023, DPDP Rules dates, CTRI clause, NPPA caps, licensing timeline, MD-24/25, MD-14/15, MD-26 to 29, PSUR schedule, compensation rule numbers) should be re-verified before a rule number or date is printed on a slide. The user can send a follow-up message to continue searching.
  ! Rule 51(3) academic exemption: the sub-rule number and exact conditions were NOT confirmed here. Do not say 'academic research is exempt' in general. As understood, any exemption covers only studies of already-licensed devices for academic purposes, with registered ethics-committee approval and no use of the data for regulatory or marketing claims. FoGO is an unlicensed new device and almost certainly does not qualify.
  ! Do NOT state FoGO's or SwaKnee's device class (A to D) as fact. Classification depends on intended use, claims and CDSCO's published class lists and risk rules (and, for FoGO's software, the July 2026 MDSW guidance). Frame it as 'likely B or C; to be confirmed with CDSCO or a regulatory adviser'.
  ! Do NOT imply SwaKnee holds a CDSCO manufacturing licence, CE marking or FDA clearance unless the presenter shows documents. The n=40 vs n=42 study is company-reported. Unless confirmed, say that registration (CTRI), ethics approval, blinding, randomisation, sham control and peer review are unverified. A VAS reduction of ~32% vs ~14% is not evidence of disease modification.
  ! Do NOT describe FoGO as clinically validated. Its prospective proof-of-concept is planned (BIRAC BIG). Results so far come only from public datasets. Prototypes for a clinical study likely need an MD-13 test licence, MD-23 permission (unless CDSCO confirms an exemption), registered ethics-committee approval and CTRI registration before enrolment.
  ! PSUR and adverse-event timelines: from memory, MDR-2017 requires new devices to file PSURs every 6 months for 2 years, then annually for 2 more years, and licence holders to report serious adverse events and recalls to the licensing authority within set timeframes (often cited as 15 days). Neither the schedule nor the rule numbers were confirmed here. Present them as 'per MDR-2017 licence conditions; check current text'.
  ! The MvPI reporting form name, its current version, the helpline and email, and whether reporting is voluntary or mandatory for each actor were not confirmed. For clinicians and patients MvPI is a voluntary pharmacovigilance-style programme. Manufacturers' statutory duty to report to the licensing authority is separate.
  ! The August 2026 MDR amendment is reported only by current-affairs digests and is probably a draft. Do not present it as in force or describe specific changes.
  ! The MDSW guidance date and document number come from multiple secondary sources plus the CDSCO PDF's existence. The PDF itself was not opened because WebFetch is blocked. Present it as guidance interpreting MDR-2017, not a new legal requirement.
  ! DPDP: as of October 2026 many obligations under the Rules may not yet be in force (phased to around May 2027). Do not say 'DPDP fully applies now'. Say 'design for it now'. Health data is not a separate 'sensitive' category under DPDP.
  ! Classes A/B were not entirely 'unregulated' before 2022. A registration phase began in 2020, and some devices (e.g., stents, implants) were notified earlier. Avoid oversimplifying.
  ! Class A non-sterile, non-measuring devices may now be on a registration-only or exempt route following 2024-25 changes. This is unconfirmed, so don't state it.
  ! Ethics-committee registration: clinical investigations of devices need an ethics committee registered with CDSCO under NDCT Rules 2019. A committee registered only with DHR (Naitik/NECRBHR) may not be enough for a regulatory device investigation. Check KIIT's committee status.
  ! Avoid the garbled secondary definition saying a pilot investigation is 'conducted in a larger population'. In MDR-2017, pilot is exploratory or first-in-human and pivotal is confirmatory.
  ! Conflict of interest: the presenter is the inventor of both case-study devices. Disclose this at the start, separate demonstrated results from planned work, and avoid promotional framing. This matches ICMR 2017 and the spirit of UCMPMD 2024 (a code with debated enforceability).
  ! The URLs in the presenter's original deck (ethics.ncdirindia.org ICMR guideline PDF; ipc.gov.in MvPI resource-material page; the cdsco.gov.in 'Medical Devices Rules, 2017' PDF) did not appear in this session's searches. Before reuse, check that they still resolve. The CDSCO MDR PDF that did appear in search is at a different path (mdr,%202017%20(1).pdf).
IDEAS:
  > Infographic: the 'CDSCO pathway map'. Steps run: intended use (is it a device? the MDSW guidance applies to apps), then risk class A to D, then bench and V&V plus an MD-12/MD-13 test licence, then a registered ethics committee, CTRI and MD-22/MD-23, then a manufacturing licence (MD-3/MD-5 from the SLA for A/B; MD-7/MD-9 from the CLA for C/D; MD-26 to MD-29 for a new device), then post-market vigilance (MvPI, licensing-authority reporting, PSUR, recall, change control). Place FoGO and SwaKnee markers on it, with FoGO at the pre-clinical/PoC-planned stage.
  > 'Would you proceed?' dilemma 1 (FoGO): a neurologist colleague offers to try the FoGO prototype on 5 clinic patients next week, informally, before ethics approval, 'just to see'. Options are proceed, proceed with verbal consent only, or stop and get ethics committee approval, CTRI and regulatory advice. Debrief with ICMR consent and vulnerability guidance (Parkinson's, fluctuating cognition, fall risk) and the MD-13/MD-23 distinction.
  > 'Would you proceed?' dilemma 2 (SwaKnee): marketing wants the leaflet to say 'clinically proven 32% pain reduction'. The study is company-reported, possibly unregistered and unblinded. Debrief with the evidence ladder, UCMPMD 2024 claims rules and the duty to state limitations.
  > 'Would you proceed?' dilemma 3 (software update): an over-the-air FoGO algorithm update improves sensitivity but raises false cues. Can it be pushed to users? Debrief with the 2026 MDSW guidance on change management, version control and rollback, plus DPDP data duties.
  > Evidence ladder for devices: bench, then simulation or public dataset (FoGO today), then feasibility or first-in-human (FoGO planned), then registered comparative study (SwaKnee claims this rung; verify), then randomised sham-controlled trial, then post-market real-world surveillance (MvPI). Colour planned rungs differently from demonstrated ones.
  > Timeline strip: 2015 MvPI launched; 2017 MDR notified; 2018 in force; 2019 NDCT Rules; 2020 all devices notified; Oct 2022 A/B licensing; Apr 2023 National Medical Devices Policy; Aug 2023 DPDP Act; Oct 2023 C/D licensing; Mar 2023 ICMR AI guidelines; Sep 2024 UCMPMD; Oct 2025 draft MDSW guidance; Nov 2025 DPDP Rules; Jul 2026 final MDSW guidance; Aug 2026 proposed MDR amendments. Verify the memory-only dates before use.
  > International comparison triptych (one line each): India, CLA permission is the default for investigational devices; US, IRB SR/NSR determination plus FDA IDE; EU/UK, competent-authority notification with 2025-26 simplification proposals. Message: rules differ, but ethics duties do not.
  > Continuing-safety loop (risk map): a patient reports SwaKnee skin heating or a FoGO missed freeze leading to a fall. The report goes to the clinician, then MvPI (AMC/MDMC to IPC) and the manufacturer complaint system, then CAPA, labelling change or recall, then communication to users. Ask the audience who reports and within how long.
  > Closing checklist items drawn from this topic: intended use defined; class confirmed; test licence where needed; registered ethics committee approval; CTRI before first enrolment; MD-23 or a documented exemption; insurance and compensation arranged; consent proportionate to vulnerability; conflict-of-interest disclosure; DPDP-ready data plan; post-market vigilance and complaint system; claims match evidence; price and access plan (NPPA awareness).
  > Opening vote idea: 'Can a university team test its own unlicensed wearable on patients if the ethics committee approves?' Options are Yes, No, or It depends. Reveal: it usually also needs CDSCO permission (MD-22/23) plus a test licence.
STARTED research:intl
