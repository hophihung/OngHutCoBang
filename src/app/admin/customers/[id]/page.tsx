import Image from "next/image";
import Link from "next/link";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

const PROFILE_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCm2Cugc9YndXQ9SQ2vrFRln8Ury2JpPtqOJ7qbmG3-jvU3zFzVx4p3nF33ZXOA-jJL6XW5uhqTeXv1XHeN1apRKODvCadHXlZT9Zsg0wdrpCTra0gUGLZdfmpJ_wwQMSYQ4GEjgYcA2EK0t0cw6KqkQ4aADwpMV-mOJ9k59A7oiT7NtDUk5qEuf7Gvwf4LMZacLXKjZHIF8_r3Zd3_wUWrH6qZgOp4GdcGOzlVMFJlM4SbkmLOicxxyrBvnB9uQokZVRYDTo92RXs";

const ORDER_HISTORY = [
  {
    id: "#ORD-001",
    date: "Oct 24, 2023",
    items: "Bamboo Straws (x50)",
    amount: "450,000₫",
    status: "Delivered",
  },
  {
    id: "#ORD-002",
    date: "Sep 12, 2023",
    items: "Grass Straws (x100)",
    amount: "850,000₫",
    status: "Delivered",
  },
  {
    id: "#ORD-003",
    date: "Aug 05, 2023",
    items: "Coconut Bowls (x4)",
    amount: "320,000₫",
    status: "Processing",
  },
  {
    id: "#ORD-004",
    date: "Jul 20, 2023",
    items: "Starter Kit",
    amount: "150,000₫",
    status: "Cancelled",
  },
];

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Processing:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Cancelled:
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
    >
      {status}
    </span>
  );
}

export default async function AdminCustomerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params; // resolve for dynamic segment
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
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

      {/* Scrollable Content - Customer Profile Detail body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
          {/* Left: Profile Card + Actions */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Main Profile Card */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-slate-100 dark:border-slate-800 relative">
                <button
                  type="button"
                  className="absolute top-4 right-4 cursor-pointer text-slate-400 hover:text-[#1c5f21] transition-colors"
                  aria-label="Chỉnh sửa"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <div className="relative w-32 h-32 rounded-full ring-4 ring-[#1c5f21]/10 mb-4 overflow-hidden shadow-lg">
                  <Image
                    src={PROFILE_AVATAR}
                    alt="Profile Nguyen Van A"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Nguyen Van A
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Customer ID: #CUST-8829
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1c5f21]/10 text-[#1c5f21] border border-[#1c5f21]/20">
                    <span className="material-symbols-outlined text-[16px]">
                      stars
                    </span>
                    VIP
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1c5f21]/10 text-[#1c5f21] border border-[#1c5f21]/20">
                    <span className="material-symbols-outlined text-[16px]">
                      loyalty
                    </span>
                    Loyal
                  </span>
                </div>
                {/* Contact Details */}
                <div className="w-full flex flex-col gap-4 text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f8f6] dark:bg-[#152317]">
                    <span className="material-symbols-outlined text-slate-400">
                      mail
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                        Email
                      </span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        nguyen.vana@example.com
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f8f6] dark:bg-[#152317]">
                    <span className="material-symbols-outlined text-slate-400">
                      call
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                        Phone
                      </span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        +84 90 123 4567
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f6f8f6] dark:bg-[#152317]">
                    <span className="material-symbols-outlined text-slate-400">
                      location_on
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                        Shipping Address
                      </span>
                      <span className="text-slate-900 dark:text-slate-200 font-medium">
                        123 Green Street, District 1, HCMC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Total Spent
                  </p>
                  <p className="text-xl font-bold text-[#1c5f21]">
                    5,000,000₫
                  </p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Total Orders
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    12
                  </p>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-3">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  lock_reset
                </span>
                Reset Password
              </button>
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  block
                </span>
                Block Customer
              </button>
            </div>
          </aside>

          {/* Right: Order History + Private Notes */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Order History */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col flex-1 min-h-0">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    shopping_bag
                  </span>
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
                      <th className="px-6 py-4 font-medium text-right">
                        Amount
                      </th>
                      <th className="px-6 py-4 font-medium text-center">
                        Status
                      </th>
                      <th className="px-6 py-4 font-medium" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {ORDER_HISTORY.map((order) => (
                      <tr
                        key={order.id}
                        className="group hover:bg-slate-50 dark:hover:bg-[#152317] transition-colors"
                      >
                        <td className="px-6 py-4 text-[#1c5f21] font-medium">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/orders/${order.id.replace("#", "").toLowerCase()}`}
                            className="text-slate-400 hover:text-[#1c5f21] transition-colors inline-flex"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              chevron_right
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Private Notes */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1c5f21]">
                    sticky_note_2
                  </span>
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
                {/* Note History Feed */}
                <div className="flex flex-col gap-4 pl-4 border-l-2 border-slate-100 dark:border-slate-800">
                  <div className="relative">
                    <div className="absolute -left-[23px] top-0 size-3 rounded-full bg-[#1c5f21] ring-4 ring-white dark:ring-[#1a1a1a]" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          Admin User
                        </span>
                        <span className="text-xs text-slate-400">
                          Today at 10:30 AM
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Customer requested eco-friendly packaging for next
                        shipment. Confirmed we can accommodate this request for
                        all future orders.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[23px] top-0 size-3 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-[#1a1a1a]" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          System
                        </span>
                        <span className="text-xs text-slate-400">
                          Oct 25, 2023 at 9:00 AM
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        User upgraded to{" "}
                        <span className="font-medium text-[#1c5f21]">
                          VIP Status
                        </span>{" "}
                        after crossing 5,000,000₫ spend threshold.
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
