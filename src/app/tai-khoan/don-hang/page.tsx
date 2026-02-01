import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import ClearCartOnPayOSSuccess from "./ClearCartOnPayOSSuccess";
import DashboardOrdersContent from "./DashboardOrdersContent";
import { createClient } from "@/lib/supabase/server";

export default async function DonHangPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/tai-khoan");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const displayName =
    profile?.full_name ?? user.email?.split("@")[0] ?? "User";
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white">
      <AnnouncementBar />
      <Header />

      <div className="flex-1 flex justify-center py-8 px-4 md:px-8 lg:px-20">
        <div className="flex w-full max-w-[1200px] gap-8 flex-col lg:flex-row">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="flex flex-col gap-6 rounded-xl bg-white dark:bg-[#152e15] p-6 shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] sticky top-24">
              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-[#f0f4f0] dark:border-[#1f331f]">
                <div className="relative size-12 rounded-full overflow-hidden shrink-0 bg-[#2f7f34] flex items-center justify-center">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <span className="text-lg font-bold text-white">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-[#111811] dark:text-white text-base font-bold">
                    Xin chào, {displayName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Chào mừng trở lại
                  </p>
                </div>
              </div>
              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                <Link
                  href="/tai-khoan/don-hang"
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg bg-green-50 dark:bg-[#2f7f34]/10 border-l-4 border-[#2f7f34]"
                >
                  <span className="material-symbols-outlined text-[#2f7f34] text-[24px]">
                    package_2
                  </span>
                  <span className="text-[#1e4d2b] dark:text-white text-sm font-bold">
                    Đơn hàng của tôi
                  </span>
                </Link>
                <Link
                  href="/tai-khoan/chi-tiet"
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f4f0] dark:hover:bg-[#1f331f] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#111811] dark:text-gray-400 text-[24px]">
                    person
                  </span>
                  <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                    Chi tiết tài khoản
                  </span>
                </Link>
                <Link
                  href="/tai-khoan/chi-tiet"
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f4f0] dark:hover:bg-[#1f331f] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#111811] dark:text-gray-400 text-[24px]">
                    location_on
                  </span>
                  <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                    Sổ địa chỉ
                  </span>
                </Link>
                <Link
                  href="/tai-khoan/yeu-thich"
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#f0f4f0] dark:hover:bg-[#1f331f] transition-colors"
                >
                  <span className="material-symbols-outlined text-[#111811] dark:text-gray-400 text-[24px]">
                    favorite
                  </span>
                  <span className="text-[#111811] dark:text-gray-200 text-sm font-medium">
                    Yêu thích
                  </span>
                </Link>
                <div className="mt-2 pt-4 border-t border-[#f0f4f0] dark:border-[#1f331f]">
                  <Link
                    href="/tai-khoan/dang-xuat"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[24px]">
                      logout
                    </span>
                    <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                      Đăng xuất
                    </span>
                  </Link>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-6 min-w-0">
            <ClearCartOnPayOSSuccess />
            <div className="flex flex-col gap-1">
              <h2 className="text-[#111811] dark:text-white text-3xl font-bold tracking-tight">
                Đơn hàng của tôi
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Theo dõi đơn hàng gần đây và lịch sử mua hàng.
              </p>
            </div>
            <DashboardOrdersContent orders={orders ?? []} />
          </main>
        </div>
      </div>
    </div>
  );
}
