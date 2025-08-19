import { h } from 'preact';

function WelcomeDashboard({ onNavigate }) {
  return (
    <div className="p-2 sm:p-3 md:p-4 bg-white flex flex-col flex-1">
      <div className="bg-[#E9E9E9] rounded-tr-4xl rounded-tl-4xl rounded-bl-4xl sm:rounded-tr-4xl sm:rounded-tl-4xl rounded-bl-4xlp-3 sm:p-4 md:p-5 mb-3 sm:mb-4">
        <h2 className="text-[#202020] text-sm sm:text-base md:text-lg font-bold mb-2">Welcome to our website!</h2>
        <p className="text-[#202020] text-xs sm:text-xs md:text-sm leading-relaxed opacity-80">Nice to meet you! If you have any question about our services, feel free to contact us.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-0">
        <button 
          className="flex-1 bg-[linear-gradient(270deg,_#A7BEFE_0%,_#43319A_100%)] text-white text-xs sm:text-xs md:text-sm border-none rounded-full py-2 sm:py-2.5 md:py-3 cursor-pointer font-medium transition-all duration-200 text-center shadow-lg hover:from-purple-600 hover:to-purple-700 active:opacity-80"
          onClick={() => onNavigate('faq')}
        >
          FAQ
        </button>
        <button 
          className="flex-1 bg-[linear-gradient(270deg,_#A7BEFE_0%,_#43319A_100%)] text-white text-xs sm:text-xs md:text-sm border-none rounded-full py-2 sm:py-2.5 md:py-3 cursor-pointer font-medium transition-all duration-200 text-center shadow-lg hover:from-purple-600 hover:to-purple-700 active:opacity-80"
          onClick={() => onNavigate('talk')}
        >
          Let's Talk
        </button>
      </div>
    </div>
  );
}


export default WelcomeDashboard; 