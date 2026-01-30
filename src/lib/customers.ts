import { createClient } from '@/lib/supabase/server'

export type AdminCustomerRow = {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string | null;
};

/**
 * Lấy danh sách khách hàng từ bảng customers (admin).
 */
export async function getAdminCustomerRows(): Promise<AdminCustomerRow[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('customers')
      .select('id, full_name, email, phone, address, created_at')
      .order('id', { ascending: false })

    if (error) return []
    return (data ?? []) as AdminCustomerRow[]
  } catch {
    return []
  }
}
