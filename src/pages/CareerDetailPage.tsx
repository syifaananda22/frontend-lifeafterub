import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/CareerDetailPage.css";

export default function CareerDetailPage() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [career, setCareer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);

  // ================= TAMBAHAN POPUP =================
  const [popup, setPopup] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | AMBIL DETAIL CAREER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    getCareer();
  }, []);

  const getCareer = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/career/${id}`
      );

      setCareer(response.data.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SIMPAN HISTORY (BACKEND FIX + POPUP)
  |--------------------------------------------------------------------------
  */

  const saveToHistory = async () => {
    if (!career) return;

    try {
      const token = localStorage.getItem("token");

      // kalau belum login
      if (!token) {
        console.log("Token tidak ditemukan");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/history",
        {
          career_id: career.id,
          title: career.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // ================= POPUP SUCCESS =================
      setPopup(true);
      setTimeout(() => setPopup(false), 2000);

      // pindah halaman setelah delay kecil
      setTimeout(() => {
  setPopup(false);
  navigate("/history");
}, 2000);

    } catch (error) {
      console.log(error);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="career-loading">
        Loading...
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI (TIDAK DIUBAH SAMA SEKALI)
  |--------------------------------------------------------------------------
  */

  return (
    <div className="career-detail-page fade-in">

      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src="/logo.png" className="dashboard-logo" alt="Logo" />
        </div>

        <div className="nav-menu">
          <span onClick={() => navigate("/dashboard")}>BERANDA</span>
          <span onClick={() => navigate("/history")}>RIWAYAT</span>
          <span onClick={() => navigate("/profile")}>PROFIL</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="career-detail-hero">
        <img src={career.image} alt={career.title} />

        <div className="career-hero-overlay">
          <div className="career-hero-content">

            <div className="career-tag">
              CAREER SIMULATION
            </div>

            <h1>{career.title}</h1>

            <p>{career.description}</p>

            <div className="salary-card">
              💰 {career.salary}
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="career-detail-container">

        <div className="detail-box">
          <div className="detail-title-row">
            <h2>Skill yang Dibutuhkan</h2>
          </div>

          <div className="skill-list">
            {career.skill?.split(",").map((item: string, index: number) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-title-row">
            <h2>Tools & Software</h2>
          </div>

          <div className="tool-list">
            {career.tools?.split(",").map((item: string, index: number) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>

        <div className="detail-box">
          <div className="detail-title-row">
            <h2>Tugas Utama</h2>
          </div>

          <p className="detail-description">
            {career.tugas}
          </p>
        </div>

        <div className="detail-box">
          <div className="detail-title-row">
            <h2>Prospek Karir</h2>
          </div>

          <p className="detail-description">
            {career.prospek}
          </p>
        </div>

        {/* BUTTON */}
        <button
          className="simulation-button"
          onClick={saveToHistory}
        >
          Simpan Simulasi Karir
        </button>

      </section>

      {/* ================= POPUP SUCCESS ================= */}
      {popup && (
        <div className="popup-success">
          ✔ Simulasi berhasil disimpan
        </div>
      )}

      {/* FOOTER */}
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

            <h3>Wacana Team</h3>
            <p>Kelompok 1 — T2G</p>
            <span>Student project based in Malang, Indonesia.</span>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 Life After UB — All Rights Reserved
        </div>

      </footer>

      {/* HELP */}
      <button
        className="help-button"
        onClick={() => setHelpOpen(!helpOpen)}
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

          <button onClick={() => setHelpOpen(false)}>✕</button>
        </div>
      )}

    </div>
  );
}