"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import type { FeaturedProduct } from "@/lib/products";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + " đ";
}

type FeaturedProductsProps = { products?: FeaturedProduct[] };

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const list = products ?? [];
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  async function handleAddToCart(e: React.MouseEvent, p: FeaturedProduct) {
    e.preventDefault();
    if (p.default_variant_id == null) return;
    await addToCart(p.default_variant_id, 1);
  }

  return (
    <section className="w-full py-16 bg-[#f9fafb] dark:bg-[#111827]" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="space-y-1">
            <p id="featured-heading" className="text-[#1c5f21] dark:text-green-400 text-xs font-semibold uppercase tracking-[0.2em]">
              The Best For You
            </p>
            <h2 className="text-[#111811] dark:text-white text-2xl sm:text-3xl font-bold tracking-tight">
              Sản phẩm nổi bật
            </h2>
          </div>
          <Link
            href="/cua-hang"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1c5f21] dark:text-green-400 hover:text-[#164d1b] dark:hover:text-green-300 transition-colors group shrink-0"
          >
            Xem thêm
            <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-16 px-4">
            <p className="text-gray-500 dark:text-gray-400">Chưa có sản phẩm nổi bật.</p>
            <Link
              href="/cua-hang"
              className="mt-4 inline-block text-sm font-medium text-[#1c5f21] dark:text-green-400 hover:underline"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {list.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col bg-white dark:bg-[#1f2937] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-[#1c5f21]/20 dark:hover:border-green-500/30 transition-all duration-300"
              >
                <Link href={`/cua-hang/${p.id}`} className="flex flex-1 flex-col">
                  <div className="relative aspect-square bg-gray-50 dark:bg-gray-800/50 overflow-hidden">
                    <Image
                      src={p.image_url || "/placeholder-product.png"}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute top-3 left-3 bg-[#1c5f21] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      Nổi bật
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(p.id);
                      }}
                      className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm transition-colors ${
                        isFavorite(p.id)
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                      }`}
                      aria-label={isFavorite(p.id) ? "Bỏ yêu thích" : "Yêu thích"}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: isFavorite(p.id) ? '"FILL" 1' : undefined }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col p-5 text-left">
                    <span className="text-[10px] font-semibold text-[#1c5f21] dark:text-green-400 uppercase tracking-[0.15em] mb-1.5">
                      ReenCo
                    </span>
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-2 group-hover:text-[#1c5f21] dark:group-hover:text-green-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-base font-bold text-[#1c5f21] dark:text-green-400 mt-auto">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, p)}
                    disabled={!p.default_variant_id}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c5f21] focus:ring-offset-2"
                    aria-label={`Thêm ${p.name} vào giỏ`}
                  >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                    Thêm vào giỏ
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
