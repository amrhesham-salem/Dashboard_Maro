import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";

// Matches the original showConfirm() modal from script.js
// Animated with scale + opacity transitions
export function ConfirmModal() {
  const { confirm, closeConfirm } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (confirm.isOpen) {
      // Trigger animation in after mount
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [confirm.isOpen]);

  if (!confirm.isOpen) return null;

  const handleConfirm = () => {
    closeConfirm();
    confirm.onConfirm?.();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/80 z-100 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeConfirm}
    >
      <div
        className={`bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613] max-w-sm w-[90%] transform transition-transform duration-300 shadow-2xl ${
          visible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-2">{confirm.title}</h3>
        <p className="text-gray-400 text-sm mb-6">{confirm.message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={closeConfirm}
            className="px-5 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition text-sm font-bold"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-lg bg-[#E30613] text-white hover:bg-[#c30510] transition text-sm font-bold"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
