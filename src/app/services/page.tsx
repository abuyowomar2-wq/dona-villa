import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "اكتشفي خدمات صالون دونا فيلا - أظافر، مساج، حمام مغربي، بشرة، مكياج، رموش، شعر، تجميل والمزيد.",
};

const WHATSAPP_NUMBER = "966XXXXXXXXX";

function buildWhatsAppUrl(serviceName: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `مرحبًا دونا فيلا، أرغب بحجز خدمة ${serviceName}، هل يوجد موعد متاح؟`
  )}`;
}

interface Service {
  nameAr: string;
  nameEn: string;
  price: number | null;
  priceStartsAt?: { from: number; to: number };
  priceLater?: boolean;
}

interface Category {
  titleAr: string;
  titleEn: string;
  description: string;
  services?: Service[];
  note?: string;
}

const categories: Category[] = [
  {
    titleAr: "خدمات الأظافر",
    titleEn: "Nails Service",
    description: "اعتني بجمال يديک وأظافرك مع أحدث التقنيات وأفضل المنتجات",
    services: [
      { nameAr: "بديكير ومناكير كلاسيك", nameEn: "Pedicure & Manicure Classic", price: 200 },
      { nameAr: "بديكير ومناكير للأطفال", nameEn: "Pedicure & Manicure Kids", price: 150 },
      { nameAr: "بديكير ومناكير سبا", nameEn: "Pedicure & Manicure SPA", price: 250 },
      { nameAr: "جلسة عناية OPI & CND", nameEn: "OPI & CND Care Session", price: 100 },
      { nameAr: "تركيب أظافر", nameEn: "Nail Extension", price: 70 },
      { nameAr: "لون أظافر عادي", nameEn: "Nail Color", price: 15 },
      { nameAr: "لون أظافر فرنش", nameEn: "Nail French", price: 40 },
      { nameAr: "لون أظافر جل", nameEn: "Nail Color Gel", price: 100 },
      { nameAr: "برافين", nameEn: "Paraffin", price: 60 },
      { nameAr: "جل أكريلك", nameEn: "Gel Acrylic", price: 450 },
      { nameAr: "إزالة أكريلك", nameEn: "Remove Acrylic", price: 200 },
      { nameAr: "إزالة لون جل", nameEn: "Remove Gel Color", price: 70 },
    ],
  },
  {
    titleAr: "خدمات المساج",
    titleEn: "Massage Service",
    description: "استرخي واستمتعي بتجربة مساج فاخرة تريح جسدك وعقلك",
    services: [
      { nameAr: "مساج استرخائي", nameEn: "Relaxing Massage", price: 200 },
      { nameAr: "مساج الأحجار", nameEn: "Stone Massage", price: 300 },
      { nameAr: "مساج رفلكسولوجي", nameEn: "Reflexology Massage", price: 350 },
      { nameAr: "مساج بامبو", nameEn: "Bamboo Massage", price: 350 },
    ],
  },
  {
    titleAr: "الحمام المغربي",
    titleEn: "Moroccan Bath",
    description: "استمتعي بتجربة الحمام المغربي الأصلي مع أفضل المكونات الطبيعية",
    services: [
      { nameAr: "حمام مغربي كلاسيك", nameEn: "Moroccan Bath Classic", price: 200 },
      { nameAr: "حمام مغربي بالأعشاب", nameEn: "Moroccan Bath Herbs", price: 250 },
      { nameAr: "حمام مغربي بالنيلة الزرقاء", nameEn: "Moroccan Bath Blue Nile", price: 250 },
      { nameAr: "حمام مغربي بالعكر الفاسي", nameEn: "Moroccan Bath Aker Fassi", price: 250 },
      { nameAr: "حمام مغربي ملكي", nameEn: "Moroccan Bath Royal", price: 300 },
      { nameAr: "تقشير وتنعيم الجسم", nameEn: "Body Exfoliation", price: 200 },
    ],
  },
  {
    titleAr: "خدمات البشرة",
    titleEn: "Facial Service",
    description: "عناية متكاملة بالبشرة باستخدام أحدث تقنيات العناية وأفضل المنتجات",
    services: [
      { nameAr: "تنظيف بشرة كلاسيك", nameEn: "Facial Classic", price: 200 },
      { nameAr: "تنظيف بشرة عميق", nameEn: "Deep Facial", price: 300 },
      { nameAr: "جلسة عناية", nameEn: "Care Session", price: 150 },
    ],
  },
  {
    titleAr: "خدمات التنظيف",
    titleEn: "Waxing Service",
    description: "خدمات إزالة الشعر باحترافية وأنواع متعددة تناسب جميع أنواع البشرة",
    services: [
      { nameAr: "صبغة حواجب", nameEn: "Eyebrows Color", price: 50 },
      { nameAr: "تشقير حواجب", nameEn: "Eyebrows Bleaching", price: 50 },
      { nameAr: "واكس وجه", nameEn: "Wax Face", price: 90 },
      { nameAr: "واكس يد كاملة", nameEn: "Wax Full Hand", price: 100 },
      { nameAr: "واكس رجل كاملة", nameEn: "Wax Full Leg", price: 100 },
      { nameAr: "حلاوة يد كاملة", nameEn: "Halawa Full Hand", price: 100 },
      { nameAr: "حلاوة رجل كاملة", nameEn: "Halawa Full Leg", price: 100 },
      { nameAr: "واكس جسم كامل", nameEn: "Wax Full Body", price: 500 },
      { nameAr: "حلاوة جسم كامل", nameEn: "Halawa Full Body", price: 350 },
    ],
  },
  {
    titleAr: "المكياج والرموش",
    titleEn: "Make Up Service",
    description: "أطلّي بأجمل إطلالة مع خدمات المكياج والرموش الاحترافية",
    services: [
      { nameAr: "مكياج ناعم", nameEn: "Make Up Simple", price: 200 },
      { nameAr: "مكياج سهرة", nameEn: "Make Up Night", price: 300 },
      { nameAr: "مكياج مميز", nameEn: "Make Up Special", price: 350 },
      { nameAr: "أساس جسم", nameEn: "Foundation Body", price: 100 },
      { nameAr: "تركيب رموش سهرة", nameEn: "Eyelash Daily", price: 50 },
      { nameAr: "تركيب رموش أسبوعي", nameEn: "Eyelash Weekly", price: 200 },
      { nameAr: "تركيب رموش شهري", nameEn: "Eyelash Monthly", price: 600 },
    ],
  },
  {
    titleAr: "خدمات التجميل",
    titleEn: "Cosmetic Service",
    description: "أحدث خدمات التجميل للحصول على إطلالة تدوم طويلاً",
    services: [
      { nameAr: "لفتنق حواجب", nameEn: "Lifting Eyebrows", price: 500 },
      { nameAr: "لفتنق رموش", nameEn: "Lifting Eyelash", price: 500 },
      { nameAr: "مايكرو حواجب", nameEn: "Microblading", price: 1500 },
      { nameAr: "نانو حواجب", nameEn: "Nano Eyebrows", price: 2000 },
      { nameAr: "تاتو جسم", nameEn: "Tattoo Body", price: null, priceStartsAt: { from: 300, to: 1000 } },
    ],
  },
  {
    titleAr: "خدمات الشعر",
    titleEn: "Hair Service",
    description: "عناية كاملة بشعرك من معالجة وصبغ وقص وتصفيف",
    services: [
      { nameAr: "معالجة الشعر", nameEn: "Hair Treatment", price: null, priceLater: true },
      { nameAr: "صبغة الشعر", nameEn: "Hair Color", price: null, priceLater: true },
      { nameAr: "قص واستشوار", nameEn: "Cut & Blowdry", price: null, priceLater: true },
      { nameAr: "عناية وترطيب الشعر", nameEn: "Hair Care", price: null, priceLater: true },
      { nameAr: "بروتين وكيراتين", nameEn: "Protein & Keratin", price: null, priceLater: true },
    ],
  },
  {
    titleAr: "الخدمات الخارجية",
    titleEn: "External Services",
    description: "خدمات خارجية حسب الطلب، يتم تحديد السعر والتفاصيل بعد التواصل.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Page Header Banner */}
        <div className="gradient-pink-light py-16 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">خدماتنا</h1>
            <p className="text-[var(--color-dark-light)] text-lg">اكتشفي خدماتنا المتنوعة واختاري ما يناسبك</p>
          </div>
        </div>

        {/* Services Categories */}
        {categories.map((category, catIndex) => (
          <section
            key={catIndex}
            className={`section-padding ${catIndex % 2 === 0 ? "bg-white" : "pattern-dots"}`}
          >
            <div className="container-custom">
              <div className="section-title">
                <h2>
                  {category.titleAr}{" "}
                  <span className="text-lg font-normal italic text-[var(--color-pink)] block md:inline">
                    ({category.titleEn})
                  </span>
                </h2>
                <p>{category.description}</p>
              </div>

              {category.services && category.services.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, sIndex) => (
                    <div
                      key={sIndex}
                      className="bg-[var(--color-cream)] p-6 rounded-2xl card-hover border border-pink-100 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold mb-1">{service.nameAr}</h3>
                        <p className="text-sm italic text-[var(--color-dark-light)] mb-3">
                          {service.nameEn}
                        </p>
                      </div>
                      <div>
                        {service.priceStartsAt ? (
                          <p className="text-2xl font-bold text-[var(--color-gold)] mb-3">
                            من {service.priceStartsAt.from} إلى {service.priceStartsAt.to} ريال
                          </p>
                        ) : service.priceLater ? (
                          <p className="text-lg text-[var(--color-dark-light)] mb-3">
                            السعر يحدد بعد المعاينة
                          </p>
                        ) : service.price !== null ? (
                          <p className="text-2xl font-bold text-[var(--color-gold)] mb-3">
                            {service.price} ريال
                          </p>
                        ) : null}
                        <a
                          href={buildWhatsAppUrl(service.nameAr)}
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
              ) : category.note ? (
                <div className="text-center py-8">
                  <p className="text-lg text-[var(--color-dark-light)]">{category.note}</p>
                  <a
                    href={buildWhatsAppUrl("خدمات خارجية")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-gold mt-4"
                  >
                    تواصلي معنا للاستفسار
                  </a>
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
