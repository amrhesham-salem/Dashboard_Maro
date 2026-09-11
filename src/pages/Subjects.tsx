import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getSubjectsConfig,
  getSubjectsData,
  saveSubjectsData,
} from "../utils/storage";
import type { SubjectConfig } from "../types";

// ===== LECTURE ITEM =====
function LectureItem({
  index,
  checked,
  onChange,
}: {
  index: number;
  checked: boolean;
  onChange: (index: number, value: boolean) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl border border-white/5 overflow-hidden mb-2">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition"
        onClick={() => onChange(index, !checked)}
      >
        <span
          className={`text-sm ${checked ? "text-white font-bold" : "text-gray-400"}`}
        >
          {t("subjects.lecture", { num: index + 1 })}
        </span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(index, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          className="accent-[#E30613] w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
}

// ===== SUBJECT ACCORDION =====
function SubjectAccordion({
  subject,
}: {
  subject: SubjectConfig;
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // Keep local state in sync with localStorage
  const [lectures, setLectures] = useState<boolean[]>(() => {
    const data = getSubjectsData();
    return data[subject.name] ?? Array(subject.lectures).fill(false);
  });

  const done = lectures.filter(Boolean).length;
  const percent = Math.round((done / subject.lectures) * 100);

  const handleToggle = (idx: number, val: boolean) => {
    const updated = [...lectures];
    updated[idx] = val;
    setLectures(updated);

    // Save to localStorage
    const data = getSubjectsData();
    data[subject.name] = updated;
    saveSubjectsData(data);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border-t-4 border-[#E30613] overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsOpen((o) => !o)}
        className="p-6 cursor-pointer flex items-center justify-between hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-4">
          <div>
            <h3 className="text-xl font-bold">{subject.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {t("subjects.progress", { done, total: subject.lectures, percent })}
            </p>
          </div>
        </div>
        <div className="w-32">
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#E30613] h-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      <div
        className={`transition-350 overflow-hidden ${
          isOpen ? "max-h-250 p-6 pt-0 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-4 border-t border-white/5">
          {lectures.map((chk, idx) => (
            <LectureItem
              key={idx}
              index={idx}
              checked={chk}
              onChange={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== SUBJECTS PAGE =====
export function Subjects() {
  const { t } = useTranslation();
  const subCfg = getSubjectsConfig();

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white">{t("subjects.title")}</h1>
      </header>
      <div className="max-w-2xl space-y-4">
        {subCfg.map((sub) => (
          <SubjectAccordion key={sub.name} subject={sub} />
        ))}
      </div>
    </div>
  );
}
