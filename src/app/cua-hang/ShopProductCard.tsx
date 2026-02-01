"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { StoreProduct } from "@/lib/products";

function formatPrice(price: number): string {
  if (price >= 1000) return `${(price / 1000).toFixed(1)}k`;
  return `${price.toFixed(0)}`;
}

export default function ShopProductCard({ product }: { product: StoreProduct }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.default_variant_id) return;
    setAdding(true);
    const { error } = await addToCart(product.default_variant_id, 1);
    setAdding(false);
    if (error === "login_required") {
      router.push("/tai-khoan?next=/gio-hang");
      return;
    }
  };

  return (
    <article className="group bg-white dark:bg-[#141e15] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col h-full">
      <Link
        href={`/cua-hang/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/50"
      >
        {product.base_image_url ? (
          <Image
            src={product.base_image_url}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-5xl">image</span>
          </div>
        )}
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
          {product.description ?? ""}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 gap-2">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {product.price != null ? formatPrice(product.price) + "₫" : "—"}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.default_variant_id || adding}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#1c5f21] text-[#1c5f21] text-sm font-bold hover:bg-[#1c5f21] hover:text-white transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            {adding ? "Đang thêm..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
