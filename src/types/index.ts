// ============================================================
// TypeScript types for Maro Dash
// Matching the exact localStorage data structures from script.js
// ============================================================

// ===== PAGES =====
export type Page =
  | "home"
  | "diary"
  | "subjects"
  | "courses"
  | "planner"
  | "settings"
  | "contact";

// ===== DIARY =====
// localStorage key: "zsc_diary"
export interface DiaryEntry {
  id: number;
  type: "subject" | "course";
  subject: string;
  done: string;
  remaining: string;
  notes: string;
  date: string; // formatted Arabic date string
}

// ===== SUBJECTS =====
// localStorage key: "zsc_subjects_config"
export interface SubjectConfig {
  name: string;
  lectures: number;
}

// localStorage key: "zsc_subjects"
// Record<subjectName, boolean[]> — each boolean = lecture completion
export type SubjectData = Record<string, boolean[]>;

// ===== COURSES =====
// localStorage key: "zsc_courses_config"
export interface CourseConfig {
  name: string;
}

// localStorage key: "zsc_courses"
// Record<courseName, percentage 0-100>
export type CourseData = Record<string, number>;

// ===== PLANNER =====
// localStorage key: "zsc_planner"
export interface PlanTask {
  id: number;
  text: string;
  deadline: string; // "YYYY-MM-DD" or ""
  done: boolean;
}

export interface Plan {
  id: number;
  title: string;
  days: number;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  tasks: PlanTask[];
}

// ===== TOAST =====
export type ToastType = "success" | "error";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

// ===== CONFIRM MODAL =====
export interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
}
