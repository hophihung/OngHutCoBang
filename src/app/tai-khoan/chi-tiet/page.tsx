import { redirect } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import AccountSidebar from "../AccountSidebar";
import AccountDetailsContent from "./AccountDetailsContent";
import { createClient } from "@/lib/supabase/server";

export default async function ChiTietPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/tai-khoan");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone_number, address, avatar_url, email")
    .eq("id", user.id)
    .maybeSingle();

  const displayName = profile?.full_name ?? user.email ?? "User";
  const avatarUrl =
    (profile?.avatar_url as string | undefined) ??
    (user.user_metadata?.avatar_url as string | undefined);
  const userEmail = profile?.email ?? user.email ?? "";

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white">
      <AnnouncementBar />
      <Header />

      <div className="flex-1 flex justify-center py-8 px-4 md:px-8 lg:px-20">
        <div className="flex w-full max-w-[1200px] gap-8 flex-col lg:flex-row">
          <AccountSidebar displayName={displayName} avatarUrl={avatarUrl} activeKey="chi-tiet" />

          <main className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#111811] dark:text-white text-3xl font-bold tracking-tight">
                Chi tiết tài khoản
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Quản lý thông tin cá nhân và địa chỉ giao hàng để nhận sản phẩm.
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
