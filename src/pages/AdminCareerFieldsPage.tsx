import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminCareerFieldsPage() {
  const navigate = useNavigate();

  const [fields, setFields] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama_bidang: "",
  });

  useEffect(() => {
    getFields();
  }, []);

  const getFields = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/career-fields"
      );

      setFields(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);

    setForm({
      nama_bidang: "",
    });

    setModalOpen(true);
  };

  const openEditModal = (field: any) => {
    setEditId(field.id);

    setForm({
      nama_bidang: field.nama_bidang || "",
    });

    setModalOpen(true);
  };

  const saveField = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/admin/career-fields/${editId}`,
          form
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/admin/career-fields",
          form
        );
      }

      setModalOpen(false);

      getFields();

    } catch (error) {
      console.log(error);

      alert("Gagal menyimpan career field");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);

    setDeleteOpen(true);
  };

  const deleteField = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/admin/career-fields/${deleteId}`
      );

      setDeleteOpen(false);

      getFields();

    } catch (error) {
      console.log(error);

      alert("Gagal menghapus career field");
    }
  };

  return (
    <div className="admin-users-page">

      <div className="admin-users-header">

        <div>

          <span className="admin-users-badge">
            ADMIN PANEL
          </span>

          <h1>Kelola Career Field</h1>

          <p>
            Lihat, tambah, ubah, dan hapus kategori bidang karir pada sistem
            Life After UB.
          </p>

        </div>

        <button
          className="add-user-btn"
          onClick={openCreateModal}
        >
          + Tambah Field
        </button>

      </div>

      <div className="admin-users-table-card">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Field</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>

            {fields.map((field: any) => (

              <tr key={field.id}>

                <td>{field.id}</td>

                <td>{field.nama_bidang}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(field)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(field.id)}
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

            <h2>
              {editId
                ? "Edit Career Field"
                : "Tambah Career Field"}
            </h2>

            <label>Nama Field</label>

            <input
              type="text"
              value={form.nama_bidang}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama_bidang: e.target.value,
                })
              }
              placeholder="Contoh: Teknologi & Software"
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </button>

              <button
                className="save-btn"
                onClick={saveField}
              >
                Simpan
              </button>

            </div>

          </div>

        </div>

      )}

      {deleteOpen && (

        <div className="admin-modal-overlay">

          <div className="admin-modal delete-modal">

            <h2>Hapus Career Field?</h2>

            <p>
              Data career field akan dihapus dari database.
            </p>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setDeleteOpen(false)}
              >
                Batal
              </button>

              <button
                className="delete-confirm-btn"
                onClick={deleteField}
              >
                Hapus
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}