import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminUsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      email: "",
      password: "",
      role: "user",
    });
    setModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditId(user.id);
    setForm({
      email: user.email,
      password: "",
      role: user.role,
    });
    setModalOpen(true);
  };

  const saveUser = async () => {
    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/api/admin/users/${editId}`, form);
      } else {
        await axios.post("http://127.0.0.1:8000/api/admin/users", form);
      }

      setModalOpen(false);
      getUsers();
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan data user");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/users/${deleteId}`);
      setDeleteOpen(false);
      getUsers();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus user");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>

          <h1>Kelola Data User</h1>

          <p>
            Lihat, tambah, ubah, dan hapus seluruh data pengguna pada sistem
            Life After UB.
          </p>
        </div>

        <button className="add-user-btn" onClick={openCreateModal}>
          + Tambah User
        </button>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={user.role === "admin" ? "role-admin" : "role-user"}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => openEditModal(user)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(user.id)}
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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>{editId ? "Edit User" : "Tambah User"}</h2>

            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              placeholder="Masukkan email"
            />

            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              placeholder={editId ? "Kosongkan jika tidak diganti" : "Masukkan password"}
            />

            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>
                Batal
              </button>

              <button className="save-btn" onClick={saveUser}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-modal">
            <h2>Hapus User?</h2>

            <p>Data user akan dihapus dari database.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteOpen(false)}>
                Batal
              </button>

              <button className="delete-confirm-btn" onClick={deleteUser}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}