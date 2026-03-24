'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addCategory(formData: FormData) {
  const supabase = await createClient();
  const name = (formData.get('name') as string).trim();
  if (!name) return { error: 'Nama kategori tidak boleh kosong.' };

  const { error } = await supabase.from('categories').insert({ name, sort_order: 0 });
  if (error) return { error: error.code === '23505' ? 'Kategori sudah ada.' : error.message };

  revalidatePath('/gallery');
  revalidatePath('/admin/galeri');
  return { success: true };
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/gallery');
  revalidatePath('/admin/galeri');
  return { success: true };
}
