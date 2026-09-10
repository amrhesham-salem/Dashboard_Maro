import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ToastItem, ToastType, ConfirmState } from "../types";

// ===== CONTEXT SHAPE =====
interface AppContextValue {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  confirm: ConfirmState;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  closeConfirm: () => void;
}

// ===== CREATE CONTEXT =====
const AppContext = createContext<AppContextValue | null>(null);

// ===== PROVIDER =====
export function AppProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirm, setConfirm] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // --- Sidebar ---
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // --- Toast ---
  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3300);
  }, []);

  // --- Confirm ---
  const showConfirm = useCallback(
    (title: string, message: string, onConfirm: () => void) => {
      setConfirm({ isOpen: true, title, message, onConfirm });
    },
    [],
  );

  const closeConfirm = useCallback(() => {
    setConfirm({ isOpen: false, title: "", message: "", onConfirm: null });
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        toasts,
        showToast,
        confirm,
        showConfirm,
        closeConfirm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ===== HOOK =====
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
