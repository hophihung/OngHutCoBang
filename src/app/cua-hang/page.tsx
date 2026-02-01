import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import {
  getCategories,
  getStoreProductsFiltered,
} from "@/lib/products";
import ShopProductCard from "./ShopProductCard";
import ShopPagination from "./ShopPagination";
import ShopSidebarFilters from "./ShopSidebarFilters";
import ShopSortSelect from "./ShopSortSelect";
import { parseShopParams } from "./shopFilters";

const LIMIT = 12;

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function paramsToFilterOptions(params: ReturnType<typeof parseShopParams>) {
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const minPrice = params.minPrice != null && params.minPrice !== "" ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice != null && params.maxPrice !== "" ? Number(params.maxPrice) : undefined;
  const sort =
    params.sort === "price_asc" || params.sort === "price_desc" || params.sort === "newest"
      ? params.sort
      : "newest";
  return {
    categorySlug: params.category,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    inStockOnly: params.inStock === "1",
    sort,
    page,
    limit: LIMIT,
  };
}

export default async function CuaHangPage({ searchParams }: Props) {
  const raw = searchParams ? await searchParams : {};
  const params = parseShopParams(raw);
  const options = paramsToFilterOptions(params);

  const [categories, { products, total }] = await Promise.all([
    getCategories(),
    getStoreProductsFiltered(options),
  ]);

  const totalPages = Math.ceil(total / LIMIT);
  const currentPage = Math.min(options.page, totalPages || 1);
  const start = total === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const end = Math.min(currentPage * LIMIT, total);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102212] text-slate-900 dark:text-white transition-colors duration-200">
      <AnnouncementBar />
      <Header />

      <main className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-8 lg:sticky lg:top-24 self-start">
          <ShopSidebarFilters categories={categories} />
          <div className="mt-4 p-4 rounded-xl bg-[#1c5f21]/5 border border-[#1c5f21]/10">
            <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="font-bold text-[#1c5f21] block mb-1">
                Impact Driven
              </span>
              Every purchase contributes to our mission of reducing ocean
              plastic by 1 million tons by 2030.
            </p>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {total === 0
                ? "Không có sản phẩm"
                : `Hiển thị ${start}–${end} trong ${total} sản phẩm`}
            </h2>
            <ShopSortSelect />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 dark:text-slate-400 py-12">
                Chưa có sản phẩm.
              </p>
            ) : (
              products.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          <ShopPagination
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            limit={LIMIT}
            params={params}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
