"use client";

import { useEffect, useState } from "react";
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

  // #region agent log - Khi mount (đăng nhập Google): profile/userId hiển thị trên Console trình duyệt
  useEffect(() => {
    console.log("[Chi tiết tài khoản] Form mount", {
      userId,
      userEmail,
      profile: profile ?? null,
      hint: "Nếu profile null: có thể bảng profiles chưa có row cho user này hoặc lỗi đọc (thiếu cột avatar_url/email).",
    });
  }, [userId, userEmail, profile]);
  // #endregion

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    const payload = {
      full_name: fullName.trim() || null,
      phone_number: phoneNumber.trim() || null,
      address: address.trim() || null,
    };
    // #region agent log - Trước khi gửi update
    console.log("[Chi tiết tài khoản] Lưu: payload gửi lên", { userId, payload });
    // #endregion
    const supabase = createClient();
    const { data: authUser } = await supabase.auth.getUser();
    // #region agent log - Auth trước khi update (RLS profiles cần auth.uid() = id)
    console.log("[Chi tiết tài khoản] Auth trước khi update", {
      authUserId: authUser?.user?.id ?? null,
      userIdTrongForm: userId,
      match: authUser?.user?.id === userId,
      hint: "Nếu match false hoặc authUserId null: session có thể hết/không đúng → RLS chặn UPDATE.",
    });
    // #endregion
    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: userId, ...payload }, { onConflict: "id" })
      .select("id");
    setSaving(false);
    // #region agent log - Kết quả update bảng profiles
    if (error) {
      console.error("[Chi tiết tài khoản] Update profiles thất bại", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: "RLS: cần policy 'Users can update own profile' (trong rls-patches.sql). Nếu chưa chạy rls-patches.sql thì UPDATE bị chặn.",
      });
      setMessage({ type: "error", text: error.message });
      return;
    }
    console.log("[Chi tiết tài khoản] Update profiles thành công", { data });
    // #endregion
    setMessage({ type: "success", text: "Đã lưu thay đổi." });
  }

  return (
    <>
      {/* Section 1: Personal Information */}
      <section className="bg-white dark:bg-[#152e15] rounded-xl shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f4f0] dark:border-[#1f331f]">
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
    </>
  );
}
