"use client";

import { usePathname } from "next/navigation";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const bare = usePathname() === "/art-shop";

  return (
    <>
      {bare ? null : <Header />}
      <main className={bare ? "h-dvh overflow-hidden" : "flex-1"}>{children}</main>
      {bare ? null : <Footer />}
      {bare ? null : <BackToTop />}
    </>
  );
}
