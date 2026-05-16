import { useNavigate } from "react-router-dom";
import "../styles/AdminUsersPage.css";

export default function AdminContentPage() {
  const navigate = useNavigate();

  const contents = [
    {
      id: 1,
      section: "Hero Dashboard",
      title: "Siap menjelajahi karir impianmu?",
      status: "Aktif",
    },
    {
      id: 2,
      section: "Fitur Utama",
      title: "Simulasi Karir, Alumni Career, Career Recommendation",
      status: "Aktif",
    },
    {
      id: 3,
      section: "Karir Populer",
      title: "Software Developer, Data Analyst, UI/UX Designer",
      status: "Aktif",
    },
  ];

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>

          <h1>Kelola Konten Website</h1>

          <p>
            Kelola konten utama website seperti hero, fitur utama, gambar, dan
            karir populer.
          </p>
        </div>

        <button className="add-user-btn">
          + Tambah Konten
        </button>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Section</th>
              <th>Judul Konten</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {contents.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.section}</td>
                <td>{item.title}</td>
                <td>
                  <span className="role-user">{item.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="back-dashboard-btn"
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Kembali ke Dashboard
      </button>
    </div>
  );
}