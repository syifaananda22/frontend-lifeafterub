import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminCompanyJobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    company_id: "",
    title: "",
    description: "",
    location: "",
    employment_type: "",
  });

  useEffect(() => {
    getCompanyJobs();
  }, []);

  const getCompanyJobs = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/company-jobs"
      );

      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      company_id: "",
      title: "",
      description: "",
      location: "",
      employment_type: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditId(item.id);
    setForm({
      company_id: item.company_id || "",
      title: item.title || "",
      description: item.description || "",
      location: item.location || "",
      employment_type: item.employment_type || "",
    });
    setModalOpen(true);
  };

  const saveCompanyJob = async () => {
    try {
      const payload = {
        ...form,
        company_id: Number(form.company_id),
      };

      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/admin/company-jobs/${editId}`,
          payload
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/admin/company-jobs",
          payload
        );
      }

      setModalOpen(false);
      getCompanyJobs();
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan data lowongan perusahaan");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteCompanyJob = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/company-jobs/${deleteId}`
      );

      setDeleteOpen(false);
      getCompanyJobs();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus data lowongan perusahaan");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>
          <h1>Kelola Lowongan Pekerjaan</h1>
          <p>
            Lihat, tambah, ubah, dan hapus data lowongan pekerjaan dari
            perusahaan pada sistem Life After UB.
          </p>
        </div>

        <button className="add-user-btn" onClick={openCreateModal}>
          + Tambah Pekerjaan
        </button>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Company ID</th>
              <th>Judul</th>
              <th>Lokasi</th>
              <th>Tipe Kerja</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length > 0 ? (
              jobs.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.company_id}</td>
                  <td>{item.title}</td>
                  <td>{item.location}</td>
                  <td>{item.employment_type}</td>
                  <td>
                    {item.description?.length > 70
                      ? item.description.substring(0, 70) + "..."
                      : item.description}
                  </td>
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
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Belum ada data company jobs.
                </td>
              </tr>
            )}
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
            <h2>{editId ? "Edit Company Job" : "Tambah Company Job"}</h2>

            <label>Company ID</label>
            <input
              type="number"
              value={form.company_id}
              onChange={(e) =>
                setForm({ ...form, company_id: e.target.value })
              }
              placeholder="Contoh: 1"
            />

            <label>Judul Lowongan</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Contoh: Frontend Developer Intern"
            />

            <label>Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Contoh: Kualifikasi: S1 Informatika atau sejenis. Menguasai React..."
            />

            <label>Lokasi</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Contoh: Jakarta, Indonesia"
            />

            <label>Tipe Pekerjaan</label>
            <select
              value={form.employment_type}
              onChange={(e) =>
                setForm({ ...form, employment_type: e.target.value })
              }
            >
              <option value="">Pilih Tipe Pekerjaan</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </button>

              <button className="save-btn" onClick={saveCompanyJob}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-modal">
            <h2>Hapus Company Job?</h2>
            <p>Data lowongan perusahaan akan dihapus dari database.</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteOpen(false)}
              >
                Batal
              </button>

              <button className="delete-confirm-btn" onClick={deleteCompanyJob}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}