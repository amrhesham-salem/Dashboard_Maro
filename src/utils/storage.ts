// ============================================================
// localStorage utilities — Maro Dash
// All keys are IDENTICAL to the original Vanilla JS implementation.
// This ensures full compatibility with existing user data.
// ============================================================

import type {
  DiaryEntry,
  SubjectConfig,
  SubjectData,
  CourseConfig,
  CourseData,
  Plan,
} from "../types";

// ===== DEFAULT DATA =====
// Matches getSubConfig() in script.js exactly
const DEFAULT_SUBJECTS: SubjectConfig[] = [
  { name: "داتا بيز", lectures: 12 },
  { name: "داتا كوم", lectures: 12 },
  { name: "جرافيك", lectures: 12 },
  { name: "الكترونكس", lectures: 12 },
  { name: "احتمالات 2", lectures: 12 },
];

// Matches getCrsConfig() in script.js exactly
const DEFAULT_COURSES: CourseConfig[] = [
  { name: "JavaScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Tailwind" },
  { name: "TypeScript" },
  { name: "Git & GitHub" },
  { name: "Testing" },
];

// ===== STORAGE KEYS (identical to script.js) =====
const KEYS = {
  DIARY: "zsc_diary",
  SUBJECTS: "zsc_subjects",
  SUBJECTS_CONFIG: "zsc_subjects_config",
  COURSES: "zsc_courses",
  COURSES_CONFIG: "zsc_courses_config",
  PLANNER: "zsc_planner",
} as const;

// ===== HELPERS =====
function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===== DIARY =====
export function getDiaryEntries(): DiaryEntry[] {
  return getItem<DiaryEntry[]>(KEYS.DIARY, []);
}

export function saveDiaryEntries(entries: DiaryEntry[]): void {
  setItem(KEYS.DIARY, entries);
}

// ===== SUBJECTS CONFIG =====
export function getSubjectsConfig(): SubjectConfig[] {
  return getItem<SubjectConfig[]>(KEYS.SUBJECTS_CONFIG, DEFAULT_SUBJECTS);
}

export function saveSubjectsConfig(cfg: SubjectConfig[]): void {
  setItem(KEYS.SUBJECTS_CONFIG, cfg);
}

// ===== SUBJECTS DATA =====
export function getSubjectsData(): SubjectData {
  return getItem<SubjectData>(KEYS.SUBJECTS, {});
}

export function saveSubjectsData(data: SubjectData): void {
  setItem(KEYS.SUBJECTS, data);
}

// ===== COURSES CONFIG =====
export function getCoursesConfig(): CourseConfig[] {
  return getItem<CourseConfig[]>(KEYS.COURSES_CONFIG, DEFAULT_COURSES);
}

export function saveCoursesConfig(cfg: CourseConfig[]): void {
  setItem(KEYS.COURSES_CONFIG, cfg);
}

// ===== COURSES DATA =====
export function getCoursesData(): CourseData {
  return getItem<CourseData>(KEYS.COURSES, {});
}

export function saveCoursesData(data: CourseData): void {
  setItem(KEYS.COURSES, data);
}

// ===== PLANNER =====
export function getPlans(): Plan[] {
  return getItem<Plan[]>(KEYS.PLANNER, []);
}

export function savePlans(plans: Plan[]): void {
  setItem(KEYS.PLANNER, plans);
}
