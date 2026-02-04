import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/database";

export type GetBlogPostsOptions = {
  status?: "draft" | "published" | null;
  limit?: number;
  offset?: number;
};

/**
 * Đếm số bài (theo status nếu truyền). Dùng cho pagination.
 */
export async function getBlogPostsCount(
  status?: "draft" | "published" | null
): Promise<number> {
  const supabase = await createClient();
  let query = supabase.from("blog_posts").select("id", { count: "exact", head: true });
  if (status) query = query.eq("status", status);
  const { count, error } = await query;
  if (error) return 0;
  return count ?? 0;
}

/**
 * Lấy danh sách bài viết. Admin (authenticated + role admin) lấy được tất cả;
 * không truyền status hoặc status = 'published' cho public.
 */
export async function getBlogPosts(
  options: GetBlogPostsOptions = {}
): Promise<BlogPost[]> {
  const { status = null, limit = 50, offset = 0 } = options;
  const supabase = await createClient();
  let query = supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, body, category, image_url, author, status, created_at, updated_at")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (status) {
    query = query.eq("status", status);
  }
  const { data, error } = await query;
  if (error || !data) return [];
  return data as BlogPost[];
}

/**
 * Lấy một bài theo slug (chỉ bài published; dùng cho trang blog public).
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, body, category, image_url, author, status, created_at, updated_at")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error || !data) return null;
  return data as BlogPost;
}

/**
 * Lấy một bài theo id (cho admin edit; không lọc status).
 */
export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, body, category, image_url, author, status, created_at, updated_at")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as BlogPost;
}

export type BlogPostInsert = {
  slug: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  category?: string | null;
  image_url?: string | null;
  author?: string | null;
  status?: "draft" | "published";
};
