"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer
      id="contact"
      className="bg-[#1b431e] text-white pt-16 pb-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-white">
                eco
              </span>
              <h3 className="text-xl font-bold">ReenCo</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Chuyên cung cấp các sản phẩm thân thiện môi trường, thay thế nhựa
              dùng một lần. Cùng nhau kiến tạo cuộc sống xanh.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-xs font-bold">FB</span>
              </a>
              <a
                href="#"
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="#"
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-xs font-bold">IN</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Liên kết nhanh</h4>
            <div className="flex flex-col gap-2 text-gray-300 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Về chúng tôi
              </a>
              <a href="#shop" className="hover:text-white transition-colors">
                Cửa hàng
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Điều khoản dịch vụ
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Liên hệ</h4>
            <div className="flex flex-col gap-3 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-lg mt-0.5 shrink-0">
                  location_on
                </span>
                <span>
                  123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg shrink-0">
                  call
                </span>
                <span>+84 909 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg shrink-0">
                  mail
                </span>
                <span>hello@greenjoy.vn</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-lg">Đăng ký tin xanh</h4>
            <p className="text-gray-300 text-sm">
              Nhận thông tin khuyến mãi và các bài viết về sống xanh.
            </p>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-full px-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white focus:bg-white/20 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full h-10 rounded-full bg-[#2f7f34] text-white font-bold text-sm hover:bg-[#256629] transition-colors mt-1"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-400">
          <p>© 2023 ReenCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
