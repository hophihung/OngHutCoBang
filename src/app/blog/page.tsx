import Image from "next/image";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import { getBlogPosts, getBlogPostsCount } from "@/lib/blog";
import type { BlogPost } from "@/types/database";

const PER_PAGE = 6;

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const gridOffset = 1 + (currentPage - 1) * PER_PAGE;
  const [featured, gridPosts, totalCount] = await Promise.all([
    currentPage === 1
      ? getBlogPosts({ status: "published", limit: 1 }).then((p) => p[0] ?? null)
      : Promise.resolve(null),
    getBlogPosts({
      status: "published",
      limit: PER_PAGE,
      offset: gridOffset,
    }),
    getBlogPostsCount("published"),
  ]);
  const totalPages = Math.ceil(Math.max(0, totalCount - 1) / PER_PAGE) || 1;
  const postsForGrid = gridPosts;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-12 md:gap-16">
        <section className="flex flex-col items-center text-center gap-4 py-4 md:py-8">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#111811] dark:text-white">
            Green Living Blog
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white/70 italic font-light">
            Tips for a zero-waste lifestyle
          </p>
        </section>

        {currentPage === 1 && featured && (
          <section className="w-full">
            <div className="group flex flex-col lg:flex-row bg-white dark:bg-[#1a2e1a] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#e0e6e0] dark:border-[#2a402a]">
              <div className="w-full lg:w-3/5 h-[300px] lg:h-[450px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                {featured.image_url ? (
                  <Image
                    src={featured.image_url}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    unoptimized={featured.image_url.startsWith("http")}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="material-symbols-outlined text-6xl">article</span>
                  </div>
                )}
              </div>
              <div className="w-full lg:w-2/5 p-6 md:p-10 flex flex-col justify-center items-start gap-4 md:gap-6 bg-white dark:bg-[#1a2e1a]">
                <div className="flex items-center gap-3">
                  {featured.category && (
                    <span className="px-3 py-1 bg-[#e0f2e0] dark:bg-[#2f7f34]/20 text-[#1a401a] dark:text-[#2f7f34] rounded-full text-xs font-bold uppercase tracking-wider">
                      {featured.category}
                    </span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-white/60">
                    {formatDate(featured.created_at)}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#111811] dark:text-white">
                  {featured.title}
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-white/70 leading-relaxed font-light line-clamp-3">
                  {featured.excerpt || "—"}
                </p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-2 inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#2f7f34] hover:bg-[#1e5622] text-white font-bold text-sm transition-colors"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-[#e0e6e0] dark:border-[#2a402a] pb-4">
            <h3 className="text-2xl font-bold text-[#111811] dark:text-white">
              Latest Articles
            </h3>
          </div>
          {postsForGrid.length === 0 ? (
            <p className="text-gray-500 dark:text-white/60 text-center py-12">
              No articles yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {postsForGrid.map((article: BlogPost) => (
                <article key={article.id} className="flex flex-col gap-4 group">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={article.image_url.startsWith("http")}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-4xl">image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      {article.category && (
                        <span className="text-[#2f7f34] text-xs font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                      )}
                      <span className="text-gray-500 dark:text-white/50 text-xs">
                        {formatDate(article.created_at)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-[#111811] dark:text-white group-hover:text-[#2f7f34] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white/60 text-sm line-clamp-2">
                      {article.excerpt || "—"}
                    </p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#111811] dark:text-white underline decoration-[#2f7f34] decoration-2 underline-offset-4 hover:text-[#2f7f34] transition-colors mt-2"
                    >
                      Read More{" "}
                      <span className="material-symbols-outlined !text-[16px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <section className="flex justify-center py-8">
            <nav className="flex items-center gap-2" aria-label="Blog pagination">
              <Link
                href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "/blog"}
                className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0f2e0] dark:hover:bg-white/10 text-[#111811] dark:text-white transition-colors"
                aria-label="Previous page"
              >
                <span className="material-symbols-outlined !text-[20px]">chevron_left</span>
              </Link>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={p === 1 ? "/blog" : `/blog?page=${p}`}
                  className={`text-sm flex size-10 items-center justify-center rounded-full transition-colors ${
                    p === currentPage
                      ? "bg-[#2f7f34] text-white font-bold"
                      : "font-medium text-[#111811] dark:text-white hover:bg-[#e0f2e0] dark:hover:bg-white/10"
                  }`}
                >
                  {p}
                </Link>
              ))}
              <Link
                href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : `/blog?page=${totalPages}`}
                className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0f2e0] dark:hover:bg-white/10 text-[#111811] dark:text-white transition-colors"
                aria-label="Next page"
              >
                <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
              </Link>
            </nav>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
