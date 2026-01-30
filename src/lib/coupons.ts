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
