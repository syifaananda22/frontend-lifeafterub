import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/AdminUsersPage.css";

interface Company {
  id: number;
  name: string;
  industry: string | null;
  description: string | null;
  logo_path: string | null;
}

export default function AdminCompaniesPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    industry: "",
    description: "",
    logo_path: "",
  });

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/companies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompanies(response.data.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);

    setForm({
      name: "",
      industry: "",
      description: "",
      logo_path: "",
    });

    setModalOpen(true);
  };

  const openEditModal = (company: any) => {
    setEditId(company.id);

    setForm({
      name: company.name || "",
      industry: company.industry || "",
      description: company.description || "",
      logo_path: company.logo_path || "",
    });

    setModalOpen(true);
  };

  const saveCompany = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editId) {

        await axios.put(
          `http://127.0.0.1:8000/api/admin/companies/${editId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } else {

        await axios.post(
          "http://127.0.0.1:8000/api/admin/companies",
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      setModalOpen(false);

      getCompanies();

    } catch (error) {
      console.log(error);

      alert("Gagal menyimpan data perusahaan");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);

    setDeleteOpen(true);
  };

  const deleteCompany = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:8000/api/admin/companies/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeleteOpen(false);

      getCompanies();

    } catch (error) {
      console.log(error);

      alert("Gagal menghapus perusahaan");
    }
  };

  return (
    <div className="admin-users-page">

      <div className="admin-users-header">

        <div>

          <span className="admin-users-badge">
            ADMIN PANEL
          </span>

          <h1>Kelola Perusahaan Mitra UB</h1>

          <p>
            Lihat, tambah, ubah, dan hapus perusahaan mitra
            Universitas Brawijaya.
          </p>

        </div>

        <button
          className="add-user-btn"
          onClick={openCreateModal}
        >
          + Tambah Perusahaan
        </button>

      </div>

      <div className="admin-users-table-card">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Nama Perusahaan</th>
              <th>Industri</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>

            {companies.map((company) => (

              <tr key={company.id}>

                <td>{company.id}</td>

                <td>
                  <img
                    src={
                      company.logo_path
                        ? `http://127.0.0.1:8000/storage/${company.logo_path}`
                        : "/logo.png"
                    }
                    alt={company.name}
                    style={{
                      width: "42px",
                      height: "42px",
                      objectFit: "contain",
                      borderRadius: "10px",
                      background: "#fff",
                      padding: "4px",
                    }}
                  />
                </td>

                <td>{company.name}</td>

                <td>{company.industry || "-"}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(company)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => openDeleteModal(company.id)}
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
              {editId ? "Edit Perusahaan" : "Tambah Perusahaan"}
            </h2>

            <label>Nama Perusahaan</label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Masukkan nama perusahaan"
            />

            <label>Industri</label>

            <input
              type="text"
              value={form.industry}
              onChange={(e) =>
                setForm({
                  ...form,
                  industry: e.target.value,
                })
              }
              placeholder="Masukkan industri"
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
              placeholder="Masukkan deskripsi perusahaan"
            />

            <label>Logo Path</label>

            <input
              type="text"
              value={form.logo_path}
              onChange={(e) =>
                setForm({
                  ...form,
                  logo_path: e.target.value,
                })
              }
              placeholder="contoh: gojek.png"
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
                onClick={saveCompany}
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

            <h2>Hapus Perusahaan?</h2>

            <p>
              Data perusahaan akan dihapus dari database.
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
                onClick={deleteCompany}
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