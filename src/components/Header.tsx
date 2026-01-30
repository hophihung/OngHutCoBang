"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import ThemeToggle from "@/components/ThemeToggle";

const SHOP_LINKS = [
  { label: "Ống hút cỏ", href: "/cua-hang?category=ong-hut-co" },
  { label: "Sản phẩm thủ công (Túi, nón...)", href: "/cua-hang?category=thu-cong" },
  { label: "Dụng cụ ăn uống", href: "/cua-hang?category=dung-cu-an-uong" },
];

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const cartCount = 2; // TODO: from context/Supabase

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Truc";
  const avatarUrl = user?.user_metadata?.avatar_url;

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setIsShopOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-[#eaf0ea] bg-white/95 dark:bg-[#141e15]/95 backdrop-blur-sm px-4 py-3 lg:px-10 shadow-sm transition-all duration-300 ${
          scrolled ? "py-2 shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center">
          {/* A. Trái - Logo (nền trong suốt) */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#2f7f34] cursor-pointer"
              aria-label="Về Trang chủ"
            >
              <div className="size-8 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">eco</span>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight text-[#2f7f34]">
                Green Joy Straw
              </h2>
            </Link>
          </div>

          {/* B. Giữa - Menu (desktop) */}
          <nav className="hidden md:flex flex-1 justify-center items-center gap-7 lg:gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-[#111811] dark:text-gray-200 hover:text-[#2f7f34] transition-colors"
            >
              Trang chủ
            </Link>

            {/* Cửa hàng dropdown */}
            <div className="relative" ref={shopRef}>
              <button
                type="button"
                onClick={() => setIsShopOpen((o) => !o)}
                className="flex items-center gap-0.5 text-sm font-medium text-[#111811] dark:text-gray-200 hover:text-[#2f7f34] transition-colors"
              >
                Cửa hàng
                <span
                  className={`material-symbols-outlined text-lg transition-transform ${isShopOpen ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </button>
              {isShopOpen && (
                <div className="absolute left-0 top-full mt-1 min-w-[220px] rounded-lg border border-[#eaf0ea] dark:border-white/10 bg-white dark:bg-[#1a261b] shadow-lg py-1 z-50">
                  {SHOP_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 hover:text-[#2f7f34] transition-colors"
                      onClick={() => setTimeout(() => setIsShopOpen(false), 0)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/ve-chung-toi"
              className="text-sm font-medium text-[#111811] dark:text-gray-200 hover:text-[#2f7f34] transition-colors"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/cau-chuyen"
              className="text-sm font-medium text-[#111811] dark:text-gray-200 hover:text-[#2f7f34] transition-colors"
            >
              Câu chuyện
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-[#111811] dark:text-gray-200 hover:text-[#2f7f34] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/lien-he"
              className="text-sm font-medium text-[#111811] dark:text-gray-200 hover:text-[#2f7f34] transition-colors"
            >
              Liên hệ
            </Link>
          </nav>

          {/* C. Phải - Action Icons */}
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            {/* Giao diện sáng/tối */}
            <ThemeToggle />
            {/* Tìm kiếm - desktop */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-full text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 transition-colors"
              aria-label="Tìm kiếm"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Giỏ hàng - luôn hiện (desktop + mobile) */}
            <Link
              href="/gio-hang"
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#2f7f34] text-white hover:bg-[#256629] transition-colors"
              aria-label="Giỏ hàng"
            >
              <span className="material-symbols-outlined text-[20px]">
                shopping_cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Tài khoản / User dropdown - desktop */}
            {user ? (
              <div className="hidden md:block relative" ref={userRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-full text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 transition-colors"
                  aria-label="Menu tài khoản"
                  aria-expanded={userDropdownOpen}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2f7f34] text-white text-sm font-semibold ring-2 ring-white dark:ring-[#1a261b]">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt=""
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      displayName.charAt(0).toUpperCase()
                    )}
                  </span>
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <span
                    className={`material-symbols-outlined text-lg transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 min-w-[200px] rounded-lg border border-[#eaf0ea] dark:border-white/10 bg-white dark:bg-[#1a261b] shadow-lg py-1 z-50">
                    <Link
                      href="/tai-khoan/chi-tiet"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 hover:text-[#2f7f34] transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      My Profile
                    </Link>
                    <Link
                      href="/tai-khoan/don-hang"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 hover:text-[#2f7f34] transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                      My Orders
                    </Link>
                    <div className="my-1 border-t border-[#eaf0ea] dark:border-white/10" />
                    <Link
                      href="/tai-khoan/dang-xuat"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/tai-khoan"
                className="hidden md:flex h-9 w-9 items-center justify-center rounded-full text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 transition-colors"
                aria-label="Tài khoản"
              >
                <span className="material-symbols-outlined text-[22px]">person</span>
              </Link>
            )}

            {/* Ngôn ngữ VN | EN - desktop */}
            <button
              type="button"
              className="hidden sm:flex h-9 items-center justify-center rounded-full bg-[#eaf0ea] dark:bg-white/10 px-3 text-xs font-bold text-[#111811] dark:text-gray-200 hover:bg-[#d5e0d5] dark:hover:bg-white/20 transition-colors"
            >
              VN | EN
            </button>

            {/* Hamburger - chỉ mobile: gom menu, Cart đã ở ngoài */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0ea] dark:bg-white/10 text-[#111811] dark:text-gray-200"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          aria-modal
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-white dark:bg-[#141e15] shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#eaf0ea] dark:border-white/10">
              <span className="font-bold text-[#111811] dark:text-white">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col overflow-y-auto p-4 gap-1">
              <Link
                href="/"
                className="px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <div className="py-2">
                <span className="px-3 text-xs font-semibold text-[#4c9a66] uppercase tracking-wider">
                  Cửa hàng
                </span>
                {SHOP_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/ve-chung-toi"
                className="px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Về chúng tôi
              </Link>
              <Link
                href="/cau-chuyen"
                className="px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Câu chuyện
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/lien-he"
                className="px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>
              <div className="border-t border-[#eaf0ea] dark:border-white/10 mt-4 pt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                >
                  <span className="material-symbols-outlined">search</span>
                  Tìm kiếm
                </button>
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#eaf0ea]/50 dark:bg-white/5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2f7f34] text-white text-sm font-semibold">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt=""
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          displayName.charAt(0).toUpperCase()
                        )}
                      </span>
                      <span className="text-sm font-medium truncate">{displayName}</span>
                    </div>
                    <Link
                      href="/tai-khoan/chi-tiet"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined">person</span>
                      My Profile
                    </Link>
                    <Link
                      href="/tai-khoan/don-hang"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined">receipt_long</span>
                      My Orders
                    </Link>
                    <Link
                      href="/tai-khoan/dang-xuat"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined">logout</span>
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/tai-khoan"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined">person</span>
                    Tài khoản
                  </Link>
                )}
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[#111811] dark:text-gray-200 hover:bg-[#eaf0ea] dark:hover:bg-white/10"
                >
                  VN | EN
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search overlay - giai đoạn 1: modal đơn giản */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-20 px-4"
          aria-modal
          role="dialog"
        >
          <div className="w-full max-w-xl bg-white dark:bg-[#1a261b] rounded-xl shadow-xl p-4 relative">
            <div className="flex items-center gap-2 border border-[#eaf0ea] dark:border-white/10 rounded-lg px-3 py-2">
              <span className="material-symbols-outlined text-[#4c9a66]">search</span>
              <input
                type="search"
                placeholder="Tìm kiếm (vd: ống hút size lớn)..."
                className="flex-1 bg-transparent text-[#111811] dark:text-white placeholder:text-gray-500 focus:outline-none text-sm"
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#eaf0ea] dark:hover:bg-white/10"
              aria-label="Đóng"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
