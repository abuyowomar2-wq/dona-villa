import Link from "next/link";

const categories = [
  { label: "أظافر", gradient: "from-[var(--color-pink-light)] to-[var(--color-pink)]/40" },
  { label: "مساج", gradient: "from-[var(--color-pink-light)] to-[var(--color-gold)]/20" },
  { label: "مكياج", gradient: "from-[var(--color-pink)]/20 to-[var(--color-pink-light)]" },
  { label: "شعر", gradient: "from-[var(--color-cream-dark)] to-[var(--color-pink-light)]" },
  { label: "حمام مغربي", gradient: "from-[var(--color-gold)]/15 to-[var(--color-pink-light)]" },
  { label: "بشرة", gradient: "from-[var(--color-pink-light)] to-[var(--color-cream)]" },
];

export default function GalleryPreview() {
  return (
    <section className="section-padding bg-[var(--color-cream)]">
      <div className="container-custom">
        <div className="section-title">
          <h2>معرض الصور</h2>
          <p>لمحات من أجواء الصالون الراقية وخدماتنا المميزة</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className={`aspect-square rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center card-hover cursor-pointer relative overflow-hidden`}
            >
              <div className="absolute inset-0 pattern-dots opacity-30" />
              <span className="relative z-10 text-[var(--color-dark)] font-semibold bg-white/75 backdrop-blur-sm px-5 py-2 rounded-full text-sm shadow-sm">
                {cat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery" className="btn-primary btn-outline">
            مشاهدة المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}
