import { h } from 'preact';

function ChatIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat"
      className="
        fixed right-8 bottom-8
        w-14 h-14
        rounded-full
        bg-gradient-to-br from-[#6C57FF] to-[#9A73FF]
        text-white text-2xl
        border-none shadow-lg
        flex items-center justify-center
        cursor-pointer z-[2100]"
    >
      💬
    </button>
  );
}

export default ChatIcon;
