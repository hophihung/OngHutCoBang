import Image from "next/image";
import Link from "next/link";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

const PRODUCT_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9x4WKS__z5Mq04VDb_mP5JxNfifnWMEEmRGmm3raM70OMAuSGzvlXg3TqHON0t7350THwxuxPJdQA5RUBsswdtQRaUGxNRWXptkeENGN830lIuPZ1eGCI6R9lwVrMCGVQH_m2Mzi0Au-YbkLKJ1bQmGE7gG6_rFnEEHJxEKUnbJGCt_esYQgefpbloxX1V9wIqMuuGh9pIbM8d9HBXwGdw8KDOzWLvsdof5vu87n0p1bd-xUka6on9vYuEYvJx0WpIl4j-seHKIc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDpVy9pjhsCGYbQNezFjRBgYPA5x5Ga3UJjkUziWaIjOwXQDFpHSoT-bns_75QwYgTq2TgDJnqHlChuHhNla-21gKN1VP8BjEPZWyeO-KYPxZodjA00Nb62qB7e0Y4DmYQkMd37lJax2OU3Z-gHQ0VZ5_sw_tJrtwvUNW4ZrO_1mlh_P4_M6oQyrZaQsW4Cvwmj1oco7iwD_EHAW-CGKvcC8Yjo-meXG_5eZCTJk08b96JvXn_Tqh1AXd8z3isIVvSeiCGA129ULOI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCKT3BmmcDXRb1kuYf76DHPeXT7Hf1VISeLbVUizQWCl4M8T-3IVcBc7Kj56fGzG24JaPEQEwucve_RYT9F4uSlyburO0HkRaYlZoM9vU85L21je1ghbtVlxsSwFSmnTf3ErULo_QIZ6jkgZ2qQuBh-1noiC_XIQalD7mBL_cV4_nWzZoeakr-DbGXQcm7wmR5VpWMDxyAL_IqJYjLQy1Vs4DJawNhA4aPHocEGjH7H95eJh4m8zQS5SuB9TnfTUByxguc7zpX9K9k",
];

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAAQ8b4ZJN_IuPhWfwM1r4DPIk2Bqd9-kJwl2RBOgzsaN6VkLE1UM03Fg5TafDlqkwIPZj_CoSej4o8Moj4YPeFsVVq_NczzHGbHnRyHpKEN-83agko0du8bpg5bBnZuY_WFv7bxvV_iBr4IrChwPsywkRKpPhNGUsLGPLqQE_vQMyBhN_Q0paIyTAB3BQagYcBO4fvmzcvPf6Cq3bXJZJk-4T2AAa5-933OR3KsxkrdvvsN2IYD-zGxDXSiSo4R9acPOXcTQF-O80";

const ORDER_ITEMS = [
  {
    name: "Grass Straws - Box 50",
    sku: "GS-50-BX",
    image: PRODUCT_IMAGES[0],
    price: "$5.00",
    qty: 10,
    total: "$50.00",
  },
  {
    name: "Bamboo Cutlery Set",
    sku: "BAM-CUT-01",
    image: PRODUCT_IMAGES[1],
    price: "$12.00",
    qty: 2,
    total: "$24.00",
  },
  {
    name: "Coconut Cleaning Brush",
    sku: "COCO-BR-01",
    image: PRODUCT_IMAGES[2],
    price: "$3.50",
    qty: 1,
    total: "$3.50",
  },
];

