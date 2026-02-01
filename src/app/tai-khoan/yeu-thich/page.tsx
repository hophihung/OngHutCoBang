import { redirect } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import AccountSidebar from "../AccountSidebar";
import { createClient } from "@/lib/supabase/server";

export default async function YeuThichPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/tai-khoan");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  const displayName =
    profile?.full_name ?? user.email?.split("@")[0] ?? "User";
  const avatarUrl =
    (profile?.avatar_url as string | undefined) ??
    (user.user_metadata?.avatar_url as string | undefined);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white">
      <AnnouncementBar />
      <Header />

      <div className="flex-1 flex justify-center py-8 px-4 md:px-8 lg:px-20">
        <div className="flex w-full max-w-[1200px] gap-8 flex-col lg:flex-row">
          <AccountSidebar displayName={displayName} avatarUrl={avatarUrl} activeKey="yeu-thich" />

          <main className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-col gap-1">
              <h2 className="text-[#111811] dark:text-white text-3xl font-bold tracking-tight">
                Yêu thích
              </h2>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#152e15] p-8 shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] text-center">
              <p className="text-[#111811] dark:text-gray-300 font-semibold uppercase tracking-wide">
                TÍNH NĂNG NÀY SẼ ĐƯỢC CẬP NHẬT THÊM
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
