import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/AlumniCareerPage.css";

export default function UserCompaniesPage() {
  const navigate = useNavigate();

  const [helpOpen, setHelpOpen] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/companies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompanies(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="alumni-page fade-page">

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

      <section className="alumni-hero">

        <span className="alumni-badge">
          PERUSAHAAN MITRA
        </span>

        <h1>Daftar Perusahaan Mitra UB</h1>

        <p>
          Jelajahi perusahaan partner Universitas Brawijaya dan peluang karir
          serta magang yang tersedia.
        </p>

      </section>

      <section className="alumni-list-section">

        <div className="section-title">
          <h2>Perusahaan Tersedia</h2>
          <p>Temukan perusahaan dan lowongan yang sesuai dengan minatmu</p>
        </div>

        {companies.length === 0 ? (

          <div className="alumni-empty">
            <h3>Belum ada perusahaan tersedia</h3>
            <p>Silakan cek kembali nanti.</p>
          </div>

        ) : (

          <div className="alumni-grid">

            {companies.map((company) => (

              <div className="alumni-card" key={company.id}>

                <div className="alumni-content">

                  <div className="company-logo-wrapper">

                    <img
  src={
    company.logo_path
      ? `http://127.0.0.1:8000/storage/${company.logo_path}`
      : "/logo.png"
  }
  alt={company.name}
  className="company-logo"
/>

                  </div>

                  <span className="alumni-field">
                    {company.industry || "-"}
                  </span>

                  <h3>{company.name}</h3>

                  <p className="alumni-desc">
  {company.description}
</p>

                  <div className="alumni-extra">

                    <p>
                      <strong>Industri:</strong>{" "}
                      {company.industry || "-"}
                    </p>

                  </div>

                  <button
                    className="modern-company-btn"
                    onClick={() =>
                      navigate(`/companies/${company.id}/jobs`)
                    }
                  >
                    Lihat Lowongan →
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      <footer className="dashboard-footer alumni-footer">

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

          <button onClick={() => setHelpOpen(false)}>
            ✕
          </button>

        </div>

      )}

    </div>
  );
}