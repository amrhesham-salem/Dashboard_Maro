import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Diary } from "./pages/Diary";
import { Subjects } from "./pages/Subjects";
import { Courses } from "./pages/Courses";
import { Planner } from "./pages/Planner";
import { Settings } from "./pages/Settings";
import { Contact } from "./pages/Contact";

// ===== APP ROOT =====
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="diary" element={<Diary />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="courses" element={<Courses />} />
            <Route path="planner" element={<Planner />} />
            <Route path="settings" element={<Settings />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;