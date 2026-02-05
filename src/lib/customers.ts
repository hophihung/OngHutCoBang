import { createClient } from '@/lib/supabase/server'

export type AdminCustomerRow = {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string | null;
  /** Số đơn hàng khớp theo phone (và email nếu orders có recipient_email). */
  ordersCount: number;
  /** Tổng tiền từ các đơn khớp (VND). */
  totalSpent: number;
};

type OrderRow = {
  id: number;
  total_amount: number;
  recipient_phone: string | null;
};

/** Chuẩn hóa phone để so sánh: trim, chỉ giữ chữ số. */
function normalizePhone(phone: string | null | undefined): string {
  if (phone == null || typeof phone !== 'string') return ''
  return phone.trim().replace(/\D/g, '') || ''
}

/**
 * Lấy danh sách khách hàng từ bảng customers (admin), kèm số đơn và tổng chi tiêu
 * bằng cách khớp đơn hàng theo recipient_phone (chuẩn hóa: chỉ so sánh chữ số).
 */
export async function getAdminCustomerRows(): Promise<AdminCustomerRow[]> {
  try {
    const supabase = await createClient()

    const [customersRes, ordersRes] = await Promise.all([
      supabase
        .from('customers')
        .select('id, full_name, email, phone, address, created_at')
        .order('id', { ascending: false }),
      supabase
        .from('orders')
        .select('id, total_amount, recipient_phone'),
    ])

    if (customersRes.error) return []
    const customers = (customersRes.data ?? []) as Omit<AdminCustomerRow, 'ordersCount' | 'totalSpent'>[]
    const orders = (ordersRes.data ?? []) as OrderRow[]

    return customers.map((c) => {
      const cPhone = normalizePhone(c.phone)
      const matchingOrders = orders.filter((o) => {
        const oPhone = normalizePhone(o.recipient_phone)
        return cPhone && oPhone && cPhone === oPhone
      })
      const ordersCount = matchingOrders.length
      const totalSpent = matchingOrders.reduce((sum, o) => sum + Number(o.total_amount ?? 0), 0)
      return {
        ...c,
        ordersCount,
        totalSpent,
      }
    })
  } catch {
    return []
  }
}

/**
 * Lấy một khách hàng theo id từ bảng customers (admin), kèm ordersCount và totalSpent (khớp theo phone).
 */
export async function getAdminCustomerById(id: number): Promise<AdminCustomerRow | null> {
  try {
    const supabase = await createClient()
    const [customerRes, ordersRes] = await Promise.all([
      supabase
        .from('customers')
        .select('id, full_name, email, phone, address, created_at')
        .eq('id', id)
        .maybeSingle(),
      supabase.from('orders').select('id, total_amount, recipient_phone'),
    ])

    if (customerRes.error || !customerRes.data) return null
    const c = customerRes.data as Omit<AdminCustomerRow, 'ordersCount' | 'totalSpent'>
    const orders = (ordersRes.data ?? []) as OrderRow[]
    const cPhone = normalizePhone(c.phone)
    const matchingOrders = orders.filter((o) => {
      const oPhone = normalizePhone(o.recipient_phone)
      return cPhone && oPhone && cPhone === oPhone
    })
    const ordersCount = matchingOrders.length
    const totalSpent = matchingOrders.reduce((sum, o) => sum + Number(o.total_amount ?? 0), 0)
    return { ...c, ordersCount, totalSpent }
  } catch {
    return null
  }
}
