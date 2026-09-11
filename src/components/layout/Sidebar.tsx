import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

// ===== NAV ITEMS =====
interface NavItem {
  to: string;
  labelKey: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", labelKey: "nav.home" },
  { to: "/diary", labelKey: "nav.diary" },
  { to: "/subjects", labelKey: "nav.subjects" },
  { to: "/courses", labelKey: "nav.courses" },
  { to: "/planner", labelKey: "nav.planner" },
  { to: "/settings", labelKey: "nav.settings" },
  { to: "/contact", labelKey: "nav.contact" },
];

const ACTIVE_CLASS =
  "block bg-[#E30613]/10 text-[#E30613] p-3 rounded-xl font-bold cursor-pointer";
const INACTIVE_CLASS =
  "block text-gray-400 hover:text-white p-3 rounded-xl transition cursor-pointer";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useApp();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky md:top-0 inset-y-0 z-50 w-64
          bg-[#1a1a1a] h-screen p-6 shadow-2xl
          transform transition-transform duration-300 flex flex-col shrink-0
          ${isRTL ? "right-0 border-l border-white/5" : "left-0 border-r border-white/5"}
          ${isSidebarOpen
            ? "translate-x-0 visible pointer-events-auto"
            : isRTL
              ? "translate-x-full md:translate-x-0 invisible pointer-events-none md:visible md:pointer-events-auto"
              : "-translate-x-full md:translate-x-0 invisible pointer-events-none md:visible md:pointer-events-auto"
          }
        `}
      >
        {/* Logo + Lines */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-wider">
              Maro <span className="text-[#E30613]">DASH</span>
            </h1>
            <div className="flex flex-col gap-1 mt-2">
              <span className="w-12 h-1 bg-[#E30613] rounded-full zsc-line" />
              <span className="w-8 h-1 bg-[#E30613] rounded-full zsc-line" />
            </div>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={closeSidebar}
            className="md:hidden text-gray-500 hover:text-[#E30613] transition p-1"
            aria-label={t("sidebar.closeMenu")}
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
        <nav className="space-y-2 flex-1 mt-4 overflow-y-auto pe-1 pb-24 md:pb-0">
          <NavLink
            to="/"
            end
            onClick={closeSidebar}
            className={({ isActive }) => (isActive ? ACTIVE_CLASS : INACTIVE_CLASS)}
          >
            {t("nav.home")}
          </NavLink>

          <hr className="border-t border-[#E30613]/20 my-4 shadow-[0_0_10px_rgba(227,6,19,0.1)]" />

          {NAV_ITEMS.slice(1, 5).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? ACTIVE_CLASS : INACTIVE_CLASS)}
            >
              {t(item.labelKey)}
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
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
