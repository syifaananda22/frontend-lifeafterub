import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/RecommendationPage.css";

export default function RecommendationPage() {
  const navigate = useNavigate();

  const [helpOpen, setHelpOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [form, setForm] = useState({
    minat: "",
    skill: "",
    gaya_kerja: "",
    industri: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendation = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/career-recommendations",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecommendations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recommendation-page fade-page">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src="/logo.png" className="dashboard-logo" alt="Logo" />
        </div>

        <div className="nav-menu">
          <span onClick={() => navigate("/dashboard")}>BERANDA</span>
          <span onClick={() => navigate("/history")}>RIWAYAT</span>
          <span onClick={() => navigate("/profil")}>PROFIL</span>
        </div>
      </nav>

      <section className="recommendation-hero">
        <span className="recommendation-badge">CAREER ADVISOR</span>
        <h1>Rekomendasi Karir Untukmu</h1>
        <p>
          Temukan karir yang paling cocok berdasarkan minat, skill, gaya kerja,
          dan industri yang kamu inginkan.
        </p>

        <button
          className="hero-test-btn"
          onClick={() =>
            document
              .querySelector(".recommendation-container")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Mulai Tes
        </button>
      </section>

      <section className="recommendation-container">
        <div className="recommendation-form-card">
          <h2>Isi Preferensi Karirmu</h2>

          <label>Minat Utama</label>
          <select name="minat" value={form.minat} onChange={handleChange}>
            <option value="">Pilih Minat</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Data">Data</option>
            <option value="Desain">Desain</option>
            <option value="Marketing">Marketing</option>
            <option value="Bisnis">Bisnis</option>
          </select>

          <label>Skill yang Dikuasai</label>
          <select name="skill" value={form.skill} onChange={handleChange}>
            <option value="">Pilih Skill</option>
            <option value="Coding">Coding</option>
            <option value="Analisis Data">Analisis Data</option>
            <option value="Desain">Desain</option>
            <option value="Komunikasi">Komunikasi</option>
            <option value="Manajemen">Manajemen</option>
          </select>

          <label>Gaya Kerja</label>
          <select
            name="gaya_kerja"
            value={form.gaya_kerja}
            onChange={handleChange}
          >
            <option value="">Pilih Gaya Kerja</option>
            <option value="Individu">Individu</option>
            <option value="Tim">Tim</option>
            <option value="Fleksibel">Fleksibel</option>
          </select>

          <label>Industri yang Diminati</label>
          <select
            name="industri"
            value={form.industri}
            onChange={handleChange}
          >
            <option value="">Pilih Industri</option>
            <option value="Startup">Startup</option>
            <option value="Corporate">Corporate</option>
            <option value="Creative Agency">Creative Agency</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
          </select>

          <button onClick={getRecommendation}>Lihat Rekomendasi</button>
        </div>

        <div className="recommendation-result-card">
          <h2>Hasil Rekomendasi</h2>

          {recommendations.length === 0 ? (
            <div className="recommendation-empty">
              <h3>Belum ada rekomendasi</h3>
              <p>Isi preferensi karirmu terlebih dahulu.</p>
            </div>
          ) : (
            <div className="recommendation-list">
              {recommendations.map((item, index) => (
                <div className="recommendation-card" key={index}>
                  <div className="recommendation-card-top">
                    <div>
                      <div className="match-score">{item.match}% Match</div>
                      <h3>{item.title}</h3>
                    </div>
                  </div>

                  <p>{item.reason}</p>

                  <div className="recommendation-section">
                    <strong>Skill Cocok</strong>
                    <div className="recommendation-tags">
                      {item.skills.map((skill: string, i: number) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="recommendation-section">
                    <strong>Perlu Dipelajari</strong>
                    <div className="recommendation-tags light">
                      {item.learn.map((skill: string, i: number) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="recommendation-insight-box">
                    <strong>Career Insight</strong>
                    <p>{item.insight}</p>
                  </div>

                  <div className="recommendation-roadmap">
                    <strong>Roadmap Mini</strong>

                    <div className="roadmap-list">
                      {item.roadmap.map((step: string, i: number) => (
                        <div className="roadmap-item" key={i}>
                          <span>{i + 1}</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="recommendation-alumni-box">
                    <strong>Alumni Terkait</strong>
                    <p>
                      Cari alumni dengan posisi <b>{item.alumni_keyword}</b>{" "}
                      untuk melihat contoh perusahaan dan persiapan karirnya.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/career?search=${item.alumni_keyword}`)
                      }
                    >
                      Lihat Alumni Terkait
                    </button>
                  </div>

                  <button
                    className="detail-career-btn"
                    onClick={() => navigate(`/career/${item.career_id}`)}
                  >
                    Lihat Detail Karir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="dashboard-footer recommendation-footer">
        <div className="footer-top">
          <div className="footer-left">
            <img src="/logo.png" className="footer-logo" alt="Logo" />
            <p>
              Life After UB merupakan platform pengembangan karir mahasiswa dan
              alumni Universitas Brawijaya untuk membantu eksplorasi profesi,
              simulasi karir, serta insight dunia kerja.
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