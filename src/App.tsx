import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Diary } from "./pages/Diary";
import { Subjects } from "./pages/Subjects";
import { Courses } from "./pages/Courses";
import { Planner } from "./pages/Planner";
import { Settings } from "./pages/Settings";
import { Contact } from "./pages/Contact";

// ===== PAGE SWITCHER =====
function PageContent() {
  const { activePage } = useApp();

  switch (activePage) {
    case "home":
      return <Home />;
    case "diary":
      return <Diary />;
    case "subjects":
      return <Subjects />;
    case "courses":
      return <Courses />;
    case "planner":
      return <Planner />;
    case "settings":
      return <Settings />;
    case "contact":
      return <Contact />;
    default:
      return <Home />;
  }
}

// ===== APP ROOT =====
function App() {
  return (
    <AppProvider>
      <Layout>
        <PageContent />
      </Layout>
    </AppProvider>
  );
}

export default App;