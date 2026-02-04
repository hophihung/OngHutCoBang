"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/database";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

type FilterStatus = "all" | "published" | "draft";

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function StatusBadge({ status }: { status: BlogPost["status"] }) {
  const isPublished = status === "published";
  const label = isPublished ? "Published" : "Draft";
  return (
    <span
      className={
        isPublished
          ? "inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
          : "inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
      }
    >
      {label}
    </span>
  );
}

export default function ContentListClient({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(post: BlogPost) {
    if (!confirm(`Xóa bài viết "${post.title}"?`)) return;
    setDeletingId(post.id);
    const supabase = createClient();
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    setDeletingId(null);
    if (error) {
      alert("Không xóa được: " + error.message);
      return;
    }
    router.refresh();
  }

  const filteredPosts = useMemo(() => {
    let list = initialPosts;
    if (filterStatus === "published") list = list.filter((p) => p.status === "published");
    if (filterStatus === "draft") list = list.filter((p) => p.status === "draft");
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          (p.author ?? "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [initialPosts, filterStatus, searchQuery]);

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Blog Content Management
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative size-8 rounded-full overflow-hidden shrink-0">
            <Image src={ADMIN_AVATAR} alt="Admin profile" fill className="object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-[960px] mx-auto flex flex-col">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 p-4 mb-2">
            <h1 className="text-3xl font-black leading-tight tracking-tight min-w-72 text-slate-900 dark:text-white">
              Blog Posts
            </h1>
            <Link
              href="/admin/content/new"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] transition-colors text-white h-11 px-6 text-sm font-bold leading-normal tracking-wide shadow-md shadow-[#1c5f21]/10"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Write New Post</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-4 px-4 py-2 mb-6 items-center">
            <div className="w-full md:flex-1">
              <label className="flex flex-col h-11 w-full relative">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 focus-within:border-[#1c5f21] focus-within:ring-1 focus-within:ring-[#1c5f21] transition-all shadow-sm">
                  <div className="text-slate-400 flex items-center justify-center pl-4 rounded-l-lg border-r-0 border-slate-200 dark:border-slate-700">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-sm text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-slate-400 px-3 font-normal leading-normal"
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button
                type="button"
                onClick={() => setFilterStatus("all")}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  filterStatus === "all"
                    ? "bg-[#1c5f21]/10 border border-[#1c5f21]/20"
                    : "bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <p
                  className={
                    filterStatus === "all"
                      ? "text-[#1c5f21] text-sm font-semibold leading-normal"
                      : "text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal"
                  }
                >
                  All Posts
                </p>
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("published")}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  filterStatus === "published"
                    ? "bg-[#1c5f21]/10 border border-[#1c5f21]/20"
                    : "bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <p
                  className={
                    filterStatus === "published"
                      ? "text-[#1c5f21] text-sm font-semibold leading-normal"
                      : "text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal"
                  }
                >
                  Published
                </p>
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("draft")}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${
                  filterStatus === "draft"
                    ? "bg-[#1c5f21]/10 border border-[#1c5f21]/20"
                    : "bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <p
                  className={
                    filterStatus === "draft"
                      ? "text-[#1c5f21] text-sm font-semibold leading-normal"
                      : "text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal"
                  }
                >
                  Drafts
                </p>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 pb-12">
            {filteredPosts.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400 text-sm py-8 text-center">
                No posts found.
              </p>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="shrink-0">
                    <div className="relative rounded-lg h-48 sm:h-32 w-full sm:w-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {post.image_url ? (
                        <Image
                          src={post.image_url}
                          alt=""
                          fill
                          className="object-cover"
                          unoptimized={post.image_url.startsWith("http")}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined text-4xl">image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-[#1c5f21] transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                        <div className="hidden sm:flex items-center gap-2 shrink-0 ml-4">
                          <StatusBadge status={post.status} />
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#1c5f21] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Read"
                          >
                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                          </Link>
                          <Link
                            href={`/admin/content/${post.id}/edit`}
                            className="text-slate-400 hover:text-[#1c5f21] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Edit"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(post)}
                            disabled={deletingId === post.id}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
                            aria-label="Delete"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                      <span className="text-slate-700 dark:text-slate-300">
                        {post.author || "—"}
                      </span>
                      <span>•</span>
                      <span>{formatDate(post.updated_at ?? post.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex sm:hidden items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                    <StatusBadge status={post.status} />
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#1c5f21]"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        Đọc
                      </Link>
                      <Link
                        href={`/admin/content/${post.id}/edit`}
                        className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#1c5f21]"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Sửa
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === post.id}
                        className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-600 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Xóa
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
