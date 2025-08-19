import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';

function TalkDashboard({ onGoBack }) {
  const [inputValue, setInputValue] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const inputRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (!userName) {
      setUserName(inputValue.trim());
    } else {
      setUserMessages(msgs => [...msgs, inputValue.trim()]);
    }
    setInputValue("");
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  return (
    <div className="h-[400px] sm:h-[450px] md:h-[500px] flex flex-col">
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
        <div className="flex flex-col h-full pt-[60px] sm:pt-[65px] md:pt-[70px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="bg-[#F4F4F4] text-[#171717] rounded-bl-4xl rounded-br-4xl rounded-tr-4xl sm:rounded-bl-4xl sm:rounded-br-4xl sm:rounded-tr-4xl p-2 sm:p-3 mb-3 sm:mb-4 md:mb-5 max-w-[85%] sm:max-w-[80%] text-xs sm:text-xs md:text-sm self-start">
            Thanks for joining us! Let's start by getting your name.
          </div>
          
          {userName && (
            <div className="bg-[#FAF9FF] text-[#44329B] border border-[#44329B] rounded-bl-4xl rounded-br-4xl rounded-tl-4xl sm:rounded-bl-4xl sm:rounded-br-4xl sm:rounded-tl-4xl px-3 sm:px-4 py-1.5 sm:py-2 my-2 sm:my-2.5 text-xs sm:text-xs md:text-sm font-medium ml-auto text-right shadow-md max-w-fit">
              {userName}
            </div>
          )}
          
          {userMessages.map((msg, idx) => (
            <div key={idx} className="bg-[#FAF9FF] text-[#44329B] border border-[#44329B] rounded-xl sm:rounded-bl-4xl rounded-br-4xl rounded-tl-4xl px-3 sm:px-4 py-1.5 sm:py-2 my-2 sm:my-2.5 text-xs sm:text-xs md:text-sm font-medium ml-auto text-right shadow-md max-w-fit">
              {msg}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form className="relative w-full flex items-center" onSubmit={handleSend}>
          <input
            className="w-full border-none bg-gray-100 py-2.5 sm:py-3 md:py-3.5 px-3 sm:px-4 rounded-full text-gray-800 text-xs sm:text-xs md:text-sm shadow-sm"
            ref={inputRef}
            value={inputValue}
            onInput={e => setInputValue(e.target.value)}
            placeholder="Let's share something"
          />
          <button 
            className={`absolute right-2 sm:right-3 md:right-4 bg-[#4C3DA3] border-none rounded-full text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center text-sm sm:text-base cursor-pointer transition-all duration-200 flex-shrink-0 shadow-md ${
              !inputValue.trim() ? 'bg-[#4C3DA3] text-gray-300 cursor-not-allowed' : 'hover:bg-purple-600 hover:scale-105'
            }`}
            type="submit" 
            disabled={!inputValue.trim()}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}

export default TalkDashboard; 