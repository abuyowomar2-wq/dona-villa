"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/settings");
    setSettings(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
    setSaving(false);
    setSuccess("تم حفظ الإعدادات بنجاح");
    setTimeout(() => setSuccess(""), 3000);
  };

  if (loading) return <LoadingSpinner />;
  if (!settings) return null;

  const update = (key: string, value: string) => setSettings({ ...settings, [key]: value });

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إعدادات الموقع</h2>
        <button onClick={handleSave} disabled={saving} className="btn-primary btn-gold text-sm disabled:opacity-50">
          {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
        </button>
      </div>

      {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm">{success}</div>}

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="font-bold text-lg border-b pb-3">معلومات الصالون</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">اسم الصالون (عربي)</label>
            <input value={settings.siteNameAr || ""} onChange={(e) => update("siteNameAr", e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">اسم الصالون (إنجليزي)</label>
            <input value={settings.siteNameEn || ""} onChange={(e) => update("siteNameEn", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" />
          </div>
        </div>

        <h3 className="font-bold text-lg border-b pb-3 pt-4">معلومات التواصل</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">رقم الجوال</label>
            <input value={settings.phone || ""} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" placeholder="9665XXXXXXXX" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">واتساب</label>
            <input value={settings.whatsapp || ""} onChange={(e) => update("whatsapp", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" placeholder="9665XXXXXXXX" />
          </div>
        </div>

        <h3 className="font-bold text-lg border-b pb-3 pt-4">روابط التواصل الاجتماعي</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">انستقرام</label>
            <input value={settings.instagram || ""} onChange={(e) => update("instagram", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">سناب شات</label>
            <input value={settings.snapchat || ""} onChange={(e) => update("snapchat", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" placeholder="https://snapchat.com/..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">تيك توك</label>
            <input value={settings.tiktok || ""} onChange={(e) => update("tiktok", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" placeholder="https://tiktok.com/..." />
          </div>
        </div>

        <h3 className="font-bold text-lg border-b pb-3 pt-4">المعلومات العامة</h3>
        <div>
          <label className="block text-sm font-medium mb-1">العنوان (عربي)</label>
          <input value={settings.addressAr || ""} onChange={(e) => update("addressAr", e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">مواعيد العمل</label>
          <input value={settings.workingHours || ""} onChange={(e) => update("workingHours", e.target.value)} className="w-full px-4 py-2 border rounded-xl" placeholder="يوميًا من 10 صباحًا حتى 10 مساءً" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">رابط خريطة قوقل</label>
          <input value={settings.googleMapsUrl || ""} onChange={(e) => update("googleMapsUrl", e.target.value)} className="w-full px-4 py-2 border rounded-xl text-left" />
        </div>

        <h3 className="font-bold text-lg border-b pb-3 pt-4">SEO</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Meta Title (عربي)</label>
          <input value={settings.metaTitleAr || ""} onChange={(e) => update("metaTitleAr", e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Meta Description (عربي)</label>
          <textarea rows={3} value={settings.metaDescAr || ""} onChange={(e) => update("metaDescAr", e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Keywords</label>
          <input value={settings.metaKeywords || ""} onChange={(e) => update("metaKeywords", e.target.value)} className="w-full px-4 py-2 border rounded-xl" />
        </div>
      </div>
    </div>
  );
}
