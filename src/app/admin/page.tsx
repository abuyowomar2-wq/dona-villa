import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { ContactMessage } from "@/generated/prisma/client";

export default async function AdminDashboard() {
  const [servicesCount, categoriesCount, offersCount, imagesCount, messagesCount, recentMessages] = await Promise.all([
    prisma.service.count(),
    prisma.serviceCategory.count(),
    prisma.offer.count(),
    prisma.galleryImage.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }) as Promise<ContactMessage[]>,
  ]);

  const stats = [
    { label: "الخدمات", value: servicesCount, icon: "💅", href: "/admin/services", color: "from-pink-400 to-pink-300" },
    { label: "الأقسام", value: categoriesCount, icon: "📂", href: "/admin/categories", color: "from-purple-400 to-purple-300" },
    { label: "العروض", value: offersCount, icon: "🎁", href: "/admin/offers", color: "from-amber-400 to-amber-300" },
    { label: "صور المعرض", value: imagesCount, icon: "🖼️", href: "/admin/gallery", color: "from-blue-400 to-blue-300" },
    { label: "الرسائل", value: messagesCount, icon: "💬", href: "/admin/messages", color: "from-green-400 to-green-300" },
  ];

  const quickLinks = [
    { label: "إضافة خدمة جديدة", href: "/admin/services", icon: "➕" },
    { label: "إضافة قسم جديد", href: "/admin/categories", icon: "📁" },
    { label: "إضافة عرض جديد", href: "/admin/offers", icon: "🏷️" },
    { label: "رفع صور المعرض", href: "/admin/gallery", icon: "📸" },
    { label: "تعديل محتوى الرئيسية", href: "/admin/home-content", icon: "✏️" },
    { label: "إعدادات الموقع", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl p-5 shadow-sm card-hover">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-bold text-[var(--color-dark)]">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">اختصارات سريعة</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--color-pink-light)] transition-colors text-[var(--color-dark)]"
                >
                  <span>{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">آخر الرسائل</h3>
              <Link href="/admin/messages" className="text-sm text-[var(--color-pink)] hover:underline">
                عرض الكل
              </Link>
            </div>
            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <span className="text-4xl block mb-2">📭</span>
                <p>لا توجد رسائل حتى الآن</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-pink-light)] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{msg.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${msg.status === "new" ? "bg-green-100 text-green-700" : msg.status === "contacted" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                          {msg.status === "new" ? "جديدة" : msg.status === "contacted" ? "تم التواصل" : "مؤرشفة"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleDateString("ar-SA")}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
