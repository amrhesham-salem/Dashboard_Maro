import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";

// ===== NAV ITEMS =====
interface NavItem {
  to: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "الرئيسية" },
  { to: "/diary", label: "اليوميات" },
  { to: "/subjects", label: "مواد الكلية" },
  { to: "/courses", label: "تتبع الكورسات" },
  { to: "/planner", label: "خطة الأيام" },
  { to: "/settings", label: "الإعدادات" },
  { to: "/contact", label: "تواصل معي" },
];

const ACTIVE_CLASS =
  "block bg-[#E30613]/10 text-[#E30613] p-3 rounded-xl font-bold cursor-pointer";
const INACTIVE_CLASS =
  "block text-gray-400 hover:text-white p-3 rounded-xl transition cursor-pointer";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useApp();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-0 inset-y-0 right-0 z-50 w-64
          bg-[#1a1a1a] h-screen p-6 border-l border-white/5 shadow-2xl
          transform transition-transform duration-300 flex flex-col shrink-0
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo + Lines */}
        <div className="mb-10 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-bold tracking-wider">
              Maro <span className="text-[#E30613]">DASH</span>
            </h2>
            <div className="mt-2 space-y-1">
              <div className="h-1 w-17 bg-[#E30613] zsc-line" />
              <div className="h-1 w-11.25 bg-[#E30613] zsc-line" />
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={closeSidebar}
            className="md:hidden text-gray-500 hover:text-[#E30613] transition p-1"
            aria-label="إغلاق القائمة"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-2 flex-1 mt-4 overflow-y-auto pr-1 pb-24 md:pb-0">
          <NavLink
            to="/"
            end
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? ACTIVE_CLASS : INACTIVE_CLASS)}
          >
            الرئيسية
          </NavLink>

          <hr className="border-t border-[#E30613]/20 my-4 shadow-[0_0_10px_rgba(227,6,19,0.1)]" />

          {NAV_ITEMS.slice(1, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? ACTIVE_CLASS : INACTIVE_CLASS)}
            >
              {item.label}
            </NavLink>
          ))}

          <hr className="border-t border-white/5 my-4" />

          {NAV_ITEMS.slice(5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? ACTIVE_CLASS : INACTIVE_CLASS)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
