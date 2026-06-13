import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

const dbUrl = process.env.DATABASE_URL || "";
const adapter = (dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://"))
  ? new PrismaPg({ connectionString: dbUrl })
  : new PrismaBetterSqlite3({ url: process.env.SQLITE_PATH || "dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("Admin12345!", 12);
  await prisma.user.upsert({
    where: { email: "admin@donavilla.com" },
    update: {},
    create: {
      email: "admin@donavilla.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("✅ Admin user created");

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteNameAr: "دونا فيلا",
      siteNameEn: "Dona Villa Salon & Spa",
      phone: "966500000000",
      whatsapp: "966500000000",
      workingHours: "يوميًا من 10 صباحًا حتى 10 مساءً",
      addressAr: "المملكة العربية السعودية",
    },
  });
  console.log("✅ Site settings created");

  // Create home content
  await prisma.homeContent.create({
    data: {
      heroTitleAr: "جمالك يبدأ من دونا فيلا",
      heroTitleEn: "Your Beauty Begins at Dona Villa",
      heroSubtitleAr: "تجربة عناية متكاملة تجمع بين الفخامة، الراحة، والاحترافية.",
      heroSubtitleEn: "A complete care experience combining luxury, comfort, and professionalism.",
      aboutTextAr: "دونا فيلا صالون نسائي يقدم خدمات العناية والجمال باحترافية عالية، من الأظافر والشعر والبشرة إلى المساج والحمام المغربي وخدمات المكياج. نؤمن أن كل امرأة تستحق أن تشعر بالجمال والثقة.",
      ctaTextAr: "احجزي موعدك الآن واستمتعي بتجربة فريدة من نوعها",
      ctaTextEn: "Book your appointment now and enjoy a unique experience",
    },
  });
  console.log("✅ Home content created");

  // Categories with services
  const categories = [
    {
      nameAr: "خدمات الأظافر",
      nameEn: "Nails Service",
      slug: "nails",
      sortOrder: 1,
      description: "مانيكير، بديكير، تركيب أظافر باحترافية عالية",
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
      nameAr: "خدمات المساج",
      nameEn: "Massage Service",
      slug: "massage",
      sortOrder: 2,
      description: "مساج استرخائي، أحجار، رفلكسولوجي، بامبو",
      services: [
        { nameAr: "مساج استرخائي", nameEn: "Relaxing Massage", price: 200 },
        { nameAr: "مساج الأحجار", nameEn: "Stone Massage", price: 300 },
        { nameAr: "مساج رفلكسولوجي", nameEn: "Reflexology Massage", price: 350 },
        { nameAr: "مساج بامبو", nameEn: "Bamboo Massage", price: 350 },
      ],
    },
    {
      nameAr: "الحمام المغربي",
      nameEn: "Moroccan Bath",
      slug: "moroccan-bath",
      sortOrder: 3,
      description: "حمام مغربي بأجود المنتجات والخلطات الطبيعية",
      services: [
        { nameAr: "حمام مغربي كلاسيك", nameEn: "Moroccan Bath Classic", price: 200 },
        { nameAr: "حمام مغربي بالأعشاب", nameEn: "Moroccan Bath Herbs", price: 250 },
        { nameAr: "حمام مغربي بالنيلة الزرقاء", nameEn: "Moroccan Bath Blue Nile", price: 250 },
        { nameAr: "حمام مغربي بالعكر الفاسي", nameEn: "Moroccan Bath Aker Fassi", price: 250 },
        { nameAr: "حمام مغربي ملكي", nameEn: "Moroccan Bath Royal", price: 300 },
        { nameAr: "تقشير وتنعيم الجسم", nameEn: "Body Exfoliation and Smoothing", price: 200 },
      ],
    },
    {
      nameAr: "خدمات البشرة",
      nameEn: "Facial Service",
      slug: "facial",
      sortOrder: 4,
      description: "تنظيف وعناية البشرة بمنتجات عالمية",
      services: [
        { nameAr: "تنظيف بشرة كلاسيك", nameEn: "Facial Classic", price: 200 },
        { nameAr: "تنظيف بشرة عميق", nameEn: "Deep Facial", price: 300 },
        { nameAr: "جلسة عناية", nameEn: "Care Session", price: 150 },
      ],
    },
    {
      nameAr: "خدمات التنظيف",
      nameEn: "Waxing Service",
      slug: "waxing",
      sortOrder: 5,
      description: "واكس، حلاوة، صبغة وتشقير حواجب",
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
      nameAr: "المكياج والرموش",
      nameEn: "Make Up Service",
      slug: "makeup",
      sortOrder: 6,
      description: "مكياج ناعم، سهرة، مميز، وتركيب الرموش",
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
      nameAr: "خدمات التجميل",
      nameEn: "Cosmetic Service",
      slug: "cosmetic",
      sortOrder: 7,
      description: "لفتنق حواجب ورموش، مايكرو حواجب، تاتو",
      services: [
        { nameAr: "لفتنق حواجب", nameEn: "Lifting Eyebrows", price: 500 },
        { nameAr: "لفتنق رموش", nameEn: "Lifting Eyelash", price: 500 },
        { nameAr: "مايكرو حواجب", nameEn: "Microblading", price: 1500 },
        { nameAr: "نانو حواجب", nameEn: "Nano Eyebrows", price: 2000 },
        { nameAr: "تاتو جسم", nameEn: "Tattoo Body", price: 300, priceStartsAt: true },
      ],
    },
    {
      nameAr: "خدمات الشعر",
      nameEn: "Hair Service",
      slug: "hair",
      sortOrder: 8,
      description: "معالجة، صبغة، قص، بروتين وكيراتين",
      services: [
        { nameAr: "معالجة الشعر", nameEn: "Hair Treatment" },
        { nameAr: "صبغة الشعر", nameEn: "Hair Color" },
        { nameAr: "قص واستشوار", nameEn: "Cut & Blowdry" },
        { nameAr: "عناية وترطيب الشعر", nameEn: "Hair Care" },
        { nameAr: "بروتين وكيراتين", nameEn: "Protein & Keratin" },
      ],
    },
    {
      nameAr: "الخدمات الخارجية",
      nameEn: "External Services",
      slug: "external",
      sortOrder: 9,
      description: "خدمات خارجية حسب الطلب، يتم تحديد السعر والتفاصيل بعد التواصل.",
      services: [],
    },
  ];

  for (let i = 0; i < categories.length; i++) {
    const catData = categories[i];
    const category = await prisma.serviceCategory.create({
      data: {
        nameAr: catData.nameAr,
        nameEn: catData.nameEn,
        slug: catData.slug,
        sortOrder: catData.sortOrder,
        description: catData.description,
        services: {
          create: catData.services.map((s, si) => ({
            nameAr: s.nameAr,
            nameEn: s.nameEn,
            price: s.price ?? null,
            priceStartsAt: s.priceStartsAt ?? false,
            sortOrder: si,
          })),
        },
      },
    });
    console.log(`✅ Category: ${category.nameAr} (${catData.services.length} services)`);
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log("📧 Admin: admin@donavilla.com / Admin12345!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
