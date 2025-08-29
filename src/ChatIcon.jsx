import { h } from 'preact';

function ChatIcon({ onClick }) {
  return (
    <div className="fixed right-8 bottom-8 z-[2100]">
      {/* Outer ripple rings */}
      <div className="absolute inset-0 rounded-full animate-ripple-1"></div>
      <div className="absolute inset-0 rounded-full animate-ripple-2"></div>
      <div className="absolute inset-0 rounded-full animate-ripple-3"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 blur-md opacity-60 animate-pulse-glow"></div>
      
      {/* Main button */}
      <button
        onClick={onClick}
        aria-label="Open chat"
        className="
          relative
          w-14 h-14
          rounded-full
          bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600
          text-white text-2xl
          border-2 border-white/20
          shadow-2xl
          flex items-center justify-center
          cursor-pointer
          transition-all duration-300
          hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
          active:scale-95
          animate-float"
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        
        {/* Water ripple effect */}
        <div className="absolute inset-0 rounded-full animate-water-ripple"></div>
        
        {/* Icon with subtle animation */}
        <span className="relative z-10 animate-icon-bounce">💬</span>
      </button>

      <style jsx>{`
        /* Floating animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        /* Ripple animations */
        @keyframes ripple-1 {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        
        @keyframes ripple-2 {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        
        @keyframes ripple-3 {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        
        /* Pulse glow animation */
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
        
        /* Water ripple effect */
        @keyframes water-ripple {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        /* Icon bounce animation */
        @keyframes icon-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        /* Breathing effect */
        @keyframes breathe {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-ripple-1 {
          animation: ripple-1 2s ease-out infinite;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        }
        
        .animate-ripple-2 {
          animation: ripple-2 2s ease-out infinite 0.5s;
          background: radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%);
        }
        
        .animate-ripple-3 {
          animation: ripple-3 2s ease-out infinite 1s;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-water-ripple {
          animation: water-ripple 1.5s ease-out infinite;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        }
        
        .animate-icon-bounce {
          animation: icon-bounce 2s ease-in-out infinite;
        }
        
        /* Hover effects */
        button:hover {
          animation: breathe 1s ease-in-out infinite;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .fixed {
            right: 1rem;
            bottom: 1rem;
          }
          
          button {
            width: 3.5rem;
            height: 3.5rem;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ChatIcon;
