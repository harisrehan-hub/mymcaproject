$content = Get-Content src/data/schemes.js -Raw -Encoding UTF8
$before = $content.Substring(0, $content.IndexOf('export const CHAT_QUESTIONS'))

$newQuestions = @'
export const CHAT_QUESTIONS = [
  {
    id: "welcome",
    field: "welcome",
    text: {
      en: "Namaste! Welcome to the India Schemes Eligibility Bot.\n\nI will help you check your eligibility for various central and state government schemes. Let's get started.",
      hi: "Namaste! Bharat Yojana Patrata Bot mein aapka swagat hai.\n\nMain aapko vibhinn kendra aur rajya sarkar ki yojanaon ke liye patrata ki janch karne mein madad karunga. Shuru karte hain.",
      kn: "Namaste! Bharata Sarkari Yojane Arhataa Parisheelanaa Baatge nimage suswagata.\n\nVividha kendra mattu rajya sarkarada yojanekaLige nimma arhateyanu parisheelisamlani sahaaya maaDuttene. Praarambhisoona."
    },
    inputType: "buttons",
    options: {
      en: [{ label: "Start", value: "start" }],
      hi: [{ label: "Shuru Karen", value: "start" }],
      kn: [{ label: "Praarambhisi", value: "start" }]
    }
  },
  {
    id: "language",
    field: "language",
    text: {
      en: "Please select your preferred language:\n\nकृपया अपनी पसंदीदा भाषा चुनें:\n\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      hi: "Please select your preferred language:\n\nकृपया अपनी पसंदीदा भाषा चुनें:\n\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      kn: "Please select your preferred language:\n\nकृपया अपनी पसंदीदा भाषा चुनें:\n\nದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:"
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
      hi: "Aapka poora naam kya hai?",
      kn: "Nimmaa pUrNa hesaru enu?"
    },
    inputType: "text",
    placeholder: "Type your name...",
    validate: (val, lang = "en") => {
      if (!val || val.trim().length < 2) {
        if (lang === "hi") return "Kripaya ek valid naam darj karein (kam se kam 2 akshar).";
        if (lang === "kn") return "Dayavittu valid hesarannu namoUdisi (kanishtha 2 aksharaLu).";
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
      hi: "Aapka ling (Gender) kya hai?",
      kn: "Nimma linga (Gender) enu?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" }
      ],
      hi: [
        { label: "Purush", value: "Male" },
        { label: "Mahila", value: "Female" },
        { label: "Anya", value: "Other" }
      ],
      kn: [
        { label: "Purusha", value: "Male" },
        { label: "Mahile", value: "Female" },
        { label: "Itara", value: "Other" }
      ]
    }
  },
  {
    id: "nationality",
    field: "nationality",
    text: {
      en: "Are you an Indian Citizen?",
      hi: "Kya aap ek Bharatiya Nagrik hain?",
      kn: "Neevu Bharatiya Nagarikaraada?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "Haan", value: "Yes" },
        { label: "Nahin", value: "No" }
      ],
      kn: [
        { label: "Houdu", value: "Yes" },
        { label: "Illa", value: "No" }
      ]
    }
  },
  {
    id: "maritalStatus",
    field: "maritalStatus",
    text: {
      en: "What is your Marital Status?",
      hi: "Aapki vaivahik sthiti kya hai?",
      kn: "Nimma vaivahika sthiti enu?"
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
        { label: "Vivahit", value: "Married" },
        { label: "Avivahit", value: "Unmarried" },
        { label: "Vidhva", value: "Widowed" },
        { label: "Talakshuda", value: "Divorced" }
      ],
      kn: [
        { label: "Vivahita", value: "Married" },
        { label: "Avivahita", value: "Unmarried" },
        { label: "Vidhave", value: "Widowed" },
        { label: "Vichheddita", value: "Divorced" }
      ]
    }
  },
  {
    id: "age",
    field: "age",
    text: {
      en: "How old are you? Please enter your Age in years.",
      hi: "Aapki umra kya hai? Kripaya apni aayu varsho mein darj karein.",
      kn: "Nimma vayassu eshtu? Dayavittu nimma vayasannu varshaLalli namoUdisi."
    },
    inputType: "number",
    placeholder: "e.g., 28",
    validate: (val, lang = "en") => {
      const num = Number(val);
      if (isNaN(num) || num <= 0 || num > 120) {
        if (lang === "hi") return "Kripaya 1 aur 120 ke beech ek valid aayu darj karein.";
        if (lang === "kn") return "Dayavittu 1 rinda 120 ra naduvina valid vayasannu namoUdisi.";
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
      hi: "Aap kis Rajya ya Kendra Shasit Pradesh mein rehte hain?",
      kn: "Neevu yaaVa Rajya athavaa Kendraadaashita Pradeshalli vaasisutteeraaa?"
    },
    inputType: "select",
    options: INDIAN_STATES,
    placeholder: "Select your state...",
    validate: (val, lang = "en") => {
      if (!INDIAN_STATES.includes(val)) {
        if (lang === "hi") return "Kripaya suchi mein se ek valid rajya chunein.";
        if (lang === "kn") return "Dayavittu paTTiyinda valid raajyavannu aayke maaDi.";
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
      hi: "Aapki varshik parivarik aay (rupaye mein) kitni hai?",
      kn: "Nimma vaershika kauTumbika aadaaya (rupaayigaLalli) eshtu?"
    },
    inputType: "number",
    placeholder: "e.g., 150000",
    validate: (val, lang = "en") => {
      const num = Number(val);
      if (isNaN(num) || num < 0) {
        if (lang === "hi") return "Kripaya ek valid non-negative aay rashi darj karein.";
        if (lang === "kn") return "Dayavittu valid aadaayada moTTavannu namoUdisi.";
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
      hi: "Kya aapke ya aapke parivaar ke paas koi char pahiya vaahan (Car / Jeep / SUV) hai?",
      kn: "Neevu athavaa nimma kuTumba naalku cakrakaLa vaahana (Car / Jeep / SUV) hondiddeeraaa?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "Haan", value: "Yes" },
        { label: "Nahin", value: "No" }
      ],
      kn: [
        { label: "Houdu", value: "Yes" },
        { label: "Illa", value: "No" }
      ]
    }
  },
  {
    id: "govtEmployeeOrTaxpayer",
    field: "govtEmployeeOrTaxpayer",
    text: {
      en: "Does anyone in your family hold a Government Job or pay Income Tax?",
      hi: "Kya aapke parivaar mein koi Sarkari Naukri karta hai ya Aaykar (Income Tax) deta hai?",
      kn: "Nimma kuTumbadalli yaraadaru Sarkari Kelasa hondiddaare yaa Aadaaya Terige paavisuttaare?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "Haan", value: "Yes" },
        { label: "Nahin", value: "No" }
      ],
      kn: [
        { label: "Houdu", value: "Yes" },
        { label: "Illa", value: "No" }
      ]
    }
  },
  {
    id: "occupation",
    field: "occupation",
    text: {
      en: "What is your primary Occupation / Employment Status?",
      hi: "Aapka prathamik vyavsay / rozgaar ki sthiti kya hai?",
      kn: "Nimma praathamika udyoga / udyogada sthiti enu?"
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
        { label: "Kisaan", value: "Farmer" },
        { label: "Dainik Mazdoor", value: "Daily Wage Worker" },
        { label: "Swa-Niyojit", value: "Self Employed" },
        { label: "Grihani", value: "Housewife" },
        { label: "Vetanabhogi / Sarkari Naukri", value: "Salaried / Govt Employee" },
        { label: "Chaatra", value: "Student" },
        { label: "Berozgaar", value: "Unemployed" }
      ],
      kn: [
        { label: "Raita", value: "Farmer" },
        { label: "Dainadina KoUli", value: "Daily Wage Worker" },
        { label: "Swayam Udyogi", value: "Self Employed" },
        { label: "Gruhini", value: "Housewife" },
        { label: "Sambala Padeyuva / Sarkari Naukara", value: "Salaried / Govt Employee" },
        { label: "Vidyaarthi", value: "Student" },
        { label: "Nirudyogi", value: "Unemployed" }
      ]
    }
  },
  {
    id: "hasDaughter",
    field: "hasDaughter",
    text: {
      en: "Do you have a Daughter below 10 years of age?",
      hi: "Kya aapki 10 varsh se kam umra ki beti hai?",
      kn: "Nimage 10 varshakainta Kadime vayasina magaLu iddaareye?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "Haan", value: "Yes" },
        { label: "Nahin", value: "No" }
      ],
      kn: [
        { label: "Houdu", value: "Yes" },
        { label: "Illa", value: "No" }
      ]
    }
  },
  {
    id: "category",
    field: "category",
    text: {
      en: "What Social Category do you belong to?",
      hi: "Aap kis samajik shreni (Category) se sambandhit hain?",
      kn: "Neevu yaaVa saamaajika vargakke (Category) seridavaragiddeeraaa?"
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
        { label: "Saamaanya", value: "General" },
        { label: "OBC", value: "OBC" },
        { label: "SC", value: "SC" },
        { label: "ST", value: "ST" }
      ],
      kn: [
        { label: "Saamaanya", value: "General" },
        { label: "OBC", value: "OBC" },
        { label: "SC", value: "SC" },
        { label: "ST", value: "ST" }
      ]
    }
  },
  {
    id: "disability",
    field: "disability",
    text: {
      en: "Are you Differently Abled (Divyangjan)?",
      hi: "Kya aap Divyang (Differently Abled) hain?",
      kn: "Neevu Vikalachetanaru (Differently Abled) houdeye?"
    },
    inputType: "buttons",
    options: {
      en: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ],
      hi: [
        { label: "Haan", value: "Yes" },
        { label: "Nahin", value: "No" }
      ],
      kn: [
        { label: "Houdu", value: "Yes" },
        { label: "Illa", value: "No" }
      ]
    }
  }
];
'@

$newContent = $before + $newQuestions
[System.IO.File]::WriteAllText((Resolve-Path src/data/schemes.js).Path, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "Done. New file size: $($newContent.Length)"
