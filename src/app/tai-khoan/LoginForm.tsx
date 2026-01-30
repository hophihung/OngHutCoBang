"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackError = searchParams.get("error");
  const showCallbackError = callbackError === "auth_callback";
  const next = searchParams.get("next") ?? "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push(next.startsWith("/") ? next : `/${next}`);
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(null);
    const supabase = createClient();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (oauthError) {
      setError(oauthError.message);
      return;
    }
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-20 xl:px-32">
      {/* Logo & Header */}
      <div className="w-full max-w-[440px] flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2 text-[#2f7f34]">
          <span className="material-symbols-outlined !text-4xl">eco</span>
        </div>
        <h2 className="text-[#111811] dark:text-white text-2xl font-bold tracking-tight">
          Green Joy
        </h2>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-[440px] mb-8">
        <div className="flex w-full border-b border-[#e5e7eb] dark:border-gray-700">
          <Link
            href="/tai-khoan"
            className="flex flex-1 items-center justify-center border-b-[3px] border-[#2f7f34] pb-3 pt-2 text-[#2f7f34] transition-colors"
          >
            <span className="text-sm font-bold tracking-wide uppercase">
              Đăng nhập
            </span>
          </Link>
          <Link
            href="/tai-khoan/dang-ky"
            className="flex flex-1 items-center justify-center border-b-[3px] border-transparent pb-3 pt-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <span className="text-sm font-bold tracking-wide uppercase">
              Đăng ký
            </span>
          </Link>
        </div>
      </div>

      {/* Form */}
      <form
        className="w-full max-w-[440px] space-y-6"
        onSubmit={handleSubmit}
      >
        {(error || showCallbackError) && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {showCallbackError
              ? "Đăng nhập không thành công. Vui lòng thử lại."
              : error}
          </div>
        )}
        <div className="space-y-2">
          <label
            className="text-[#111811] dark:text-gray-200 text-sm font-semibold leading-normal"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-base text-[#111811] placeholder:text-gray-400 focus:border-[#2f7f34] focus:outline-none focus:ring-1 focus:ring-[#2f7f34] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500 transition-shadow"
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <span className="material-symbols-outlined !text-xl">mail</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              className="text-[#111811] dark:text-gray-200 text-sm font-semibold leading-normal"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <Link
              href="/tai-khoan/quen-mat-khau"
              className="text-[#2f7f34] hover:text-[#1e5622] text-xs font-semibold hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <input
              className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-base text-[#111811] placeholder:text-gray-400 focus:border-[#2f7f34] focus:outline-none focus:ring-1 focus:ring-[#2f7f34] dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500 transition-shadow"
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <span className="material-symbols-outlined !text-xl">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-lg bg-[#2f7f34] hover:bg-[#1e5622] disabled:opacity-60 disabled:pointer-events-none px-5 py-3.5 text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7f34]"
        >
          <span className="text-sm font-bold tracking-wide uppercase">
            {loading ? "Đang xử lý…" : "Đăng nhập"}
          </span>
        </button>
      </form>

      {/* Divider */}
      <div className="w-full max-w-[440px] my-8 relative flex items-center">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        <span className="flex-shrink-0 mx-4 text-gray-400 dark:text-gray-500 text-xs font-medium uppercase tracking-wide">
          Hoặc tiếp tục với
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
      </div>

      {/* Social Login - Google only */}
      <div className="w-full max-w-[440px] flex justify-center mb-8">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="flex h-12 px-6 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-60 disabled:pointer-events-none"
          aria-label="Đăng nhập bằng Google"
        >
          <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm font-medium text-[#111811] dark:text-gray-200">
            Đăng nhập bằng Google
          </span>
        </button>
      </div>

      {/* Footer Link */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <Link
            href="/tai-khoan/dang-ky"
            className="font-bold text-[#2f7f34] hover:text-[#1e5622] hover:underline ml-1"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}
