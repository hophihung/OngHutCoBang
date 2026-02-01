"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { CategoryRow } from "@/lib/products";
import { buildShopQuery, parseShopParams } from "./shopFilters";

const CATEGORY_ICONS: Record<string, string> = {
  "grass-straws": "eco",
  grass: "eco",
  handicrafts: "palette",
  utensils: "restaurant",
  sets: "inventory_2",
  bundled: "inventory_2",
};

function getCategoryIcon(cat: CategoryRow): string {
  const slug = (cat.slug ?? "").toLowerCase();
  const name = (cat.name ?? "").toLowerCase();
  return (
    CATEGORY_ICONS[slug] ??
    CATEGORY_ICONS[name.replace(/\s+/g, "-")] ??
    "category"
  );
}

type Props = {
  categories: CategoryRow[];
};

export default function ShopSidebarFilters({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = parseShopParams(Object.fromEntries(searchParams.entries()));

  const updateQuery = useCallback(
    (overrides: Partial<Record<string, string>>) => {
      const next = { ...params, ...overrides };
      const q = buildShopQuery(next);
      router.replace(`/cua-hang${q}`);
    },
    [params, router]
  );

  const inStockChecked = params.inStock === "1";

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Categories
        </h3>
        <nav className="flex flex-col gap-1">
          <Link
            href="/cua-hang"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              !params.category
                ? "bg-[#1c5f21]/10 text-[#1c5f21] font-semibold dark:bg-[#1c5f21]/20"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-slate-400">
              list
            </span>
            <span className="text-sm">Tất cả</span>
          </Link>
          {categories.map((cat) => {
            const slug = cat.slug ?? String(cat.id);
            const href = buildShopQuery(params, { category: slug, page: undefined });
            const isActive = params.category === slug;
            return (
              <Link
                key={cat.id}
                href={`/cua-hang${href}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#1c5f21]/10 text-[#1c5f21] font-semibold dark:bg-[#1c5f21]/20"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] text-slate-400">
                  {getCategoryIcon(cat)}
                </span>
                <span className="text-sm">{cat.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Price Range
        </h3>
        <form
          className="px-2 pt-2 pb-2"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const min = (form.querySelector('[name="minPrice"]') as HTMLInputElement)?.value;
            const max = (form.querySelector('[name="maxPrice"]') as HTMLInputElement)?.value;
            updateQuery({ minPrice: min || undefined, maxPrice: max || undefined, page: undefined });
          }}
        >
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="minPrice"
              min={0}
              step={1}
              placeholder="0"
              defaultValue={params.minPrice}
              className="w-20 px-2 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <span className="text-slate-400">–</span>
            <input
              type="number"
              name="maxPrice"
              min={0}
              step={1}
              placeholder="100"
              defaultValue={params.maxPrice}
              className="w-20 px-2 py-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-sm font-medium rounded bg-[#1c5f21] text-white hover:bg-[#256629]"
            >
              Áp dụng
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={inStockChecked}
            onChange={(e) =>
              updateQuery({
                inStock: e.target.checked ? "1" : undefined,
                page: undefined,
              })
            }
            className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-600 text-[#1c5f21] focus:ring-[#1c5f21] focus:ring-offset-0 bg-white dark:bg-slate-800 transition-all"
          />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            In Stock Only
          </span>
        </label>
      </div>
    </>
  );
}
