import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/home/Footer";
import { getBlogPostBySlug } from "@/lib/blog";

function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f6] dark:bg-[#102210] text-[#111811] dark:text-white antialiased">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow w-full max-w-[800px] mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#2f7f34] hover:text-[#1e5622] transition-colors"
        >
          <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
          Back to Blog
        </Link>

        <article className="flex flex-col gap-6">
          {post.category && (
            <span className="px-3 py-1 bg-[#e0f2e0] dark:bg-[#2f7f34]/20 text-[#1a401a] dark:text-[#2f7f34] rounded-full text-xs font-bold uppercase tracking-wider w-fit">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-[#111811] dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/60">
            {post.author && <span>{post.author}</span>}
            {(post.author && post.created_at) && <span>·</span>}
            {post.created_at && <time>{formatDate(post.created_at)}</time>}
          </div>

          {post.image_url && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={post.image_url}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
                unoptimized={post.image_url.startsWith("http")}
              />
            </div>
          )}

          <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-white/80 leading-relaxed">
            {post.body ? (
              post.body.includes("<") ? (
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              ) : (
                <p className="whitespace-pre-wrap">{post.body}</p>
              )
            ) : null}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
