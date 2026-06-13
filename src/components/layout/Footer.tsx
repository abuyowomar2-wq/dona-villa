import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-display)]">
              دونا فيلا
            </h3>
            <p className="text-white/60 leading-relaxed text-sm">
              صالون نسائي فاخر يقدم خدمات العناية والجمال باحترافية عالية في أجواء راقية ومريحة.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-white/60 hover:text-[var(--color-gold)] transition-colors text-sm">عن الصالون</Link>
              <Link href="/services" className="text-white/60 hover:text-[var(--color-gold)] transition-colors text-sm">خدماتنا</Link>
              <Link href="/gallery" className="text-white/60 hover:text-[var(--color-gold)] transition-colors text-sm">المعرض</Link>
              <Link href="/contact" className="text-white/60 hover:text-[var(--color-gold)] transition-colors text-sm">اتصل بنا</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <p>واتساب: 966XXXXXXXXX</p>
              <p>جدة، المملكة العربية السعودية</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} دونا فيلا - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
