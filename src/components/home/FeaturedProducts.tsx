"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/database";

const FALLBACK_PRODUCTS: Array<{
  id: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  alt: string;
  badge: string | null;
  badgeClass: string;
}> = [
  {
    id: "1",
    title: "Hộp 50 Ống",
    desc: "Ống hút cỏ khô (20cm)",
    price: "65.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArFKL2mB92ZxZi4LGKjJ3RsA-qfYnCM9QSiXrE6oHtQERg7OM8PA9p61sjDAGYzfB-ikMI1oLvE0NUQD4wkYdWC0bPi9WfrWpQLRDaFPmWLMksREiFPE3rWSOcSzdAu-g8NCyETyyoiUuyGUJEwCvSa8VLprsA-T1HcIn3LMVJKDIFAXbNycd57EAvVGV9QoaFuOZokywRqyOVZXTvK3owZuM91_KMTZpD8iRgoujxS32vgN1Xz_z2h4-TfJ5Qm1LQjkieHznZoJU",
    alt: "Hộp 50 ống hút cỏ bàng khô tự nhiên",
    badge: "Best Seller",
    badgeClass: "bg-[#2f7f34]",
  },
  {
    id: "2",
    title: "Hộp 100 Ống",
    desc: "Gói tiết kiệm gia đình",
    price: "120.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDs_ZH9K9Bt9tmyEZnqJ64W8wgyJRrpOCarmm2I23G7CbL2DvLBDUBPWUDfeE8SYxSSSIoANysKYAu6rP_EYXfZRTF05O0LqizuyENhw8BowXTKq8O7wFDYQ5TfJXyrsk0ceGo9u61ppRpP7d2ApNOKpF6kdG2aiygotY5ve7vRe0pp85670J4S7kDKAf92_xT_DWwMal-hIE6iwVQtN2VH_dglUNaAq439OynFk4diEixvnbosnFVZ9IehMSWzQuH71Ylq6xqqOzE",
    alt: "Hộp 100 ống hút cỏ bàng khô tiết kiệm",
    badge: "-10%",
    badgeClass: "bg-orange-500",
  },
  {
    id: "3",
    title: "Ống Hút Tươi",
    desc: "Giữ nguyên màu xanh (bảo quản lạnh)",
    price: "80.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmEzkfb69Pt8B519HMcosWo8r4y35LKK_S0pNX6EpoW0St_rekGqRDOnoFUTCeTwS17uvPoJ5ZrMsae8bXGfhLX7szomoUUSz8764UQyyB_fzSsivbwxQrSauUzpmfavg3Eec4ELJXUmDgkkGCkwB45w433DwZRs6rHTU9XYOoMuG1OLz9H8_1HzRF42zgyD2why9rW6tO2OPK8DLbFjFxg4pwfXDxX3ZAoXw7zVEU3SeVET80NYQZljjcE1zvSsI_YNY5JY_3Kx0",
    alt: "Ống hút cỏ bàng tươi, màu xanh tự nhiên",
    badge: "Mới",
    badgeClass: "bg-green-600",
  },
  {
    id: "4",
    title: "Combo Quà Tặng",
    desc: "Ống hút + Cọ rửa + Túi vải",
    price: "150.000đ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmVNSRU-N7ZkRG1VmLuJ4uCGGSdz_l5m20Ltk6fjeY0H1YXuqPrSwVgG57cOTfeL7I2KsXhcXCp0a42xJO4a60ClAIlJ2CNCJXnBeDpl1oxd-Catv3-1J6G3cDwhdO65AvrJPCmmiA3tR_FcWOPsb6PnTOMJEj0nKcTVbmGD7R1sKxtB7WWMpSty5rnKmERXeVF6P6hqchBZs7Z0JYHMUucJ5WISKgfJ9_SYivdF-BFmlhvt3d9mbH8fM-jdMYWvFq57ksPG3du3Y",
    alt: "Combo quà tặng xanh ống hút và cọ rửa",
    badge: null,
    badgeClass: "",
  },
];

function formatPrice(price: number): string {
  if (price >= 1000) return `${(price / 1000).toFixed(0)}.000đ`;
  return `${price}đ`;
}

function productToDisplay(p: Product): {
  id: string;
  title: string;
  desc: string;
  price: string;
  image: string;
  alt: string;
  badge: string | null;
  badgeClass: string;
} {
  return {
    id: p.id,
    title: p.name,
    desc: p.description ?? "",
    price: formatPrice(Number(p.price)),
    image: p.image_url ?? "",
    alt: p.name,
    badge: p.is_featured ? "Nổi bật" : null,
    badgeClass: "bg-[#2f7f34]",
  };
}

type FeaturedProductsProps = { products?: Product[] };

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const list =
    products && products.length > 0
      ? products.map(productToDisplay)
      : FALLBACK_PRODUCTS;
  return (
    <section
      id="shop"
      className="w-full py-20 bg-[#f6f8f6] dark:bg-[#141e15]"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#111811] dark:text-white mb-2">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Những lựa chọn được yêu thích nhất.
            </p>
          </div>
          <Link
            href="/cua-hang"
            className="text-[#2f7f34] font-bold hover:underline flex items-center gap-1"
          >
            Xem tất cả{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((p) => (
            <Link
              key={p.id}
              href={`/cua-hang/${p.id}`}
              className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1a261b] shadow-sm transition-all hover:shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={p.image || "/placeholder-product.png"}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {p.badge && (
                  <div
                    className={`absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white ${p.badgeClass}`}
                  >
                    {p.badge}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 text-lg font-bold text-[#111811] dark:text-white group-hover:text-[#2f7f34] transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {p.desc}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-[#2f7f34]">
                    {p.price}
                  </span>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0ea] text-[#2f7f34] hover:bg-[#2f7f34] hover:text-white transition-all"
                    aria-label={`Thêm ${p.title} vào giỏ`}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="material-symbols-outlined text-lg">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
