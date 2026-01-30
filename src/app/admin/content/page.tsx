import Image from "next/image";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

const BLOG_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDayEdrwDbEGccO6nsPTBz6nAz33vBe_dZWXF1t_kGn9kpXo_9XA7Fs0yBLoFu-IL1WAbhNW3XewvFC1Ye2a3HD23afIix-9xSZIAhC-09FRbPOqKMspIHwd8Gf9srng4Nmw_66Ctt-gHzXArchqOXa381R60G_NyZBADVlIBUmHzufR6mS2nrg_EkGzK6p85ub1eoyGkLUtbgI-YWBLKB7lmakSbIRL8vf6BaDGFsAVei6BTAa1LE3v2mENkcOzC-AS3JEdm2-d4s",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDxNK6a7uI23_pcFWhS84zV0-F7IqZzAEBbX8Pu1lK0WRiPFdii4XEXvEcXO2EowY8BzCwzdkku4oq-Hmel5AjF1CHPDKu0JeDaghZ-V6E7eHP4C1Djv7TrIMC9oAKBtwmDt1XyXLMGrEpuureY4xUB457XyidMqWbCBLPxiXzREmc2udPX3hd9v35xRHyMCnswp1CLt_ABD8mxfWQeY0CbbMyW04aTOOX5z6pxvQq_NjJFq0D2RXoRCDkqQsw1ZWjj9Yo14qjh9z0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAHzZoUxRYE4wG22kfME9R8RTJ5joAC0orfZjWZeqW73TakyAiw9IGpArpjQuBFYOps_hI7wa4GXSG8ko862Yo-kTOQzovSC4oS0NC3VaBo1lsUaljPWxJjIBYJoQCa7WpDbTZH3-VM9yvSqzu0sBd7jd5vE7OnjdSaqtBRQjgH6GrrAOVZcuJ72kN5cOH6iNvVbLp2rhDWj3vRWuR0aGLn01tnIH5UG-FZrvxG0NnlK6aTsNxJmcsyEKoi7BjXM68nFBFH2ZHgvAg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJKh2IrEejr0Uzfg-IueY7-8Xn7a7kyC5LbNwm_FC08kZFjE8gLs7kV6YLT-iMlwwTwiV09EW0kR__aIFMPkNWM-xzLNNh6DJWIeFpmp390Mgg09Q9plTH2VkPqzgbKrxcFY6W04hbvY5Ttf1KZDbfoKf3gPNJgdHDKZ27hXzIo8ZMS8GWbctnKqWeWlMEU1X1oOnLijufuni6T4AHgfYJClxUYa136Udnm7thoS-2v2KA2cxcP6sl_l_s2OHVrMJr-XxzYu5yRE",
];

type PostItem = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  status: "Published" | "Draft";
  image: string;
};

const POSTS: PostItem[] = [
  {
    id: "1",
    title: "5 Ways to use Grass Straws",
    excerpt:
      "Discover the versatility of natural grass straws in your daily beverages. From iced coffee to smoothies, learn how this eco-friendly alternative is changing the game.",
    author: "Sarah Green",
    date: "Oct 24, 2023",
    status: "Published",
    image: BLOG_IMAGES[0],
  },
  {
    id: "2",
    title: "The Future of Sustainable Dining",
    excerpt:
      "How restaurants are shifting towards zero-waste policies and what it means for the consumer experience. We explore the latest trends in green hospitality.",
    author: "John Doe",
    date: "Last edited 2 days ago",
    status: "Draft",
    image: BLOG_IMAGES[1],
  },
  {
    id: "3",
    title: "Why Bamboo is Not Just for Pandas",
    excerpt:
      "Exploring the rapid growth rate of bamboo and its potential to replace single-use plastics in the kitchen and beyond.",
    author: "Michael Chen",
    date: "Oct 15, 2023",
    status: "Published",
    image: BLOG_IMAGES[2],
  },
  {
    id: "4",
    title: "Understanding Biodegradability Standards",
    excerpt:
      "Not all 'green' labels are created equal. We break down what certifications really matter when choosing sustainable products.",
    author: "Emma Watson",
    date: "Sep 02, 2023",
    status: "Published",
    image: BLOG_IMAGES[3],
  },
];

function StatusBadge({ status }: { status: PostItem["status"] }) {
  const isPublished = status === "Published";
  return (
    <span
      className={
        isPublished
          ? "inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
          : "inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
      }
    >
      {status}
    </span>
  );
}

export default function AdminContentPage() {
  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      {/* Top Header - giống Dashboard admin */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Blog Content Management
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

      {/* Scrollable Content - Blog Content Management body (từ HTML) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[960px] mx-auto flex flex-col">
          {/* Page Header & Action */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 p-4 mb-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight min-w-72 text-slate-900 dark:text-white">
              Blog Posts
            </h1>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] transition-colors text-white h-11 px-6 text-sm font-bold leading-normal tracking-wide shadow-md shadow-[#1c5f21]/10"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Write New Post</span>
            </button>
          </div>

          {/* Filter & Search Section */}
          <div className="flex flex-col md:flex-row gap-4 px-4 py-2 mb-6 items-center">
            <div className="w-full md:flex-1">
              <label className="flex flex-col h-11 w-full relative">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 focus-within:border-[#1c5f21] focus-within:ring-1 focus-within:ring-[#1c5f21] transition-all shadow-sm">
                  <div className="text-slate-400 flex items-center justify-center pl-4 rounded-l-lg border-r-0 border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles by title or author..."
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-sm text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-slate-400 px-3 font-normal leading-normal"
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button
                type="button"
                className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#1c5f21]/10 border border-[#1c5f21]/20 px-5 transition-colors hover:bg-[#1c5f21]/20"
              >
                <p className="text-[#1c5f21] text-sm font-semibold leading-normal">
                  All Posts
                </p>
              </button>
              <button
                type="button"
                className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 px-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">
                  Published
                </p>
              </button>
              <button
                type="button"
                className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 px-5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">
                  Drafts
                </p>
              </button>
            </div>
          </div>

          {/* Content List */}
          <div className="flex flex-col gap-4 px-4 pb-12">
            {POSTS.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="shrink-0">
                  <div className="relative rounded-lg h-48 sm:h-32 w-full sm:w-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#1c5f21] transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <div className="hidden sm:flex items-center gap-3 shrink-0 ml-4">
                        <StatusBadge status={post.status} />
                        <button
                          type="button"
                          className="text-slate-400 hover:text-[#1c5f21] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                          aria-label="Edit"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                    <span className="text-slate-700 dark:text-slate-300">
                      {post.author}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex sm:hidden items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <StatusBadge status={post.status} />
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#1c5f21]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      edit
                    </span>
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
