import { PageShell } from "@/components/PageShell";
import { formatBlogDate, getPost, listPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await listPosts();
  if (posts.length === 0) return [{ slug: "_" }];
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post?.title ?? "Note" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <PageShell title={post.title} kicker={formatBlogDate(post.date)} center>
      <article className="max-w-2xl whitespace-pre-wrap leading-relaxed text-ink-soft">{post.body}</article>
    </PageShell>
  );
}
