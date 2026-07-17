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
  ,
  {
    id: "pmujjwala",
    name: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    category: "Women & Household",
    ministry: "Ministry of Petroleum and Natural Gas",
    benefits: "Free LPG gas connection (cylinder + stove) to women from Below Poverty Line (BPL) households, along with a first refill at subsidized rate. Reduces indoor air pollution from cooking fires.",
    description: "A scheme to provide clean cooking fuel (LPG) to women from BPL households, replacing the use of firewood and cow dung cakes which cause severe health hazards.",
    applyUrl: "https://pmuy.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        reasons.push("This scheme specifically targets women as the primary beneficiary.");
      } else {
        reasons.push("You are a woman — this scheme is designed for female beneficiaries.");
      }
      if (profile.income > 150000) {
        eligible = false;
        reasons.push("Annual family income must be below ₹1,50,000 (BPL category) to qualify.");
      } else {
        reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} qualifies under the BPL threshold.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmmvy",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    category: "Women & Maternity",
    ministry: "Ministry of Women and Child Development",
    benefits: "Cash incentive of ₹6,000 paid in three installments to pregnant and lactating mothers for their first child, to partially compensate for wage loss during pregnancy and ensure proper health care.",
    description: "A maternity benefit scheme for all pregnant women and lactating mothers who are 19 years of age or above, for the first child in the family. The scheme integrates with health services to encourage institutional delivery.",
    applyUrl: "https://pmmvy.wcd.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        reasons.push("This maternity benefit scheme is only applicable to women.");
      } else {
        reasons.push("You are female, which is required for this maternity scheme.");
      }
      const ageNum = Number(profile.age);
      if (ageNum < 19) {
        eligible = false;
        reasons.push(`Your age is ${ageNum}. The minimum age for PMMVY is 19 years.`);
      } else {
        reasons.push(`Your age (${ageNum}) meets the minimum age of 19 for this scheme.`);
      }
      if (profile.maritalStatus === "Unmarried") {
        eligible = false;
        reasons.push("This scheme is for married, widowed, or divorced women with a child.");
      } else {
        reasons.push("Your marital status is eligible for this maternity scheme.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "ssy",
    name: "Sukanya Samriddhi Yojana (SSY)",
    category: "Women & Girl Child",
    ministry: "Ministry of Finance",
    benefits: "High-interest savings account (8.2% per annum) for a girl child, with tax exemption under Section 80C. Deposits from ₹250 to ₹1.5 lakh per year. Matures in 21 years, helping fund the girl's higher education and marriage.",
    description: "A government-backed small savings scheme under the 'Beti Bachao Beti Padhao' campaign, designed to encourage parents to build a secure financial future for their girl child.",
    applyUrl: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samridhi-Account.aspx",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.hasDaughter !== "Yes") {
        eligible = false;
        reasons.push("This scheme is exclusively for parents or guardians who have a girl child below 10 years of age.");
      } else {
        reasons.push("You have a girl child and can open a Sukanya Samriddhi account in her name.");
      }

      reasons.push("Can be opened at any post office or authorized bank. The account earns 8.2% annual interest, fully tax-free.");

      return { eligible, reasons };
    }
  },
  {
    id: "mssc",
    name: "Mahila Samman Savings Certificate (MSSC)",
    category: "Women & Savings",
    ministry: "Ministry of Finance",
    benefits: "Fixed 7.5% annual interest on deposits up to ₹2 lakh, with a partial withdrawal facility. 2-year tenure. Safe, government-backed savings option with better returns than a standard bank FD.",
    description: "A one-time government savings scheme introduced in 2023 specifically for women and girls. Designed to promote financial independence and savings habit among Indian women.",
    applyUrl: "https://www.indiapost.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        reasons.push("This savings certificate is exclusively for women and girls.");
      } else {
        reasons.push("You are female, making you directly eligible to open this savings account.");
      }

      reasons.push("Available at post offices and designated banks. No income limit — open to all women.");
      reasons.push("You can invest up to ₹2,00,000 at 7.5% interest — much better than a regular FD!");

      return { eligible, reasons };
    }
  },
  {
    id: "standupmudra",
    name: "Stand Up India / PM MUDRA Yojana for Women",
    category: "Women & Business",
    ministry: "Ministry of Finance / SIDBI",
    benefits: "Collateral-free business loans from ₹10,000 (Shishu), ₹50,000–5 lakh (Kishor), to ₹5–10 lakh (Tarun) under MUDRA. Stand Up India provides ₹10 lakh–₹1 crore for women entrepreneurs to start a new enterprise.",
    description: "Two flagship loan schemes to empower women entrepreneurs: PM MUDRA provides micro-loans to small/home-based businesses, while Stand Up India offers larger loans specifically for SC/ST and women to start greenfield enterprises.",
    applyUrl: "https://www.mudra.org.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        reasons.push("These loan schemes prioritize women, SC/ST, and minority entrepreneurs.");
      } else {
        reasons.push("As a woman, you are a priority applicant for MUDRA and Stand Up India loans.");
      }

      const selfOrHousewife = ["Self Employed", "Housewife", "Daily Wage Worker", "Unemployed"].includes(profile.occupation);
      if (!selfOrHousewife) {
        reasons.push("Note: These loans are best suited for starting or running a self-owned micro, small, or medium business.");
      } else {
        reasons.push(`Your occupation status as "${profile.occupation}" is ideal for applying for a MUDRA startup loan.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "gruhalakshmi",
    name: "Gruha Lakshmi Scheme (Karnataka)",
    category: "State Schemes - Women",
    ministry: "Department of Women and Child Development, Government of Karnataka",
    benefits: "Direct monthly financial assistance of ₹2,000 transferred into the bank account of the woman head of a household.",
    description: "A flagship welfare scheme of the Government of Karnataka to support female heads of families, helping cover household expenses and promoting gender equality.",
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        reasons.push("You are a resident of Karnataka.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        reasons.push("This scheme is exclusively for the woman head of the household.");
      } else {
        reasons.push("You are female, matching the target demographic.");
      }
      if (profile.income > 200000) {
        eligible = false;
        reasons.push("Family income exceeds ₹2,00,000/year (GST and Income Tax payers are excluded).");
      } else {
        reasons.push("Family income is within the eligible threshold for non-taxpaying households.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "gruhajyothi",
    name: "Gruha Jyothi Scheme (Karnataka)",
    category: "State Schemes - Electricity",
    ministry: "Department of Energy, Government of Karnataka",
    benefits: "Free domestic electricity supply of up to 200 units per month for all residential households in Karnataka.",
    description: "Provides electricity bill relief to domestic consumers in Karnataka whose average consumption is less than 200 units.",
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        reasons.push("You reside in Karnataka.");
      }

      reasons.push("All domestic consumers in Karnataka consuming less than 200 units are eligible.");

      return { eligible, reasons };
    }
  },
  {
    id: "yuvanidhi",
    name: "Yuva Nidhi Scheme (Karnataka)",
    category: "State Schemes - Youth",
    ministry: "Department of Skill Development, Entrepreneurship and Livelihood, Karnataka",
    benefits: "Monthly unemployment allowance of ₹3,000 (for graduates) and ₹1,500 (for diploma holders) for up to 2 years.",
    description: "Financial assistance for educated unemployed youth of Karnataka who completed their graduation or diploma to support their search for career opportunities.",
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        reasons.push("You reside in Karnataka.");
      }
      const ageNum = Number(profile.age);
      if (ageNum < 21 || ageNum > 30) {
        eligible = false;
        reasons.push(`Your age is ${ageNum}. This scheme is only for youth aged 21 to 30 years.`);
      } else {
        reasons.push("Your age is within the eligible range of 21-30 years.");
      }
      if (!["Unemployed", "Student"].includes(profile.occupation)) {
        eligible = false;
        reasons.push(`Your occupation is "${profile.occupation}". You must be unemployed to claim Yuva Nidhi.`);
      } else {
        reasons.push("You are registered as unemployed or studying.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "shakticard",
    name: "Shakti Scheme (Karnataka)",
    category: "State Schemes - Transport",
    ministry: "Department of Transport, Government of Karnataka",
    benefits: "Free travel in state-run road transport corporation buses (ordinary, express, BMTC, etc.) within Karnataka.",
    description: "Enables free public transport for women and transgender residents of Karnataka, enhancing their access to workplaces and education.",
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        reasons.push("You reside in Karnataka.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        reasons.push("This scheme is exclusively for female and transgender residents.");
      } else {
        reasons.push("You match the gender criteria (Female).");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "annabhagya",
    name: "Anna Bhagya Scheme (Karnataka)",
    category: "State Schemes - Food Security",
    ministry: "Food, Civil Supplies & Consumer Affairs Department, Karnataka",
    benefits: "Free 10 kg food grains (or 5 kg rice + cash in lieu of the remaining 5 kg at ₹34/kg) per person per month to BPL and Antyodaya card holders.",
    description: "Karnataka state government food security program ensuring malnutrition-free households by providing food grains or direct cash transfer.",
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile) => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        reasons.push("You reside in Karnataka.");
      }
      if (profile.income > 120000) {
        eligible = false;
        reasons.push("Family income exceeds BPL threshold (₹1,20,000/year).");
      } else {
        reasons.push("Family income is within the BPL threshold.");
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
    id: "gender",
    field: "gender",
    text: "What is your **Gender**? (This helps us check eligibility for women-specific schemes 👩)",
    inputType: "buttons",
    options: ["Male", "Female", "Other"],
    validate: (val) => { return null; }
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
    id: "maritalStatus",
    field: "maritalStatus",
    text: "What is your **Marital Status**?",
    inputType: "buttons",
    options: ["Married", "Unmarried", "Widowed", "Divorced"],
    validate: (val) => { return null; }
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
    options: ["Farmer", "Daily Wage Worker", "Self Employed", "Housewife", "Salaried / Govt Employee", "Student", "Unemployed"],
    validate: (val) => {
      return null;
    }
  },
  {
    id: "hasDaughter",
    field: "hasDaughter",
    text: "Do you have a **Daughter below 10 years** of age? (Required to check eligibility for Sukanya Samriddhi Yojana 👧)",
    inputType: "buttons",
    options: ["Yes", "No"],
    validate: (val) => { return null; }
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
