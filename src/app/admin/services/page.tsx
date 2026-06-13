"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Category { id: string; nameAr: string; nameEn: string; }
interface Service { id: string; nameAr: string; nameEn: string; price: number | null; priceStartsAt: boolean; description: string | null; categoryId: string; category?: Category; sortOrder: number; isActive: boolean; }

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nameAr: "", nameEn: "", price: "", priceStartsAt: false, description: "", categoryId: "", sortOrder: "0", isActive: true,
  });

  const fetchData = async () => {
    const [sRes, cRes] = await Promise.all([fetch("/api/services"), fetch("/api/categories")]);
    const [servicesData, categoriesData] = await Promise.all([sRes.json(), cRes.json()]);
    setServices(servicesData);
    setCategories(categoriesData);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ nameAr: "", nameEn: "", price: "", priceStartsAt: false, description: "", categoryId: categories[0]?.id || "", sortOrder: "0", isActive: true });
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ nameAr: s.nameAr, nameEn: s.nameEn, price: s.price?.toString() || "", priceStartsAt: s.priceStartsAt, description: s.description || "", categoryId: s.categoryId, sortOrder: s.sortOrder.toString(), isActive: s.isActive });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      price: form.price ? parseFloat(form.price) : null,
      sortOrder: parseInt(form.sortOrder) || 0,
    };

    if (editing) {
      await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...data }) });
    } else {
      await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    }

    setShowModal(false);
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/services?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    fetchData();
  };

  const handleToggleActive = async (s: Service) => {
    await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: s.id, isActive: !s.isActive }) });
    fetchData();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة الخدمات ({services.length})</h2>
        <button onClick={openAdd} className="btn-primary btn-gold text-sm">+ إضافة خدمة</button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select className="px-4 py-2 border rounded-xl text-sm" onChange={(e) => {
          if (e.target.value) window.location.search = `?category=${e.target.value}`;
          else window.location.search = "";
        }}>
          <option value="">كل الأقسام</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.nameAr}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-right p-4 text-sm font-bold">الخدمة</th>
                <th className="text-right p-4 text-sm font-bold">القسم</th>
                <th className="text-right p-4 text-sm font-bold">السعر</th>
                <th className="text-right p-4 text-sm font-bold">الترتيب</th>
                <th className="text-right p-4 text-sm font-bold">الحالة</th>
                <th className="text-right p-4 text-sm font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium">{s.nameAr}</p>
                    <p className="text-xs text-gray-400">{s.nameEn}</p>
                  </td>
                  <td className="p-4 text-sm">{s.category?.nameAr || "—"}</td>
                  <td className="p-4 text-sm">
                    {s.priceStartsAt ? `من ${s.price} ريال` : s.price ? `${s.price} ريال` : "—"}
                  </td>
                  <td className="p-4 text-sm">{s.sortOrder}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(s)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {s.isActive ? "مفعلة" : "معطلة"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-pink-dark)] rounded-lg text-xs hover:bg-[var(--color-pink)]/20">تعديل</button>
                      <button onClick={() => setDeleteConfirm(s.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs hover:bg-red-100">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-gray-400">لا توجد خدمات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6">{editing ? "تعديل الخدمة" : "إضافة خدمة جديدة"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">اسم الخدمة (عربي)</label>
                <input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">اسم الخدمة (إنجليزي)</label>
                <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">القسم</label>
                <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full px-4 py-2 border rounded-xl">
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.nameAr}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">السعر (ريال)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الترتيب</label>
                  <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.priceStartsAt} onChange={(e) => setForm({ ...form, priceStartsAt: e.target.checked })} />
                  <span className="text-sm">السعر يبدأ من</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                  <span className="text-sm">مفعلة</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">وصف الخدمة</label>
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
            <p className="text-gray-500 mb-6">هل أنت متأكدة من حذف هذه الخدمة؟</p>
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
