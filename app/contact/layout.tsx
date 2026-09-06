import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function Layout({ children }: LayoutProps<"/contact">) {
  return children;
}
