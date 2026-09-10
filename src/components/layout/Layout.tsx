import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import { ToastContainer } from "../common/Toast";
import { ConfirmModal } from "../common/ConfirmModal";
import { useApp } from "../../context/AppContext";

export function Layout() {
  const { toasts } = useApp();

  return (
    <div className="bg-[#121212] text-white font-sans min-h-screen flex flex-col relative w-full">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Main area: sidebar + content */}
      <div className="flex flex-1 relative w-full">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 w-full min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />

      {/* Confirm modal */}
      <ConfirmModal />
    </div>
  );
}
