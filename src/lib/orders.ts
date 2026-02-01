import { createClient } from "@/lib/supabase/server";

export type AdminOrderRow = {
  id: number;
  user_id: string;
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  total_amount: number;
  shipping_fee: number;
  final_amount: number;
  status: string;
  payment_method: string | null;
  note: string | null;
  created_at: string;
};

export type OrderItemWithProduct = {
  id: number;
  order_id: number;
  variant_id: number | null;
  quantity: number;
  price_at_purchase: number;
  product_variants: {
    id: number;
    variant_name: string | null;
    sku: string | null;
    image_url: string | null;
    products: { name: string; base_image_url: string | null } | null;
  } | null;
};

/**
 * Lấy tất cả đơn hàng cho admin (RLS: user phải có role admin).
 */
export async function getAdminOrders(): Promise<AdminOrderRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, recipient_name, recipient_phone, shipping_address, total_amount, shipping_fee, final_amount, status, payment_method, note, created_at"
    )
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as unknown as AdminOrderRow[]).map((row) => ({
    ...row,
    total_amount: Number(row.total_amount),
    shipping_fee: Number(row.shipping_fee ?? 0),
    final_amount: Number(row.final_amount),
  }));
}

export type AdminOrderDetail = AdminOrderRow & {
  order_items: Array<{
    id: number;
    quantity: number;
    price_at_purchase: number;
    name: string;
    sku: string | null;
    image_url: string | null;
  }>;
};

/**
 * Lấy một đơn hàng và chi tiết items cho admin (theo id số).
 */
export async function getAdminOrderById(
  orderId: number
): Promise<AdminOrderDetail | null> {
  const supabase = await createClient();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) return null;

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select(
      "id, variant_id, quantity, price_at_purchase, product_variants(variant_name, sku, image_url, products(name, base_image_url))"
    )
    .eq("order_id", orderId);

  const orderItems = (items ?? []) as unknown as OrderItemWithProduct[];
  const mappedItems = orderItems.map((row) => {
    const v = row.product_variants;
    const name = v?.products?.name ?? v?.variant_name ?? "Product";
    const sku = v?.sku ?? null;
    const image_url = v?.image_url ?? v?.products?.base_image_url ?? null;
    return {
      id: row.id,
      quantity: row.quantity,
      price_at_purchase: Number(row.price_at_purchase),
      name,
      sku,
      image_url,
    };
  });

  return {
    id: order.id,
    user_id: order.user_id,
    recipient_name: order.recipient_name,
    recipient_phone: order.recipient_phone,
    shipping_address: order.shipping_address,
    total_amount: Number(order.total_amount),
    shipping_fee: Number(order.shipping_fee ?? 0),
    final_amount: Number(order.final_amount),
    status: order.status ?? "pending",
    payment_method: order.payment_method ?? null,
    note: order.note ?? null,
    created_at: order.created_at,
    order_items: mappedItems,
  };
}
