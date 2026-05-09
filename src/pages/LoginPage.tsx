import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }
    alert("Login berhasil!");
  };

  return (
    <div className="container fade-in">

      {/* LEFT */}
      <div className="left">
        <div className="left-content">

          <img src="/logo.png" className="logo" />

          <div className="hero-box">
            <img src="/hero.png" />
          </div>

          <div className="welcome-box">
            <div className="line"></div>
            <div>
              <h1>Selamat Datang</h1>
              <p>Mulai perjalanan karirmu setelah lulus dari UB</p>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="card">

          <h2>Masuk ke akun</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="options">
            <span className="forgot">Lupa kata sandi?</span>
          </div>

          <button className="btn-login" onClick={handleLogin}>
            Masuk
          </button>

          <div className="divider">
            <span>atau</span>
          </div>

          <button className="btn-google">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" />
            Masuk dengan Google
          </button>

          <p className="register">
            Belum punya akun?{" "}
            <span className="link-yellow" onClick={() => navigate("/register")}>
              Daftar
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}