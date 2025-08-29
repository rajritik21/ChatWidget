import { useState } from "preact/hooks";
import ChatIcon from "./ChatIcon.jsx";
import FAQDashboard from "./FAQDashboard.jsx";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Close widget
  const closeWidget = () => {
    setOpen(false);
  };

  return (
    <div>
      <ChatIcon onClick={() => setOpen(!open)} />
      
      {open && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
            onClick={closeWidget}
          />
          
          {/* Chat Container - Always show FAQ Dashboard */}
          <div className="fixed z-50 animate-slideUp inset-0 md:right-4 md:bottom-4 md:top-4 md:left-auto md:w-[90vw] md:max-w-3xl lg:max-w-4xl xl:max-w-5xl md:h-auto">
            <div className="h-full w-full">
              <FAQDashboard
                onGoBack={closeWidget}
                inputValue={inputValue}
                onInputChange={handleInputChange}
              />
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Smooth transitions for container size changes */
        .fixed {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Custom scrollbar for the widget */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #a855f7;
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9333ea;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .animate-slideUp {
            animation: slideUpMobile 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
        
        @keyframes slideUpMobile {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ChatWidget;
