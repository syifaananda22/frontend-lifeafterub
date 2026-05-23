import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/AlumniCareerPage.css";

export default function AlumniCareerPage() {
  const navigate = useNavigate();

  const [helpOpen, setHelpOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [fakultas, setFakultas] = useState("");
  const [alumni, setAlumni] = useState<any[]>([]);

  const [stats, setStats] = useState({
    total_alumni: 0,
    total_perusahaan: 0,
    total_posisi: 0,
    total_fakultas: 0,
  });

  const [animatedStats, setAnimatedStats] = useState({
    total_alumni: 0,
    total_perusahaan: 0,
    total_posisi: 0,
    total_fakultas: 0,
  });

  useEffect(() => {
    getAlumni();
    getStats();
  }, []);

  useEffect(() => {
    const duration = 700;
    const frameRate = 30;
    const totalFrames = Math.round(duration / frameRate);

    let frame = 0;

    const counter = setInterval(() => {
      frame++;

      const progress = frame / totalFrames;

      setAnimatedStats({
        total_alumni: Math.round(stats.total_alumni * progress),
        total_perusahaan: Math.round(stats.total_perusahaan * progress),
        total_posisi: Math.round(stats.total_posisi * progress),
        total_fakultas: Math.round(stats.total_fakultas * progress),
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setAnimatedStats(stats);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [stats]);

  const getAlumni = async () => {
    try {

      const token = localStorage.getItem("token"); // taro disini

      const response = await axios.get(
        `http://127.0.0.1:8000/api/alumni-careers?search=${search}&fakultas=${fakultas}`
      );

      setAlumni(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStats = async () => {
    try {

      const token = localStorage.getItem("token"); // taro juga di sini kalau belum ada
      
      const response = await axios.get(
        "http://127.0.0.1:8000/api/alumni-careers/stats"
      );

      setStats(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getAlumni();
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
        <span className="alumni-badge">ALUMNI CAREER</span>
        <h1>Karir Alumni UB</h1>
        <p>
          Jelajahi perjalanan karir alumni berdasarkan posisi, perusahaan,
          fakultas, program studi, dan bidang pekerjaan.
        </p>
      </section>

      <section className="alumni-stats">
        <div className="alumni-stat-card">
          <span>Total Alumni</span>
          <h3>{animatedStats.total_alumni}</h3>
        </div>

        <div className="alumni-stat-card">
          <span>Perusahaan</span>
          <h3>{animatedStats.total_perusahaan}</h3>
        </div>

        <div className="alumni-stat-card">
          <span>Posisi</span>
          <h3>{animatedStats.total_posisi}</h3>
        </div>

        <div className="alumni-stat-card">
          <span>Fakultas</span>
          <h3>{animatedStats.total_fakultas}</h3>
        </div>
      </section>

      <section className="alumni-search-section">
        <form className="alumni-search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Cari nama, posisi, perusahaan, bidang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={fakultas}
            onChange={(e) => setFakultas(e.target.value)}
          >
            <option value="">Semua Fakultas</option>
            <option value="Fakultas Vokasi">Fakultas Vokasi</option>
            <option value="Fakultas Ilmu Komputer">
              Fakultas Ilmu Komputer
            </option>
          </select>

          <button type="submit">Cari</button>
        </form>
      </section>

      <section className="alumni-list-section">
        <div className="section-title">
          <h2>Daftar Karir Alumni</h2>
          <p>Inspirasi karir alumni dari berbagai bidang industri</p>
        </div>

        {alumni.length === 0 ? (
          <div className="alumni-empty">
            <h3>Data alumni belum tersedia</h3>
            <p>Belum ada data yang sesuai dengan pencarian.</p>
          </div>
        ) : (
          <div className="alumni-grid">
            {alumni.map((item) => (
              <div className="alumni-card" key={item.id}>
                <div className="alumni-photo">
                      {item.foto ? (
                            <img
                              src={item.foto}
                              alt={item.nama}
                            />
                               ) : (
                <span>{item.nama.charAt(0).toUpperCase()}</span>
                               )}
                            </div>
                <div className="alumni-content">
                  <span className="alumni-field">{item.bidang}</span>

                  <h3>{item.nama}</h3>

                  <p className="alumni-position">{item.posisi}</p>

                  <p className="alumni-company">{item.perusahaan}</p>

                  <div className="alumni-meta">
                    <span>{item.fakultas}</span>
                    <span>{item.prodi}</span>
                    <span>Lulus {item.tahun_lulus}</span>
                  </div>

                  <p className="alumni-desc">{item.deskripsi}</p>

                  <div className="alumni-extra">
                    <p>
                      <strong>Sumber Loker:</strong>{" "}
                      {item.sumber_loker || "-"}
                    </p>

                    <p>
                      <strong>Persiapan:</strong>{" "}
                      {item.persiapan || "-"}
                    </p>
                  </div>
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