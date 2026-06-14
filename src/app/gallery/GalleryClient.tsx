"use client";

import { useState, useEffect } from "react";

const categories = ["الكل", "أظافر", "شعر", "بشرة", "مكياج", "مساج", "صالون"];

interface GalleryImage {
  id: string;
  title: string | null;
  category: string;
  imageUrl: string;
  sortOrder: number;
}

export default function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "الكل" ? images : images.filter((img) => img.category === activeCategory);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center py-12">
          <div className="w-10 h-10 border-4 border-pink-light border-t-gold rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

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
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <span className="text-6xl block mb-4">🖼️</span>
              <p className="text-lg">لا توجد صور في هذا القسم حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="aspect-square rounded-2xl card-hover cursor-pointer relative overflow-hidden group"
                >
                  {img.imageUrl ? (
                    <img
                      src={img.imageUrl}
                      alt={img.title || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-pink-light)] to-[var(--color-cream-dark)] flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <span className="text-white text-sm font-medium">
                      {img.title || img.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-4xl">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-xl hover:bg-white z-10 shadow-lg"
            >
              ✕
            </button>
            {selectedImage.imageUrl ? (
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || ""}
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-[var(--color-pink-light)] to-[var(--color-cream-dark)] flex items-center justify-center">
                <span className="text-8xl">✨</span>
              </div>
            )}
            <div className="p-4 text-center bg-white">
              <p className="font-bold text-lg">{selectedImage.title || selectedImage.category}</p>
              <p className="text-sm text-gray-400">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
