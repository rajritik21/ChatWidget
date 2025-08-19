// =============================
// FAQDashboard.jsx - Component Index
// =============================
// 1. Imports
// 2. FAQDashboard Component
//    2.1. State Declarations
//    2.2. useEffect: Fetch FAQs
//    2.3. useEffect: Input Focus
//    2.4. Helper Functions
//        - isTalkToSomeone
//        - findOptionByPath
//    2.5. OptionTree: Recursive Option Renderer
//    2.6. handleSend: User Message Handler
//    2.7. Render: Main Return (Header, Body, Input)
// 3. Export

import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function FAQDashboard({ onGoBack }) {
  // =============================
  // 2.1. State Declarations
  // =============================
  const [faqs, setFaqs] = useState([]); // FAQ data from API
  const [loading, setLoading] = useState(true); // Loading state for FAQ fetch
  const [error, setError] = useState(null); // Error state for FAQ fetch
  const [activeId, setActiveId] = useState(null); // Currently selected FAQ id
  const [inputEnabled, setInputEnabled] = useState(false); // Enables input for 'Talk to someone?'
  const inputRef = typeof window !== 'undefined' ? window.preactHooks?.useRef?.() || { current: null } : { current: null }; // Input ref for focus
  const [inputValue, setInputValue] = useState(""); // User input value
  const [userMessages, setUserMessages] = useState([]); // User messages in chat
  const [activeOptionPath, setActiveOptionPath] = useState([]); // Path of selected nested options
  const [showResponse, setShowResponse] = useState(false); // Controls main FAQ response visibility
  const [showOptionResponse, setShowOptionResponse] = useState(false); // (Unused) Option response visibility
  const [optionResponseStates, setOptionResponseStates] = useState({}); // Controls nested option response visibility
  const [faqLoading, setFaqLoading] = useState({}); // Loading state for each FAQ button
  const [optionLoading, setOptionLoading] = useState({}); // Loading state for each nested option button

  // =============================
  // 2.2. useEffect: Fetch FAQs
  // =============================
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add 0.5 second delay to simulate loading time
        await new Promise(resolve => setTimeout(resolve, 500));
        const res = await fetch('http://localhost:5096/api/Faq');
        const data = await res.json();
        setFaqs(Array.isArray(data.result) ? data.result : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // =============================
  // 2.3. useEffect: Input Focus
  // =============================
  useEffect(() => {
    if (inputEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputEnabled]);

  // =============================
  // 2.4. Helper Functions
  // =============================
  // Checks if FAQ is 'Talk to someone?'
  const isTalkToSomeone = (faq) =>
    faq.query && faq.query.trim().toLowerCase() === 'talk to someone?';

  // Finds option by path (array of ids)
  function findOptionByPath(options, path) {
    let current = null;
    let opts = options;
    for (let id of path) {
      current = opts.find(o => o.id === id);
      if (!current) return null;
      opts = current.options || [];
    }
    return current;
  }

  // =============================
  // 2.5. OptionTree: Recursive Option Renderer
  // =============================
  function OptionTree({ options, path }) {
    if (!options || !options.length) return null;
    const selectedId = activeOptionPath[path.length] || null;
    // Handles click for nested options with async delay and loading state
    const handleOptionClick = async (option, currentPath) => {
      const optionKey = currentPath.join('-') + '-' + option.id;
      setOptionLoading(prev => ({ ...prev, [optionKey]: true }));
      try {
        setActiveOptionPath([...currentPath, option.id]);
        setOptionResponseStates(prev => ({ ...prev, [optionKey]: false }));
        await new Promise(resolve => setTimeout(resolve, 500));
        setOptionResponseStates(prev => ({ ...prev, [optionKey]: true }));
      } catch (error) {
        setOptionResponseStates(prev => ({ ...prev, [optionKey]: true }));
      } finally {
        setOptionLoading(prev => ({ ...prev, [optionKey]: false }));
      }
    };
    return (
      <div className={`ml-${path.length * 3} sm:ml-${path.length * 4} md:ml-${path.length * 5} mt-1.5 sm:mt-2`}>
        {options.map(option => {
          const optionKey = path.join('-') + '-' + option.id;
          const showThisOptionResponse = optionResponseStates[optionKey];
          const isLoading = optionLoading[optionKey];
          return (
            <div key={option.id} className="flex flex-col">
              {/* Option button with spinner and async delay */}
              <button
                className="bg-white border-2 border-[#A3B9FA] text-[#6D6CC4] rounded-full py-3 px-4 mt-3.5 text-xs font-medium cursor-pointer max-w-[70%] sm:max-w-[65%] md:max-w-[60%] self-end text-left transition-all duration-200 shadow-sm hover:bg-purple-50 hover:border-[#6C57FF] hover:text-[#6C57FF] flex items-center justify-between"
                onClick={() => handleOptionClick(option, path)}
                disabled={isLoading}
              >
                {option.optionText}
                {isLoading && (
                  <svg className="w-4 h-4 ml-2 animate-spin inline-block" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </button>
              {/* Option response and recursive sub-options */}
              {selectedId === option.id && showThisOptionResponse && (
                <>
                  {option.response && (
                    <div className="bg-[#F4F4F4] text-[#171717] rounded-bl-4xl rounded-br-4xl rounded-tr-4xl p-2 sm:p-3 my-1.5 sm:my-2 text-xs sm:text-xs md:text-sm font-medium self-start">
                      {option.response}
                    </div>
                  )}
                  <OptionTree options={option.options} path={[...path, option.id]} />
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // =============================
  // 2.6. handleSend: User Message Handler
  // =============================
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputEnabled || !inputValue.trim()) return;
    setUserMessages(msgs => [...msgs, inputValue.trim()]);
    setInputValue("");
  };

  // =============================
  // 2.7. Render: Main Return (Header, Body, Input)
  // =============================
  return (
    <div className="flex flex-col h-[400px] sm:h-[480px] md:h-[560px] min-h-[320px] sm:min-h-[400px] md:min-h-[440px] max-h-[400px] sm:max-h-[480px] md:max-h-[560px]">
      {/* Chat Header */}
      <div className="bg-[linear-gradient(270deg,_#A7BEFE_0%,_#6E6EC5_36.11%,_#5347AA_64.88%,_#43319A_100%)] rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl p-2 sm:p-2.5 relative flex-shrink-0">
        <div className="flex items-center justify-center relative">
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/25 text-white border-none rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-sm sm:text-base md:text-lg cursor-pointer transition-all duration-200 p-0 shadow-md hover:bg-white/35 hover:scale-105"
            onClick={onGoBack}
          >
            ←
          </button>
          <h3 className="m-0 text-base sm:text-lg md:text-xl font-semibold text-white text-center">ChatFlow</h3>
        </div>
        <small className="opacity-90 block text-xs sm:text-xs md:text-sm leading-relaxed text-white text-center mt-1 sm:mt-2">
          A live chat interface that allows for seamless, natural communication and connection.
        </small>
      </div>

      {/* Chat Body */}
      <div className="p-2 sm:p-2.5 bg-white flex flex-col flex-1 overflow-hidden relative">
        {loading && (
          <div className="flex flex-col items-center justify-center h-32 sm:h-40 md:h-44">
            <div className="mb-2 sm:mb-2.5 animate-spin">
              <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke="#6C57FF" strokeWidth="4" strokeDasharray="90 60" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-[#44329B] font-medium text-xs sm:text-sm md:text-base">Loading FAQs...</div>
          </div>
        )}

        {error && (
          <div className="text-white bg-red-500 rounded-lg sm:rounded-xl p-3 sm:p-4 my-3 sm:my-4 md:my-5 text-center font-medium text-xs sm:text-xs md:text-sm">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-gray-100 pb-2 sm:pb-2.5">
            <div className="bg-[#F4F4F4] text-[#171717]  rounded-bl-4xl rounded-br-4xl rounded-tr-4xl p-2 sm:p-3 my-3 sm:my-4 max-w-[85%] sm:max-w-[80%] text-xs sm:text-xs md:text-sm font-medium self-start">
              Hi! How Can I help You?
            </div>
            {/* FAQ List */}
            {Array.isArray(faqs) && faqs.length > 0 ? (
              faqs.map(faq => (
                <div key={faq.id} className="flex flex-col">
                  {/* FAQ button with spinner and async delay */}
                  <button
                    className="bg-white border border-[#A3B9FA] text-[#A3B9FA] rounded-3xl py-4 px-4 mt-3.5 text-xs font-medium cursor-pointer w-[160px] h-10 self-end text-left transition-all duration-200 shadow-sm hover:bg-purple-50 hover:border-[#6C57FF] hover:text-[#6C57FF] flex items-center justify-between"
                    onClick={async () => {
                      const loadingKey = faq.id;
                      setFaqLoading(prev => ({ ...prev, [loadingKey]: true }));
                      try {
                        if (activeId === faq.id) {
                          setActiveId(null);
                          setShowResponse(false);
                          setActiveOptionPath([]);
                        } else {
                          setActiveId(faq.id);
                          setShowResponse(false);
                          setActiveOptionPath([]);
                          if (isTalkToSomeone(faq)) setInputEnabled(true);
                          await new Promise(resolve => setTimeout(resolve, 500));
                          setShowResponse(true);
                        }
                      } catch (error) {
                        setShowResponse(true);
                      } finally {
                        setFaqLoading(prev => ({ ...prev, [loadingKey]: false }));
                      }
                    }}
                    disabled={faqLoading[faq.id]}
                  >
                    {faq.query}
                    {faqLoading[faq.id] && (
                      <svg className="w-4 h-4 ml-2 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                  </button>
                  {/* FAQ response and options */}
                  {activeId === faq.id && showResponse && (
                    <>
                      <div className="bg-[#F4F4F4] text-[#171717] rounded-bl-4xl rounded-br-4xl rounded-tr-4xl sm:rounded-bl-4xl sm:rounded-br-4xl sm:rounded-tr-4xl p-2 sm:p-3 my-1.5 sm:my-2 text-xs sm:text-xs md:text-sm font-medium self-start">
                        {faq.response}
                      </div>
                      {/* Render options if present */}
                      {faq.options && faq.options.length > 0 && (
                        <OptionTree options={faq.options} path={[]} />
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center mt-4 sm:mt-6 text-xs sm:text-xs md:text-sm">No FAQs available.</div>
            )}
            {/* User messages */}
            {userMessages.map((msg, idx) => (
              <div key={idx} className="bg-[#FAF9FF] text-[#44329B] border border-[#44329B] rounded-bl-3xl rounded-br-3xl rounded-tl-3xl px-3 sm:px-4 py-1.5 sm:py-2 my-2 sm:my-2.5 text-xs sm:text-xs md:text-sm font-medium ml-auto text-right shadow-md max-w-fit
">
                {msg}
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form className="relative w-full flex items-center mt-1.5 sm:mt-2 mb-3 sm:mb-4" onSubmit={handleSend}>
          <input
            className={`w-full border-none  bg-gray-100 py-2.5 sm:py-3 md:py-3.5 px-3 sm:px-4 rounded-full text-gray-800 text-xs sm:text-xs md:text-sm shadow-sm transition-all duration-200 ${
              inputEnabled ? 'border-2 border-purple-500 bg-white' : ''
            } ${!inputEnabled ? 'bg-gray-200 text-gray-400' : ''}`}
            ref={inputRef}
            value={inputValue}
            onInput={e => setInputValue(e.target.value)}
            placeholder="Let's share something"
            disabled={!inputEnabled}
          />
          <button 
            className={`absolute right-2 sm:right-2.5 bg-[#4C3DA3] border-none rounded-full text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-sm sm:text-base cursor-pointer transition-all duration-200 flex-shrink-0 shadow-md ${
              !inputEnabled || !inputValue.trim() ? 'bg-[#4C3DA3] text-gray-300 cursor-not-allowed' : 'hover:bg-purple-600 hover:scale-105'
            }`}
            type="submit" 
            disabled={!inputEnabled || !inputValue.trim()}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}

// =============================
// 3. Export
// =============================
export default FAQDashboard; 