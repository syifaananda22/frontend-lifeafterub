import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileAcademic from "./pages/ProfileAcademic";
import Dashboard from "./pages/Dashboard";
import SimulationPage from "./pages/SimulationPage";
import CareerDetailPage from "./pages/CareerDetailPage";
import AlumniCareerPage from "./pages/AlumniCareerPage";
import RecommendationPage from "./pages/RecommendationPage";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminAcademicPage from "./pages/AdminAcademicPage";
import AdminCareersPage from "./pages/AdminCareersPage";
import AdminCareerFieldsPage from "./pages/AdminCareerFieldsPage";
import AdminAlumniPage from "./pages/AdminAlumniPage";
import AdminRecommendationsPage from "./pages/AdminRecommendationsPage";
import AdminContentPage from "./pages/AdminContentPage";
import AdminActivityPage from "./pages/AdminActivityPage";

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

        <Route path="/career" element={<AlumniCareerPage />} />

        <Route path="/recommendation" element={<RecommendationPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/users" element={<AdminUsersPage />} />

        <Route path="/admin/academic" element={<AdminAcademicPage />} />

        <Route path="/admin/careers" element={<AdminCareersPage />} />

        <Route path="/admin/career-fields" element={<AdminCareerFieldsPage />} />

        <Route path="/admin/alumni" element={<AdminAlumniPage />} />

        <Route path="/admin/recommendations" element={<AdminRecommendationsPage />} />

        <Route path="/admin/content" element={<AdminContentPage />} />

        <Route path="/admin/activity" element={<AdminActivityPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}