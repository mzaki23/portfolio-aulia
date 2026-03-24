import { createClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";

export default async function GaleriPage() {
  const supabase = await createClient();
  const { data: artworks } = await supabase
    .from("artworks")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div className="retro-window-static p-5 mb-6">
        <div className="window-header mb-2"><span>kelola_galeri.exe</span></div>
        <h1 className="font-display font-bold text-2xl text-[#1e5b85]">Kelola Galeri</h1>
        <p className="text-sm text-[#6dbcdb] font-bold">Tambah, edit & hapus karya seni</p>
      </div>
      <GalleryManager artworks={artworks ?? []} />
    </div>
  );
}
