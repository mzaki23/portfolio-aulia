"use client";

import { useState } from "react";
import { Skill, Education, Experience } from "@/lib/types";
import { updateSkills, addEducation, deleteEducation, addExperience, deleteExperience } from "@/lib/actions/resume";

interface Props {
  skills: Skill[];
  education: Education[];
  experience: Experience[];
}

export default function ResumeForm({ skills: initSkills, education: initEdu, experience: initExp }: Props) {
  const [skills, setSkills] = useState(initSkills.map((s) => ({ name: s.name, emoji: s.emoji })));
  const [education, setEducation] = useState(initEdu);
  const [experience, setExperience] = useState(initExp);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillEmoji, setNewSkillEmoji] = useState("🖌️");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSaveSkills() {
    await updateSkills(skills);
    showToast("Keahlian berhasil disimpan! ✨");
  }

  function addSkill() {
    if (!newSkill.trim()) return;
    setSkills([...skills, { name: newSkill.trim(), emoji: newSkillEmoji }]);
    setNewSkill("");
  }

  async function handleAddEdu(formData: FormData) {
    const result = await addEducation(formData);
    if (result?.error) showToast("Error: " + result.error);
    else {
      showToast("Pendidikan ditambahkan! 🎓");
      window.location.reload();
    }
  }

  async function handleDeleteEdu(id: string) {
    await deleteEducation(id);
    setEducation(education.filter((e) => e.id !== id));
    showToast("Pendidikan dihapus.");
  }

  async function handleAddExp(formData: FormData) {
    const result = await addExperience(formData);
    if (result?.error) showToast("Error: " + result.error);
    else {
      showToast("Pengalaman ditambahkan! 💼");
      window.location.reload();
    }
  }

  async function handleDeleteExp(id: string) {
    await deleteExperience(id);
    setExperience(experience.filter((e) => e.id !== id));
    showToast("Pengalaman dihapus.");
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills */}
        <div className="retro-window-static p-5">
          <div className="window-header mb-4"><span>skills.json</span></div>
          <div className="flex flex-col gap-2 mb-3">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 bg-[#c2eb96] border border-[#1e5b85] rounded-full px-3 py-1 text-sm font-bold text-[#1e5b85]">
                  {s.emoji} {s.name}
                </span>
                <button onClick={() => setSkills(skills.filter((_, j) => j !== i))}
                  className="text-red-400 hover:text-red-600 text-sm">✕</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-2">
            <input value={newSkillEmoji} onChange={(e) => setNewSkillEmoji(e.target.value)}
              className="retro-input w-14 text-center" placeholder="🖌️" maxLength={2} />
            <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
              className="retro-input flex-1" placeholder="Nama keahlian"
              onKeyDown={(e) => e.key === "Enter" && addSkill()} />
          </div>
          <button onClick={addSkill} className="retro-btn retro-btn-green border-[#1e5b85] text-sm w-full justify-center mb-3">
            <i className="fas fa-plus" /> Tambah
          </button>
          <button onClick={handleSaveSkills} className="retro-btn retro-btn-blue text-sm w-full justify-center">
            <i className="fas fa-save" /> Simpan Semua
          </button>
        </div>

        {/* Education */}
        <div className="retro-window-static p-5">
          <div className="window-header mb-4"><span>education.log</span></div>
          <div className="flex flex-col gap-2 mb-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-[#c2eb96] pl-3 flex justify-between items-start">
                <div>
                  <p className="font-bold text-sm text-[#1e5b85]">{edu.degree}</p>
                  <p className="text-xs text-[#6dbcdb]">{edu.institution}</p>
                  <p className="text-xs text-gray-400">{edu.year_start} – {edu.year_end}</p>
                </div>
                <button onClick={() => handleDeleteEdu(edu.id)} className="text-red-400 hover:text-red-600 text-sm ml-2 flex-shrink-0">✕</button>
              </div>
            ))}
          </div>
          <form action={handleAddEdu} className="flex flex-col gap-2">
            <input type="text" name="degree" className="retro-input" placeholder="Gelar / Program" required />
            <input type="text" name="institution" className="retro-input" placeholder="Institusi" required />
            <div className="flex gap-2">
              <input type="text" name="year_start" className="retro-input" placeholder="Dari" />
              <input type="text" name="year_end" className="retro-input" placeholder="Hingga" />
            </div>
            <button type="submit" className="retro-btn retro-btn-blue text-sm w-full justify-center">
              <i className="fas fa-plus" /> Tambah
            </button>
          </form>
        </div>

        {/* Experience */}
        <div className="retro-window-static p-5">
          <div className="window-header mb-4"><span>experience.log</span></div>
          <div className="flex flex-col gap-2 mb-4">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-[#6dbcdb] pl-3 flex justify-between items-start">
                <div>
                  <p className="font-bold text-sm text-[#1e5b85]">{exp.title}</p>
                  {exp.organization && <p className="text-xs text-[#6dbcdb]">{exp.organization}</p>}
                  <p className="text-xs text-gray-400">{exp.year_start} – {exp.year_end}</p>
                </div>
                <button onClick={() => handleDeleteExp(exp.id)} className="text-red-400 hover:text-red-600 text-sm ml-2 flex-shrink-0">✕</button>
              </div>
            ))}
          </div>
          <form action={handleAddExp} className="flex flex-col gap-2">
            <input type="text" name="title" className="retro-input" placeholder="Posisi / Kegiatan" required />
            <input type="text" name="organization" className="retro-input" placeholder="Organisasi / Tempat" />
            <div className="flex gap-2">
              <input type="text" name="year_start" className="retro-input" placeholder="Dari" />
              <input type="text" name="year_end" className="retro-input" placeholder="Hingga" />
            </div>
            <button type="submit" className="retro-btn retro-btn-blue text-sm w-full justify-center">
              <i className="fas fa-plus" /> Tambah
            </button>
          </form>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
