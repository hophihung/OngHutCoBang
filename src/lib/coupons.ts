import { createClient } from '@/lib/supabase/server'

export type AdminCouponRow = {
  id: number;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  usage_limit: number | null;
  usage_count: number;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  created_at: string | null;
};

/**
 * Lấy danh sách coupon từ Supabase (admin).
 */
export async function getAdminCoupons(): Promise<AdminCouponRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('coupons')
      .select('id, code, description, discount_type, discount_value, usage_limit, usage_count, start_date, end_date, is_active, created_at')
      .order('id', { ascending: false })

    if (error) return []
    return (data ?? []) as AdminCouponRow[]
  } catch {
    return []
  }
}

/**
 * Coupon hiển thị trên trang chủ (chỉ active, trong thời hạn).
 */
export type HomeCoupon = {
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
};

/**
 * Lấy danh sách coupon đang active để hiển thị trên trang chủ.
 * Điều kiện: is_active = true, start_date <= hôm nay (hoặc null), end_date >= hôm nay (hoặc null).
 * Cần bật policy "Public read active coupons" trên bảng coupons (xem supabase/coupons-public-read.sql).
 */
export async function getActiveCouponsForHome(): Promise<HomeCoupon[]> {
  try {
    const supabase = await createClient()
    const today = new Date().toISOString().slice(0, 10)
    const { data, error } = await supabase
      .from('coupons')
      .select('code, description, discount_type, discount_value, start_date, end_date')
      .eq('is_active', true)
      .order('id', { ascending: false })
      .limit(20)

    if (error) return []
    const rows = (data ?? []) as (HomeCoupon & { start_date: string | null; end_date: string | null })[]
    return rows
      .filter((r) => {
        if (r.start_date && r.start_date > today) return false
        if (r.end_date && r.end_date < today) return false
        return true
      })
      .map(({ code, description, discount_type, discount_value }) => ({
        code,
        description,
        discount_type,
        discount_value,
      }))
      .slice(0, 12)
  } catch {
    return []
  }
}

/**
 * Lấy một coupon theo id (admin).
 */
export async function getAdminCouponById(id: number): Promise<AdminCouponRow | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('coupons')
      .select('id, code, description, discount_type, discount_value, usage_limit, usage_count, start_date, end_date, is_active, created_at')
      .eq('id', id)
      .maybeSingle()

    if (error || !data) return null
    return data as AdminCouponRow
  } catch {
    return null
  }
}
