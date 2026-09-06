export type CategoryId = "original-art" | "prints" | "stationery" | "accessories" | "ui-icons";

export type CollectionId = "nature" | "anime-ghibli" | "animals";

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  category: CategoryId;
  collection?: CollectionId;
  featured?: boolean;
  description: string;
  size?: string;
  medium?: string;
  availability?: string;
  note?: string;
  buyUrl?: string;
  facts?: string[];
};

export function productImages(p: Product) {
  return [p.image, ...(p.gallery ?? [])];
}

export const categories: {
  id: CategoryId;
  label: string;
  blurb: string;
}[] = [
  { id: "original-art", label: "Original Art", blurb: "One-of-a-kind pieces, painted by hand." },
  { id: "prints", label: "Prints", blurb: "Archival prints of favourite illustrations." },
  { id: "stationery", label: "Stationery", blurb: "Notebooks, washi, and mail that feels like a gift." },
  { id: "accessories", label: "Accessories", blurb: "Small goods to carry a bit of the shop with you." },
  { id: "ui-icons", label: "UI Icons", blurb: "Cute interface icons, drawn by hand." },
];

export const collections: {
  id: CollectionId;
  label: string;
  image: string;
  blurb: string;
}[] = [
  {
    id: "nature",
    label: "Nature",
    image: "/images/koi-easel.jpeg",
    blurb: "Ponds, meadows, and quiet hills.",
  },
  {
    id: "anime-ghibli",
    label: "Anime & Ghibli",
    image: "/images/totoro-starry-easel.jpeg",
    blurb: "Soft forest spirits and still-summer skies.",
  },
  {
    id: "animals",
    label: "Animals",
    image: "/images/star-catcher.jpeg",
    blurb: "Gentle portraits of small companions.",
  },
];

export const products: Product[] = [
  {
    slug: "graceful-goose",
    name: "Graceful Goose",
    price: 20,
    image: "/images/goose-easel.png",
    gallery: ["/images/goose-held.jpg"],
    category: "original-art",
    collection: "animals",
    featured: true,
    size: "16 × 27 cm",
    medium: "Acrylic on canvas",
    availability: "Original handmade artwork",
    note: "Ships with a backing board",
    description:
      "A playful goose caught in a joyful moment, surrounded by fresh shades of green. Original acrylic on canvas.",
  },
  {
    slug: "reach-for-the-stars",
    name: "Reach for the Stars",
    price: 30,
    image: "/images/star-catcher.jpeg",
    category: "original-art",
    collection: "animals",
    featured: true,
    medium: "Acrylic on canvas",
    availability: "Original handmade artwork",
    note: "Ships with a backing board",
    description:
      "A little cat reaching for a glowing star, surrounded by a dreamy night sky and constellations. Original acrylic on canvas.",
  },
  {
    slug: "whimsical-starry-night",
    name: "Whimsical Starry Night",
    price: 20,
    image: "/images/totoro-starry-easel.jpeg",
    gallery: ["/images/totoro-starry-held.jpg"],
    category: "original-art",
    collection: "anime-ghibli",
    featured: true,
    medium: "Acrylic on canvas",
    availability: "Original handmade artwork",
    note: "Ships with a backing board",
    description:
      "A magical night sky filled with swirling stars, glowing moonlight, and a cheerful silhouette. Original acrylic on canvas.",
  },
  {
    slug: "koi-fish-serenity",
    name: "Koi Fish Serenity",
    price: 20,
    image: "/images/koi-easel.jpeg",
    gallery: ["/images/koi-held.jpeg"],
    category: "original-art",
    collection: "nature",
    featured: true,
    medium: "Acrylic on canvas",
    availability: "Original handmade artwork",
    note: "Ships with a backing board",
    description:
      "Bring a touch of peace and color into your space with this original hand-painted koi on canvas.",
  },
  {
    slug: "adam-app-icon-collection",
    name: "Adam App Icon Collection",
    price: 0,
    image: "/images/adam-icons/today.png",
    gallery: [
      "/images/adam-icons/adam-asleep.png",
      "/images/adam-icons/adam-awake.png",
      "/images/adam-icons/giraffe.png",
    ],
    category: "ui-icons",
    facts: [
      "Complete Adam App icon set",
      "Includes all available icons",
      "Designed for the Adam App",
      "High-quality digital UI assets",
    ],
    buyUrl: "/api/adam-icons/download",
    description: "A complete collection of the cute UI icons created for the Adam App.",
  },
];

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(id: string | undefined) {
  if (!id) return undefined;
  return collections.find((c) => c.id === id);
}

export function productsByCategory(id: CategoryId) {
  return products.filter((p) => p.category === id);
}

export function productsByCollection(id: CollectionId) {
  return products.filter((p) => p.collection === id);
}

export function shopCatalog() {
  return products;
}

export function productHref(product: Product) {
  if (product.category === "ui-icons") return `/ui-icons/${product.slug}`;
  return `/shop/${product.slug}`;
}

export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  const pool = shopCatalog();
  if (!s) return pool;
  return pool.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s) ||
      p.category.includes(s),
  );
}
