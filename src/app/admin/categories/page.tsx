"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string | null;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  _count?: { services: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ nameAr: "", nameEn: "", description: "", slug: "", sortOrder: "0", isActive: true });

  const fetchData = async () => {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const generateSlug = (text: string) => text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  const openAdd = () => {
    setEditing(null);
    setForm({ nameAr: "", nameEn: "", description: "", slug: "", sortOrder: "0", isActive: true });
    setShowModal(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({ nameAr: c.nameAr, nameEn: c.nameEn, description: c.description || "", slug: c.slug, sortOrder: c.sortOrder.toString(), isActive: c.isActive });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.nameAr) return;
    setSaving(true);
    const data = { ...form, sortOrder: parseInt(form.sortOrder) || 0, slug: form.slug || generateSlug(form.nameEn || form.nameAr) };

    if (editing) {
      await fetch("/api/categories", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...data }) });
    } else {
      await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    }

    setShowModal(false);
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    fetchData();
  };

  const handleToggleActive = async (c: Category) => {
    await fetch("/api/categories", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, isActive: !c.isActive }) });
    fetchData();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة أقسام الخدمات ({categories.length})</h2>
        <button onClick={openAdd} className="btn-primary btn-gold text-sm">+ إضافة قسم</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className={`bg-white rounded-2xl p-5 shadow-sm ${!c.isActive ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg">{c.nameAr}</h3>
                <p className="text-xs text-gray-400">{c.nameEn}</p>
              </div>
              <button
                onClick={() => handleToggleActive(c)}
                className={`px-2 py-1 rounded-full text-xs font-medium ${c.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {c.isActive ? "مفعل" : "معطل"}
              </button>
            </div>
            {c.description && <p className="text-sm text-gray-500 mb-3">{c.description}</p>}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{c._count?.services || 0} خدمات</span>
              <span>الترتيب: {c.sortOrder}</span>
            </div>
            <div className="flex gap-2 mt-4 pt-3 border-t">
              <button onClick={() => openEdit(c)} className="flex-1 px-3 py-2 bg-[var(--color-pink-light)] text-[var(--color-pink-dark)] rounded-lg text-xs">تعديل</button>
              <button onClick={() => setDeleteConfirm(c.id)} className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs">حذف</button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && <div className="text-center py-12 text-gray-400">لا توجد أقسام</div>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6">{editing ? "تعديل القسم" : "إضافة قسم جديد"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">اسم القسم (عربي)</label>
                <input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">اسم القسم (إنجليزي)</label>
                <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2 border rounded-xl text-left" placeholder="auto-generated" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الترتيب</label>
                <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                <span className="text-sm">مفعل</span>
              </label>
              <div>
                <label className="block text-sm font-medium mb-1">الوصف</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-xl text-sm">إلغاء</button>
              <button onClick={handleSave} disabled={saving || !form.nameAr} className="btn-primary btn-gold text-sm disabled:opacity-50">
                {saving ? "جاري الحفظ..." : editing ? "حفظ التعديلات" : "إضافة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <span className="text-5xl block mb-4">⚠️</span>
            <h3 className="text-lg font-bold mb-2">تأكيد الحذف</h3>
            <p className="text-gray-500 mb-6">سيتم حذف القسم وجميع الخدمات المرتبطة به.</p>
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
