"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الصالون" },
  { href: "/services", label: "خدماتنا" },
  { href: "/gallery", label: "المعرض" },
  { href: "/contact", label: "اتصل بنا" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container-custom flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--color-dark)] font-[family-name:var(--font-display)]"
        >
          دونا فيلا
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-dark-light)] hover:text-[var(--color-pink)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="btn-primary btn-gold text-sm px-5 py-2"
          >
            احجزي موعداً
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-[var(--color-dark)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <nav className="container-custom flex flex-col gap-3 py-4 border-t border-[var(--color-pink-light)]/50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-dark-light)] hover:text-[var(--color-pink)] transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="btn-primary btn-gold text-sm px-5 py-2 w-fit"
            onClick={() => setMobileOpen(false)}
          >
            احجزي موعداً
          </Link>
        </nav>
      </div>
    </header>
  );
}
