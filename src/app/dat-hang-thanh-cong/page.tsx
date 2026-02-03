import { Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import GuestOrderSuccess from "./GuestOrderSuccess";

function OrderSuccessFallback() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full rounded-xl bg-white dark:bg-[#1e1e1e] shadow-sm border border-slate-200 dark:border-slate-700 p-8 text-center animate-pulse">
        <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-6" />
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mx-auto mb-6" />
      </div>
    </div>
  );
}

export default function DatHangThanhCongPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210]">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow w-full px-4 lg:px-10 py-8 lg:py-12">
        <div className="mx-auto max-w-[1200px]">
          <Suspense fallback={<OrderSuccessFallback />}>
            <GuestOrderSuccess />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
