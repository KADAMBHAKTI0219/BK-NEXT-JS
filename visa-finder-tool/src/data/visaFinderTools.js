export const VisaFinderTool = [
    {
      country: "United States",
      visas: [
        {
          type: "Student (F-1)",
          cost: 185, // Plus $350 SEVIS fee
          duration: "Duration of study program (1–4 years)",
          validity: "Until program end + 60-day grace period",
          notes: "Requires Form I-20 from accredited institution. Limited on-campus work (20 hours/week). Apply at U.S. Embassy/Consulate."
        },
        {
          type: "Work (H-2B Temporary Non-Agricultural)",
          cost: 190, // Plus employer fees
          duration: "Up to 1 year, extendable to 3 years",
          validity: "Tied to labor certification, max 3 years",
          notes: "Requires employer sponsorship and labor certification. Annual cap of 66,000 visas."
        },
        {
          type: "Tourist (B-2)",
          cost: 185,
          duration: "Up to 6 months per entry",
          validity: "Up to 10 years (multiple entries)",
          notes: "For tourism, visiting family, or medical treatment. No work allowed. DS-160 form required."
        },
        {
          type: "Transit (C-1)",
          cost: 185,
          duration: "Up to 29 days",
          validity: "Single entry, up to 29 days",
          notes: "For immediate transit to another country. Requires onward ticket. Not for layovers involving sightseeing."
        }
      ]
    },
    {
      country: "United Kingdom",
      visas: [
        {
          type: "Student (Tier 4/General Student Visa)",
          cost: 490, // Approx. £363
          duration: "Duration of course + 1–4 months post-study",
          validity: "Until course completion",
          notes: "Requires Confirmation of Acceptance for Studies (CAS). Immigration Health Surcharge (£776/year) applies. Limited work allowed."
        },
        {
          type: "Work (Skilled Worker Visa)",
          cost: 719, // Approx. £532, varies by duration
          duration: "Up to 5 years",
          validity: "Up to 5 years, extendable",
          notes: "Requires job offer with Certificate of Sponsorship. Minimum salary threshold applies."
        },
        {
          type: "Tourist (Standard Visitor Visa)",
          cost: 115, // Approx. £115
          duration: "Up to 6 months",
          validity: "Up to 6 months (single/multiple entries)",
          notes: "For tourism, visiting family, or business meetings. No work allowed. Apply online or at visa center."
        },
        {
          type: "Transit (Visitor in Transit)",
          cost: 70, // Approx. £70
          duration: "Up to 48 hours",
          validity: "Single entry, 48 hours",
          notes: "For passing through UK en route to another country. Requires onward ticket."
        }
      ]
    },
    {
      country: "Canada",
      visas: [
        {
          type: "Student (Study Permit)",
          cost: 150, // Approx. CAD 150
          duration: "Duration of study program + 90 days",
          validity: "Until program completion",
          notes: "Requires acceptance letter from Designated Learning Institution. Limited work (20 hours/week). Biometrics fee ($85) may apply."
        },
        {
          type: "Work (Temporary Foreign Worker Program)",
          cost: 155, // Approx. CAD 155
          duration: "Varies by job contract, up to 2 years",
          validity: "Tied to work permit duration",
          notes: "Requires Labour Market Impact Assessment (LMIA) and job offer. Employer-specific."
        },
        {
          type: "Tourist (Visitor Visa)",
          cost: 100, // Approx. CAD 100
          duration: "Up to 6 months",
          validity: "Up to 10 years (multiple entries)",
          notes: "For tourism or visiting family. No work allowed. eTA ($7) for visa-exempt nationalities."
        },
        {
          type: "Transit",
          cost: "Free for transit < 48 hours", // Free for transit <48 hours
          duration: "Up to 48 hours",
          validity: "Single entry",
          notes: "No visa needed for transit through Canada if staying in airport. Otherwise, visitor visa required."
        }
      ]
    },
    {
      country: "Australia",
      visas: [
        {
          type: "Student (Subclass 500)",
          cost: 475, // Approx. AUD 710
          duration: "Up to 5 years",
          validity: "Duration of course + 1–3 months",
          notes: "Requires Confirmation of Enrolment (CoE). Allows limited work (48 hours/fortnight). Health insurance mandatory."
        },
        {
          type: "Work (Temporary Skill Shortage Subclass 482)",
          cost: 1000, // Approx. AUD 1495
          duration: "Up to 4 years",
          validity: "Tied to job contract",
          notes: "Requires employer nomination and skills assessment. Short or medium-term streams."
        },
        {
          type: "Tourist (Visitor Subclass 600)",
          cost: 120, // Approx. AUD 190
          duration: "Up to 12 months",
          validity: "Up to 12 months (multiple entries)",
          notes: "For tourism or visiting family. No work allowed. Apply online or via agent."
        },
        {
          type: "Transit (Subclass 771)",
          cost: 0,
          duration: "Up to 72 hours",
          validity: "Single entry",
          notes: "For transit to another country. Requires onward ticket. Apply online."
        }
      ]
    },
    {
      country: "Schengen Area",
      visas: [
        {
          type: "Student (National Visa D)",
          cost: 80, // Approx. €75
          duration: "Duration of study program (1–4 years)",
          validity: "Tied to program duration",
          notes: "Varies by country (e.g., Germany, France). Requires university admission. Limited work allowed in some countries."
        },
        {
          type: "Work (National Visa D)",
          cost: 80, // Approx. €75
          duration: "Varies by contract, up to 4 years",
          validity: "Tied to contract",
          notes: "Requires job offer and approval. Rules vary (e.g., Germany’s Blue Card, France’s Talent Passport)."
        },
        {
          type: "Tourist (Schengen Visa C)",
          cost: 85, // Approx. €80
          duration: "Up to 90 days in 180-day period",
          validity: "Up to 5 years (multiple entries)",
          notes: "For tourism, business, or visiting family across 29 Schengen countries. No work allowed. Travel insurance required."
        },
        {
          type: "Transit (Airport Transit Visa A)",
          cost: 85, // Approx. €80
          duration: "24 hours",
          validity: "Single entry",
          notes: "For layovers in Schengen airports without leaving transit area. Required for certain nationalities."
        }
      ]
    },
    {
      country: "India",
      visas: [
        {
          type: "Student (e-Student Visa)",
          cost: 80, // Varies by nationality
          duration: "Duration of course, up to 5 years",
          validity: "Up to 5 years",
          notes: "Requires admission to recognized institution. Apply online 4–120 days before arrival. Biometrics at immigration."
        },
        {
          type: "Work (Employment Visa)",
          cost: 100, // Varies by nationality
          duration: "Up to 1 year, extendable",
          validity: "Up to 1 year",
          notes: "Requires job offer with minimum salary ($25,000/year). Apply at Indian Embassy/Consulate."
        },
        {
          type: "Tourist (e-Tourist Visa)",
          cost: 25, // $10–$25 for 30 days, $40–$80 for 1–5 years
          duration: "30 days or 180 days/year",
          validity: "30 days, 1 year, or 5 years",
          notes: "For tourism, yoga, or visiting family. Multiple entries for 1/5-year visas. Apply online 4 days prior."
        },
        {
          type: "Transit",
          cost: 20,
          duration: "Up to 72 hours",
          validity: "Single/double entry, 15 days",
          notes: "For layovers en route to another country. Requires onward ticket. Apply at Embassy."
        }
      ]
    },
    {
      country: "Japan",
      visas: [
        {
          type: "Student",
          cost: 30, // Approx. ¥3,000
          duration: "Up to 4 years",
          validity: "Tied to study program",
          notes: "Requires Certificate of Eligibility (CoE). Limited work (28 hours/week). Apply at Japanese Embassy."
        },
        {
          type: "Work (Highly Skilled Professional)",
          cost: 30, // Approx. ¥3,000
          duration: "Up to 5 years",
          validity: "Tied to job contract",
          notes: "Requires CoE and job offer. Points-based system for eligibility."
        },
        {
          type: "Tourist",
          cost: 0, // Visa-free for many nationalities
          duration: "Up to 90 days",
          validity: "Single entry",
          notes: "Visa-free for U.S., EU, etc. Otherwise, apply at Embassy. No work allowed."
        },
        {
          type: "Transit",
          cost: 0,
          duration: "Up to 72 hours",
          validity: "Single entry",
          notes: "Shore Pass for transit via cruise or airport. Requires onward ticket."
        }
      ]
    },
    {
      country: "United Arab Emirates",
      visas: [
        {
          type: "Student",
          cost: 150, // Approx. AED 550
          duration: "1 year, renewable",
          validity: "1 year",
          notes: "Requires university sponsorship. Apply through educational institution. Limited work may be allowed."
        },
        {
          type: "Work",
          cost: 100, // Approx. AED 370
          duration: "Up to 2 years",
          validity: "Tied to contract",
          notes: "Requires employer sponsorship and labor approval. Apply through Ministry of Labour."
        },
        {
          type: "Tourist (Visit Visa)",
          cost: 63, // Approx. AED 230 for 14-day visa on arrival
          duration: "14, 30, or 90 days",
          validity: "6 months (multiple entries for some)",
          notes: "Visa on arrival for many nationalities (e.g., U.S., India). Online application via Emirates for others."
        },
        {
          type: "Transit",
          cost: 50, // Approx. AED 185 for 48/96 hours
          duration: "48 or 96 hours",
          validity: "Single entry",
          notes: "Apply online or at Dubai airport (Emirates passengers). Requires onward ticket."
        }
      ]
    },
    {
      country: "South Africa",
      visas: [
        {
          type: "Student",
          cost: 50, // Approx. ZAR 900
          duration: "Duration of course",
          validity: "Tied to program",
          notes: "Requires acceptance letter from institution. Proof of funds and health insurance needed."
        },
        {
          type: "Work (General Work Visa)",
          cost: 80, // Approx. ZAR 1,520
          duration: "Up to 5 years",
          validity: "Tied to contract",
          notes: "Requires job offer and SAQA skills assessment. Apply at Embassy/Consulate."
        },
        {
          type: "Tourist (Visitor Visa)",
          cost: 50, // Approx. ZAR 900
          duration: "Up to 90 days",
          validity: "Up to 90 days",
          notes: "Visa-free for some nationalities (e.g., U.S.). Others apply at Embassy. No work allowed."
        },
        {
          type: "Transit",
          cost: 0,
          duration: "Up to 24 hours",
          validity: "Single entry",
          notes: "For airport transit without leaving international area. Visa required if exiting transit."
        }
      ]
    },{
        country: "Brazil",
        visas: [
          {
            type: "Student (VITEM IV)",
            cost: 100, // Varies by nationality
            duration: "Up to 1 year, extendable",
            validity: "1 year, renewable",
            notes: "Requires acceptance letter from accredited institution. Proof of funds ($2,000/month) and health insurance required. Apply at Brazilian Embassy."
          },
          {
            type: "Work (VITEM V)",
            cost: 120, // Varies by nationality
            duration: "Up to 2 years, extendable",
            validity: "Tied to contract, max 2 years",
            notes: "Requires job offer and approval from Ministry of Labor. Proof of qualifications needed. Apply at Embassy/Consulate."
          },
          {
            type: "Tourist (VITUR)",
            cost: 80, // Free for U.S. citizens
            duration: "Up to 90 days",
            validity: "Up to 2 years (multiple entries)",
            notes: "For tourism or visiting family. No work allowed. U.S. citizens need visa since 2025. Apply online or at Embassy."
          },
          {
            type: "Transit",
            cost: 0,
            duration: "Up to 7 days",
            validity: "Single entry",
            notes: "Required for layovers exceeding 7 days or leaving airport. Visa-free for most nationalities for shorter transits."
          }
        ]
      },
      {
        country: "China",
        visas: [
          {
            type: "Student (X1/X2 Visa)",
            cost: 140, // For U.S. citizens
            duration: "X1: Over 180 days; X2: Up to 180 days",
            validity: "Tied to study program",
            notes: "X1 for long-term study, X2 for short courses. Requires JW201/JW202 form and admission letter. Apply at Chinese Embassy."
          },
          {
            type: "Work (Z Visa)",
            cost: 140, // For U.S. citizens
            duration: "Up to 1 year, extendable",
            validity: "Tied to contract",
            notes: "Requires work permit and job offer. Health check and criminal record certificate needed. Apply at Embassy."
          },
          {
            type: "Tourist (L Visa)",
            cost: 140, // For U.S. citizens
            duration: "Up to 60 days per entry",
            validity: "Up to 10 years (multiple entries)",
            notes: "For tourism or visiting family. No work allowed. Requires itinerary and hotel bookings. Apply at Embassy."
          },
          {
            type: "Transit (G Visa)",
            cost: 140, // For U.S. citizens
            duration: "Up to 7–10 days",
            validity: "Single entry",
            notes: "Required for layovers exceeding visa-free transit (24/72/144 hours). Onward ticket needed. Apply at Embassy."
          }
        ]
      },
      {
        country: "New Zealand",
        visas: [
          {
            type: "Student (Fee Paying Student Visa)",
            cost: 230, // Approx. NZD 375
            duration: "Duration of course, up to 4 years",
            validity: "Tied to program",
            notes: "Requires offer of place from approved institution. Proof of funds (NZD 20,000/year) and health insurance needed. Limited work (20 hours/week)."
          },
          {
            type: "Work (Essential Skills Work Visa)",
            cost: 410, // Approx. NZD 675
            duration: "Up to 3 years",
            validity: "Tied to job contract",
            notes: "Requires job offer and labor market test. Apply online or at Immigration New Zealand office."
          },
          {
            type: "Tourist (Visitor Visa)",
            cost: 150, // Approx. NZD 246
            duration: "Up to 9 months",
            validity: "Up to 18 months (multiple entries)",
            notes: "For tourism or visiting family. No work allowed. Visa-free for U.S., EU citizens (up to 3 months). Apply online."
          },
          {
            type: "Transit",
            cost: 0,
            duration: "Up to 24 hours",
            validity: "Single entry",
            notes: "Visa-free for most nationalities if staying in transit area. NZeTA ($12) required for visa-free nationals."
          }
        ]
      },
      {
        country: "Thailand",
        visas: [
          {
            type: "Student (Non-Immigrant ED Visa)",
            cost: 80, // Approx. THB 2,900
            duration: "Up to 1 year, extendable",
            validity: "1 year, renewable",
            notes: "Requires acceptance from accredited school (e.g., language or university). Limited work with permit. Apply at Thai Embassy."
          },
          {
            type: "Work (Non-Immigrant B Visa)",
            cost: 80, // Approx. THB 2,900
            duration: "Up to 1 year, extendable",
            validity: "Tied to contract",
            notes: "Requires work permit and job offer. Apply at Thai Embassy. Extensions via Immigration Office."
          },
          {
            type: "Tourist (Tourist Visa)",
            cost: 40, // Approx. THB 1,450 for single entry
            duration: "Up to 60 days, extendable 30 days",
            validity: "3–6 months (single/multiple entries)",
            notes: "For tourism. Visa-free for U.S., EU (30 days). Apply online or at Embassy."
          },
          {
            type: "Transit (Transit Visa)",
            cost: 35, // Approx. THB 1,250
            duration: "Up to 30 days",
            validity: "Single entry",
            notes: "For layovers requiring exit from airport. Onward ticket required. Apply at Thai Embassy."
          }
        ]
      },
      {
        country: "Turkey",
        visas: [
          {
            type: "Student",
            cost: 50, // Varies by nationality
            duration: "Duration of course, up to 1 year",
            validity: "Tied to program",
            notes: "Requires acceptance letter from university. Residence permit needed post-arrival. Apply at Turkish Embassy."
          },
          {
            type: "Work",
            cost: 70, // Varies by nationality
            duration: "Up to 1 year, extendable",
            validity: "Tied to contract",
            notes: "Requires job offer and work permit from Ministry of Labor. Apply at Embassy."
          },
          {
            type: "Tourist (e-Visa)",
            cost: 20, // For U.S. citizens
            duration: "Up to 90 days",
            validity: "180 days (multiple entries)",
            notes: "For tourism. Visa-free for some EU citizens. Apply online at evisa.gov.tr. U.S. citizens need visa."
          },
          {
            type: "Transit",
            cost: 0,
            duration: "Up to 24 hours",
            validity: "Single entry",
            notes: "Visa-free for most nationalities if staying in airport. e-Visa required if leaving transit area."
          }
        ]
      }
  ];