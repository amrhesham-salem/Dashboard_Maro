import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import "./input.css";

// Register PWA Service Worker (TypeScript source in dev, bundled sw.js in prod)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = import.meta.env.PROD ? "/sw.js" : "/src/sw.ts";
    navigator.serviceWorker
      .register(swUrl, { type: import.meta.env.PROD ? "classic" : "module" })
      .catch(() => {
        // graceful fallback
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);