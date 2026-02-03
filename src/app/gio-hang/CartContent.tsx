"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/contexts/CartContext";
import {
  getOrCreateCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  type CartItemDisplay,
} from "@/lib/cart";
import {
  getGuestCart,
  setGuestCart,
  getGuestCartCount,
} from "@/lib/guestCart";

/** PayOS API expects price in USD; DB may store VND. */
const VND_TO_USD = 1 / 25_000;

type CartRow = CartItemDisplay & { variant_id: number };

export default function CartContent() {
  const { setCartCount } = useCart();
  const [items, setItems] = useState<CartRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [payosLoading, setPayosLoading] = useState(false);
  const [payosError, setPayosError] = useState<string | null>(null);

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const fetchItems = useCallback(async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      setIsGuest(true);
      const guestItems = getGuestCart();
      if (guestItems.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }
      const ids = guestItems.map((i) => i.variantId).join(",");
      const res = await fetch(`/api/variants?ids=${ids}`);
      const variants = (await res.json()) as Array<{
        variant_id: number;
        name: string;
        price: number;
        image: string | null;
      }>;
      const variantMap = new Map(variants.map((v) => [v.variant_id, v]));
      const rows: CartRow[] = guestItems
        .filter((gi) => variantMap.has(gi.variantId))
        .map((gi) => {
          const v = variantMap.get(gi.variantId)!;
          return {
            id: gi.variantId,
            variant_id: gi.variantId,
            quantity: gi.quantity,
            name: v.name,
            price: v.price,
            image: v.image,
          };
        });
      setItems(rows);
      setLoading(false);
      return;
    }
    setIsGuest(false);
    const cartId = await getOrCreateCart(session.user.id);
    if (!cartId) {
      setItems([]);
      setLoading(false);
      return;
    }
    const list = await getCartItems(cartId);
    setItems(
      list.map((i) => ({ ...i, variant_id: i.variant_id }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchItems();
    });
    return () => subscription.unsubscribe();
  }, [fetchItems]);

  const handlePayOSCheckout = async () => {
    if (items.length === 0) return;
    setPayosError(null);
    setPayosLoading(true);
    try {
      if (isGuest) {
        if (!guestName.trim() || !guestPhone.trim() || !guestAddress.trim()) {
          setPayosError("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ.");
          setPayosLoading(false);
          return;
        }
        const res = await fetch("/api/checkout/guest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ variant_id: i.variant_id, quantity: i.quantity })),
            customer_info: {
              name: guestName.trim(),
              phone: guestPhone.trim(),
              address: guestAddress.trim(),
              email: guestEmail.trim() || undefined,
            },
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setPayosError(data.error ?? "Không tạo được link thanh toán");
          setPayosLoading(false);
          return;
        }
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }
        setPayosError("Link thanh toán không hợp lệ");
        setPayosLoading(false);
        return;
      }
      const res = await fetch("/api/payos/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: i.price * VND_TO_USD,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPayosError(data.error ?? "Không tạo được link thanh toán");
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setPayosError("Link thanh toán không hợp lệ");
    } catch {
      setPayosError("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setPayosLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, delta: number) => {
    const item = items.find((i) => i.id === cartItemId);
    if (!item) return;
    const newQty = Math.max(0, item.quantity + delta);
    if (isGuest) {
      const guestItems = getGuestCart();
      const next = guestItems
        .map((i) =>
          i.variantId === item.variant_id ? { ...i, quantity: newQty } : i
        )
        .filter((i) => i.quantity > 0);
      setGuestCart(next);
      setCartCount(getGuestCartCount());
      await fetchItems();
      return;
    }
    await updateCartItemQuantity(cartItemId, newQty);
    await fetchItems();
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      const { getCartCount } = await import("@/lib/cart");
      const count = await getCartCount(session.user.id);
      setCartCount(count);
    }
  };

  const removeItem = async (cartItemId: number) => {
    const item = items.find((i) => i.id === cartItemId);
    if (!item) return;
    if (isGuest) {
      const guestItems = getGuestCart().filter(
        (i) => i.variantId !== item.variant_id
      );
      setGuestCart(guestItems);
      setCartCount(getGuestCartCount());
      await fetchItems();
      return;
    }
    await removeCartItem(cartItemId);
    await fetchItems();
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.id) {
      const { getCartCount } = await import("@/lib/cart");
      const count = await getCartCount(session.user.id);
      setCartCount(count);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = items.length === 0;

  const guestFormValid =
    guestName.trim() !== "" &&
    guestPhone.trim() !== "" &&
    guestAddress.trim() !== "";
  const guestPayDisabled = isEmpty || payosLoading || !guestFormValid;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[200px] text-slate-500">
        Đang tải giỏ hàng...
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 lg:w-2/3 flex flex-col gap-6">
        <div>
          <h1 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-tight">
            Your Cart ({itemCount} {itemCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        {isEmpty ? (
          <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] shadow-sm p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Giỏ hàng trống.
            </p>
            <Link
              href="/cua-hang"
              className="inline-flex items-center gap-2 text-[#1c5f21] font-bold text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#222] border-b border-slate-200 dark:border-slate-700">
                    <th className="py-4 pl-6 pr-4 text-sm font-semibold text-slate-900 dark:text-slate-200">
                      Sản phẩm
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200 w-24 md:w-32">
                      Giá
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200 w-32 md:w-40 text-center">
                      Số lượng
                    </th>
                    <th className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200 w-24 md:w-32 text-right">
                      Thành tiền
                    </th>
                    <th className="py-4 pl-4 pr-6 w-16" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-slate-50 dark:hover:bg-[#222] transition-colors"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="relative shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-slate-400 text-2xl">
                                image
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-slate-500 text-xs mt-1 md:hidden">
                              {item.price.toLocaleString("vi-VN")}₫
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-[#1c5f21] dark:text-green-400 text-sm font-medium hidden md:table-cell">
                        {item.price.toLocaleString("vi-VN")}₫
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden h-9">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-full flex items-center justify-center bg-slate-50 dark:bg-[#2a2a2a] hover:bg-slate-100 dark:hover:bg-[#333] text-slate-600 dark:text-slate-300 transition-colors"
                              aria-label="Giảm"
                            >
                              <span className="material-symbols-outlined text-[16px] font-bold">
                                remove
                              </span>
                            </button>
                            <div className="w-10 h-full flex items-center justify-center bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm font-medium border-x border-slate-300 dark:border-slate-600">
                              {item.quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-full flex items-center justify-center bg-slate-50 dark:bg-[#2a2a2a] hover:bg-slate-100 dark:hover:bg-[#333] text-[#1c5f21] transition-colors"
                              aria-label="Tăng"
                            >
                              <span className="material-symbols-outlined text-[16px] font-bold">
                                add
                              </span>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-900 dark:text-white text-sm font-bold text-right">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </td>
                      <td className="py-4 pl-4 pr-6 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                          aria-label="Xóa"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div>
          <Link
            href="/cua-hang"
            className="inline-flex items-center gap-2 text-slate-900 dark:text-white hover:text-[#1c5f21] dark:hover:text-[#1c5f21] font-bold text-sm leading-normal tracking-wide transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>

      <div className="lg:w-1/3 w-full flex flex-col gap-6">
        {isGuest && !isEmpty && (
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-4">
              Thông tin giao hàng
            </h2>
            <div className="flex flex-col gap-3">
              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Họ tên <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#2a2a2a] text-slate-900 dark:text-white text-sm px-3 py-2 focus:ring-1 focus:ring-[#1c5f21] focus:border-[#1c5f21]"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Số điện thoại <span className="text-red-500">*</span>
                </span>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="090 123 4567"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#2a2a2a] text-slate-900 dark:text-white text-sm px-3 py-2 focus:ring-1 focus:ring-[#1c5f21] focus:border-[#1c5f21]"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Địa chỉ giao hàng <span className="text-red-500">*</span>
                </span>
                <input
                  type="text"
                  value={guestAddress}
                  onChange={(e) => setGuestAddress(e.target.value)}
                  placeholder="Số nhà, đường, quận, thành phố"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#2a2a2a] text-slate-900 dark:text-white text-sm px-3 py-2 focus:ring-1 focus:ring-[#1c5f21] focus:border-[#1c5f21]"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email (tùy chọn)
                </span>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#2a2a2a] text-slate-900 dark:text-white text-sm px-3 py-2 focus:ring-1 focus:ring-[#1c5f21] focus:border-[#1c5f21]"
                />
              </label>
            </div>
          </div>
        )}

        <div className="sticky top-24 bg-[#F9F9F7] dark:bg-[#1e1e1e] rounded-xl p-6 lg:p-8 shadow-sm border border-transparent dark:border-slate-700">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-6">
            Order Summary
          </h2>
          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Tạm tính</span>
              <span className="text-slate-900 dark:text-white font-bold">
                {subtotal.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Phí vận chuyển</span>
              <span className="text-slate-500 italic text-xs text-right max-w-[120px]">
                Tính khi thanh toán
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Thuế</span>
              <span className="text-slate-500 italic text-xs">Tính khi thanh toán</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Mã giảm giá
            </label>
            <div className="flex gap-2 h-10">
              <input
                type="text"
                placeholder="Nhập mã"
                className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#2a2a2a] text-sm px-3 focus:ring-1 focus:ring-[#1c5f21] focus:border-[#1c5f21] dark:text-white shadow-sm placeholder:text-slate-400"
              />
              <button
                type="button"
                className="bg-[#1c5f21] hover:bg-[#164d1b] text-white px-4 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                Áp dụng
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-8">
            <span className="text-slate-900 dark:text-white font-bold text-base">Tổng cộng</span>
            <span className="text-[#1c5f21] dark:text-[#1c5f21] font-black text-2xl tracking-tight">
              {subtotal.toLocaleString("vi-VN")}₫
            </span>
          </div>

          {payosError && (
            <p className="text-red-500 text-sm mb-2" role="alert">
              {payosError}
            </p>
          )}
          <button
            type="button"
            onClick={handlePayOSCheckout}
            disabled={isGuest ? guestPayDisabled : isEmpty || payosLoading}
            className="w-full h-12 flex items-center justify-center gap-2 bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-base font-bold shadow-md transition-all transform active:scale-[0.98]"
          >
            {payosLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  progress_activity
                </span>
                Đang chuyển hướng PayOS...
              </>
            ) : (
              "Thanh toán bằng PayOS"
            )}
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="text-xs font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>
    </>
  );
}
