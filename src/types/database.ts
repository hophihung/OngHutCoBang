/**
 * Types cho bảng Supabase.
 * Điều chỉnh theo đúng schema trong Supabase Dashboard nếu khác.
 */

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  slug: string | null;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string | null;
  created_at?: string;
};
