import { useApp } from "../../context/AppContext";

export function MobileHeader() {
  const { toggleSidebar } = useApp();

  return (
    <header className="md:hidden bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center z-30 shadow-md sticky top-0 shrink-0">
      <div>
        <h2 className="text-xl font-bold tracking-wider">
          Maro <span className="text-[#E30613]">DASH</span>
        </h2>
      </div>
      <button
        onClick={toggleSidebar}
        className="text-white hover:text-[#E30613] transition focus:outline-none p-1"
        aria-label="فتح القائمة"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
}
