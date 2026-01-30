import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types/database'

/**
 * Lấy sản phẩm nổi bật từ Supabase (tối đa 4).
 * Nếu chưa có bảng products hoặc lỗi, trả về [].
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, image_url, slug, is_featured, created_at')
      .eq('is_featured', true)
      .limit(4)
      .order('created_at', { ascending: false })

    if (error) return []
    if (!data?.length) {
      // Fallback: lấy 4 sản phẩm mới nhất nếu không có is_featured
      const { data: fallback } = await supabase
        .from('products')
        .select('id, name, description, price, image_url, slug, is_featured, created_at')
        .limit(4)
        .order('created_at', { ascending: false })
      return (fallback as Product[]) ?? []
    }
    return data as Product[]
  } catch {
    return []
  }
}
