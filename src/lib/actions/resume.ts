'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSkills(skills: { name: string; emoji: string }[]) {
  const supabase = await createClient();
  await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (skills.length > 0) {
    const rows = skills.map((s, i) => ({ name: s.name, emoji: s.emoji, sort_order: i }));
    await supabase.from('skills').insert(rows);
  }
  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true };
}

export async function addEducation(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('education').insert({
    degree: formData.get('degree') as string,
    institution: formData.get('institution') as string,
    year_start: formData.get('year_start') as string,
    year_end: formData.get('year_end') as string,
    sort_order: 0,
  });
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true };
}

export async function deleteEducation(id: string) {
  const supabase = await createClient();
  await supabase.from('education').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true };
}

export async function addExperience(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('experience').insert({
    title: formData.get('title') as string,
    organization: formData.get('organization') as string,
    year_start: formData.get('year_start') as string,
    year_end: formData.get('year_end') as string,
    sort_order: 0,
  });
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  await supabase.from('experience').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/resume');
  return { success: true };
}
