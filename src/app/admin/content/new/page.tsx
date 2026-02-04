"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqKGDdKY37WfKqF0MwrVcBwu9Ohg4oag6X6JQeeSEFFTPwSBOVfbRjiREu8P-ZkJI9mJximUMeXKeO0_UnDoCtbNb87kJmh-vp0wc2GfmzihWydCp92Nmfv1EOpAZDTp53vFk-4dhC0yIVK01ev81lzHk_bMaKc740ZXvxd5_R1kWjdFqdasuKbpEk9gFeaznlymjtzhCV7OJJLiMxojPDV_PhhO_LBVfujp58oeyIUIyphvqjLKYp955dNymLeK7Qpo8B89vLXs";

export default function AdminContentNewPage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const s = slug.trim().toLowerCase().replace(/\s+/g, "-");
    if (!s) {
      setError("Vui lòng nhập slug.");
      return;
    }
    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.from("blog_posts").insert({
      slug: s,
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      body: body.trim() || null,
      category: category.trim() || null,
      image_url: imageUrl.trim() || null,
      author: author.trim() || null,
      status,
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/admin/content");
    router.refresh();
  }

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f6f8f6] dark:bg-[#131f14] relative">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] px-6 md:px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/content"
            className="text-slate-600 dark:text-slate-300 hover:text-[#1c5f21] text-sm font-medium"
          >
            ← Blog Content
          </Link>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">
            Write New Post
          </h2>
        </div>
        <div className="relative size-8 rounded-full overflow-hidden shrink-0">
          <Image src={ADMIN_AVATAR} alt="Admin" fill className="object-cover" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-[720px] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Slug (URL) *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. my-post-title"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tiêu đề bài viết"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tóm tắt ngắn"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Nội dung đầy đủ (text hoặc HTML)"
                rows={10}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm resize-y"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Sustainability"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Tên tác giả"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#1c5f21] hover:bg-[#164d1b] disabled:opacity-50 text-white h-11 px-6 text-sm font-bold"
              >
                {loading ? "Đang lưu..." : "Tạo bài viết"}
              </button>
              <Link
                href="/admin/content"
                className="rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 h-11 px-6 text-sm font-medium flex items-center"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
