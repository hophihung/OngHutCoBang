import Image from "next/image";
import Link from "next/link";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCRx6lS_lw0SLT3XZAksFL4B2gLY-XSCuyH6npvfP3r3lrZ6-rsKdsTDGp4LPZ0i3Yul_sQ4M7nbQKUki2ti6Y2EhCIfeAonwnDNbjtTY1QiyBNkcmllgYl8m-TnWxRE_ur4gBpqIHX_jwOKcHiRslp0oVPsT5fIOPaQMBixQt60E1yfHDrDqfquxGfVtB9sUjSJVB8TwD5iuGteSK8Rw4jDyBnEvos6W4bYXWhbu4dumODKxiGBGDXde-WEhbJP6PqMD6ck7dBVp8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnoRs3Mt9z0kw83IzhO4_Wb4DaAkuxWFwRJvA1aL6yJxih6xoYcdtTJJvTi2H507KbA7b8T0E_yPYtCSWVGCQt8rGnl0V-sBlHcVBzZ-S51ghKeDuwgaQcJrwXQfBwR7Ak8IECvFFYy5WoyH4lEAg58nRkLXn3WParoanBp6XxedFZ83JVgCQP44H3IKDdiwVienNGUAW-BpxKHpJh63IJOMqiEpP7gkJcVQ5eQcSCsqJRgHd7AWsj-Y_DV8_5Hp0Uz1Dwdcvl5GI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCGBMz7H4MRLO-RKADb4LsEdZIzzixH2s9u_mcCv4thgV5E1l8_j8AxXXKHgZxd71ZWJCArL7vXta8kMKFzROPwvaOTmgZW6jQGY1-Rfb8dprz-zOb7_m9mCdLziPH8UtiqGoNyVE3x2dMaisou9YeHg-hm-YOAe0ud7IAs8GSjCwHPUt36_MQmVp9kPFuXDaZ_Ad28wT7EmKbvWM60KNOfjblWeRkn1LnDMZm_LICPZAGhP0FrMepOxSajaj0l5mhm0ZrQmRgMkLs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA85pHRgInapTmvH1_094SGalx_qPXTBxQpYmh1VR96aHF5DbzDJWygk0kL7dOZ-L4TG48GSac0hW11VwA2W2ieqOrLQXDhuSegg6vh-oNVgG9ojpwE_dKl3AHKLlWdQFobg6ln9G65uaxXR9-cZFmrjsNLLldkgKrZLwuLX3dWN_3qVCT4NECLY-NKv_UGqQTM_WH3TJ4lc4LXjsvdqLyG1LQv1rFhMGfQmgV9HJ34jqWODuIxs3Sn7CAnHgUcWSqy_Zr6dRxi_2o",
];

const ORDERS = [
  {
    id: "#ORD-7352",
    customer: "Nguyen Van A",
    date: "Oct 24, 2023",
    total: "1,250,000 VND",
    status: "Pending" as const,
    avatar: AVATARS[0],
  },
  {
    id: "#ORD-7351",
    customer: "Le Thi B",
    date: "Oct 24, 2023",
    total: "550,000 VND",
    status: "Shipped" as const,
    avatar: AVATARS[1],
  },
  {
    id: "#ORD-7350",
    customer: "Tran Minh C",
    date: "Oct 23, 2023",
    total: "2,100,000 VND",
    status: "Completed" as const,
    avatar: AVATARS[2],
  },
  {
    id: "#ORD-7349",
    customer: "Sarah Jenkins",
    date: "Oct 23, 2023",
    total: "890,000 VND",
    status: "Completed" as const,
    avatar: AVATARS[3],
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Shipped: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
    >
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Dashboard Overview
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

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a1a1a] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Total Revenue
                </p>
                <div className="size-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-[#1c5f21] dark:text-green-400">
                  <span className="material-symbols-outlined text-lg">
                    payments
                  </span>
                </div>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                  15.2M VND
                </p>
                <p className="text-[#1c5f21] text-xs font-medium mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  +12% from last month
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a1a1a] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  New Orders
                </p>
                <div className="size-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined text-lg">
                    shopping_cart
                  </span>
                </div>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                  24
                </p>
                <p className="text-[#1c5f21] text-xs font-medium mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  +5% new today
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a1a1a] p-5 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Total Customers
                </p>
                <div className="size-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <span className="material-symbols-outlined text-lg">
                    group
                  </span>
                </div>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                  1,205
                </p>
                <p className="text-[#1c5f21] text-xs font-medium mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  +8% retention
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a1a1a] p-5 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1 bg-red-500" />
              <div className="flex items-center justify-between">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  Low Stock Alert
                </p>
                <div className="size-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                  <span className="material-symbols-outlined text-lg">
                    warning
                  </span>
                </div>
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
                  3 Products
                </p>
                <p className="text-red-600 text-xs font-medium mt-1 flex items-center gap-1">
                  Requires attention
                </p>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="rounded-xl bg-gradient-to-br from-[#e6f4ea] to-white dark:from-[#1a2e1d] dark:to-[#1a1a1a] border border-[#dde4dd] dark:border-slate-800 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2 text-[#1c5f21] dark:text-green-400 mb-1">
                  <span className="material-symbols-outlined">eco</span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Our Impact
                  </span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold leading-tight">
                  Environmental Impact Stats
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base">
                  Update the live environmental impact counters shown on the
                  storefront homepage to reflect our community&apos;s latest
                  achievements.
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 flex items-center justify-center gap-2 bg-[#1c5f21] hover:bg-[#1c5f21]/90 text-white rounded-lg h-10 px-6 text-sm font-bold transition-all shadow-md hover:shadow-lg"
              >
                <span className="material-symbols-outlined text-[20px]">
                  refresh
                </span>
                Update Stats
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex gap-4 rounded-lg bg-white dark:bg-[#252525] p-5 border border-[#dde4dd] dark:border-slate-700 shadow-sm items-center">
                <div className="size-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-[#1c5f21] dark:text-green-400 shrink-0">
                  <span className="material-symbols-outlined">
                    local_cafe
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">
                    Plastic Straws Replaced
                  </h3>
                  <p className="text-slate-900 dark:text-white text-xl font-bold">
                    1,250,400
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg bg-white dark:bg-[#252525] p-5 border border-[#dde4dd] dark:border-slate-700 shadow-sm items-center">
                <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <span className="material-symbols-outlined">cloud_off</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">
                    CO2 Emissions Reduced
                  </h3>
                  <p className="text-slate-900 dark:text-white text-xl font-bold">
                    450 kg
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-lg bg-white dark:bg-[#252525] p-5 border border-[#dde4dd] dark:border-slate-700 shadow-sm items-center">
                <div className="size-12 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <span className="material-symbols-outlined">forest</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wide">
                    Trees Planted Equivalent
                  </h3>
                  <p className="text-slate-900 dark:text-white text-xl font-bold">
                    25 Trees
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-[#1c5f21] text-sm font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#252525] border-b border-slate-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {ORDERS.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                            <Image
                              src={order.avatar}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          className="text-slate-400 hover:text-[#1c5f21] transition-colors p-1"
                          aria-label="Sửa"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          type="button"
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Xóa"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
