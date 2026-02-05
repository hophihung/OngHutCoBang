"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import type { ProductSummary } from "@/app/api/products/ids/route";

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + " đ";
}

export default function YeuThichContent() {
  const { favoriteProductIds, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteProductIds.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/products/ids?ids=${favoriteProductIds.join(",")}`)
      .then((res) => res.json())
      .then((data: ProductSummary[]) => setProducts(data))
      .finally(() => setLoading(false));
  }, [favoriteProductIds.join(",")]);

  if (loading) {
    return (
      <div className="rounded-xl bg-white dark:bg-[#152e15] p-12 shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] text-center">
        <p className="text-slate-500 dark:text-slate-400">Đang tải...</p>
      </div>
    );
  }

  if (favoriteProductIds.length === 0 || products.length === 0) {
    return (
      <div className="rounded-xl bg-white dark:bg-[#152e15] p-12 shadow-sm border border-[#f0f4f0] dark:border-[#1f331f] text-center">
        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">
          favorite
        </span>
        <p className="text-[#111811] dark:text-gray-300 font-medium mb-2">
          Chưa có sản phẩm yêu thích
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Nhấn trái tim trên sản phẩm để thêm vào danh sách.
        </p>
        <Link
          href="/cua-hang"
          className="inline-flex items-center gap-2 bg-[#1c5f21] hover:bg-[#164d1b] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Xem cửa hàng
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <article
          key={p.id}
          className="flex flex-col rounded-xl bg-white dark:bg-[#152e15] border border-[#f0f4f0] dark:border-[#1f331f] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <Link href={`/cua-hang/${p.id}`} className="relative block aspect-square bg-slate-50 dark:bg-slate-800/50">
            {p.base_image_url ? (
              <Image
                src={p.base_image_url}
                alt={p.name}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <span className="material-symbols-outlined text-5xl">image</span>
              </div>
            )}
          </Link>
          <div className="p-4 flex flex-col flex-1">
            <Link href={`/cua-hang/${p.id}`}>
              <h3 className="font-semibold text-[#111811] dark:text-white line-clamp-2 mb-2 hover:text-[#1c5f21] transition-colors">
                {p.name}
              </h3>
            </Link>
            <p className="text-lg font-bold text-[#1c5f21] dark:text-green-400 mb-4">
              {formatPrice(p.price)}
            </p>
            <div className="mt-auto flex gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(p.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-semibold"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                  favorite
                </span>
                Bỏ yêu thích
              </button>
              {p.default_variant_id && (
                <button
                  type="button"
                  onClick={() => addToCart(p.default_variant_id!, 1)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] text-white text-sm font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                  Thêm vào giỏ
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
