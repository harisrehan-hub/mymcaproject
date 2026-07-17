// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { SCHEMES_DATA, CHAT_QUESTIONS } from "./data/schemes";

// --- INLINE SVG ICONS FOR WHATSAPP AESTHETICS ---
const Icons = {
  Search: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M15.009 13.805h-.636l-.227-.217c.793-.924 1.27-2.124 1.27-3.428C15.416 7.152 12.98 4.717 10 4.717s-5.416 2.435-5.416 5.443 2.435 5.443 5.416 5.443c1.3 0 2.504-.479 3.428-1.27l.217.227v.636l4.01 3.99 1.19-1.19-3.99-4.012zm-5.009 0c-2.006 0-3.629-1.623-3.629-3.643 0-2.02 1.623-3.643 3.629-3.643s3.629 1.623 3.629 3.643c0 2.02-1.623 3.643-3.629 3.643z"/>
    </svg>
  ),
  More: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
    </svg>
  ),
  Attach: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M1.923 9.37c-.51-.51-.51-1.34 0-1.85l7.07-7.07c1.76-1.76 4.61-1.76 6.37 0l6.36 6.36c2.45 2.45 2.45 6.42 0 8.87l-6.01 6.01c-3.14 3.14-8.24 3.14-11.38 0l-4.24-4.24c-.51-.51-.51-1.34 0-1.85.51-.51 1.34-.51 1.85 0l4.24 4.24c2.12 2.12 5.56 2.12 7.68 0l6.01-6.01c1.43-1.43 1.43-3.75 0-5.18l-6.36-6.36c-.98-.98-2.56-.98-3.54 0l-7.07 7.07c-.49.49-.49 1.28 0 1.77.49.49 1.28.49 1.77 0l5.66-5.66c.51-.51 1.34-.51 1.85 0s.51 1.34 0 1.85l-5.66 5.66c-1.5 1.5-3.95 1.5-5.45 0z"/>
    </svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M11.999 14.99c1.65 0 2.99-1.34 2.99-2.99V6c0-1.65-1.34-3-2.99-3S9 4.35 9 6v6c0 1.65 1.34 2.99 2.99 2.99zm5.3-2.99c0 2.93-2.34 5.31-5.3 5.31s-5.3-2.38-5.3-5.31H5c0 3.53 2.61 6.44 6 6.92V21h2v-2.08c3.39-.48 6-3.39 6-6.92h-1.7z"/>
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  ),
  Call: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4.01c-.55 0-1 .45-1 1 0 9.39 7.63 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z"/>
    </svg>
  ),
  Back: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  DoubleCheck: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M0.293,12.707c-0.391-0.391-0.391-1.023,0-1.414l1.414-1.414c0.391-0.391,1.023-0.391,1.414,0l3.586,3.586l8.586-8.586c0.391-0.391,1.023-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.023,0,1.414L7.414,18.414c-0.391,0.391-1.023,0.391-1.414,0L0.293,12.707z"/>
      <path d="M6.293,12.707c-0.391-0.391-0.391-1.023,0-1.414l1.414-1.414c0.391-0.391,1.023-0.391,1.414,0l3.586,3.586l8.586-8.586c0.391-0.391,1.023-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.023,0,1.414L13.414,18.414c-0.391,0.391-1.023,0.391-1.414,0L6.293,12.707z" opacity="0.75" fill="#53bdeb"/>
    </svg>
  ),
  Emoticon: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 11c0 2.76-2.24 5-5 5s-5-2.24-5-5h10zm-8.5-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M12 2c-2.76 0-5 2.24-5 5v3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2V7c0-2.76-2.24-5-5-5zm3 8H9V7c0-1.66 1.34-3 3-3s3 1.34 3 3v3z"/>
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [activeContact, setActiveContact] = useState("schemes_bot");
  const [currentView, setCurrentView] = useState("chat"); // 'list' or 'chat' (mobile flow)
  
  const [contacts, setContacts] = useState([
    {
      id: "schemes_bot",
      name: "India Schemes Eligibility Bot 🇮🇳",
      avatarInitials: "🇮🇳",
      online: true,
      lastMessage: "Click to continue checking eligibility...",
      time: "Now",
      unread: 0
    },
    {
      id: "pm_kisan_support",
      name: "PM-Kisan Helpline (Mock)",
      avatarInitials: "🚜",
      online: false,
      lastMessage: "Dear farmer, your installment of ₹2,000 has been credited.",
      time: "Yesterday",
      unread: 1
    },
    {
      id: "ration_card_desk",
      name: "Ration Card Support Center",
      avatarInitials: "🌾",
      online: false,
      lastMessage: "Please verify your Aadhaar linking by July 31st.",
      time: "Monday",
      unread: 0
    },
    {
      id: "my_family",
      name: "Family Group 👪",
      avatarInitials: "🏡",
      online: false,
      lastMessage: "Papa, check eligibility for Uncle's pension here!",
      time: "05/07/26",
      unread: 3
    }
  ]);
  
  // Chatbot state
  const [userProfile, setUserProfile] = useState({
    name: "",
    gender: "",
    nationality: "",
    maritalStatus: "",
    age: "",
    state: "",
    income: "",
    ownsFourWheeler: "",
    govtEmployeeOrTaxpayer: "",
    occupation: "",
    hasDaughter: "",
    category: "",
    disability: ""
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState(null);
  
  // Reference for message scrolling
  const messagesEndRef = useRef(null);

  // Initialize bot greeting
  useEffect(() => {
    // Add first question
    const firstQuestion = CHAT_QUESTIONS[0];
    setMessages([
      {
        id: "greet-1",
        sender: "bot",
        type: "text",
        content: firstQuestion.text,
        time: getFormattedTime()
      }
    ]);
  }, []);

  // Sync scroll on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle dark/light theme body toggle
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
    }
  }, [theme]);

  function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  // Restart Chat flow
  const handleRestart = () => {
    setUserProfile({
      name: "",
      gender: "",
      nationality: "",
      maritalStatus: "",
      age: "",
      state: "",
      income: "",
      ownsFourWheeler: "",
      govtEmployeeOrTaxpayer: "",
      occupation: "",
      hasDaughter: "",
      category: "",
      disability: ""
    });
    setCurrentQuestionIndex(0);
    const firstQuestion = CHAT_QUESTIONS[0];
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: `restart-${Date.now()}`,
          sender: "bot",
          type: "text",
          content: "Re-initializing... Let's start over!\n\n" + firstQuestion.text,
          time: getFormattedTime()
        }
      ]);
    }, 1000);
  };

  const deleteContact = (e, contactId) => {
    e.stopPropagation();
    if (contactId === "schemes_bot") return;
    setContacts(prev => prev.filter(c => c.id !== contactId));
    if (activeContact === contactId) {
      setActiveContact("schemes_bot");
    }
  };

  // Bot response simulator
  const triggerBotResponse = (currentProfile, nextIndex) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // --- SMART QUESTION SKIPPING ---
      // Skip hasDaughter question if: user is Male/Other, OR marital status is NOT Married
      let resolvedIndex = nextIndex;
      let resolvedProfile = { ...currentProfile };

      while (resolvedIndex < CHAT_QUESTIONS.length) {
        const q = CHAT_QUESTIONS[resolvedIndex];
        if (q.id === "hasDaughter") {
          const skipForGender = resolvedProfile.gender && resolvedProfile.gender !== "Female";
          const skipForMarital = resolvedProfile.maritalStatus && resolvedProfile.maritalStatus !== "Married";
          if (skipForGender || skipForMarital) {
            // Auto-fill as No and skip to next
            resolvedProfile = { ...resolvedProfile, hasDaughter: "No" };
            resolvedIndex++;
            continue;
          }
        }
        break;
      }

      // Sync profile state if we auto-filled any skipped fields
      if (resolvedProfile.hasDaughter !== currentProfile.hasDaughter) {
        setUserProfile(resolvedProfile);
      }

      if (resolvedIndex < CHAT_QUESTIONS.length) {
        // Ask next question
        const nextQ = CHAT_QUESTIONS[resolvedIndex];
        let questionText = nextQ.text;
        
        // Dynamic customization of text (e.g. including name in greeting)
        if (nextQ.id === "nationality") {
          questionText = `Nice to meet you, **${resolvedProfile.name}**! Let's check your eligibility.\n\nAre you an **Indian Citizen**?`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-q-${Date.now()}`,
            sender: "bot",
            type: "question",
            questionIndex: resolvedIndex,
            content: questionText,
            time: getFormattedTime()
          }
        ]);
        setCurrentQuestionIndex(resolvedIndex);
      } else {
        // ALL QUESTIONS ANSWERED - EVALUATE SCHEMES
        const results = [];
        let eligibleCount = 0;

        SCHEMES_DATA.forEach((scheme) => {
          const evalResult = scheme.checkEligibility(resolvedProfile);
          results.push({
            schemeId: scheme.id,
            name: scheme.name,
            category: scheme.category,
            ministry: scheme.ministry,
            eligible: evalResult.eligible,
            reasons: evalResult.reasons
          });
          if (evalResult.eligible) eligibleCount++;
        });

        // Sort results: Eligible first, Ineligible second; prioritize Ration Card (pmgkay) to the top of its group
        results.sort((a, b) => {
          if (a.eligible && !b.eligible) return -1;
          if (!a.eligible && b.eligible) return 1;
          
          if (a.schemeId === "pmgkay") return -1;
          if (b.schemeId === "pmgkay") return 1;
          
          return 0;
        });

        // Add result summary text
        const resultIntro = `Thanks, **${resolvedProfile.name}**! I have processed your details:\n\n` + 
          `• Age: **${resolvedProfile.age}**\n` + 
          `• Income: **₹${Number(resolvedProfile.income).toLocaleString('en-IN')}/yr**\n` +
          `• State: **${resolvedProfile.state}**\n` +
          `• Occupation: **${resolvedProfile.occupation}**\n\n` +
          `🔍 I found **${eligibleCount} government schemes** that you qualify for! Click on any scheme below to view benefits, qualifying criteria, and apply.`;

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-intro-${Date.now()}`,
            sender: "bot",
            type: "text",
            content: resultIntro,
            time: getFormattedTime()
          },
          {
            id: `bot-results-${Date.now()}`,
            sender: "bot",
            type: "results",
            results: results,
            time: getFormattedTime()
          },
          {
            id: `bot-restart-${Date.now()}`,
            sender: "bot",
            type: "restart_prompt",
            content: "Would you like to check eligibility for someone else?",
            time: getFormattedTime()
          }
        ]);
        setCurrentQuestionIndex(CHAT_QUESTIONS.length);
      }
    }, 1200);
  };

  // Submit current step answer
  const handleAnswerSubmit = (value) => {
    if (!value || value.toString().trim() === "") return;

    const currentQ = CHAT_QUESTIONS[currentQuestionIndex];
    
    // Validate
    if (currentQ.validate) {
      const error = currentQ.validate(value);
      if (error) {
        // Send a validation warning from bot
        setMessages((prev) => [
          ...prev,
          {
            id: `user-err-${Date.now()}`,
            sender: "user",
            type: "text",
            content: value.toString(),
            time: getFormattedTime()
          },
          {
            id: `bot-err-${Date.now()}`,
            sender: "bot",
            type: "text",
            content: `⚠️ ${error}`,
            time: getFormattedTime()
          }
        ]);
        return;
      }
    }

    // Save profile value
    const updatedProfile = {
      ...userProfile,
      [currentQ.field]: value
    };
    setUserProfile(updatedProfile);

    // Add user answer message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-ans-${Date.now()}`,
        sender: "user",
        type: "text",
        content: value.toString(),
        time: getFormattedTime()
      }
    ]);

    setInputText("");

    // If non-Indian citizen is selected, short-circuit or handle warning
    if (currentQ.id === "nationality" && value === "No") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-nonindian-${Date.now()}`,
            sender: "bot",
            type: "text",
            content: "⚠️ **Important Notice**\nMost welfare schemes in this checker require Indian citizenship. If you proceed, you will likely appear ineligible for all schemes. Do you want to continue?",
            time: getFormattedTime()
          },
          {
            id: `bot-nonindian-options-${Date.now()}`,
            sender: "bot",
            type: "confirm_nationality_flow",
            time: getFormattedTime()
          }
        ]);
      }, 1000);
      return;
    }

    // Move ahead
    triggerBotResponse(updatedProfile, currentQuestionIndex + 1);
  };

  const handleConfirmNonIndianFlow = (confirm) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-confirm-${Date.now()}`,
        sender: "user",
        type: "text",
        content: confirm ? "Yes, continue check" : "Restart & change nationality",
        time: getFormattedTime()
      }
    ]);

    if (confirm) {
      triggerBotResponse(userProfile, currentQuestionIndex + 1);
    } else {
      handleRestart();
    }
  };

  // Click on scheme card inside chat to open details modal
  const openSchemeDetails = (schemeId, resultsList) => {
    const originalScheme = SCHEMES_DATA.find((s) => s.id === schemeId);
    const resultObj = resultsList.find((r) => r.schemeId === schemeId);
    
    if (originalScheme && resultObj) {
      setSelectedScheme({
        ...originalScheme,
        eligible: resultObj.eligible,
        reasons: resultObj.reasons
      });
    }
  };

  // Render chatbot messages correctly
  const renderMessageContent = (msg) => {
    if (msg.type === "text" || msg.type === "question") {
      // Basic markdown parser for bold **bold**
      const formatted = msg.content.split("\n").map((line, idx) => {
        let lineContent = line;
        
        // Match bold elements
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        const elements = [];
        let lastIdx = 0;
        
        while ((match = boldRegex.exec(line)) !== null) {
          if (match.index > lastIdx) {
            elements.push(line.substring(lastIdx, match.index));
          }
          elements.push(<strong key={match.index}>{match[1]}</strong>);
          lastIdx = boldRegex.lastIndex;
        }
        
        if (lastIdx < line.length) {
          elements.push(line.substring(lastIdx));
        }

        return (
          <React.Fragment key={idx}>
            {elements.length > 0 ? elements : lineContent}
            <br />
          </React.Fragment>
        );
      });

      return <div className="message-content">{formatted}</div>;
    }

    if (msg.type === "confirm_nationality_flow") {
      return (
        <div className="quick-replies-container">
          <button 
            className="quick-reply-btn"
            onClick={() => handleConfirmNonIndianFlow(true)}
          >
            Yes, Continue Eligibility Check
          </button>
          <button 
            className="quick-reply-btn"
            onClick={() => handleConfirmNonIndianFlow(false)}
          >
            No, Restart Chat
          </button>
        </div>
      );
    }

    if (msg.type === "restart_prompt") {
      return (
        <div className="message-content">
          <p style={{marginBottom: '10px'}}>{msg.content}</p>
          <div className="quick-replies-container">
            <button 
              className="quick-reply-btn"
              onClick={handleRestart}
              style={{borderColor: 'var(--accent-color)', fontWeight: '600'}}
            >
              🔄 Start New Check
            </button>
          </div>
        </div>
      );
    }

    if (msg.type === "results") {
      return (
        <div className="eligibility-results-card">
          <div className="results-header">
            <span>Eligibility Results</span>
            <span style={{fontSize: '11px', color: 'var(--text-secondary)'}}>Tap to view details</span>
          </div>
          
          <div className="results-body">
            {msg.results.map((res) => (
              <div 
                key={res.schemeId} 
                className="scheme-result-item"
                onClick={() => openSchemeDetails(res.schemeId, msg.results)}
              >
                <div className="scheme-info">
                  <div className="scheme-name">{res.name}</div>
                  <div className="scheme-dept">{res.ministry}</div>
                </div>
                <div className={`status-badge ${res.eligible ? "eligible" : "ineligible"}`}>
                  {res.eligible ? "Eligible" : "Ineligible"}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  // Render question input helpers (Quick Replies or States Selectors)
  const renderInputHelper = () => {
    if (activeContact !== "schemes_bot" || isTyping) return null;
    if (currentQuestionIndex >= CHAT_QUESTIONS.length) return null;

    const currentQ = CHAT_QUESTIONS[currentQuestionIndex];

    if (currentQ.inputType === "buttons") {
      return (
        <div className="quick-replies-container" style={{padding: '10px 5%', backgroundColor: 'transparent', zIndex: 11}}>
          {currentQ.options.map((opt) => (
            <button 
              key={opt}
              className="quick-reply-btn"
              onClick={() => handleAnswerSubmit(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      );
    }

    if (currentQ.inputType === "select") {
      return (
        <div style={{padding: '10px 5%', zIndex: 11}}>
          <div className="chat-select-wrapper">
            <label style={{fontSize: '11px', fontWeight: 'bold', color: 'var(--text-secondary)'}}>
              Choose Residency:
            </label>
            <select 
              id="state-select"
              className="chat-select"
              defaultValue=""
              onChange={(e) => {
                if(e.target.value) {
                  handleAnswerSubmit(e.target.value);
                }
              }}
            >
              <option value="" disabled>-- Select State --</option>
              {currentQ.options.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    return null;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnswerSubmit(inputText);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const activeContactObj = contacts.find((c) => c.id === activeContact);

  return (
    <div className={`app-container ${currentView === 'chat' ? 'show-chat' : 'show-list'}`}>
      
      {/* LEFT SIDEBAR: CONTACT LIST */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <div className="user-avatar-container">
            <div className="avatar-initials" style={{background: 'linear-gradient(135deg, #128c7e, #25d366)'}}>IN</div>
            <div>
              <h3 style={{fontSize: '14px', fontWeight: '600'}}>My Profile</h3>
              <p style={{fontSize: '11px', color: 'var(--text-secondary)'}}>Status: Online</p>
            </div>
          </div>
          <div className="sidebar-header-actions">
            <button className="icon-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button className="icon-btn" onClick={handleRestart} title="Restart Bot Flow">
              🔄
            </button>
          </div>
        </header>

        <div className="sidebar-search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon"><Icons.Search /></span>
            <input 
              type="text" 
              placeholder="Search or start new chat" 
              className="search-input" 
              disabled
            />
          </div>
        </div>

        <div className="chat-list">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className={`chat-item ${activeContact === contact.id ? "active" : ""}`}
              onClick={() => {
                setActiveContact(contact.id);
                setCurrentView("chat");
              }}
            >
              <div className="avatar-initials">{contact.avatarInitials}</div>
              <div className="chat-item-details">
                <div className="chat-item-header">
                  <span className="chat-item-name">{contact.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="chat-item-time">{contact.time}</span>
                    {contact.id !== "schemes_bot" && (
                      <button 
                        className="delete-chat-btn"
                        onClick={(e) => deleteContact(e, contact.id)}
                        title="Delete chat"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontSize: '15px',
                          padding: '2px 6px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0.5,
                          transition: 'opacity 0.2s, background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.5';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <div className="chat-item-message-row">
                  <span className="chat-item-preview">
                    {contact.id === "schemes_bot" && currentQuestionIndex < CHAT_QUESTIONS.length
                      ? "Click to continue checking eligibility..." 
                      : contact.lastMessage
                    }
                  </span>
                  {contact.unread > 0 && <span className="chat-badge">{contact.unread}</span>}
                  {contact.online && <span className="online-badge">Online</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT WINDOW */}
      {activeContactObj ? (
        <main className="chat-container">
          <div className="chat-wallpaper"></div>
          
          <header className="chat-header">
            <div className="chat-header-info">
              <button 
                className="back-btn" 
                onClick={() => setCurrentView("list")}
                title="Go back to chat list"
              >
                <Icons.Back />
              </button>
              
              <div className="avatar-initials">{activeContactObj.avatarInitials}</div>
              
              <div className="chat-header-meta">
                <h4 className="chat-header-name">{activeContactObj.name}</h4>
                <p className="chat-header-status">
                  {activeContactObj.id === "schemes_bot" 
                    ? (isTyping ? "typing..." : "online")
                    : "offline"
                  }
                </p>
              </div>
            </div>

            <div className="chat-header-actions">
              <button className="icon-btn" title="Mock Video Call"><Icons.Video /></button>
              <button className="icon-btn" title="Mock Voice Call"><Icons.Call /></button>
              <span style={{borderLeft: '1px solid var(--border-color)', height: '20px'}}></span>
              <button 
                className="icon-btn" 
                onClick={() => setShowRightDrawer(!showRightDrawer)}
                title="Toggle Bot Information Sidebar"
              >
                ℹ️
              </button>
            </div>
          </header>

          <section className="chat-messages">
            {/* Encryption notice */}
            <div className="chat-date-indicator" style={{display: 'flex', alignItems: 'center', gap: '5px', alignSelf: 'center'}}>
              <Icons.Lock /> Messages are fully client-side simulated
            </div>

            {activeContact === "schemes_bot" ? (
              // Active schemes eligibility chatbot
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`message-wrapper ${msg.sender === "bot" ? "incoming" : "outgoing"}`}>
                    <div className="message-bubble">
                      {renderMessageContent(msg)}
                      <div className="message-meta">
                        {msg.time}
                        {msg.sender === "user" && <Icons.DoubleCheck />}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message-wrapper incoming">
                    <div className="message-bubble" style={{borderRadius: '12px'}}>
                      <div className="typing-indicator">
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Mock messages for other chats
              <div style={{
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                color: 'var(--text-secondary)',
                fontSize: '14px',
                textAlign: 'center',
                padding: '20px'
              }}>
                <div style={{fontSize: '48px', marginBottom: '15px'}}>💬</div>
                <h3>This is a mock chat for aesthetic purposes.</h3>
                <p style={{maxWidth: '300px', marginTop: '8px'}}>Select the "India Schemes Eligibility Bot 🇮🇳" chat on the left or top to check your eligibility!</p>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </section>

          {/* Quick replies & dropdown select selectors inside active chat viewport */}
          {renderInputHelper()}

          {/* Chat text input box at the bottom */}
          <footer className="chat-input-bar">
            <div className="chat-input-actions">
              <button className="icon-btn" title="Add Emoticon"><Icons.Emoticon /></button>
              <button className="icon-btn" title="Attach Document/Media"><Icons.Attach /></button>
            </div>

            <div className="chat-input-form">
              <input 
                type={
                  activeContact === "schemes_bot" && currentQuestionIndex < CHAT_QUESTIONS.length && CHAT_QUESTIONS[currentQuestionIndex].inputType === "number"
                    ? "number"
                    : "text"
                }
                placeholder={
                  activeContact === "schemes_bot" && currentQuestionIndex < CHAT_QUESTIONS.length
                    ? CHAT_QUESTIONS[currentQuestionIndex].placeholder || "Type a message..."
                    : "Type a message..."
                } 
                className="chat-input-box" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={
                  activeContact !== "schemes_bot" || 
                  (currentQuestionIndex < CHAT_QUESTIONS.length && ["buttons", "select"].includes(CHAT_QUESTIONS[currentQuestionIndex].inputType)) ||
                  currentQuestionIndex >= CHAT_QUESTIONS.length
                }
              />
            </div>

            <button 
              className={`chat-send-btn ${inputText.trim() ? "active" : ""}`}
              onClick={() => handleAnswerSubmit(inputText)}
              disabled={!inputText.trim()}
              title="Send Message"
            >
              {inputText.trim() ? <Icons.Send /> : <Icons.Mic />}
            </button>
          </footer>
        </main>
      ) : (
        <div className="welcome-screen">
          <div className="welcome-logo">🇮🇳</div>
          <h2 className="welcome-title">India Schemes Checker</h2>
          <p className="welcome-desc">
            Replication of WhatsApp Chat interface for checking Indian Citizen Schemes eligibility. Click on a chat to begin asking questions.
          </p>
          <div className="welcome-encryption-notice">
            <Icons.Lock /> Fully Client-Side & Responsive
          </div>
        </div>
      )}

      {/* RIGHT SIDEBAR PANEL: BOT INFORMATION & USER PROFILE */}
      {showRightDrawer && activeContact === "schemes_bot" && (
        <aside className="right-drawer">
          <header className="drawer-header">
            <button className="icon-btn" onClick={() => setShowRightDrawer(false)} title="Close Sidebar">✕</button>
            <div className="drawer-title">Bot Info & Summary</div>
          </header>
          <div className="drawer-body">
            <div className="avatar-initials" style={{width: '90px', height: '90px', fontSize: '36px', background: 'linear-gradient(135deg, #00a884, #008069)'}}>🇮🇳</div>
            <div className="drawer-profile-title">India Schemes Bot</div>
            <div className="drawer-profile-subtitle">Official Eligibility Assistant</div>
            
            <div className="drawer-info-group">
              <h4 style={{fontSize: '12px', fontWeight: '700', color: 'var(--accent-color)', marginBottom: '4px'}}>Real-time Profile Summary</h4>
              
              <div className="drawer-info-item">
                <span className="drawer-info-label">Name</span>
                <span className="drawer-info-value">{userProfile.name || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Gender</span>
                <span className="drawer-info-value">{userProfile.gender || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Indian Citizen</span>
                <span className="drawer-info-value">{userProfile.nationality || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Marital Status</span>
                <span className="drawer-info-value">{userProfile.maritalStatus || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Age</span>
                <span className="drawer-info-value">{userProfile.age ? `${userProfile.age} Years` : "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">State</span>
                <span className="drawer-info-value">{userProfile.state || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Annual Income</span>
                <span className="drawer-info-value">
                  {userProfile.income ? `₹${Number(userProfile.income).toLocaleString('en-IN')}` : "—"}
                </span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Owns 4-Wheeler</span>
                <span className="drawer-info-value">{userProfile.ownsFourWheeler || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Govt Job / Taxpayer</span>
                <span className="drawer-info-value">{userProfile.govtEmployeeOrTaxpayer || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Occupation</span>
                <span className="drawer-info-value">{userProfile.occupation || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Has Daughter (&lt;10 yrs)</span>
                <span className="drawer-info-value">{userProfile.hasDaughter || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Category</span>
                <span className="drawer-info-value">{userProfile.category || "—"}</span>
              </div>
              <div className="drawer-info-item">
                <span className="drawer-info-label">Differently Abled</span>
                <span className="drawer-info-value">{userProfile.disability || "—"}</span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* SCHEME DETAIL MODAL */}
      {selectedScheme && (
        <div className="modal-overlay" onClick={() => setSelectedScheme(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3 className="modal-title">{selectedScheme.name}</h3>
              <button className="close-modal-btn" onClick={() => setSelectedScheme(null)}>✕</button>
            </header>
            
            <div className="modal-body">
              <div className="modal-section">
                <span className="modal-section-title">Department / Ministry</span>
                <p className="modal-section-content">{selectedScheme.ministry}</p>
              </div>

              <div className="modal-section">
                <span className="modal-section-title">Category</span>
                <span className="status-badge eligible" style={{alignSelf: 'flex-start', margin: '4px 0'}}>
                  {selectedScheme.category}
                </span>
              </div>

              <div className="modal-section">
                <span className="modal-section-title">Description</span>
                <p className="modal-section-content">{selectedScheme.description}</p>
              </div>

              <div className="modal-section">
                <span className="modal-section-title">Key Scheme Benefits</span>
                <p className="modal-section-content" style={{fontWeight: '500', color: 'var(--text-primary)'}}>
                  {selectedScheme.benefits}
                </p>
              </div>

              <div className="modal-section">
                <span className="modal-section-title">Eligibility Evaluation Analysis</span>
                <ul className="reason-list">
                  {selectedScheme.reasons.map((reason, idx) => (
                    <li 
                      key={idx} 
                      className={`reason-item ${selectedScheme.eligible ? "eligible-reason" : "ineligible-reason"}`}
                      style={{listStyleType: selectedScheme.eligible ? 'disc' : 'circle'}}
                    >
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <footer className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedScheme(null)}>Close</button>
              {selectedScheme.eligible && (
                <a 
                  href={selectedScheme.applyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Apply Online ↗
                </a>
              )}
            </footer>
          </div>
        </div>
      )}

    </div>
  );
}
