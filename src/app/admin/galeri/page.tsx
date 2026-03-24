import { createClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function GaleriPage() {
  const supabase = await createClient();
  const [{ data: artworks }, { data: categories }] = await Promise.all([
    supabase.from("artworks").select("*").order("sort_order"),
    supabase.from("categories").select("*").order("sort_order"),
  ]);

  return (
    <div>
      <div className="retro-window-static p-5 mb-6">
        <div className="window-header mb-2"><span>kelola_galeri.exe</span></div>
        <h1 className="font-display font-bold text-2xl text-[#1e5b85]">Kelola Galeri</h1>
        <p className="text-sm text-[#6dbcdb] font-bold">Tambah, edit & hapus karya seni + kategori</p>
      </div>
      <GalleryManager artworks={artworks ?? []} categories={categories ?? []} />
    </div>
  );
}
