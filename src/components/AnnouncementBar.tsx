"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "announcement-bar-dismissed";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    setDismissed(stored === "1");
  }, []);

  function handleDismiss() {
    setDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
    }
  }

  if (dismissed) return null;

  return (
    <div className="relative z-50 w-full bg-[#1b431e] text-white text-center py-2 px-4 text-sm font-medium">
      <p className="truncate">
        Freeship cho đơn hàng từ 200k • Giảm 10% cho đơn hàng đầu tiên
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 transition-colors"
        aria-label="Đóng thông báo"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}
