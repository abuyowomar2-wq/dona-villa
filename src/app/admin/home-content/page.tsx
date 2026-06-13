"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminHomeContentPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/home-content");
    setContent(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/home-content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    setSaving(false);
    setSuccess("تم الحفظ بنجاح");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (loading) return <LoadingSpinner />;
  if (!content) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">محتوى الصفحة الرئيسية</h2>
        <button onClick={handleSave} disabled={saving} className="btn-primary btn-gold text-sm disabled:opacity-50">
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>

      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm">{success}</div>}

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-lg border-b pb-3">قسم الهيرو</h3>
        <div>
          <label className="block text-sm font-medium mb-1">العنوان (عربي)</label>
          <input value={content.heroTitleAr || ""} onChange={(e) => setContent({ ...content, heroTitleAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">العنوان (إنجليزي)</label>
          <input value={content.heroTitleEn || ""} onChange={(e) => setContent({ ...content, heroTitleEn: e.target.value })} className="w-full px-4 py-2 border rounded-xl text-left" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">النص الفرعي (عربي)</label>
          <textarea rows={3} value={content.heroSubtitleAr || ""} onChange={(e) => setContent({ ...content, heroSubtitleAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">رابط صورة الهيرو</label>
          <input value={content.heroImage || ""} onChange={(e) => setContent({ ...content, heroImage: e.target.value })} className="w-full px-4 py-2 border rounded-xl text-left" />
        </div>

        <h3 className="font-bold text-lg border-b pb-3 pt-4">نبذة عن الصالون</h3>
        <div>
          <label className="block text-sm font-medium mb-1">نص من نحن (عربي)</label>
          <textarea rows={4} value={content.aboutTextAr || ""} onChange={(e) => setContent({ ...content, aboutTextAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
        </div>

        <h3 className="font-bold text-lg border-b pb-3 pt-4">قسم الحجز</h3>
        <div>
          <label className="block text-sm font-medium mb-1">نص CTA (عربي)</label>
          <input value={content.ctaTextAr || ""} onChange={(e) => setContent({ ...content, ctaTextAr: e.target.value })} className="w-full px-4 py-2 border rounded-xl" />
        </div>
      </div>
    </div>
  );
}
