"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBd8y94uBRlLodULGApadRhugMLBS50K2n9Cy00gUMDI_RxzzPVCjVa7YGTtQNV0f55tg8HxRu9qdIg0vL8sxIjPbMp4YLr-WkPYKLgpZDjleYC1aB4wjJcGwhWWY4kxNn4pGZcczBNUT8ONZFt9qxA9pdRQYecnIh124LJGu0lp2ocDMf45f71newVAh3r-KFIqdg7lyaY5eBCPDvPXhPYSq0pFRYV4LhOyZJZaMDqJwV0ZH2bAQvVjQwNgfWt3obVXNzK0GY42a4";

const NAV_ITEMS = [
  { href: "/admin", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/orders", icon: "shopping_bag", label: "Orders", badge: 5 },
  { href: "/admin/products", icon: "inventory_2", label: "Products" },
  { href: "/admin/customers", icon: "group", label: "Customers" },
  { href: "/admin/marketing", icon: "campaign", label: "Marketing" },
  { href: "/admin/content", icon: "article", label: "Content" },
  { href: "/admin/settings", icon: "settings", label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-[#1B5E20] text-white transition-all duration-300 shadow-xl z-20">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="relative size-10 shrink-0 rounded-full border-2 border-white/20 overflow-hidden">
              <Image
                src={LOGO_URL}
                alt="Green Joy logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-normal tracking-tight">
                Green Joy
              </h1>
              <p className="text-green-200 text-xs font-normal">
                Admin Console
              </p>
            </div>
          </div>
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
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium">Log Out</p>
          </Link>
        </div>
      </div>
    </aside>
  );
}
