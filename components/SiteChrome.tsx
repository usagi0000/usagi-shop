"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { scrollToPageTop } from "@/lib/scroll-top";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const prev = useRef(path);
  const bare = path === "/art-shop";

  useLayoutEffect(() => {
    if (path !== "/" || prev.current === "/") {
      prev.current = path;
      return;
    }
    prev.current = path;
    scrollToPageTop();
    const timers = [0, 50, 100, 200].map((ms) => window.setTimeout(scrollToPageTop, ms));
    const frame = requestAnimationFrame(() => {
      scrollToPageTop();
      requestAnimationFrame(scrollToPageTop);
    });
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [path]);

  return (
    <>
      {bare ? null : <Header />}
      <main className={bare ? "h-dvh overflow-hidden" : "flex-1"}>{children}</main>
      {bare ? null : <Footer />}
      {bare ? null : <BackToTop />}
    </>
  );
}
