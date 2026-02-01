import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminOrderById } from "@/lib/orders";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700",
    confirmed:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700",
    shipping:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-700",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-700",
    cancelled:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-700",
  };
  return map[status] ?? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
}

function paymentMethodLabel(method: string | null): string {
  if (method === "payos") return "PayOS";
  if (method === "cod") return "Cash on Delivery";
  return method ?? "—";
}

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orderId = Number(id);
  if (Number.isNaN(orderId) || orderId < 1) notFound();

  const order = await getAdminOrderById(orderId);
  if (!order) notFound();

  const items = order.order_items;
  const subtotal = order.total_amount;
  const shipping = order.shipping_fee;
  const total = order.final_amount;

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Order Details
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#1c5f21] transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              placeholder="Search orders, products..."
              className="block w-64 p-2.5 pl-10 text-sm text-slate-900 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-[#1c5f21]/20 placeholder-slate-400 dark:bg-slate-800 dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a1a]" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="relative size-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src={ADMIN_AVATAR}
                  alt="Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="material-symbols-outlined text-slate-400 hidden sm:block">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:px-10 py-8">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/orders"
                className="inline-flex items-center text-sm font-medium text-[#1c5f21] hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] mr-1">
                  arrow_back
                </span>
                Back to Orders
              </Link>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Order #{order.id}
                </h1>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadgeClass(order.status)}`}
                >
                  {order.status}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(order.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  print
                </span>
                <span className="hidden sm:inline">Print Invoice</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-10 px-6 rounded-lg bg-[#1c5f21] hover:bg-[#1c5f21]/90 text-white font-bold transition-colors shadow-sm gap-2"
              >
                Update Status
                <span className="material-symbols-outlined text-[20px]">
                  expand_more
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Order Items
                  </h3>
                  <span className="text-sm text-slate-500">
                    {items.length} Items
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-3 font-medium uppercase tracking-wider w-[50%]">
                          Product
                        </th>
                        <th className="px-6 py-3 font-medium uppercase tracking-wider text-right">
                          Price
                        </th>
                        <th className="px-6 py-3 font-medium uppercase tracking-wider text-center">
                          Qty
                        </th>
                        <th className="px-6 py-3 font-medium uppercase tracking-wider text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {items.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-6 py-8 text-center text-slate-500 dark:text-slate-400"
                          >
                            No items.
                          </td>
                        </tr>
                      ) : (
                        items.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div className="relative size-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                                  {item.image_url ? (
                                    <Image
                                      src={item.image_url}
                                      alt=""
                                      fill
                                      className="object-cover"
                                      sizes="48px"
                                    />
                                  ) : (
                                    <span className="flex items-center justify-center w-full h-full text-slate-400 text-xs">
                                      —
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  {item.sku && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                      SKU: {item.sku}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                              {formatMoney(item.price_at_purchase)}
                            </td>
                            <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                              {item.quantity}
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                              {formatMoney(
                                item.price_at_purchase * item.quantity
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col gap-3 ml-auto max-w-xs w-full">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Subtotal
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatMoney(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Shipping
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatMoney(shipping)}
                      </span>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-xl font-bold text-[#1c5f21]">
                        {formatMoney(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {order.note && (
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    Order Notes
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {order.note}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Customer
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                    {order.recipient_name
                      .trim()
                      .split(/\s+/)
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "—"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {order.recipient_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.recipient_phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Shipping Address
                </h3>
                <div className="flex gap-4">
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                  </div>
                  <div className="text-sm text-slate-900 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {order.shipping_address || "—"}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Payment Info
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">
                      payments
                    </span>
                    <span className="text-sm text-slate-900 dark:text-slate-300">
                      {paymentMethodLabel(order.payment_method)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {formatMoney(order.final_amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
