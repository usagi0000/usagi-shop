const TO = "usagi199922@gmail.com";

export type Order = {
  name: string;
  email: string;
  paint: string;
  budget: string;
  width: string;
  height: string;
};

function clip(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function parseOrder(raw: unknown): Order | null {
  if (!raw || typeof raw !== "object") return null;
  const body = raw as Record<string, unknown>;
  const name = clip(body.name, 80);
  const email = clip(body.email, 120).toLowerCase();
  const paint = String(body.paint ?? "")
    .trim()
    .slice(0, 4000);
  const budget = clip(body.budget, 80);
  const width = clip(body.width, 8);
  const height = clip(body.height, 8);
  const w = Number(width);
  const h = Number(height);
  if (!name || !email.includes("@") || !email.includes(".") || !paint) return null;
  if (!Number.isFinite(w) || !Number.isFinite(h) || w < 1 || h < 1 || w > 300 || h > 300) return null;
  return { name, email, paint, budget: budget || "Not specified", width: String(w), height: String(h) };
}

export async function sendCustomOrder(order: Order) {
  const res = await fetch(`https://formsubmit.co/ajax/${TO}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `Usagi Art custom order — ${order.width}×${order.height} cm`,
      _template: "table",
      _captcha: "false",
      _replyto: order.email,
      name: order.name,
      email: order.email,
      budget: order.budget,
      canvas: `${order.width} × ${order.height} cm`,
      "what to paint": order.paint,
    }),
    signal: AbortSignal.timeout(15000),
  });
  const text = await res.text();
  let data: { success?: string | boolean; message?: string } | null = null;
  try {
    data = JSON.parse(text) as { success?: string | boolean; message?: string };
  } catch {
    data = null;
  }
  const message = data?.message ?? "";
  const ok =
    data?.success === true ||
    data?.success === "true" ||
    /activat|confirm|thank|sent|success/i.test(message);
  if (!ok) {
    throw new Error(message || text.slice(0, 180) || `FormSubmit ${res.status}`);
  }
}
