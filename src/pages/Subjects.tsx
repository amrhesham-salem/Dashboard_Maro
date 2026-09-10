import { useState } from "react";
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
  return (
    <div className="rounded-xl border border-white/5 overflow-hidden mb-2">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition"
        onClick={() => onChange(index, !checked)}
      >
        <span
          className={`text-sm ${checked ? "text-white font-bold" : "text-gray-400"}`}
        >
          محاضرة {index + 1}
        </span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onChange(index, e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 accent-[#E30613] cursor-pointer"
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
  const [isOpen, setIsOpen] = useState(false);
  // Keep local state in sync with localStorage
  const [lectures, setLectures] = useState<boolean[]>(() => {
    const data = getSubjectsData();
    return data[subject.name] ?? Array(subject.lectures).fill(false);
  });

  const done = lectures.filter(Boolean).length;
  const percent = Math.round((done / subject.lectures) * 100);

  const handleLectureChange = (index: number, value: boolean) => {
    const updated = [...lectures];
    updated[index] = value;
    setLectures(updated);

    // Persist to localStorage
    const data = getSubjectsData();
    data[subject.name] = updated;
    saveSubjectsData(data);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border-t-4 border-[#E30613] overflow-hidden">
      {/* Header */}
      <div
        onClick={() => setIsOpen((o) => !o)}
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-[#E30613] text-xs transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
          <div>
            <h3 className="text-xl font-bold">{subject.name}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {done} / {subject.lectures} محاضرة — {percent}%
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

      {/* Collapsible Lectures Panel */}
      <div
        className="overflow-hidden transition-all duration-350"
        style={{ maxHeight: isOpen ? `${subject.lectures * 60}px` : "0" }}
      >
        <div className="px-6 pb-6">
          {lectures.map((checked, i) => (
            <LectureItem
              key={i}
              index={i}
              checked={checked}
              onChange={handleLectureChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== SUBJECTS PAGE =====
export function Subjects() {
  const subCfg = getSubjectsConfig();

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white">مواد الكلية</h1>
      </header>
      <div className="max-w-2xl space-y-4">
        {subCfg.map((sub) => (
          <SubjectAccordion key={sub.name} subject={sub} />
        ))}
      </div>
    </div>
  );
}
