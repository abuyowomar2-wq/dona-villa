import type { Metadata } from "next";
import "./globals.css";
import { Tajawal, Cairo } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "دونا فيلا | صالون نسائي فاخر | Dona Villa Salon & Spa",
    template: "%s | دونا فيلا",
  },
  description: "صالون دونا فيلا النسائي - تجربة عناية متكاملة تجمع بين الفخامة، الراحة، والاحترافية. خدمات الأظافر، الشعر، البشرة، المساج، الحمام المغربي والمكياج.",
  keywords: "صالون نسائي, دونا فيلا, عناية بالبشرة, مكياج, أظافر, مساج, حمام مغربي, صالون تجميل, Dona Villa, beauty salon",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "دونا فيلا",
    title: "دونا فيلا | صالون نسائي فاخر",
    description: "تجربة عناية متكاملة تجمع بين الفخامة، الراحة، والاحترافية.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${cairo.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-tajawal)]">
        {children}
      </body>
    </html>
  );
}
