'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createArtwork(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get('image') as File | null;

  let image_url: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop();
    const path = `artworks/${Date.now()}.${ext}`;
    const { data: upload, error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(path, file);

    if (!uploadError && upload) {
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(upload.path);
      image_url = urlData.publicUrl;
    }
  }

  const { error } = await supabase.from('artworks').insert({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: (formData.get('date') as string) || null,
    image_url,
    sort_order: 0,
  });

  if (error) return { error: error.message };

  revalidatePath('/gallery');
  revalidatePath('/');
  revalidatePath('/admin/galeri');
  return { success: true };
}

export async function updateArtwork(id: string, formData: FormData) {
  const supabase = await createClient();
  const file = formData.get('image') as File | null;

  const updates: Record<string, unknown> = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: (formData.get('date') as string) || null,
    updated_at: new Date().toISOString(),
  };

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop();
    const path = `artworks/${Date.now()}.${ext}`;
    const { data: upload, error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(path, file);

    if (!uploadError && upload) {
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(upload.path);
      updates.image_url = urlData.publicUrl;
    }
  }

  const { error } = await supabase.from('artworks').update(updates).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/gallery');
  revalidatePath('/');
  revalidatePath('/admin/galeri');
  return { success: true };
}

export async function deleteArtwork(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('artworks').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/gallery');
  revalidatePath('/');
  revalidatePath('/admin/galeri');
  return { success: true };
}
