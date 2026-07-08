// src/data/schemes.js

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", 
  "Jammu & Kashmir", "Ladakh", "Puducherry", "Other UT"
];

export const SCHEMES_DATA = [
  {
    id: "pmgkay",
    name: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY) / Ration Card",
    category: "Food & Ration",
    ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
    benefits: "Free 5 kg food grains (wheat or rice) per person per month to eligible families, in addition to standard subsidized rations.",
    description: "A food security welfare scheme aimed at providing free food grains to the poorest citizens, helping reduce hunger and food insecurity.",
    applyUrl: "https://nfsa.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible for PMGKAY.");
      }
      if (profile.income > 150000) {
        eligible = false;
        reasons.push("Family income exceeds the threshold of ₹1,50,000 per year.");
      } else {
        reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} is within the low-income threshold for food security support.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmkisan",
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    category: "Agriculture & Farmers",
    ministry: "Ministry of Agriculture and Farmers Welfare",
    benefits: "Direct income support of ₹6,00,000 per year in three equal installments of ₹2,000 directly into the bank accounts of land-holding farmer families.",
    description: "An initiative by the Government of India that provides minimum income support to all land-holding farmer families across the country.",
    applyUrl: "https://pmkisan.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.occupation !== "Farmer") {
        eligible = false;
        reasons.push("You must be a practicing Farmer to qualify for PM-KISAN.");
      } else {
        reasons.push("You are registered as a Farmer.");
      }
      if (profile.income > 300000) {
        eligible = false;
        reasons.push("Income exceeds the ₹3,00,000/year threshold (taxpaying farmers are excluded).");
      } else {
        reasons.push("Income is within the threshold for small and marginal farmers.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana (PMAY) - Housing for All",
    category: "Housing",
    ministry: "Ministry of Housing and Urban Affairs / Ministry of Rural Development",
    benefits: "Financial assistance and interest subsidies on home loans (up to 6.5%) to build or purchase a first house (pucca house).",
    description: "A flagship program of the Government of India to provide affordable housing to the urban and rural poor.",
    applyUrl: "https://pmaymis.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.income > 600000) {
        eligible = false;
        reasons.push("Family income exceeds ₹6,00,000 per year, which is the limit for the Economically Weaker Section (EWS) and Low Income Group (LIG) categories.");
      } else {
        reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} is eligible for the EWS/LIG credit-linked housing subsidy.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmjay",
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    category: "Healthcare",
    ministry: "Ministry of Health and Family Welfare",
    benefits: "Cashless health cover of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization in any paneled public or private hospital.",
    description: "The largest government-funded healthcare program in the world, targeting low-income and vulnerable families.",
    applyUrl: "https://pmjay.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      
      const lowIncome = profile.income <= 250000;
      const eligibleOccupation = ["Daily Wage Worker", "Farmer", "Unemployed", "Self Employed"].includes(profile.occupation);
      
      if (!lowIncome && !eligibleOccupation) {
        eligible = false;
        reasons.push("Eligibility is based on social and economic vulnerability; your income/occupation profile does not qualify for free medical coverage.");
      } else {
        if (lowIncome) {
          reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} is within the vulnerable economic threshold.`);
        }
        if (eligibleOccupation) {
          reasons.push(`Your occupation as a "${profile.occupation}" is categorized as part of the vulnerable sector.`);
        }
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmsym",
    name: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
    category: "Pension & Security",
    ministry: "Ministry of Labour and Employment",
    benefits: "Guaranteed minimum monthly pension of ₹3,000 after attaining the age of 60, with nominal monthly contributions matching 50:50 by the government.",
    description: "A voluntary and contributory pension scheme for unorganized workers like street vendors, rickshaw pullers, construction workers, agricultural laborers, etc.",
    applyUrl: "https://maandhan.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      
      const ageNum = Number(profile.age);
      if (ageNum < 18 || ageNum > 40) {
        eligible = false;
        reasons.push(`Your age is ${ageNum}. The entry age for this scheme is strictly between 18 and 40 years.`);
      } else {
        reasons.push(`Your age (${ageNum}) is within the 18 to 40 enrollment window.`);
      }

      const unorganized = ["Daily Wage Worker", "Self Employed", "Unemployed"].includes(profile.occupation);
      if (!unorganized) {
        eligible = false;
        reasons.push(`Your occupation "${profile.occupation}" suggests organized sector employment, which is ineligible.`);
      } else {
        reasons.push(`Your status as a "${profile.occupation}" is classified under the unorganized sector.`);
      }

      if (profile.income > 180000) {
        eligible = false;
        reasons.push("Your monthly income must be less than ₹15,000 (₹1.8L annual) to qualify.");
      } else {
        reasons.push("Your annual family income is under ₹1,80,000 (approx. ₹15,000/month).");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "apy",
    name: "Atal Pension Yojana (APY)",
    category: "Pension & Security",
    ministry: "Ministry of Finance",
    benefits: "Guaranteed pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month after age 60, depending on contributions starting at a young age.",
    description: "A pension scheme focusing on all citizens in the unorganized sector to secure their old age income.",
    applyUrl: "https://www.npscra.nsdl.co.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }

      const ageNum = Number(profile.age);
      if (ageNum < 18 || ageNum > 40) {
        eligible = false;
        reasons.push(`Your age is ${ageNum}. The entry window for APY is strictly 18 to 40 years.`);
      } else {
        reasons.push(`Your age (${ageNum}) is within the entry window of 18 to 40 years.`);
      }

      reasons.push("Available to any Indian citizen willing to make matching monthly contributions.");

      return { eligible, reasons };
    }
  },
  {
    id: "pmswanidhi",
    name: "PM Street Vendor’s AtmaNirbhar Nidhi (PM Swanidhi)",
    category: "Business & Loans",
    ministry: "Ministry of Housing and Urban Affairs",
    benefits: "Collateral-free working capital loan of up to ₹10,000 (first tranche), with a 7% interest subsidy, and higher loan limits (₹20,000 and ₹50,000) on timely repayment.",
    description: "A special micro-credit facility scheme for street vendors to help them resume their livelihoods post-pandemic.",
    applyUrl: "https://pmsvanidhi.mohua.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }

      const isVendor = ["Self Employed", "Daily Wage Worker"].includes(profile.occupation);
      if (!isVendor) {
        eligible = false;
        reasons.push("This loan is strictly intended for street vendors, hawkers, and micro-entrepreneurs. Your occupation status is not eligible.");
      } else {
        reasons.push(`Your occupational profile as a "${profile.occupation}" fits the category for micro-business loans.`);
      }

      return { eligible, reasons };
    }
  }
];

export const CHAT_QUESTIONS = [
  {
    id: "name",
    field: "name",
    text: "Namaste! I am the India Schemes Eligibility Bot 🇮🇳.\n\nI can help you check your eligibility for various central government schemes. Let's get started!\n\nWhat is your **Full Name**?",
    inputType: "text",
    placeholder: "Type your name...",
    validate: (val) => {
      if (!val || val.trim().length < 2) return "Please enter a valid name (at least 2 characters).";
      return null;
    }
  },
  {
    id: "nationality",
    field: "nationality",
    text: "Nice to meet you! Let's check your eligibility details. \n\nAre you an **Indian Citizen**?",
    inputType: "buttons",
    options: ["Yes", "No"],
    validate: (val) => {
      if (val !== "Yes" && val !== "No") return "Please select Yes or No.";
      return null;
    }
  },
  {
    id: "age",
    field: "age",
    text: "How old are you? Please enter your **Age** in years.",
    inputType: "number",
    placeholder: "e.g., 28",
    validate: (val) => {
      const num = Number(val);
      if (isNaN(num) || num <= 0 || num > 120) return "Please enter a valid age between 1 and 120.";
      return null;
    }
  },
  {
    id: "state",
    field: "state",
    text: "Which **State or Union Territory** do you reside in?",
    inputType: "select",
    options: INDIAN_STATES,
    placeholder: "Select your state...",
    validate: (val) => {
      if (!INDIAN_STATES.includes(val)) return "Please select a valid state from the list.";
      return null;
    }
  },
  {
    id: "income",
    field: "income",
    text: "What is your **Annual Family Income** (in Rupees)? This is important for subsidy limits.",
    inputType: "number",
    placeholder: "e.g., 150000",
    validate: (val) => {
      const num = Number(val);
      if (isNaN(num) || num < 0) return "Please enter a valid non-negative income amount.";
      return null;
    }
  },
  {
    id: "occupation",
    field: "occupation",
    text: "What is your primary **Occupation / Employment Status**?",
    inputType: "buttons",
    options: ["Farmer", "Daily Wage Worker", "Self Employed", "Salaried / Govt Employee", "Student", "Unemployed"],
    validate: (val) => {
      return null;
    }
  },
  {
    id: "category",
    field: "category",
    text: "What **Social Category** do you belong to?",
    inputType: "buttons",
    options: ["General", "OBC", "SC", "ST"],
    validate: (val) => {
      return null;
    }
  },
  {
    id: "disability",
    field: "disability",
    text: "Are you **Differently Abled (Divyangjan)**?",
    inputType: "buttons",
    options: ["Yes", "No"],
    validate: (val) => {
      return null;
    }
  }
];
