import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type CartItemForOrder = {
  id: number;
  variant_id: number;
  quantity: number;
  product_variants: { price: number } | null;
};

/**
 * Tạo đơn hàng từ giỏ hiện tại của user (sau khi thanh toán PayOS thành công).
 * Lấy cart items, tạo order + order_items, xóa cart_items.
 */
export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    const { data: cart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!cart?.id) {
      return NextResponse.json(
        { error: "Không có giỏ hàng" },
        { status: 400 }
      );
    }

    const { data: rawItems, error: itemsError } = await supabase
      .from("cart_items")
      .select("id, variant_id, quantity, product_variants(price)")
      .eq("cart_id", cart.id);

    if (itemsError || !rawItems?.length) {
      return NextResponse.json(
        { error: "Giỏ hàng trống" },
        { status: 400 }
      );
    }

    const items = rawItems as unknown as CartItemForOrder[];
    let totalAmount = 0;
    const orderItemsInput: Array<{
      variant_id: number;
      quantity: number;
      price_at_purchase: number;
    }> = [];
    for (const row of items) {
      const price = Number(row.product_variants?.price ?? 0);
      totalAmount += price * row.quantity;
      orderItemsInput.push({
        variant_id: row.variant_id,
        quantity: row.quantity,
        price_at_purchase: price,
      });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, phone_number, address")
      .eq("id", user.id)
      .single();

    const recipientName =
      (profile as { full_name?: string } | null)?.full_name?.trim() ||
      "Khách hàng";
    const recipientPhone =
      (profile as { phone_number?: string } | null)?.phone_number?.trim() || "";
    const shippingAddress =
      (profile as { address?: string } | null)?.address?.trim() ||
      "Chưa cập nhật";

    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        recipient_name: recipientName,
        recipient_phone: recipientPhone,
        shipping_address: shippingAddress,
        total_amount: totalAmount,
        shipping_fee: 0,
        final_amount: totalAmount,
        status: "pending",
        payment_method: "payos",
      })
      .select("id")
      .single();

    if (orderError || !newOrder?.id) {
      console.error("[orders/from-cart] order insert", orderError);
      return NextResponse.json(
        { error: "Không tạo được đơn hàng" },
        { status: 500 }
      );
    }

    const orderId = newOrder.id as number;
    const { error: itemsInsertError } = await supabase.from("order_items").insert(
      orderItemsInput.map((item) => ({
        order_id: orderId,
        variant_id: item.variant_id,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase,
      }))
    );

    if (itemsInsertError) {
      console.error("[orders/from-cart] order_items insert", itemsInsertError);
      return NextResponse.json(
        { error: "Không tạo được chi tiết đơn hàng" },
        { status: 500 }
      );
    }

    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", cart.id);

    if (deleteError) {
      console.error("[orders/from-cart] cart_items delete", deleteError);
      // Order already created, still return success
    }

    return NextResponse.json({ orderId });
  } catch (err) {
    console.error("[orders/from-cart]", err);
    return NextResponse.json(
      { error: "Lỗi tạo đơn hàng" },
      { status: 500 }
    );
  }
}
