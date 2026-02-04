import { getBlogPosts } from "@/lib/blog";
import ContentListClient from "./ContentListClient";

export default async function AdminContentPage() {
  const posts = await getBlogPosts({ limit: 200 });
  return <ContentListClient initialPosts={posts} />;
}
