import Image from "next/image";
import Link from "next/link";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

type CouponRow = {
  id: string;
  code: string;
  type: string;
  used: number;
  total: string;
  usagePercent: number;
  barColor: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired";
  expired?: boolean;
};

const COUPONS: CouponRow[] = [
  {
    id: "1",
    code: "GREENJOY10",
    type: "10% Off",
    used: 45,
    total: "100 total",
    usagePercent: 45,
    barColor: "bg-[#1c5f21]",
    startDate: "Oct 01, 2023",
    endDate: "to Dec 31, 2023",
    status: "Active",
  },
  {
    id: "2",
    code: "ECOSHIP",
    type: "Free Shipping",
    used: 105,
    total: "Unlimited",
    usagePercent: 25,
    barColor: "bg-blue-500",
    startDate: "Sep 15, 2023",
    endDate: "to Dec 15, 2023",
    status: "Active",
  },
  {
    id: "3",
    code: "SUMMER23",
    type: "20% Off",
    used: 50,
    total: "50 total",
    usagePercent: 100,
    barColor: "bg-slate-400",
    startDate: "Jun 01, 2023",
    endDate: "to Aug 31, 2023",
    status: "Expired",
    expired: true,
  },
];

export default function AdminMarketingPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Coupon Management
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

      {/* Scrollable Content - Coupon Management body (từ HTML) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          {/* Page title + Create Coupon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Coupons
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Manage marketing campaigns and discount codes
              </p>
            </div>
            <Link
              href="/admin/marketing/coupons/new"
              className="bg-[#1c5f21] hover:bg-[#164d1b] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-sm shadow-[#1c5f21]/20 w-fit"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Create Coupon
            </Link>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex items-center gap-5">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-[#1c5f21] border border-green-100 dark:border-green-900/30">
                <span className="material-symbols-outlined text-3xl">
                  local_activity
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
                  Active Coupons
                </p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  3
                </h3>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex items-center gap-5">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                <span className="material-symbols-outlined text-3xl">
                  redeem
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
                  Total Redeemed
                </p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  150
                </h3>
              </div>
            </div>
          </div>

          {/* Coupon List card */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1c5f21]">
                  list_alt
                </span>
                Coupon List
              </h3>
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by code..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-[#1c5f21] focus:border-[#1c5f21]"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Code</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 min-w-[200px]">Usage</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {COUPONS.map((row) => (
                    <tr
                      key={row.id}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-[18px]">
                            sell
                          </span>
                          <span
                            className={`font-mono font-bold px-2 py-1 rounded text-xs border ${
                              row.expired
                                ? "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 line-through"
                                : "text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {row.code}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 font-medium ${
                          row.expired
                            ? "text-slate-500 dark:text-slate-400"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {row.type}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between text-xs font-medium">
                            <span
                              className={
                                row.expired
                                  ? "text-slate-500 dark:text-slate-400"
                                  : "text-slate-700 dark:text-slate-300"
                              }
                            >
                              {row.used} used
                            </span>
                            <span className="text-slate-400">{row.total}</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div
                              className={`${row.barColor} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${row.usagePercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-xs ${
                          row.expired
                            ? "text-slate-500 dark:text-slate-400"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`font-medium ${
                              row.expired
                                ? "text-slate-500 dark:text-slate-400"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {row.startDate}
                          </span>
                          <span className="text-slate-400">{row.endDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.status === "Active" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Expired
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Copy Code"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              content_copy
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              edit
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing <span className="font-medium">1-3</span> of{" "}
                <span className="font-medium">12</span> results
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
