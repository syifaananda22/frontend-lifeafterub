import { useState } from "react";
import "../styles/login.css";
import hero from "../assets/hero.png";

const Login = () => {
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
    <div className="container">
      {/* LEFT */}
      <div className="left">
        <div className="overlay">
          <img src={hero} alt="hero" className="hero-img" />
          <h1>LifeAfterUB</h1>
          <p>Bangun karir profesionalmu mulai dari sini</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="card">
          <h2>Masuk ke akun</h2>
          <p className="subtitle">Gunakan akun kamu untuk melanjutkan</p>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Ingat saya
            </label>
            <span className="forgot">Lupa password?</span>
          </div>

          <button className="btn-login" onClick={handleLogin}>
            Masuk
          </button>

          <div className="divider">
            <span>atau</span>
          </div>

          <button className="btn-google">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
            />
            Masuk dengan Google
          </button>

          <p className="register">
            Belum punya akun? <span>Daftar</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;