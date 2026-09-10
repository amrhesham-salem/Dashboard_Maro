import { useEffect, useState } from "react";
import type { ToastItem } from "../../types";

// Matches the original showToast() visual design from script.js
function ToastNotification({ toast }: { toast: ToastItem }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in after mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const isError = toast.type === "error";

  return (
    <div
      className={`
        flex items-center justify-between px-6 py-3 rounded-lg shadow-lg text-sm font-bold
        transition-all duration-300
        ${isError
          ? "bg-[#1a1a1a] text-[#E30613] border-l-4 border-[#E30613]"
          : "bg-[#E30613] text-white"
        }
        ${visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
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
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:left-5 md:translate-x-0 flex flex-col gap-2 z-50">
      {toasts.map((t) => (
        <ToastNotification key={t.id} toast={t} />
      ))}
    </div>
  );
}
