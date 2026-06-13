"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "لوحة التحكم", href: "/admin", icon: "📊" },
  { label: "إدارة الخدمات", href: "/admin/services", icon: "💅" },
  { label: "إدارة الأقسام", href: "/admin/categories", icon: "📂" },
  { label: "إدارة العروض", href: "/admin/offers", icon: "🎁" },
  { label: "معرض الصور", href: "/admin/gallery", icon: "🖼️" },
  { label: "محتوى الرئيسية", href: "/admin/home-content", icon: "🏠" },
  { label: "إعدادات الموقع", href: "/admin/settings", icon: "⚙️" },
  { label: "رسائل التواصل", href: "/admin/messages", icon: "💬" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Don't render sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:translate-x-0 lg:relative ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-[var(--color-dark)]">دونا فيلا</h2>
          <p className="text-sm text-gray-500">لوحة التحكم</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                  ? "bg-[var(--color-pink-light)] text-[var(--color-pink-dark)] font-bold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center justify-between">
            <Link href="/" target="_blank" className="text-sm text-[var(--color-pink)] hover:underline">
              عرض الموقع ↗
            </Link>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-medium">
              تسجيل خروج
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-[var(--color-dark)]">
            {navItems.find((item) => item.href === pathname || (item.href !== "/admin" && pathname.startsWith(item.href)))?.label || "لوحة التحكم"}
          </h1>
          <div className="w-10"></div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
