import type { Metadata } from "next";

export const metadata: Metadata = { title: "Custom Order" };

export default function Layout({ children }: LayoutProps<"/custom-order">) {
  return children;
}
