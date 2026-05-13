import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

export default function HistoryPage() {

  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://127.0.0.1:8000/api/history",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHistory(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="dashboard-page fade-in">

      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src="/logo.png" className="dashboard-logo" />
        </div>

        <div className="nav-menu">
          <span onClick={() => navigate("/dashboard")}>BERANDA</span>
          <span className="active-nav">RIWAYAT</span>
          <span onClick={() => navigate("/profile")}>PROFIL</span>
        </div>
      </nav>

      {/* TITLE */}
      <section className="fitur-section">
        <div className="section-title">
          <h2>Riwayat Simulasi</h2>
          <p>Semua simulasi karir yang pernah kamu coba</p>
        </div>

        {/* LIST */}
        <div className="fitur-grid">

          {history.length === 0 ? (
            <div className="fitur-card">
              <h3>Belum ada riwayat</h3>
              <p>Mulai simulasi dulu biar muncul di sini.</p>
            </div>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                className="fitur-card"
                onClick={() => navigate(`/career/${item.career_id}`)}
                style={{ cursor: "pointer" }}
              >
                <h3>{item.title}</h3>

                <p style={{ marginTop: "8px", color: "#667085" }}>
                  📅 {new Date(item.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>
            ))
          )}

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="dashboard-footer">

        <div className="footer-top">

          <div className="footer-left">

            <img
              src="/logo.png"
              className="footer-logo"
              alt="Logo"
            />

            <p>
              Life After UB merupakan platform
              pengembangan karir mahasiswa dan alumni
              Universitas Brawijaya untuk membantu
              eksplorasi profesi dan simulasi karir.
            </p>

          </div>

          <div className="footer-right">

            <h3>
              Wacana Team
            </h3>

            <p>
              Kelompok 1 — T2G
            </p>

            <span>
              Student project based in Malang, Indonesia.
            </span>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 Life After UB —
          All Rights Reserved

        </div>

      </footer>

      {/* ================= HELP ================= */}

      <button
        className="help-button"
        onClick={() =>
          setHelpOpen(!helpOpen)
        }
      >
        ?
      </button>

      {helpOpen && (

        <div className="help-popup-simple">

          <span>

            Hubungi admin apabila mengalami kendala.
            <br />

            📧 Email: wacanateam@gmail.com

            <br />

            📞 WhatsApp: 0895-4230-34517

          </span>

          <button
            onClick={() =>
              setHelpOpen(false)
            }
          >
            ✕
          </button>

        </div>

      )}

    </div>

  );
}