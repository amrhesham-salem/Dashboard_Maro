// English translations — Maro Dash
const en = {
  // ===== SIDEBAR & NAV =====
  nav: {
    home: "Home",
    diary: "Diary",
    subjects: "Subjects",
    courses: "Courses",
    planner: "Planner",
    settings: "Settings",
    contact: "Contact",
  },
  sidebar: {
    closeMenu: "Close menu",
    openMenu: "Open menu",
  },

  // ===== HOME =====
  home: {
    title: "Ready for a new",
    titleHighlight: "achievement?",
    lecturesDone: "Lectures done",
    lecturesFrom: "out of {{total}} lectures",
    subjectsAvg: "Subjects average",
    coursesAvg: "Courses average",
    overallProgress: "Overall progress",
    subjectsLabel: "Subjects",
    coursesLabel: "Courses",
    lectureCount: "{{done}} of {{total}} lectures",
    totalProgress: "Overall progress",
  },

  // ===== DIARY =====
  diary: {
    title: "Diary",
    newEntry: "Log new achievement",
    typeLabel: "Type",
    typeSubject: "University subject",
    typeCourse: "External course",
    subjectLabel: "Subject / Course name",
    subjectPlaceholder: "e.g. Software Engineering",
    doneLabel: "What did you do today?",
    donePlaceholder: "e.g. Solved 5 problems on Trees",
    remainingLabel: "What's still remaining?",
    remainingPlaceholder: "e.g. Chapter 4 and 5",
    notesLabel: "Additional notes (optional)",
    notesPlaceholder: "Anything else you want to note...",
    save: "Save",
    previousEntries: "Previous entries",
    clearAll: "Clear all",
    empty: "No entries yet..",
    delete: "Delete",
    subjectField: "Subject:",
    remaining: "Remaining:",
    // Toasts & Confirms
    validationError: "Enter the subject name and what you did!",
    saveSuccess: "Achievement saved successfully!",
    deleteSuccess: "Entry deleted.",
    clearTitle: "Clear entries",
    clearMessage: "Are you sure you want to clear all entries? (This cannot be undone)",
    clearSuccess: "All entries cleared.",
  },

  // ===== SUBJECTS =====
  subjects: {
    title: "Subjects",
    lecture: "Lecture {{num}}",
    progress: "{{done}} / {{total}} lectures — {{percent}}%",
  },

  // ===== COURSES =====
  courses: {
    title: "Courses",
    completed: "{{percent}}% completed",
    placeholder: "e.g. 15",
    addPercent: "Add %",
    resetProgress: "Reset progress",
    validationError: "Enter a valid percentage first!",
    addSuccess: "Added {{val}}% to course progress.",
  },

  // ===== PLANNER =====
  planner: {
    title: "Planner",
    newPlan: "New Plan",
    planNameLabel: "Plan name / Goal",
    planNamePlaceholder: "e.g. Midterm prep, Final prep, or Tasks",
    daysLabel: "Number of days",
    daysPlaceholder: "e.g. 10",
    createPlan: "Create Plan",
    emptyState: "No plans yet.. Start planning your goals!",
    planDays: "{{days}}-day plan — {{daysText}}",
    tasksTitle: "Required tasks",
    newTask: "New task...",
    deadlinePlaceholder: "Deadline (optional)",
    deadlineTitle: "Set a task deadline",
    addTask: "Add",
    deleteTask: "Delete",
    deletePlanTitle: "Delete Plan",
    deletePlanTooltip: "Delete plan",
    // Days text
    daysRemaining: "{{days}} days remaining",
    lastDay: "Today is the last day!",
    overdue: "Plan ended {{days}} days ago",
    // Task deadline
    taskDaysRemaining: "{{days}} days left",
    taskOverdue: "{{days}} days overdue",
    taskToday: "Today!",
    // Toasts & Confirms
    validationError: "Enter the plan name and number of days correctly!",
    createSuccess: "Plan created successfully!",
    deletePlanMessage: "Are you sure you want to delete this plan with all its tasks?",
    deleteSuccess: "Plan deleted.",
    taskValidation: "Enter the task first!",
  },

  // ===== SETTINGS =====
  settings: {
    title: "Settings",
    subjectsSection: "Subjects",
    coursesSection: "Courses",
    lectureCount: "{{count}} lectures",
    delete: "Delete",
    subjectNamePlaceholder: "Subject name",
    lectureCountPlaceholder: "Number of lectures",
    courseNamePlaceholder: "Course name",
    add: "Add",
    // Theme & Language
    appearanceSection: "Appearance & Language",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    arabic: "العربية",
    english: "English",
    language: "Language",
    theme: "Theme",
    // Toasts & Confirms
    addSubjectError: "Enter a subject name to add!",
    subjectExists: "This subject already exists!",
    addSubjectSuccess: "Subject added successfully.",
    deleteSubjectTitle: "Delete Subject",
    deleteSubjectMessage: "This will delete the subject and all its data. Are you sure?",
    deleteSubjectSuccess: "Subject deleted successfully.",
    addCourseError: "Enter a course name to add!",
    courseExists: "This course already exists!",
    addCourseSuccess: "Course added successfully.",
    deleteCourseTitle: "Delete Course",
    deleteCourseMessage: "This will delete the course and all its progress. Are you sure?",
    deleteCourseSuccess: "Course deleted successfully.",
  },

  // ===== CONTACT =====
  contact: {
    title: "Contact Me",
    name: "Amr Hesham",
    bio: "You can reach me through these platforms",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    instagram2: "2nd Account",
    whatsapp: "WhatsApp",
    github: "GitHub",
    avatarAlt: "Amr Hesham's photo",
  },

  // ===== CONFIRM MODAL =====
  confirm: {
    cancel: "Cancel",
    delete: "Delete",
  },
} as const;

export default en;
