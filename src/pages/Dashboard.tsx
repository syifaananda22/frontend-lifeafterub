import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);
  const [lastSimulation, setLastSimulation] = useState<any>(null);
  const [nama, setNama] = useState(
  localStorage.getItem("nama") || "User"
);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const historyResponse = await axios.get(
        "http://127.0.0.1:8000/api/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLastSimulation(historyResponse.data.data[0] || null);

      const profileResponse = await axios.get(
        "http://127.0.0.1:8000/api/profil",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const namaUser = profileResponse.data.data.nama || "User";

setNama(namaUser);
localStorage.setItem("nama", namaUser);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="dashboard-page fade-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">

        <div className="navbar-left">

          <img
            src="/logo.png"
            className="dashboard-logo"
            alt="Logo"
          />

        </div>

        <div className="nav-menu">

          <span className="active-nav">
            BERANDA
          </span>

          <span
            onClick={() => navigate("/history")}
          >
            RIWAYAT
          </span>

          <span
            onClick={() => navigate("/profil")}
          >
            PROFIL
          </span>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="dashboard-hero">

        <div className="hero-left">

          <div className="hero-badge">
            LIFE AFTER UB
          </div>

          <h1>
            Halo, {nama || "User"} 👋
          </h1>

          <h2>
            Siap menjelajahi karir impianmu?
          </h2>

          <p>
            Temukan simulasi karir, insight dunia kerja,
            dan rekomendasi profesi yang sesuai dengan
            minat serta potensimu setelah lulus dari UB.
          </p>

        </div>

        <div className="hero-right">

          <div className="hero-image-wrapper">

            <img
              src="/dashboardhero.png"
              alt="Dashboard Hero"
            />

          </div>

        </div>

      </section>

      {/* ================= FITUR ================= */}

      <section className="fitur-section">

        <div className="section-title">

          <h2>Fitur Utama</h2>

          <p>
            Explore fitur utama untuk perjalanan karirmu
          </p>

        </div>

        <div className="fitur-grid">

          {/* SIMULASI */}
          <div
            className="fitur-card"
            onClick={() => navigate("/simulation")}
          >

            <img src="/fitur1.png" />

            <h3>Mulai Simulasi</h3>

            <p>
              Ikuti simulasi interaktif untuk mengetahui
              bidang karir yang paling cocok untukmu.
            </p>

          </div>

          {/* KARIR */}
          <div
            className="fitur-card"
            onClick={() => navigate("/career")}
          >

            <img src="/fitur2.png" />

            <h3>Karir Alumni</h3>

            <p>
              Jelajahi perjalanan karir alumni UB
              dari berbagai bidang industri modern.
            </p>

          </div>

          {/* REKOMENDASI */}
          <div
            className="fitur-card"
            onClick={() => navigate("/recommendation")}
          >

            <img src="/fitur3.png" />

            <h3>Rekomendasi Karir</h3>

            <p>
              Dapatkan rekomendasi profesi berdasarkan
              minat dan kemampuan akademikmu.
            </p>

          </div>

        </div>

      </section>

      {/* ================= KARIR POPULER ================= */}

      <section className="popular-section">

        <div className="section-header">

          <div className="section-title">

            <h2>Karir Populer</h2>

            <p>
              Profesi populer yang banyak diminati saat ini
            </p>

          </div>

          <div className="scroll-info">
            Lihat lainnya →
          </div>

        </div>

        <div className="popular-scroll">

          {/* CARD 1 */}
          <div
            className="popular-card"
            onClick={() =>
              navigate("/career/3")
            }
          >

            <img src="/softwaredev.png" />

            <div className="popular-content">

              <h3>Software Developer</h3>

              <p>
                Mengembangkan aplikasi dan website modern.
              </p>

            </div>

          </div>

          {/* CARD 2 */}
          <div
            className="popular-card"
            onClick={() =>
              navigate("/career/6")
            }
          >

            <img src="/dataanalyst.png" />

            <div className="popular-content">

              <h3>Data Analyst</h3>

              <p>
                Mengolah data menjadi insight bisnis.
              </p>

            </div>

          </div>

          {/* CARD 3 */}
          <div
            className="popular-card"
            onClick={() =>
              navigate("/career/11")
            }
          >

            <img src="/uiux.png" />

            <div className="popular-content">

              <h3>UI/UX Designer</h3>

              <p>
                Mendesain tampilan aplikasi modern.
              </p>

            </div>

          </div>

          {/* CARD 4 */}
          <div
            className="popular-card"
            onClick={() =>
              navigate("/career/16")
            }
          >

            <img src="/digitalmarketing.png" />

            <div className="popular-content">

              <h3>Digital Marketing</h3>

              <p>
                Mengembangkan strategi pemasaran digital.
              </p>

            </div>

          </div>

          {/* CARD 5 */}
          <div
            className="popular-card"
            onClick={() =>
              navigate("/career/17")
            }
          >

            <img src="/productmanager.png" />

            <div className="popular-content">

              <h3>Product Manager</h3>

              <p>
                Mengatur strategi dan pengembangan produk.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= BOTTOM ================= */}

      <section className="bottom-section">

        {/* INSIGHT */}
        <div className="insight-wrapper">

          <div className="section-title">

            <h2>Insight Bidang Karir</h2>

            <p>
              Bidang pekerjaan yang paling diminati saat ini
            </p>

          </div>

          <div className="insight-card">

            <div className="insight-list">

              <div className="insight-item">

                <div className="insight-top">

                  <span>Teknologi & Software</span>

                  <span>45%</span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "45%" }}
                  ></div>

                </div>

              </div>

              <div className="insight-item">

                <div className="insight-top">

                  <span>Data & Analisis</span>

                  <span>30%</span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "30%" }}
                  ></div>

                </div>

              </div>

              <div className="insight-item">

                <div className="insight-top">

                  <span>Desain & Kreatif</span>

                  <span>25%</span>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{ width: "25%" }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SIMULASI */}
        <div className="simulation-card">

          <div className="simulation-top">

            <div>

              <h2>Simulasi Terakhir</h2>

              <p>
                Progress simulasi karirmu
              </p>

            </div>

            <div className="simulation-dot"></div>

          </div>

          {lastSimulation ? (

            <div className="simulation-content">

              <h3>
                {lastSimulation.title}
              </h3>

              <p>
                Simulasi terakhir masih dapat
                dilanjutkan kembali.
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/career/${lastSimulation.career_id}`
                  )
                }
              >
                Lanjutkan
              </button>

            </div>

          ) : (

            <div className="empty-simulation">

              <h3>
                Belum ada simulasi
              </h3>

              <p>
                Mulai simulasi pertamamu untuk
                melihat progress karir di sini.
              </p>

            </div>

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
            />

            <p>
              Life After UB merupakan platform
              pengembangan karir mahasiswa dan alumni
              Universitas Brawijaya untuk membantu
              eksplorasi profesi, simulasi karir,
              serta insight dunia kerja.
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

       {/* ================= HELP BUTTON ================= */}
      <button
        className="help-button"
        onClick={() => setHelpOpen(!helpOpen)}
      >
        ?
      </button>

      {/* 👇 INI YANG KAMU MAKSUD "DI BAWAH RETURN" */}
      {helpOpen && (
        <div className="help-popup-simple">
          <span>Hubungi admin apabila mengalami kendala.<br />
  📧 Email: wacanateam@gmail.com<br />
  📞 WhatsApp: 0895-4230-34517</span>
          <button onClick={() => setHelpOpen(false)}>✕</button>
        </div>
      )}

    </div>
  );
}