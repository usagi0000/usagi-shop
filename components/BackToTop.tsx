"use client";

import { useEffect, useState } from "react";
import styles from "./BackToTop.module.css";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${show ? styles.show : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={goTop}
    >
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 19 V7" />
        <path d="M6.8 12.2 L12 6.8 L17.2 12.2" />
      </svg>
    </button>
  );
}
