import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-card shadow-[0_1px_0_rgba(74,55,40,0.04)]">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-2">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <p className="font-script text-xl text-pink-deep">Artwork coming soon ♡</p>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col bg-[#fbf3e6] px-4 py-4">
        <p className="text-xs text-ink-soft">{formatBlogDate(post.date)}</p>
        <Link href={`/blog/${post.slug}`} className="mt-1 font-display text-lg font-bold text-ink hover:text-pink-deep">
          {post.title}
        </Link>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex w-fit items-center justify-center rounded-full bg-pink px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-pink-deep"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
