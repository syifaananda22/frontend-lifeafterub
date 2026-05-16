import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminActivityPage() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/activity"
      );

      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>

          <h1>Monitoring Aktivitas User</h1>

          <p>
            Pantau aktivitas user seperti simulasi karir dan rekomendasi karir.
          </p>
        </div>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Aktivitas</th>
              <th>Status</th>
              <th>Waktu</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item: any) => (
              <tr key={item.id}>
                <td>{item.user}</td>
                <td>{item.aktivitas}</td>
                <td>
                  <span className="role-user">{item.status}</span>
                </td>
                <td>{item.created_at}</td>
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