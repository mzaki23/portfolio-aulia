import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/admin/ProfileForm";

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile").select("*").single();

  return (
    <div>
      <div className="retro-window-static p-5 mb-6">
        <div className="window-header mb-2"><span>edit_profil.exe</span></div>
        <h1 className="font-display font-bold text-2xl text-[#1e5b85]">Edit Profil</h1>
        <p className="text-sm text-[#6dbcdb] font-bold">Update info profil & foto kamu</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
