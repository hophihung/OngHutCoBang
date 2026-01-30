import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";

const FEATURED_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTLN-pf-58wdnXZu7Y_nRNqcNByo-cMZoR-FE0j3vlRdXMWGSC36SV_rpKvaqx8LC2ZeiV2kNrnd_RC36xlGmGslZ8TKDIenZdubutgrkknY08dE9sm-rboIoxL12fmuZDqRsuWpuHIFeONVOcnTu2RBsoMUJgnX9OBjwfvyjZgk7pwAx0Kl2jE5MDFZPEUhC3XdEh7voZUTfoCoDZFOMjKsuW5ADEaHV661FDz6gnDulgtE1sBs1ekaWfp4Xvt3cgXcEXFMx7VLw";

const ARTICLES = [
  {
    slug: "5-creative-ways-reuse-grass-straws",
    category: "Tips",
    date: "Oct 24, 2023",
    title: "5 Creative Ways to Reuse Grass Straws",
    excerpt:
      "Don't throw them away! From garden compost to DIY crafts, discover how to give your used straws a second life.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBA8lmcGRSJQzdEUGwJI5x0I6ZVka91hFdsJn3JcE38qpDu06NsRzPnWD-EAPsa4KKBfm4_zPsKbE8ehIuGHe6X1BpTq-kJs1lchyLsWqYkfbpepZKKylJD5CaE9sxIJz6B_NOHlw2PE-v_WM8tuiQqrgtEVyAmvckwd-SnfplxJX2wdn9r2WN_0drdX2tmHNAKF9Zk2utqoCBFbc4YPeih11I7KbnF4U0wh4xlSaUptmQdK_i2JpvvHOvpKCdFLsfEqljBMcSGspA",
    alt: "Bundle of natural dried grass straws tied with string on a minimal background",
  },
  {
    slug: "why-bamboo-isnt-always-the-answer",
    category: "Sustainability",
    date: "Oct 20, 2023",
    title: "Why Bamboo isn't always the answer",
    excerpt:
      "While better than plastic, bamboo mono-cropping presents its own environmental challenges. Let's dig deeper into sustainable sourcing.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBSq9xYNuE8P0LDaTeiC1W2sYvDgWfJZ7YW4_c3tv_BZQ6vOXkeUgBa8cP-rgN22LOxfIu0k-iCluHcFBemjKbO6ad2Q3NBaALu7jTlNKgcCtWRucdOxlTI27tzJIRf55JDbZnQ7nDqlG6DOh34KYjJn_L5mFAqTTRt_KWf3dse3JxK2hTFPAtENeXl37TBX8iau800eUyM6Rz2nVYhgTSxlPNTY53BFLKiEXB68wme-XcPNFVp-Ckg6Ybuliior1AwfoDhBJBRAfs",
    alt: "Close up of bamboo toothbrush texture comparing it to plastic",
  },
  {
    slug: "composting-101-apartment-dwellers",
    category: "Guides",
    date: "Oct 15, 2023",
    title: "Composting 101 for Apartment Dwellers",
    excerpt:
      "No backyard? No problem. Learn the basics of vermicomposting and bokashi tailored for small spaces.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrcnd6U0-7_BXau3LdobgjXr9bRwqfEFI0_gVtoilrawqLMVIViPyzIdK3xPeS3ns5Q3-73YkJ9GD1JawnJwbVe2Ylz3ndPnxdZoFUkF-GJGEAuo_23de49mIKPv5JF8XohfBKD0FWijrlh3piL3SmcaVuimlUrYoztlT3nU1lJX3iDIurLPvjl3ALnV6MFd_r9XpoY3lzcwwPWkxwdsaxdoby3F8Z51nFaOXEhQHhbntOve8SaMsqu-_UIXanAxwH-8kjUe7jTtU",
    alt: "Small composting bin on a kitchen counter with vegetable scraps",
  },
  {
    slug: "plastic-free-travel-tips-2024",
    category: "Travel",
    date: "Oct 10, 2023",
    title: "Plastic-Free Travel Tips for 2024",
    excerpt:
      "Exploring the world doesn't have to cost the earth. Pack these essentials for your next eco-friendly adventure.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxaPK5TXm9rbwwnsR20sIPBplVbGCOyIhkJ7LrPGSkz0wmyhzR4P9FtQP2JEqiBaJhqc8LWqe_dOPPfSc9oytTY1FCGN1wut0YFkmq9ggHGYYpm_E64QJXyDwEHoLyUzRZINUCbVBoyuCokpPNIFyR8RUO413TF65v09hy72X9tELJkKP5Z7zIWmwrqkil6vCTSQweIvzq5flUWm1vDsM2BhjJ6I9wRt9G9nQZxLeUfM6i8-w7-_B8zMwZq3Td2igfYqHYmWlrg1s",
    alt: "Travel backpack with reusable water bottle and metal straw container",
  },
  {
    slug: "minimalist-wardrobe-essentials",
    category: "Lifestyle",
    date: "Oct 05, 2023",
    title: "Minimalist Wardrobe Essentials",
    excerpt:
      "Building a capsule wardrobe reduces textile waste and simplifies your morning routine.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZEYHpLf1_pGgZiEP8yJTv4N6dbGpp9UvnMy7C0K__DypgLQ0irWMojE0QTS_M04Ba3WjKNyYWXlgilJeQBj6ZXy-EGl4GLEhcdU9eEBHsvh2CRdbpOK9mFjS84dEK1sKKtdICQbD-PPdqNYJ1rogVxVxF2aFq3oH-XLH8NBqTl-E4Ug6eN3zZSGjVjCbStMU6OD2zGmt0B9tsF2y1UPrZ_7_p4tNNHwzqsuwE2TiPNB_ui2iig6F5O83YIJbaPuZA5u5y5O_3P0Y",
    alt: "Minimalist wardrobe rack with neutral colored organic cotton clothing",
  },
  {
    slug: "diy-natural-cleaners",
    category: "DIY",
    date: "Oct 01, 2023",
    title: "DIY Natural Cleaners That Actually Work",
    excerpt:
      "Ditch the harsh chemicals. Vinegar, baking soda, and essential oils are all you really need for a sparkling home.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcQ9_Ya_n7TyP7LztcO9qP5JmKlBGm7GXgdmz4pmlb-f4GXJPAW2xAco11CRDI8OIGdynPAsJEXCvV02HLX5hbKNqFWwbeBqPjGBKodAxm8r7h9qJzc-9jqVJEMZQtZkASFT_82kWn5c7TkZP4GwIZ-Nr8WPGA4LrBUmZz684WNdpmyRq-YTfOFdGU5PNp-5QtlQ-Tk59chsRRPKfMpnWXJVJhGUWrTdXFZmha9uj4YFh0P3g-JrRPdRxHhle_sfWZRAez4Gbq1Go",
    alt: "Lemon slices and vinegar in a glass spray bottle for natural cleaning",
  },
];

