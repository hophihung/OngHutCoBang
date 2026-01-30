"use client";

export default function ContactForm() {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all"
          id="name"
          placeholder="ex. Jane Doe"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all"
          id="email"
          placeholder="ex. jane@company.com"
          type="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="subject"
        >
          Subject
        </label>
        <div className="relative">
          <select
            className="w-full h-12 px-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all appearance-none cursor-pointer"
            id="subject"
            defaultValue=""
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="order">Order Support</option>
            <option value="partnership">
              Wholesale / Partnership
            </option>
            <option value="general">General Inquiry</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <span className="material-symbols-outlined text-[20px]">
              expand_more
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm font-semibold text-[#111811] dark:text-white"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="w-full p-4 rounded-lg border border-[#d1d5db] dark:border-white/10 bg-white dark:bg-white/5 text-[#111811] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2f7f34]/50 focus:border-[#2f7f34] transition-all resize-none"
          id="message"
          placeholder="How can we help you?"
          rows={5}
        />
      </div>
      <button
        className="mt-2 w-full h-12 bg-[#1b4d2e] hover:bg-[#153e24] dark:bg-[#2f7f34] dark:hover:bg-[#1e5622] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        type="submit"
      >
        <span>Send Message</span>
        <span className="material-symbols-outlined text-[20px]">
          send
        </span>
      </button>
    </form>
  );
}
