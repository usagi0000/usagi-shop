import { zipAdamIcons } from "@/lib/adam-icons";

export const dynamic = "force-static";

export async function GET() {
  const body = zipAdamIcons();
  return new Response(body, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="adam-app-icon-collection.zip"',
      "Cache-Control": "no-store",
    },
  });
}
