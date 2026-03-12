import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type CarouselRow = {
  id: string;
  image_url: string;
  link: string | null;
  alt: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type MySiteItemRow = {
  id: string;
  label: string;
  image_url: string;
  link: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type GameRow = {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  badge: string | null;
  badge_color: string | null;
  link: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type ToolSectionRow = {
  id: string;
  title: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type ToolCardRow = {
  id: string;
  section_id: string;
  icon_url: string;
  title: string;
  subtitle: string;
  bg_color: string;
  link: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type BottomNavRow = {
  id: string;
  label: string;
  icon_default: string;
  icon_active: string;
  route_path: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type PageSettingRow = {
  key: string;
  value: unknown;
  updated_at?: string;
};

export type ActivityRow = {
  id: string;
  title: string;
  subtitle: string;
  icon_url: string;
  link: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type AdultItemRow = {
  id: string;
  name: string;
  icon_url: string;
  link: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};
