"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";


const NAV_ITEMS: Array<{
  href: string;
  icon: string;
  label: string;
  badge?: number;
}> = [
  { href: "/admin", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/orders", icon: "shopping_bag", label: "Orders" },
  { href: "/admin/products", icon: "inventory_2", label: "Products" },
  { href: "/admin/customers", icon: "group", label: "Customers" },
  { href: "/admin/marketing", icon: "campaign", label: "Marketing" },
  { href: "/admin/content", icon: "article", label: "Content" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-[#1B5E20] text-white transition-all duration-300 shadow-xl z-20">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 px-2 py-2">
            <div className="relative size-10 shrink-0 rounded-full border-2 border-white/20 overflow-hidden bg-white">
              <Image
                src="/logo.png"
                alt="ReenCo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-normal tracking-tight">
                ReenCo
              </h1>
              <p className="text-green-200 text-xs font-normal">
                Admin Console
              </p>
            </div>
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center ${item.badge != null ? "justify-between" : ""} gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive ? "bg-white/10 text-white shadow-sm" : "text-white/80 hover:bg-white/5 hover:text-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined group-hover:text-white transition-colors">
                      {item.icon}
                    </span>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                  {item.badge != null && (
                    <span className="flex items-center justify-center bg-red-500 text-white text-[10px] font-bold h-5 min-w-5 px-1 rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="text-white/70 text-sm">Giao diện</span>
            <ThemeToggle variant="sidebar" />
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium">Đăng xuất</p>
          </button>
        </div>
      </div>
    </aside>
  );
}
