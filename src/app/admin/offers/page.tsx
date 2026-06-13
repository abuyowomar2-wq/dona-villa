"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Offer {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  priceBefore: number | null;
  priceAfter: number;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "",
    priceBefore: "", priceAfter: "", startDate: "", endDate: "", isActive: true,
  });

  const fetchData = async () => {
    const res = await fetch("/api/offers");
    setOffers(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "", priceBefore: "", priceAfter: "", startDate: "", endDate: "", isActive: true });
    setShowModal(true);
  };

  const openEdit = (o: Offer) => {
    setEditing(o);
    setForm({
      titleAr: o.titleAr, titleEn: o.titleEn, descriptionAr: o.descriptionAr || "", descriptionEn: o.descriptionEn || "",
      priceBefore: o.priceBefore?.toString() || "", priceAfter: o.priceAfter.toString(), startDate: o.startDate?.split("T")[0] || "", endDate: o.endDate?.split("T")[0] || "", isActive: o.isActive,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      priceBefore: form.priceBefore ? parseFloat(form.priceBefore) : null,
      priceAfter: parseFloat(form.priceAfter) || 0,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
    };
    if (editing) {
      await fetch("/api/offers", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...data }) });
    } else {
      await fetch("/api/offers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    }
    setShowModal(false); setSaving(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/offers?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null); fetchData();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة العروض ({offers.length})</h2>
        <button onClick={openAdd} className="btn-primary btn-gold text-sm">+ إضافة عرض</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((o) => (
          <div key={o.id} className={`bg-white rounded-2xl shadow-sm overflow-hidden ${!o.isActive ? "opacity-60" : ""}`}>
            <div className="bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-pink)] h-2"></div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg">{o.titleAr}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {o.isActive ? "مفعل" : "معطل"}
                </span>
              </div>
              {o.descriptionAr && <p className="text-sm text-gray-500 mb-3">{o.descriptionAr}</p>}
              <div className="flex items-center gap-3 mb-3">
                {o.priceBefore && <span className="text-gray-400 line-through text-sm">{o.priceBefore} ريال</span>}
                <span className="text-[var(--color-gold)] font-bold text-xl">{o.priceAfter} ريال</span>
              </div>
              {(o.startDate || o.endDate) && (
                <p className="text-xs text-gray-400">
                  {o.startDate && `من ${new Date(o.startDate).toLocaleDateString("ar-SA")}`}
                  {o.endDate && ` حتى ${new Date(o.endDate).toLocaleDateString("ar-SA")}`}
                </p>
              )}
              <div className="flex gap-2 mt-4 pt-3 border-t">
                <button onClick={() => openEdit(o)} className="flex-1 px-3 py-2 bg-[var(--color-pink-light)] text-[var(--color-pink-dark)] rounded-lg text-xs">تعديل</button>
                <button onClick={() => setDeleteConfirm(o.id)} className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs">حذف</button>
              </div>
            </div>
          </div>
        ))}
        {offers.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">لا توجد عروض</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-6">{editing ? "تعديل العرض" : "إضافة عرض جديد"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">عنوان العرض (عربي)</label>
                <input value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">عنوان العرض (إنجليزي)</label>
                <input value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">السعر قبل</label>
                  <input type="number" value={form.priceBefore} onChange={(e) => setForm({ ...form, priceBefore: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">السعر بعد</label>
                  <input type="number" value={form.priceAfter} onChange={(e) => setForm({ ...form, priceAfter: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">تاريخ البداية</label>
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">تاريخ النهاية</label>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                <span className="text-sm">مفعل</span>
              </label>
              <div>
                <label className="block text-sm font-medium mb-1">وصف العرض (عربي)</label>
                <textarea rows={3} value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 border rounded-xl text-sm">إلغاء</button>
              <button onClick={handleSave} disabled={saving || !form.titleAr} className="btn-primary btn-gold text-sm disabled:opacity-50">
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
            <p className="text-gray-500 mb-6">هل أنت متأكدة من حذف هذا العرض؟</p>
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
