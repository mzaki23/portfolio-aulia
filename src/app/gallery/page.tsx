import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .order("sort_order");

  return (
    <>
      <div className="bubble w-16 h-16" style={{ left: "5%", animationDelay: "0s" }} />
      <div className="bubble w-20 h-20" style={{ left: "85%", animationDuration: "13s", animationDelay: "3s" }} />

      <Navbar />

      <main className="min-h-screen relative z-10 pt-28 pb-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-bold text-5xl md:text-6xl text-outline-3d text-center mb-4">
            Galeri Karya
          </h1>
          <p className="text-center font-bold text-[#1e5b85] mb-10">
            Semua koleksi kaligrafi Arab & seni islami ✨
          </p>

          <GalleryGrid artworks={artworks ?? []} />
        </div>
      </main>
    </>
  );
}
