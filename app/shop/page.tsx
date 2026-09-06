import { Suspense } from "react";
import { ShopCatalog } from "./ShopCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense>
      <ShopCatalog />
    </Suspense>
  );
}
