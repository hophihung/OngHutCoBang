import Link from "next/link";
import type { ShopParams } from "./shopFilters";
import { buildShopQuery } from "./shopFilters";

type Props = {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  params: ShopParams;
};

export default function ShopPagination({
  currentPage,
  totalPages,
  total,
  limit,
  params,
}: Props) {
  if (totalPages <= 0) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  const prevHref =
    currentPage <= 1
      ? null
      : `/cua-hang${buildShopQuery(params, { page: String(currentPage - 1) })}`;
  const nextHref =
    currentPage >= totalPages
      ? null
      : `/cua-hang${buildShopQuery(params, { page: String(currentPage + 1) })}`;

  const pageNumbers: number[] = [];
  const maxVisible = 5;
  let from = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let to = Math.min(totalPages, from + maxVisible - 1);
  if (to - from + 1 < maxVisible) {
    from = Math.max(1, to - maxVisible + 1);
  }
  for (let i = from; i <= to; i++) pageNumbers.push(i);

  return (
    <div className="flex flex-col items-center gap-4 mt-8 lg:mt-12">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Hiển thị {start}–{end} trong {total} sản phẩm
      </p>
      <div className="flex items-center gap-2">
        {prevHref ? (
          <Link
            href={prevHref}
            className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Trang trước"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </Link>
        ) : (
          <span
            className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
            aria-hidden
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </span>
        )}

        {pageNumbers.map((p) => {
          const href = `/cua-hang${buildShopQuery(params, { page: String(p) })}`;
          const isCurrent = p === currentPage;
          return (
            <Link
              key={p}
              href={href}
              className={`size-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                isCurrent
                  ? "bg-[#1c5f21] text-white"
                  : "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {p}
            </Link>
          );
        })}

        {nextHref ? (
          <Link
            href={nextHref}
            className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Trang sau"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        ) : (
          <span
            className="size-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed"
            aria-hidden
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </span>
        )}
      </div>
    </div>
  );
}
