import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/blog";
import BlogPostEditForm from "./BlogPostEditForm";

type Props = { params: Promise<{ id: string }> };

export default async function AdminContentEditPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id, 10);
  if (Number.isNaN(postId)) notFound();
  const post = await getBlogPostById(postId);
  if (!post) notFound();
  return <BlogPostEditForm post={post} />;
}
