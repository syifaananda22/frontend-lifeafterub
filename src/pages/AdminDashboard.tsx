import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_users: 0,
    total_careers: 0,
    total_alumni: 0,
    total_simulations: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nama");
    localStorage.removeItem("prodi");

    navigate("/");
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <img src="/logo.png" className="admin-logo" alt="Logo" />

        <div className="admin-menu">
          <button className="active" onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/admin/users")}>
            Kelola Data User
          </button>

          <button onClick={() => navigate("/admin/academic")}>
            Kelola Profil Akademik
          </button>

          <button onClick={() => navigate("/admin/careers")}>
            Kelola Data Karir
          </button>

          <button onClick={() => navigate("/admin/career-fields")}>
            Kelola Career Field
          </button>

          <button onClick={() => navigate("/admin/alumni")}>
            Kelola Data Alumni Karir
          </button>

          <button onClick={() => navigate("/admin/companies")}>
            Kelola Perusahaan
          </button>
        </div>

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <section className="admin-hero">
          <span className="admin-badge">ADMIN PANEL</span>

          <h1>Dashboard Admin</h1>

          <p>
            Kelola data user, profil akademik, data karir, alumni,
            rekomendasi, konten website, dan aktivitas pengguna Life After UB.
          </p>
        </section>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>Total User</span>
            <h3>{stats.total_users}</h3>
          </div>

          <div className="admin-stat-card">
            <span>Total Karir</span>
            <h3>{stats.total_careers}</h3>
          </div>

          <div className="admin-stat-card">
            <span>Total Alumni</span>
            <h3>{stats.total_alumni}</h3>
          </div>

          <div className="admin-stat-card">
            <span>Simulasi Tersimpan</span>
            <h3>{stats.total_simulations}</h3>
          </div>
        </section>

        <section className="admin-activity">
          <div className="admin-section-title">
            <h2>Monitoring Aktivitas User</h2>
            <p>Ringkasan aktivitas terbaru pengguna pada sistem.</p>
          </div>

          <div className="admin-table-card">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Aktivitas</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>User</td>
                  <td>Total user terdaftar saat ini: {stats.total_users}</td>
                  <td>
                    <span className="status success">Aktif</span>
                  </td>
                </tr>

                <tr>
                  <td>Career</td>
                  <td>Total data karir tersedia: {stats.total_careers}</td>
                  <td>
                    <span className="status success">Tersedia</span>
                  </td>
                </tr>

                <tr>
                  <td>Simulation</td>
                  <td>Total simulasi tersimpan: {stats.total_simulations}</td>
                  <td>
                    <span className="status pending">Terpantau</span>
                  </td>
                </tr>

                <tr>
                  <td>Alumni</td>
                  <td>Total data alumni karir: {stats.total_alumni}</td>
                  <td>
                    <span className="status success">Tersedia</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}