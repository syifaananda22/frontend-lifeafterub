import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminCareersPage() {
  const navigate = useNavigate();

  const [careers, setCareers] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    career_field_id: "",
    title: "",
    description: "",
    salary: "",
    skill: "",
    tools: "",
    tugas: "",
    prospek: "",
    image: "",
  });

  useEffect(() => {
    getCareers();
  }, []);

  const getCareers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/careers"
      );

      setCareers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      career_field_id: "",
      title: "",
      description: "",
      salary: "",
      skill: "",
      tools: "",
      tugas: "",
      prospek: "",
      image: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (career: any) => {
    setEditId(career.id);
    setForm({
      career_field_id: career.career_field_id || "",
      title: career.title || "",
      description: career.description || "",
      salary: career.salary || "",
      skill: career.skill || "",
      tools: career.tools || "",
      tugas: career.tugas || "",
      prospek: career.prospek || "",
      image: career.image || "",
    });
    setModalOpen(true);
  };

  const saveCareer = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/admin/careers/${editId}`,
          form
        );
      } else {
        await axios.post("http://127.0.0.1:8000/api/admin/careers", form);
      }

      setModalOpen(false);
      getCareers();
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan data karir");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteCareer = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/careers/${deleteId}`
      );

      setDeleteOpen(false);
      getCareers();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus data karir");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>

          <h1>Kelola Data Karir</h1>

          <p>
            Lihat, tambah, ubah, dan hapus data profesi, skill, tools, prospek,
            dan gambar karir.
          </p>
        </div>

        <button className="add-user-btn" onClick={openCreateModal}>
          + Tambah Karir
        </button>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Field ID</th>
              <th>Nama Karir</th>
              <th>Salary</th>
              <th>Skill</th>
              <th>Image</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {careers.map((career: any) => (
              <tr key={career.id}>
                <td>{career.id}</td>
                <td>{career.career_field_id}</td>
                <td>{career.title}</td>
                <td>{career.salary || "-"}</td>
                <td>{career.skill || "-"}</td>
                <td>{career.image || "-"}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(career)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(career.id)}
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
          <div className="admin-modal admin-wide-modal">
            <h2>{editId ? "Edit Data Karir" : "Tambah Data Karir"}</h2>

            <label>Career Field ID</label>
            <input
              type="text"
              value={form.career_field_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  career_field_id: e.target.value,
                })
              }
              placeholder="Contoh: 1"
            />

            <label>Nama Karir</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              placeholder="Contoh: Frontend Developer"
            />

            <label>Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Masukkan deskripsi karir"
            />

            <label>Salary</label>
            <input
              type="text"
              value={form.salary}
              onChange={(e) =>
                setForm({
                  ...form,
                  salary: e.target.value,
                })
              }
              placeholder="Contoh: Rp 5.000.000 - Rp 10.000.000"
            />

            <label>Skill</label>
            <input
              type="text"
              value={form.skill}
              onChange={(e) =>
                setForm({
                  ...form,
                  skill: e.target.value,
                })
              }
              placeholder="Contoh: HTML, CSS, JavaScript"
            />

            <label>Tools</label>
            <input
              type="text"
              value={form.tools}
              onChange={(e) =>
                setForm({
                  ...form,
                  tools: e.target.value,
                })
              }
              placeholder="Contoh: React, Git, VSCode"
            />

            <label>Tugas</label>
            <textarea
              value={form.tugas}
              onChange={(e) =>
                setForm({
                  ...form,
                  tugas: e.target.value,
                })
              }
              placeholder="Masukkan tugas pekerjaan"
            />

            <label>Prospek</label>
            <textarea
              value={form.prospek}
              onChange={(e) =>
                setForm({
                  ...form,
                  prospek: e.target.value,
                })
              }
              placeholder="Masukkan prospek karir"
            />

            <label>Image</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.value,
                })
              }
              placeholder="Contoh: /frontend.png"
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>
                Batal
              </button>

              <button className="save-btn" onClick={saveCareer}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-modal">
            <h2>Hapus Data Karir?</h2>

            <p>Data karir akan dihapus dari database.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteOpen(false)}>
                Batal
              </button>

              <button className="delete-confirm-btn" onClick={deleteCareer}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}