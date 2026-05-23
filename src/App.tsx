import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileAcademic from "./pages/ProfileAcademic";
import Dashboard from "./pages/Dashboard";
import SimulationPage from "./pages/SimulationPage";
import CareerDetailPage from "./pages/CareerDetailPage";
import AlumniCareerPage from "./pages/AlumniCareerPage";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminAcademicPage from "./pages/AdminAcademicPage";
import AdminCareersPage from "./pages/AdminCareersPage";
import AdminCareerFieldsPage from "./pages/AdminCareerFieldsPage";
import AdminAlumniPage from "./pages/AdminAlumniPage";
import AdminContentPage from "./pages/AdminContentPage";
import AdminActivityPage from "./pages/AdminActivityPage";

/* ================= TAMBAHAN ================= */
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import UserCompaniesPage from "./pages/UserCompaniesPage";
import CompanyJobsPage from "./pages/CompanyJobsPage";
import AdminCompaniesPage from "./pages/AdminCompaniesPage";
/* ========================================== */

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

        {/* ================= TAMBAHAN USER ================= */}
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/companies" element={<UserCompaniesPage />} />
        <Route path="/companies/:companyId/jobs" element={<CompanyJobsPage />} />
        {/* ========================================== */}

        <Route path="/career" element={<AlumniCareerPage />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/academic" element={<AdminAcademicPage />} />
        <Route path="/admin/careers" element={<AdminCareersPage />} />
        <Route path="/admin/career-fields" element={<AdminCareerFieldsPage />} />
        <Route path="/admin/alumni" element={<AdminAlumniPage />} />
        <Route path="/admin/companies" element={<AdminCompaniesPage />} />
        <Route path="/admin/content" element={<AdminContentPage />} />
        <Route path="/admin/activity" element={<AdminActivityPage />} />
        {/* ========================================== */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}