const fs = require('fs');

const originalContent = fs.readFileSync('src/data/schemes.js', 'utf8');
const cutIndex = originalContent.indexOf('export const CHAT_QUESTIONS');
const before = originalContent.substring(0, cutIndex);

const newQuestions = `export const CHAT_QUESTIONS = [
  {
    id: "welcome",
    field: "welcome",
    text: {
      en: "Namaste! Welcome to the India Schemes Eligibility Bot.\\n\\nI will help you check your eligibility for various central and state government schemes! Let's get started.",
      hi: "नमस्ते! भारत योजना पात्रता बॉट में आपका स्वागत है।\\n\\nमैं आपको विभिन्न केंद्र और राज्य सरकार की योजनाओं के लिए अपनी पात्रता की जांच करने में मदद करूंगा! आइए शुरू करते हैं।",
      kn: "ನಮಸ್ತೆ! ಭಾರತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತಾ ಪರಿಶೀಲನಾ ಬಾಟ್‌ಗೆ ಸುಸ್ವಾಗತ.\\n\\nವಿವಿಧ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರದ ಯೋಜನೆಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ! ಬನ್ನಿ ಪ್ರಾರಂಭಿಸೋಣ."
    },
    inputType: "buttons",
    options: {
      en: [{ label: "Start", value: "start" }],
      hi: [{ label: "शुरू करें", value: "start" }],
      kn: [{ label: "ಪ್ರಾರಂಭಿಸಿ", value: "start" }]
    }
  },
  {
    id: "language",
    field: "language",
    text: {
      en: "Please select your preferred language:\\n\\nकृपया अपनी पसंदीदा भाषा चुनें:\\n\\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      hi: "Please select your preferred language:\\n\\nकृपया अपनी पसंदीदा भाषा चुनें:\\n\\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      kn: "Please select your preferred language:\\n\\nकृपया अपनी पसंदीदा भाषा चुनें:\\n\\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "English", value: "en" },
        { label: "हिन्दी", value: "hi" },
        { label: "ಕನ್ನಡ", value: "kn" }
      ],
      hi: [
        { label: "English", value: "en" },
        { label: "हिन्दी", value: "hi" },
        { label: "ಕನ್ನಡ", value: "kn" }
      ],
      kn: [
        { label: "English", value: "en" },
        { label: "हिन्दी", value: "hi" },
        { label: "ಕನ್ನಡ", value: "kn" }
      ]
    }
  },
  {
    id: "name",
    field: "name",
    text: {
      en: "What is your Full Name?",
      hi: "आपका पूरा नाम क्या है?",
      kn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ಏನು?"
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
      en: "What is your Gender?",
      hi: "आपका लिंग (Gender) क्या है?",
      kn: "ನಿಮ್ಮ ಲಿಂಗ (Gender) ಏನು?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
      ],
      hi: [
        { label: "पुरुष", value: "Male" },
        { label: "महिला", value: "Female" },
        { label: "अन्य", value: "Other" }
      ],
      kn: [
        { label: "ಪುರುಷ", value: "Male" },
        { label: "ಮಹಿಳೆ", value: "Female" },
        { label: "ಇತರ", value: "Other" }
      ]
    }
  },
  {
    id: "nationality",
    field: "nationality",
    text: {
      en: "Are you an Indian Citizen?",
      hi: "क्या आप एक भारतीय नागरिक हैं?",
      kn: "ನೀವು ಭಾರತೀಯ ನಾಗರಿಕರು ಹೌದೇ?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "हाँ", value: "Yes" },
        { label: "नहीं", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು", value: "Yes" },
        { label: "ಇಲ್ಲ", value: "No" }
      ]
    }
  },
  {
    id: "maritalStatus",
    field: "maritalStatus",
    text: {
      en: "What is your Marital Status?",
      hi: "आपकी वैवाहिक स्थिति क्या है?",
      kn: "ನಿಮ್ಮ ವೈವಾಹಿಕ ಸ್ಥಿತಿ ಏನು?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Married", value: "Married" },
        { label: "Unmarried", value: "Unmarried" },
        { label: "Widowed", value: "Widowed" },
        { label: "Divorced", value: "Divorced" }
      ],
      hi: [
        { label: "विवाहित", value: "Married" },
        { label: "अविवाहित", value: "Unmarried" },
        { label: "विधवा", value: "Widowed" },
        { label: "तलाकशुदा", value: "Divorced" }
      ],
      kn: [
        { label: "ವಿವಾಹಿತ", value: "Married" },
        { label: "ಅವಿವಾಹಿತ", value: "Unmarried" },
        { label: "ವಿಧವೆ", value: "Widowed" },
        { label: "ವಿಚ್ಛೇದಿತ", value: "Divorced" }
      ]
    }
  },
  {
    id: "age",
    field: "age",
    text: {
      en: "How old are you? Please enter your Age in years.",
      hi: "आपकी उम्र क्या है? कृपया अपनी आयु वर्षों में दर्ज करें।",
      kn: "ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು? ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ವರ್ಷಗಳಲ್ಲಿ ನಮೂದಿಸಿ."
    },
    inputType: "number",
    placeholder: "e.g., 28",
    validate: (val, lang = "en") => {
      const num = Number(val);
      if (isNaN(num) || num <= 0 || num > 120) {
        if (lang === "hi") return "कृपया 1 और 120 के बीच एक वैध आयु दर्ज करें।";
        if (lang === "kn") return "ದಯವಿಟ್ಟು 1 ರಿಂದ 120 ರ ನಡುವಿನ ಮಾನ್ಯ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ।";
        return "Please enter a valid age between 1 and 120.";
      }
      return null;
    }
  },
  {
    id: "state",
    field: "state",
    text: {
      en: "Which State or Union Territory do you reside in?",
      hi: "आप किस राज्य या केंद्र शासित प्रदेश में रहते हैं?",
      kn: "ನೀವು ಯಾವ ರಾಜ್ಯ ಅಥವಾ ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?"
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
      en: "What is your Annual Family Income (in Rupees)?",
      hi: "आपकी वार्षिक पारिवारिक आय (रुपये में) कितनी है?",
      kn: "ನಿಮ್ಮ ವಾರ್ಷಿಕ ಕೌಟುಂಬಿಕ ಆದಾಯ (ರೂಪಾಯಿಗಳಲ್ಲಿ) ಎಷ್ಟು?"
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
      en: "Do you or your family members own a Four-Wheeler (Car / Jeep / SUV)?",
      hi: "क्या आपके या आपके परिवार के पास कोई चार पहिया वाहन (कार / जीप / एसयूवी) है?",
      kn: "ನೀವು ಅಥವಾ ನಿಮ್ಮ ಕುಟುಂಬ ನಾಲ್ಕು ಚಕ್ರಗಳ ವಾಹನ (ಕಾರ್ / ಜೀಪ್ / ಎಸ್‌ಯುವಿ) ಹೊಂದಿದ್ದೀರಾ?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "हाँ", value: "Yes" },
        { label: "नहीं", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು", value: "Yes" },
        { label: "ಇಲ್ಲ", value: "No" }
      ]
    }
  },
  {
    id: "govtEmployeeOrTaxpayer",
    field: "govtEmployeeOrTaxpayer",
    text: {
      en: "Does anyone in your family hold a Government Job or pay Income Tax?",
      hi: "क्या आपके परिवार में कोई सरकारी नौकरी करता है या आयकर (Income Tax) देता है?",
      kn: "ನಿಮ್ಮ ಕುಟುಂಬದಲ್ಲಿ ಯಾರಾದರೂ ಸರ್ಕಾರಿ ಕೆಲಸ ಹೊಂದಿದ್ದಾರೆಯೇ ಅಥವಾ ಆದಾಯ ತೆರಿಗೆ ಪಾವತಿಸುತ್ತಾರೆಯೇ?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "हाँ", value: "Yes" },
        { label: "नहीं", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು", value: "Yes" },
        { label: "ಇಲ್ಲ", value: "No" }
      ]
    }
  },
  {
    id: "occupation",
    field: "occupation",
    text: {
      en: "What is your primary Occupation / Employment Status?",
      hi: "आपका प्राथमिक व्यवसाय / रोजगार की स्थिति क्या है?",
      kn: "ನಿಮ್ಮ ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ / ಉದ್ಯೋಗದ ಸ್ಥಿತಿ ಏನು?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Farmer", value: "Farmer" },
        { label: "Daily Wage Worker", value: "Daily Wage Worker" },
        { label: "Self Employed", value: "Self Employed" },
        { label: "Housewife", value: "Housewife" },
        { label: "Salaried / Govt Employee", value: "Salaried / Govt Employee" },
        { label: "Student", value: "Student" },
        { label: "Unemployed", value: "Unemployed" }
      ],
      hi: [
        { label: "किसान", value: "Farmer" },
        { label: "दैनिक मजदूर", value: "Daily Wage Worker" },
        { label: "स्व-नियोजित", value: "Self Employed" },
        { label: "गृहणी", value: "Housewife" },
        { label: "वेतनभोगी / सरकारी नौकरी", value: "Salaried / Govt Employee" },
        { label: "छात्र", value: "Student" },
        { label: "बेरोजगार", value: "Unemployed" }
      ],
      kn: [
        { label: "ರೈತ", value: "Farmer" },
        { label: "ದೈನಂದಿನ ಕೂಲಿ", value: "Daily Wage Worker" },
        { label: "ಸ್ವಯಂ ಉದ್ಯೋಗಿ", value: "Self Employed" },
        { label: "ಗೃಹಿಣಿ", value: "Housewife" },
        { label: "ಸಂಬಳ ಪಡೆಯುವ / ಸರ್ಕಾರಿ ನೌಕರ", value: "Salaried / Govt Employee" },
        { label: "ವಿದ್ಯಾರ್ಥಿ", value: "Student" },
        { label: "ನಿರುದ್ಯೋಗಿ", value: "Unemployed" }
      ]
    }
  },
  {
    id: "hasDaughter",
    field: "hasDaughter",
    text: {
      en: "Do you have a Daughter below 10 years of age?",
      hi: "क्या आपकी 10 वर्ष से कम उम्र की बेटी है?",
      kn: "ನಿಮಗೆ 10 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಮಗಳು ಇದ್ದಾರೆಯೇ?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "हाँ", value: "Yes" },
        { label: "नहीं", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು", value: "Yes" },
        { label: "ಇಲ್ಲ", value: "No" }
      ]
    }
  },
  {
    id: "category",
    field: "category",
    text: {
      en: "What Social Category do you belong to?",
      hi: "आप किस सामाजिक श्रेणी (Category) से संबंधित हैं?",
      kn: "ನೀವು ಯಾವ ಸಾಮಾಜಿಕ ವರ್ಗಕ್ಕೆ (Category) ಸೇರಿದವರಾಗಿದ್ದೀರಿ?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "General", value: "General" },
        { label: "OBC", value: "OBC" },
        { label: "SC", value: "SC" },
        { label: "ST", value: "ST" }
      ],
      hi: [
        { label: "सामान्य", value: "General" },
        { label: "ओबीसी", value: "OBC" },
        { label: "एससी", value: "SC" },
        { label: "एसटी", value: "ST" }
      ],
      kn: [
        { label: "ಸಾಮಾನ್ಯ", value: "General" },
        { label: "ಒಬಿಸಿ", value: "OBC" },
        { label: "ಎಸ್ಸಿ", value: "SC" },
        { label: "ಎಸ್ಟಿ", value: "ST" }
      ]
    }
  },
  {
    id: "disability",
    field: "disability",
    text: {
      en: "Are you Differently Abled (Divyangjan)?",
      hi: "क्या आप दिव्यांग (Differently Abled) हैं?",
      kn: "ನೀವು ವಿಕಲಚೇತನರು (Differently Abled) ಹೌದೇ?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "हाँ", value: "Yes" },
        { label: "नहीं", value: "No" }
      ],
      kn: [
        { label: "ಹೌದು", value: "Yes" },
        { label: "ಇಲ್ಲ", value: "No" }
      ]
    }
  }
];
`;

const updatedContent = before + newQuestions;
fs.writeFileSync('src/data/schemes.js', updatedContent, 'utf8');
console.log('Successfully updated schemes.js with UTF-8 native script!');
