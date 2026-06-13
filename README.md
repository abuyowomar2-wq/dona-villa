# دونا فيلا - صالون نسائي فاخر

<div dir="rtl">

## نبذة عن المشروع

موقع إلكتروني تعريفي فاخر لصالون دونا فيلا النسائي، مبني باستخدام أحدث تقنيات الويب. يحتوي الموقع على لوحة تحكم كاملة لإدارة جميع محتويات الموقع بدون الحاجة لتعديل الكود.

## التقنيات المستخدمة

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma ORM** مع SQLite
- **نظام مصادقة خاص** للوحة التحكم

## متطلبات التشغيل

- Node.js 18+
- npm

## طريقة التثبيت والتشغيل

```bash
# 1. تثبيت الاعتماديات
npm install

# 2. إعداد قاعدة البيانات وتشغيل المحاكاة
npx prisma migrate dev

# 3. إضافة البيانات الأساسية (الخدمات، الأقسام، مستخدم الأدمن)
npx prisma db seed

# 4. تشغيل المشروع في بيئة التطوير
npm run dev
```

المشروع سيعمل على الرابط: http://localhost:3000

## بيانات الدخول للوحة التحكم

- **رابط لوحة التحكم:** http://localhost:3000/admin
- **البريد الإلكتروني:** admin@donavilla.com
- **كلمة المرور:** Admin12345!

## طريقة التعديل من لوحة التحكم

بعد تسجيل الدخول، يمكنك الوصول إلى الأقسام التالية:

1. **لوحة التحكم** - إحصائيات سريعة واختصارات
2. **إدارة الخدمات** - إضافة، تعديل، حذف، وتفعيل/تعطيل الخدمات
3. **إدارة الأقسام** - إدارة أقسام الخدمات الرئيسية
4. **إدارة العروض** - إضافة وتعديل العروض الترويجية
5. **معرض الصور** - رفع وإدارة صور المعرض
6. **محتوى الرئيسية** - تعديل نصوص الصفحة الرئيسية
7. **إعدادات الموقع** - تعديل معلومات الصالون وروابط التواصل و SEO
8. **رسائل التواصل** - عرض وإدارة رسائل الزوار

## النشر على Render (مستحسن)

المشروع جاهز للنشر على [Render](https://render.com) بنقرة واحدة:

### طريقة النشر:

1. ارفع المشروع على GitHub
2. سجل دخول في [Render Dashboard](https://dashboard.render.com)
3. اضغط **New +** واختر **Blueprint**
4. اختر المستودع من GitHub
5. Render سيقرأ ملف `render.yaml` تلقائياً ويجهز:
   - **Web Service** - لتشغيل موقع Next.js
   - **PostgreSQL Database** - قاعدة بيانات الإنتاج
6. اضغط **Apply**

أو يدوياً:
1. أنشئ **PostgreSQL** من Render dashboard
2. أنشئ **Web Service** من نوع Node.js
3. أوامر البناء:
   ```bash
   node scripts/render-setup.js && npm run build
   ```
4. أمر التشغيل: `npm run start`
5. أضف متغير البيئة `DATABASE_URL` من قاعدة البيانات

### المتغيرات المطلوبة على Render:

| المتغير | الوصف |
|---------|-------|
| `DATABASE_URL` | رابط PostgreSQL (يضاف تلقائياً) |
| `NODE_ENV` | `production` |
| `NEXTAUTH_SECRET` | مفتاح سري عشوائي للجلسات |

---

## هيكل المشروع

```
dona-villa/
├── prisma/
│   ├── schema.prisma     # تعريف قاعدة البيانات
│   └── seed.ts           # بيانات البذور
├── src/
│   ├── app/
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   ├── about/            # صفحة من نحن
│   │   ├── services/         # صفحة الخدمات
│   │   ├── gallery/          # معرض الصور
│   │   ├── offers/           # العروض
│   │   ├── contact/          # تواصل معنا
│   │   ├── admin/            # لوحة التحكم
│   │   └── api/              # API Routes
│   ├── components/
│   │   ├── layout/           # Header, Footer, WhatsApp
│   │   ├── home/             # مكونات الصفحة الرئيسية
│   │   └── ui/               # مكونات عامة
│   └── lib/                  # المكتبات المساعدة
└── public/                   # الملفات الثابتة
```

## الأوامر المتاحة

| الأمر | الوصف |
|-------|-------|
| `npm run dev` | تشغيل خادم التطوير |
| `npm run build` | بناء المشروع للإنتاج |
| `npm run start` | تشغيل نسخة الإنتاج |
| `npm run seed` | إعادة تعبئة البيانات الأساسية |
| `npx prisma studio` | فتح Prisma Studio لإدارة البيانات |

---

</div>

## Dona Villa - Luxury Women's Salon

A professional, luxurious informational website for Dona Villa Women's Salon, built with cutting-edge web technologies. Features a complete admin dashboard for managing all website content without touching the code.

### Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Prisma ORM** with SQLite (PostgreSQL-ready)
- **Custom Auth System** for admin dashboard

### Quick Start

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Admin Login

- **URL:** http://localhost:3000/admin
- **Email:** admin@donavilla.com
- **Password:** Admin12345!

### License

Private - All rights reserved.
