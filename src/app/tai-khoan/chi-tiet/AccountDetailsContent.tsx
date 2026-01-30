"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ProfileRow = {
  full_name: string | null;
  phone_number: string | null;
  address: string | null;
} | null;

type Props = {
  profile: ProfileRow;
  userEmail: string;
  userId: string;
};

export default function AccountDetailsContent({ profile, userEmail, userId }: Props) {
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number ?? "");
  const [address, setAddress] = useState(profile?.address ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        phone_number: phoneNumber.trim() || null,
        address: address.trim() || null,
      })
      .eq("id", userId);
    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    setMessage({ type: "success", text: "Đã lưu thay đổi." });
  }

  return (
    <>
      {/* Section 1: Personal Information */}
      <section className="bg-white dark:bg-[#1a2c1a] rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10">
          <h2 className="text-[#111811] dark:text-white text-xl font-bold leading-tight tracking-tight">
            Thông tin cá nhân
          </h2>
        </div>
        <div className="p-6 md:p-8">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            {message && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}
            <label className="flex flex-col gap-2">
              <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                Họ và tên
              </span>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-[#111811] dark:text-white h-12 px-4 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] transition-all placeholder:text-gray-400"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                  Email
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 h-12 px-4 pr-10 cursor-not-allowed"
                    type="email"
                    value={userEmail}
                    readOnly
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">
                      lock
                    </span>
                  </div>
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                  Số điện thoại
                </span>
                <input
                  className="w-full rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-[#111811] dark:text-white h-12 px-4 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] transition-all placeholder:text-gray-400"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+84 90 123 4567"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                Địa chỉ
              </span>
              <input
                className="w-full rounded-lg border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-[#111811] dark:text-white h-12 px-4 focus:border-[#2f7f34] focus:ring-1 focus:ring-[#2f7f34] transition-all placeholder:text-gray-400"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, đường, quận, thành phố"
              />
            </label>
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center bg-[#2f7f34] hover:bg-[#1e5622] disabled:opacity-60 text-white font-bold h-12 px-8 rounded-lg transition-all shadow-md shadow-[#2f7f34]/20 hover:shadow-lg hover:shadow-[#2f7f34]/30"
              >
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Section 2: Address Book */}
      <section className="bg-white dark:bg-[#1a2c1a] rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
          <h2 className="text-[#111811] dark:text-white text-xl font-bold leading-tight tracking-tight">
            Sổ địa chỉ
          </h2>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default Address Card */}
          <div className="relative flex flex-col p-5 rounded-xl border border-[#2f7f34]/30 dark:border-[#2f7f34]/50 bg-white dark:bg-white/5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2f7f34]">
                  home
                </span>
                <span className="text-[#111811] dark:text-white font-bold text-base">
                  Nhà riêng
                </span>
              </div>
              <span className="bg-[#2f7f34]/10 text-[#2f7f34] dark:bg-[#2f7f34]/20 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                Mặc định
              </span>
            </div>
            <div className="flex flex-col gap-1 mb-6 text-sm text-gray-600 dark:text-gray-300">
              <p className="font-medium text-[#111811] dark:text-white">
                {fullName || userEmail || "—"}
              </p>
              {address && <p>{address}</p>}
              {phoneNumber && <p className="mt-2">{phoneNumber}</p>}
            </div>
            <div className="mt-auto flex gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
              <button
                type="button"
                className="text-sm font-medium text-gray-600 hover:text-[#2f7f34] dark:text-gray-400 dark:hover:text-[#2f7f34] transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  edit
                </span>
                Sửa
              </button>
              <button
                type="button"
                className="text-sm font-medium text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  delete
                </span>
                Xóa
              </button>
            </div>
          </div>
          {/* Add New Address Card */}
          <button
            type="button"
            className="group flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/20 hover:border-[#2f7f34] hover:bg-[#f6f8f6] dark:hover:bg-white/5 transition-all min-h-[220px]"
          >
            <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#2f7f34] group-hover:text-white transition-all mb-3">
              <span className="material-symbols-outlined text-[24px]">add</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 font-bold group-hover:text-[#2f7f34] transition-colors">
              Thêm địa chỉ mới
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
