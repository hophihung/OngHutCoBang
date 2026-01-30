import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import CartContent from "./CartContent";

export default function GioHangPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210]">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow w-full px-4 lg:px-10 py-8 lg:py-12">
        <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row gap-8 lg:gap-12">
          <CartContent />
        </div>
      </main>

      <Footer />
    </div>
  );
}
