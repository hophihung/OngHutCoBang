"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export type ProductVariantForDetail = {
  id: number;
  variant_name: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
};

type ProductDetailProps = {
  product: {
    id: number;
    name: string;
    description: string | null;
    base_image_url: string | null;
    images: string[];
    variants: ProductVariantForDetail[];
  };
};

export default function ProductDetailContent({ product }: { product: ProductDetailProps["product"] }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const mainImage = product.images[selectedImageIndex] ?? product.images[0];
  const selectedVariant = product.variants[selectedVariantIndex] ?? product.variants[0];
  const price = selectedVariant ? selectedVariant.price : 0;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAdding(true);
    const { error } = await addToCart(selectedVariant.id, quantity);
    setAdding(false);
    if (!error) router.push("/gio-hang");
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col gap-6">
        <div className="relative w-full aspect-square overflow-hidden rounded-[2rem] bg-[#f0f4f0] dark:bg-[#1a2e1d] group">
          {mainImage ? (
            <Image
              src={mainImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-6xl">image</span>
            </div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {product.images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 p-0.5 transition-colors ${
                  i === selectedImageIndex ? "border-[#1c5f21]" : "border-transparent hover:border-[#1c5f21]/50"
                }`}
              >
                <span className="relative block h-full w-full rounded-xl overflow-hidden">
                  <Image src={src} alt="" fill className="object-cover rounded-xl" sizes="96px" />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[40px] leading-tight">
          {product.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-6">
          <div className="text-3xl font-bold text-[#1c5f21]">
            {price.toLocaleString("vi-VN")} đ
          </div>
        </div>
        <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {product.description || "Sản phẩm ống hút cỏ tự nhiên."}
        </p>
        <div className="my-8 h-px w-full bg-[#f0f4f0] dark:bg-[#1f3322]" />

        {product.variants.length > 0 && (
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-900 dark:text-white">
              Chọn biến thể
            </label>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIndex(i)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    i === selectedVariantIndex
                      ? "bg-[#1c5f21] text-white shadow-lg shadow-[#1c5f21]/25 ring-2 ring-[#1c5f21] ring-offset-2 ring-offset-white dark:ring-offset-[#102212]"
                      : "bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-[#1c5f21] hover:text-[#1c5f21]"
                  }`}
                >
                  {v.variant_name || `Variant ${v.id}`} – {Number(v.price).toLocaleString("vi-VN")} đ
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="flex h-12 w-32 shrink-0 items-center justify-between rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 px-4">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-[#1c5f21] transition-colors"
              aria-label="Decrease quantity"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="font-semibold text-slate-900 dark:text-white">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-[#1c5f21] transition-colors"
              aria-label="Increase quantity"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
          <div className="flex grow gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedVariant || adding}
              className="flex h-12 grow items-center justify-center gap-2 rounded-full bg-[#1c5f21] px-6 text-sm font-bold text-white shadow-lg shadow-[#1c5f21]/25 hover:bg-[#164d1b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {adding ? "Đang thêm..." : "Add to Cart"}
            </button>
            <button
              type="button"
              className="flex h-12 grow items-center justify-center gap-2 rounded-full border-2 border-[#1c5f21] bg-transparent px-6 text-sm font-bold text-[#1c5f21] hover:bg-[#1c5f21]/10 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { icon: "eco", text: "100% Natural Grass" },
            { icon: "recycling", text: "Fully Biodegradable" },
            { icon: "task_alt", text: "Chemical Free" },
            { icon: "local_shipping", text: "Plastic-Free Shipping" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-[#1c5f21]">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
