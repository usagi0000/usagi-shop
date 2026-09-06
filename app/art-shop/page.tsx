import type { Metadata } from "next";
import { ArtShopScene } from "@/components/ArtShopScene";
import { listAdamIcons } from "@/lib/adam-icons";

export const metadata: Metadata = { title: "Art Shop" };

export default function ArtShopPage() {
  return <ArtShopScene adamIcons={listAdamIcons()} />;
}
