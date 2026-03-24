"use client";

import { useState } from "react";
import Image from "next/image";
import { Artwork, Category } from "@/lib/types";
import { createArtwork, updateArtwork, deleteArtwork } from "@/lib/actions/artworks";
import { addCategory, deleteCategory } from "@/lib/actions/categories";

interface Props {
  artworks: Artwork[];
  categories: Category[];
}

export default function GalleryManager({ artworks: initArtworks, categories: initCategories }: Props) {
  const [artworks, setArtworks] = useState(initArtworks);
  const [categories, setCategories] = useState(initCategories);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState("");
  const [catLoading, setCatLoading] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function openAdd() {
    setEditing(null);
    setImagePreview(null);
    setShowModal(true);
  }

  function openEdit(artwork: Artwork) {
    setEditing(artwork);
    setImagePreview(artwork.image_url);
    setShowModal(true);
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    if (editing) {
      const result = await updateArtwork(editing.id, formData);
      if (result?.error) showToast("Error: " + result.error);
      else { showToast("Karya berhasil diperbarui! ✨"); window.location.reload(); }
    } else {
      const result = await createArtwork(formData);
      if (result?.error) showToast("Error: " + result.error);
      else { showToast("Karya berhasil ditambahkan! 🎨"); window.location.reload(); }
    }
    setLoading(false);
    setShowModal(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus karya ini?")) return;
    await deleteArtwork(id);
    setArtworks(artworks.filter((a) => a.id !== id));
    showToast("Karya dihapus.");
  }

  async function handleAddCategory() {
    if (!newCatName.trim()) return;
    setCatLoading(true);
    const fd = new FormData();
    fd.append("name", newCatName.trim());
    const result = await addCategory(fd);
    setCatLoading(false);
    if (result?.error) { showToast("Error: " + result.error); return; }
    showToast(`Kategori "${newCatName.trim()}" ditambahkan! ✨`);
    setNewCatName("");
    window.location.reload();
  }

  async function handleDeleteCategory(id: string, name: string) {
    if (!confirm(`Hapus kategori "${name}"? Karya dengan kategori ini tidak ikut terhapus.`)) return;
    const result = await deleteCategory(id);
    if (result?.error) { showToast("Error: " + result.error); return; }
    setCategories(categories.filter((c) => c.id !== id));
    showToast(`Kategori "${name}" dihapus.`);
  }

  return (
    <>
      {/* Kategori Manager */}
      <div className="retro-window-static p-5 mb-6">
        <div className="window-header mb-4"><span>categories.json</span></div>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1 bg-[#c2eb96] border-2 border-[#1e5b85] rounded-full px-3 py-1">
              <span className="text-sm font-bold text-[#1e5b85]">{cat.name}</span>
              <button
                onClick={() => handleDeleteCategory(cat.id, cat.name)}
                className="text-[#1e5b85] hover:text-red-500 transition-colors ml-1 text-xs font-bold leading-none"
                title="Hapus kategori"
              >
                ✕
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-[#6dbcdb] font-bold">Belum ada kategori.</p>
          )}
        </div>
        <div className="flex gap-2 max-w-sm">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            placeholder="Nama kategori baru..."
            className="retro-input flex-1"
          />
          <button
            onClick={handleAddCategory}
            disabled={catLoading || !newCatName.trim()}
            className="retro-btn retro-btn-blue disabled:opacity-60 flex-shrink-0"
          >
            {catLoading ? <i className="fas fa-spinner fa-spin" /> : <><i className="fas fa-plus" /> Tambah</>}
          </button>
        </div>
      </div>

      {/* Artworks */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-[#1e5b85]">{artworks.length} karya</p>
        <button onClick={openAdd} className="retro-btn retro-btn-blue">
          <i className="fas fa-plus" /> Tambah Karya
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="retro-window-static">
            <div className="window-header">
              <span className="truncate max-w-[140px] text-xs">{artwork.title}</span>
              <span className="text-xs bg-[#c2eb96] px-2 py-0.5 rounded-full border border-[#1e5b85]">{artwork.category}</span>
            </div>
            <div className="relative h-40 bg-gray-100">
              <Image
                src={artwork.image_url || `https://placehold.co/400x300/e4f7c2/1e5b85?text=${encodeURIComponent(artwork.title)}`}
                alt={artwork.title}
                fill
                className="object-cover"
                unoptimized={!artwork.image_url || artwork.image_url.includes("placehold.co")}
              />
            </div>
            <div className="p-3 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm text-[#1e5b85] truncate max-w-[160px]">{artwork.title}</p>
                {artwork.date && <p className="text-xs text-gray-400">{new Date(artwork.date).toLocaleDateString("id-ID")}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(artwork)} className="retro-btn retro-btn-yellow border-[#1e5b85] text-xs px-2 py-1">
                  <i className="fas fa-edit" />
                </button>
                <button onClick={() => handleDelete(artwork.id)} className="retro-btn retro-btn-red text-xs px-2 py-1">
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="retro-window-static p-12 text-center">
          <div className="text-5xl mb-3">🎨</div>
          <p className="font-bold text-[#6dbcdb]">Belum ada karya. Tambah karya pertama kamu!</p>
        </div>
      )}

      {/* Modal Tambah/Edit Artwork */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="retro-window-static w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="window-header">
              <span>{editing ? "Edit Karya" : "Tambah Karya Baru"}</span>
              <button onClick={() => setShowModal(false)} className="text-red-500 font-bold text-lg">✕</button>
            </div>
            <form action={handleSubmit} className="p-5 flex flex-col gap-3">
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Judul *</label>
                <input type="text" name="title" defaultValue={editing?.title ?? ""} className="retro-input" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Kategori *</label>
                <select name="category" defaultValue={editing?.category ?? categories[0]?.name ?? ""} className="retro-input" required>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-red-400 mt-1">Tambah kategori dulu sebelum menambah karya.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Deskripsi</label>
                <textarea name="description" defaultValue={editing?.description ?? ""} rows={3} className="retro-input resize-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Tanggal</label>
                <input type="date" name="date" defaultValue={editing?.date ?? ""} className="retro-input" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">
                  Foto {editing ? "(kosongkan untuk tidak mengubah)" : ""}
                </label>
                {imagePreview && (
                  <div className="relative h-32 mb-2 border-2 border-[#6dbcdb] rounded overflow-hidden">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  </div>
                )}
                <input type="file" name="image" accept="image/*" className="retro-input"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setImagePreview(URL.createObjectURL(f));
                  }} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading || categories.length === 0}
                  className="retro-btn retro-btn-blue flex-1 justify-center disabled:opacity-60">
                  {loading ? <><i className="fas fa-spinner fa-spin" /> Menyimpan...</> : <><i className="fas fa-save" /> Simpan</>}
                </button>
                <button type="button" onClick={() => setShowModal(false)}
                  className="retro-btn border-[#6dbcdb] text-[#6dbcdb] justify-center">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
