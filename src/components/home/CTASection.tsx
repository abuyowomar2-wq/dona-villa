export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-[var(--color-pink)] to-[var(--color-gold)]">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-[family-name:var(--font-display)]">
          احجزي موعدك الآن
        </h2>
        <p className="text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto leading-relaxed">
          استمتعي بتجربة فريدة من نوعها مع دونا فيلا
        </p>
        <a
          href="https://wa.me/966XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary border-2 border-white text-white hover:bg-white hover:text-[var(--color-pink)] text-lg px-10 py-3.5 transition-all duration-300"
        >
          تواصلي معنا عبر واتساب
        </a>
      </div>
    </section>
  );
}
