import Image from "next/image";

const BEST_SELLERS = [
  {
    title: "Ống hút cỏ bàng khô Green Joy - hộp tròn 100 ống",
    price: "77,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVHZla-QN6A6WwaGyv8sMKLlbpuwojPjtZQwyZS2aPYytWXNGsRIyQ-1hrOxVPabn99LYged9VuXLEyxZsvCu53JLT1KOOGMb792GVMB3601lqYOGy4UTjChqgqYQXmjLFvfKMY2-XCes4TBVMDkmlV8TlNMvzGNvVyFh1Hg2lGv-hBudka85M-A7NRQD5bCLBJ410K0Wb9fJYGDRLSNAFk_jKuEdzGACQS9T2WJwuCbXGn9cgVlQf_tObtrTe6qi233Hba_gF_us",
    imageAlt: "Ống hút cỏ bàng khô tròn",
  },
  {
    title: "Lót ly cỏ bàng Green Joy",
    price: "91,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfRjJwfD_RyIBfhUdIR_MaC3gVLPEiHmyktOfOCDqgjIp8Mu47c1Mbe-PAa5-jtgfNcuRsM_yO5r_xcW-Z0-4dfrgA5l7kkPKFoGemxEWsNGJdpDPx4o02_4Jzd7aRS2KGD5ZfDekx9K4ok3LX-BKg8vDv3We9NoDI5eNn7vMCXGouSeDWzax9w2ccLVIB0EudvaI33W3O53eKfQhW9Y9DHVAtizHiHR8UGhg893WWjU1P4P7P36B_XfwKa3Qns7SlWHO7saqkLbA",
    imageAlt: "Lót ly cỏ bàng",
    featured: true,
  },
  {
    title: "Thảm bàn ăn cỏ bàng Green Joy chữ nhật (Combo 4)",
    price: "195,000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtyScNV8vcop-GfMqUOShp0YUftEYAIslP-Ud7LeggATX4Wmi3jQHQlZP1UUn0TCLUJPVYn3kT_EOiR7oiMoshfpsAKS8G05zbp7Sd1xdDwBAlfyk8gFAGOBo-XWrwwONt4_Qv7TPNyQRVTYGqF_XfAaZKJufKXdl9wFUxcdA8kNjG-Pa75mvE2Ef9xylZF_Jf_yaQ-IG9Vj8GPGlrlOBJLL0CAkOelGdhEOkGe-OnZ7FRcX_EfzUIbsInhDlgsUmPPP6aMAWo12U",
    imageAlt: "Thảm bàn ăn cỏ bàng",
  },
];

export default function BestSellers() {
  return (
    <section className="bg-sage dark:bg-sage py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10 font-sans">
          Các sản phẩm bán chạy nhất
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BEST_SELLERS.map((item, i) => (
            <div
              key={item.title}
              className={`bg-surface dark:bg-surface rounded-2xl p-6 shadow-lg flex flex-col justify-between ${
                item.featured
                  ? "transform md:-translate-y-4 md:border-4 border-white dark:border-gray-600"
                  : ""
              }`}
            >
              <div className="flex items-center gap-1 mb-4">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center">
                  <span className="material-icons text-[12px] mr-1">
                    verified
                  </span>{" "}
                  Official store
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={192}
                  height={192}
                  className="h-48 w-auto object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-primary font-bold text-xl">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-8 gap-2">
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded text-sm hover:bg-primary-hover"
          >
            1
          </button>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-black/20 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-sm hover:bg-black/30"
          >
            2
          </button>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-black/20 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-sm hover:bg-black/30"
          >
            3
          </button>
          <span className="w-8 h-8 flex items-center justify-center text-gray-500">
            ...
          </span>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-black/20 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-sm hover:bg-black/30"
          >
            12
          </button>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-black/20 dark:bg-white/10 text-gray-600 dark:text-gray-300 rounded text-sm hover:bg-black/30"
          >
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
