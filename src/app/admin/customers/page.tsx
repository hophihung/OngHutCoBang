import Image from "next/image";
import Link from "next/link";

const AVATAR_URLS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDfAUzXZIWj-yvcNFNK3qdtS9hKlKAALVVLn-XmouLG4_97WyPhACPTHbOEp4kkyo6uafNz-WsrlvMO-xYeM08BAusmLb5Z6RUoxy_sX05N0BpMCs0xlGhmpIK1ONHxu7h5H4Q1--UyCeKNTc1iPSFRaHnBHt6-zGknpA0QHHDF91NLTS-BkXm_GZzikvbVq4fDj5Rhx_Za9nNs85NbMG4x2Mz1PrtSfmEh21R1A_VCM_VoIXHxAOpao3WteFAfrS7H5OfnLxyIyR8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCxEUpiTs0ibqJm5KY_Kcb2V5U3XDwTCPWFV6hVvpDd7mC2Wux87eGaJJcixVjZk3OcyNszXq5Wv99mI9NGMHKz08D6bXzrvTIeG2-mnXjuGxMOx_MvZfbpChOBm7UAzQ_fYJGuJwffyG9YSZPqybWIsPMX1qpjSBsYHY-KpAmrB-k-n9OM9RR2ap965Op8smSpIBMOsD7Po8V0EsUfq88zrZFVNSdLPOI007UO3vm37E-I_-0IP0HnZG1ZSFQDCklgQ5o2Lf5idpc",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD7ykDFLt9EgN6VkxnRG3z87py0tUAJTSYkFP2cbSDQqR5mbUvLK4ZSAKZ1EvcV5Q-eBwYQYYZaTWi1nF-QSVSm-KtT1NzalKcBZzIFoCzA3cw0pmjtXeSEcakq916GYFnQb0KIQOKUekMYXf1TGRykZbDTXNGi9aV_3iXRKkRRIcWMqQQixF5VKmwWdrMLuTWGiVYefh2lF7p3T70KGGKLw-FYUF0m7n-qibxbzbe2nIjfB774JQtKyVDDMjKroLlUbjy0shGPpxs",
];

type CustomerRow = {
  id: string;
  name: string;
  customerId: string;
  display: { type: "avatar"; url: string } | { type: "initials"; letters: string; bgClass: string };
  email: string;
  phone: string;
  ordersCount: number;
  ordersClass: string;
  totalSpent: string;
  joinDate: string;
};

const CUSTOMERS: CustomerRow[] = [
  {
    id: "8829",
    name: "Nguyen Van A",
    customerId: "#CUS-001",
    display: { type: "avatar", url: AVATAR_URLS[0] },
    email: "nguyen.a@example.com",
    phone: "+84 90 123 4567",
    ordersCount: 12,
    ordersClass: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    totalSpent: "5,200,000 VND",
    joinDate: "Oct 24, 2023",
  },
  {
    id: "2",
    name: "Tran Thi B",
    customerId: "#CUS-002",
    display: { type: "avatar", url: AVATAR_URLS[1] },
    email: "tran.b@example.com",
    phone: "+84 91 234 5678",
    ordersCount: 8,
    ordersClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    totalSpent: "3,150,000 VND",
    joinDate: "Sep 15, 2023",
  },
  {
    id: "3",
    name: "Le Van C",
    customerId: "#CUS-003",
    display: { type: "initials", letters: "LV", bgClass: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
    email: "le.c@example.com",
    phone: "+84 93 456 7890",
    ordersCount: 5,
    ordersClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    totalSpent: "2,500,000 VND",
    joinDate: "Nov 02, 2023",
  },
  {
    id: "4",
    name: "Pham Thi D",
    customerId: "#CUS-004",
    display: { type: "avatar", url: AVATAR_URLS[2] },
    email: "pham.d@example.com",
    phone: "+84 98 765 4321",
    ordersCount: 3,
    ordersClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    totalSpent: "1,200,000 VND",
    joinDate: "Dec 10, 2023",
  },
  {
    id: "5",
    name: "Hoang Van E",
    customerId: "#CUS-005",
    display: { type: "initials", letters: "HE", bgClass: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    email: "hoang.e@example.com",
    phone: "+84 96 111 2222",
    ordersCount: 1,
    ordersClass: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    totalSpent: "450,000 VND",
    joinDate: "Jan 05, 2024",
  },
];

function CustomerCell({ row }: { row: CustomerRow }) {
  if (row.display.type === "avatar") {
    return (
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-800 overflow-hidden shrink-0">
          <Image src={row.display.url} alt="" fill className="object-cover" />
        </div>
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">
            {row.name}
          </div>
          <div className="text-xs text-slate-500">ID: {row.customerId}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ring-2 ring-white dark:ring-slate-800 shrink-0 ${row.display.bgClass}`}
      >
        {row.display.letters}
      </div>
      <div>
        <div className="font-semibold text-slate-900 dark:text-white">
          {row.name}
        </div>
        <div className="text-xs text-slate-500">ID: {row.customerId}</div>
      </div>
    </div>
  );
}

export default function AdminCustomersPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="h-16 flex items-center justify-between px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Customers
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs"
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

      {/* Scrollable Content - Customer Management List body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="space-y-6">
          {/* Title Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">
              Customers
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Manage customer relationships, track spending, and view purchase
              history.
            </p>
          </div>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">
                  search
                </span>
              </div>
              <input
                type="text"
                placeholder="Search name, email, or phone..."
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-[#1c5f21] text-slate-900 dark:text-white placeholder-slate-400 shadow-sm text-sm transition-all"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>
                Filter
              </button>
              <button
                type="button"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-[#1c5f21] text-white font-semibold text-sm hover:bg-[#1c5f21]/90 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">
                  add
                </span>
                Add Customer
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="w-full bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Order History
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {CUSTOMERS.map((row) => (
                    <tr
                      key={row.customerId}
                      className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <CustomerCell row={row} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-900 dark:text-slate-200">
                            {row.email}
                          </span>
                          <span className="text-xs text-slate-500 mt-0.5">
                            {row.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.ordersClass}`}
                        >
                          {row.ordersCount} order
                          {row.ordersCount !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-[#1c5f21] font-mono tracking-tight">
                          {row.totalSpent}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {row.joinDate}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          href={`/admin/customers/${row.id}`}
                          className="inline-flex items-center justify-center rounded-lg border border-[#1c5f21]/30 px-3 py-1.5 text-sm font-medium text-[#1c5f21] hover:bg-[#1c5f21] hover:text-white dark:border-[#1c5f21]/50 dark:hover:bg-[#1c5f21] transition-all duration-200"
                        >
                          View Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  1
                </span>{" "}
                to{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  5
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-900 dark:text-white">
                  128
                </span>{" "}
                customers
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
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
