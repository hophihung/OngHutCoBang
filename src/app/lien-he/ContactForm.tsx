"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col gap-4 p-6 rounded-xl bg-[#1b4d2e]/10 dark:bg-[#2f7f34]/20 border border-[#1b4d2e]/30 dark:border-[#2f7f34]/40"
        role="alert"
      >
        <div className="flex items-center gap-3 text-[#1b4d2e] dark:text-[#2f7f34]">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
          <h3 className="text-lg font-bold">Đã gửi tin nhắn</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300">
          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="name"
        >
          Họ và tên
        </label>
        <input
          className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all"
          id="name"
          placeholder="vd. Nguyễn Văn A"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all"
          id="email"
          placeholder="vd. email@example.com"
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="subject"
        >
          Chủ đề
        </label>
        <div className="relative">
          <select
            className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all appearance-none cursor-pointer"
            id="subject"
            defaultValue=""
          >
            <option value="" disabled>
              Chọn chủ đề
            </option>
            <option value="order">Hỗ trợ đơn hàng</option>
            <option value="partnership">
              Mua sỉ / Hợp tác
            </option>
            <option value="general">Câu hỏi chung</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              expand_more
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="message"
        >
          Nội dung
        </label>
        <textarea
          className="w-full p-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all resize-none"
          id="message"
          placeholder="Bạn cần chúng tôi hỗ trợ gì?"
          rows={5}
        />
      </div>
      <button
        className="mt-2 w-full h-12 bg-[#1b4d2e] hover:bg-[#153e24] dark:bg-[#2f7f34] dark:hover:bg-[#1e5622] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        type="submit"
      >
        <span>Gửi tin nhắn</span>
        <span className="material-symbols-outlined text-[20px]">
          send
        </span>
      </button>
    </form>
  );
}
