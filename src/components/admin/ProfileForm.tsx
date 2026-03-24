"use client";

import { useState } from "react";
import Image from "next/image";
import { Profile } from "@/lib/types";
import { updateProfile } from "@/lib/actions/profile";

export default function ProfileForm({ profile }: { profile: Profile | null }) {
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null);
  const [heroPreview, setHeroPreview] = useState<string | null>(profile?.hero_image_url || null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await updateProfile(profile?.id ?? "", formData);
    setLoading(false);
    if (result?.error) showToast("Error: " + result.error);
    else showToast("Profil berhasil disimpan! ✨");
  }

  return (
    <>
      <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <div className="retro-window-static p-5">
            <div className="window-header mb-4"><span>foto_profil.png</span></div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-28 h-28 rounded-full border-4 border-[#6dbcdb] overflow-hidden bg-gray-100">
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Avatar" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">👤</div>
                )}
              </div>
              <label className="retro-btn retro-btn-green border-[#1e5b85] text-sm cursor-pointer">
                <i className="fas fa-upload" /> Upload Avatar
                <input type="file" name="avatar" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setAvatarPreview(URL.createObjectURL(f));
                  }} />
              </label>
            </div>
          </div>

          <div className="retro-window-static p-5">
            <div className="window-header mb-4"><span>hero_image.png</span></div>
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-full h-36 border-2 border-[#6dbcdb] rounded overflow-hidden bg-gray-100">
                {heroPreview ? (
                  <Image src={heroPreview} alt="Hero" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-sm">
                    Foto hero (halaman utama)
                  </div>
                )}
              </div>
              <label className="retro-btn retro-btn-green border-[#1e5b85] text-sm cursor-pointer">
                <i className="fas fa-upload" /> Upload Hero
                <input type="file" name="hero" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setHeroPreview(URL.createObjectURL(f));
                  }} />
              </label>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          <div className="retro-window-static p-5">
            <div className="window-header mb-4"><span>info_pribadi.txt</span></div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Nama Lengkap</label>
                <input type="text" name="full_name" defaultValue={profile?.full_name ?? ""} className="retro-input" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Bio</label>
                <textarea name="bio" defaultValue={profile?.bio ?? ""} rows={4} className="retro-input resize-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1e5b85] mb-1">Email</label>
                <input type="email" name="email" defaultValue={profile?.email ?? ""} className="retro-input" />
              </div>
            </div>
          </div>

          <div className="retro-window-static p-5">
            <div className="window-header mb-4"><span>social_media.txt</span></div>
            <div className="flex flex-col gap-3">
              {[
                { name: "whatsapp", icon: "fab fa-whatsapp", label: "WhatsApp", placeholder: "+62812..." },
                { name: "instagram", icon: "fab fa-instagram", label: "Instagram", placeholder: "@username" },
                { name: "tiktok", icon: "fab fa-tiktok", label: "TikTok", placeholder: "@username" },
                { name: "linkedin", icon: "fab fa-linkedin", label: "LinkedIn", placeholder: "username" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-[#1e5b85] mb-1">
                    <i className={`${field.icon} mr-1`} /> {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    defaultValue={(profile as Record<string, string | null> | null)?.[field.name] ?? ""}
                    placeholder={field.placeholder}
                    className="retro-input"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <button type="submit" disabled={loading} className="retro-btn retro-btn-blue disabled:opacity-60">
            {loading ? <><i className="fas fa-spinner fa-spin" /> Menyimpan...</> : <><i className="fas fa-save" /> Simpan Profil</>}
          </button>
        </div>
      </form>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
