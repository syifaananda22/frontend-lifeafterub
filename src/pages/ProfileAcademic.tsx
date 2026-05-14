import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileAcademic.css";

export default function ProfileAcademic() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    fakultas: "",
    prodi: "",
    tahun_masuk: "",
  });

  const prodiOptions: Record<string, string[]> = {

    "Fakultas Vokasi": [
      "D3 Teknologi Informasi",
      "D3 Administrasi Bisnis",
      "D3 Keuangan dan Perbankan",
      "D4 Manajemen Perhotelan",
      "D4 Desain Grafis",
    ],

    "Fakultas Ilmu Komputer": [
      "S1 Sistem Informasi",
      "S1 Teknologi Informasi",
      "S1 Pendidikan Teknologi Informasi",
      "S1 Teknik Informatika",
      "S1 Teknik Komputer",
    ],

  };

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    const {
      nama,
      fakultas,
      prodi,
      tahun_masuk
    } = form;

    if (
      !nama ||
      !fakultas ||
      !prodi ||
      !tahun_masuk
    ) {

      window.showToast(
        "Semua data wajib diisi!",
        "error"
      );

      return;

    }

    try {

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      const res = await axios.post(
        "http://127.0.0.1:8000/api/profil",
        form
      );

      window.showToast(
        res.data.message ||
        "Berhasil menyimpan data!",
        "success"
      );

      // SIMPAN DATA USER
      localStorage.setItem(
        "nama",
        form.nama
      );

      localStorage.setItem(
        "prodi",
        form.prodi
      );

      localStorage.setItem(
        "fakultas",
        form.fakultas
      );

      // REDIRECT
      setTimeout(() => {

        navigate("/dashboard");

      }, 800);

    } catch (error) {

      console.log(error);

      window.showToast(
        "Gagal menyimpan data",
        "error"
      );

    }

  };

  return (

    <div className="container fade-page">

      {/* LEFT */}
      <div className="left">

        <div className="left-content">

          <img
            src="/logo.png"
            className="logo"
          />

          <div
            className="hero-box"
            onClick={() =>
              window.showToast("Silahkan isi profil")
            }
          >

            <img
              src="/profilakademik.png"
              alt="Profil Akademik"
            />

          </div>

          <div className="welcome-box">

            <div className="line"></div>

            <div>

              <h1>
                Lengkapi Profil Akademik
              </h1>

              <p>
                Lengkapi profil akademikmu untuk
                mengakses beranda.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="right">

        <div className="card">

          <h2>
            Profil Akademik
          </h2>

          {/* NAMA */}
          <input
            name="nama"
            placeholder="Nama lengkap"
            value={form.nama}
            onChange={handleChange}
          />

          {/* FAKULTAS */}
          <div className="select-wrapper">

            <select
              className="select-input"
              name="fakultas"
              value={form.fakultas}
              onChange={(e) => {

                handleChange(e);

                setForm((prev) => ({
                  ...prev,
                  prodi: "",
                }));

              }}
            >

              <option value="" disabled hidden>
                Pilih Fakultas
              </option>

              <option value="Fakultas Vokasi">
                Fakultas Vokasi
              </option>

              <option value="Fakultas Ilmu Komputer">
                Fakultas Ilmu Komputer
              </option>

            </select>

          </div>

          {/* PRODI */}
          <div className="select-wrapper">

            <select
              className="select-input"
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              disabled={!form.fakultas}
            >

              <option value="" disabled hidden>
                Pilih Program Studi
              </option>

              {(prodiOptions[
                form.fakultas
              ] || []).map(
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

          {/* TAHUN MASUK */}
          <div className="select-wrapper">

            <select
              className="select-input"
              name="tahun_masuk"
              value={form.tahun_masuk}
              onChange={handleChange}
            >

              <option value="" disabled hidden>
                Tahun Masuk
              </option>

              {[2020, 2021, 2022, 2023, 2024, 2025].map(
                (tahun) => (

                  <option
                    key={tahun}
                    value={tahun}
                  >
                    {tahun}
                  </option>

                )
              )}

            </select>

          </div>

          {/* BUTTON SIMPAN */}
          <button
            className="btn-login"
            onClick={handleSubmit}
          >

            Simpan

          </button>

        </div>

      </div>

    </div>

  );

}