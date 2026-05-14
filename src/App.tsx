import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileAcademic from "./pages/ProfileAcademic";
import Dashboard from "./pages/Dashboard";
import SimulationPage from "./pages/SimulationPage";
import CareerDetailPage from "./pages/CareerDetailPage";
import AlumniCareerPage from "./pages/AlumniCareerPage";
import RecommendationPage from "./pages/RecommendationPage";

/* ================= TAMBAHAN INI ================= */
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
/* =============================================== */

import Toast from "./components/Toast";

export default function App() {

  return (

    <>

      <Toast />

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/profileacademic" element={<ProfileAcademic />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/simulation" element={<SimulationPage />} />

        <Route path="/career/:id" element={<CareerDetailPage />} />

        {/* ================= TAMBAHAN INI ================= */}
        <Route path="/history" element={<HistoryPage />} />

        <Route path="/profil" element={<ProfilePage />} />
        {/* =============================================== */}

        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/career" element={<AlumniCareerPage />} />

        <Route path="/recommendation" element={<RecommendationPage />} />

      </Routes>

    </>

  );

}