export default function BlogPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-12 md:gap-16">
        {/* Page Header */}
        <section className="flex flex-col items-center text-center gap-4 py-4 md:py-8">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#111811] dark:text-white">
            Green Living Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white/70 italic font-light">
            Tips for a zero-waste lifestyle
          </p>
        </section>

        {/* Featured Post */}
        <section className="w-full">
          <div className="group flex flex-col lg:flex-row bg-white dark:bg-[#1a2e1a] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#e0e6e0] dark:border-[#2a402a]">
            <div className="w-full lg:w-3/5 h-[300px] lg:h-[450px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={FEATURED_IMAGE}
                alt="Bright, modern kitchen interior with wooden utensils, glass jars, and plants depicting a zero-waste home"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div className="w-full lg:w-2/5 p-6 md:p-10 flex flex-col justify-center items-start gap-4 md:gap-6 bg-white dark:bg-[#1a2e1a]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#e0f2e0] dark:bg-[#2f7f34]/20 text-[#1a401a] dark:text-[#2f7f34] rounded-full text-xs font-bold uppercase tracking-wider">
                  Sustainability
                </span>
                <span className="text-sm text-gray-500 dark:text-white/60">
                  Nov 12, 2023
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#111811] dark:text-white">
                The Ultimate Guide to a Zero-Waste Kitchen
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-white/70 leading-relaxed font-light">
                Transitioning to a plastic-free kitchen doesn&apos;t happen
                overnight. It&apos;s a journey of small, conscious choices. Here
                are the first practical steps you can take to reduce waste
                today...
              </p>
              <Link
                href="/blog/zero-waste-kitchen"
                className="mt-2 inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#2f7f34] hover:bg-[#1e5622] text-white font-bold text-sm transition-colors"
              >
                Read Article
              </Link>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-[#e0e6e0] dark:border-[#2a402a] pb-4">
            <h3 className="text-2xl font-bold text-[#111811] dark:text-white">
              Latest Articles
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-[#f0f4f0] dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"
                aria-label="Filter"
              >
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-[#f0f4f0] dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"
                aria-label="Grid view"
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {ARTICLES.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col gap-4 group"
              >
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#2f7f34] text-xs font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-gray-500 dark:text-white/50 text-xs">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug text-[#111811] dark:text-white group-hover:text-[#2f7f34] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#111811] dark:text-white underline decoration-[#2f7f34] decoration-2 underline-offset-4 hover:text-[#2f7f34] transition-colors mt-2"
                  >
                    Read More{" "}
                    <span className="material-symbols-outlined !text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <section className="flex justify-center py-8">
          <nav
            className="flex items-center gap-2"
            aria-label="Blog pagination"
          >
            <Link
              href="/blog?page=0"
              className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0f2e0] dark:hover:bg-white/10 text-[#111811] dark:text-white transition-colors disabled:opacity-50"
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined !text-[20px]">
                chevron_left
              </span>
            </Link>
            <Link
              href="/blog?page=1"
              className="text-sm font-bold flex size-10 items-center justify-center bg-[#2f7f34] text-white rounded-full shadow-sm"
            >
              1
            </Link>
            <Link
              href="/blog?page=2"
              className="text-sm font-medium flex size-10 items-center justify-center text-[#111811] dark:text-white hover:bg-[#e0f2e0] dark:hover:bg-white/10 rounded-full transition-colors"
            >
              2
            </Link>
            <Link
              href="/blog?page=3"
              className="text-sm font-medium flex size-10 items-center justify-center text-[#111811] dark:text-white hover:bg-[#e0f2e0] dark:hover:bg-white/10 rounded-full transition-colors"
            >
              3
            </Link>
            <span className="flex items-center justify-center size-10 text-[#111811] dark:text-white">
              ...
            </span>
            <Link
              href="/blog?page=2"
              className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0f2e0] dark:hover:bg-white/10 text-[#111811] dark:text-white transition-colors"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined !text-[20px]">
                chevron_right
              </span>
            </Link>
          </nav>
        </section>
      </main>

      <Footer />
    </div>
  );
}
