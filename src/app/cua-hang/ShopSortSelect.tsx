"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { buildShopQuery, parseShopParams } from "./shopFilters";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "price_asc", label: "Giá: thấp đến cao" },
  { value: "price_desc", label: "Giá: cao đến thấp" },
];

type Props = Record<string, never>;

export default function ShopSortSelect(_props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = parseShopParams(Object.fromEntries(searchParams.entries()));
  const currentSort = params.sort ?? "newest";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const sort = e.target.value;
      const q = buildShopQuery(params, { sort, page: undefined });
      router.replace(`/cua-hang${q}`);
    },
    [params, router]
  );

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500">Sắp xếp:</span>
      <select
        value={currentSort}
        onChange={handleChange}
        className="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1c5f21] cursor-pointer"
        aria-label="Sắp xếp sản phẩm"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
