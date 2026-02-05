import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminCustomerById } from "@/lib/customers";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  if (parts[0]) return parts[0].slice(0, 2).toUpperCase();
  return "??";
}

export default async function AdminCustomerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) notFound();

  const customer = await getAdminCustomerById(id);
  if (!customer) notFound();

  const customerId = `#CUS-${String(id).padStart(3, "0")}`;
  const initials = getInitials(customer.full_name ?? "");
  const joinDate = customer.created_at
    ? new Date(customer.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "--";

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Customer Profile
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

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-slate-100 dark:border-slate-800 relative">
                <button
                  type="button"
                  className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-[#1c5f21] transition-colors"
                  aria-label="Chỉnh sửa"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <div className="w-32 h-32 rounded-full ring-4 ring-[#1c5f21]/10 mb-4 overflow-hidden shadow-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-3xl font-bold text-slate-600 dark:text-slate-300">
                  {initials}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {customer.full_name || "--"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  Customer ID: {customerId}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Joined {joinDate}</p>
                <div className="flex flex-col gap-4 text-sm w-full">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f8f6] dark:bg-[#152317]">
                    <span className="material-symbols-outlined text-slate-400">mail</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Email</span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {customer.email?.trim() || "--"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f8f6] dark:bg-[#152317]">
                    <span className="material-symbols-outlined text-slate-400">call</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Phone</span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {customer.phone?.trim() || "--"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f8f6] dark:bg-[#152317]">
                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Address</span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {customer.address?.trim() || "--"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Spent</p>
                  <p className="text-xl font-bold text-[#1c5f21]">
                    {customer.totalSpent > 0
                      ? `${Number(customer.totalSpent).toLocaleString("vi-VN")} đ`
                      : "0 đ"}
                  </p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Orders</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{customer.ordersCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-3">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                Reset Password
              </button>
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">block</span>
                Block Customer
              </button>
            </div>
          </aside>

          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col flex-1 min-h-0">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">shopping_bag</span>
                  Order History
                </h3>
                <Link
                  href="/admin/orders"
                  className="text-sm text-[#1c5f21] font-medium hover:text-green-700 dark:hover:text-green-400 transition-colors"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-[#152317] text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-6 py-4 font-medium">Order ID</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Items</th>
                      <th className="px-6 py-4 font-medium text-right">Amount</th>
                      <th className="px-6 py-4 font-medium text-center">Status</th>
                      <th className="px-6 py-4 font-medium" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                        Chưa có đơn hàng
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">sticky_note_2</span>
                  Private Notes
                </h3>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label htmlFor="new-note" className="sr-only">
                    Add a new note
                  </label>
                  <textarea
                    id="new-note"
                    placeholder="Type a private note for admins only..."
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#152317] text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#1c5f21] focus:ring-[#1c5f21] p-3 resize-none text-sm"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-[#1c5f21] hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Chưa có ghi chú</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
