import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/SimulationPage.css";

export default function SimulationPage() {

  const navigate = useNavigate();

  const [fields, setFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] =
    useState<string | null>(null);

  const [careers, setCareers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [helpOpen, setHelpOpen] =
    useState(false);

  const prodi =
    localStorage.getItem("prodi");

  const jurusanList = [

    "D3 Teknologi Informasi",
    "D3 Administrasi Bisnis",
    "D3 Keuangan dan Perbankan",
    "D4 Manajemen Perhotelan",
    "D4 Desain Grafis",

    "S1 Sistem Informasi",
    "S1 Teknologi Informasi",
    "S1 Pendidikan Teknologi Informasi",
    "S1 Teknik Informatika",
    "S1 Teknik Komputer"

  ];

  /*
  |--------------------------------------------------------------------------
  | AMBIL BIDANG
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    getFields();

  }, []);

  const getFields = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/fields"
      );

      setFields(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | AMBIL CAREER BERDASARKAN BIDANG
  |--------------------------------------------------------------------------
  */

  const getCareers = async (
    fieldId: number,
    fieldName: string
  ) => {

    try {

      setLoading(true);

      setSelectedField(fieldName);

      const response = await axios.get(
        `http://127.0.0.1:8000/api/careers/${fieldId}`
      );

      setCareers(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  /*
  |--------------------------------------------------------------------------
  | SIMPAN SIMULASI TERAKHIR
  |--------------------------------------------------------------------------
  */

  const saveSimulation = (
    careerId: number,
    careerTitle: string
  ) => {

    localStorage.setItem(
      "lastSimulation",
      careerTitle
    );

    localStorage.setItem(
      "lastCareerId",
      careerId.toString()
    );

  };

  return (

    <div className="dashboard-page fade-in">

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

          <span
            onClick={() =>
              navigate("/dashboard")
            }
          >
            BERANDA
          </span>

          <span
            onClick={() =>
              navigate("/history")
            }
          >
            RIWAYAT
          </span>

          <span
            onClick={() =>
              navigate("/profile")
            }
          >
            PROFIL
          </span>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="simulation-hero">

        <div className="hero-badge">
          CAREER EXPLORATION
        </div>

        <h1>
          Explore Bidang Karir Impianmu 🚀
        </h1>

        <p>
          Temukan profesi modern sesuai
          jurusan, minat, dan skill yang
          ingin kamu kembangkan setelah
          lulus dari UB.
        </p>

        {/* ================= JURUSAN ================= */}

        <div className="major-box">

          <span>
            Prodi Saat Ini
          </span>

          <h3>
            {prodi || "Belum memilih prodi"}
          </h3>

          <select
            className="major-select"
            defaultValue={prodi || ""}
            onChange={(e) => {

              localStorage.setItem(
                "prodi",
                e.target.value
              );

              window.location.reload();

            }}
          >

            <option value="">
              Pilih Jurusan
            </option>

            {jurusanList.map(
              (item, index) => (

                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>

              )
            )}

          </select>

        </div>

      </section>

      {/* ================= PILIH BIDANG ================= */}

      <section className="simulation-section">

        <div className="section-title">

          <h2>
            Pilih Bidang Karir
          </h2>

          <p>
            Klik bidang untuk melihat
            daftar profesi populer
          </p>

        </div>

        {/* ================= FIELD CARD ================= */}

        <div className="field-grid">

          {fields.map((field) => (

            <div
              key={field.id}
              className={`field-card ${
                selectedField ===
                field.nama_bidang
                  ? "active-field"
                  : ""
              }`}
              onClick={() =>
                getCareers(
                  field.id,
                  field.nama_bidang
                )
              }
            >

              <h3>
                {field.nama_bidang}
              </h3>

              <span>
                Lihat Profesi →
              </span>

            </div>

          ))}

        </div>

      </section>

      {/* ================= LIST CAREER ================= */}

      {selectedField && (

        <section className="career-list-section">

          <div className="section-title">

            <h2>
              {selectedField}
            </h2>

            <p>
              Profesi populer berdasarkan
              bidang yang dipilih
            </p>

          </div>

          {loading ? (

            <div className="loading-box">
              Loading...
            </div>

          ) : (

            <div className="career-grid">

              {careers.map((career) => (

                <div
                  key={career.id}
                  className="career-card"
                >

                  <img
                    src={career.image}
                    alt={career.title}
                  />

                  <div className="career-overlay">

                    <div className="career-content">

                      {/* ================= TITLE ================= */}

                      <h3>
                        {career.title}
                      </h3>

                      {/* ================= SALARY ================= */}

                      <p className="salary">

                        💰 {career.salary}

                      </p>

                      {/* ================= SKILL ================= */}

                      <div className="skill-wrapper">

                        {career.skill
                          ?.split(",")
                          .slice(0, 3)
                          .map(
                            (
                              skill: string,
                              index: number
                            ) => (

                              <span key={index}>
                                {skill}
                              </span>

                            )
                          )}

                      </div>

                      {/* ================= BUTTON ================= */}

                      <button
                        onClick={() => {

                          saveSimulation(
                            career.id,
                            career.title
                          );

                          navigate(
                            `/career/${career.id}`
                          );

                        }}
                      >

                        Lihat Simulasi

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      )}

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