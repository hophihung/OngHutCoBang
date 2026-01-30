"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Grass Straws - Box 50",
    price: 5,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXlAr6-C65ZP0seYWjdlceCG4xMqc7T4dsnhhaP-tyd4ZuikUj3mhi79ZBPFNfCkYAInnL5A6KJIyKARJ96w_KFByB8lhVRE368juvagQIKMLYaKpyKOrba2GpjmoVjm9NWF9KHzv18vZMP54LYDgYmad7p4zi7YVIe1baAMR-1ReUJTIJMWQ5pJ2by2sDjRVoG6IkWze5lvSHCPyWbaEEaXZ5Lpt8NVL2HdscAuBl1RdXC9X-L20mKN4JGIKrCbXgRy5_szFZS14",
  },
  {
    id: "2",
    name: "Bamboo Straws - Standard",
    price: 12,
    quantity: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIXiJBhir9aUKTOeTpY22slErGO3_B2lHaF9NuycDdiWb4kblIpxoRfXDYrLFhvB-viWMWlQ-WtFmz5QtxE2RIt3QB7xEODAK0M9qzocJ6U-JtQgu8pd9LphiGsiyfmW8DNAzmZY-8coibxL-tDgddumZDHeriAFeEi8vb2cysLF7G8LLldrcIGSD6LFXgVKHahBbd6znf8e0jlcz876meIyx53mwZxLmbSf2Xl4QEql6APfvsKOusvEdo4h-ahleHQUB1-TFumDA",
  },
  {
    id: "3",
    name: "Coconut Fiber Brush",
    price: 3,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzmyWI9H1GrrqPRhoRVxzPnANseSr19O610P92v3igqhVVBIgZWaA-kIBeVYSNSYRCQMthC8gX6pxf4XW8fNNxBm8OlA1rIp1iWB1vk8IGG5O7XYxtL4ZNoJuB_AdxcfV9umnTDn9LAzTIIxpKk-W0-bVctHTm0i8QlaNuoAcZd4s8B_MuhOp88HB37irZsxJd7F0jVjvYx_7tmvR7vN61cgFG2TTv3yJ-v-Ao5tIh09RtpIERaled8DT7IhaGC35ydVYUMe-Nt2w",
  },
];

export default function CartContent() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Left: Cart Items */}
      <div className="flex-1 lg:w-2/3 flex flex-col gap-6">
        <div>
          <h1 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-tight">
            Your Cart ({itemCount} {itemCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        {isEmpty ? (
          <div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] shadow-sm p-12 text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Your cart is empty.
            </p>
            <Link
              href="/cua-hang"
              className="inline-flex items-center gap-2 text-[#1c5f21] font-bold text-sm"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_back
              </span>
              Continue Shopping
            </Link>
          </div>
        ) : (
        <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#222] border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 pl-6 pr-4 text-sm font-semibold text-slate-900 dark:text-slate-200">
                    Product
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200 w-24 md:w-32">
                    Price
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200 w-32 md:w-40 text-center">
                    Quantity
                  </th>
                  <th className="px-4 py-4 text-sm font-semibold text-slate-900 dark:text-slate-200 w-24 md:w-32 text-right">
                    Total
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
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-slate-500 text-xs mt-1 md:hidden">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#1c5f21] dark:text-green-400 text-sm font-medium hidden md:table-cell">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden h-9">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-full flex items-center justify-center bg-slate-50 dark:bg-[#2a2a2a] hover:bg-slate-100 dark:hover:bg-[#333] text-slate-600 dark:text-slate-300 transition-colors"
                            aria-label="Decrease"
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
                            aria-label="Increase"
                          >
                            <span className="material-symbols-outlined text-[16px] font-bold">
                              add
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-900 dark:text-white text-sm font-bold text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 pl-4 pr-6 text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        aria-label="Remove"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          delete
                        </span>
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
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="lg:w-1/3 w-full">
        <div className="sticky top-24 bg-[#F9F9F7] dark:bg-[#1e1e1e] rounded-xl p-6 lg:p-8 shadow-sm border border-transparent dark:border-slate-700">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-6">
            Order Summary
          </h2>
          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Subtotal
              </span>
              <span className="text-slate-900 dark:text-white font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Shipping
              </span>
              <span className="text-slate-500 italic text-xs text-right max-w-[120px]">
                Calculated at checkout
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Tax
              </span>
              <span className="text-slate-500 italic text-xs">
                Calculated at checkout
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Coupon Code
            </label>
            <div className="flex gap-2 h-10">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#2a2a2a] text-sm px-3 focus:ring-1 focus:ring-[#1c5f21] focus:border-[#1c5f21] dark:text-white shadow-sm placeholder:text-slate-400"
              />
              <button
                type="button"
                className="bg-[#1c5f21] hover:bg-[#164d1b] text-white px-4 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end mb-8">
            <span className="text-slate-900 dark:text-white font-bold text-base">
              Grand Total
            </span>
            <span className="text-[#1c5f21] dark:text-[#1c5f21] font-black text-2xl tracking-tight">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <Link
            href="/thanh-toan"
            className="w-full h-12 flex items-center justify-center bg-[#1c5f21] hover:bg-[#164d1b] text-white rounded-lg text-base font-bold shadow-md transition-all transform active:scale-[0.98]"
          >
            Proceed to Checkout
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="text-xs font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>
    </>
  );
}
