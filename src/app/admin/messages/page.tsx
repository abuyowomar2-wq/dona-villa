"use client";

import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Message {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchData = async () => {
    const res = await fetch("/api/contact");
    setMessages(await res.json());
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    fetchData();
  };

  const filtered = filter === "all" ? messages : messages.filter((m) => m.status === filter);
  const newCount = messages.filter((m) => m.status === "new").length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">رسائل التواصل ({messages.length})</h2>
        {newCount > 0 && <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">{newCount} جديدة</span>}
      </div>

      <div className="flex gap-3">
        {[
          { value: "all", label: "الكل" },
          { value: "new", label: "جديدة" },
          { value: "contacted", label: "تم التواصل" },
          { value: "archived", label: "مؤرشفة" },
        ].map((f) => (
          <button key={f.value} onClick={() => setFilter(f.value)} className={`px-4 py-2 rounded-full text-sm ${filter === f.value ? "bg-[var(--color-gold)] text-white" : "bg-gray-100"}`}>{f.label}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((msg) => (
          <div key={msg.id} className={`bg-white rounded-2xl p-5 shadow-sm ${msg.status === "new" ? "border-r-4 border-r-[var(--color-gold)]" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold">{msg.name}</h3>
                <p className="text-sm text-gray-500" dir="ltr" style={{ textAlign: "right" }}>{msg.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={msg.status}
                  onChange={(e) => updateStatus(msg.id, e.target.value)}
                  className={`text-xs px-3 py-1 rounded-full border-none ${msg.status === "new" ? "bg-green-100 text-green-700" : msg.status === "contacted" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
                >
                  <option value="new">جديدة</option>
                  <option value="contacted">تم التواصل</option>
                  <option value="archived">مؤرشفة</option>
                </select>
                <button onClick={() => setDeleteConfirm(msg.id)} className="text-red-400 hover:text-red-600 text-sm">🗑️</button>
              </div>
            </div>
            {msg.service && <p className="text-sm text-[var(--color-pink)] mb-2">الخدمة: {msg.service}</p>}
            <p className="text-[var(--color-dark-light)] leading-relaxed">{msg.message}</p>
            <p className="text-xs text-gray-400 mt-3">{new Date(msg.createdAt).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">لا توجد رسائل</div>}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <span className="text-5xl block mb-4">⚠️</span>
            <h3 className="text-lg font-bold mb-2">تأكيد الحذف</h3>
            <p className="text-gray-500 mb-6">هل أنت متأكدة من حذف هذه الرسالة؟</p>
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
