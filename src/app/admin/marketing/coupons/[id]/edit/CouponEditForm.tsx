"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AdminCouponRow } from "@/lib/coupons";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

function toDateInput(d: string | null): string {
  if (!d) return "";
  try {
    const date = new Date(d);
    return date.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function CouponEditForm({ coupon }: { coupon: AdminCouponRow }) {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState(coupon.code);
  const [description, setDescription] = useState(coupon.description ?? "");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed_cart">(
    (coupon.discount_type as "percentage" | "fixed_cart") || "percentage"
  );
  const [discountValue, setDiscountValue] = useState(
    String(coupon.discount_value ?? "")
  );
  const [usageLimit, setUsageLimit] = useState(
    coupon.usage_limit != null ? String(coupon.usage_limit) : ""
  );
  const [startDate, setStartDate] = useState(toDateInput(coupon.start_date));
  const [endDate, setEndDate] = useState(toDateInput(coupon.end_date));
  const [isActive, setIsActive] = useState(coupon.is_active ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      const code = couponCode.trim().toUpperCase();
      if (!code) {
        setError("Vui lòng nhập mã coupon.");
        return;
      }
      const value = Number(discountValue);
      if (Number.isNaN(value) || value < 0) {
        setError("Giá trị giảm giá phải là số không âm.");
        return;
      }
      if (discountType === "percentage" && value > 100) {
        setError("Giảm theo % không được vượt 100.");
        return;
      }

      const payload = {
        code,
        description: description.trim() || null,
        discount_type: discountType,
        discount_value: value,
        usage_limit: usageLimit.trim() ? Number(usageLimit) : null,
        start_date: startDate || null,
        end_date: endDate || null,
        is_active: isActive,
      };

      setLoading(true);
      const supabase = createClient();
      try {
        const { error: updateErr } = await supabase
          .from("coupons")
          .update(payload)
          .eq("id", coupon.id);

        if (updateErr) {
          setError("Cập nhật coupon thất bại: " + updateErr.message);
          setLoading(false);
          return;
        }
        setSuccess("Đã lưu thay đổi.");
        setTimeout(() => router.push("/admin/marketing"), 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    },
    [
      coupon.id,
      couponCode,
      description,
      discountType,
      discountValue,
      usageLimit,
      startDate,
      endDate,
      isActive,
      router,
    ]
  );

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Sửa Coupon
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/marketing/coupons/${coupon.id}`}
            className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21]"
          >
            ← Xem chi tiết
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto px-0">
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">dashboard</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm mx-1">chevron_right</span>
                  <Link
                    href="/admin/marketing"
                    className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-white transition-colors"
                  >
                    Marketing
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm mx-1">chevron_right</span>
                  <Link
                    href={`/admin/marketing/coupons/${coupon.id}`}
                    className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-white transition-colors"
                  >
                    {coupon.code}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm mx-1">chevron_right</span>
                  <span className="ml-1 text-sm font-medium text-slate-900 dark:text-white">Sửa</span>
                </div>
              </li>
            </ol>
          </nav>

          {(error || success) && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg ${
                error
                  ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                  : "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
              }`}
            >
              {error || success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Sửa Coupon: {coupon.code}
                </h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Cập nhật thông tin và thời hạn mã giảm giá.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/marketing"
                  className="px-5 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">label</span>
                    Coupon Details
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="coupon_code">
                        Mã Coupon
                      </label>
                      <input
                        id="coupon_code"
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. GREENJOY10"
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4 uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="description">
                        Mô tả (nội bộ)
                      </label>
                      <textarea
                        id="description"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Mô tả chiến dịch..."
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">percent</span>
                    Giảm giá
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="discount_type">
                        Loại
                      </label>
                      <select
                        id="discount_type"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed_cart")}
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4"
                      >
                        <option value="percentage">Phần trăm (%)</option>
                        <option value="fixed_cart">Số tiền cố định (đ)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="discount_value">
                        Giá trị
                      </label>
                      <input
                        id="discount_value"
                        type="number"
                        min={0}
                        step={discountType === "percentage" ? 1 : 1000}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder={discountType === "percentage" ? "10" : "50000"}
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">calendar_clock</span>
                    Thời hạn & Giới hạn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="usage_limit">
                        Giới hạn số lần dùng (để trống = không giới hạn)
                      </label>
                      <input
                        id="usage_limit"
                        type="number"
                        min={0}
                        value={usageLimit}
                        onChange={(e) => setUsageLimit(e.target.value)}
                        placeholder="1000"
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="start_date">
                        Ngày bắt đầu
                      </label>
                      <input
                        id="start_date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2" htmlFor="end_date">
                        Ngày kết thúc
                      </label>
                      <input
                        id="end_date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white py-3 px-4"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Kích hoạt ngay</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">Bật/tắt mã này</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-[#1c5f21] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Đã dùng: {coupon.usage_count ?? 0} lần
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Không thể sửa số lần đã dùng. Chỉ có thể cập nhật giới hạn, ngày và trạng thái.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
