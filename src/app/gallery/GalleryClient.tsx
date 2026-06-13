"use client";

import { useState } from "react";

const categories = ["الكل", "أظافر", "شعر", "بشرة", "مكياج", "مساج", "صالون"];

const images = [
  { category: "أظافر", color: "from-pink-200 to-pink-100" },
  { category: "شعر", color: "from-amber-100 to-amber-50" },
  { category: "بشرة", color: "from-rose-100 to-rose-50" },
  { category: "مكياج", color: "from-purple-100 to-purple-50" },
  { category: "مساج", color: "from-green-100 to-green-50" },
  { category: "صالون", color: "from-blue-100 to-blue-50" },
  { category: "أظافر", color: "from-pink-100 to-pink-50" },
  { category: "مكياج", color: "from-purple-200 to-purple-100" },
  { category: "شعر", color: "from-amber-200 to-amber-100" },
  { category: "بشرة", color: "from-rose-200 to-rose-100" },
  { category: "صالون", color: "from-blue-200 to-blue-100" },
  { category: "مساج", color: "from-green-200 to-green-100" },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered = activeCategory === "الكل" ? images : images.filter((img) => img.category === activeCategory);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[var(--color-gold)] text-white shadow-md"
                    : "bg-gray-100 text-[var(--color-dark-light)] hover:bg-[var(--color-pink-light)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${img.color} card-hover cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group`}
              >
                <span className="text-4xl mb-2">✨</span>
                <span className="text-sm font-medium text-[var(--color-dark)]">{img.category}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl">🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[80vh] bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-xl hover:bg-white z-10"
            >
              ✕
            </button>
            <div className={`w-full h-80 md:h-96 bg-gradient-to-br ${filtered[selectedImage]?.color} flex items-center justify-center`}>
              <span className="text-8xl">✨</span>
            </div>
            <div className="p-4 text-center">
              <p className="font-bold text-lg">{filtered[selectedImage]?.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
