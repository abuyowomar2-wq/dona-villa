import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-1 lg:order-1">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[var(--color-pink-light)] via-[var(--color-pink)] to-[var(--color-pink-dark)] flex items-center justify-center overflow-hidden shadow-lg">
              <div className="absolute inset-0 pattern-dots opacity-20" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-20 h-20 md:w-28 md:h-28 opacity-40 relative z-10"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[var(--color-gold)]/15 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--color-pink-light)]/50 hidden lg:block" />
          </div>

          <div className="order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-display)]">
              عن دونا فيلا
            </h2>
            <p className="text-lg leading-loose text-[var(--color-dark-light)] mb-8">
              دونا فيلا صالون نسائي يقدم خدمات العناية والجمال باحترافية عالية، من الأظافر والشعر والبشرة إلى المساج والحمام المغربي وخدمات المكياج. نؤمن أن كل امرأة تستحق أن تشعر بالجمال والثقة.
            </p>
            <Link href="/about" className="btn-primary btn-outline">
              اقرأي المزيد
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
