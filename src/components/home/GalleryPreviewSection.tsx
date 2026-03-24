"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Artwork } from "@/lib/types";

export default function GalleryPreviewSection({ artworks }: { artworks: Artwork[] }) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <section id="galeri" className="relative z-10 py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display font-bold text-5xl text-outline-3d text-center mb-4">
          Galeri Karya
        </h2>
        <p className="text-center font-bold text-[#1e5b85] mb-12">
          Koleksi terbaru kaligrafi & seni islami ✨
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
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
              <div className="relative h-48 bg-gray-100">
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
                <h3 className="font-bold text-[#1e5b85] text-sm">{artwork.title}</h3>
                {artwork.date && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(artwork.date).toLocaleDateString("id-ID", { year: "numeric", month: "long" })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery" className="retro-btn retro-btn-blue text-base">
            <i className="fas fa-images" /> Lihat Semua Karya
          </Link>
        </div>
      </div>

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
              <div className="mt-4">
                <Link href="/gallery" className="retro-btn retro-btn-blue text-sm">
                  <i className="fas fa-images" /> Lihat Semua Karya
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
