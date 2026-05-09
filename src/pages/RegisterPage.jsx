import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);

  const isValid =
    hasMinLength && hasNumber && hasSymbol && hasUppercase;

  return (
    <div className="container fade-in">

      {/* LEFT */}
      <div className="left">
        <div className="left-content">

          <img src="/logo.png" className="logo" />

          <div className="hero-box">
            <img src="/hero.png" />
          </div>

          {/* UPDATED TEXT */}
          <h1>Mulai Perjalanan Karier Digital</h1>
          <p>
            Daftar untuk mengakses fitur dan memulai perjalanan karier Anda.
          </p>

        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="card register-card">

          {/* HEADER FORM */}
          <div className="title-box">
            <div className="line-title-fixed"></div>

            <div>
              <h2 className="title-big">Buat Akun Baru</h2>
            </div>
          </div>

          {/* EMAIL */}
          <label className="label">Email aktif Anda</label>
          <input
            type="email"
            placeholder="Masukkan email aktif"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <label className="label">Buat kata sandi</label>
          <input
            type="password"
            placeholder="Masukkan kata sandi"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* VALIDASI PASSWORD */}
          {password.length > 0 && (
            <div className="password-rules">

              <p className={hasMinLength ? "valid" : "invalid"}>
                Minimal 8 karakter
              </p>

              <p className={hasUppercase ? "valid" : "invalid"}>
                Mengandung huruf besar (A-Z)
              </p>

              <p className={hasNumber ? "valid" : "invalid"}>
                Mengandung angka (0-9)
              </p>

              <p className={hasSymbol ? "valid" : "invalid"}>
                Mengandung simbol (!@#$% dll)
              </p>

            </div>
          )}

          {/* BUTTON */}
          <button
            className="btn-login"
            disabled={!isValid}
            style={{
              opacity: isValid ? 1 : 0.5,
              cursor: isValid ? "pointer" : "not-allowed",
              marginTop: "12px"
            }}
          >
            Daftar
          </button>

          {/* LINK LOGIN */}
          <p className="register">
            Sudah punya akun?{" "}
            <span className="link-yellow" onClick={() => navigate("/")}>
              Masuk
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}