'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(id: string, formData: FormData) {
  const supabase = await createClient();

  const updates: Record<string, unknown> = {
    full_name: formData.get('full_name') as string,
    bio: formData.get('bio') as string,
    whatsapp: formData.get('whatsapp') as string,
    instagram: formData.get('instagram') as string,
    tiktok: formData.get('tiktok') as string,
    linkedin: formData.get('linkedin') as string,
    email: formData.get('email') as string,
    updated_at: new Date().toISOString(),
  };

  const avatarFile = formData.get('avatar') as File | null;
  if (avatarFile && avatarFile.size > 0) {
    const ext = avatarFile.name.split('.').pop();
    const path = `avatar/${Date.now()}.${ext}`;
    const { data: upload } = await supabase.storage
      .from('profile-images')
      .upload(path, avatarFile, { upsert: true });
    if (upload) {
      const { data } = supabase.storage.from('profile-images').getPublicUrl(upload.path);
      updates.avatar_url = data.publicUrl;
    }
  }

  const heroFile = formData.get('hero') as File | null;
  if (heroFile && heroFile.size > 0) {
    const ext = heroFile.name.split('.').pop();
    const path = `hero/${Date.now()}.${ext}`;
    const { data: upload } = await supabase.storage
      .from('profile-images')
      .upload(path, heroFile, { upsert: true });
    if (upload) {
      const { data } = supabase.storage.from('profile-images').getPublicUrl(upload.path);
      updates.hero_image_url = data.publicUrl;
    }
  }

  const { error } = await supabase.from('profile').update(updates).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/');
  revalidatePath('/admin/profil');
  return { success: true };
}
