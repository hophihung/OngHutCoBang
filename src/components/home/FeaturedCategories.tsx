import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Grass Straws",
    desc: "The original green solution.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDVvdukrkIKRkDZLn6IwiZBNHb1A2_4U4WHtnKOOQxnd9Lf2ScJeUJnvSar7VWmdG-BATv8clGnByytjMnD9_757FPSB0sLcM4s__bwEGA1tdHwXlNMbUquoz4j-330UaecukroHWlkiXxSGatw76Y-FHpCbX95dMES-8tszknDNd1lRYP4q7xZCYnrEpyRrDGGuXK-zS9q0t2cbfJkp98bYWnLAPgubyiP_S2cPEcAh-0mRE9q03xUdG0CcwBsEJGk_hmJuPHhETV0",
    alt: "Bundle of green grass straws on a table",
  },
  {
    title: "Handicrafts",
    desc: "Woven bags, mats, and decor.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD40UCBe0RSgPYigQxO6jT7xj0SZn6D2Vs0QeOXzBc4Z_SpEaaFMgTwqriSHVjDSBmcx4ctk2Yo04pN-3KnfJFgWq_N2Kh14nyVIlApZjuD7aEG_mQXN33E7hckKWJFRtncfltQ6JmCzcn5I6935zGdJcKj2VENC4eX5H8DJTVOpgPX4G1crXLyWL2olIKJ62XDTiS6f0KjeFZI3RNkUJaGwztehi8x3T_lZLEbRKtlQLSm9ohNOgaHzj9jm7TwXjI7RN1Xx8sPtU8X",
    alt: "Woven sedge bags and handcrafted baskets",
  },
  {
    title: "Eating Utensils",
    desc: "Reusable bamboo cutlery.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAj1RtzBYa11xUxOh1rSqk46hxPqCr7FYYv39DwFicnf-neKmsPB3WSxol8L63XFFuy_PF4lLR_xkNcbMx4zyvW742yARbtyfpovlvLcBPasWxidc16NGhvMbjQ1Ii7n85WAU4tZodMYe9DIpZwImzketyqw1l6n1p2qlBcDi95iWgHYS3_gwC3fp8L_mrWxaajf3KvcqXuBftrthLHAWcTm7aZSS9t7t3KCegODnuf8Jhi4w6geJdOAiLKk1iLKdPtAFRRuHJ6lhZf",
    alt: "Wooden and bamboo eating utensils set",
  },
];

export default function FeaturedCategories() {
  return (
    <section id="shop" className="py-20 px-6 bg-white dark:bg-white/5">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0d1b12] dark:text-white mb-2">
              Shop Sustainable
            </h2>
            <p className="text-[#4c9a66]">
              Browse our most popular eco-friendly collections.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex text-primary font-bold items-center gap-1 hover:gap-2 transition-all"
          >
            View all products{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href="#"
              className="group relative flex flex-col gap-4 rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10 relative">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-[#0d1b12] dark:text-white">
                  {cat.title}
                </h3>
                <p className="text-[#4c9a66] text-sm">{cat.desc}</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="material-symbols-outlined text-primary">
                  arrow_outward
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
