export interface Profile {
  id: string;
  full_name: string;
  bio: string | null;
  avatar_url: string | null;
  hero_image_url: string | null;
  whatsapp: string | null;
  instagram: string | null;
  tiktok: string | null;
  linkedin: string | null;
  email: string | null;
  updated_at: string;
}

export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  emoji: string;
  sort_order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year_start: string | null;
  year_end: string | null;
  sort_order: number;
}

export interface Experience {
  id: string;
  title: string;
  organization: string | null;
  year_start: string | null;
  year_end: string | null;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
}
