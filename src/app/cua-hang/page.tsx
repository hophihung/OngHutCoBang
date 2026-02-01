import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import { getStoreProducts } from "@/lib/products";
import ShopProductCard from "./ShopProductCard";

const CATEGORIES = [
  { label: "Grass Straws", href: "/cua-hang?category=grass-straws", icon: "eco", active: true },
  { label: "Handicrafts", href: "/cua-hang?category=handicrafts", icon: "palette", active: false },
  { label: "Utensils", href: "/cua-hang?category=utensils", icon: "restaurant", active: false },
  { label: "Bundled Sets", href: "/cua-hang?category=sets", icon: "inventory_2", active: false },
];

export default async function CuaHangPage() {
  const products = await getStoreProducts();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102212] text-slate-900 dark:text-white transition-colors duration-200">
      <AnnouncementBar />
      <Header />

      <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 lg:sticky lg:top-24 self-start">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Categories
            </h3>
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.active
                      ? "bg-[#1c5f21]/10 text-[#1c5f21] font-semibold dark:bg-[#1c5f21]/20"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-400">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Price Range
            </h3>
            <div className="px-2 pt-6 pb-2">
              <div className="relative h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full">
                <div className="absolute h-full left-[20%] right-[30%] bg-[#1c5f21] rounded-full" />
                <div className="absolute -top-2 left-[20%] size-5 bg-white dark:bg-slate-800 border-2 border-[#1c5f21] rounded-full shadow-md cursor-pointer" />
                <div className="absolute -top-2 right-[30%] size-5 bg-white dark:bg-slate-800 border-2 border-[#1c5f21] rounded-full shadow-md cursor-pointer" />
              </div>
              <div className="flex justify-between mt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-600 text-[#1c5f21] focus:ring-[#1c5f21] focus:ring-offset-0 bg-white dark:bg-slate-800 transition-all"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                In Stock Only
              </span>
            </label>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#1c5f21]/5 border border-[#1c5f21]/10">
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="font-bold text-[#1c5f21] block mb-1">
                Impact Driven
              </span>
              Every purchase contributes to our mission of reducing ocean
              plastic by 1 million tons by 2030.
            </p>
          </div>
        </aside>

        {/* Main Product Area */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Showing {products.length} products
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="text-sm font-medium border-none bg-transparent focus:ring-0 cursor-pointer pr-8 py-0 text-slate-900 dark:text-white focus:outline-none">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 dark:text-slate-400 py-12">
                Chưa có sản phẩm.
              </p>
            ) : (
              products.map((product) => <ShopProductCard key={product.id} product={product} />)
            )}
          </div>

          <div className="flex justify-center mt-8 lg:mt-12 gap-2">
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              disabled
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center bg-[#1c5f21] text-white font-bold"
            >
              1
            </button>
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
