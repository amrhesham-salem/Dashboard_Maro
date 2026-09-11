import { useEffect, useState } from "react";
import type { ToastItem } from "../../types";

interface ToastProps {
  toast: ToastItem;
}

function ToastNotification({ toast }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const isError = toast.type === "error";

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        pointer-events-auto
        flex items-center justify-center text-center px-6 py-3 rounded-xl shadow-2xl text-sm font-bold
        transition-all duration-300 max-w-[85vw] sm:max-w-md
        ${isError
          ? "bg-[#1a1a1a] text-[#E30613] border-2 border-[#E30613]"
          : "bg-[#E30613] text-white"
        }
        ${visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-95"}
      `}
    >
      <span>{toast.message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
}

export function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 ltr:md:left-5 rtl:md:right-5 rtl:md:left-auto flex flex-col items-center md:items-start rtl:md:items-end gap-2 z-50 pointer-events-none">
      {toasts.map((t) => (
        <ToastNotification key={t.id} toast={t} />
      ))}
    </div>
  );
}
