import { createClient } from "@/lib/supabase/server";
import { getAdminProductRows } from "@/lib/products";
import { getAdminOrders } from "@/lib/orders";

export type DashboardStats = {
  /** Tổng doanh thu từ đơn completed + shipping (VND). */
  totalRevenue: number;
  /** Tổng số đơn hàng. */
  ordersCount: number;
  /** Số đơn tạo trong ngày (theo giờ server). */
  ordersTodayCount: number;
  /** Tổng số khách hàng (bảng customers). */
  customersCount: number;
  /** Số sản phẩm đang low stock (tổng stock variant <= 10). */
  lowStockCount: number;
};

/**
 * Lấy số liệu tổng quan cho Admin Dashboard.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartISO = todayStart.toISOString();

  const [revenueRes, ordersCountRes, ordersTodayRes, customersCountRes] =
    await Promise.all([
      supabase
        .from("orders")
        .select("final_amount")
        .in("status", ["completed", "shipping"]),
      supabase.from("orders").select("id", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStartISO),
      supabase.from("customers").select("id", { count: "exact", head: true }),
    ]);

  const totalRevenue = (revenueRes.data ?? []).reduce(
    (sum, row) =>
      sum + Number((row as { final_amount: number }).final_amount ?? 0),
    0
  );
  const ordersCount = ordersCountRes.count ?? 0;
  const ordersTodayCount = ordersTodayRes.count ?? 0;
  const customersCount = customersCountRes.count ?? 0;

  const products = await getAdminProductRows();
  const lowStockCount = products.filter((p) => p.low_stock).length;

  return {
    totalRevenue,
    ordersCount,
    ordersTodayCount,
    customersCount,
    lowStockCount,
  };
}

export type DashboardRecentOrder = {
  id: number;
  orderId: string;
  customer: string;
  date: string;
  total: string;
  status: string;
};

const STATUS_DISPLAY: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipping: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

/**
 * Lấy danh sách đơn hàng gần nhất cho Dashboard (tối đa limit).
 */
export async function getDashboardRecentOrders(
  limit: number = 8
): Promise<DashboardRecentOrder[]> {
  const orders = await getAdminOrders();
  return orders.slice(0, limit).map((o) => ({
    id: o.id,
    orderId: `#ORD-${String(o.id).padStart(4, "0")}`,
    customer: o.recipient_name ?? "--",
    date: o.created_at
      ? new Date(o.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "--",
    total: `${Number(o.final_amount ?? o.total_amount ?? 0).toLocaleString("vi-VN")} đ`,
    status: STATUS_DISPLAY[o.status] ?? o.status,
  }));
}
