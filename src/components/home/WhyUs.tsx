import ScrollReveal from "@/components/ui/ScrollReveal";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: "👩‍🎨",
    title: "مختصات محترفات",
    description: "فريق من المختصات ذوات الخبرة العالية في عالم التجميل والعناية",
  },
  {
    icon: "🏠",
    title: "خدمات متعددة في مكان واحد",
    description: "كل ما تحتاجينه من عناية وجمال تحت سقف واحد",
  },
  {
    icon: "🌿",
    title: "أجواء مريحة وراقية",
    description: "بيئة هادئة ومريحة مصممة لتوفير أقصى درجات الاسترخاء",
  },
  {
    icon: "✨",
    title: "منتجات عناية مختارة بعناية",
    description: "نستخدم أفضل المنتجات العالمية المضمونة لصحة بشرتك",
  },
  {
    icon: "📱",
    title: "إمكانية الحجز والتواصل بسهولة",
    description: "احجزي موعدك بكل سهولة عبر واتساب",
  },
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="section-title">
          <h2>لماذا دونا فيلا؟</h2>
          <p>نضع احتياجاتك وراحتك في مقدمة أولوياتنا لنمنحك تجربة لا تنسى</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <div className="text-center p-6 rounded-2xl hover:bg-[var(--color-cream)] transition-colors duration-300">
                <div className="text-5xl mb-5">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-[var(--color-dark)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-dark-light)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
