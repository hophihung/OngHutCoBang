import Image from "next/image";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

export default function AdminSettingsPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Settings
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

      {/* Scrollable Content - Settings body (từ HTML) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="mx-auto max-w-4xl px-0 md:px-4 py-6 md:py-10">
          {/* Page Heading */}
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Environmental Impact Configuration
            </h2>
            <p className="text-sm text-slate-500 dark:text-green-300/70">
              Update the numbers displayed on the Homepage hero section.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] p-6 shadow-sm md:p-8">
            <form className="flex flex-col gap-6">
              {/* Straws Replaced Count */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium leading-none text-slate-900 dark:text-white"
                  htmlFor="straws-count"
                >
                  Straws Replaced Count
                </label>
                <div className="relative">
                  <input
                    id="straws-count"
                    type="text"
                    defaultValue="40,000,000"
                    className="flex w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 px-4 py-3 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-[#1c5f21] focus:outline-none focus:ring-1 focus:ring-[#1c5f21] dark:placeholder:text-slate-500 pr-12"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                    <span className="material-symbols-outlined text-xl">
                      park
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  The total number of plastic straws replaced by our products.
                </p>
              </div>

              {/* Plastic Waste Reduced */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium leading-none text-slate-900 dark:text-white"
                  htmlFor="waste-reduced"
                >
                  Plastic Waste Reduced (Tons)
                </label>
                <div className="relative">
                  <input
                    id="waste-reduced"
                    type="number"
                    defaultValue="20"
                    className="flex w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 px-4 py-3 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-[#1c5f21] focus:outline-none focus:ring-1 focus:ring-[#1c5f21] dark:placeholder:text-slate-500 pr-12"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                    <span className="material-symbols-outlined text-xl">
                      delete_forever
                    </span>
                  </div>
                </div>
              </div>

              {/* Farmers Supported */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium leading-none text-slate-900 dark:text-white"
                  htmlFor="farmers-supported"
                >
                  Farmers Supported
                </label>
                <div className="relative">
                  <input
                    id="farmers-supported"
                    type="number"
                    defaultValue="100"
                    className="flex w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 px-4 py-3 text-base text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-[#1c5f21] focus:outline-none focus:ring-1 focus:ring-[#1c5f21] dark:placeholder:text-slate-500 pr-12"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500">
                    <span className="material-symbols-outlined text-xl">
                      groups
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Action Bar */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <button
              type="button"
              className="rounded-lg border border-transparent px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-[#1c5f21] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#164d1b] focus:outline-none focus:ring-2 focus:ring-[#1c5f21] focus:ring-offset-2 dark:focus:ring-offset-[#131f14] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                save
              </span>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
