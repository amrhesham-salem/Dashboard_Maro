import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar";
import en from "./en";

// ===== LANGUAGE PERSISTENCE =====
const LANG_KEY = "zsc_lang";

function getSavedLang(): string {
  try {
    return localStorage.getItem(LANG_KEY) || "ar";
  } catch {
    return "ar";
  }
}

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: ar },
    en: { translation: en },
  },
  lng: getSavedLang(),
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

// Update localStorage when language changes
i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(LANG_KEY, lng);
  } catch {
    // silent
  }
  // Update document direction and lang
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

// Set initial direction on load
document.documentElement.lang = getSavedLang();
document.documentElement.dir = getSavedLang() === "ar" ? "rtl" : "ltr";

export default i18n;
