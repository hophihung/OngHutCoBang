import { NextRequest, NextResponse } from "next/server";
import { PayOS } from "@payos/node";

/** Tỷ giá USD -> VND (PayOS dùng VND) */
const USD_TO_VND = 25_000;

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto === "https" ? "https" : "http"}://${host}`;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export type CreateLinkBody = {
  /** Giỏ hàng: giá đang dùng đơn vị USD (sẽ quy đổi sang VND) */
  items: Array<{ name: string; quantity: number; price: number }>;
};

export async function POST(req: NextRequest) {
  try {
    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

    if (!clientId || !apiKey || !checksumKey) {
      return NextResponse.json(
        { error: "PayOS chưa được cấu hình (thiếu PAYOS_CLIENT_ID / API_KEY / CHECKSUM_KEY)" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as CreateLinkBody;
    if (!body?.items?.length) {
      return NextResponse.json(
        { error: "Giỏ hàng trống" },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(req);
    const returnUrl = `${baseUrl}/gio-hang?payos=success`;
    const cancelUrl = `${baseUrl}/gio-hang?payos=cancel`;

    const itemsVND = body.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: Math.round(item.price * USD_TO_VND),
    }));

    const amountVND = itemsVND.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (amountVND < 1000) {
      return NextResponse.json(
        { error: "Tổng đơn hàng tối thiểu 1.000 VND" },
        { status: 400 }
      );
    }

    const orderCode = Math.floor(Date.now() % 900000000) + 100000000;

    const payos = new PayOS({
      clientId,
      apiKey,
      checksumKey,
    });

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
      orderCode: result.orderCode,
      amount: result.amount,
    });
  } catch (err) {
    console.error("[PayOS create-link]", err);
    const message = err instanceof Error ? err.message : "Lỗi tạo link thanh toán";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
