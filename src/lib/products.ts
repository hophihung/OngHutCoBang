import { createClient } from '@/lib/supabase/server'

/** Sản phẩm cho trang chủ / Featured (id, name, description, price từ variant, base_image_url). */
export type FeaturedProduct = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

/** Hàng bảng admin: sản phẩm + category + 1 variant (sku, price, stock). */
export type AdminProductRow = {
  id: number;
  name: string;
  description: string | null;
  base_image_url: string | null;
  is_active: boolean;
  category_name: string | null;
  sku: string | null;
  price: string | null;
  stock: number | null;
  stock_label?: string;
  low_stock?: boolean;
};

/** Sản phẩm cho trang cửa hàng (grid). */
export type StoreProduct = {
  id: number;
  name: string;
  description: string | null;
  base_image_url: string | null;
  price: number | null;
  badge: string | null;
};

/**
 * Lấy sản phẩm nổi bật từ Supabase (tối đa 4, is_active = true).
 * Giá lấy từ min(price) của product_variants.
 */
export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    const supabase = await createClient()
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, base_image_url, created_at')
      .eq('is_active', true)
      .limit(4)
      .order('created_at', { ascending: false })

    if (error || !products?.length) return []

    const ids = products.map((p) => p.id)
    const { data: variants } = await supabase
      .from('product_variants')
      .select('product_id, price')
      .in('product_id', ids)

    const minPriceByProduct: Record<number, number> = {}
    variants?.forEach((v) => {
      const pid = v.product_id
      const p = Number(v.price)
      if (minPriceByProduct[pid] == null || p < minPriceByProduct[pid])
        minPriceByProduct[pid] = p
    })

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? null,
      price: minPriceByProduct[p.id] ?? 0,
      image_url: p.base_image_url ?? null,
    }))
  } catch {
    return []
  }
}

/**
 * Lấy danh sách sản phẩm cho admin (products + category + first variant sku/price/stock).
 */
export async function getAdminProductRows(): Promise<AdminProductRow[]> {
  try {
    const supabase = await createClient()
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, base_image_url, is_active, category_id')
      .order('id', { ascending: false })

    if (error || !products?.length) return []

    const categoryIds = [...new Set(products.map((p) => p.category_id).filter(Boolean))] as number[]
    const { data: categories } = categoryIds.length
      ? await supabase.from('categories').select('id, name').in('id', categoryIds)
      : { data: [] }
    const catMap = new Map((categories ?? []).map((c) => [c.id, c.name]))

    const { data: variants } = await supabase
      .from('product_variants')
      .select('product_id, sku, price, stock_quantity')
      .in('product_id', products.map((p) => p.id))

    const byProduct = new Map<number, { sku: string; price: number; stock_quantity: number }[]>()
    variants?.forEach((v) => {
      const list = byProduct.get(v.product_id) ?? []
      list.push({
        sku: v.sku ?? '',
        price: Number(v.price),
        stock_quantity: v.stock_quantity ?? 0,
      })
      byProduct.set(v.product_id, list)
    })

    return products.map((p) => {
      const list = byProduct.get(p.id) ?? []
      const first = list[0]
      const totalStock = list.reduce((s, x) => s + x.stock_quantity, 0)
      const lowStock = totalStock > 0 && totalStock <= 10
      return {
        id: p.id,
        name: p.name,
        description: p.description ?? null,
        base_image_url: p.base_image_url ?? null,
        is_active: p.is_active ?? true,
        category_name: p.category_id ? (catMap.get(p.category_id) ?? null) : null,
        sku: first?.sku ?? null,
        price: first != null ? `$${Number(first.price).toFixed(2)}` : null,
        stock: list.length ? totalStock : null,
        stock_label: lowStock ? `${totalStock} Left` : list.length ? undefined : '--',
        low_stock: lowStock,
      }
    })
  } catch {
    return []
  }
}

/**
 * Lấy sản phẩm cho trang cửa hàng (is_active = true, giá min từ variants).
 */
export async function getStoreProducts(): Promise<StoreProduct[]> {
  try {
    const supabase = await createClient()
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description, base_image_url, created_at')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error || !products?.length) return []

    const ids = products.map((p) => p.id)
    const { data: variants } = await supabase
      .from('product_variants')
      .select('product_id, price')
      .in('product_id', ids)

    const minPriceByProduct: Record<number, number> = {}
    variants?.forEach((v) => {
      const pid = v.product_id
      const p = Number(v.price)
      if (minPriceByProduct[pid] == null || p < minPriceByProduct[pid])
        minPriceByProduct[pid] = p
    })

    return products.map((p, i) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? null,
      base_image_url: p.base_image_url ?? null,
      price: minPriceByProduct[p.id] ?? null,
      badge: i === 0 ? 'Bestseller' : i < 3 ? 'New' : null,
    }))
  } catch {
    return []
  }
}
