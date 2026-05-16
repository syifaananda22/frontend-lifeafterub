import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminAcademicPage() {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    user_id: "",
    nama: "",
    fakultas: "",
    prodi: "",
    tahun_masuk: "",
  });

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfiles = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/academic"
      );

      setProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      user_id: "",
      nama: "",
      fakultas: "",
      prodi: "",
      tahun_masuk: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditId(item.id);
    setForm({
      user_id: item.user_id || "",
      nama: item.nama || "",
      fakultas: item.fakultas || "",
      prodi: item.prodi || "",
      tahun_masuk: item.tahun_masuk || "",
    });
    setModalOpen(true);
  };

  const saveProfile = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/admin/academic/${editId}`,
          form
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/admin/academic", form);
      }

      setModalOpen(false);
      getProfiles();
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan profil akademik");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/academic/${deleteId}`
      );

      setDeleteOpen(false);
      getProfiles();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus profil akademik");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>

          <h1>Kelola Profil Akademik</h1>

          <p>
            Lihat, tambah, ubah, dan hapus data profil akademik pengguna pada
            sistem Life After UB.
          </p>
        </div>

        <button className="add-user-btn" onClick={openCreateModal}>
          + Tambah Profil
        </button>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Fakultas</th>
              <th>Program Studi</th>
              <th>Tahun Masuk</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {profiles.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.nama || "-"}</td>
                <td>{item.user?.email || "-"}</td>
                <td>{item.fakultas || "-"}</td>
                <td>{item.prodi || "-"}</td>
                <td>{item.tahun_masuk || "-"}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </button>

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

      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>{editId ? "Edit Profil Akademik" : "Tambah Profil Akademik"}</h2>

            {!editId && (
              <>
                <label>User ID</label>
                <input
                  type="text"
                  value={form.user_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      user_id: e.target.value,
                    })
                  }
                  placeholder="Masukkan user ID"
                />
              </>
            )}

            <label>Nama Lengkap</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
              placeholder="Masukkan nama lengkap"
            />

            <label>Fakultas</label>
            <select
              value={form.fakultas}
              onChange={(e) =>
                setForm({
                  ...form,
                  fakultas: e.target.value,
                  prodi: "",
                })
              }
            >
              <option value="">Pilih Fakultas</option>
              <option value="Fakultas Vokasi">Fakultas Vokasi</option>
              <option value="Fakultas Ilmu Komputer">
                Fakultas Ilmu Komputer
              </option>
            </select>

            <label>Program Studi</label>
            <select
              value={form.prodi}
              onChange={(e) =>
                setForm({
                  ...form,
                  prodi: e.target.value,
                })
              }
            >
              <option value="">Pilih Program Studi</option>

              {form.fakultas === "Fakultas Vokasi" && (
                <>
                  <option value="D3 Teknologi Informasi">
                    D3 Teknologi Informasi
                  </option>
                  <option value="D3 Keuangan dan Perbankan">
                    D3 Keuangan dan Perbankan
                  </option>
                  <option value="D3 Administrasi Bisnis">
                    D3 Administrasi Bisnis
                  </option>
                </>
              )}

              {form.fakultas === "Fakultas Ilmu Komputer" && (
                <>
                  <option value="S1 Teknologi Informasi">
                    S1 Teknologi Informasi
                  </option>
                  <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                  <option value="S1 Pendidikan Teknologi Informasi">
                    S1 Pendidikan Teknologi Informasi
                  </option>
                  <option value="S1 Teknik Informatika">
                    S1 Teknik Informatika
                  </option>
                  <option value="S1 Teknik Komputer">S1 Teknik Komputer</option>
                </>
              )}
            </select>

            <label>Tahun Masuk</label>
            <select
              value={form.tahun_masuk}
              onChange={(e) =>
                setForm({
                  ...form,
                  tahun_masuk: e.target.value,
                })
              }
            >
              <option value="">Pilih Tahun Masuk</option>
              {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>
                Batal
              </button>

              <button className="save-btn" onClick={saveProfile}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-modal">
            <h2>Hapus Profil Akademik?</h2>

            <p>Data profil akademik akan dihapus dari database.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteOpen(false)}>
                Batal
              </button>

              <button className="delete-confirm-btn" onClick={deleteProfile}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}