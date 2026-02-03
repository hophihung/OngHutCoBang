"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { clearGuestCart } from "@/lib/guestCart";

export default function GuestOrderSuccess() {
  const searchParams = useSearchParams();
  const { setCartCount } = useCart();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (searchParams.get("payos") !== "success" || clearedRef.current) return;
    clearedRef.current = true;
    clearGuestCart();
    setCartCount(0);
  }, [searchParams, setCartCount]);

  const orderId = searchParams.get("order_id");

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full rounded-xl bg-white dark:bg-[#1e1e1e] shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c5f21]/10 text-[#1c5f21] mb-6">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h1 className="text-slate-900 dark:text-white text-2xl font-bold mb-2">
          Đặt hàng thành công
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
          Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
          {orderId && (
            <span className="block mt-2 font-medium text-slate-700 dark:text-slate-300">
              Mã đơn hàng: #{orderId}
            </span>
          )}
        </p>
        <Link
          href="/cua-hang"
          className="inline-flex items-center gap-2 bg-[#1c5f21] hover:bg-[#164d1b] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
}
