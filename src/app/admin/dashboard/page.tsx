import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: artworkCount },
    { count: skillCount },
    { count: eduCount },
    { count: expCount },
  ] = await Promise.all([
    supabase.from("artworks").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("education").select("*", { count: "exact", head: true }),
    supabase.from("experience").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Total Karya", value: artworkCount ?? 0, icon: "fas fa-images", color: "#c2eb96" },
    { label: "Keahlian", value: skillCount ?? 0, icon: "fas fa-star", color: "#fef08a" },
    { label: "Pendidikan", value: eduCount ?? 0, icon: "fas fa-graduation-cap", color: "#6dbcdb" },
    { label: "Pengalaman", value: expCount ?? 0, icon: "fas fa-briefcase", color: "#e4f7c2" },
  ];

  return (
    <div>
      <div className="retro-window-static p-5 mb-8">
        <div className="window-header mb-4"><span>dashboard.exe</span></div>
        <h1 className="font-display font-bold text-3xl text-[#1e5b85]">
          Selamat Datang! 👋
        </h1>
        <p className="text-[#6dbcdb] font-bold mt-1">
          Kelola portfolio kaligrafi Arab kamu dari sini.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="retro-window-static p-4 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-[#1e5b85] text-xl"
              style={{ background: stat.color }}>
              <i className={stat.icon} />
            </div>
            <div className="font-display font-bold text-3xl text-[#1e5b85]">{stat.value}</div>
            <div className="text-xs font-bold text-[#6dbcdb] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="retro-window-static p-5">
        <div className="window-header mb-4"><span>quick_links.txt</span></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a href="/admin/galeri" className="retro-btn retro-btn-blue justify-center">
            <i className="fas fa-plus" /> Tambah Karya
          </a>
          <a href="/admin/profil" className="retro-btn retro-btn-green border-[#1e5b85] justify-center">
            <i className="fas fa-user-edit" /> Edit Profil
          </a>
          <a href="/" target="_blank" className="retro-btn retro-btn-yellow border-[#1e5b85] justify-center">
            <i className="fas fa-eye" /> Lihat Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
