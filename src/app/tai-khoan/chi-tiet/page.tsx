import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import AccountDetailsContent from "./AccountDetailsContent";
import { createClient } from "@/lib/supabase/server";

export default async function ChiTietPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/tai-khoan");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, phone_number, address, avatar_url, email")
    .eq("id", user.id)
    .maybeSingle();

  // #region agent log - Chi tiết tài khoản: khi load (chạy trên server → xem terminal)
  console.log("[Chi tiết tài khoản] Load", {
    userId: user.id,
    userEmail: user.email,
    userMetadata: user.user_metadata ? { full_name: user.user_metadata.full_name, name: user.user_metadata.name } : null,
    profile: profile ?? null,
    profileError: profileError ? { message: profileError.message, code: profileError.code } : null,
    hint: profileError ? "Lỗi đọc profiles (cột thiếu? RLS?). Nếu chưa chạy profile-google-trigger.sql thì bảng có thể thiếu cột avatar_url, email." : null,
  });
  // #endregion

  const displayName = profile?.full_name ?? user.email ?? "User";
  const avatarUrl =
    (profile?.avatar_url as string | undefined) ??
    (user.user_metadata?.avatar_url as string | undefined);
  const userEmail = profile?.email ?? user.email ?? "";

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white">
      <AnnouncementBar />
      <Header />

      <div className="flex-1 max-w-[1200px] w-full mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="flex flex-col gap-6 bg-white dark:bg-[#1a2c1a] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 sticky top-24">
              {/* Profile Summary */}
              <div className="flex gap-4 items-center pb-6 border-b border-gray-100 dark:border-white/10">
                <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-[#2f7f34]/20 shrink-0 bg-[#2f7f34] flex items-center justify-center">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-[#111811] dark:text-white text-base font-bold leading-normal truncate">
                    {displayName}
                  </h1>
                  <p className="text-[#2f7f34] text-sm font-medium leading-normal">
                    Green Member
                  </p>
                </div>
              </div>
              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                <Link
                  href="/tai-khoan/don-hang"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#f6f8f6] dark:hover:bg-white/5 transition-colors group"
                >
                  <span className="material-symbols-outlined text-[24px] text-gray-500 group-hover:text-[#2f7f34] dark:text-gray-400">
                    package_2
                  </span>
                  <span className="text-sm font-medium leading-normal">
                    Đơn hàng của tôi
                  </span>
                </Link>
                <Link
                  href="/tai-khoan/chi-tiet"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#2f7f34]/10 text-[#2f7f34] dark:text-[#2f7f34]"
                >
                  <span className="material-symbols-outlined text-[24px] fill-1">
                    person
                  </span>
                  <span className="text-sm font-bold leading-normal">
                    Chi tiết tài khoản
                  </span>
                </Link>
                <Link
                  href="/tai-khoan/dang-xuat"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group mt-4"
                >
                  <span className="material-symbols-outlined text-[24px] text-gray-500 group-hover:text-red-500 dark:text-gray-400">
                    logout
                  </span>
                  <span className="text-sm font-medium leading-normal group-hover:text-red-600 dark:group-hover:text-red-400">
                    Đăng xuất
                  </span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-8 min-w-0">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#111811] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                Chi tiết tài khoản
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal max-w-2xl">
                Quản lý thông tin cá nhân và địa chỉ giao hàng để nhận sản phẩm
                xanh đúng nơi.
              </p>
            </div>
            <AccountDetailsContent
              profile={profile}
              userEmail={userEmail}
              userId={user.id}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
