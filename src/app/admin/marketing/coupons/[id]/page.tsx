import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminCouponById } from "@/lib/coupons";

function formatDate(d: string | null): string {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default async function AdminCouponDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const couponId = Number(id);
  if (Number.isNaN(couponId) || couponId < 1) notFound();

  const coupon = await getAdminCouponById(couponId);
  if (!coupon) notFound();

  const typeLabel =
    coupon.discount_type === "percentage"
      ? `${Number(coupon.discount_value)}%`
      : `${Number(coupon.discount_value).toLocaleString("vi-VN")} đ`;
  const expired =
    !coupon.is_active ||
    (coupon.end_date != null && new Date(coupon.end_date) < new Date());

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Chi tiết Coupon
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/marketing"
            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21]"
          >
            ← Coupons
          </Link>
          <Link
            href={`/admin/marketing/coupons/${couponId}/edit`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1c5f21] text-white text-sm font-medium hover:bg-[#164d1b] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Sửa
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#1c5f21] text-3xl">
                  sell
                </span>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
                    {coupon.code}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {coupon.description ?? "—"}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  expired
                    ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {expired ? "Hết hạn / Tắt" : "Đang hoạt động"}
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Loại giảm giá
                </p>
                <p className="text-slate-900 dark:text-white font-medium">
                  {coupon.discount_type === "percentage"
                    ? "Theo phần trăm (%)"
                    : "Số tiền cố định (đ)"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Giá trị giảm
                </p>
                <p className="text-[#1c5f21] font-bold text-xl">{typeLabel}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Đã dùng / Giới hạn
                </p>
                <p className="text-slate-900 dark:text-white font-medium">
                  {coupon.usage_count} /{" "}
                  {coupon.usage_limit != null
                    ? coupon.usage_limit
                    : "Không giới hạn"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Thời hạn
                </p>
                <p className="text-slate-900 dark:text-white font-medium">
                  {formatDate(coupon.start_date)} →{" "}
                  {coupon.end_date ? formatDate(coupon.end_date) : "Không hết hạn"}
                </p>
              </div>
            </div>
            {coupon.created_at && (
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                Tạo lúc: {formatDate(coupon.created_at)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
