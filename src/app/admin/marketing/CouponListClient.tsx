"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type CouponRow = {
  id: string;
  code: string;
  type: string;
  used: number;
  total: string;
  usagePercent: number;
  barColor: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired";
  expired?: boolean;
};

export default function CouponListClient({
  coupons,
}: {
  coupons: CouponRow[];
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(code: string, id: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  }

  async function handleDelete(row: CouponRow) {
    if (!confirm(`Xóa coupon "${row.code}"? Hành động không thể hoàn tác.`)) return;
    setDeletingId(row.id);
    const supabase = createClient();
    const { error } = await supabase.from("coupons").delete().eq("id", Number(row.id));
    setDeletingId(null);
    if (error) {
      alert("Không xóa được: " + error.message);
      return;
    }
    router.refresh();
  }

  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {coupons.map((row) => (
        <tr
          key={row.id}
          className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">
                sell
              </span>
              <span
                className={`font-mono font-bold px-2 py-1 rounded text-xs border ${
                  row.expired
                    ? "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 line-through"
                    : "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                }`}
              >
                {row.code}
              </span>
            </div>
          </td>
          <td
            className={`px-6 py-4 font-medium ${
              row.expired
                ? "text-slate-500 dark:text-slate-400"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            {row.type}
          </td>
          <td className="px-6 py-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span
                  className={
                    row.expired
                      ? "text-slate-500 dark:text-slate-400"
                      : "text-slate-700 dark:text-slate-300"
                  }
                >
                  {row.used} used
                </span>
                <span className="text-slate-400">{row.total}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div
                  className={`${row.barColor} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${row.usagePercent}%` }}
                />
              </div>
            </div>
          </td>
          <td
            className={`px-6 py-4 text-xs ${
              row.expired
                ? "text-slate-500 dark:text-slate-400"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            <div className="flex flex-col">
              <span
                className={`font-medium ${
                  row.expired
                    ? "text-slate-500 dark:text-slate-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {row.startDate}
              </span>
              <span className="text-slate-400">{row.endDate}</span>
            </div>
          </td>
          <td className="px-6 py-4 text-center">
            {row.status === "Active" ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Expired
              </span>
            )}
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => handleCopy(row.code, row.id)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Copy Code"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {copiedId === row.id ? "check" : "content_copy"}
                </span>
              </button>
              <Link
                href={`/admin/marketing/coupons/${row.id}`}
                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Xem"
              >
                <span className="material-symbols-outlined text-[20px]">
                  visibility
                </span>
              </Link>
              <Link
                href={`/admin/marketing/coupons/${row.id}/edit`}
                className="p-2 text-slate-400 hover:text-[#1c5f21] dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Sửa"
              >
                <span className="material-symbols-outlined text-[20px]">
                  edit
                </span>
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(row)}
                disabled={deletingId === row.id}
                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                title="Xóa"
              >
                <span className="material-symbols-outlined text-[20px]">
                  delete
                </span>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
