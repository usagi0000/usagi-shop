import { savePost, uniqueSlug } from "@/lib/blog";

export async function POST(request: Request) {
  const formData = await request.formData();
  const expected = process.env.BLOG_PASSWORD;
  const password = String(formData.get("password") ?? "");
  if (expected && password !== expected) {
    return Response.json({ ok: false, error: "Wrong password." }, { status: 401 });
  }

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const excerptRaw = String(formData.get("excerpt") ?? "").trim();

  if (!title) return Response.json({ ok: false, error: "Need a title." }, { status: 400 });
  if (!body) return Response.json({ ok: false, error: "Need some text." }, { status: 400 });
  if (title.length > 120) return Response.json({ ok: false, error: "Title too long." }, { status: 400 });
  if (body.length > 20000) return Response.json({ ok: false, error: "Text too long." }, { status: 400 });

  const slug = await uniqueSlug(title);
  const excerpt = excerptRaw || body.replace(/\s+/g, " ").slice(0, 160);
  const imageRaw = String(formData.get("image") ?? "").trim();
  const image = imageRaw.startsWith("/images/") ? imageRaw : undefined;

  await savePost({
    slug,
    title,
    date: new Date().toISOString(),
    excerpt,
    body,
    ...(image ? { image } : {}),
  });

  return Response.json({ ok: true, slug });
}
