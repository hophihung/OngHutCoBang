"use client";

import { useState, useMemo } from "react";

export type OrderRow = {
  id: number;
  user_id: string;
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  total_amount: string | number;
  shipping_fee?: string | number;
  final_amount: string | number;
  status: string;
  payment_method?: string;
  note?: string | null;
  created_at: string;
};

const TABS = [
  { id: "all", label: "Tất cả đơn hàng" },
  { id: "processing", label: "Đang xử lý" },
  { id: "shipped", label: "Đang giao" },
  { id: "completed", label: "Hoàn thành" },
];

const STATUS_LABELS: Record<string, string> = {
  pending: "Đang xử lý",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatMoney(value: string | number) {
  const n = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

type Props = {
  orders: OrderRow[];
};

export default function DashboardOrdersContent({ orders }: Props) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return orders;
    if (activeTab === "processing")
      return orders.filter((o) => o.status === "pending" || o.status === "confirmed");
    if (activeTab === "shipped") return orders.filter((o) => o.status === "shipping");
    if (activeTab === "completed") return orders.filter((o) => o.status === "completed");
    return orders;
  }, [orders, activeTab]);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-[#f0f4f0] dark:border-[#1f331f]">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-[#2f7f34] text-[#1e4d2b] dark:text-[#2f7f34] font-bold"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-[#111811] dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {filteredOrders.length === 0 ? (
          <div className="rounded-xl bg-white dark:bg-[#152e15] border border-[#f0f4f0] dark:border-[#1f331f] p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium">
              Chưa có đơn hàng nào.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Khi bạn đặt hàng, đơn sẽ hiển thị tại đây.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col rounded-xl bg-white dark:bg-[#152e15] shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50/50 dark:bg-[#1f331f]/50 px-6 py-4 border-b border-[#f0f4f0] dark:border-[#1f331f]">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Ngày đặt
                    </span>
                    <span className="text-sm font-semibold text-[#111811] dark:text-white">
                      {formatDate(order.created_at)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Tổng
                    </span>
                    <span className="text-sm font-semibold text-[#111811] dark:text-white">
                      {formatMoney(order.final_amount)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Mã đơn
                    </span>
                    <span className="text-sm font-semibold text-[#111811] dark:text-white">
                      ORD-{order.id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                      order.status === "shipping"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800"
                        : order.status === "completed"
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800"
                          : order.status === "cancelled"
                            ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800"
                            : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800"
                    }`}
                  >
                    {order.status === "shipping" && (
                      <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                    {order.status === "completed" && (
                      <span className="material-symbols-outlined text-[14px]">
                        check_circle
                      </span>
                    )}
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium text-[#111811] dark:text-white">
                      Người nhận:
                    </span>{" "}
                    {order.recipient_name} · {order.recipient_phone}
                  </p>
                  <p>
                    <span className="font-medium text-[#111811] dark:text-white">
                      Địa chỉ:
                    </span>{" "}
                    {order.shipping_address}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
