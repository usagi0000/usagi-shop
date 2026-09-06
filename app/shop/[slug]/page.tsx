import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { AddToCart } from "@/components/AddToCart";
import { formatPrice, getProduct, productHref, productImages, products } from "@/lib/data";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.filter((p) => p.category !== "ui-icons").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Piece" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  if (product.category === "ui-icons") redirect(productHref(product));

  const related = products.filter((p) => p.slug !== product.slug && p.collection === product.collection).slice(0, 4);

  return (
    <div className="mx-auto max-w-page px-4 py-10 md:px-8">
      <p className="mb-4 text-sm text-ink-soft">
        <Link href="/shop" className="hover:text-pink-deep">
          Shop
        </Link>{" "}
        / {product.name}
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery name={product.name} images={productImages(product)} />
        <div>
          <p className="font-script text-lg text-pink-deep">Handmade</p>
          <h1 className="font-display text-4xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl text-ink-soft">{formatPrice(product.price)}</p>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{product.description}</p>
          <AddToCart slug={product.slug} />
          <p className="mt-6 text-sm text-ink-soft">
            Original acrylic on canvas. Ships with a backing board. Tracking on every parcel.
          </p>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="mb-4 font-display text-xl font-bold">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
