import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصلي مع صالون دونا فيلا - احجزي موعدك أو استفسري عن خدماتنا عبر واتساب أو نموذج التواصل.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Banner */}
        <div className="gradient-pink-light py-16 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">تواصل معنا</h1>
            <p className="text-[var(--color-dark-light)] text-lg">يسعدنا تواصلك معنا، احجزي موعدك أو استفسري عن خدماتنا</p>
          </div>
        </div>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-pink-light)] flex items-center justify-center text-2xl">📞</div>
                    <div>
                      <p className="text-sm text-[var(--color-dark-light)]">اتصلي بنا</p>
                      <p className="font-bold text-lg" dir="ltr">+966 5X XXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-pink-light)] flex items-center justify-center text-2xl">📍</div>
                    <div>
                      <p className="text-sm text-[var(--color-dark-light)]">موقعنا</p>
                      <p className="font-bold">المملكة العربية السعودية</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-pink-light)] flex items-center justify-center text-2xl">🕐</div>
                    <div>
                      <p className="text-sm text-[var(--color-dark-light)]">مواعيد العمل</p>
                      <p className="font-bold">يوميًا من 10 صباحًا حتى 10 مساءً</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <h3 className="text-xl font-bold mt-10 mb-4">تابعينا على</h3>
                <div className="flex gap-4">
                  {[
                    { name: "Instagram", icon: "📷", color: "bg-pink-500" },
                    { name: "Snapchat", icon: "👻", color: "bg-yellow-400" },
                    { name: "TikTok", icon: "🎵", color: "bg-gray-900" },
                  ].map((social) => (
                    <a key={social.name} href="#" className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white text-lg hover:scale-110 transition-transform`}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[var(--color-cream)] p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">أرسلي رسالة</h2>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">الاسم</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-pink-light)] outline-none transition" placeholder="أدخلي اسمك" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">رقم الجوال</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-pink-light)] outline-none transition" placeholder="05XXXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الخدمة المطلوبة</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-pink-light)] outline-none transition">
                      <option value="">اختاري الخدمة</option>
                      <option>خدمات الأظافر</option>
                      <option>خدمات المساج</option>
                      <option>الحمام المغربي</option>
                      <option>خدمات البشرة</option>
                      <option>خدمات التنظيف</option>
                      <option>المكياج والرموش</option>
                      <option>خدمات التجميل</option>
                      <option>خدمات الشعر</option>
                      <option>الخدمات الخارجية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الرسالة</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-pink-light)] outline-none transition" placeholder="اكتبي رسالتك هنا..."></textarea>
                  </div>
                  <button type="submit" className="btn-primary btn-gold w-full">إرسال الرسالة</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="section-padding pattern-dots">
          <div className="container-custom">
            <div className="bg-gray-200 rounded-2xl h-64 md:h-80 flex items-center justify-center text-gray-400 text-lg">
              🗺️ موقع الصالون على الخريطة
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
