"use client";

import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface GalleryImage {
  id: string;
  title: string | null;
  category: string;
  imageUrl: string;
  sortOrder: number;
}

const CATEGORIES = ["صالون", "أظافر", "شعر", "بشرة", "مكياج", "مساج"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<"url" | "file">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", category: "صالون", imageUrl: "", sortOrder: "0" });

  const fetchData = async () => {
    const res = await fetch("/api/gallery");
    setImages(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", category: "صالون", imageUrl: "", sortOrder: "0" });
    setUploadMode("file");
    setShowModal(true);
  };

  const openEdit = (img: GalleryImage) => {
    setEditing(img);
    setForm({ title: img.title || "", category: img.category, imageUrl: img.imageUrl, sortOrder: img.sortOrder.toString() });
    setUploadMode("url");
    setShowModal(true);
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setForm({ ...form, imageUrl: data.url });
    } else {
      alert("فشل رفع الصورة");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSave = async () => {
    if (!form.imageUrl) return alert("الرجاء إدخال رابط الصورة أو رفع ملف");
    setSaving(true);
    const data = { ...form, sortOrder: parseInt(form.sortOrder) || 0 };
    if (editing) {
      await fetch("/api/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...data }) });
    } else {
      await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    }
    setShowModal(false); setSaving(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null); fetchData();
  };

  const filtered = filter ? images.filter((i) => i.category === filter) : images;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">معرض الصور ({images.length})</h2>
        <button onClick={openAdd} className="btn-primary btn-gold text-sm">+ إضافة صورة</button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setFilter("")} className={`px-4 py-2 rounded-full text-sm ${!filter ? "bg-[var(--color-gold)] text-white" : "bg-gray-100"}`}>الكل</button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm ${filter === c ? "bg-[var(--color-gold)] text-white" : "bg-gray-100"}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl shadow-sm overflow-hidden group">
            {img.imageUrl ? (
              <div className="aspect-square">
                <img src={img.imageUrl} alt={img.title || ""} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-[var(--color-pink-light)] to-[var(--color-cream-dark)] flex items-center justify-center">
                <span className="text-5xl">✨</span>
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-medium truncate">{img.title || "بدون عنوان"}</p>
              <p className="text-xs text-gray-400">{img.category} | الترتيب: {img.sortOrder}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEdit(img)} className="flex-1 px-2 py-1 bg-[var(--color-pink-light)] text-[var(--color-pink-dark)] rounded text-xs">تعديل</button>
                <button onClick={() => setDeleteConfirm(img.id)} className="flex-1 px-2 py-1 bg-red-50 text-red-600 rounded text-xs">حذف</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">لا توجد صور</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6">{editing ? "تعديل الصورة" : "إضافة صورة"}</h3>
            <div className="space-y-4">
              {/* Upload Mode Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setUploadMode("file")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${uploadMode === "file" ? "bg-white shadow text-[var(--color-dark)]" : "text-gray-500"}`}
                >
                  📁 رفع ملف
                </button>
                <button
                  onClick={() => setUploadMode("url")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${uploadMode === "url" ? "bg-white shadow text-[var(--color-dark)]" : "text-gray-500"}`}
                >
                  🔗 رابط
                </button>
              </div>

              {uploadMode === "file" ? (
                <div>
                  <label className="block text-sm font-medium mb-2">ارفعي الصورة</label>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                      form.imageUrl ? "border-green-300 bg-green-50" : uploading ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-[var(--color-gold)] bg-gray-50"
                    }`}
                  >
                    {uploading ? (
                      <div className="text-blue-500">
                        <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                        <span className="text-sm">جاري الرفع...</span>
                      </div>
                    ) : form.imageUrl ? (
                      <div>
                        <img src={form.imageUrl} alt="Preview" className="max-h-32 mx-auto rounded-lg mb-2" />
                        <span className="text-sm text-green-600">✅ تم الرفع - اضغطي للتغيير</span>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <span className="text-4xl block mb-2">📁</span>
                        <span className="text-sm">اسحبي الصورة هنا أو اضغطي للرفع</span>
                        <p className="text-xs mt-1">PNG, JPG, WEBP</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-1">رابط الصورة</label>
                  <input
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-xl text-left"
                    placeholder="https://..."
                  />
                  {form.imageUrl && (
                    <img src={form.imageUrl} alt="Preview" className="max-h-32 mt-2 rounded-lg" />
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">العنوان</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">التصنيف</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border rounded-xl">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الترتيب</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-xl text-sm">إلغاء</button>
              <button onClick={handleSave} disabled={saving || !form.imageUrl} className="btn-primary btn-gold text-sm disabled:opacity-50">
                {saving ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "إضافة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <span className="text-5xl block mb-4">⚠️</span>
            <h3 className="text-lg font-bold mb-2">تأكيد الحذف</h3>
            <p className="text-gray-500 mb-6">هل أنت متأكدة من حذف هذه الصورة؟</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-6 py-2 border rounded-xl text-sm">إلغاء</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-6 py-2 bg-red-500 text-white rounded-xl text-sm">حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
