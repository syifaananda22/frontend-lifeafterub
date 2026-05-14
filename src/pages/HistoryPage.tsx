import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/HistoryPage.css";

export default function HistoryPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://127.0.0.1:8000/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus riwayat simulasi ini?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://127.0.0.1:8000/api/history/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(history.filter((item) => item.id !== id));
      setPopup("Riwayat simulasi berhasil dihapus");

      setTimeout(() => setPopup(""), 2000);
    } catch (error) {
      console.log(error);
      setPopup("Gagal menghapus riwayat");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="history-page fade-page">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src="/logo.png" className="dashboard-logo" alt="Logo" />
        </div>

        <div className="nav-menu">
          <span onClick={() => navigate("/dashboard")}>BERANDA</span>
          <span className="active-nav">RIWAYAT</span>
          <span onClick={() => navigate("/profil")}>PROFIL</span>
        </div>
      </nav>

      <section className="history-hero">
        <div className="history-hero-content">
          <span className="history-badge">SIMULATION HISTORY</span>
          <h1>Riwayat Simulasi Karir</h1>
          <p>
            Lihat kembali simulasi karir yang sudah kamu simpan dan lanjutkan
            eksplorasi profesi impianmu.
          </p>
        </div>
      </section>

      <section className="history-container">
        <div className="history-title-row">
          <div>
            <h2>Daftar Riwayat</h2>
            <p>{history.length} simulasi tersimpan</p>
          </div>

          <button
            className="explore-btn"
            onClick={() => navigate("/dashboard")}
          >
            Eksplorasi Karir
          </button>
        </div>

        {loading ? (
  <div className="history-loading-box">
    Memuat data simulasi...
  </div>
) : history.length === 0 ? (
  
          <div className="empty-history-box">
            <h3>Belum ada riwayat simulasi</h3>
            <p>Mulai simpan simulasi karir agar riwayatnya muncul di sini.</p>

            <button onClick={() => navigate("/dashboard")}>
              Mulai Eksplorasi Karir
            </button>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div className="history-card" key={item.id}>
                <div
                  className="history-info"
                  onClick={() => navigate(`/career/${item.career_id}`)}
                >
                  <div className="history-icon">🎯</div>

                  <div>
                    <span className="history-label">Karir Tersimpan</span>
                    <h3>{item.title}</h3>

                    <p>
                      📅 Disimpan pada{" "}
                      <strong>{formatTanggal(item.date)}</strong>
                    </p>
                  </div>
                </div>

                <div className="history-actions">
                  <button
                    className="detail-history-btn"
                    onClick={() => navigate(`/career/${item.career_id}`)}
                  >
                    Lihat Detail
                  </button>

                  <button
                    className="delete-history-btn"
                    onClick={() => deleteHistory(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {popup && <div className="popup-success">✔ {popup}</div>}

      <footer className="dashboard-footer history-footer">
        <div className="footer-top">
          <div className="footer-left">
            <img src="/logo.png" className="footer-logo" alt="Logo" />

            <p>
              Life After UB merupakan platform pengembangan karir mahasiswa dan
              alumni Universitas Brawijaya untuk membantu eksplorasi profesi dan
              simulasi karir.
            </p>
          </div>

          <div className="footer-right">
            <h3>Wacana Team</h3>
            <p>Kelompok 1 — T2G</p>
            <span>Student project based in Malang, Indonesia.</span>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Life After UB — All Rights Reserved
        </div>
      </footer>

      <button className="help-button" onClick={() => setHelpOpen(!helpOpen)}>
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

          <button onClick={() => setHelpOpen(false)}>✕</button>
        </div>
      )}
    </div>
  );
}