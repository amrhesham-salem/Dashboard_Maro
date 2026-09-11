import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
            {entry.type === "course" ? t("diary.typeCourse") : t("diary.typeSubject")}
          </span>
          <span className="text-xs text-gray-500">{entry.date}</span>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-gray-500 hover:text-[#E30613] transition text-sm"
        >
          {t("diary.delete")}
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-1">
        {t("diary.subjectField")} <span className="text-white font-bold">{entry.subject}</span>
      </p>
      <p className="text-sm text-gray-300">✅ {entry.done}</p>
      {entry.remaining && (
        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/5">
          {t("diary.remaining")} {entry.remaining}
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
  const { t } = useTranslation();

  const [entries, setEntries] = useState<DiaryEntry[]>(() => getDiaryEntries());
  const [type, setType] = useState<"subject" | "course">("subject");
  const [subject, setSubject] = useState("");
  const [done, setDone] = useState("");
  const [remaining, setRemaining] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!subject.trim() || !done.trim()) {
      showToast(t("diary.validationError"), "error");
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
        year: "numeric",
        month: "short",
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

    showToast(t("diary.saveSuccess"), "success");
  };

  const handleDelete = (id: number) => {
    const updated = entries.filter((e) => e.id !== id);
    saveDiaryEntries(updated);
    setEntries(updated);
    showToast(t("diary.deleteSuccess"), "success");
  };

  const handleClearAll = () => {
    showConfirm(
      t("diary.clearTitle"),
      t("diary.clearMessage"),
      () => {
        saveDiaryEntries([]);
        setEntries([]);
        showToast(t("diary.clearSuccess"), "success");
      },
    );
  };

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white">{t("diary.title")}</h1>
      </header>

      {/* Form */}
      <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613] max-w-2xl mb-10">
        <h3 className="text-[#E30613] font-bold text-xl mb-4 border-b border-white/5 pb-2">
          {t("diary.newEntry")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">{t("diary.typeLabel")}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "subject" | "course")}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition"
            >
              <option value="subject" className="bg-[#1a1a1a]">
                {t("diary.typeSubject")}
              </option>
              <option value="course" className="bg-[#1a1a1a]">
                {t("diary.typeCourse")}
              </option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">
              {t("diary.subjectLabel")}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
              placeholder={t("diary.subjectPlaceholder")}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1">
            {t("diary.doneLabel")}
          </label>
          <input
            type="text"
            value={done}
            onChange={(e) => setDone(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            placeholder={t("diary.donePlaceholder")}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs text-gray-500 block mb-1">
            {t("diary.remainingLabel")}
          </label>
          <input
            type="text"
            value={remaining}
            onChange={(e) => setRemaining(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            placeholder={t("diary.remainingPlaceholder")}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="text-xs text-gray-500 block mb-1">
            {t("diary.notesLabel")}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("diary.notesPlaceholder")}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600 resize-y"
          />
        </div>

        <div>
          <button
            onClick={handleSave}
            className="bg-[#E30613] text-white px-6 py-2 rounded-lg hover:bg-[#c30510] transition-all"
          >
            {t("diary.save")}
          </button>
        </div>
      </div>

      {/* Entries List */}
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-600 tracking-widest">{t("diary.previousEntries")}</p>
          {entries.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-400 hover:text-[#E30613] transition font-bold"
            >
              {t("diary.clearAll")}
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p className="text-sm">{t("diary.empty")}</p>
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
