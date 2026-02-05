"use client";

import type { HomeCoupon } from "@/lib/coupons";

function formatDiscountDisplay(c: HomeCoupon): string {
  if (c.discount_type === "percentage") {
    return `${Number(c.discount_value)}%`;
  }
  const v = Number(c.discount_value);
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
  return `${v.toLocaleString("vi-VN")} đ`;
}

function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    if (typeof window !== "undefined") window.alert("Đã sao chép mã: " + code);
  });
}

type Props = { coupons: HomeCoupon[] };

export default function HomeCoupons({ coupons }: Props) {
  if (coupons.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="relative bg-white dark:bg-[#1f2937] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute top-0 left-0">
                <div className="bg-[#facc15] text-[#0e3c68] text-[10px] font-bold px-8 py-1 -rotate-45 -translate-x-8 translate-y-2 shadow-sm">
                  COUPON
                </div>
              </div>
              <div className="flex-1 p-4 pl-6 flex flex-col justify-between min-w-0">
                <div>
                  <p className="text-red-500 dark:text-red-400 text-xs font-medium mb-1">
                    Mã: {c.code}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="bg-[#1c5f21] text-white text-xs px-1.5 py-0.5 rounded font-bold">
                      Giảm
                    </span>
                    <span className="text-[#facc15] text-3xl font-bold italic tracking-tighter">
                      {formatDiscountDisplay(c)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {c.description?.trim() ||
                      (c.discount_type === "percentage"
                        ? `Giảm ${Number(c.discount_value)}% cho đơn hàng`
                        : `Giảm ${Number(c.discount_value).toLocaleString("vi-VN")} ₫ cho đơn hàng`)}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3 gap-2">
                  <a
                    href="/gio-hang"
                    className="text-xs text-[#1c5f21] dark:text-green-400 underline hover:no-underline shrink-0"
                  >
                    Điều kiện áp dụng
                  </a>
                  <button
                    type="button"
                    onClick={() => copyCode(c.code)}
                    className="bg-[#1c5f21] hover:bg-[#164d1b] text-white text-xs px-2 py-1 rounded transition-colors shrink-0"
                  >
                    Sao chép mã
                  </button>
                </div>
              </div>
              <div className="w-10 flex items-center justify-center bg-yellow-50 dark:bg-gray-800/50 shrink-0">
                <span
                  className="writing-vertical-rl rotate-180 text-[#facc15] font-bold text-sm tracking-widest uppercase"
                  style={{ writingMode: "vertical-rl" }}
                >
                  COUPON
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
