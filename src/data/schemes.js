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
    name: {
      en: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY) / Ration Card",
      hi: "प्रधानमंत्री गरीब कल्याण अन्न योजना (PMGKAY) / राशन कार्ड",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಗರೀಬ್ ಕಲ್ಯಾಣ್ ಅನ್ನ ಯೋಜನೆ (PMGKAY) / ರೇಷನ್ ಕಾರ್ಡ್"
    },
    category: {
      en: "Food & Ration",
      hi: "खाद्य और राशन",
      kn: "ಆಹಾರ ಮತ್ತು ರೇಷನ್"
    },
    ministry: {
      en: "Ministry of Consumer Affairs, Food and Public Distribution",
      hi: "उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय",
      kn: "ಗ್ರಾಹಕ ವ್ಯವಹಾರಗಳು, ಆಹಾರ ಮತ್ತು ಸಾರ್ವಜನಿಕ ವಿತರಣಾ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Free 5 kg food grains (wheat or rice) per person per month to eligible families, in addition to standard subsidized rations.",
      hi: "पात्र परिवारों को प्रति व्यक्ति प्रति माह 5 किलो मुफ्त खाद्यान्न (गेहूं या चावल), मानक रियायती राशन के अतिरिक्त।",
      kn: "ಅರ್ಹ ಕುಟುಂಬಗಳಿಗೆ ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ತಿಂಗಳಿಗೆ 5 ಕೆಜಿ ಉಚಿತ ಆಹಾರ ಧಾನ್ಯಗಳು (ಗೋಧಿ ಅಥವಾ ಅಕ್ಕಿ), ಪ್ರಮಾಣಿತ ಸಬ್ಸಿಡಿ ರೇಷನ್ ಜೊತೆಗೆ."
    },
    description: {
      en: "A food security welfare scheme aimed at providing free food grains to the poorest citizens, helping reduce hunger and food insecurity.",
      hi: "गरीब नागरिकों को मुफ्त खाद्यान्न प्रदान करने के उद्देश्य से एक खाद्य सुरक्षा कल्याण योजना, जो भूख और खाद्य असुरक्षा को कम करने में मदद करती है।",
      kn: "ಬಡ ನಾಗರಿಕರಿಗೆ ಉಚಿತ ಆಹಾರ ಧಾನ್ಯಗಳನ್ನು ಒದಗಿಸುವ ಗುರಿಯನ್ನು ಹೊಂದಿರುವ ಆಹಾರ ಭದ್ರತಾ ಕಲ್ಯಾಣ ಯೋಜನೆ."
    },
    applyUrl: "https://nfsa.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही PMGKAY के लिए पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ PMGKAY ಗೆ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible for PMGKAY.");
      }
      if (profile.income > 150000) {
        eligible = false;
        if (lang === "hi") reasons.push("पारिवारिक आय ₹1,50,000 प्रति वर्ष की सीमा से अधिक है।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ಆದಾಯವು ವರ್ಷಕ್ಕೆ ₹1,50,000 ಮೀರಿದೆ.");
        else reasons.push("Family income exceeds the threshold of ₹1,50,000 per year.");
      } else {
        if (lang === "hi") reasons.push(`वार्षिक आय ₹${Number(profile.income).toLocaleString('en-IN')} खाद्य सुरक्षा सहायता के लिए निम्न-आय सीमा के भीतर है।`);
        else if (lang === "kn") reasons.push(`ವಾರ್ಷಿಕ ಆದಾಯ ₹${Number(profile.income).toLocaleString('en-IN')} ಆಹಾರ ಭದ್ರತೆಯ ಕಡಿಮೆ ಆದಾಯದ ಮಿತಿಯಲ್ಲಿದೆ.`);
        else reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} is within the low-income threshold for food security support.`);
      }
      if (profile.ownsFourWheeler === "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("चार पहिया वाहन (कार/जीप) वाले परिवार बीपीएल/एएवाई राशन कार्ड से बाहर हैं।");
        else if (lang === "kn") reasons.push("ನಾಲ್ಕು ಚಕ್ರಗಳ ವಾಹನ (ಕಾರ್/ಜೀಪ್) ಹೊಂದಿರುವ ಕುಟುಂಬಗಳನ್ನು ಬಿಪಿಎಲ್/ಎಎವೈ ಕಾರ್ಡ್‌ನಿಂದ ಹೊರಗಿಡಲಾಗಿದೆ.");
        else reasons.push("Households owning a four-wheeler (car/jeep) are excluded from BPL/AAY Ration Cards.");
      } else {
        if (lang === "hi") reasons.push("कोई चार पहिया वाहन स्वामित्व दर्ज नहीं किया गया।");
        else if (lang === "kn") reasons.push("ಯಾವುದೇ ನಾಲ್ಕು ಚಕ್ರಗಳ ವಾಹನ ಮಾಲೀಕತ್ವ ವರದಿಯಾಗಿಲ್ಲ.");
        else reasons.push("No four-wheeler ownership reported.");
      }
      if (profile.govtEmployeeOrTaxpayer === "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("सरकारी कर्मचारी या आयकर दाता वाले परिवार राशन कार्ड लाभों से बाहर हैं।");
        else if (lang === "kn") reasons.push("ಸರ್ಕಾರಿ ನೌಕರರು ಅಥವಾ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರನ್ನು ಹೊಂದಿರುವ ಕುಟುಂಬಗಳನ್ನು ಹೊರಗಿಡಲಾಗಿದೆ.");
        else reasons.push("Households with government employees or income tax payers are excluded from BPL/AAY Ration Cards.");
      } else {
        if (lang === "hi") reasons.push("परिवार का कोई सदस्य सरकारी कर्मचारी या आयकर दाता नहीं है।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ಯಾವುದೇ ಸದಸ್ಯರು ಸರ್ಕಾರಿ ನೌಕರರು ಅಥವಾ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರಲ್ಲ.");
        else reasons.push("No family member is a government employee or income tax payer.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmkisan",
    name: {
      en: "PM Kisan Samman Nidhi (PM-KISAN)",
      hi: "पीएम किसान सम्मान निधि (PM-KISAN)",
      kn: "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ (PM-KISAN)"
    },
    category: {
      en: "Agriculture & Farmers",
      hi: "कृषि और किसान",
      kn: "ಕೃಷಿ ಮತ್ತು ರೈತರು"
    },
    ministry: {
      en: "Ministry of Agriculture and Farmers Welfare",
      hi: "कृषि एवं किसान कल्याण मंत्रालय",
      kn: "ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Direct income support of ₹6,000 per year in three equal installments of ₹2,000 directly into the bank accounts of land-holding farmer families.",
      hi: "भूमिधारक किसान परिवारों के बैंक खातों में सीधे ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता (₹2,000 की तीन समान किस्तों में)।",
      kn: "ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ ₹6,000 ನೇರ ಆದಾಯ ಬೆಂಬಲ (ತಲಾ ₹2,000 ರ ಮೂರು ಸಮಾನ ಕಂತುಗಳಲ್ಲಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ)."
    },
    description: {
      en: "An initiative by the Government of India that provides minimum income support to all land-holding farmer families across the country.",
      hi: "भारत सरकार की एक पहल जो देश भर के सभी भूमिधारक किसान परिवारों को न्यूनतम आय सहायता प्रदान करती है।",
      kn: "ದೇಶಾದ್ಯಂತದ ಎಲ್ಲಾ ಭೂಮಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ಕನಿಷ್ಠ ಆದಾಯ ಬೆಂಬಲವನ್ನು ಒದಗಿಸುವ ಭಾರತ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಯೋಜನೆ."
    },
    applyUrl: "https://pmkisan.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.occupation !== "Farmer") {
        eligible = false;
        if (lang === "hi") reasons.push("पीएम-किसान के लिए पात्र होने के लिए आपका किसान होना अनिवार्य है।");
        else if (lang === "kn") reasons.push("ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆಗೆ ಅರ್ಹರಾಗಲು ನೀವು ರೈತರಾಗಿರಬೇಕು.");
        else reasons.push("You must be a practicing Farmer to qualify for PM-KISAN.");
      } else {
        if (lang === "hi") reasons.push("आप एक किसान के रूप में पंजीकृत हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ರೈತರಾಗಿ ನೋಂದಾಯಿಸಲ್ಪಟ್ಟಿದ್ದೀರಿ.");
        else reasons.push("You are registered as a Farmer.");
      }
      if (profile.income > 300000) {
        eligible = false;
        if (lang === "hi") reasons.push("आय ₹3,00,000/वर्ष की सीमा से अधिक है (करदाता किसान बाहर हैं)।");
        else if (lang === "kn") reasons.push("ಆದಾಯವು ವರ್ಷಕ್ಕೆ ₹3,00,000 ಮೀರಿದೆ (ತೆರಿಗೆ ಪಾವತಿಸುವ ರೈತರನ್ನು ಹೊರಗಿಡಲಾಗಿದೆ).");
        else reasons.push("Income exceeds the ₹3,00,000/year threshold (taxpaying farmers are excluded).");
      } else {
        if (lang === "hi") reasons.push("आय छोटे और सीमांत किसानों की पात्रता सीमा के भीतर है।");
        else if (lang === "kn") reasons.push("ಆದಾಯವು ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರ ಮಿತಿಯಲ್ಲಿದೆ.");
        else reasons.push("Income is within the threshold for small and marginal farmers.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmay",
    name: {
      en: "Pradhan Mantri Awas Yojana (PMAY) - Housing for All",
      hi: "प्रधानमंत्री आवास योजना (PMAY) - सभी के लिए आवास",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಆವಾಸ್ ಯೋಜನೆ (PMAY) - ಎಲ್ಲರಿಗೂ ವಸತಿ"
    },
    category: {
      en: "Housing",
      hi: "आवास",
      kn: "ವಸತಿ"
    },
    ministry: {
      en: "Ministry of Housing and Urban Affairs / Ministry of Rural Development",
      hi: "आवासन और शहरी कार्य मंत्रालय / ग्रामीण विकास मंत्रालय",
      kn: "ವಸತಿ ಮತ್ತು ನಗರ ವ್ಯವಹಾರಗಳ ಸಚಿವಾಲಯ / ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Financial assistance and interest subsidies on home loans (up to 6.5%) to build or purchase a first house (pucca house).",
      hi: "पहला पक्का घर बनाने या खरीदने के लिए गृह ऋण पर वित्तीय सहायता और ब्याज सब्सिडी (6.5% तक)।",
      kn: "ಮೊದಲ ಮನೆ (ಪಕ್ಕಾ ಮನೆ) ನಿರ್ಮಿಸಲು ಅಥವಾ ಖರೀದಿಸಲು ಗೃಹ ಸಾಲದ ಮೇಲೆ ಹಣಕಾಸಿನ ನೆರವು ಮತ್ತು ಬಡ್ಡಿ ಸಬ್ಸಿಡಿ (6.5% ವರೆಗೆ)."
    },
    description: {
      en: "A flagship program of the Government of India to provide affordable housing to the urban and rural poor.",
      hi: "शहरी और ग्रामीण गरीबों को किफायती आवास प्रदान करने के लिए भारत सरकार का एक प्रमुख कार्यक्रम।",
      kn: "ನಗರ ಮತ್ತು ಗ್ರಾಮೀಣ ಬಡವರಿಗೆ ಕೈಗೆಟುಕುವ ದರದಲ್ಲಿ ವಸತಿ ಒದಗಿಸಲು ಭಾರತ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಕಾರ್ಯಕ್ರಮ."
    },
    applyUrl: "https://pmaymis.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.income > 600000) {
        eligible = false;
        if (lang === "hi") reasons.push("पारिवारिक आय ₹6,00,000 प्रति वर्ष से अधिक है (EWS/LIG श्रेणियां)।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ಆದಾಯವು ವರ್ಷಕ್ಕೆ ₹6,00,000 ಮೀರಿದೆ (EWS/LIG ಮಿತಿ).");
        else reasons.push("Family income exceeds ₹6,00,000 per year, which is the limit for the Economically Weaker Section (EWS) and Low Income Group (LIG) categories.");
      } else {
        if (lang === "hi") reasons.push(`₹${Number(profile.income).toLocaleString('en-IN')} की वार्षिक आय EWS/LIG क्रेडिट-लिंक्ड आवास सब्सिडी के लिए पात्र है।`);
        else if (lang === "kn") reasons.push(`₹${Number(profile.income).toLocaleString('en-IN')} ವಾರ್ಷಿಕ ಆದಾಯವು EWS/LIG ಕ್ರೆಡಿಟ್ ಸಬ್ಸಿಡಿಗೆ ಅರ್ಹವಾಗಿದೆ.`);
        else reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} is eligible for the EWS/LIG credit-linked housing subsidy.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmjay",
    name: {
      en: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
      hi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (PM-JAY)",
      kn: "ಆಯುಷ್ಮಾನ್ ಭಾರತ್ - ಪ್ರಧಾನ ಮಂತ್ರಿ ಜನ ಆರೋಗ್ಯ ಯೋಜನೆ (PM-JAY)"
    },
    category: {
      en: "Healthcare",
      hi: "स्वास्थ्य सेवा",
      kn: "ಆರೋಗ್ಯ ಸೇವೆ"
    },
    ministry: {
      en: "Ministry of Health and Family Welfare",
      hi: "स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
      kn: "ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Cashless health cover of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization in any paneled public or private hospital.",
      hi: "पैनल में शामिल किसी भी सरकारी या निजी अस्पताल में माध्यमिक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5,00,000 तक का कैशलेस स्वास्थ्य बीमा।",
      kn: "ನೋಂದಾಯಿತ ಸರ್ಕಾರಿ ಅಥವಾ ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ದ್ವಿತೀಯ ಮತ್ತು ತೃತೀಯ ಹಂತದ ಚಿಕಿತ್ಸೆಗಾಗಿ ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೆ ವರ್ಷಕ್ಕೆ ₹5,00,000 ವರೆಗೆ ನಗದುರಹಿತ ಆರೋಗ್ಯ ರಕ್ಷಣೆ."
    },
    description: {
      en: "The largest government-funded healthcare program in the world, targeting low-income and vulnerable families.",
      hi: "कम आय वाले और कमजोर परिवारों को लक्षित करने वाला दुनिया का सबसे बड़ा सरकार द्वारा वित्त पोषित स्वास्थ्य सेवा कार्यक्रम।",
      kn: "ಕಡಿಮೆ ಆದಾಯ ಮತ್ತು ಆರ್ಥಿಕವಾಗಿ ಹಿಂದುಳಿದ ಕುಟುಂಬಗಳನ್ನು ಗುರಿಯಾಗಿಸಿಕೊಂಡು ವಿಶ್ವದ ಅತಿದೊಡ್ಡ ಸರ್ಕಾರಿ ಪ್ರಾಯೋಜಿತ ಆರೋಗ್ಯ ವಿಮಾ ಕಾರ್ಯಕ್ರಮ."
    },
    applyUrl: "https://pmjay.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      
      const lowIncome = profile.income <= 250000;
      const eligibleOccupation = ["Daily Wage Worker", "Farmer", "Unemployed", "Self Employed", "Housewife"].includes(profile.occupation);
      
      if (!lowIncome && !eligibleOccupation) {
        eligible = false;
        if (lang === "hi") reasons.push("पात्रता सामाजिक और आर्थिक कमजोरी पर आधारित है; आपकी प्रोफाइल योग्य नहीं है।");
        else if (lang === "kn") reasons.push("ಅರ್ಹತೆಯು ಸಾಮಾಜಿಕ ಮತ್ತು ಆರ್ಥಿಕ ಹಿಂದುಳಿದಿರುವಿಕೆಯನ್ನು ಅವಲಂಬಿಸಿದೆ; ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಇದಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.");
        else reasons.push("Eligibility is based on social and economic vulnerability; your income/occupation profile does not qualify for free medical coverage.");
      } else {
        if (lowIncome) {
          if (lang === "hi") reasons.push(`वार्षिक आय ₹${Number(profile.income).toLocaleString('en-IN')} कमजोर आर्थिक सीमा के भीतर है।`);
          else if (lang === "kn") reasons.push(`ವಾರ್ಷಿಕ ಆದಾಯ ₹${Number(profile.income).toLocaleString('en-IN')} ಆರ್ಥಿಕ ಮಿತಿಯೊಳಗಿದೆ.`);
          else reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} is within the vulnerable economic threshold.`);
        }
        if (eligibleOccupation) {
          if (lang === "hi") reasons.push(`आपका व्यवसाय "${profile.occupation}" कमजोर क्षेत्र के रूप में वर्गीकृत है।`);
          else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ಉದ್ಯೋಗ "${profile.occupation}" ಹಿಂದುಳಿದ ವಲಯದಲ್ಲಿದೆ.`);
          else reasons.push(`Your occupation as a "${profile.occupation}" is categorized as part of the vulnerable sector.`);
        }
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmsym",
    name: {
      en: "Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)",
      hi: "प्रधानमंत्री श्रम योगी मान-धन (PM-SYM)",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಶ್ರಮ ಯೋಗಿ ಮಾನ್-ಧನ್ (PM-SYM)"
    },
    category: {
      en: "Pension & Security",
      hi: "पेंशन और सुरक्षा",
      kn: "ಪಿಂಚಣಿ ಮತ್ತು ಭದ್ರತೆ"
    },
    ministry: {
      en: "Ministry of Labour and Employment",
      hi: "श्रम और रोजगार मंत्रालय",
      kn: "ಕಾರ್ಮಿಕ ಮತ್ತು ಉದ್ಯೋಗ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Guaranteed minimum monthly pension of ₹3,000 after attaining the age of 60, with nominal monthly contributions matching 50:50 by the government.",
      hi: "60 वर्ष की आयु प्राप्त करने के बाद ₹3,000 की गारंटीकृत न्यूनतम मासिक पेंशन, सरकार द्वारा 50:50 के मिलान वाले योगदान के साथ।",
      kn: "60 ವರ್ಷ ವಯಸ್ಸಿನ ನಂತರ ಕನಿಷ್ಠ ₹3,000 ಗ್ಯಾರಂಟಿ ಮಾಸಿಕ ಪಿಂಚಣಿ, ಸರ್ಕಾರದಿಂದ 50:50 ಹೊಂದಾಣಿಕೆಯ ಕೊಡುಗೆಯೊಂದಿಗೆ."
    },
    description: {
      en: "A voluntary and contributory pension scheme for unorganized workers like street vendors, rickshaw pullers, construction workers, agricultural laborers, etc.",
      hi: "फेरीवालों, रिक्शा चालकों, निर्माण श्रमिकों, कृषि मजदूरों आदि जैसे असंगठित क्षेत्र के कामगारों के लिए एक स्वैच्छिक और अंशदायी पेंशन योजना।",
      kn: "ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳು, ರಿಕ್ಷಾ ಚಾಲಕರು, ಕಟ್ಟಡ ಕಾರ್ಮಿಕರು, ಕೃಷಿ ಕಾರ್ಮಿಕರು ಮುಂತಾದ ಅಸಂಘಟಿತ ವಲಯದ ಕಾರ್ಮಿಕರಿಗಾಗಿ ಸ್ವಯಂಪ್ರೇರಿತ ಪಿಂಚಣಿ ಯೋಜನೆ."
    },
    applyUrl: "https://maandhan.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      
      const ageNum = Number(profile.age);
      if (ageNum < 18 || ageNum > 40) {
        eligible = false;
        if (lang === "hi") reasons.push(`आपकी आयु ${ageNum} वर्ष है। इस योजना के लिए प्रवेश आयु 18 से 40 वर्ष के बीच है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು ${ageNum}. ಈ ಯೋಜನೆಗೆ ವಯಸ್ಸಿನ ಮಿತಿ 18 ರಿಂದ 40 ವರ್ಷಗಳು.`);
        else reasons.push(`Your age is ${ageNum}. The entry age for this scheme is strictly between 18 and 40 years.`);
      } else {
        if (lang === "hi") reasons.push(`आपकी आयु (${ageNum}) 18 से 40 वर्ष की नामांकन सीमा के भीतर है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು (${ageNum}) ಯೋಜನೆಗೆ ಅಗತ್ಯವಿರುವ 18 ರಿಂದ 40 ರ ಮಿತಿಯಲ್ಲಿದೆ.`);
        else reasons.push(`Your age (${ageNum}) is within the 18 to 40 enrollment window.`);
      }

      const unorganized = ["Daily Wage Worker", "Self Employed", "Unemployed", "Housewife"].includes(profile.occupation);
      if (!unorganized) {
        eligible = false;
        if (lang === "hi") reasons.push(`आपका व्यवसाय "${profile.occupation}" असंगठित क्षेत्र की श्रेणी में नहीं आता है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ಉದ್ಯೋಗ "${profile.occupation}" ಅಸಂಘಟಿತ ವಲಯಕ್ಕೆ ಒಳಪಡುವುದಿಲ್ಲ.`);
        else reasons.push(`Your occupation "${profile.occupation}" suggests organized sector employment, which is ineligible.`);
      } else {
        if (lang === "hi") reasons.push(`असंगठित क्षेत्र के तहत व्यवसाय "${profile.occupation}" पात्र है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ಉದ್ಯೋಗ "${profile.occupation}" ಅಸಂಘಟಿತ ವಲಯದ ಅಡಿಯಲ್ಲಿ ಬರುತ್ತದೆ.`);
        else reasons.push(`Your status as a "${profile.occupation}" is classified under the unorganized sector.`);
      }

      if (profile.income > 180000) {
        eligible = false;
        if (lang === "hi") reasons.push("पात्र होने के लिए आपकी मासिक आय ₹15,000 (₹1.8L वार्षिक) से कम होनी चाहिए।");
        else if (lang === "kn") reasons.push("ಅರ್ಹತೆಗಾಗಿ ನಿಮ್ಮ ಮಾಸಿಕ ಆದಾಯ ₹15,000 (₹1.8L ವಾರ್ಷಿಕ) ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.");
        else reasons.push("Your monthly income must be less than ₹15,000 (₹1.8L annual) to qualify.");
      } else {
        if (lang === "hi") reasons.push("आपकी वार्षिक पारिवारिक आय ₹1,80,000 (लगभग ₹15,000/माह) से कम है।");
        else if (lang === "kn") reasons.push("ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆದಾಯ ₹1,80,000 ಕ್ಕಿಂತ ಕಡಿಮೆ ಇದೆ (ಸುಮಾರು ₹15,000/ತಿಂಗಳು).");
        else reasons.push("Your annual family income is under ₹1,80,000 (approx. ₹15,000/month).");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "apy",
    name: {
      en: "Atal Pension Yojana (APY)",
      hi: "अटल पेंशन योजना (APY)",
      kn: "ಅಟಲ್ ಪಿಂಚಣಿ ಯೋಜನೆ (APY)"
    },
    category: {
      en: "Pension & Security",
      hi: "पेंशन और सुरक्षा",
      kn: "ಪಿಂಚಣಿ ಮತ್ತು ಭದ್ರತೆ"
    },
    ministry: {
      en: "Ministry of Finance",
      hi: "वित्त मंत्रालय",
      kn: "ಹಣಕಾಸು ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Guaranteed pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month after age 60, depending on contributions starting at a young age.",
      hi: "कम उम्र में शुरू किए गए योगदान के आधार पर, 60 वर्ष की आयु के बाद ₹1,000, ₹2,000, ₹3,000, ₹4,000 या ₹5,000 प्रति माह की गारंटीकृत पेंशन।",
      kn: "60 ವರ್ಷದ ನಂತರ ಮಾಸಿಕ ₹1,000, ₹2,000, ₹3,000, ₹4,000 ಅಥವಾ ₹5,000 ಗ್ಯಾರಂಟಿ ಪಿಂಚಣಿ (ಕಡಿಮೆ ವಯಸ್ಸಿನಲ್ಲಿ ಕೊಡುಗೆ ಪ್ರಾರಂಭಿಸುವುದನ್ನು ಅವಲಂಬಿಸಿ)."
    },
    description: {
      en: "A pension scheme focusing on all citizens in the unorganized sector to secure their old age income.",
      hi: "असंगठित क्षेत्र के सभी नागरिकों पर ध्यान केंद्रित करने वाली एक पेंशन योजना, ताकि बुढ़ापे में उनकी आय सुरक्षित रहे।",
      kn: "ಅಸಂಘಟಿತ ವಲಯದ ಎಲ್ಲಾ ನಾಗರಿಕರಿಗೆ ವೃದ್ಧಾಪ್ಯದ ಆದಾಯವನ್ನು ಭದ್ರಪಡಿಸಲು ರೂಪಿಸಲಾದ ಪಿಂಚಣಿ ಯೋಜನೆ."
    },
    applyUrl: "https://www.npscra.nsdl.co.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }

      const ageNum = Number(profile.age);
      if (ageNum < 18 || ageNum > 40) {
        eligible = false;
        if (lang === "hi") reasons.push(`आपकी आयु ${ageNum} वर्ष है। APY के लिए प्रवेश आयु 18 से 40 वर्ष के बीच है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು ${ageNum}. APY ಗೆ ನೋಂದಾಯಿಸಲು ವಯಸ್ಸಿನ ಮಿತಿ 18 ರಿಂದ 40 ವರ್ಷಗಳು.`);
        else reasons.push(`Your age is ${ageNum}. The entry window for APY is strictly 18 to 40 years.`);
      } else {
        if (lang === "hi") reasons.push(`आपकी आयु (${ageNum}) 18 से 40 वर्ष के बीच नामांकन सीमा में है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು (${ageNum}) 18 ರಿಂದ 40 ರ ಮಿತಿಯಲ್ಲಿದೆ.`);
        else reasons.push(`Your age (${ageNum}) is within the entry window of 18 to 40 years.`);
      }

      if (lang === "hi") reasons.push("नियमित मासिक योगदान देने के इच्छुक किसी भी भारतीय नागरिक के लिए उपलब्ध है।");
      else if (lang === "kn") reasons.push("ಕೊಡುಗೆ ಪಾವತಿಸಲು ಸಿದ್ಧರಿರುವ ಯಾವುದೇ ಭಾರತೀಯ ನಾಗರಿಕರಿಗೆ ಲಭ್ಯವಿದೆ.");
      else reasons.push("Available to any Indian citizen willing to make matching monthly contributions.");

      return { eligible, reasons };
    }
  },
  {
    id: "pmswanidhi",
    name: {
      en: "PM Street Vendor’s AtmaNirbhar Nidhi (PM Swanidhi)",
      hi: "पीएम स्वनिधि (PM Swanidhi) - स्ट्रीट वेंडर ऋण",
      kn: "ಪಿಎಂ ಸ್ವನಿಧಿ (PM Swanidhi) - ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳ ಸಾಲ"
    },
    category: {
      en: "Business & Loans",
      hi: "व्यापार और ऋण",
      kn: "ವ್ಯಾಪಾರ ಮತ್ತು ಸಾಲ"
    },
    ministry: {
      en: "Ministry of Housing and Urban Affairs",
      hi: "आवासन और शहरी कार्य मंत्रालय",
      kn: "ವಸತಿ ಮತ್ತು ನಗರ ವ್ಯವಹಾರಗಳ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Collateral-free working capital loan of up to ₹10,000 (first tranche), with a 7% interest subsidy, and higher loan limits (₹20,000 and ₹50,000) on timely repayment.",
      hi: "₹10,000 तक का संपार्श्विक-मुक्त (बिना गारंटी) कार्यशील पूंजी ऋण, 7% ब्याज सब्सिडी और समय पर भुगतान पर उच्च ऋण सीमा के साथ।",
      kn: "₹10,000 ವರೆಗೆ ಗ್ಯಾರಂಟಿ ರಹಿತ ಸಾಲ (ಮೊದಲ ಕಂತು), 7% ಬಡ್ಡಿ ಸಬ್ಸಿಡಿ ಮತ್ತು ಸಮಯಕ್ಕೆ ಮರುಪಾವತಿಸಿದರೆ ಹೆಚ್ಚಿನ ಸಾಲದ ಮಿತಿ."
    },
    description: {
      en: "A special micro-credit facility scheme for street vendors to help them resume their livelihoods post-pandemic.",
      hi: "स्ट्रीट वेंडरों के लिए अपनी आजीविका फिर से शुरू करने में मदद करने के लिए एक विशेष सूक्ष्म-ऋण (micro-credit) सुविधा योजना।",
      kn: "ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳು ತಮ್ಮ ಜೀವನೋಪಾಯವನ್ನು ಪುನರಾರಂಭಿಸಲು ಸಹಾಯ ಮಾಡುವ ವಿಶೇಷ ಕಿರು-ಸಾಲ ಯೋಜನೆ."
    },
    applyUrl: "https://pmsvanidhi.mohua.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }

      const isVendor = ["Self Employed", "Daily Wage Worker"].includes(profile.occupation);
      if (!isVendor) {
        eligible = false;
        if (lang === "hi") reasons.push("यह ऋण विशेष रूप से रेहड़ी-पटरी वालों के लिए है। आपका व्यवसाय योग्य नहीं है।");
        else if (lang === "kn") reasons.push("ಈ ಸಾಲವು ಬೀದಿ ಬದಿ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಮಾತ್ರ ಮೀಸಲಾಗಿದೆ; ನಿಮ್ಮ ಉದ್ಯೋಗ ಇದಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.");
        else reasons.push("This loan is strictly intended for street vendors, hawkers, and micro-entrepreneurs. Your occupation status is not eligible.");
      } else {
        if (lang === "hi") reasons.push(`व्यवसाय "${profile.occupation}" माइक्रो-बिजनेस लोन श्रेणी के अंतर्गत आता है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ಉದ್ಯೋಗ "${profile.occupation}" ಕಿರು-ಸಾಲಕ್ಕೆ ಅರ್ಹವಾಗಿದೆ.`);
        else reasons.push(`Your occupational profile as a "${profile.occupation}" fits the category for micro-business loans.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmujjwala",
    name: {
      en: "Pradhan Mantri Ujjwala Yojana (PMUY)",
      hi: "प्रधानमंत्री उज्ज्वला योजना (PMUY)",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಉಜ್ವಲ ಯೋಜನೆ (PMUY)"
    },
    category: {
      en: "Women & Household",
      hi: "महिला और घरेलू",
      kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಮನೆ"
    },
    ministry: {
      en: "Ministry of Petroleum and Natural Gas",
      hi: "पेट्रोलियम और प्राकृतिक गैस मंत्रालय",
      kn: "ಪೆಟ್ರೋಲಿಯಂ ಮತ್ತು ನೈಸರ್ಗಿಕ ಅನಿಲ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Free LPG gas connection (cylinder + stove) to women from Below Poverty Line (BPL) households, along with a first refill at subsidized rate.",
      hi: "बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी गैस कनेक्शन (सिलेंडर + चूल्हा), और रियायती दरों पर रिफिल।",
      kn: "ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗಿರುವ (ಬಿಪಿಎಲ್) ಕುಟುಂಬದ ಮಹಿಳೆಗೆ ಉಚಿತ ಎಲ್‌ಪಿಜಿ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ (ಸಿಲಿಂಡರ್ + ಒಲೆ), ಮೊದಲ ರೀಫಿಲ್ ಉಚಿತ."
    },
    description: {
      en: "A scheme to provide clean cooking fuel (LPG) to women from BPL households, replacing hazardous fuels like firewood.",
      hi: "बीपीएल परिवारों की महिलाओं को स्वच्छ रसोई गैस प्रदान करने की योजना, ताकि स्वास्थ्य को नुकसान पहुंचाने वाले ईंधन जैसे लकड़ी को बदला जा सके।",
      kn: "ಮನೆಯ ಒಲೆ ಹೊಗೆಯಿಂದ ಬಾಣಲೆ ಆರೋಗ್ಯಕ್ಕೆ ಹಾನಿಯಾಗದಂತೆ ತಡೆಯಲು ಬಿಪಿಎಲ್ ಕುಟುಂಬದ ಮಹಿಳೆಯರಿಗೆ ಎಲ್‌ಪಿಜಿ ಒದಗಿಸುವ ಯೋಜನೆ."
    },
    applyUrl: "https://pmuy.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        if (lang === "hi") reasons.push("यह योजना विशेष रूप से महिला लाभार्थियों को लक्षित करती है।");
        else if (lang === "kn") reasons.push("ಈ ಯೋಜನೆಯು ಕೇವಲ ಮಹಿಳಾ ಫಲಾನುಭವಿಗಳಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿದೆ.");
        else reasons.push("This scheme specifically targets women as the primary beneficiary.");
      } else {
        if (lang === "hi") reasons.push("आप महिला हैं - यह योजना महिला लाभार्थियों के लिए ही तैयार की गई है।");
        else if (lang === "kn") reasons.push("ನೀವು ಮಹಿಳೆಯಾಗಿದ್ದೀರಿ - ಈ ಯೋಜನೆಗೆ ಇದು ಕಡ್ಡಾಯ.");
        else reasons.push("You are a woman — this scheme is designed for female beneficiaries.");
      }
      if (profile.income > 150000) {
        eligible = false;
        if (lang === "hi") reasons.push("पारिवारिक आय ₹1,50,000/वर्ष से कम होनी चाहिए (बीपीएल सीमा)।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹1,50,000 ಕ್ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು (BPL ಮಿತಿ).");
        else reasons.push("Annual family income must be below ₹1,50,000 (BPL category) to qualify.");
      } else {
        if (lang === "hi") reasons.push("आपकी आय बीपीएल सीमा के अंतर्गत है।");
        else if (lang === "kn") reasons.push("ನಿಮ್ಮ ಆದಾಯವು ಬಿಪಿಎಲ್ ಮಿತಿಯೊಳಗಿದೆ.");
        else reasons.push(`Annual income of ₹${Number(profile.income).toLocaleString('en-IN')} qualifies under the BPL threshold.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "pmmvy",
    name: {
      en: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
      hi: "प्रधानमंत्री मातृ वंदना योजना (PMMVY)",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಮಾತೃ ವಂದನಾ ಯೋಜನೆ (PMMVY)"
    },
    category: {
      en: "Women & Maternity",
      hi: "महिला और मातृत्व",
      kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಮಾತೃತ್ವ"
    },
    ministry: {
      en: "Ministry of Women and Child Development",
      hi: "महिला एवं बाल विकास मंत्रालय",
      kn: "ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Cash incentive of ₹6,00,000 paid in three installments to pregnant and lactating mothers for their first child, compensating for wage loss.",
      hi: "गर्भवती और स्तनपान कराने वाली माताओं को पहले बच्चे के लिए तीन किस्तों में ₹6,000 नकद प्रोत्साहन राशि, मजदूरी के नुकसान की भरपाई के लिए।",
      kn: "ಗರ್ಭಿಣಿ ಮತ್ತು ಹಾಲುಣಿಸುವ ತಾಯಂದಿರಿಗೆ ಮೊದಲ ಮಗುವಿನ ಹೆರಿಗೆಗೆ ₹6,000 ನಗದು ಪ್ರೋತ್ಸಾಹಧನ, ಹೆರಿಗೆ ಸಮಯದ ವೇತನ ನಷ್ಟದ ಪರಿಹಾರಕ್ಕಾಗಿ."
    },
    description: {
      en: "A maternity benefit scheme for all pregnant women and lactating mothers who are 19 years of age or above, for the first child in the family.",
      hi: "19 वर्ष या उससे अधिक आयु की सभी गर्भवती महिलाओं और स्तनपान कराने वाली माताओं के लिए पहले बच्चे के लिए एक मातृत्व लाभ योजना।",
      kn: "ಕುಟುಂಬದ ಮೊದಲ ಹೆರಿಗೆಗೆ 19 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಗರ್ಭಿಣಿ ಮತ್ತು ಬಾಣಂತಿ ತಾಯಂದಿರಿಗಾಗಿ ಜಾರಿಗೆ ತಂದ ಮಾತೃತ್ವ ಸೌಲಭ್ಯ ಯೋಜನೆ."
    },
    applyUrl: "https://pmmvy.wcd.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        if (lang === "hi") reasons.push("यह मातृत्व लाभ योजना केवल महिलाओं के लिए लागू है।");
        else if (lang === "kn") reasons.push("ಈ ಹೆರಿಗೆ ಸೌಲಭ್ಯ ಯೋಜನೆ ಕೇವಲ ಮಹಿಳೆಯರಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ.");
        else reasons.push("This maternity benefit scheme is only applicable to women.");
      } else {
        if (lang === "hi") reasons.push("आप महिला हैं, जो इस योजना के लिए आवश्यक है।");
        else if (lang === "kn") reasons.push("ನೀವು ಮಹಿಳೆಯಾಗಿದ್ದೀರಿ, ಇದು ಯೋಜನೆಗೆ ಅಗತ್ಯವಾಗಿದೆ.");
        else reasons.push("You are female, which is required for this maternity scheme.");
      }
      const ageNum = Number(profile.age);
      if (ageNum < 19) {
        eligible = false;
        if (lang === "hi") reasons.push(`आपकी आयु ${ageNum} वर्ष है। न्यूनतम आयु 19 वर्ष होनी चाहिए।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು ${ageNum}. ಈ ಯೋಜನೆಗೆ ಕನಿಷ್ಠ 19 ವರ್ಷ ತುಂಬಿರಬೇಕು.`);
        else reasons.push(`Your age is ${ageNum}. The minimum age for PMMVY is 19 years.`);
      } else {
        if (lang === "hi") reasons.push(`आपकी आयु (${ageNum}) न्यूनतम 19 वर्ष की शर्त को पूरा करती है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು (${ageNum}) ಕನಿಷ್ಠ 19 ವರ್ಷದ ಮಿತಿಯನ್ನು ಪೂರೈಸಿದೆ.`);
        else reasons.push(`Your age (${ageNum}) meets the minimum age of 19 for this scheme.`);
      }
      if (profile.maritalStatus === "Unmarried") {
        eligible = false;
        if (lang === "hi") reasons.push("यह योजना विवाहित, विधवा या तलाकशुदा महिलाओं के लिए है।");
        else if (lang === "kn") reasons.push("ಈ ಯೋಜನೆಯು ವಿವಾಹಿತ, ವಿಧವೆ ಅಥವಾ ವಿಚ್ಛೇದಿತ ಮಹಿಳೆಯರಿಗೆ ಮಾತ್ರ.");
        else reasons.push("This scheme is for married, widowed, or divorced women with a child.");
      } else {
        if (lang === "hi") reasons.push("आपकी वैवाहिक स्थिति इस मातृत्व योजना के लिए पात्र है।");
        else if (lang === "kn") reasons.push("ನಿಮ್ಮ ವೈವಾಹಿಕ ಸ್ಥಿತಿಯು ಈ ಯೋಜನೆಗೆ ಸೂಕ್ತವಾಗಿದೆ.");
        else reasons.push("Your marital status is eligible for this maternity scheme.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "ssy",
    name: {
      en: "Sukanya Samriddhi Yojana (SSY)",
      hi: "सुकन्या समृद्धि योजना (SSY)",
      kn: "ಸುಕನ್ಯಾ ಸಮೃದ್ಧಿ ಯೋಜನೆ (SSY)"
    },
    category: {
      en: "Women & Girl Child",
      hi: "महिला और बालिका",
      kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಹೆಣ್ಣು ಮಗು"
    },
    ministry: {
      en: "Ministry of Finance",
      hi: "वित्त मंत्रालय",
      kn: "ಹಣಕಾಸು सಚಿವಾಲಯ"
    },
    benefits: {
      en: "High-interest savings account (8.2% per annum) for a girl child under 10, matures in 21 years to fund higher education and marriage.",
      hi: "10 वर्ष से कम उम्र की बेटी के लिए उच्च-ब्याज बचत खाता (8.2% वार्षिक), जो उच्च शिक्षा और विवाह के लिए 21 वर्षों में परिपक्व होता है।",
      kn: "10 ವರ್ಷದೊಳಗಿನ ಹೆಣ್ಣು ಮಗುವಿನ ಹೆಸರಿನಲ್ಲಿ ಹೆಚ್ಚಿನ ಬಡ್ಡಿ ದರದ ಉಳಿತಾಯ ಖಾತೆ (ವಾರ್ಷಿಕ 8.2%), ಶಿಕ್ಷಣ ಮತ್ತು ಮದುವೆಗೆ ಹಣಕಾಸಿನ ನೆರವು ನೀಡುತ್ತದೆ."
    },
    description: {
      en: "A small savings scheme under the 'Beti Bachao Beti Padhao' campaign to build a secure financial future for a girl child.",
      hi: "'बेटी बचाओ बेटी पढ़ाओ' अभियान के तहत एक छोटी बचत योजना, जिसका उद्देश्य बालिकाओं का भविष्य सुरक्षित करना है।",
      kn: "ಹೆಣ್ಣು ಮಗುವಿನ ಸುರಕ್ಷಿತ ಆರ್ಥಿಕ ಭವಿಷ್ಯಕ್ಕಾಗಿ 'ಬೇಟಿ ಬಚಾವೋ ಬೇಟಿ ಪಢಾವೋ' ಅಭಿಯಾನದ ಅಡಿಯಲ್ಲಿ ಜಾರಿಗೆ ತಂದ ಸಣ್ಣ ಉಳಿತಾಯ ಯೋಜನೆ."
    },
    applyUrl: "https://www.indiapost.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.hasDaughter !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("यह योजना विशेष रूप से 10 वर्ष से कम आयु की बेटी के माता-पिता या अभिभावकों के लिए है।");
        else if (lang === "kn") reasons.push("ಈ ಯೋಜನೆಯು ಕೇವಲ 10 ವರ್ಷದೊಳಗಿನ ಹೆಣ್ಣು ಮಗುವನ್ನು ಹೊಂದಿರುವ ಪೋಷಕರಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ.");
        else reasons.push("This scheme is exclusively for parents or guardians who have a girl child below 10 years of age.");
      } else {
        if (lang === "hi") reasons.push("आपके पास बेटी है, आप उनके नाम पर सुकन्या समृद्धि खाता खोल सकते हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಹೆಣ್ಣು ಮಗಳನ್ನು ಹೊಂದಿದ್ದೀರಿ, ಆದ್ದರಿಂದ ಅವಳ ಹೆಸರಿನಲ್ಲಿ ಖಾತೆ ತೆರೆಯಬಹುದು.");
        else reasons.push("You have a girl child and can open a Sukanya Samriddhi account in her name.");
      }

      if (lang === "hi") reasons.push("किसी भी डाकघर या बैंक में खोला जा सकता है। वार्षिक ब्याज 8.2% पूरी तरह से कर-मुक्त है।");
      else if (lang === "kn") reasons.push("ಯಾವುದೇ ಅಂಚೆ ಕಚೇರಿ ಅಥವಾ ಬ್ಯಾಂಕಿನಲ್ಲಿ ತೆರೆಯಬಹುದು. ಶೇ. 8.2 ರಷ್ಟು ಬಡ್ಡಿ ಸಂಪೂರ್ಣ ತೆರಿಗೆ ಮುಕ್ತವಾಗಿದೆ.");
      else reasons.push("Can be opened at any post office or authorized bank. The account earns 8.2% annual interest, fully tax-free.");

      return { eligible, reasons };
    }
  },
  {
    id: "mssc",
    name: {
      en: "Mahila Samman Savings Certificate (MSSC)",
      hi: "महिला सम्मान बचत पत्र (MSSC)",
      kn: "ಮಹಿಳಾ ಸಮ್ಮಾನ್ ಉಳಿತಾಯ ಪ್ರಮಾಣಪತ್ರ (MSSC)"
    },
    category: {
      en: "Women & Savings",
      hi: "महिला और बचत",
      kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಉಳಿತಾಯ"
    },
    ministry: {
      en: "Ministry of Finance",
      hi: "वित्त मंत्रालय",
      kn: "ಹಣಕಾಸು ಸಚಿವಾಲಯ"
    },
    benefits: {
      en: "Fixed 7.5% annual interest on deposits up to ₹2 lakh, safe government-backed savings option with a 2-year tenure.",
      hi: "₹2 लाख तक की जमा राशि पर निश्चित 7.5% वार्षिक ब्याज, 2 साल की अवधि के साथ सुरक्षित सरकारी बचत विकल्प।",
      kn: "₹2 ಲಕ್ಷದವರೆಗಿನ ಠೇವಣಿ ಮೇಲೆ ಸ್ಥಿರ 7.5% ವಾರ್ಷಿಕ ಬಡ್ಡಿ, 2 ವರ್ಷಗಳ ಅವಧಿಯ ಸುರಕ್ಷಿತ ಸರ್ಕಾರಿ ಉಳಿತಾಯ ಯೋಜನೆ."
    },
    description: {
      en: "A one-time government savings scheme introduced in 2023 specifically for women and girls to promote savings.",
      hi: "महिलाओं और लड़कियों के लिए बचत को बढ़ावा देने हेतु 2023 में शुरू की गई एकमुश्त सरकारी बचत योजना।",
      kn: "ಮಹಿಳೆಯರಲ್ಲಿ ಉಳಿತಾಯ ಮನೋಭಾವವನ್ನು ಬೆಳೆಸಲು 2023 ರಲ್ಲಿ ಜಾರಿಗೆ ತಂದ ಮಹಿಳೆಯರಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾದ ಉಳಿತಾಯ ಯೋಜನೆ."
    },
    applyUrl: "https://www.indiapost.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        if (lang === "hi") reasons.push("यह बचत प्रमाण पत्र विशेष रूप से महिलाओं और लड़कियों के लिए है।");
        else if (lang === "kn") reasons.push("ಈ ಉಳಿತಾಯ ಪ್ರಮಾಣಪತ್ರವು ಕೇವลು ಮಹಿಳೆಯರಿಗೆ ಮತ್ತು ಹೆಣ್ಣು ಮಕ್ಕಳಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿದೆ.");
        else reasons.push("This savings certificate is exclusively for women and girls.");
      } else {
        if (lang === "hi") reasons.push("आप महिला हैं, जिससे आप सीधे यह खाता खोलने की पात्र हो जाती हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಮಹಿಳೆಯಾಗಿದ್ದೀರಿ, ಆದ್ದರಿಂದ ನೇರವಾಗಿ ಈ ಯೋಜನೆಗೆ ಅರ್ಹರಾಗುತ್ತೀರಿ.");
        else reasons.push("You are female, making you directly eligible to open this savings account.");
      }

      if (lang === "hi") reasons.push("डाकघरों और नामित बैंकों में उपलब्ध। कोई आय सीमा नहीं - सभी महिलाओं के लिए खुला है।");
      else if (lang === "kn") reasons.push("ಅಂಚೆ ಕಚೇರಿಗಳು ಮತ್ತು ಬ್ಯಾಂಕುಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ. ಯಾವುದೇ ಆದಾಯ ಮಿತಿ ಇರುವುದಿಲ್ಲ.");
      else reasons.push("Available at post offices and designated banks. No income limit — open to all women.");

      return { eligible, reasons };
    }
  },
  {
    id: "standupmudra",
    name: {
      en: "Stand Up India / PM MUDRA Yojana for Women",
      hi: "स्टैंड अप इंडिया / महिलाओं के लिए पीएम मुद्रा योजना",
      kn: "ಸ್ಟ್ಯಾಂಡ್ ಅಪ್ ಇಂಡಿಯಾ / ಮಹಿಳೆಯರಿಗಾಗಿ ಪಿಎಂ ಮುದ್ರಾ ಯೋಜನೆ"
    },
    category: {
      en: "Women & Business",
      hi: "महिला और व्यवसाय",
      kn: "ಮಹಿಳೆಯರು ಮತ್ತು ಉದ್ಯಮ"
    },
    ministry: {
      en: "Ministry of Finance / SIDBI",
      hi: "वित्त मंत्रालय / सिडबी (SIDBI)",
      kn: "ಹಣಕಾಸು ಸಚಿವಾಲಯ / ಸಿಡ್ಬಿ (SIDBI)"
    },
    benefits: {
      en: "Collateral-free business loans from ₹10,000 up to ₹1 crore specifically for women entrepreneurs to start a new enterprise.",
      hi: "महिला उद्यमियों के लिए विशेष रूप से नया उद्यम शुरू करने के लिए ₹10,000 से लेकर ₹1 करोड़ तक के संपार्श्विक-मुक्त (बिना गारंटी) ऋण।",
      kn: "ಮಹಿಳಾ ಉದ್ಯಮಿಗಳು ಹೊಸ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ₹10,000 ರಿಂದ ₹1 ಕೋಟಿವರೆಗಿನ ಗ್ಯಾರಂಟಿ ರಹಿತ ವ್ಯವಹಾರ ಸಾಲಗಳು."
    },
    description: {
      en: "Flagship loan schemes to empower women entrepreneurs: Micro-loans (Mudra) and startup loans (Stand Up India).",
      hi: "महिला उद्यमियों को सशक्त बनाने के लिए ऋण योजनाएं: सूक्ष्म ऋण (Mudra) और स्टार्टअप ऋण (Stand Up India)।",
      kn: "ಮಹಿಳಾ ಉದ್ಯಮಿಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸಲು ಕಿರು ಸಾಲಗಳು (ಮುದ್ರಾ) ಮತ್ತು ಹೊಸ ಉದ್ಯಮ ಸಾಲಗಳು (ಸ್ಟ್ಯಾಂಡ್ ಅಪ್ ಇಂಡಿಯಾ)."
    },
    applyUrl: "https://www.mudra.org.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        if (lang === "hi") reasons.push("यह ऋण योजना मुख्य रूप से महिलाओं और एससी/एसटी वर्ग के उद्यमियों को प्राथमिकता देती है।");
        else if (lang === "kn") reasons.push("ಈ ಸಾಲ ಯೋಜನೆಗಳು ಮಹಿಳೆಯರು ಮತ್ತು ಪರಿಶಿಷ್ಟ ಜಾತಿ/ಪಂಗಡದ ಉದ್ಯಮಿಗಳಿಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತವೆ.");
        else reasons.push("These loan schemes prioritize women, SC/ST, and minority entrepreneurs.");
      } else {
        if (lang === "hi") reasons.push("एक महिला के रूप में, आप मुद्रा और स्टैंड अप इंडिया ऋण के लिए प्राथमिकता प्राप्त आवेदक हैं।");
        else if (lang === "kn") reasons.push("ಮಹಿಳೆಯಾಗಿ, ನೀವು ಈ ಸಾಲಗಳಿಗೆ ಆದ್ಯತೆಯ ಅರ್ಜಿದಾರರಾಗಿದ್ದೀರಿ.");
        else reasons.push("As a woman, you are a priority applicant for MUDRA and Stand Up India loans.");
      }

      const selfOrHousewife = ["Self Employed", "Housewife", "Daily Wage Worker", "Unemployed"].includes(profile.occupation);
      if (!selfOrHousewife) {
        if (lang === "hi") reasons.push("नोट: ये ऋण अपना खुद का छोटा व्यवसाय शुरू करने या चलाने के लिए सर्वोत्तम रूप से उपयुक्त हैं।");
        else if (lang === "kn") reasons.push("ಗಮನಿಸಿ: ನಿಮ್ಮದೇ ಆದ ಸ್ವಂತ ಉದ್ಯಮ ಪ್ರಾರಂಭಿಸಲು ಈ ಸಾಲಗಳು ಹೆಚ್ಚು ಸೂಕ್ತವಾಗಿವೆ.");
        else reasons.push("Note: These loans are best suited for starting or running a self-owned micro, small, or medium business.");
      } else {
        if (lang === "hi") reasons.push(`व्यवसाय स्थिति "${profile.occupation}" मुद्रा ऋण आवेदन के लिए आदर्श है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ಉದ್ಯೋಗ ಸ್ಥಿತಿ "${profile.occupation}" ಮುದ್ರಾ ಸಾಲಕ್ಕೆ ಪೂರಕವಾಗಿದೆ.`);
        else reasons.push(`Your occupation status as "${profile.occupation}" is ideal for applying for a MUDRA startup loan.`);
      }

      return { eligible, reasons };
    }
  },
  {
    id: "gruhalakshmi",
    name: {
      en: "Gruha Lakshmi Scheme (Karnataka)",
      hi: "गृह लक्ष्मी योजना (कर्नाटक)",
      kn: "ಗೃಹ ಲಕ್ಷ್ಮಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)"
    },
    category: {
      en: "State Schemes - Women",
      hi: "राज्य योजनाएं - महिला",
      kn: "ರಾಜ್ಯ ಯೋಜನೆಗಳು - ಮಹಿಳೆಯರು"
    },
    ministry: {
      en: "Department of Women and Child Development, Government of Karnataka",
      hi: "महिला एवं बाल विकास विभाग, कर्नाटक सरकार",
      kn: "ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ"
    },
    benefits: {
      en: "Direct monthly financial assistance of ₹2,000 transferred into the bank account of the woman head of a household.",
      hi: "परिवार की महिला मुखिया के बैंक खाते में सीधे ₹2,000 की मासिक वित्तीय सहायता।",
      kn: "ಕುಟುಂಬದ ಯಜಮಾನಿ (ಮಹಿಳಾ ಮುಖ್ಯಸ್ಥೆ) ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರವಾಗಿ ತಿಂಗಳಿಗೆ ₹2,000 ಹಣ ವರ್ಗಾವಣೆ."
    },
    description: {
      en: "A flagship welfare scheme of the Government of Karnataka to support female heads of families, promoting gender equality.",
      hi: "कर्नाटक सरकार की एक प्रमुख कल्याणकारी योजना जो महिला मुखियाओं को वित्तीय सहायता प्रदान कर लैंगिक समानता को बढ़ावा देती है।",
      kn: "ಕುಟುಂಬದ ಮಹಿಳಾ ಮುಖ್ಯಸ್ಥರನ್ನು ಬೆಂಬಲಿಸಲು ಮತ್ತು ಲಿಂಗ ಸಮಾನತೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಕಲ್ಯಾಣ ಯೋಜನೆ."
    },
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल कर्नाटक के निवासी ही इस राज्य योजना के लिए पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕರ್ನಾಟಕದ ನಿವಾಸಿಗಳು ಮಾತ್ರ ಈ ರಾಜ್ಯ ಯೋಜನೆಗೆ ಅರ್ಹರು.");
        else reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        if (lang === "hi") reasons.push("आप कर्नाटक के निवासी हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿದ್ದೀರಿ.");
        else reasons.push("You are a resident of Karnataka.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        if (lang === "hi") reasons.push("यह योजना विशेष रूप से परिवार की महिला मुखिया के लिए है।");
        else if (lang === "kn") reasons.push("ಈ ಯೋಜನೆಯು ಕೇವಲ ಕುಟುಂಬದ ಮಹಿಳಾ ಯಜಮಾನಿಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿದೆ.");
        else reasons.push("This scheme is exclusively for the woman head of the household.");
      } else {
        if (lang === "hi") reasons.push("आप महिला हैं, जो इस योजना के लिए अनिवार्य है।");
        else if (lang === "kn") reasons.push("ನೀವು ಮಹಿಳೆಯಾಗಿದ್ದೀರಿ, ಇದು ಯೋಜನೆಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.");
        else reasons.push("You are female, matching the target demographic.");
      }
      if (profile.income > 200000) {
        eligible = false;
        if (lang === "hi") reasons.push("पारिवारिक आय ₹2,00,000/वर्ष से अधिक है (जीएसटी और आयकर दाता बाहर हैं)।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ₹2,00,000 ಮೀರಿದೆ (ಜಿಎಸ್‌ಟಿ ಮತ್ತು ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರನ್ನು ಹೊರಗಿಡಲಾಗಿದೆ).");
        else reasons.push("Family income exceeds ₹2,00,000/year (GST and Income Tax payers are excluded).");
      } else {
        if (lang === "hi") reasons.push("पारिवारिक आय कर-मुक्त सीमा के भीतर है।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ಆದಾಯವು ತೆರಿಗೆ ರಹಿತ ಮಿತಿಯೊಳಗಿದೆ.");
        else reasons.push("Family income is within the eligible threshold for non-taxpaying households.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "gruhajyothi",
    name: {
      en: "Gruha Jyothi Scheme (Karnataka)",
      hi: "गृह ज्योति योजना (कर्नाटक)",
      kn: "ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)"
    },
    category: {
      en: "State Schemes - Electricity",
      hi: "राज्य योजनाएं - बिजली",
      kn: "ರಾಜ್ಯ ಯೋಜನೆಗಳು - ವಿದ್ಯುತ್"
    },
    ministry: {
      en: "Department of Energy, Government of Karnataka",
      hi: "ऊर्जा विभाग, कर्नाटक सरकार",
      kn: "ಇಂಧನ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ"
    },
    benefits: {
      en: "Free domestic electricity supply of up to 200 units per month for all residential households in Karnataka.",
      hi: "कर्नाटक के सभी आवासीय घरों के लिए प्रति माह 200 यूनिट तक मुफ्त बिजली।",
      kn: "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಗೃಹಬಳಕೆಯ ಗ್ರಾಹಕರಿಗೆ ತಿಂಗಳಿಗೆ 200 ಯೂನಿಟ್‌ಗಳವರೆಗೆ ಉಚಿತ ವಿದ್ಯುತ್ ಪೂರೈಕೆ."
    },
    description: {
      en: "Provides electricity bill relief to domestic consumers in Karnataka whose average consumption is less than 200 units.",
      hi: "कर्नाटक में घरेलू उपभोक्ताओं को बिजली बिल से राहत प्रदान करना, जिनकी औसत खपत 200 यूनिट से कम है।",
      kn: "200 ಯೂನಿಟ್‌ಗಳಿಗಿಂತ ಕಡಿಮೆ ವಿದ್ಯುತ್ ಬಳಸುವ ಕರ್ನಾಟಕದ ಗೃಹಬಳಕೆದಾರರಿಗೆ ವಿದ್ಯುತ್ ಬಿಲ್ ಕಡಿತಗೊಳಿಸುವ ಯೋಜನೆ."
    },
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल कर्नाटक के निवासी ही इस योजना के लिए पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕರ್ನಾಟಕದ ನಿವಾಸಿಗಳು ಮಾತ್ರ ಈ ಯೋಜನೆಗೆ ಅರ್ಹರು.");
        else reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        if (lang === "hi") reasons.push("आप कर्नाटक में रहते हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೀರಿ.");
        else reasons.push("You reside in Karnataka.");
      }

      if (lang === "hi") reasons.push("कर्नाटक के सभी घरेलू उपभोक्ता जो 200 यूनिट से कम बिजली की खपत करते हैं, पात्र हैं।");
      else if (lang === "kn") reasons.push("ತಿಂಗಳಿಗೆ 200 ಯೂನಿಟ್‌ಗಿಂತ ಕಡಿಮೆ ಬಳಸುವ ಎಲ್ಲಾ ಗೃಹ ಬಳಕೆದಾರರು ಅರ್ಹರಾಗಿದ್ದಾರೆ.");
      else reasons.push("All domestic consumers in Karnataka consuming less than 200 units are eligible.");

      return { eligible, reasons };
    }
  },
  {
    id: "yuvanidhi",
    name: {
      en: "Yuva Nidhi Scheme (Karnataka)",
      hi: "युवा निधि योजना (कर्नाटक)",
      kn: "ಯುವ ನಿಧಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)"
    },
    category: {
      en: "State Schemes - Youth",
      hi: "राज्य योजनाएं - युवा",
      kn: "ರಾಜ್ಯ ಯೋಜನೆಗಳು - ಯುವಜನರು"
    },
    ministry: {
      en: "Department of Skill Development, Entrepreneurship and Livelihood, Karnataka",
      hi: "कौशल विकास, उद्यमिता और आजीविका विभाग, कर्नाटक",
      kn: "ಕೌಶಲ್ಯಾಭಿವೃದ್ಧಿ, ಉದ್ಯಮಶೀಲತೆ ಮತ್ತು ಜೀವನೋಪಾಯ ಇಲಾಖೆ, ಕರ್ನಾಟಕ"
    },
    benefits: {
      en: "Monthly unemployment allowance of ₹3,000 (for graduates) and ₹1,500 (for diploma holders) for up to 2 years.",
      hi: "डिग्री धारकों के लिए ₹3,000 और डिप्लोमा धारकों के लिए ₹1,500 प्रति माह बेरोजगारी भत्ता (अधिकतम 2 वर्ष तक)।",
      kn: "ನಿರುದ್ಯೋಗಿ ಪದವೀಧರರಿಗೆ ಮಾಸಿಕ ₹3,000 ಮತ್ತು ಡಿಪ್ಲೋಮಾ ಹೊಂದಿದವರಿಗೆ ಮಾಸಿಕ ₹1,500 ನಿರುದ್ಯೋಗ ಭತ್ಯೆ (ಗರಿಷ್ಠ 2 ವರ್ಷಗಳವರೆಗೆ)."
    },
    description: {
      en: "Financial assistance for educated unemployed youth of Karnataka to support their search for career opportunities.",
      hi: "कर्नाटक के शिक्षित बेरोजगार युवाओं को उनके करियर के अवसरों की खोज में मदद करने के लिए वित्तीय सहायता।",
      kn: "ಕರ್ನಾಟಕದ ವಿದ್ಯಾವಂತ ನಿರುದ್ಯೋಗಿ ಯುವಕರು ಉದ್ಯೋಗ ಕಂಡುಕೊಳ್ಳಲು ನೆರವಾಗುವಂತೆ ನೀಡಲಾಗುವ ಆರ್ಥಿಕ ಸಹಾಯಧನ."
    },
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल कर्नाटक के निवासी ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕರ್ನಾಟಕದ ನಿವಾಸಿಗಳು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        if (lang === "hi") reasons.push("आप कर्नाटक में रहते हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೀರಿ.");
        else reasons.push("You reside in Karnataka.");
      }
      const ageNum = Number(profile.age);
      if (ageNum < 21 || ageNum > 30) {
        eligible = false;
        if (lang === "hi") reasons.push(`आपकी आयु ${ageNum} वर्ष है। यह योजना केवल 21 से 30 वर्ष के युवाओं के लिए है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ವಯಸ್ಸು ${ageNum}. ಈ ಯೋಜನೆಗೆ ವಯಸ್ಸಿನ ಮಿತಿ 21 ರಿಂದ 30 ವರ್ಷಗಳು.`);
        else reasons.push(`Your age is ${ageNum}. This scheme is only for youth aged 21 to 30 years.`);
      } else {
        if (lang === "hi") reasons.push("आपकी आयु 21-30 वर्ष की पात्रता सीमा में आती है।");
        else if (lang === "kn") reasons.push("ನಿಮ್ಮ ವಯಸ್ಸು 21-30 ರ ಅರ್ಹ ವಯೋಮಿತಿಯಲ್ಲಿದೆ.");
        else reasons.push("Your age is within the eligible range of 21-30 years.");
      }
      if (!["Unemployed", "Student"].includes(profile.occupation)) {
        eligible = false;
        if (lang === "hi") reasons.push(`व्यवसाय "${profile.occupation}" के कारण अपात्र; युवा निधि के लिए बेरोजगार होना आवश्यक है।`);
        else if (lang === "kn") reasons.push(`ನಿಮ್ಮ ಉದ್ಯೋಗ ಸ್ಥಿತಿ "${profile.occupation}". ಈ ಯೋಜನೆಗೆ ನಿರುದ್ಯೋಗಿಯಾಗಿರಬೇಕು.`);
        else reasons.push(`Your occupation is "${profile.occupation}". You must be unemployed to claim Yuva Nidhi.`);
      } else {
        if (lang === "hi") reasons.push("आप बेरोजगार या छात्र के रूप में पंजीकृत हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ನಿರುದ್ಯೋಗಿ ಅಥವಾ ವಿದ್ಯಾರ್ಥಿ ಎಂದು ನೋಂದಾಯಿಸಲಾಗಿದೆ.");
        else reasons.push("You are registered as unemployed or studying.");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "shakticard",
    name: {
      en: "Shakti Scheme (Karnataka)",
      hi: "शक्ति योजना (कर्नाटक)",
      kn: "ಶಕ್ತಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)"
    },
    category: {
      en: "State Schemes - Transport",
      hi: "राज्य योजनाएं - परिवहन",
      kn: "ರಾಜ್ಯ ಯೋಜನೆಗಳು - ಸಾರಿಗೆ"
    },
    ministry: {
      en: "Department of Transport, Government of Karnataka",
      hi: "परिवहन विभाग, कर्नाटक सरकार",
      kn: "ಸಾರಿಗೆ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ"
    },
    benefits: {
      en: "Free travel in state-run road transport corporation buses (ordinary, express, BMTC, etc.) within Karnataka.",
      hi: "कर्नाटक के भीतर राज्य सरकार द्वारा संचालित बसों (साधारण, एक्सप्रेस, BMTC आदि) में मुफ्त यात्रा।",
      kn: "ಕರ್ನಾಟಕದೊಳಗೆ ಓಡಾಡುವ ಸರ್ಕಾರಿ ಸಾರಿಗೆ ಬಸ್‌ಗಳಲ್ಲಿ (ಸಾಮಾನ್ಯ, ಎಕ್ಸ್‌ಪ್ರೆಸ್, ಬಿಎಂಟಿಸಿ ಇತ್ಯಾದಿ) ಉಚಿತ ಪ್ರಯಾಣದ ಸೌಲಭ್ಯ."
    },
    description: {
      en: "Enables free public transport for women and transgender residents of Karnataka, enhancing access to education and jobs.",
      hi: "कर्नाटक की महिलाओं और ट्रांसजेंडर निवासियों के लिए मुफ्त सार्वजनिक परिवहन की सुविधा, शिक्षा और नौकरी तक पहुंच बढ़ाना।",
      kn: "ಕರ್ನಾಟಕದ ಮಹಿಳೆಯರು ಮತ್ತು ತೃತೀಯ ಲಿಂಗಿಗಳಿಗೆ ಉಚಿತ ಪ್ರಯಾಣ ಒದಗಿಸುವ ಮೂಲಕ ಉದ್ಯೋಗ ಮತ್ತು ಶಿಕ್ಷಣಕ್ಕೆ ನೆರವಾಗುವ ಯೋಜನೆ."
    },
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल कर्नाटक के निवासी ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕರ್ನಾಟಕದ ನಿವಾಸಿಗಳು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        if (lang === "hi") reasons.push("आप कर्नाटक में रहते हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೀರಿ.");
        else reasons.push("You reside in Karnataka.");
      }
      if (profile.gender !== "Female") {
        eligible = false;
        if (lang === "hi") reasons.push("यह योजना केवल महिला और ट्रांसजेंडर निवासियों के लिए है।");
        else if (lang === "kn") reasons.push("ಈ ಯೋಜನೆಯು ಕೇವಲ ಮಹಿಳಾ ಮತ್ತು ತೃತೀಯಲಿಂಗಿಗಳಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ.");
        else reasons.push("This scheme is exclusively for female and transgender residents.");
      } else {
        if (lang === "hi") reasons.push("आप लिंग मानदंड (महिला) को पूरा करती हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಮಹಿಳಾ ಫಲಾನುಭವಿಯಾಗಿದ್ದೀರಿ.");
        else reasons.push("You match the gender criteria (Female).");
      }

      return { eligible, reasons };
    }
  },
  {
    id: "annabhagya",
    name: {
      en: "Anna Bhagya Scheme (Karnataka)",
      hi: "अन्न भाग्य योजना (कर्नाटक)",
      kn: "ಅನ್ನಭಾಗ್ಯ ಯೋಜನೆ (ಕರ್ನಾಟಕ)"
    },
    category: {
      en: "State Schemes - Food Security",
      hi: "राज्य योजनाएं - खाद्य सुरक्षा",
      kn: "ರಾಜ್ಯ ಯೋಜನೆಗಳು - ಆಹಾರ ಭದ್ರತೆ"
    },
    ministry: {
      en: "Food, Civil Supplies & Consumer Affairs Department, Karnataka",
      hi: "खाद्य, नागरिक आपूर्ति और उपभोक्ता मामले विभाग, कर्नाटक",
      kn: "ಆಹಾರ, ನಾಗರಿಕ ಸರಬರಾಜು ಮತ್ತು ಗ್ರಾಹಕ ವ್ಯವಹಾರಗಳ ಇಲಾಖೆ, ಕರ್ನಾಟಕ"
    },
    benefits: {
      en: "Free 10 kg food grains (or 5 kg rice + cash in lieu of the remaining 5 kg at ₹34/kg) per person per month to BPL and Antyodaya card holders.",
      hi: "बीपीएल और अंत्योदय कार्ड धारकों को प्रति व्यक्ति प्रति माह 10 किलो मुफ्त खाद्यान्न (या 5 किलो चावल + शेष 5 किलो के बदले ₹34/किग्रा की दर से नकद)।",
      kn: "ಬಿಪಿಎಲ್ ಮತ್ತು ಅಂತ್ಯೋದಯ ಕಾರ್ಡ್‌ದಾರರಿಗೆ ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ತಿಂಗಳಿಗೆ 10 ಕೆಜಿ ಆಹಾರ ಧಾನ್ಯ (ಅಥವಾ 5 ಕೆಜಿ ಅಕ್ಕಿ + ಉಳಿದ 5 ಕೆಜಿಗೆ ತಲಾ ₹170 ಹಣ ವರ್ಗಾವಣೆ)."
    },
    description: {
      en: "Karnataka state government food security program ensuring malnutrition-free households by providing food grains or direct cash transfer.",
      hi: "कर्नाटक सरकार का खाद्य सुरक्षा कार्यक्रम जो खाद्यान्न या प्रत्यक्ष नकद हस्तांतरण प्रदान कर कुपोषण मुक्त घरों को सुनिश्चित करता है।",
      kn: "ಆಹಾರ ಧಾನ್ಯ ಅಥವಾ ನೇರ ನಗದು ವರ್ಗಾವಣೆಯ ಮೂಲಕ ಬಡ ಕುಟುಂಬಗಳಲ್ಲಿ ಅಪೌಷ್ಟಿಕತೆ ನಿವಾರಿಸಲು ತಂದ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಆಹಾರ ಭದ್ರತಾ ಯೋಜನೆ."
    },
    applyUrl: "https://sevasindhu.karnataka.gov.in/",
    checkEligibility: (profile, lang = "en") => {
      const reasons = [];
      let eligible = true;

      if (profile.nationality !== "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल भारतीय नागरिक ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕೇವಲ ಭಾರತೀಯ ನಾಗರಿಕರು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only Indian citizens are eligible.");
      }
      if (profile.state !== "Karnataka") {
        eligible = false;
        if (lang === "hi") reasons.push("केवल कर्नाटक के निवासी ही पात्र हैं।");
        else if (lang === "kn") reasons.push("ಕರ್ನಾಟಕದ ನಿವಾಸಿಗಳು ಮಾತ್ರ ಅರ್ಹರು.");
        else reasons.push("Only residents of Karnataka are eligible for this state scheme.");
      } else {
        if (lang === "hi") reasons.push("आप कर्नाटक में रहते हैं।");
        else if (lang === "kn") reasons.push("ನೀವು ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೀರಿ.");
        else reasons.push("You reside in Karnataka.");
      }
      if (profile.income > 120000) {
        eligible = false;
        if (lang === "hi") reasons.push("पारिवारिक आय बीपीएल सीमा (₹1,20,000/वर्ष) से अधिक है।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಬಿಪಿಎಲ್ ಮಿತಿ (₹1,20,000) ಗಿಂತ ಹೆಚ್ಚು ಇದೆ.");
        else reasons.push("Family income exceeds BPL threshold (₹1,20,000/year).");
      } else {
        if (lang === "hi") reasons.push("पारिवारिक आय बीपीएल सीमा के भीतर है।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ಆದಾಯ ಬಿಪಿಎಲ್ ಮಿತಿಯೊಳಗಿದೆ.");
        else reasons.push("Family income is within the BPL threshold.");
      }
      if (profile.ownsFourWheeler === "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("चार पहिया वाहन (कार/जीप) वाले परिवार बीपीएल राशन कार्ड लाभों से बाहर हैं।");
        else if (lang === "kn") reasons.push("ನಾಲ್ಕು ಚಕ್ರಗಳ ವಾಹನ ಹೊಂದಿರುವ ಕುಟುಂಬಗಳನ್ನು ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ಸೌಲಭ್ಯದಿಂದ ಹೊರಗಿಡಲಾಗಿದೆ.");
        else reasons.push("Households owning a four-wheeler (car/jeep) are excluded from BPL card benefits.");
      } else {
        if (lang === "hi") reasons.push("कोई चार पहिया वाहन स्वामित्व दर्ज नहीं किया गया।");
        else if (lang === "kn") reasons.push("ಯಾವುದೇ ನಾಲ್ಕು ಚಕ್ರಗಳ ವಾಹನ ಮಾಲೀಕತ್ವ ವರದಿಯಾಗಿಲ್ಲ.");
        else reasons.push("No four-wheeler ownership reported.");
      }
      if (profile.govtEmployeeOrTaxpayer === "Yes") {
        eligible = false;
        if (lang === "hi") reasons.push("सरकारी कर्मचारी या आयकर दाता वाले परिवार बीपीएल राशन कार्ड लाभों से बाहर हैं।");
        else if (lang === "kn") reasons.push("ಸರ್ಕಾರಿ ನೌಕರರು ಅಥವಾ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರನ್ನು ಹೊಂದಿರುವ ಕುಟುಂಬಗಳನ್ನು ಹೊರಗಿಡಲಾಗಿದೆ.");
        else reasons.push("Households with government employees or income tax payers are excluded from BPL card benefits.");
      } else {
        if (lang === "hi") reasons.push("परिवार का कोई सदस्य सरकारी कर्मचारी या आयकर दाता नहीं है।");
        else if (lang === "kn") reasons.push("ಕುಟುಂಬದ ಯಾವುದೇ ಸದಸ್ಯರು ಸರ್ಕಾರಿ ನೌಕರರು ಅಥವಾ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿದಾರರಲ್ಲ.");
        else reasons.push("No family member is a government employee or income tax payer.");
      }

      return { eligible, reasons };
    }
  }
];

export const CHAT_QUESTIONS = [
  {
    id: "welcome",
    field: "welcome",
    text: {
      en: "👋 Namaste! Welcome to the India Schemes Eligibility Bot 🇮🇳.\n\nI will help you check your eligibility for various central and state government schemes! Let's get started.",
      hi: "👋 नमस्ते! भारत योजना पात्रता बॉट 🇮🇳 में आपका स्वागत है।\n\nमैं आपको विभिन्न केंद्र और राज्य सरकार की योजनाओं के लिए अपनी पात्रता की जांच करने में मदद करूंगा! आइए शुरू करते हैं।",
      kn: "👋 ನಮಸ್ತೆ! ಭಾರತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತಾ ಪರಿಶೀಲನಾ ಬಾಟ್‌ಗೆ 🇮🇳 ನಿಮಗೆ ಸುಸ್ವಾಗತ.\n\nವಿವಿಧ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರದ ಯೋಜನೆಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ! ಬನ್ನಿ ಪ್ರಾರಂಭಿಸೋಣ."
    },
    inputType: "buttons",
    options: {
      en: [{ label: "Start / शुरू करें / ಪ್ರಾರಂಭಿಸಿ ➡️", value: "start" }],
      hi: [{ label: "Start / शुरू करें / ಪ್ರಾರಂಭಿಸಿ ➡️", value: "start" }],
      kn: [{ label: "Start / शुरू करें / ಪ್ರಾರಂಭಿಸಿ ➡️", value: "start" }]
    }
  },
  {
    id: "language",
    field: "language",
    text: {
      en: "🌍 Please select your preferred language:\n\n🌍 कृपया अपनी पसंदीदा भाषा चुनें:\n\n🌍 ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      hi: "🌍 Please select your preferred language:\n\n🌍 कृपया अपनी पसंदीदा भाषा चुनें:\n\n🌍 ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      kn: "🌍 Please select your preferred language:\n\n🌍 कृपया अपनी पसंदीदा भाषा चुनें:\n\n🌍 ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "English 🇬🇧", value: "en" },
        { label: "हिन्दी 🇮🇳", value: "hi" },
        { label: "ಕನ್ನಡ  Karnataka 💛❤️", value: "kn" }
      ],
      hi: [
        { label: "English 🇬🇧", value: "en" },
        { label: "हिन्दी 🇮🇳", value: "hi" },
        { label: "ಕನ್ನಡ  Karnataka 💛❤️", value: "kn" }
      ],
      kn: [
        { label: "English 🇬🇧", value: "en" },
        { label: "हिन्दी 🇮🇳", value: "hi" },
        { label: "ಕನ್ನಡ  Karnataka 💛❤️", value: "kn" }
      ]
    }
  },
  {
    id: "name",
    field: "name",
    text: {
      en: "What is your **Full Name**? 👤",
      hi: "आपका **पूरा नाम** क्या है? 👤",
      kn: "ನಿಮ್ಮ **ಪೂರ್ಣ ಹೆಸರು** ಏನು? 👤"
    },
    inputType: "text",
    placeholder: "Type your name...",
    validate: (val, lang = "en") => {
      if (!val || val.trim().length < 2) {
        if (lang === "hi") return "कृपया एक मान्य नाम दर्ज करें (कम से कम 2 अक्षर)।";
        if (lang === "kn") return "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು).";
        return "Please enter a valid name (at least 2 characters).";
      }
      return null;
    }
  },
  {
    id: "gender",
    field: "gender",
    text: {
      en: "What is your **Gender**? 🚻",
      hi: "आपका **लिंग (Gender)** क्या है? 🚻",
      kn: "ನಿಮ್ಮ **ಲಿಂಗ (Gender)** ಏನು? 🚻"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Male 👨", value: "Male" },
        { label: "Female 👩", value: "Female" },
        { label: "Other ⚧️", value: "Other" }
      ],
      hi: [
        { label: "पुरुष 👨", value: "Male" },
        { label: "महिला 👩", value: "Female" },
        { label: "अन्य ⚧️", value: "Other" }
      ],
      kn: [
        { label: "ಪುರುಷ 👨", value: "Male" },
        { label: "ಮಹಿಳೆ 👩", value: "Female" },
        { label: "ಇತರ ⚧️", value: "Other" }
      ]
    }
  },
  {
    id: "nationality",
    field: "nationality",
    text: {
      en: "Are you an **Indian Citizen**? 🇮🇳",
      hi: "क्या आप एक **भारतीय नागरिक** हैं? 🇮🇳",
      kn: "ನೀವು **ಭಾರತೀಯ ನಾಗರಿಕರು** ಹೌದೇ? 🇮🇳"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes ✅", value: "Yes" },
        { label: "No ❌", value: "No" }
      ],
      hi: [
        { label: "हाँ ✅", value: "Yes" },
        { label: "नहीं ❌", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು ✅", value: "Yes" },
        { label: "ಇಲ್ಲ ❌", value: "No" }
      ]
    }
  },
  {
    id: "maritalStatus",
    field: "maritalStatus",
    text: {
      en: "What is your **Marital Status**? 💍",
      hi: "आपकी **वैवाहिक स्थिति** क्या है? 💍",
      kn: "ನಿಮ್ಮ **ವೈವಾಹಿಕ ಸ್ಥಿತಿ** ಏನು? 💍"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Married 💍", value: "Married" },
        { label: "Unmarried 👤", value: "Unmarried" },
        { label: "Widowed 🕯️", value: "Widowed" },
        { label: "Divorced 📄", value: "Divorced" }
      ],
      hi: [
        { label: "विवाहित 💍", value: "Married" },
        { label: "अविवाहित 👤", value: "Unmarried" },
        { label: "विधवा 🕯️", value: "Widowed" },
        { label: "तलाकशुदा 📄", value: "Divorced" }
      ],
      kn: [
        { label: "ವಿವಾಹಿತ 💍", value: "Married" },
        { label: "ಅವಿವಾಹಿತ 👤", value: "Unmarried" },
        { label: "ವಿಧವೆ 🕯️", value: "Widowed" },
        { label: "ವಿಚ್ಛೇದಿತ 📄", value: "Divorced" }
      ]
    }
  },
  {
    id: "age",
    field: "age",
    text: {
      en: "How old are you? Please enter your **Age** in years. 🎂",
      hi: "आपकी उम्र क्या है? कृपया अपनी **आयु** वर्षों में दर्ज करें। 🎂",
      kn: "ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು? ದಯವಿಟ್ಟು ನಿಮ್ಮ **ವಯಸ್ಸನ್ನು** ವರ್ಷಗಳಲ್ಲಿ ನಮೂದಿಸಿ. 🎂"
    },
    inputType: "number",
    placeholder: "e.g., 28",
    validate: (val, lang = "en") => {
      const num = Number(val);
      if (isNaN(num) || num <= 0 || num > 120) {
        if (lang === "hi") return "कृपया 1 और 120 के बीच एक वैध आयु दर्ज करें।";
        if (lang === "kn") return "ದಯವಿಟ್ಟು 1 ರಿಂದ 120 ರ ನಡುವಿನ ಮಾನ್ಯ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ.";
        return "Please enter a valid age between 1 and 120.";
      }
      return null;
    }
  },
  {
    id: "state",
    field: "state",
    text: {
      en: "Which **State or Union Territory** do you reside in? 🗺️",
      hi: "आप किस **राज्य या केंद्र शासित प्रदेश** में रहते हैं? 🗺️",
      kn: "ನೀವು ಯಾವ **ರಾಜ್ಯ ಅಥವಾ ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶದಲ್ಲಿ** ವಾಸಿಸುತ್ತೀರಿ? 🗺️"
    },
    inputType: "select",
    options: INDIAN_STATES,
    placeholder: "Select your state...",
    validate: (val, lang = "en") => {
      if (!INDIAN_STATES.includes(val)) {
        if (lang === "hi") return "कृपया सूची में से एक वैध राज्य चुनें।";
        if (lang === "kn") return "ದಯವಿಟ್ಟು ಪಟ್ಟಿಯಿಂದ ಮಾನ್ಯವಾದ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.";
        return "Please select a valid state from the list.";
      }
      return null;
    }
  },
  {
    id: "income",
    field: "income",
    text: {
      en: "What is your **Annual Family Income** (in Rupees)? 💰",
      hi: "आपकी **वार्षिक पारिवारिक आय** (रुपये में) कितनी है? 💰",
      kn: "ನಿಮ್ಮ **ವಾರ್ಷಿಕ ಕೌಟುಂಬಿಕ ಆದಾಯ** (ರೂಪಾಯಿಗಳಲ್ಲಿ) ಎಷ್ಟು? 💰"
    },
    inputType: "number",
    placeholder: "e.g., 150000",
    validate: (val, lang = "en") => {
      const num = Number(val);
      if (isNaN(num) || num < 0) {
        if (lang === "hi") return "कृपया एक वैध गैर-नकारात्मक आय राशि दर्ज करें।";
        if (lang === "kn") return "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಆದಾಯದ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ.";
        return "Please enter a valid non-negative income amount.";
      }
      return null;
    }
  },
  {
    id: "ownsFourWheeler",
    field: "ownsFourWheeler",
    text: {
      en: "Do you or your family members own a **Four-Wheeler** (Car/Jeep/SUV)? 🚗",
      hi: "क्या आपके या आपके परिवार के पास कोई **चार पहिया वाहन** (कार/जीप/एसयूवी) है? 🚗",
      kn: "ನೀವು ಅಥವಾ ನಿಮ್ಮಸಿಬ್ಬಂದಿ **ನಾಲ್ಕು ಚಕ್ರಗಳ ವಾಹನ** (ಕಾರ್/ಜೀಪ್/ಎಸ್‌ಯುವಿ) ಹೊಂದಿದ್ದೀರಾ? 🚗"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes ✅", value: "Yes" },
        { label: "No ❌", value: "No" }
      ],
      hi: [
        { label: "हाँ ✅", value: "Yes" },
        { label: "नहीं ❌", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು ✅", value: "Yes" },
        { label: "ಇಲ್ಲ ❌", value: "No" }
      ]
    }
  },
  {
    id: "govtEmployeeOrTaxpayer",
    field: "govtEmployeeOrTaxpayer",
    text: {
      en: "Does anyone in your family hold a **Government Job** or pay **Income Tax**? 💼",
      hi: "क्या आपके परिवार में कोई **सरकारी नौकरी** करता है या **आयकर (Income Tax)** देता है? 💼",
      kn: "ನಿಮ್ಮ ಕುಟುಂಬದಲ್ಲಿ ಯಾರಾದರೂ **ಸರ್ಕಾರಿ ಕೆಲಸ** ಹೊಂದಿದ್ದಾರೆಯೇ ಅಥವಾ **ಆದಾಯ ತೆರಿಗೆ** ಪಾವತಿಸುತ್ತಾರೆಯೇ? 💼"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes ✅", value: "Yes" },
        { label: "No ❌", value: "No" }
      ],
      hi: [
        { label: "हाँ ✅", value: "Yes" },
        { label: "नहीं ❌", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು ✅", value: "Yes" },
        { label: "ಇಲ್ಲ ❌", value: "No" }
      ]
    }
  },
  {
    id: "occupation",
    field: "occupation",
    text: {
      en: "What is your primary **Occupation / Employment Status**? 🛠️",
      hi: "आपका प्राथमिक **व्यवसाय / रोजगार की स्थिति** क्या है? 🛠️",
      kn: "ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ **ಉದ್ಯೋಗ / ಉದ್ಯೋಗದ ಸ್ಥಿತಿ** ಏನು? 🛠️"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Farmer 🚜", value: "Farmer" },
        { label: "Daily Wage Worker 🛠️", value: "Daily Wage Worker" },
        { label: "Self Employed 💼", value: "Self Employed" },
        { label: "Housewife 🏡", value: "Housewife" },
        { label: "Salaried / Govt Employee 👔", value: "Salaried / Govt Employee" },
        { label: "Student 📚", value: "Student" },
        { label: "Unemployed 👤", value: "Unemployed" }
      ],
      hi: [
        { label: "किसान 🚜", value: "Farmer" },
        { label: "दैनिक मजदूर 🛠️", value: "Daily Wage Worker" },
        { label: "स्व-नियोजित 💼", value: "Self Employed" },
        { label: "गृहणी 🏡", value: "Housewife" },
        { label: "वेतनभोगी / सरकारी नौकरी 👔", value: "Salaried / Govt Employee" },
        { label: "छात्र 📚", value: "Student" },
        { label: "बेरोजगार 👤", value: "Unemployed" }
      ],
      kn: [
        { label: "ರೈತ 🚜", value: "Farmer" },
        { label: "ದೈನಂದಿನ ಕೂಲಿ 🛠️", value: "Daily Wage Worker" },
        { label: "ಸ್ವಯಂ ಉದ್ಯೋಗಿ 💼", value: "Self Employed" },
        { label: "ಗೃಹಿಣಿ 🏡", value: "Housewife" },
        { label: "ಸಂಬಳ ಪಡೆಯುವ / ಸರ್ಕಾರಿ ನೌಕರ 👔", value: "Salaried / Govt Employee" },
        { label: "ವಿದ್ಯಾರ್ಥಿ 📚", value: "Student" },
        { label: "ನಿರುದ್ಯೋಗಿ 👤", value: "Unemployed" }
      ]
    }
  },
  {
    id: "hasDaughter",
    field: "hasDaughter",
    text: {
      en: "Do you have a **Daughter below 10 years** of age? 👧",
      hi: "क्या आपकी **10 वर्ष से कम उम्र की बेटी** है? 👧",
      kn: "ನಿಮಗೆ **10 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಗಳು** ಇದ್ದಾರೆಯೇ? 👧"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes ✅", value: "Yes" },
        { label: "No ❌", value: "No" }
      ],
      hi: [
        { label: "हाँ ✅", value: "Yes" },
        { label: "नहीं ❌", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು ✅", value: "Yes" },
        { label: "ಇಲ್ಲ ❌", value: "No" }
      ]
    }
  },
  {
    id: "category",
    field: "category",
    text: {
      en: "What **Social Category** do you belong to? 👥",
      hi: "आप किस **सामाजिक श्रेणी (Category)** से संबंधित हैं? 👥",
      kn: "ನೀವು ಯಾವ **ಸಾಮಾಜಿಕ ವರ್ಗಕ್ಕೆ (Category)** ಸೇರಿದವರಾಗಿದ್ದೀರಿ? 👥"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "General 👥", value: "General" },
        { label: "OBC 👥", value: "OBC" },
        { label: "SC 👥", value: "SC" },
        { label: "ST 👥", value: "ST" }
      ],
      hi: [
        { label: "सामान्य 👥", value: "General" },
        { label: "ओबीसी 👥", value: "OBC" },
        { label: "एससी 👥", value: "SC" },
        { label: "एसटी 👥", value: "ST" }
      ],
      kn: [
        { label: "ಸಾಮಾನ್ಯ 👥", value: "General" },
        { label: "ಒಬಿಸಿ 👥", value: "OBC" },
        { label: "ಎಸ್ಸಿ 👥", value: "SC" },
        { label: "ಎಸ್ಟಿ 👥", value: "ST" }
      ]
    }
  },
  {
    id: "disability",
    field: "disability",
    text: {
      en: "Are you **Differently Abled (Divyangjan)**? ♿",
      hi: "क्या आप **दिव्यांग (Differently Abled)** हैं? ♿",
      kn: "ನೀವು **ವಿಕಲಚೇತನರು (Differently Abled)** ಹೌದೇ? ♿"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes ✅", value: "Yes" },
        { label: "No ❌", value: "No" }
      ],
      hi: [
        { label: "हाँ ✅", value: "Yes" },
        { label: "नहीं ❌", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು ✅", value: "Yes" },
        { label: "ಇಲ್ಲ ❌", value: "No" }
      ]
    }
  }
];
