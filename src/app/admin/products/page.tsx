import Image from "next/image";
import Link from "next/link";
import { getAdminProductRows } from "@/lib/products";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

export default async function AdminProductsPage() {
  const products = await getAdminProductRows();
  const total = products.length;
  const activeCount = products.filter((p) => p.is_active).length;
  const draftCount = products.filter((p) => !p.is_active).length;
  const lowStockCount = products.filter((p) => p.low_stock).length;

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Product Inventory Management
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#1c5f21] transition-colors">
                search
              </span>
            </div>
            <input
              type="text"
              placeholder="Search orders, products..."
              className="block w-64 p-2.5 pl-10 text-sm text-slate-900 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-[#1c5f21]/20 placeholder-slate-400 dark:bg-slate-800 dark:text-white transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a1a]" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="relative size-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src={ADMIN_AVATAR}
                  alt="Admin profile"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="material-symbols-outlined text-slate-400">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content - Product Inventory body (từ HTML) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Page title & Add button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <Link href="/admin" className="hover:text-[#1c5f21]">
                  Home
                </Link>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span>Inventory</span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="font-semibold text-[#1c5f21]">Products</span>
              </div>
              <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                Products
              </h1>
            </div>
            <Link
              href="/admin/products/new"
              className="flex items-center justify-center gap-2 bg-[#1c5f21] hover:bg-[#1c5f21]/90 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all text-sm font-bold tracking-wide"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Add New Product
            </Link>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-8 overflow-x-auto">
              <Link
                href="#"
                className="pb-3 border-b-[3px] border-[#1c5f21] text-slate-900 dark:text-white font-bold text-sm whitespace-nowrap"
              >
                All Products{" "}
                <span className="ml-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                  {total}
                </span>
              </Link>
              <Link
                href="#"
                className="pb-3 border-b-[3px] border-transparent hover:border-slate-300 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm whitespace-nowrap transition-colors"
              >
                Active{" "}
                <span className="ml-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                  {activeCount}
                </span>
              </Link>
              <Link
                href="#"
                className="pb-3 border-b-[3px] border-transparent hover:border-slate-300 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm whitespace-nowrap transition-colors"
              >
                Draft{" "}
                <span className="ml-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                  {draftCount}
                </span>
              </Link>
              <Link
                href="#"
                className="pb-3 border-b-[3px] border-transparent hover:border-slate-300 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm whitespace-nowrap transition-colors"
              >
                Low Stock{" "}
                <span className="ml-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                  {lowStockCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1a1a1a] p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">
                search
              </span>
              <input
                type="text"
                placeholder="Search by product name, SKU..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1c5f21]/20 focus:border-[#1c5f21] placeholder:text-slate-500"
              />
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium text-slate-900 dark:text-white transition-colors w-full sm:w-auto justify-center"
              >
                <span className="material-symbols-outlined text-lg">
                  filter_list
                </span>
                Filter
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium text-slate-900 dark:text-white transition-colors w-full sm:w-auto justify-center"
              >
                <span className="material-symbols-outlined text-lg">
                  download
                </span>
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-12">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-[#1c5f21] focus:ring-[#1c5f21]/20"
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider min-w-[280px]">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Price
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                        Chưa có sản phẩm. <Link href="/admin/products/new" className="text-[#1c5f21] font-semibold hover:underline">Thêm sản phẩm</Link>
                      </td>
                    </tr>
                  ) : (
                  products.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 text-[#1c5f21] focus:ring-[#1c5f21]/20"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-4 ${!row.is_active ? "opacity-60" : ""}`}
                        >
                          <div className="relative size-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                            {row.base_image_url ? (
                              <Image
                                src={row.base_image_url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-slate-400 text-2xl">image</span>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {row.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {row.description ? String(row.description).slice(0, 40) + (String(row.description).length > 40 ? "…" : "") : "—"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                        {row.category_name ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-400">
                        {row.sku ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {row.stock != null ? (
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {row.stock}
                          </span>
                        ) : row.low_stock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {row.stock_label}
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {row.stock_label ?? "—"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-slate-900 dark:text-white">
                        {row.price ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.is_active ? (
                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#1c5f21] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c5f21] focus:ring-offset-2"
                            aria-label="Toggle"
                          >
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            aria-label="Toggle"
                          >
                            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${row.id}/edit`}
                            className="text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Sửa"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              edit
                            </span>
                          </Link>
                          <button
                            type="button"
                            className="text-slate-500 dark:text-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                            aria-label="Xóa"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {products.length === 0 ? 0 : 1}-{products.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {total}
                </span>{" "}
                products
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <span className="material-symbols-outlined text-sm">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
