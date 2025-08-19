import { h } from 'preact';
import { useState } from 'preact/hooks';
import ChatIcon from './ChatIcon.jsx';
import WelcomeDashboard from './WelcomeDashboard.jsx';
import FAQDashboard from './FAQDashboard.jsx';
import TalkDashboard from './TalkDashboard.jsx';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('dashboard');
  const [name, setName] = useState('');
  const [previousView, setPreviousView] = useState('');
  const [inputValue, setInputValue] = useState('');

  // Navigate to a new view, keeping track of previous view for back button
  const navigateTo = (newView) => {
    setPreviousView(view);
    setView(newView);
  };

  // Go back to previous view
  const goBack = () => {
    setView(previousView || 'dashboard');
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <ChatIcon onClick={() => setOpen(!open)} />
      {open && (
        <div className="fixed right-2 sm:right-4 md:right-8 bottom-16 sm:bottom-20 md:bottom-28 w-[280px] sm:w-[300px] md:w-80 bg-white rounded-2xl sm:rounded-3xl text-gray-800 shadow-2xl z-50 font-sans overflow-hidden animate-slideUp max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] flex flex-col">
          {view === 'dashboard' && <WelcomeDashboard onNavigate={navigateTo} />}
          {view === 'faq' && <FAQDashboard onGoBack={goBack} inputValue={inputValue} onInputChange={handleInputChange} />}
          {view === 'talk' && <TalkDashboard onGoBack={goBack} name={name} inputValue={inputValue} onInputChange={handleInputChange} />}
        </div>
      )}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default ChatWidget; 