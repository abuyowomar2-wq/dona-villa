import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرفي على صالون دونا فيلا النسائي الفاخر - رؤيتنا، رسالتنا، وما يميزنا في عالم التجميل والعناية.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Page Header Banner */}
        <div className="gradient-pink-light py-16 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">من نحن</h1>
            <p className="text-[var(--color-dark-light)] text-lg">تعرفي على قصتنا ورحلتنا في عالم الجمال</p>
          </div>
        </div>

        {/* About Content */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Placeholder */}
              <div className="relative">
                <div className="w-full h-80 md:h-96 bg-gradient-to-br from-[var(--color-pink-light)] to-[var(--color-cream-dark)] rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">💎</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-[var(--color-gold)] rounded-2xl" style={{ left: "auto", right: "-1rem" }}></div>
              </div>

              {/* Text */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-dark)]">صالون دونا فيلا</h2>
                <p className="text-[var(--color-dark-light)] leading-loose text-lg mb-6">
                  دونا فيلا هو صالون نسائي متكامل يقدم خدمات العناية والجمال باحترافية عالية. نؤمن أن كل امرأة تستحق أن تشعر بالجمال، الثقة، والتميز. فريقنا من المختصات المحترفات يعملن على تقديم أفضل الخدمات باستخدام أحدث التقنيات وأفضل المنتجات العالمية.
                </p>
                <div className="space-y-8 mt-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-white text-sm">👁</span>
                      رؤيتنا
                    </h3>
                    <p className="text-[var(--color-dark-light)] leading-loose pr-10">أن نكون الوجهة الأولى للمرأة السعودية في عالم التجميل والعناية، نجمع بين الفخامة والجودة والاحترافية.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[var(--color-pink)] flex items-center justify-center text-white text-sm">💌</span>
                      رسالتنا
                    </h3>
                    <p className="text-[var(--color-dark-light)] leading-loose pr-10">تقديم تجربة عناية متكاملة واستثنائية تجمع بين الجودة العالية، الراحة، والأجواء الفاخرة لكل سيدة تزورنا.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Stand Out */}
        <section className="section-padding pattern-dots">
          <div className="container-custom">
            <div className="section-title">
              <h2>لماذا نتميز؟</h2>
              <p>ما يجعل دونا فيلا الخيار الأمثل لعنايتك وجمالك</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "👩‍🎨", title: "مختصات محترفات", desc: "فريق من الخبيرات في مجالات التجميل المختلفة" },
                { icon: "🌿", title: "منتجات عالمية", desc: "نستخدم أفضل المنتجات المضمونة والمعتمدة عالميًا" },
                { icon: "🏠", title: "أجواء فاخرة", desc: "بيئة هادئة ومريحة مصممة لراحتك واسترخائك" },
                { icon: "📅", title: "حجز سهل", desc: "احجزي موعدك بكل سهولة عبر واتساب في أي وقت" },
                { icon: "💰", title: "أسعار مناسبة", desc: "خدمات عالية الجودة بأسعار تنافسية ومناسبة" },
                { icon: "🤝", title: "خصوصية تامة", desc: "نضمن لك خصوصية كاملة وراحة مطلقة خلال زيارتك" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl text-center card-hover shadow-sm">
                  <span className="text-4xl block mb-4">{item.icon}</span>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-[var(--color-dark-light)] leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
