import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/AlumniCareerPage.css";

export default function CompanyJobsPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [companyId]);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/companies/${companyId}/jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jobsData = response.data.data || [];

      setJobs(jobsData);

      if (jobsData.length > 0) {
        setCompanyName(jobsData[0].company.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitCV = async () => {
    if (!cvFile || !selectedJob) {
      alert("Silakan upload CV terlebih dahulu");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("cv", cvFile);

      const token = localStorage.getItem("token");

      await axios.post(
        `http://127.0.0.1:8000/api/companies/${companyId}/apply`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedJob(null);
      setCvFile(null);
      setSuccessOpen(true);

    } catch (error) {
      console.log(error);

      alert("Gagal upload CV");
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
        <span className="alumni-badge">LOWONGAN PERUSAHAAN</span>

        <h1>{companyName || "Daftar Lowongan"}</h1>

        <p>
          Jelajahi peluang karir, magang, dan pengembangan profesional di
          perusahaan pilihanmu.
        </p>
      </section>

      <section className="alumni-list-section">

        <div className="section-title">
          <h2>Lowongan Tersedia</h2>
          <p>Daftar posisi pekerjaan dan magang yang sedang dibuka</p>
        </div>

        {jobs.length === 0 ? (

          <div className="alumni-empty">
            <h3>Tidak ada lowongan saat ini</h3>
            <p>Silakan cek kembali nanti.</p>
          </div>

        ) : (

          <div className="alumni-grid">

            {jobs.map((job) => (

              <div className="alumni-card" key={job.id}>

                <div className="alumni-content">

                  <span className="alumni-field">
                    {job.employment_type || "-"}
                  </span>

                  <h3>{job.title}</h3>

                  <p className="alumni-position">
                    {job.location || "-"}
                  </p>

                  <p className="alumni-desc">
                    {job.description || "-"}
                  </p>

                  <div className="alumni-extra">

                    <p>
                      <strong>Lokasi:</strong>{" "}
                      {job.location || "-"}
                    </p>

                    <p>
                      <strong>Tipe:</strong>{" "}
                      {job.employment_type || "-"}
                    </p>

                  </div>

                  <button
                    className="modern-company-btn"
                    onClick={() => setSelectedJob(job)}
                  >
                    Upload CV
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

      {/* MODAL UPLOAD CV */}

      {selectedJob && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <h2>Upload CV</h2>

            <p
              style={{
                marginBottom: "18px",
                color: "#666",
              }}
            >
              Posisi: <strong>{selectedJob.title}</strong>
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setCvFile(
                  e.target.files ? e.target.files[0] : null
                )
              }
              style={{
                marginBottom: "20px",
              }}
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => {
                  setSelectedJob(null);
                  setCvFile(null);
                }}
              >
                Batal
              </button>

              <button
                className="save-btn"
                onClick={submitCV}
              >
                Kirim CV
              </button>

            </div>

          </div>

        </div>

      )}

      {/* MODAL SUCCESS */}

      {successOpen && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <h2>CV Berhasil Dikirim</h2>

            <p
              style={{
                marginTop: "10px",
                color: "#666",
                lineHeight: "1.6",
              }}
            >
              CV kamu berhasil dikirim ke perusahaan.
              <br />
              Silakan tunggu proses seleksi selanjutnya.
            </p>

            <div
              className="modal-actions"
              style={{
                marginTop: "20px",
              }}
            >

              <button
                className="save-btn"
                onClick={() => setSuccessOpen(false)}
              >
                Oke
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}