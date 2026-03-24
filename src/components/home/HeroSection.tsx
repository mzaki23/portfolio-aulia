import Image from "next/image";
import { Profile } from "@/lib/types";

export default function HeroSection({ profile }: { profile: Profile | null }) {
  const heroImage = profile?.hero_image_url || "https://placehold.co/800x1000/e4f7c2/1e5b85?text=Foto+Profil";
  const name = profile?.full_name || "Nurzaliati Aulia";

  return (
    <section id="beranda" className="min-h-screen relative flex items-center justify-center pt-20 px-4 md:px-12 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left: Computer Window with Photo */}
        <div className="relative w-full lg:w-5/12 animate-float-slow z-20">
          {/* Flower decoration */}
          <div className="absolute -top-12 -right-10 w-24 h-24 z-30 text-5xl select-none">🌸</div>

          <div className="retro-window w-full bg-white transform -rotate-2">
            <div className="window-header">
              <span>Untitled_Profile.jpg</span>
              <div className="flex gap-1">
                <span className="window-controls"><span className="bg-gray-200" /></span>
                <span className="window-controls"><span className="bg-gray-200" /></span>
                <span className="window-controls"><span className="bg-red-400" /></span>
              </div>
            </div>
            <div className="window-menu">
              <span className="cursor-pointer hover:font-bold">File</span>
              <span className="cursor-pointer hover:font-bold">Edit</span>
              <span className="cursor-pointer hover:font-bold">View</span>
              <span className="cursor-pointer hover:font-bold">Help</span>
            </div>
            <div className="flex h-[400px] md:h-[500px]">
              <div className="toolbar">
                <i className="fas fa-mouse-pointer" />
                <i className="far fa-square" />
                <i className="fas fa-font" />
                <i className="fas fa-pen" />
                <i className="fas fa-fill-drip" />
                <i className="fas fa-eraser" />
                <i className="fas fa-shapes" />
                <i className="far fa-circle" />
              </div>
              <div className="flex-1 p-2 bg-gray-100 overflow-hidden relative">
                <Image
                  src={heroImage}
                  alt={name}
                  fill
                  className="object-cover rounded border border-gray-300"
                  unoptimized={heroImage.includes("placehold.co")}
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-8 text-[#ffd700] text-5xl animate-float-fast drop-shadow-[0_4px_0_#b8860b]">
            <i className="fas fa-star" />
          </div>
          <div className="absolute -bottom-12 left-4 text-[#ffd700] text-3xl animate-float-slow drop-shadow-[0_4px_0_#b8860b]" style={{ animationDelay: "1s" }}>
            <i className="fas fa-star" />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full lg:w-6/12 z-20 flex flex-col gap-6">
          <h1 className="text-outline-3d font-display font-bold text-6xl md:text-8xl">
            {name.split(" ")[0]}
            <br />
            <span className="text-5xl md:text-7xl">{name.split(" ").slice(1).join(" ")}</span>
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#fef08a] border-2 border-[#1e5b85] flex items-center justify-center text-xl font-bold text-[#1e5b85] flex-shrink-0">
              {name[0]}
            </div>
            <div className="speech-bubble px-5 py-3">
              <p className="font-body font-bold text-[#1e5b85] text-sm md:text-base">
                Halo, Aku {name}! 👋
              </p>
            </div>
          </div>

          <div className="retro-window-static p-5 transform rotate-1">
            <p className="font-body text-[#1e5b85] leading-relaxed text-sm md:text-base">
              {profile?.bio || "Seorang seniman kaligrafi Arab yang menggabungkan keindahan klasik dengan presentasi visual yang ceria dan out-of-the-box! ✨"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {profile?.instagram && (
              <a href={`https://instagram.com/${profile.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                className="retro-btn retro-btn-blue text-sm">
                <i className="fab fa-instagram" /> Instagram
              </a>
            )}
            {profile?.whatsapp && (
              <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                className="retro-btn retro-btn-green text-sm">
                <i className="fab fa-whatsapp" /> WhatsApp
              </a>
            )}
            <a href="#galeri" className="retro-btn retro-btn-yellow text-sm border-[#1e5b85]">
              <i className="fas fa-images" /> Lihat Karya
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
