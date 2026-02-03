import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PayOS } from "@payos/node";
import { appendFileSync } from "fs";
import { join } from "path";

const DEBUG_LOG_PATH = join(process.cwd(), ".cursor", "debug.log");
function debugLog(location: string, message: string, data: Record<string, unknown>, hypothesisId: string) {
  try {
    appendFileSync(
      DEBUG_LOG_PATH,
      JSON.stringify({ location, message, data, timestamp: Date.now(), sessionId: "debug-session", hypothesisId }) + "\n"
    );
  } catch (_) {}
}

/** DB stores price in VND; PayOS uses VND. */

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto === "https" ? "https" : "http"}://${host}`;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

type GuestCheckoutBody = {
  items: Array<{ variant_id: number; quantity: number }>;
  customer_info: {
    name: string;
    phone: string;
    address: string;
    email?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GuestCheckoutBody;
    const { items, customer_info } = body;
    // #region agent log
    console.log("[checkout/guest] request body:", { customer_info, items });
    debugLog("checkout/guest/route.ts:POST", "entry", { customer_info, items }, "H4");
    // #endregion

    if (!items?.length || !customer_info) {
      return NextResponse.json(
        { error: "Thiếu items hoặc customer_info" },
        { status: 400 }
      );
    }

    const name = customer_info.name?.trim();
    const phone = customer_info.phone?.trim();
    const address = customer_info.address?.trim();
    if (!name || !phone || !address) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ" },
        { status: 400 }
      );
    }

    const variantIds = [...new Set(items.map((i) => i.variant_id))];
    const supabase = createAdminClient();

    const { data: variants, error: variantsError } = await supabase
      .from("product_variants")
      .select("id, price, variant_name, products(name)")
      .in("id", variantIds);

    // #region agent log
    debugLog("checkout/guest/route.ts:variants", "after variants query", {
      variantsError: variantsError ? { message: variantsError.message, code: variantsError.code } : null,
      variantsLength: variants?.length ?? 0,
    }, "H4");
    // #endregion

    if (variantsError || !variants?.length) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm hợp lệ" },
        { status: 400 }
      );
    }

    type VariantRow = { id: number; price: number | string; variant_name: string | null; products: { name: string } | null };
    const variantMap = new Map(
      (variants as unknown as VariantRow[]).map(
        (v) => [
          v.id,
          {
            price: Number(v.price ?? 0),
            name: v.products?.name ?? v.variant_name ?? "Product",
          },
        ]
      )
    );

    let totalAmount = 0;
    const orderItemsInput: Array<{
      variant_id: number;
      quantity: number;
      price_at_purchase: number;
    }> = [];
    const payosItems: Array<{ name: string; quantity: number; price: number }> = [];

    for (const item of items) {
      const info = variantMap.get(item.variant_id);
      if (!info || item.quantity < 1) continue;
      const price = info.price;
      totalAmount += price * item.quantity;
      orderItemsInput.push({
        variant_id: item.variant_id,
        quantity: item.quantity,
        price_at_purchase: price,
      });
      payosItems.push({
        name: info.name,
        quantity: item.quantity,
        price: Math.round(price),
      });
    }

    if (orderItemsInput.length === 0) {
      return NextResponse.json(
        { error: "Giỏ hàng trống hoặc sản phẩm không hợp lệ" },
        { status: 400 }
      );
    }

    const amountVND = Math.round(totalAmount);
    if (amountVND < 1000) {
      return NextResponse.json(
        { error: "Tổng đơn hàng tối thiểu 1.000 VND" },
        { status: 400 }
      );
    }

    const orderData = {
      user_id: null,
      recipient_name: name,
      recipient_phone: phone,
      shipping_address: address,
      total_amount: totalAmount,
      shipping_fee: 0,
      final_amount: totalAmount,
      status: "pending",
      payment_method: "payos",
    };
    // #region agent log
    console.log("[checkout/guest] order payload:", orderData);
    debugLog("checkout/guest/route.ts:before order insert", "before order insert", { orderData, orderItemsInput }, "H1,H2");
    // #endregion

    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert(orderData)
      .select("id")
      .single();

    // #region agent log
    debugLog("checkout/guest/route.ts:after order insert", "after order insert", {
      orderError: orderError ? { message: orderError.message, code: orderError.code, details: orderError.details } : null,
      newOrderId: newOrder?.id ?? null,
    }, "H1,H2");
    // #endregion

    if (orderError || !newOrder?.id) {
      console.error("[checkout/guest] order insert full error:", JSON.stringify(orderError, null, 2));
      console.error("[checkout/guest] order insert", orderError);
      return NextResponse.json(
        { error: "Không tạo được đơn hàng" },
        { status: 500 }
      );
    }

    const orderId = newOrder.id as number;
    const { error: itemsError } = await supabase.from("order_items").insert(
      orderItemsInput.map((row) => ({
        order_id: orderId,
        variant_id: row.variant_id,
        quantity: row.quantity,
        price_at_purchase: row.price_at_purchase,
      }))
    );

    // #region agent log
    debugLog("checkout/guest/route.ts:order_items", "after order_items insert", {
      itemsError: itemsError ? { message: itemsError.message, code: itemsError.code } : null,
    }, "H3");
    // #endregion

    if (itemsError) {
      console.error("[checkout/guest] order_items insert full error:", JSON.stringify(itemsError, null, 2));
      console.error("[checkout/guest] order_items insert", itemsError);
      return NextResponse.json(
        { error: "Không tạo được chi tiết đơn hàng" },
        { status: 500 }
      );
    }

    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
    // #region agent log
    debugLog("checkout/guest/route.ts:payos", "PayOS env check", { hasClientId: !!clientId, hasApiKey: !!apiKey, hasChecksumKey: !!checksumKey }, "H5");
    // #endregion
    if (!clientId || !apiKey || !checksumKey) {
      return NextResponse.json(
        { error: "PayOS chưa được cấu hình" },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const returnUrl = `${baseUrl}/dat-hang-thanh-cong?payos=success&order_id=${orderId}`;
    const cancelUrl = `${baseUrl}/gio-hang?payos=cancel`;

    const itemsVND = payosItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderCode = Math.floor(Date.now() % 900000000) + 100000000;
    const payos = new PayOS({ clientId, apiKey, checksumKey });
    const result = await payos.paymentRequests.create({
      orderCode,
      amount: amountVND,
      description: "Ong Hut Co Bang",
      returnUrl,
      cancelUrl,
      items: itemsVND,
    });

    return NextResponse.json({
      checkoutUrl: result.checkoutUrl,
      orderId,
    });
  } catch (err) {
    const errPayload = err instanceof Error
      ? { message: err.message, name: err.name, stack: err.stack }
      : { raw: String(err) };
    // #region agent log
    console.error("[checkout/guest] catch full error:", JSON.stringify(errPayload, null, 2));
    debugLog("checkout/guest/route.ts:catch", "catch block", errPayload, "H5");
    // #endregion
    console.error("[checkout/guest]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lỗi thanh toán" },
      { status: 500 }
    );
  }
}
