import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import ElectricBorder from "./ElectricBorder"; // Adjust the path if needed

function FAQDashboard({ onGoBack }) {
  // =============================
  // State Declarations
  // =============================
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(true);
  const inputRef = useRef(null);
  const chatScrollRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi! How Can I help You? ✨",
      timestamp: Date.now(),
    },
  ]);
  const [activeOptionPath, setActiveOptionPath] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [optionResponseStates, setOptionResponseStates] = useState({});
  const [faqLoading, setFaqLoading] = useState({});
  const [optionLoading, setOptionLoading] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // =============================
  // Auto-scroll to bottom function
  // =============================
  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      setTimeout(() => {
        chatScrollRef.current.scrollTo({
          top: chatScrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  // =============================
  // Initialize
  // =============================
  useEffect(() => {
    setFaqs([]);
    setLoading(false);
    setInputEnabled(true);
    scrollToBottom();
  }, []);

  // =============================
  // Auto-scroll when messages change (only for user messages, not AI replies)
  // =============================
  useEffect(() => {
    // Only auto-scroll if it's a user message or initial load
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === "user") {
      scrollToBottom();
    }
  }, [messages]);

  // =============================
  // Input Focus Handler
  // =============================
  useEffect(() => {
    if (inputEnabled && inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [inputEnabled, isTyping]);

  // =============================
  // Helper Functions
  // =============================
  const isTalkToSomeone = (faq) =>
    faq.query && faq.query.trim().toLowerCase() === "talk to someone?";

  function findOptionByPath(options, path) {
    let current = null;
    let opts = options;
    for (let id of path) {
      current = opts.find((o) => o.id === id);
      if (!current) return null;
      opts = current.options || [];
    }
    return current;
  }

  // =============================
  // Recursive Option Renderer
  // =============================
  function OptionTree({ options, path }) {
    if (!options || !options.length) return null;
    const selectedId = activeOptionPath[path.length] || null;

    const handleOptionClick = async (option, currentPath) => {
      const optionKey = currentPath.join("-") + "-" + option.id;
      setOptionLoading((prev) => ({ ...prev, [optionKey]: true }));
      try {
        setActiveOptionPath([...currentPath, option.id]);
        setOptionResponseStates((prev) => ({ ...prev, [optionKey]: false }));
        await new Promise((resolve) => setTimeout(resolve, 800));
        setOptionResponseStates((prev) => ({ ...prev, [optionKey]: true }));
        // Don't auto-scroll for option responses
      } catch (error) {
        setOptionResponseStates((prev) => ({ ...prev, [optionKey]: true }));
      } finally {
        setOptionLoading((prev) => ({ ...prev, [optionKey]: false }));
      }
    };

    return (
      <div
        className="mt-3 sm:mt-4 animate-fadeIn"
        style={{ marginLeft: `${path.length * 16}px` }}
      >
        {options.map((option) => {
          const optionKey = path.join("-") + "-" + option.id;
          const showThisOptionResponse = optionResponseStates[optionKey];
          const isLoading = optionLoading[optionKey];
          return (
            <div key={option.id} className="flex flex-col">
              <button
                className="group relative bg-gradient-to-r from-white to-purple-50 border-2 border-purple-200 text-purple-700 rounded-2xl py-3 px-5 mt-4 text-sm font-semibold cursor-pointer max-w-[75%] sm:max-w-[70%] md:max-w-[65%] self-end text-left transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-400 hover:from-purple-50 hover:to-purple-100 transform active:scale-95 backdrop-blur-sm"
                onClick={() => handleOptionClick(option, path)}
                disabled={isLoading}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1 pr-2">{option.optionText}</span>
                  {isLoading ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  ) : (
                    <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:bg-purple-600 transition-colors duration-200"></div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </button>

              {selectedId === option.id && showThisOptionResponse && (
                <div className="animate-slideIn">
                  {option.response && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-3xl rounded-tl-lg p-4 sm:p-5 my-3 sm:my-4 text-sm sm:text-base font-medium self-start shadow-md border border-gray-200 animate-fadeIn">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">{option.response}</div>
                      </div>
                    </div>
                  )}
                  <OptionTree
                    options={option.options}
                    path={[...path, option.id]}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // =============================
  // Message Handler with Gemini API
  // =============================
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputEnabled || !inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setInputValue("");

    // Add user message to chat
    setMessages((msgs) => [
      ...msgs,
      {
        type: "user",
        content: userMsg,
        timestamp: Date.now(),
      },
    ]);

    // Show typing indicator
    setIsTyping(true);
    setError(null);

    try {
      const apiKey = "AIzaSyCJ63G5XT4zAkPMtGS-wrwbdl2fA9h3wn0";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userMsg }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        throw new Error(
          `API request failed: ${errorData.error?.message || res.status}`
        );
      }

      const data = await res.json();
      console.log("API Response:", data);

      const geminiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      // Add bot response to chat (this won't trigger auto-scroll)
      setMessages((msgs) => [
        ...msgs,
        {
          type: "bot",
          content: geminiReply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error("Gemini API error:", err);
      const errorMessage = err.message.includes("API request failed")
        ? `Something went wrong. Please try again! 🔄`
        : "Sorry, I'm having trouble connecting right now. Please try again! 🌐";

      setMessages((msgs) => [
        ...msgs,
        {
          type: "bot",
          content: errorMessage,
          timestamp: Date.now(),
        },
      ]);
      setError("Connection error. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  // =============================
  // Main Render
  // =============================
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col h-[85vh] sm:h-[90vh] md:h-[85vh] lg:h-[80vh] max-h-[800px] min-h-[700px] relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 -right-5 w-16 h-16 bg-indigo-400/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Chat Header with smaller font size and animated text */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-t-3xl p-4 sm:p-5 md:p-6 flex-shrink-0 shadow-2xl backdrop-blur-lg border border-white/20">
        <div className="flex items-center justify-center relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 group bg-white/20 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:border-white/50 active:scale-95 shadow-lg"
            onClick={onGoBack}
          >
            <span className="group-hover:animate-bounce">←</span>
          </button>
          <div className="text-center">
            {" "}
            <h3 className="m-0 text-lg sm:text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent animate-text-glow">
              {" "}
              <span className="animate-text-wave">AskRitik</span> 💬{" "}
            </h3>{" "}
            <small className="opacity-90 block text-xs sm:text-sm leading-relaxed text-cyan-200 mt-2 animate-text-fade">
              {" "}
              Ask Anything, Get Everything - Powered by Ritik 💭{" "}
            </small>{" "}
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div
        className="flex-1 border-x-2 border-white/20 flex flex-col overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ef 100%)", // Light gray gradient background
          backdropFilter: "blur(8px)",
        }}
      >
        {loading && (
          <div className="flex flex-col items-center justify-center flex-1 animate-fadeIn">
            <div className="relative mb-4">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1s",
                }}
              ></div>
            </div>
            <div className="text-purple-700 font-semibold text-lg animate-pulse">
              Loading FAQs...
            </div>
          </div>
        )}

        {error && (
          <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl text-center font-semibold shadow-lg animate-slideIn">
            {error}
          </div>
        )}

        {!loading && (
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent hover:scrollbar-thumb-purple-400 scroll-smooth"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#a855f7 transparent",
            }}
          >
            {/* Display all messages */}
            {messages.map((message, idx) => (
              <div
                key={`${message.type}-${idx}-${message.timestamp}`}
                className="animate-fadeIn"
              >
                {message.type === "bot" ? (
                  <div className="flex items-start space-x-3 max-w-[90%]">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg flex-shrink-0">
                      🤖
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-white text-gray-800 rounded-3xl rounded-tl-lg p-4 sm:p-5 text-sm sm:text-base font-medium shadow-xl border border-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/50 pointer-events-none"></div>
                      <div className="relative">{message.content}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl rounded-tr-lg px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base font-medium shadow-xl max-w-[80%] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 pointer-events-none"></div>
                      <div className="relative">{message.content}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 max-w-[90%] animate-fadeIn">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
                  🤖
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl rounded-tl-lg p-4 sm:p-5 shadow-xl border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span className="text-gray-600 font-medium">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ List */}
            {Array.isArray(faqs) &&
              faqs.length > 0 &&
              faqs.map((faq) => (
                <div key={faq.id} className="animate-slideIn">
                  <button
                    className="group bg-gradient-to-r from-white to-purple-50 border-2 border-purple-200 text-purple-700 rounded-2xl py-3 px-5 ml-auto block text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-400 transform active:scale-95 relative overflow-hidden"
                    onClick={async () => {
                      const loadingKey = faq.id;
                      setFaqLoading((prev) => ({
                        ...prev,
                        [loadingKey]: true,
                      }));
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
                          await new Promise((resolve) =>
                            setTimeout(resolve, 800)
                          );
                          setShowResponse(true);
                          // Don't auto-scroll for FAQ responses
                        }
                      } finally {
                        setFaqLoading((prev) => ({
                          ...prev,
                          [loadingKey]: false,
                        }));
                      }
                    }}
                    disabled={faqLoading[faq.id]}
                  >
                    <div className="flex items-center justify-between">
                      <span>{faq.query}</span>
                      {faqLoading[faq.id] && (
                        <div className="ml-3 w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </button>

                  {activeId === faq.id && showResponse && (
                    <div className="animate-slideIn mt-4">
                      <div className="bg-gradient-to-r from-gray-50 to-white text-gray-800 rounded-3xl rounded-tl-lg p-4 sm:p-5 text-sm sm:text-base font-medium shadow-xl border border-gray-200">
                        {faq.response}
                      </div>
                      {faq.options && faq.options.length > 0 && (
                        <OptionTree options={faq.options} path={[]} />
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Enhanced Input Form */}
      <div className="bg-white/95 backdrop-blur-lg rounded-b-3xl p-4 sm:p-5 md:p-6 border-2 border-white/20 border-t-0 flex-shrink-0 shadow-2xl">
        <form className="relative" onSubmit={handleSend}>
          <div className="relative group">
            <ElectricBorder>
              <input
                ref={inputRef}
                className={`w-full bg-white/90 backdrop-blur-sm py-4 sm:py-5 px-6 sm:px-7 pr-16 sm:pr-20 rounded-2xl text-gray-800 text-sm sm:text-base font-medium shadow-xl border-2 transition-all duration-300 placeholder-gray-500 ${
                  inputFocused || inputValue
                    ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-white"
                    : "border-gray-300 hover:border-purple-300"
                } ${
                  !inputEnabled || isTyping
                    ? "bg-gray-100 text-gray-400 border-gray-200"
                    : ""
                }`}
                style={{ borderColor: "transparent" }} // Remove solid black border color
                value={inputValue}
                onInput={(e) => setInputValue(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={
                  isTyping
                    ? "AI is responding..."
                    : "Type your message here... ✨"
                }
                disabled={!inputEnabled || isTyping}
              />
            </ElectricBorder>
            {/* Glowing border effect */}
            <div
              className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
                inputFocused ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 blur-sm opacity-30 animate-pulse"></div>
            </div>
            <button
              className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl cursor-pointer transition-all duration-300 shadow-lg backdrop-blur-sm ${
                !inputEnabled || !inputValue.trim() || isTyping
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              }`}
              type="submit"
              disabled={!inputEnabled || !inputValue.trim() || isTyping}
            >
              {isTyping ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <span className="transform rotate-45">✈️</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }

        /* New animated text effects */
        @keyframes textGlow {
          0%,
          100% {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5),
              0 0 10px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(255, 255, 255, 0.5),
              0 0 30px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes textWave {
          0%,
          100% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-2px);
          }
          75% {
            transform: translateY(2px);
          }
        }

        @keyframes textFade {
          0%,
          100% {
            opacity: 0.9;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }

        .animate-text-wave {
          animation: textWave 2s ease-in-out infinite;
        }

        .animate-text-fade {
          animation: textFade 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default FAQDashboard;
