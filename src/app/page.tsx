import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: profile },
    { data: artworks },
    { data: skills },
    { data: education },
    { data: experience },
  ] = await Promise.all([
    supabase.from("profile").select("*").single(),
    supabase.from("artworks").select("*").order("sort_order").limit(6),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("experience").select("*").order("sort_order"),
  ]);

  return (
    <>
      <div className="bubble w-16 h-16" style={{ left: "10%", animationDelay: "0s" }} />
      <div className="bubble w-24 h-24" style={{ left: "80%", animationDuration: "12s", animationDelay: "2s" }} />
      <div className="bubble w-12 h-12" style={{ left: "40%", animationDuration: "8s", animationDelay: "5s" }} />
      <div className="bubble w-20 h-20" style={{ left: "60%", animationDuration: "15s", animationDelay: "1s" }} />

      <Navbar />
      <HeroSection profile={profile} />
      <AboutSection
        profile={profile}
        skills={skills ?? []}
        education={education ?? []}
        experience={experience ?? []}
      />
      <GalleryPreviewSection artworks={artworks ?? []} />

      <footer className="relative z-10 py-8 text-center text-[#1e5b85] font-bold border-t-2 border-[#6dbcdb] bg-white/30 backdrop-blur-sm">
        <p>© 2026 Nurzaliati Aulia · Kaligrafi Arab ✨</p>
        <Link href="/login" className="text-xs opacity-40 hover:opacity-80 mt-1 block transition-opacity">
          Admin Panel
        </Link>
      </footer>
    </>
  );
}
