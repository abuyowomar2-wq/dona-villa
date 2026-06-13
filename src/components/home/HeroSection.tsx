"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--color-dark)] via-[var(--color-dark)]/90 to-[var(--color-cream)]">
      <div className="absolute inset-0 pattern-dots opacity-15" />

      <div className="absolute top-20 left-20 w-64 h-64 bg-[var(--color-pink)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[var(--color-gold)]/10 rounded-full blur-3xl" />

      <div className="relative z-10 container-custom text-center px-4">
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                className="text-[var(--color-gold)]"
              >
                <polygon
                  points="25,2 48,25 25,48 2,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <polygon
                  points="25,10 40,25 25,40 10,25"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--color-gold)] rounded-full animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-[family-name:var(--font-display)] leading-tight">
            جمالك يبدأ من دونا فيلا
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            تجربة عناية متكاملة تجمع بين الفخامة، الراحة، والاحترافية.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://wa.me/966XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-gold text-lg px-8 py-3.5"
            >
              احجزي موعدك الآن
            </a>
            <a
              href="#services"
              className="btn-primary btn-outline text-lg px-8 py-3.5 border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white"
            >
              استعرضي الخدمات
            </a>
          </div>

          <div className="flex justify-center">
            <div className="w-px h-14 bg-gradient-to-b from-[var(--color-gold)]/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
