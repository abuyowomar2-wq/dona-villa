import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ServiceItem {
  icon: string;
  name: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: "💅",
    name: "خدمات الأظافر",
    description: "مانيكير، بديكير، تركيب أظافر وجل",
  },
  {
    icon: "💆‍♀️",
    name: "خدمات المساج",
    description: "مساج استرخائي، أحجار، رفلكسولوجي، بامبو",
  },
  {
    icon: "🛁",
    name: "الحمام المغربي",
    description: "حمام مغربي كلاسيك، بالأعشاب، ملكي",
  },
  {
    icon: "✨",
    name: "خدمات البشرة",
    description: "تنظيف بشرة، عناية وعناية عميقة",
  },
  {
    icon: "🌸",
    name: "خدمات التنظيف",
    description: "واكس، حلاوة، صبغة وتشقير حواجب",
  },
  {
    icon: "💄",
    name: "خدمات المكياج والرموش",
    description: "مكياج ناعم، سهرة، تركيب رموش",
  },
  {
    icon: "💉",
    name: "خدمات التجميل",
    description: "لفتنق، مايكرو حواجب، تاتو",
  },
  {
    icon: "💇‍♀️",
    name: "خدمات الشعر",
    description: "علاج، صبغة، قص، بروتين وكيراتين",
  },
  {
    icon: "🚗",
    name: "الخدمات الخارجية",
    description: "خدمات حسب الطلب خارج الصالون",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="section-padding bg-[var(--color-cream)] scroll-mt-16">
      <div className="container-custom">
        <div className="section-title">
          <h2>خدماتنا</h2>
          <p>نقدم مجموعة متكاملة من خدمات العناية والجمال بأعلى معايير الاحترافية</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.name} delay={index * 80}>
              <Link
                href="/services"
                className="block p-6 md:p-7 bg-white rounded-2xl border border-[var(--color-pink-light)]/30 card-hover group h-full"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2.5 text-[var(--color-dark)] group-hover:text-[var(--color-pink)] transition-colors">
                  {service.name}
                </h3>
                <p className="text-[var(--color-dark-light)] leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
