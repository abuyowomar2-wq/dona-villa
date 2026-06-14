"use client";

import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminHomeContentPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setContent({ ...content, heroImage: data.url });
    }
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

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-medium mb-1">صورة الخلفية</label>
          {content.heroImage && (
            <div className="relative mb-3 rounded-xl overflow-hidden">
              <img src={content.heroImage} alt="Hero" className="w-full h-40 object-cover" />
              <button
                onClick={() => setContent({ ...content, heroImage: "" })}
                className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 rounded-full text-sm"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex gap-3">
            <input value={content.heroImage || ""} onChange={(e) => setContent({ ...content, heroImage: e.target.value })} className="flex-1 px-4 py-2 border rounded-xl text-left" placeholder="رابط الصورة" />
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`px-4 py-2 rounded-xl border-2 border-dashed cursor-pointer text-sm flex items-center gap-2 flex-shrink-0 transition ${
                uploading ? "border-blue-300 bg-blue-50 text-blue-600" : "border-gray-300 hover:border-[var(--color-gold)] text-gray-500"
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-500 rounded-full animate-spin" />
                  جاري الرفع...
                </>
              ) : (
                <>📁 رفع</>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} className="hidden" />
            </div>
          </div>
        </div>

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
