import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Dashboard.css";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [helpOpen, setHelpOpen] = useState(false);
  const [popup, setPopup] = useState("");
const [popupType, setPopupType] = useState("success");
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    email: "",
    nama: "",
    fakultas: "",
    prodi: "",
    tahun_masuk: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    password_lama: "",
    password_baru: "",
  });

  const prodiOptions: any = {
    "Fakultas Vokasi": [
      "D3 Teknologi Informasi",
      "D4 Desain Grafis",
      "D4 Manajemen Perhotelan",
    ],
    "Fakultas Ilmu Komputer": [
      "S1 Informatika",
      "S1 Sistem Informasi",
      "S1 Teknologi Informasi",
    ],
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://127.0.0.1:8000/api/profil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        email: response.data.data.email || "",
        nama: response.data.data.nama || "",
        fakultas: response.data.data.fakultas || "",
        prodi: response.data.data.prodi || "",
        tahun_masuk: response.data.data.tahun_masuk || "",
      });

      setFotoPreview(response.data.data.foto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "fakultas") {
      setForm({
        ...form,
        fakultas: value,
        prodi: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("nama", form.nama);
      data.append("fakultas", form.fakultas);
      data.append("prodi", form.prodi);
      data.append("tahun_masuk", form.tahun_masuk);

      if (fotoFile) {
        data.append("foto", fotoFile);
      }

      await axios.post("http://127.0.0.1:8000/api/profil", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("nama", form.nama);

      setPopupType("success");
      setPopup("Profil berhasil diperbarui");
      setTimeout(() => setPopup(""), 2000);
    } catch (error) {
      console.log(error);
      setPopupType("error");
      setPopup("Gagal memperbarui profil");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  const changePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://127.0.0.1:8000/api/profil/password",
        passwordForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPasswordForm({
        password_lama: "",
        password_baru: "",
      });

      setPopup("Password berhasil diganti");
      setTimeout(() => setPopup(""), 2000);
    } catch (error) {
      console.log(error);
      setPopupType("error");
      setPopup("Password lama salah atau gagal diganti");
      setTimeout(() => setPopup(""), 2000);
    }
  };

  return (
    <div className="profile-page fade-page">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src="/logo.png" className="dashboard-logo" alt="Logo" />
        </div>

        <div className="nav-menu">
          <span onClick={() => navigate("/dashboard")}>BERANDA</span>
          <span onClick={() => navigate("/history")}>RIWAYAT</span>
          <span className="active-nav">PROFIL</span>
        </div>
      </nav>

      <section className="profile-hero">
        <span className="profile-badge">USER PROFILE</span>
        <h1>Profil Pengguna</h1>
        <p>Kelola data akun, foto profil, fakultas, program studi, tahun masuk, dan password.</p>
      </section>

      <section className="profile-container">
        <div className="profile-card profile-main-card">
          <h2>Informasi Profil</h2>

          <div className="profile-photo-section">
            <div className="profile-photo">
              {fotoPreview ? (
                <img src={fotoPreview} alt="Foto Profil" />
              ) : (
                <span>{form.nama ? form.nama.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>

            <label className="upload-photo-btn">
              Ganti Foto
              <input type="file" accept="image/*" onChange={handleFotoChange} />
            </label>
          </div>

          <label>Email</label>
          <input value={form.email} disabled />

          <label>Nama Lengkap</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
          />

          <label>Fakultas</label>
          <select name="fakultas" value={form.fakultas} onChange={handleChange}>
            <option value="" disabled hidden>
              Pilih Fakultas
            </option>
            <option value="Fakultas Vokasi">Fakultas Vokasi</option>
            <option value="Fakultas Ilmu Komputer">Fakultas Ilmu Komputer</option>
          </select>

          <label>Program Studi</label>
          <select
            name="prodi"
            value={form.prodi}
            onChange={handleChange}
            disabled={!form.fakultas}
          >
            <option value="" disabled hidden>
              Pilih Program Studi
            </option>

            {(prodiOptions[form.fakultas] || []).map((item: string, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label>Tahun Masuk</label>
          <select name="tahun_masuk" value={form.tahun_masuk} onChange={handleChange}>
            <option value="" disabled hidden>
              Tahun Masuk
            </option>

            {[2020, 2021, 2022, 2023, 2024, 2025].map((tahun) => (
              <option key={tahun} value={tahun}>
                {tahun}
              </option>
            ))}
          </select>

          <button className="profile-save-btn" onClick={updateProfile}>
            Simpan Perubahan
          </button>
        </div>

        <div className="profile-card">
          <h2>Ganti Password</h2>

          <label>Password Lama</label>
          <input
            type="password"
            value={passwordForm.password_lama}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                password_lama: e.target.value,
              })
            }
            placeholder="Masukkan password lama"
          />

          <label>Password Baru</label>
          <input
            type="password"
            value={passwordForm.password_baru}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                password_baru: e.target.value,
              })
            }
            placeholder="Masukkan password baru"
          />

          <button className="profile-password-btn" onClick={changePassword}>
            Ganti Password
          </button>
        </div>
      </section>

      {popup && (
  <div
    className={
      popupType === "success"
        ? "popup-success"
        : "popup-error"
    }
  >
    {popupType === "success" ? "✔" : "✕"} {popup}
  </div>
)}

      <footer className="dashboard-footer profile-footer">
        <div className="footer-top">
          <div className="footer-left">
            <img src="/logo.png" className="footer-logo" alt="Logo" />
            <p>
              Life After UB merupakan platform pengembangan karir mahasiswa dan alumni
              Universitas Brawijaya untuk membantu eksplorasi profesi dan simulasi karir.
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