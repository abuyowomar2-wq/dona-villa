import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "العروض",
  description: "أحدث عروض وخصومات صالون دونا فيلا - استفيدي من عروضنا المميزة على خدمات التجميل والعناية.",
};

const offers = [
  {
    title: "عرض الافتتاح",
    desc: "خصم خاص بمناسبة افتتاح الصالون على جميع الخدمات",
    priceBefore: 500,
    priceAfter: 350,
    image: "from-pink-300 to-pink-100",
  },
  {
    title: "باقة العناية الكاملة",
    desc: "باقة متكاملة تشمل تنظيف البشرة، مساج، وبديكير ومناكير",
    priceBefore: 800,
    priceAfter: 600,
    image: "from-amber-300 to-amber-100",
  },
  {
    title: "عرض المساج الشهري",
    desc: "4 جلسات مساج استرخائي بسعر 3 جلسات",
    priceBefore: 800,
    priceAfter: 600,
    image: "from-green-300 to-green-100",
  },
];

export default function OffersPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="gradient-pink-light py-16 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">العروض والخصومات</h1>
            <p className="text-[var(--color-dark-light)] text-lg">استفيدي من أقوى العروض والخصومات على خدمات التجميل والعناية</p>
          </div>
        </div>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              {offers.map((offer, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
                  <div className={`h-48 bg-gradient-to-br ${offer.image} flex items-center justify-center`}>
                    <span className="text-6xl">🎁</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-[var(--color-dark-light)] text-sm mb-4 leading-relaxed">{offer.desc}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gray-400 line-through text-lg">{offer.priceBefore} ريال</span>
                      <span className="text-[var(--color-gold)] font-bold text-2xl">{offer.priceAfter} ريال</span>
                    </div>
                    <a
                      href={`https://wa.me/966500000000?text=${encodeURIComponent(`مرحبًا دونا فيلا، أرغب بالاستفسار عن عرض: ${offer.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-gold w-full text-sm"
                    >
                      احجزي الآن
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* No offers banner */}
        {offers.length === 0 && (
          <section className="section-padding pb-24 bg-white text-center">
            <div className="container-custom">
              <span className="text-8xl block mb-6">🎁</span>
              <h2 className="text-2xl font-bold mb-3">لا توجد عروض حاليًا</h2>
              <p className="text-[var(--color-dark-light)]">تابعينا على وسائل التواصل الاجتماعي ليصلك كل جديد</p>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
