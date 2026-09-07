import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  image?: string;
};

export type BlogPreview = Pick<BlogPost, "slug" | "title" | "date" | "excerpt" | "image">;

const DIR = path.join(process.cwd(), "content", "blog");

export function slugFromTitle(title: string) {
  const slug = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return slug || "note";
}

export function formatBlogDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

async function ensureDir() {
  await mkdir(DIR, { recursive: true });
}

export async function listPosts(): Promise<BlogPost[]> {
  await ensureDir();
  const names = (await readdir(DIR)).filter((n) => n.endsWith(".json"));
  const posts: BlogPost[] = [];
  for (const name of names) {
    const raw = await readFile(path.join(DIR, name), "utf8");
    try {
      posts.push(JSON.parse(raw) as BlogPost);
    } catch {
      continue;
    }
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const raw = await readFile(path.join(DIR, `${slug}.json`), "utf8");
    return JSON.parse(raw) as BlogPost;
  } catch {
    return null;
  }
}

export async function savePost(post: BlogPost) {
  await ensureDir();
  await writeFile(path.join(DIR, `${post.slug}.json`), `${JSON.stringify(post, null, 2)}\n`, "utf8");
}

export async function uniqueSlug(title: string) {
  let base = slugFromTitle(title);
  let slug = base;
  let n = 2;
  while (await getPost(slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}
