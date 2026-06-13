import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import GalleryClient from "./GalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "معرض الأعمال",
  description: "شاهدي أعمالنا وإبداعاتنا في صالون دونا فيلا - أحدث الصور من خدمات الأظافر، الشعر، البشرة، المكياج والمساج.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="gradient-pink-light py-16 text-center">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">معرض الأعمال</h1>
            <p className="text-[var(--color-dark-light)] text-lg">أحدث أعمالنا وإبداعاتنا في عالم التجميل والعناية</p>
          </div>
        </div>
        <GalleryClient />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
