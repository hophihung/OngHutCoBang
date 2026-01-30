"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem(STORAGE_KEY, theme);
}

type ThemeToggleProps = {
  /** Use "sidebar" when inside dark sidebar (e.g. admin) for contrast */
  variant?: "default" | "sidebar";
};

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync with script: script may have set class from localStorage or prefers-color-scheme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [mounted, theme]);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  };

  const buttonClass =
    variant === "sidebar"
      ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      : "flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0ea] dark:bg-white/10 text-[#111811] dark:text-gray-200 hover:bg-[#d5e0d5] dark:hover:bg-white/20 transition-colors";

  if (!mounted) {
    return (
      <button
        type="button"
        className={variant === "sidebar" ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" : "flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"}
        aria-label="Chuyển giao diện"
      >
        <span className="material-symbols-outlined text-[22px]">contrast</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonClass}
      aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      title={theme === "dark" ? "Giao diện sáng" : "Giao diện tối"}
    >
      {theme === "dark" ? (
        <span className="material-symbols-outlined text-[22px]">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-[22px]">dark_mode</span>
      )}
    </button>
  );
}
