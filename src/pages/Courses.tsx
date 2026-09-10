import { useRef, useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  getCoursesConfig,
  getCoursesData,
  saveCoursesData,
} from "../utils/storage";
import type { CourseConfig } from "../types";

// ===== COURSE CARD =====
function CourseCard({ course }: { course: CourseConfig }) {
  const { showToast } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [percent, setPercent] = useState<number>(() => {
    const data = getCoursesData();
    return data[course.name] ?? 0;
  });

  const [displayPercent, setDisplayPercent] = useState(percent);

  // Clean up animation interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Animated counter — matches script.js addCoursePercent() animation
  const animateCounter = (from: number, to: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const steps = 30;
    const dur = 1000;
    const stepTime = dur / steps;
    const valStep = (to - from) / steps;
    let i = 0;
    let current = from;
    intervalRef.current = setInterval(() => {
      i++;
      current += valStep;
      if (i >= steps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayPercent(to);
      } else {
        setDisplayPercent(Math.round(current));
      }
    }, stepTime);
  };

  const handleAdd = () => {
    const val = parseInt(inputRef.current?.value ?? "");
    if (isNaN(val) || val <= 0) {
      showToast("اكتب نسبة صحيحة الأول!", "error");
      return;
    }

    const updated = Math.min(100, percent + val);
    const data = getCoursesData();
    data[course.name] = updated;
    saveCoursesData(data);

    animateCounter(percent, updated);
    setPercent(updated);

    if (inputRef.current) inputRef.current.value = "";
    showToast(`عاش! تم إضافة ${val}% لتقدم الكورس.`, "success");
  };

  const handleReset = () => {
    const data = getCoursesData();
    data[course.name] = 0;
    saveCoursesData(data);
    setPercent(0);
    setDisplayPercent(0);
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613] hover:scale-[1.02] transition-transform duration-300 mt-1">
      <h3 className="text-xl font-bold mb-4">{course.name}</h3>
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
        <div
          className="bg-[#E30613] h-full transition-all duration-1000 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mb-4">{displayPercent}% مكتمل</p>

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="number"
          placeholder="مثال: 15"
          min={1}
          max={100}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-center text-sm focus:outline-none focus:border-[#E30613] transition"
        />
        <button
          onClick={handleAdd}
          className="bg-[#E30613]/10 hover:bg-[#E30613]/20 text-[#E30613] text-sm px-4 py-2 rounded-lg transition font-bold shrink-0"
        >
          إضافة %
        </button>
      </div>
      <button
        onClick={handleReset}
        className="w-full mt-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs px-3 py-2 rounded-lg transition"
      >
        تصفير الإنجاز
      </button>
    </div>
  );
}

// ===== COURSES PAGE =====
export function Courses() {
  const crsCfg = getCoursesConfig();

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white">تتبع الكورسات</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {crsCfg.map((c) => (
          <CourseCard key={c.name} course={c} />
        ))}
      </div>
    </div>
  );
}
