import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";

const PRODUCTS = [
  {
    id: "1",
    name: "Hand-Cut Lepironia Grass Straws",
    description:
      "Directly sourced, completely biodegradable organic straws for everyday use.",
    price: "$14.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFNN1Zkd65vfbBAK3j91xXSXf_pWZt3kuvhzgKtpC1Jp5Alxoe9EFvABETKAVYM9Y1EkFKGQYF94h4GjWaT7oOVjP2EnbjoNV1_hyiJGa7NOE_fffNqGVzFkxUJ2Fp5Xd--N8Xsuwq5_bwUnL_AfrdmHbUon9bh_k5oVHxv92exT-hpwG-lVEfoimA6Ko8kxmLQlOHm5j0k0tAhj2HSDPNmHaUB1ON7PG71pPsl8ZX27CNTtf1VxWQLdRWQ6cTc9HWLbdVKtSsrdw",
    badge: "Bestseller" as const,
  },
  {
    id: "2",
    name: "Artisan Travel Cutlery Kit",
    description:
      "Compact, reusable bamboo fork, knife, and spoon in a hemp carrying case.",
    price: "$22.50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUCgymuwJZb3Wx1Ghe--5WMvI0n6SA_YVKhR49lapqyQ0g3Xz8QSaSg_zAIjsDJNgBbBYjg0ZjhZx3GTG_UZyALnwLQaPNqjyL4TmHnT_btT0_2V9Mgy0R1X3bNBFDBFWVW_dKVn8uMxDe9TZGdxrY5CN9ENjHeexYalTqXwfs3yGBbTP4t4QsN8o4R4sxUKdKzb2T56yavnWnTSCvHdnZpPJ4YSCA9XVWmeFpTZ2gCXTqJO3oCAByRGcoO6uVAh5zZcCyHjVN9Uc",
    badge: null,
  },
  {
    id: "3",
    name: "The Coastal Picnic Basket",
    description:
      "Hand-woven by local artisans using sustainable rattan and seagrass materials.",
    price: "$45.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrvLyLMStxmyFMhflUnnavoNNBhi5NnFfMBT-0A6IqFY9RNNesnaLpXTU71pnNOVkA1Ygp1DyamWreJEGYoUVO3XcOCBJwqLxIwHvPVtKn3whTgrU375B4quTpBSA4VQDKdEqaXzLJkya33BeppbM5VOGZI2a8OT3mMxbA0fUgCFVnw3Ac3nem6033SaqnM4X9ytIF2xP1cyqexfL3CiNYL3qHWJ31-lm5PH7h4sj8JQGgxq86Z5kZgBol-xsmAP-TFsbJRypwyyw",
    badge: null,
  },
  {
    id: "4",
    name: "Bulk Eco-Straw Bundle (250pc)",
    description:
      "Perfect for events or small businesses looking for plastic-free alternatives.",
    price: "$38.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNaR1vP3GYoNVlT4zpgB4Jo3Dd639GXdBr3lhbfjHlx_TDP9IuCT0Wc2-GF10H0JQa4cCM2AepUpxXIegCVRZ5PA2updsS1FIJQs-jkGZDL8S1AIytkTwS5Pp2mfp9GG-L4ery1aCyVeZJTylkSBKWqAavQDh6wFjgFh0jCtPpc4QnS3AH4WfVuyPBORkibp9px_zCwPLzGrz0GFVJtExscea4p-mt2ZebXRM843l8kyUdTLmtnlBzRylyHz3Km02Pn07Zg3Lv88",
    badge: null,
  },
  {
    id: "5",
    name: "Bamboo Toothbrush Set",
    description:
      "4-pack of compostable toothbrushes with soft BPA-free bristles.",
    price: "$12.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMFtS3ryX-4ZrEvwdLIbhkmTuZRAG_qdHtkD2tWvinlaXQpNWS_XXHH-JcnmuwyBSexeFDkgTKT3nsTE_b4svtLqF2uoj4jXY2S3LvAPaoQ_dmn-OOBUr18p9y2ZQ4HZc9fedDb266kdi_KY54S_8MEDDgkWCbt1yIccorU4o9-3yBZtzFuubPzW8o0TBaRLQ-MK-qhykyIxtrfD5GqQk-Arc0Aw6eYKE1YyWLI512UPElh4u9qf7UPPKhTJZEAhgRSFxkV37HDJ8",
    badge: "New" as const,
  },
  {
    id: "6",
    name: "Natural Kitchen Scrubber",
    description:
      "Durable, plant-based loofah scrubbers that replace plastic sponges.",
    price: "$8.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-EF70bTQNhtg-mbHvp67C-lZON4xTUs_kaBO1v3xIap1k7qcDF_Ofo4lnHyyhghVY228f_2mOZ0YeQMRIRCa0wFrArwzpeHTmPcUMG_77NRPlnfSTE5q2A1U5WBfW18yEINRgqCQdPOViMGU5drBat_T_D_DiG2bLxEukAMo2YOO1ALX7gmMirNMucGxCcFRLu9Xu1qaK6_0J4npD3pUvb-GKjTg9VMuinTTwfMqRtdUew7VdDJp8aOnJLc3Bfk4rjYsCAczJ1zg",
    badge: null,
  },
];

