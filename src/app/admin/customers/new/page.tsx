"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

export default function AdminCustomerNewPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      const name = fullName.trim();
      if (!name) {
        setError("Vui lòng nhập họ tên.");
        return;
      }

      setLoading(true);
      const supabase = createClient();

      try {
        const { error: insertErr } = await supabase.from("customers").insert({
          full_name: name,
          email: email.trim() || null,
          phone: phone.trim() || null,
          address: address.trim() || null,
        });

        if (insertErr) {
          setError("Thêm khách hàng thất bại: " + insertErr.message);
          setLoading(false);
          return;
        }

        setSuccess("Đã thêm khách hàng.");
        setTimeout(() => router.push("/admin/customers"), 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    },
    [fullName, email, phone, address, router]
  );

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Add Customer
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
                <Image src={ADMIN_AVATAR} alt="Admin" fill className="object-cover" />
              </div>
              <span className="material-symbols-outlined text-slate-400 hidden sm:block">expand_more</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-[1280px] mx-auto flex flex-col">
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-[#1c5f21] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">dashboard</span>
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">chevron_right</span>
                  <Link href="/admin/customers" className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] md:ml-2">
                    Customers
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">chevron_right</span>
                  <span className="ml-1 text-sm font-medium text-slate-900 dark:text-white md:ml-2">Add New</span>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Add Customer
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                  Thêm khách hàng mới vào danh sách.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/admin/customers"
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors shadow-lg shadow-[#1c5f21]/20"
                >
                  <span className="material-symbols-outlined text-[20px]">save</span>
                  {loading ? "Đang lưu..." : "Save Customer"}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 max-w-2xl">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1c5f21]">person_add</span>
                Thông tin khách hàng
              </h2>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="full-name">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+84 90 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100" htmlFor="address">
                    Địa chỉ
                  </label>
                  <textarea
                    id="address"
                    placeholder="Địa chỉ giao hàng..."
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white resize-y"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
