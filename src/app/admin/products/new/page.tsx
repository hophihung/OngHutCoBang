"use client";

import Image from "next/image";
import Link from "next/link";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

const PREVIEW_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBx8r0amNYsH2gVyaY7_JqX0TTAay9i72f8Pwi2ykoboKH3HReguOA_XQpc7ZDiTqRKcy4cGaNgcnYCF_ngPRZHZ8FJVZqyNET0EyEYiOO2rq_PQk1Wm1T3grJ5lfvv52A8naJhOSyB4qHArYDhUfzB3J0tvqhhmAHBsd0WgwtfqP7FLKKCnNON9qbdDssl5QoaemEZvC_CRi1eNeoUhcUfEI4-AmA6Pb2afaVYFoEGyn0T1-dAdhT9Fw8vVxoWk2Wtqz7Ipjf-NNA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRBYzjozuctFm5PVwoDioJJWlN0XYFBvmYcw_Ak719AtX_F62eKsvhrf1FbjiZWJk2oocaaWucqLxeN8sgpsDtDjvhGNnJrauysEgYK-hz-OJY4t7XMogfYMg9vTRAXzjNq9yyPQlNUXA-b0426xNAzh8I9h14rZ22jgt64zJRiYp0P_A4UWWXn9rvcFsItRBUhdq232Rp9FxOEj9Kf_u2F4tBTun0_45CawbZ5FKuzmO54XAWcg05n7MeLwAfECShgVIV_Ujyjzk",
];

export default function AdminProductNewPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Add New Product
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

      {/* Scrollable Content - Add New Product body (từ HTML) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1280px] mx-auto flex flex-col">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/admin"
                  className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] dark:hover:text-[#1c5f21] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] mr-2">
                    dashboard
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
                    chevron_right
                  </span>
                  <Link
                    href="/admin/products"
                    className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#1c5f21] md:ml-2"
                  >
                    Products
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
                    chevron_right
                  </span>
                  <span className="ml-1 text-sm font-medium text-slate-900 dark:text-white md:ml-2">
                    Add New
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header: title + Cancel / Save */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Add New Product
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Create a new eco-friendly product listing.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/products"
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] text-white font-bold text-sm transition-colors shadow-lg shadow-[#1c5f21]/20"
              >
                <span className="material-symbols-outlined text-[20px]">
                  save
                </span>
                Save Product
              </button>
            </div>
          </div>

          {/* Main Layout: 2 cols + full width bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Product Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Info Card */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    edit_note
                  </span>
                  General Information
                </h2>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                      htmlFor="product-name"
                    >
                      Product Name
                    </label>
                    <input
                      id="product-name"
                      type="text"
                      placeholder="e.g. Grass Straws Standard Box"
                      className="w-full h-12 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all placeholder-slate-400 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        className="w-full h-12 px-4 appearance-none rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none transition-all text-slate-900 dark:text-white cursor-pointer"
                      >
                        <option value="" disabled>
                          Select category...
                        </option>
                        <option value="straws">Straws</option>
                        <option value="handicrafts">Handicrafts</option>
                        <option value="utensils">Utensils</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-900 dark:text-slate-100"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 focus-within:border-[#1c5f21] focus-within:ring-1 focus-within:ring-[#1c5f21] transition-all">
                      <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            format_bold
                          </span>
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            format_italic
                          </span>
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            format_underlined
                          </span>
                        </button>
                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            format_list_bulleted
                          </span>
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            link
                          </span>
                        </button>
                      </div>
                      <textarea
                        id="description"
                        placeholder="Enter full product description including materials, dimensions, and usage instructions..."
                        className="w-full min-h-[240px] p-4 bg-transparent border-none outline-none resize-y text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Media & Meta */}
            <div className="lg:col-span-1 space-y-6">
              {/* Media Card */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    image
                  </span>
                  Media
                </h2>
                <div className="w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#1c5f21]/40 rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-[#1c5f21] mb-2 transition-colors">
                        cloud_upload
                      </span>
                      <p className="mb-2 text-sm text-slate-900 dark:text-slate-100 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        SVG, PNG, JPG or WEBP
                      </p>
                    </div>
                    <input className="hidden" type="file" accept="image/*" />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {PREVIEW_IMAGES.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 group"
                    >
                      <Image
                        src={src}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          close
                        </span>
                      </button>
                    </div>
                  ))}
                  <div className="aspect-square rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                </div>
              </div>

              {/* Availability Card */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    public
                  </span>
                  Availability
                </h2>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Product Status
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Visible in store
                    </span>
                  </div>
                  <label className="relative inline-flex w-12 h-6 rounded-full bg-slate-300 dark:bg-slate-600 cursor-pointer transition-colors has-[:checked]:bg-[#1c5f21]">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <span className="absolute left-1 top-1 size-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-6" />
                  </label>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    className="w-full h-10 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-[#1c5f21] focus:ring-1 focus:ring-[#1c5f21] outline-none text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Variants (Full Width) */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#1c5f21]">
                      inventory_2
                    </span>
                    Product Variants
                  </h2>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1b4d2e] hover:bg-[#25663d] text-white rounded-lg text-sm font-bold transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      add
                    </span>
                    Add another variant
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white">
                      <tr>
                        <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[200px]">
                          Variant Name
                        </th>
                        <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[140px]">
                          SKU
                        </th>
                        <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[120px]">
                          Price ($)
                        </th>
                        <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 min-w-[100px]">
                          Stock
                        </th>
                        <th className="p-4 text-xs uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-700 w-[80px] text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr className="bg-white dark:bg-[#1a1a1a] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-3">
                          <input
                            type="text"
                            defaultValue="Box of 50"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            defaultValue="GJS-001"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-500 dark:text-slate-400 font-mono"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            defaultValue="5.00"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white font-medium"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            defaultValue="100"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-[#1a1a1a] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-3">
                          <input
                            type="text"
                            defaultValue="Box of 100"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            defaultValue="GJS-002"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-500 dark:text-slate-400 font-mono"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            defaultValue="9.50"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white font-medium"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            defaultValue="45"
                            className="w-full h-10 px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-[#1c5f21] focus:ring-0 text-sm text-slate-900 dark:text-white"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
