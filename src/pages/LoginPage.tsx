import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      window.showToast("Email dan password wajib diisi", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email,
          password,
        }
      );

      // SIMPAN TOKEN
      localStorage.setItem("token", response.data.token);

      // 🔥 TAMBAHAN PENTING: SIMPAN NAMA USER
      localStorage.setItem("nama", response.data.user?.nama);
      localStorage.setItem("prodi", response.data.user?.prodi);

      // SET HEADER AXIOS
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      window.showToast(response.data.message, "success");

      // REDIRECT KE DASHBOARD
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (error: any) {
      console.log(error);

      if (error.response) {
        window.showToast(error.response.data.message, "error");
      } else {
        window.showToast("Terjadi kesalahan", "error");
      }
    }
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
            <span
              className="link-yellow"
              onClick={() => navigate("/register")}
            >
              Daftar
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}