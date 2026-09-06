import Image from "next/image";
import Link from "next/link";
import styles from "./HeroStall.module.css";

export function HeroStall() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/header3.png"
        alt=""
        fill
        preload
        className={styles.bg}
        sizes="100vw"
      />
      <div className={styles.copy}>
        <h1 className={styles.title}>
          Welcome to Usagi Art <span className={styles.heart}>♡</span>
        </h1>
        <p className={styles.sub}>Original handmade artworks for a softer, brighter world ♡</p>
        <Link href="/art-shop" className={styles.btn}>
          Explore the Art Shop →
        </Link>
      </div>
    </section>
  );
}
