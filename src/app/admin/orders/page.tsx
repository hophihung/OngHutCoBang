import Image from "next/image";
import Link from "next/link";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

const AVATAR_URLS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACVSFRnHDgOhpWYnuhz19-Kdpg_wIBptlybiLB4TEzDpqgPklepELp1krY31-qhIZVBXuipeJWwBgMM2rG-E_mqpi_ArlIhUBNoJZEnWQbZ98ZIZ7ZtnXaqMOQdyUpbpiSbNJhNYj9bgJUKtf94TYTvDPDM76eYxBwghMJq__LhEhlQ4vNwkC_5xcqpJZKpQ4fpksEbr166TxawuAIedDAP4Bcd03iDlcBD2LqF5yKrssorL6P2Wwc7NWYv9PrL-FhiioDxHQBb34",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmmqnO0PfjgERGR8bR1H1Xk3Nekql3X-1eQ7qp00Jue-4iezFs8GxyV0WS3FouHySDvzj76BxQENb7Zc3FBTbJxJFxWmf9DTg6rpWRAXTPFh6D4Jn7YteheLZlZf2w0HNAR6Yz2ddu3P0G7zQSMUcBaNrvtbre7_YYYEL9p526_A7XSScBiV6mi9VuW49NAZFQh4dam32pv8-QsR2SNu7xV5Y0Sh7QZWKgIUXqEX4qvZr45erhaxCJL8AJkVy9rhGTFs44mYbXpqE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBiOxLP3ztKPTyeMsk-WjaQyASuX2Vm1sxFhVhR4HQm6GbxLr5nm2Nw5xQvq9MdH3BiFgcerrj2mdTA0rD087MSMAs6CKOzko-QtFVVFsZMP2TPeSf6qNsG9biYe5OqiyKrhPXb5TO1BG5vs4rbXgEidz9Z7YPBRxDVZQLFmMNLrIcR7nbPrZPmVRHToWtpM_n9iJxXNG4nMptCqBUL5LREMKQqfwz3kMUFB-xoVm9_zElhTVVZodP2QabJIhWd-X8YRV1gSgoLHw",
];

type CustomerDisplay = { type: "avatar"; url: string } | { type: "initials"; letters: string };

const ORDERS = [
  {
    id: "#ORD-2025-001",
    customer: "Alice Johnson",
    customerDisplay: { type: "avatar" as const, url: AVATAR_URLS[0] },
    date: "Oct 24, 2025",
    total: "$124.50",
    payment: "Paid" as const,
    fulfillment: "Pending" as const,
  },
  {
    id: "#ORD-2025-002",
    customer: "Michael Scott",
    customerDisplay: { type: "initials" as const, letters: "MS" },
    date: "Oct 23, 2025",
    total: "$89.00",
    payment: "Paid" as const,
    fulfillment: "Shipping" as const,
  },
  {
    id: "#ORD-2025-003",
    customer: "Sarah Connor",
    customerDisplay: { type: "avatar" as const, url: AVATAR_URLS[1] },
    date: "Oct 23, 2025",
    total: "$210.25",
    payment: "Unpaid" as const,
    fulfillment: "Cancelled" as const,
  },
  {
    id: "#ORD-2025-004",
    customer: "James Bond",
    customerDisplay: { type: "initials" as const, letters: "JB" },
    date: "Oct 22, 2025",
    total: "$450.00",
    payment: "Paid" as const,
    fulfillment: "Completed" as const,
  },
  {
    id: "#ORD-2025-005",
    customer: "Dwight Schrute",
    customerDisplay: { type: "avatar" as const, url: AVATAR_URLS[2] },
    date: "Oct 21, 2025",
    total: "$32.50",
    payment: "Paid" as const,
    fulfillment: "Completed" as const,
  },
];

function PaymentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Unpaid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
    >
      {status}
    </span>
  );
}

function FulfillmentBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Shipping:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Cancelled:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}`}
    >
      {status}
    </span>
  );
}

function CustomerCell({
  display,
  name,
}: {
  display: CustomerDisplay;
  name: string;
}) {
  if (display.type === "avatar") {
    return (
      <div className="flex items-center gap-3">
        <div className="relative size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
          <Image src={display.url} alt="" fill className="object-cover" />
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {name}
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <div className="size-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400 shrink-0">
        {display.letters}
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {name}
      </span>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Order Management
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

      {/* Scrollable Content - Order Management List body */}
      <div className="flex-1 overflow-y-auto bg-[#f6f8f6] dark:bg-[#131f14] p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Page Controls: Search, Filter, Export */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3 flex-wrap">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400">
                    search
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search Order ID or customer..."
                  className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1c5f21]/50 shadow-sm text-sm"
                />
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a1a1a] border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-lg shadow-sm text-slate-700 dark:text-slate-200 text-sm font-medium transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>
                Filter
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  expand_more
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1c5f21] hover:bg-[#1c5f21]/90 text-white rounded-lg shadow-md shadow-[#1c5f21]/20 text-sm font-bold transition-all transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">
                  table_view
                </span>
                Export Excel
              </button>
            </div>
          </div>

          {/* Data Table Card */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/5">
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Order ID
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Customer Name
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Date
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Total Amount
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Payment
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Fulfillment
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {ORDERS.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="py-4 px-6">
                        <CustomerCell
                          display={order.customerDisplay}
                          name={order.customer}
                        />
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {order.date}
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        {order.total}
                      </td>
                      <td className="py-4 px-6">
                        <PaymentBadge status={order.payment} />
                      </td>
                      <td className="py-4 px-6">
                        <FulfillmentBadge status={order.fulfillment} />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/admin/orders/${order.id.replace("#", "").toLowerCase()}`}
                          className="inline-flex p-1.5 rounded-lg text-slate-400 hover:text-[#1c5f21] hover:bg-[#1c5f21]/10 transition-colors"
                          aria-label="Xem chi tiết"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            visibility
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Page{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  1
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  10
                </span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
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
