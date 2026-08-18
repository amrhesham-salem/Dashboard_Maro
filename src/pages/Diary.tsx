import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { getDiaryEntries, saveDiaryEntries } from "../utils/storage";
import type { DiaryEntry } from "../types";

// ===== ENTRY CARD =====
function EntryCard({
  entry,
  onDelete,
}: {
  entry: DiaryEntry;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-[#1a1a1a] p-5 rounded-2xl border-t-4 border-[#E30613]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              entry.type === "course"
                ? "bg-[#E30613]/10 text-[#E30613]"
                : "bg-white/5 text-gray-300"
            }`}
          >
            {entry.type === "course" ? "كورس خارجي" : "مادة كلية"}
          </span>
          <span className="text-xs text-gray-600">{entry.date}</span>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-gray-600 hover:text-[#E30613] transition text-sm"
        >
          مسح
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-1">
        المادة: <span className="text-white font-bold">{entry.subject}</span>
      </p>
      <p className="text-sm text-gray-300">✅ {entry.done}</p>
      {entry.remaining && (
        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/5">
          لسه: {entry.remaining}
        </p>
      )}
      {entry.notes && (
        <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>
      )}
    </div>
  );
}

// ===== DIARY PAGE =====
export function Diary() {
  const { showToast, showConfirm } = useApp();

  const [entries, setEntries] = useState<DiaryEntry[]>(() => getDiaryEntries());
  const [type, setType] = useState<"subject" | "course">("subject");
  const [subject, setSubject] = useState("");
  const [done, setDone] = useState("");
  const [remaining, setRemaining] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!subject.trim() || !done.trim()) {
      showToast("اكتب اسم المادة وإيه اللي عملته!", "error");
      return;
    }

    const entry: DiaryEntry = {
      id: Date.now(),
      type,
      subject: subject.trim(),
      done: done.trim(),
      remaining: remaining.trim(),
      notes: notes.trim(),
      date: new Date().toLocaleDateString("ar-EG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const updated = [entry, ...entries];
    saveDiaryEntries(updated);
    setEntries(updated);

    // Reset form
    setSubject("");
    setDone("");
    setRemaining("");
    setNotes("");

    showToast("تم حفظ الإنجاز بنجاح يا بطل! ", "success");
  };

  const handleDelete = (id: number) => {
    const updated = entries.filter((e) => e.id !== id);
    saveDiaryEntries(updated);
    setEntries(updated);
    showToast("تم مسح الإنجاز.", "success");
  };

  const handleClearAll = () => {
    showConfirm(
      "مسح السجلات",
      "أكيد عايز تمسح كل السجلات؟ (مش هتقدر ترجعهم تاني)",
      () => {
        saveDiaryEntries([]);
        setEntries([]);
        showToast("تم مسح كل السجلات.", "success");
      },
    );
  };

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white">اليوميات</h1>
      </header>

      {/* Form */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613] max-w-2xl mb-10">
        <h3 className="text-[#E30613] font-bold text-xl mb-4 border-b border-white/5 pb-2">
          سجل إنجاز جديد
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">النوع</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "subject" | "course")}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition"
            >
              <option value="subject" className="bg-[#1a1a1a]">
                مادة كلية
              </option>
              <option value="course" className="bg-[#1a1a1a]">
                كورس خارجي
              </option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              اسم المادة / الكورس
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              placeholder="مثال: هندسة البرمجيات"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1">
            عملت إيه النهارده؟
          </label>
          <input
            type="text"
            value={done}
            onChange={(e) => setDone(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            placeholder="مثال: حليت 5 أسئلة على الـ Trees"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1">
            لسه إيه اللي باقي؟
          </label>
          <input
            type="text"
            value={remaining}
            onChange={(e) => setRemaining(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            placeholder="مثال: لسه Chapter 4 و 5"
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-500 block mb-1">
            ملاحظات إضافية (اختياري)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أي حاجة تانية عايز تسجلها..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600 resize-y"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#E30613] text-white px-6 py-2 rounded-lg hover:bg-[#c30510] transition-all"
          >
            حفظ الإنجاز
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-600 tracking-widest">السجلات السابقة</p>
          {entries.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-400 hover:text-[#E30613] transition font-bold"
            >
              مسح الكل
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p className="text-sm">مفيش سجلات لحد دلوقتي..</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((e) => (
              <EntryCard key={e.id} entry={e} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
