// Arabic translations — Maro Dash
const ar = {
  // ===== SIDEBAR & NAV =====
  nav: {
    home: "الرئيسية",
    diary: "اليوميات",
    subjects: "مواد الكلية",
    courses: "تتبع الكورسات",
    planner: "خطة الأيام",
    settings: "الإعدادات",
    contact: "تواصل معي",
  },
  sidebar: {
    closeMenu: "إغلاق القائمة",
    openMenu: "فتح القائمة",
  },

  // ===== HOME =====
  home: {
    title: "جاهز لإنجاز جديد",
    titleHighlight: "النهاردة؟",
    lecturesDone: "محاضرات خلصت",
    lecturesFrom: "من {{total}} محاضرة",
    subjectsAvg: "متوسط المواد",
    coursesAvg: "متوسط الكورسات",
    overallProgress: "إجمالي التقدم",
    subjectsLabel: "مواد الكلية",
    coursesLabel: "تتبع الكورسات",
    lectureCount: "{{done}} من {{total}} محاضرة",
    totalProgress: "التقدم الكلي",
  },

  // ===== DIARY =====
  diary: {
    title: "اليوميات",
    newEntry: "سجل إنجاز جديد",
    typeLabel: "النوع",
    typeSubject: "مادة كلية",
    typeCourse: "كورس خارجي",
    subjectLabel: "اسم المادة / الكورس",
    subjectPlaceholder: "مثال: هندسة البرمجيات",
    doneLabel: "عملت إيه النهارده؟",
    donePlaceholder: "مثال: حليت 5 أسئلة على الـ Trees",
    remainingLabel: "لسه إيه اللي باقي؟",
    remainingPlaceholder: "مثال: لسه Chapter 4 و 5",
    notesLabel: "ملاحظات إضافية (اختياري)",
    notesPlaceholder: "أي حاجة تانية عايز تسجلها...",
    save: "حفظ الإنجاز",
    previousEntries: "السجلات السابقة",
    clearAll: "مسح الكل",
    empty: "مفيش سجلات لحد دلوقتي..",
    delete: "مسح",
    subjectField: "المادة:",
    remaining: "لسه:",
    // Toasts & Confirms
    validationError: "اكتب اسم المادة وإيه اللي عملته!",
    saveSuccess: "تم حفظ الإنجاز بنجاح يا بطل! ",
    deleteSuccess: "تم مسح الإنجاز.",
    clearTitle: "مسح السجلات",
    clearMessage: "أكيد عايز تمسح كل السجلات؟ (مش هتقدر ترجعهم تاني)",
    clearSuccess: "تم مسح كل السجلات.",
  },

  // ===== SUBJECTS =====
  subjects: {
    title: "مواد الكلية",
    lecture: "محاضرة {{num}}",
    progress: "{{done}} / {{total}} محاضرة — {{percent}}%",
  },

  // ===== COURSES =====
  courses: {
    title: "تتبع الكورسات",
    completed: "{{percent}}% مكتمل",
    placeholder: "مثال: 15",
    addPercent: "إضافة %",
    resetProgress: "تصفير الإنجاز",
    validationError: "اكتب نسبة صحيحة الأول!",
    addSuccess: "عاش! تم إضافة {{val}}% لتقدم الكورس.",
  },

  // ===== PLANNER =====
  planner: {
    title: "خطة الأيام",
    newPlan: "خطة جديدة",
    planNameLabel: "اسم الخطة / الهدف",
    planNamePlaceholder: "مثال: زنقة ميد، زنقة فاينل، أو تاسكات",
    daysLabel: "عدد الأيام",
    daysPlaceholder: "مثال: 10",
    createPlan: "إنشاء الخطة",
    emptyState: "مفيش خطط حالياً.. ابدأ خطط لأهدافك!",
    planDays: "خطة {{days}} أيام — {{daysText}}",
    tasksTitle: "المهام المطلوبة",
    newTask: "مهمة جديدة...",
    deadlinePlaceholder: "تاريخ الانتهاء (اختياري)",
    deadlineTitle: "تحديد موعد نهائي للمهمة",
    addTask: "إضافة",
    deleteTask: "مسح",
    deletePlanTitle: "مسح الخطة",
    deletePlanTooltip: "مسح الخطة",
    // Days text
    daysRemaining: "باقي {{days}} يوم",
    lastDay: "النهاردة آخر يوم للجدول!",
    overdue: "الجدول انتهى من {{days}} يوم",
    // Task deadline
    taskDaysRemaining: "باقي {{days}} يوم",
    taskOverdue: "متأخر {{days}} يوم",
    taskToday: "النهاردة!",
    // Toasts & Confirms
    validationError: "اكتب اسم الخطة وعدد الأيام بشكل صحيح!",
    createSuccess: "تم إنشاء الخطة بنجاح!",
    deletePlanMessage: "أكيد عايز تمسح الخطة دي بكل مهامها وتقاريرها؟",
    deleteSuccess: "تم مسح الخطة.",
    taskValidation: "اكتب المهمة الأول!",
  },

  // ===== SETTINGS =====
  settings: {
    title: "الإعدادات",
    subjectsSection: "مواد الكلية",
    coursesSection: "الكورسات",
    lectureCount: "{{count}} محاضرة",
    delete: "مسح",
    subjectNamePlaceholder: "اسم المادة",
    lectureCountPlaceholder: "عدد المحاضرات",
    courseNamePlaceholder: "اسم الكورس",
    add: "إضافة",
    // Theme & Language
    appearanceSection: "المظهر واللغة",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    arabic: "العربية",
    english: "English",
    language: "اللغة",
    theme: "المظهر",
    // Toasts & Confirms
    addSubjectError: "اكتب اسم المادة عشان نضيفها!",
    subjectExists: "المادة دي متسجلة بالفعل!",
    addSubjectSuccess: "تم إضافة المادة بنجاح.",
    deleteSubjectTitle: "حذف المادة",
    deleteSubjectMessage: "هتمسح المادة دي وكل بياناتها، متأكد؟",
    deleteSubjectSuccess: "تم حذف المادة بنجاح.",
    addCourseError: "اكتب اسم الكورس عشان نضيفه!",
    courseExists: "الكورس ده متسجل بالفعل!",
    addCourseSuccess: "تم إضافة الكورس بنجاح.",
    deleteCourseTitle: "حذف الكورس",
    deleteCourseMessage: "هتمسح الكورس ده وكل تقدم عملته فيه، متأكد؟",
    deleteCourseSuccess: "تم حذف الكورس بنجاح.",
  },

  // ===== CONTACT =====
  contact: {
    title: "تواصل معي",
    name: "عمرو هشام",
    bio: "تقدر تتواصل معايا من خلال المنصات دي",
    facebook: "فيسبوك",
    linkedin: "لينكد إن",
    instagram: "انستجرام",
    instagram2: "حساب ثاني",
    whatsapp: "واتساب",
    github: "جيت هب",
    avatarAlt: "صورة عمرو هشام",
  },

  // ===== CONFIRM MODAL =====
  confirm: {
    cancel: "إلغاء",
    delete: "حذف",
  },
} as const;

export default ar;
