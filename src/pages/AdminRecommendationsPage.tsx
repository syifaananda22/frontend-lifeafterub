import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminRecommendationsPage() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    getRecommendations();
  }, []);

  const getRecommendations = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/recommendations"
      );

      setRecommendations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteRecommendation = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/recommendations/${deleteId}`
      );

      setDeleteOpen(false);
      getRecommendations();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus data rekomendasi");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>

          <h1>Kelola Rekomendasi Karir</h1>

          <p>
            Lihat data preferensi user yang digunakan untuk menghasilkan
            rekomendasi karir.
          </p>
        </div>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Minat</th>
              <th>Skill</th>
              <th>Gaya Kerja</th>
              <th>Industri</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {recommendations.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user?.profile?.nama || "-"}</td>
                <td>{item.user?.email || "-"}</td>
                <td>{item.minat || "-"}</td>
                <td>{item.skill || "-"}</td>
                <td>{item.gaya_kerja || "-"}</td>
                <td>{item.industri || "-"}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      Delete
                    </button>
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

      {deleteOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-modal">
            <h2>Hapus Data Rekomendasi?</h2>

            <p>Data preferensi rekomendasi karir akan dihapus dari database.</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteOpen(false)}
              >
                Batal
              </button>

              <button className="delete-confirm-btn" onClick={deleteRecommendation}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}