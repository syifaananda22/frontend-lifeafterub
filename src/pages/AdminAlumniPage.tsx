import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminUsersPage.css";

export default function AdminAlumniPage() {
  const navigate = useNavigate();

  const [alumni, setAlumni] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama: "",
    posisi: "",
    perusahaan: "",
    bidang: "",
    fakultas: "",
    prodi: "",
    tahun_lulus: "",
    foto: "",
    deskripsi: "",
    sumber_loker: "",
    persiapan: "",
  });

  useEffect(() => {
    getAlumni();
  }, []);

  const getAlumni = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/alumni");
      setAlumni(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      nama: "",
      posisi: "",
      perusahaan: "",
      bidang: "",
      fakultas: "",
      prodi: "",
      tahun_lulus: "",
      foto: "",
      deskripsi: "",
      sumber_loker: "",
      persiapan: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditId(item.id);
    setForm({
      nama: item.nama || "",
      posisi: item.posisi || "",
      perusahaan: item.perusahaan || "",
      bidang: item.bidang || "",
      fakultas: item.fakultas || "",
      prodi: item.prodi || "",
      tahun_lulus: item.tahun_lulus || "",
      foto: item.foto || "",
      deskripsi: item.deskripsi || "",
      sumber_loker: item.sumber_loker || "",
      persiapan: item.persiapan || "",
    });
    setModalOpen(true);
  };

  const saveAlumni = async () => {
    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/api/admin/alumni/${editId}`, form);
      } else {
        await axios.post("http://127.0.0.1:8000/api/admin/alumni", form);
      }

      setModalOpen(false);
      getAlumni();
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan data alumni");
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteAlumni = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/alumni/${deleteId}`);
      setDeleteOpen(false);
      getAlumni();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus data alumni");
    }
  };

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <span className="admin-users-badge">ADMIN PANEL</span>
          <h1>Kelola Data Alumni Karir</h1>
          <p>
            Lihat, tambah, ubah, dan hapus data alumni karir pada sistem Life After UB.
          </p>
        </div>

        <button className="add-user-btn" onClick={openCreateModal}>
          + Tambah Alumni
        </button>
      </div>

      <div className="admin-users-table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>Posisi</th>
              <th>Perusahaan</th>
              <th>Fakultas</th>
              <th>Prodi</th>
              <th>Tahun Lulus</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {alumni.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.posisi}</td>
                <td>{item.perusahaan}</td>
                <td>{item.fakultas}</td>
                <td>{item.prodi}</td>
                <td>{item.tahun_lulus}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => openEditModal(item)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => openDeleteModal(item.id)}>
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
            <h2>{editId ? "Edit Data Alumni" : "Tambah Data Alumni"}</h2>

            <label>Nama Alumni</label>
            <input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Contoh: Alya Putri Ramadhani"
            />

            <label>Posisi</label>
            <input
              value={form.posisi}
              onChange={(e) => setForm({ ...form, posisi: e.target.value })}
              placeholder="Contoh: Frontend Developer"
            />

            <label>Perusahaan</label>
            <input
              value={form.perusahaan}
              onChange={(e) => setForm({ ...form, perusahaan: e.target.value })}
              placeholder="Contoh: cmlabs"
            />

            <label>Bidang</label>
            <input
              value={form.bidang}
              onChange={(e) => setForm({ ...form, bidang: e.target.value })}
              placeholder="Contoh: Technology"
            />

            <label>Fakultas</label>
            <select
              value={form.fakultas}
              onChange={(e) => setForm({ ...form, fakultas: e.target.value, prodi: "" })}
            >
              <option value="">Pilih Fakultas</option>
              <option value="Fakultas Vokasi">Fakultas Vokasi</option>
              <option value="Fakultas Ilmu Komputer">Fakultas Ilmu Komputer</option>
            </select>

            <label>Program Studi</label>
            <input
              value={form.prodi}
              onChange={(e) => setForm({ ...form, prodi: e.target.value })}
              placeholder="Contoh: D3 Teknologi Informasi"
            />

            <label>Tahun Lulus</label>
            <input
              value={form.tahun_lulus}
              onChange={(e) => setForm({ ...form, tahun_lulus: e.target.value })}
              placeholder="Contoh: 2024"
            />

            <label>Foto</label>
            <input
              value={form.foto}
              onChange={(e) => setForm({ ...form, foto: e.target.value })}
              placeholder="Contoh: /1_alya_putri_ramadhani.png"
            />

            <label>Deskripsi</label>
            <textarea
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              placeholder="Masukkan deskripsi singkat alumni"
            />

            <label>Sumber Loker</label>
            <input
              value={form.sumber_loker}
              onChange={(e) => setForm({ ...form, sumber_loker: e.target.value })}
              placeholder="Contoh: LinkedIn, Glints, Kampus Merdeka"
            />

            <label>Persiapan</label>
            <textarea
              value={form.persiapan}
              onChange={(e) => setForm({ ...form, persiapan: e.target.value })}
              placeholder="Contoh: Membuat portofolio, latihan interview, belajar tools"
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>
                Batal
              </button>

              <button className="save-btn" onClick={saveAlumni}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-modal">
            <h2>Hapus Data Alumni?</h2>
            <p>Data alumni karir akan dihapus dari database.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteOpen(false)}>
                Batal
              </button>

              <button className="delete-confirm-btn" onClick={deleteAlumni}>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}