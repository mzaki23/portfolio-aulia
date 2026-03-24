"use client";

import { useState } from "react";
import Image from "next/image";
import { Artwork, ARTWORK_CATEGORIES } from "@/lib/types";

export default function GalleryGrid({ artworks }: { artworks: Artwork[] }) {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selected, setSelected] = useState<Artwork | null>(null);

  const categories = ["Semua", ...ARTWORK_CATEGORIES];
  const filtered = activeFilter === "Semua"
    ? artworks
    : artworks.filter((a) => a.category === activeFilter);

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((artwork) => (
          <div
            key={artwork.id}
            className="retro-window cursor-pointer"
            onClick={() => setSelected(artwork)}
          >
            <div className="window-header">
              <span className="truncate max-w-[160px]">{artwork.title}</span>
              <div className="flex gap-1">
                <span className="window-controls"><span className="bg-gray-200" /></span>
                <span className="window-controls"><span className="bg-red-400" /></span>
              </div>
            </div>
            <div className="relative h-52 bg-gray-100">
              <Image
                src={artwork.image_url || `https://placehold.co/400x300/e4f7c2/1e5b85?text=${encodeURIComponent(artwork.title)}`}
                alt={artwork.title}
                fill
                className="object-cover"
                unoptimized={!artwork.image_url || artwork.image_url.includes("placehold.co")}
              />
              <div className="absolute top-2 right-2 bg-[#fef08a] border border-[#1e5b85] rounded-full px-2 py-0.5 text-xs font-bold text-[#1e5b85]">
                {artwork.category}
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-[#1e5b85]">{artwork.title}</h3>
              {artwork.date && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(artwork.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[#6dbcdb] font-bold py-12">Belum ada karya di kategori ini.</p>
      )}

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div
            className="retro-window-static w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="window-header">
              <span>{selected.title}</span>
              <button onClick={() => setSelected(null)} className="text-red-500 font-bold text-lg leading-none">✕</button>
            </div>
            <div className="relative h-72 bg-gray-100">
              <Image
                src={selected.image_url || `https://placehold.co/600x400/e4f7c2/1e5b85?text=${encodeURIComponent(selected.title)}`}
                alt={selected.title}
                fill
                className="object-contain"
                unoptimized={!selected.image_url || selected.image_url.includes("placehold.co")}
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#fef08a] border border-[#1e5b85] rounded-full px-3 py-0.5 text-xs font-bold text-[#1e5b85]">
                  {selected.category}
                </span>
                {selected.date && (
                  <span className="text-xs text-gray-400">
                    {new Date(selected.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                )}
              </div>
              <h2 className="font-display font-bold text-2xl text-[#1e5b85] mb-2">{selected.title}</h2>
              {selected.description && (
                <p className="text-[#1e5b85] leading-relaxed text-sm">{selected.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