const CATEGORIES = [
  { label: "Grass Straws", href: "/cua-hang?category=grass-straws", icon: "eco", active: true },
  { label: "Handicrafts", href: "/cua-hang?category=handicrafts", icon: "palette", active: false },
  { label: "Utensils", href: "/cua-hang?category=utensils", icon: "restaurant", active: false },
  { label: "Bundled Sets", href: "/cua-hang?category=sets", icon: "inventory_2", active: false },
];

export default function CuaHangPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102212] text-slate-900 dark:text-white transition-colors duration-200">
      <AnnouncementBar />
      <Header />

      <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 lg:sticky lg:top-24 self-start">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Categories
            </h3>
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.active
                      ? "bg-[#1c5f21]/10 text-[#1c5f21] font-semibold dark:bg-[#1c5f21]/20"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-slate-400">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Price Range
            </h3>
            <div className="px-2 pt-6 pb-2">
              <div className="relative h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full">
                <div className="absolute h-full left-[20%] right-[30%] bg-[#1c5f21] rounded-full" />
                <div className="absolute -top-2 left-[20%] size-5 bg-white dark:bg-slate-800 border-2 border-[#1c5f21] rounded-full shadow-md cursor-pointer" />
                <div className="absolute -top-2 right-[30%] size-5 bg-white dark:bg-slate-800 border-2 border-[#1c5f21] rounded-full shadow-md cursor-pointer" />
              </div>
              <div className="flex justify-between mt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-600 text-[#1c5f21] focus:ring-[#1c5f21] focus:ring-offset-0 bg-white dark:bg-slate-800 transition-all"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                In Stock Only
              </span>
            </label>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#1c5f21]/5 border border-[#1c5f21]/10">
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="font-bold text-[#1c5f21] block mb-1">
                Impact Driven
              </span>
              Every purchase contributes to our mission of reducing ocean
              plastic by 1 million tons by 2030.
            </p>
          </div>
        </aside>

        {/* Main Product Area */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Showing 12 products
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select className="text-sm font-medium border-none bg-transparent focus:ring-0 cursor-pointer pr-8 py-0 text-slate-900 dark:text-white focus:outline-none">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCTS.map((product) => (
              <article
                key={product.id}
                className="group bg-white dark:bg-[#141e15] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full"
              >
                <Link href={`/cua-hang/${product.id}`} className="relative block aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                        product.badge === "Bestseller"
                          ? "bg-white/90 text-[#1c5f21]"
                          : "bg-[#1c5f21] text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/cua-hang/${product.id}`}>
                    <h3 className="font-serif text-xl text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-[#1c5f21] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 gap-2">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {product.price}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#1c5f21] text-[#1c5f21] text-sm font-bold hover:bg-[#1c5f21] hover:text-white transition-all whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add_shopping_cart
                      </span>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-8 lg:mt-12 gap-2">
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              disabled
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center bg-[#1c5f21] text-white font-bold"
            >
              1
            </button>
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
