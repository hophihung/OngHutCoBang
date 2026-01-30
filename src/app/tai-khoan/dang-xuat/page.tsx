"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";

export default function DangXuatPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"logging-out" | "done">("logging-out");

  useEffect(() => {
    const signOut = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      setStatus("done");
      router.replace("/");
      router.refresh();
    };
    signOut();
  }, [router]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210]">
      <AnnouncementBar />
      <Header />
      <main className="flex flex-1 flex-col">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2f7f34]/10">
          <span className="material-symbols-outlined animate-spin text-[28px] text-[#2f7f34]">
            progress_activity
          </span>
        </div>
        <p className="text-[#111811] dark:text-white font-medium">
          {status === "logging-out"
            ? "Đang đăng xuất..."
            : "Đã đăng xuất. Đang chuyển hướng..."}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Nếu không chuyển trang,{" "}
          <a href="/" className="text-[#2f7f34] font-semibold hover:underline">
            bấm vào đây
          </a>
          .
        </p>
      </div>
        </div>
      </main>
    </div>
  );
}
