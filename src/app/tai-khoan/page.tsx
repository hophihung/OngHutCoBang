import Image from "next/image";
import { Suspense } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import LoginForm from "./LoginForm";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCm-Nx0PxO8ChSJT0b4Y8WE4CPCu5OlrjZOiCUtQi-4BvGhxGwnQovDMsYku4Xdh-4JfG35VAOLzJbqniL0bh7eAw_8g7RewlHf31aMbg2tfnT6DI93ITy7uY9XbJ2e38aA6Xmh07t3b4ucEdOlSHbaZJhbN53uRyi0q_D-t1gWBKh8DThJiZQkpsbCVrSLQREVXYetczFlo4cQa5WfZbSQp9QiESCCESrnpNYw1VRsPKryJFOBhpficK1eBEHh623IKSFZ8hek2A";

export default function TaiKhoanPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210]">
      <AnnouncementBar />
      <Header />

      <main className="flex flex-1 flex-col lg:flex-row w-full">
        {/* Left: Hero Image */}
        <div className="relative hidden lg:flex lg:w-1/2 min-h-[50vh] lg:min-h-[calc(100vh-theme(spacing.16))] items-center justify-center overflow-hidden bg-cover bg-center">
          <Image
            src={HERO_IMAGE}
            alt="Close up of fresh green grass straws in sunlight"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,50,0,0.3)] to-[rgba(0,50,0,0.6)]" />
          <div className="relative z-10 px-12 text-center max-w-xl">
            <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-lg mb-6">
              Join the Green Revolution
            </h1>
            <p className="text-white/90 text-lg lg:text-xl font-medium leading-relaxed drop-shadow-md">
              Sustainable choices for a better tomorrow. Experience the joy of
              eco-friendly living with our natural grass straws.
            </p>
          </div>
          <div className="absolute inset-0 bg-[#2f7f34]/10 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Right: Auth Form - Suspense required for useSearchParams() in LoginForm */}
        <div className="flex w-full lg:w-1/2 min-h-[50vh] lg:min-h-[calc(100vh-theme(spacing.16))] flex-col bg-white dark:bg-[#1a1a1a] overflow-y-auto">
          <Suspense fallback={<div className="flex min-h-full items-center justify-center text-slate-500 dark:text-slate-400">Đang tải...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
