import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { Languages } from "lucide-react";
import {
  getSubjectsConfig,
  saveSubjectsConfig,
  getSubjectsData,
  saveSubjectsData,
  getCoursesConfig,
  saveCoursesConfig,
  getCoursesData,
  saveCoursesData,
} from "../utils/storage";
import type { SubjectConfig, CourseConfig } from "../types";

// ===== SETTINGS PAGE =====
export function Settings() {
  const { showToast, showConfirm } = useApp();
  const { t, i18n } = useTranslation();

  const [subjects, setSubjects] = useState<SubjectConfig[]>(() =>
    getSubjectsConfig(),
  );
  const [courses, setCourses] = useState<CourseConfig[]>(() =>
    getCoursesConfig(),
  );

  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectLectures, setNewSubjectLectures] = useState("12");
  const [newCourseName, setNewCourseName] = useState("");

  const isArabic = i18n.language === "ar";

  const toggleLanguage = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  // ===== SUBJECTS =====
  const handleAddSubject = () => {
    const name = newSubjectName.trim();
    const lectures = parseInt(newSubjectLectures) || 12;

    if (!name) {
      showToast(t("settings.addSubjectError"), "error");
      return;
    }
    if (subjects.find((s) => s.name === name)) {
      showToast(t("settings.subjectExists"), "error");
      return;
    }

    const updated = [...subjects, { name, lectures }];
    saveSubjectsConfig(updated);
    setSubjects(updated);
    setNewSubjectName("");
    setNewSubjectLectures("12");
    showToast(t("settings.addSubjectSuccess"), "success");
  };

  const handleRemoveSubject = (index: number) => {
    showConfirm(
      t("settings.deleteSubjectTitle"),
      t("settings.deleteSubjectMessage"),
      () => {
        const cfg = [...subjects];
        const name = cfg[index].name;
        cfg.splice(index, 1);
        saveSubjectsConfig(cfg);

        const data = getSubjectsData();
        delete data[name];
        delete data[name + "_notes"];
        saveSubjectsData(data);

        setSubjects(cfg);
        showToast(t("settings.deleteSubjectSuccess"), "success");
      },
    );
  };

  // ===== COURSES =====
  const handleAddCourse = () => {
    const name = newCourseName.trim();
    if (!name) {
      showToast(t("settings.addCourseError"), "error");
      return;
    }
    if (courses.find((c) => c.name === name)) {
      showToast(t("settings.courseExists"), "error");
      return;
    }

    const updated = [...courses, { name }];
    saveCoursesConfig(updated);
    setCourses(updated);
    setNewCourseName("");
    showToast(t("settings.addCourseSuccess"), "success");
  };

  const handleRemoveCourse = (index: number) => {
    showConfirm(
      t("settings.deleteCourseTitle"),
      t("settings.deleteCourseMessage"),
      () => {
        const cfg = [...courses];
        const name = cfg[index].name;
        cfg.splice(index, 1);
        saveCoursesConfig(cfg);

        const data = getCoursesData();
        delete data[name];
        saveCoursesData(data);

        setCourses(cfg);
        showToast(t("settings.deleteCourseSuccess"), "success");
      },
    );
  };

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          {t("settings.title")}
        </h1>
      </header>

      <div className="max-w-2xl space-y-8">
        {/* Language Settings */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613]">
          <h3 className="text-white font-bold text-lg mb-4 pb-2 border-b border-white/5">
            {t("settings.language")}
          </h3>

          <div className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl">
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-[#E30613]" />
              <span className="text-sm font-bold text-white">
                {isArabic ? "اللغة العربية" : "English"}
              </span>
            </div>
            <button
              onClick={toggleLanguage}
              className="bg-[#E30613]/10 hover:bg-[#E30613]/20 text-[#E30613] text-sm px-4 py-2 rounded-lg transition font-bold"
            >
              {isArabic ? "Switch to English" : "التبديل إلى العربية"}
            </button>
          </div>
        </div>

        {/* Subjects Settings */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613]">
          <h3 className="text-white font-bold text-lg mb-4 pb-2 border-b border-white/5">
            {t("settings.subjectsSection")}
          </h3>

          <div className="space-y-2 mb-4">
            {subjects.map((sub, i) => (
              <div
                key={sub.name}
                className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl mb-3"
              >
                <span className="text-sm text-white">{sub.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {t("settings.lectureCount", { count: sub.lectures })}
                  </span>
                  <button
                    onClick={() => handleRemoveSubject(i)}
                    className="text-gray-500 hover:text-[#E30613] transition text-xs"
                  >
                    {t("settings.delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSubject();
              }}
              placeholder={t("settings.subjectNamePlaceholder")}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newSubjectLectures}
                onChange={(e) => setNewSubjectLectures(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSubject();
                }}
                placeholder={t("settings.lectureCountPlaceholder")}
                min={1}
                max={50}
                className="w-full sm:w-36 bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
              />
              <button
                onClick={handleAddSubject}
                className="bg-[#E30613] hover:bg-[#c30510] text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg text-sm font-bold transition shrink-0"
              >
                {t("settings.add")}
              </button>
            </div>
          </div>
        </div>

        {/* Courses Settings */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border-t-4 border-[#E30613]">
          <h3 className="text-white font-bold text-lg mb-4 pb-2 border-b border-white/5">
            {t("settings.coursesSection")}
          </h3>

          <div className="space-y-2 mb-4">
            {courses.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl mb-3"
              >
                <span className="text-sm text-white">{c.name}</span>
                <button
                  onClick={() => handleRemoveCourse(i)}
                  className="text-gray-500 hover:text-[#E30613] transition text-xs"
                >
                  {t("settings.delete")}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCourse();
              }}
              placeholder={t("settings.courseNamePlaceholder")}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#E30613] transition placeholder:text-gray-600"
            />
            <button
              onClick={handleAddCourse}
              className="bg-[#E30613] hover:bg-[#c30510] text-white px-6 py-3 sm:px-4 sm:py-2 rounded-lg text-sm font-bold transition shrink-0"
            >
              {t("settings.add")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
