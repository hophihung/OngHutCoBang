"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

function randomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function AdminCouponNewPage() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed_cart">("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);
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

      setLoading(true);
      const supabase = createClient();
      try {
        const { error: insertErr } = await supabase.from("coupons").insert({
          code,
          description: description.trim() || null,
          discount_type: discountType,
          discount_value: value,
          usage_limit: usageLimit.trim() ? Number(usageLimit) : null,
          start_date: startDate || null,
          end_date: endDate || null,
          is_active: isActive,
        });

        if (insertErr) {
          setError("Lưu coupon thất bại: " + insertErr.message);
          setLoading(false);
          return;
        }
        setSuccess("Đã tạo coupon.");
        setTimeout(() => router.push("/admin/marketing"), 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    },
    [
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
      {/* Top Header - giống Dashboard admin */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Create New Coupon
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
              className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a1a]" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="relative size-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src={ADMIN_AVATAR}
                  alt="Admin profile"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="material-symbols-outlined text-slate-400">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content - Coupon Create New Coupon body (từ HTML) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto px-0">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">
                    dashboard
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm mx-1">
                    chevron_right
                  </span>
                  <Link
                    href="/admin/marketing"
                    className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-white transition-colors"
                  >
                    Marketing
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm mx-1">
                    chevron_right
                  </span>
                  <span className="ml-1 text-sm font-medium text-slate-900 dark:text-white">
                    Create Coupon
                  </span>
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
            {/* Header with Title and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Create New Coupon
                </h1>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Configure discount rules and schedule for your promotion.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/marketing"
                  className="px-5 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c5f21]/20"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1c5f21] focus:ring-offset-2 dark:focus:ring-offset-[#131f14] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    save
                  </span>
                  {loading ? "Đang lưu..." : "Save Coupon"}
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Configuration Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card: Coupon Details */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    label
                  </span>
                  Coupon Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="coupon_code"
                    >
                      Coupon Code
                    </label>
                    <div className="relative flex items-center">
                      <input
                        id="coupon_code"
                        name="coupon_code"
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g., GREENJOY10"
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-base py-3 pl-4 pr-12 uppercase placeholder:normal-case placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setCouponCode(randomCode())}
                        className="absolute right-2 p-2 text-slate-400 hover:text-[#1c5f21] dark:hover:text-[#1c5f21] transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Generate Random Code"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          autorenew
                        </span>
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Customers will enter this code at checkout.
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="description"
                    >
                      Description{" "}
                      <span className="text-slate-500 font-normal">
                        (Internal use)
                      </span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Summer sale promotion for returning customers..."
                      className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-sm py-3 px-4 placeholder:text-slate-400 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Card: Discount Configuration */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    percent
                  </span>
                  Discount Configuration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="discount_type"
                    >
                      Discount Type
                    </label>
                    <div className="relative">
                      <select
                        id="discount_type"
                        name="discount_type"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed_cart")}
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-sm py-3 px-4 appearance-none"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed_cart">Fixed Amount ($)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="discount_value"
                    >
                      Discount Value
                    </label>
                    <div className="relative">
                      <input
                        id="discount_value"
                        name="discount_value"
                        type="number"
                        min={0}
                        step={discountType === "percentage" ? 1 : 0.01}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder="25"
                        className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-sm py-3 px-4 placeholder:text-slate-400 pr-10"
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 font-bold">
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Restrictions & Schedule */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    calendar_clock
                  </span>
                  Restrictions & Schedule
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="usage_limit"
                    >
                      Usage Limit
                    </label>
                    <input
                      id="usage_limit"
                      name="usage_limit"
                      type="number"
                      min={0}
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(e.target.value)}
                      placeholder="e.g., 1000 (Leave empty for unlimited)"
                      className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-sm py-3 px-4 placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="start_date"
                    >
                      Start Date
                    </label>
                    <input
                      id="start_date"
                      name="start_date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-sm py-3 px-4 placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-2"
                      htmlFor="end_date"
                    >
                      End Date
                    </label>
                    <input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="block w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white shadow-sm focus:border-[#1c5f21] focus:ring-[#1c5f21] sm:text-sm py-3 px-4 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Active immediately
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Publish this coupon as soon as it&apos;s saved.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1c5f21]/20 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white peer-checked:bg-[#1c5f21]" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Customer Preview
                </h3>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 min-h-[300px]">
                  {/* Ticket Component */}
                  <div className="coupon-ticket w-full max-w-[320px] h-48 shadow-lg flex flex-col text-white overflow-hidden transition-transform hover:scale-105 duration-300">
                    <div className="flex-1 p-5 flex flex-col items-center justify-center text-center relative z-10">
                      <div className="flex items-center gap-1 mb-2 opacity-90">
                        <span className="material-symbols-outlined text-[18px]">
                          eco
                        </span>
                        <span className="text-xs font-bold tracking-widest uppercase">
                          Green Joy Straw
                        </span>
                      </div>
                      <div className="text-4xl font-black mb-1">25% OFF</div>
                      <div className="text-xs font-medium opacity-80">
                        On your entire order
                      </div>
                    </div>
                    <div className="h-16 bg-black/20 backdrop-blur-sm flex items-center justify-between px-5 relative z-10">
                      <div className="flex flex-col items-start">
                        <span className="text-[10px] uppercase opacity-60 font-semibold mb-0.5">
                          Code
                        </span>
                        <span className="font-mono text-lg font-bold tracking-wider">
                          SUMMER25
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/20 mx-2" />
                      <div className="flex flex-col items-end text-right">
                        <span className="text-[10px] uppercase opacity-60 font-semibold mb-0.5">
                          Expires
                        </span>
                        <span className="text-xs font-medium">Oct 31, 2023</span>
                      </div>
                    </div>
                  </div>
                  {/* Mock Checkout Context */}
                  <div className="mt-8 w-full max-w-[320px]">
                    <div className="flex justify-between items-center text-sm mb-2 text-slate-500 dark:text-slate-400">
                      <span>Subtotal</span>
                      <span>$120.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-4 text-[#1c5f21] font-medium">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">
                          local_offer
                        </span>{" "}
                        Coupon (SUMMER25)
                      </span>
                      <span>-$30.00</span>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 w-full mb-3" />
                    <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                      <span>Total</span>
                      <span>$90.00</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  This preview approximates how the coupon will appear in the
                  customer wallet or checkout page.
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
