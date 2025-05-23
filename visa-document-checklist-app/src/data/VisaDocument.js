export const visaDocumentData = {
    usa: {
      tourist: [
        "Valid passport (at least 6 months validity)",
        "Completed DS-160 confirmation page",
        "Passport-sized photograph (5x5cm, white background)",
        "Proof of financial means (bank statements, salary slips)",
        "Travel itinerary (hotel bookings, flight reservations)",
        "Proof of ties to home country (property deeds, family documents)",
        "Optional: Invitation letter (if visiting family/friends)",
      ],
      student: [
        "Valid passport (at least 6 months validity)",
        "Form I-20 from the educational institution",
        "Completed DS-160 confirmation page",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, scholarship letter)",
        "SEVIS fee payment receipt",
        "Academic records (transcripts, diplomas)",
        "Proof of ties to home country",
      ],
      work: [
        "Valid passport (at least 6 months validity)",
        "Approved I-129 petition (for H-1B)",
        "Completed DS-160 confirmation page",
        "Passport-sized photograph",
        "Job offer letter from US employer",
        "Proof of qualifications (degrees, certifications)",
        "Proof of financial means",
        "Optional: Employment contract",
      ],
    },
    uk: {
      tourist: [
        "Valid passport",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial means (bank statements, salary slips)",
        "Travel itinerary (flight bookings, accommodation details)",
        "Proof of ties to home country (family documents, property ownership)",
        "Optional: Invitation letter from UK sponsor",
      ],
      student: [
        "Valid passport",
        "Confirmation of Acceptance for Studies (CAS)",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, loan letter)",
        "Academic records (transcripts, certificates)",
        "English language proficiency (IELTS, TOEFL)",
        "Tuberculosis test results (if applicable)",
      ],
      work: [
        "Valid passport",
        "Certificate of Sponsorship (CoS)",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial means",
        "Job offer letter from UK employer",
        "Proof of qualifications (degrees, certifications)",
        "English language proficiency (if required)",
      ],
    },
    canada: {
      tourist: [
        "Valid passport",
        "Completed visitor visa application (or eTA for eligible countries)",
        "Passport-sized photograph",
        "Proof of financial means (bank statements)",
        "Travel itinerary (flight bookings, hotel reservations)",
        "Proof of ties to home country",
        "Optional: Invitation letter",
      ],
      student: [
        "Valid passport",
        "Letter of Acceptance from a Designated Learning Institution (DLI)",
        "Completed study permit application",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, GIC)",
        "Academic records (transcripts, diplomas)",
        "Proof of ties to home country",
        "Optional: CAQ (for Quebec)",
      ],
      work: [
        "Valid passport",
        "Labour Market Impact Assessment (LMIA) or job offer",
        "Completed work permit application",
        "Passport-sized photograph",
        "Proof of qualifications (degrees, work experience)",
        "Proof of financial means",
        "Job offer letter from Canadian employer",
        "Optional: Medical exam results",
      ],
    },
    australia: {
      tourist: [
        "Valid passport",
        "Completed eVisitor (subclass 651) or ETA application",
        "Passport-sized photograph",
        "Proof of financial means (bank statements)",
        "Travel itinerary (flight bookings, accommodation)",
        "Proof of ties to home country",
        "Optional: Invitation letter",
      ],
      student: [
        "Valid passport",
        "Confirmation of Enrolment (CoE)",
        "Completed student visa (subclass 500) application",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, savings)",
        "Overseas Student Health Cover (OSHC)",
        "Academic records (transcripts, certificates)",
        "English language proficiency (IELTS, TOEFL)",
      ],
      work: [
        "Valid passport",
        "Completed TSS visa (subclass 482) application",
        "Passport-sized photograph",
        "Job offer letter from Australian employer",
        "Proof of qualifications (degrees, certifications)",
        "Proof of work experience",
        "Proof of financial means",
        "Optional: Skills assessment",
      ],
    },
    schengen: {
      tourist: [
        "Valid passport (at least 3 months validity beyond stay)",
        "Completed Schengen visa application form",
        "Two passport-sized photographs",
        "Travel medical insurance (minimum €30,000 coverage)",
        "Proof of financial means (bank statements, sponsorship letter)",
        "Travel itinerary (flight reservations, hotel bookings)",
        "Proof of accommodation (hotel bookings, host invitation)",
        "Proof of ties to home country",
      ],
      student: [
        "Valid passport (at least 3 months validity beyond stay)",
        "Admission letter from educational institution",
        "Completed Schengen visa application form",
        "Two passport-sized photographs",
        "Travel medical insurance (minimum €30,000 coverage)",
        "Proof of financial support (bank statements, scholarship)",
        "Academic records (transcripts, diplomas)",
        "Proof of accommodation",
      ],
      work: [
        "Valid passport (at least 3 months validity beyond stay)",
        "Job offer letter from employer",
        "Completed Schengen visa application form",
        "Two passport-sized photographs",
        "Travel medical insurance (minimum €30,000 coverage)",
        "Proof of qualifications (degrees, certifications)",
        "Proof of financial means",
        "Employment contract",
      ],
    },
    japan: {
      tourist: [
        "Valid passport",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial means (bank statements)",
        "Travel itinerary (flight bookings, hotel reservations)",
        "Proof of ties to home country",
        "Optional: Invitation letter",
      ],
      student: [
        "Valid passport",
        "Certificate of Eligibility (CoE)",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, scholarship)",
        "Admission letter from Japanese institution",
        "Academic records (transcripts, diplomas)",
        "Proof of ties to home country",
      ],
      work: [
        "Valid passport",
        "Certificate of Eligibility (CoE)",
        "Completed visa application form",
        "Passport-sized photograph",
        "Job offer letter from Japanese employer",
        "Proof of qualifications (degrees, certifications)",
        "Proof of work experience",
        "Employment contract",
      ],
    },
    india: {
      tourist: [
        "Valid passport (at least 6 months validity)",
        "Completed e-Visa or visa application form",
        "Passport-sized photograph",
        "Proof of financial means (bank statements)",
        "Travel itinerary (flight bookings, hotel reservations)",
        "Proof of ties to home country",
        "Optional: Invitation letter",
      ],
      student: [
        "Valid passport (at least 6 months validity)",
        "Admission letter from recognized Indian institution",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, scholarship)",
        "Academic records (transcripts, diplomas)",
        "No Objection Certificate (NOC) from institution",
        "Proof of ties to home country",
      ],
      work: [
        "Valid passport (at least 6 months validity)",
        "Completed visa application form",
        "Passport-sized photograph",
        "Job offer letter from Indian employer",
        "Proof of qualifications (degrees, certifications)",
        "Proof of work experience",
        "Employment contract",
        "Proof of financial means",
      ],
    },
    germany: {
      tourist: [
        "Valid passport (at least 3 months validity beyond stay)",
        "Completed Schengen visa application form",
        "Two passport-sized photographs",
        "Travel medical insurance (minimum €30,000 coverage)",
        "Proof of financial means (bank statements)",
        "Travel itinerary (flight reservations, hotel bookings)",
        "Proof of accommodation",
        "Proof of ties to home country",
      ],
      student: [
        "Valid passport (at least 3 months validity beyond stay)",
        "Admission letter from German university",
        "Completed visa application form",
        "Two passport-sized photographs",
        "Proof of financial support (€11,208/year in blocked account)",
        "Academic records (transcripts, diplomas)",
        "Health insurance coverage",
        "Proof of accommodation",
      ],
      work: [
        "Valid passport (at least 3 months validity beyond stay)",
        "Job offer letter from German employer",
        "Completed visa application form",
        "Two passport-sized photographs",
        "Proof of qualifications (degrees, certifications)",
        "Proof of work experience",
        "Employment contract",
        "Health insurance coverage",
      ],
    },
    turkey: {
      tourist: [
        "Valid passport (at least 6 months validity)",
        "Completed e-Visa or visa application form",
        "Passport-sized photograph",
        "Proof of financial means (bank statements)",
        "Travel itinerary (flight bookings, hotel reservations)",
        "Proof of accommodation",
        "Optional: Invitation letter",
      ],
      student: [
        "Valid passport (at least 6 months validity)",
        "Acceptance letter from Turkish institution",
        "Completed visa application form",
        "Passport-sized photograph",
        "Proof of financial support (bank statements, scholarship)",
        "Academic records (transcripts, diplomas)",
        "Health insurance coverage",
        "Proof of accommodation",
      ],
      work: [
        "Valid passport (at least 6 months validity)",
        "Work permit approval from Turkish employer",
        "Completed visa application form",
        "Passport-sized photograph",
        "Job offer letter from Turkish employer",
        "Proof of qualifications (degrees, certifications)",
        "Employment contract",
        "Health insurance coverage",
      ],
    },france: {
        tourist: [
          "Valid passport (at least 3 months validity beyond stay)",
          "Completed Schengen visa application form",
          "Two passport-sized photographs",
          "Travel medical insurance (minimum €30,000 coverage)",
          "Proof of financial means (bank statements, at least €65/day)",
          "Travel itinerary (flight reservations, hotel bookings)",
          "Proof of accommodation (hotel bookings, host invitation)",
          "Proof of ties to home country",
        ],
        student: [
          "Valid passport (at least 3 months validity beyond stay)",
          "Admission letter from French educational institution",
          "Completed Schengen visa application form",
          "Two passport-sized photographs",
          "Proof of financial support (€7,400/year or sponsor letter)",
          "Academic records (transcripts, diplomas)",
          "Health insurance coverage",
          "Proof of accommodation",
        ],
        work: [
          "Valid passport (at least 3 months validity beyond stay)",
          "Job offer letter from French employer",
          "Completed visa application form",
          "Two passport-sized photographs",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract approved by French labor authorities",
          "Proof of financial means",
          "Health insurance coverage",
        ],
      },
      china: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed visa application form (Form V.2013)",
          "Passport-sized photograph",
          "Proof of financial means (bank statements)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of ties to home country",
          "Optional: Invitation letter from Chinese host or travel agency",
          "Note: Visa-free entry for up to 30 days for citizens of 59 countries (e.g., Japan, France, Canada) for Hainan Province only, if booked through a travel agency",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Admission notice from Chinese university",
          "Completed visa application form",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, scholarship letter)",
          "Academic records (transcripts, diplomas)",
          "Health certificate (medical examination report)",
          "JW201 or JW202 form (issued by Chinese authorities)",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Work permit issued by Chinese authorities",
          "Completed visa application form",
          "Passport-sized photograph",
          "Job offer letter from Chinese employer",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Health certificate (medical examination report)",
        ],
      },
      brazil: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed visa application form (e-Visa for eligible countries)",
          "Passport-sized photograph",
          "Proof of financial means (bank statements or credit card)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of ties to home country",
          "Optional: Invitation letter from Brazilian host",
          "Note: Visa-free entry for up to 90 days for citizens of many countries (e.g., USA, Canada, Australia, Japan)",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Acceptance letter from Brazilian educational institution",
          "Completed visa application form",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, scholarship)",
          "Academic records (transcripts, diplomas)",
          "Health insurance coverage",
          "Police clearance certificate",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Work permit approved by Brazilian Ministry of Labor",
          "Completed visa application form",
          "Passport-sized photograph",
          "Job offer letter from Brazilian employer",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Police clearance certificate",
        ],
      },
      south_africa: {
        tourist: [
          "Valid passport (at least 30 days validity beyond stay)",
          "Completed visa application form (DHA-84)",
          "Two passport-sized photographs",
          "Proof of financial means (bank statements, at least $50/day)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of accommodation",
          "Yellow fever certificate (if traveling from affected areas)",
          "Proof of ties to home country",
        ],
        student: [
          "Valid passport (at least 30 days validity beyond stay)",
          "Acceptance letter from South African institution",
          "Completed visa application form",
          "Two passport-sized photographs",
          "Proof of financial support (bank statements, scholarship)",
          "Academic records (transcripts, diplomas)",
          "Medical and radiological reports",
          "Health insurance coverage",
        ],
        work: [
          "Valid passport (at least 30 days validity beyond stay)",
          "Job offer letter from South African employer",
          "Completed visa application form",
          "Two passport-sized photographs",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Medical and radiological reports",
          "Proof of registration with South African professional body (if applicable)",
        ],
      },
      new_zealand: {
        tourist: [
          "Valid passport (at least 3 months validity beyond stay)",
          "Completed NZeTA (New Zealand Electronic Travel Authority) for eligible countries",
          "Passport-sized photograph",
          "Proof of financial means (NZ$1,000/month or NZ$400/month if accommodation prepaid)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of ties to home country",
          "Optional: Invitation letter",
        ],
        student: [
          "Valid passport (at least 3 months validity beyond stay)",
          "Offer of Place from New Zealand institution",
          "Completed student visa application",
          "Passport-sized photograph",
          "Proof of financial support (NZ$15,000/year or sponsor letter)",
          "Academic records (transcripts, diplomas)",
          "Health insurance coverage",
          "Medical certificate (if stay exceeds 12 months)",
        ],
        work: [
          "Valid passport (at least 3 months validity beyond stay)",
          "Job offer letter from New Zealand employer",
          "Completed work visa application",
          "Passport-sized photograph",
          "Proof of qualifications (degrees, certifications)",
          "Proof of work experience",
          "Employment contract",
          "Medical certificate (if stay exceeds 12 months)",
        ],
      },russia: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed visa application form",
          "Passport-sized photograph",
          "Tourist voucher and confirmation from Russian travel agency or hotel",
          "Proof of financial means (bank statements)",
          "Travel medical insurance (covering Russia)",
          "Proof of ties to home country",
          "Note: Visa-free entry for up to 90 days for citizens of certain countries (e.g., Argentina, Brazil)",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Invitation letter from Russian educational institution",
          "Completed visa application form",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, scholarship letter)",
          "Academic records (transcripts, diplomas)",
          "HIV test certificate (for stays over 90 days)",
          "Medical insurance valid in Russia",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Work permit issued by Russian authorities",
          "Completed visa application form",
          "Passport-sized photograph",
          "Job offer letter from Russian employer",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "HIV test certificate (for stays over 90 days)",
        ],
      },
      thailand: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed visa application form (or visa on arrival for eligible countries)",
          "Passport-sized photograph",
          "Proof of financial means (10,000 THB per person or 20,000 THB per family)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of accommodation",
          "Note: Visa-free entry for up to 60 days for citizens of many countries (e.g., USA, UK, Canada, Australia)",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Acceptance letter from Thai educational institution",
          "Completed visa application form (Non-Immigrant ED visa)",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, scholarship)",
          "Academic records (transcripts, diplomas)",
          "Proof of accommodation in Thailand",
          "Medical certificate (if required by institution)",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Work permit issued by Thai Ministry of Labor",
          "Completed visa application form (Non-Immigrant B visa)",
          "Passport-sized photograph",
          "Job offer letter from Thai employer",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Medical certificate (for certain professions)",
        ],
      },
      mexico: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed visa application form (if required; many countries visa-free)",
          "Passport-sized photograph",
          "Proof of financial means (bank statements or credit card)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of ties to home country",
          "Note: Visa-free entry for up to 180 days for citizens of many countries (e.g., USA, Canada, EU, Japan)",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Acceptance letter from Mexican educational institution",
          "Completed visa application form",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, scholarship)",
          "Academic records (transcripts, diplomas)",
          "Proof of accommodation in Mexico",
          "Health insurance coverage",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Work permit approved by Mexican National Institute of Migration",
          "Completed visa application form",
          "Passport-sized photograph",
          "Job offer letter from Mexican employer",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Proof of financial means",
        ],
      },
      south_korea: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed visa application form (or K-ETA for eligible countries)",
          "Passport-sized photograph",
          "Proof of financial means (bank statements)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of ties to home country",
          "Note: Visa-free entry for up to 90 days for citizens of many countries (e.g., USA, Canada, EU, Australia)",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Certificate of Admission from South Korean institution",
          "Completed visa application form (D-2 visa)",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, scholarship)",
          "Academic records (transcripts, diplomas)",
          "Health certificate (tuberculosis test for some nationalities)",
          "Proof of accommodation",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Job offer letter from South Korean employer",
          "Completed visa application form (e.g., E-7 visa for professionals)",
          "Passport-sized photograph",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Proof of work experience",
          "Health certificate (if required)",
        ],
      },
      uae: {
        tourist: [
          "Valid passport (at least 6 months validity)",
          "Completed e-Visa application (or visa on arrival for eligible countries)",
          "Passport-sized photograph",
          "Proof of financial means (bank statements or credit card)",
          "Travel itinerary (flight bookings, hotel reservations)",
          "Proof of accommodation",
          "Note: Visa-free entry for up to 90 days for citizens of many countries (e.g., USA, UK, EU, Canada)",
        ],
        student: [
          "Valid passport (at least 6 months validity)",
          "Acceptance letter from UAE educational institution",
          "Completed visa application form",
          "Passport-sized photograph",
          "Proof of financial support (bank statements, sponsor letter)",
          "Academic records (transcripts, diplomas)",
          "Health insurance coverage",
          "Medical fitness certificate (issued in UAE)",
        ],
        work: [
          "Valid passport (at least 6 months validity)",
          "Work permit approved by UAE Ministry of Human Resources",
          "Completed visa application form",
          "Passport-sized photograph",
          "Job offer letter from UAE employer",
          "Proof of qualifications (degrees, certifications)",
          "Employment contract",
          "Medical fitness certificate (issued in UAE)",
        ],
      },
  };