export default async function AdminOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Order Details
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
              className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-colors"
              aria-label="Thông báo"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a1a]" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="relative size-8 rounded-full overflow-hidden shrink-0">
                <Image
                  src={ADMIN_AVATAR}
                  alt="Admin"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="material-symbols-outlined text-slate-400 hidden sm:block">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Order Details body */}
      <div className="flex-1 overflow-y-auto p-6 md:px-10 py-8">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Page Heading & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/orders"
                className="inline-flex items-center text-sm font-medium text-[#1c5f21] hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] mr-1">
                  arrow_back
                </span>
                Back to Orders
              </Link>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Order #ORD-2025-001
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700">
                  Pending
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Oct 24, 2025 at 10:34 AM
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center justify-center h-10 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  print
                </span>
                <span className="hidden sm:inline">Print Invoice</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-10 px-6 rounded-lg bg-[#1c5f21] hover:bg-[#1c5f21]/90 text-white font-bold transition-colors shadow-sm gap-2"
              >
                Update Status
                <span className="material-symbols-outlined text-[20px]">
                  expand_more
                </span>
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Order Items & Totals */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items Table Card */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Order Items
                  </h3>
                  <span className="text-sm text-slate-500">
                    {ORDER_ITEMS.length} Items
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                        <th className="px-6 py-3 font-medium uppercase tracking-wider w-[50%]">
                          Product
                        </th>
                        <th className="px-6 py-3 font-medium uppercase tracking-wider text-right">
                          Price
                        </th>
                        <th className="px-6 py-3 font-medium uppercase tracking-wider text-center">
                          Qty
                        </th>
                        <th className="px-6 py-3 font-medium uppercase tracking-wider text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {ORDER_ITEMS.map((item) => (
                        <tr
                          key={item.sku}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative size-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                                <Image
                                  src={item.image}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {item.name}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  SKU: {item.sku}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">
                            {item.price}
                          </td>
                          <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                            {item.qty}
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                            {item.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Summary Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/30 p-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col gap-3 ml-auto max-w-xs w-full">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Subtotal
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        $77.50
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Shipping
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        $5.00
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        Discount
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        -$0.00
                      </span>
                    </div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-xl font-bold text-[#1c5f21]">
                        $82.50
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Notes */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Order Notes
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Customer requested minimal packaging. Please include a
                  recycling guide flyer.
                </p>
              </div>
            </div>

            {/* Right Column: Customer, Shipping, Payment, Timeline */}
            <div className="space-y-6">
              {/* Customer Card */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Customer
                  </h3>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-[#1c5f21] transition-colors"
                    aria-label="Chỉnh sửa"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-lg shrink-0">
                    AJ
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Alex Johnson
                    </p>
                    <p className="text-xs text-slate-500">
                      Regular Customer
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-slate-400 text-[20px] mt-0.5 shrink-0">
                      mail
                    </span>
                    <a
                      href="mailto:alex.j@example.com"
                      className="text-[#1c5f21] hover:underline truncate"
                    >
                      alex.j@example.com
                    </a>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-slate-400 text-[20px] mt-0.5 shrink-0">
                      call
                    </span>
                    <span className="text-slate-900 dark:text-slate-300">
                      +1 (555) 012-3456
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Shipping Address
                  </h3>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-[#1c5f21] transition-colors"
                    aria-label="Sao chép"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      content_copy
                    </span>
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                    <span className="material-symbols-outlined">
                      local_shipping
                    </span>
                  </div>
                  <div className="text-sm text-slate-900 dark:text-slate-300 leading-relaxed">
                    <p>123 Eco Lane</p>
                    <p>Portland, OR 97204</p>
                    <p>United States</p>
                  </div>
                </div>
                <div className="mt-4 relative h-24 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                  <Image
                    src={MAP_IMAGE}
                    alt="Map Portland OR"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Payment Info
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">
                      payments
                    </span>
                    <span className="text-sm text-slate-900 dark:text-slate-300">
                      Cash on Delivery
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    $82.50
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
                    Unpaid
                  </span>
                </div>
              </div>

              {/* Order History Timeline */}
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-6">
                  Order History
                </h3>
                <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-8">
                  <div className="relative">
                    <div className="absolute -left-[23px] top-0 size-4 rounded-full bg-[#1c5f21] border-4 border-white dark:border-[#1a1a1a]" />
                    <div className="flex flex-col -mt-1.5">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Order Placed
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Oct 24, 10:34 AM
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[23px] top-0 size-4 rounded-full bg-yellow-400 border-4 border-white dark:border-[#1a1a1a]" />
                    <div className="flex flex-col -mt-1.5">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Payment Pending
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Awaiting COD
                      </p>
                    </div>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[23px] top-0 size-4 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-[#1a1a1a]" />
                    <div className="flex flex-col -mt-1.5">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Processing
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Estimated Oct 25
                      </p>
                    </div>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[23px] top-0 size-4 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-[#1a1a1a]" />
                    <div className="flex flex-col -mt-1.5">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Shipped
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
