import Image from "next/image";
import { Profile, Skill, Education, Experience } from "@/lib/types";

interface Props {
  profile: Profile | null;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}

export default function AboutSection({ profile, skills, education, experience }: Props) {
  const avatarUrl = profile?.avatar_url || "https://placehold.co/400x400/c2eb96/1e5b85?text=Avatar";

  return (
    <section id="tentang" className="relative z-10 py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display font-bold text-5xl text-outline-3d text-center mb-12">
          Tentang Aku
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar + social links */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="retro-window-static p-4 text-center">
              <div className="window-header mb-3">
                <span>About_Me.png</span>
                <div className="flex gap-1">
                  <span className="window-controls"><span className="bg-gray-200" /></span>
                  <span className="window-controls"><span className="bg-red-400" /></span>
                </div>
              </div>
              <div className="relative w-36 h-36 rounded-full mx-auto border-4 border-[#6dbcdb] overflow-hidden shadow-lg">
                <Image
                  src={avatarUrl}
                  alt={profile?.full_name || "Avatar"}
                  fill
                  className="object-cover"
                  unoptimized={avatarUrl.includes("placehold.co")}
                />
              </div>
              <h3 className="font-display font-bold text-xl mt-3 text-[#1e5b85]">
                {profile?.full_name || "Nurzaliati Aulia"}
              </h3>
              <p className="text-sm text-[#6dbcdb] font-bold">Seniman Kaligrafi Arab ✨</p>
            </div>

            {/* Social Links */}
            <div className="retro-window-static p-4">
              <div className="window-header mb-3"><span>social_links.txt</span></div>
              <div className="flex flex-col gap-2">
                {profile?.instagram && (
                  <a href={`https://instagram.com/${profile.instagram.replace("@", "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-[#1e5b85] hover:text-[#6dbcdb] transition-colors">
                    <i className="fab fa-instagram w-5" /> {profile.instagram}
                  </a>
                )}
                {profile?.whatsapp && (
                  <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-[#1e5b85] hover:text-[#6dbcdb] transition-colors">
                    <i className="fab fa-whatsapp w-5" /> {profile.whatsapp}
                  </a>
                )}
                {profile?.tiktok && (
                  <a href={`https://tiktok.com/@${profile.tiktok.replace("@", "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-[#1e5b85] hover:text-[#6dbcdb] transition-colors">
                    <i className="fab fa-tiktok w-5" /> {profile.tiktok}
                  </a>
                )}
                {profile?.linkedin && (
                  <a href={`https://linkedin.com/in/${profile.linkedin}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-[#1e5b85] hover:text-[#6dbcdb] transition-colors">
                    <i className="fab fa-linkedin w-5" /> {profile.linkedin}
                  </a>
                )}
                {profile?.email && (
                  <a href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-sm font-bold text-[#1e5b85] hover:text-[#6dbcdb] transition-colors">
                    <i className="fas fa-envelope w-5" /> {profile.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio + Skills + Education + Experience */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Bio */}
            <div className="retro-window-static p-5">
              <div className="window-header mb-3"><span>bio.txt</span></div>
              <p className="text-[#1e5b85] leading-relaxed">
                {profile?.bio || "Seorang seniman kaligrafi Arab yang menggabungkan keindahan klasik dengan presentasi visual yang ceria! ✨"}
              </p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="retro-window-static p-5">
                <div className="window-header mb-3"><span>skills.json</span></div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id}
                      className="px-3 py-1 bg-[#c2eb96] border-2 border-[#1e5b85] rounded-full text-sm font-bold text-[#1e5b85]">
                      {skill.emoji} {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              {education.length > 0 && (
                <div className="retro-window-static p-5">
                  <div className="window-header mb-3"><span>education.log</span></div>
                  <div className="flex flex-col gap-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-4 border-[#c2eb96] pl-3">
                        <p className="font-bold text-sm text-[#1e5b85]">{edu.degree}</p>
                        <p className="text-xs text-[#6dbcdb]">{edu.institution}</p>
                        <p className="text-xs text-gray-500">{edu.year_start} – {edu.year_end}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <div className="retro-window-static p-5">
                  <div className="window-header mb-3"><span>experience.log</span></div>
                  <div className="flex flex-col gap-3">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-l-4 border-[#6dbcdb] pl-3">
                        <p className="font-bold text-sm text-[#1e5b85]">{exp.title}</p>
                        {exp.organization && <p className="text-xs text-[#6dbcdb]">{exp.organization}</p>}
                        <p className="text-xs text-gray-500">{exp.year_start} – {exp.year_end}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
