import { createClient } from "@/lib/supabase/server";
import ResumeForm from "@/components/admin/ResumeForm";

export default async function ResumePage() {
  const supabase = await createClient();
  const [
    { data: skills },
    { data: education },
    { data: experience },
  ] = await Promise.all([
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("experience").select("*").order("sort_order"),
  ]);

  return (
    <div>
      <div className="retro-window-static p-5 mb-6">
        <div className="window-header mb-2"><span>data_diri.exe</span></div>
        <h1 className="font-display font-bold text-2xl text-[#1e5b85]">Data Diri & Resume</h1>
        <p className="text-sm text-[#6dbcdb] font-bold">Kelola keahlian, pendidikan & pengalaman</p>
      </div>
      <ResumeForm
        skills={skills ?? []}
        education={education ?? []}
        experience={experience ?? []}
      />
    </div>
  );
}
