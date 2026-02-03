"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import type { FeaturedProduct } from "@/lib/products";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + " đ";
}

type FeaturedProductsProps = { products?: FeaturedProduct[] };

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const list = products ?? [];
  const { addToCart } = useCart();

  async function handleAddToCart(e: React.MouseEvent, p: FeaturedProduct) {
    e.preventDefault();
    if (p.default_variant_id == null) return;
    await addToCart(p.default_variant_id, 1);
  }

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
        {list.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Chưa có sản phẩm nổi bật.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map((p) => (
              <Link
                key={p.id}
                href={`/cua-hang/${p.id}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1a261b] shadow-sm transition-all hover:shadow-lg border border-gray-100 dark:border-gray-800"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={p.image_url || "/placeholder-product.png"}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white bg-[#2f7f34]">
                    Nổi bật
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-1 text-lg font-bold text-[#111811] dark:text-white group-hover:text-[#2f7f34] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {p.description ?? ""}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-[#2f7f34]">
                      {formatPrice(p.price)}
                    </span>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf0ea] text-[#2f7f34] hover:bg-[#2f7f34] hover:text-white transition-all"
                      aria-label={`Thêm ${p.name} vào giỏ`}
                      onClick={(e) => handleAddToCart(e, p)}
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
        )}
      </div>
    </section>
  );
}
