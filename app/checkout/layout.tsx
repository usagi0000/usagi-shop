import type { Metadata } from "next";

export const metadata: Metadata = { title: "Checkout" };

export default function Layout({ children }: LayoutProps<"/checkout">) {
  return children;
}
