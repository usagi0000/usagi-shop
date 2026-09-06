"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { formatPrice, getCollection, productImages, products, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { Leaf, Sparkle } from "./Icons";
import styles from "./ArtShopScene.module.css";

type EyeState = "open" | "demi" | "closed";
type EyeSide = "L" | "R";
type PanelKind = "paintings" | "icons";
type BoardView = "grid" | "detail";

const EYE_FILES: Record<
  EyeState,
  Record<EyeSide, { src: string; w: number; h: number }>
> = {
  open: {
    L: { src: "/images/eye-l-open.png?v=2", w: 579, h: 579 },
    R: { src: "/images/eye-r-open.png?v=2", w: 543, h: 543 },
  },
  demi: {
    L: { src: "/images/eye-l-demi.png?v=2", w: 718, h: 718 },
    R: { src: "/images/eye-r-demi.png?v=2", w: 671, h: 671 },
  },
  closed: {
    L: { src: "/images/eye-l-closed.png?v=2", w: 721, h: 253 },
    R: { src: "/images/eye-r-closed.png?v=2", w: 674, h: 307 },
  },
};

const EYE_SIDES: EyeSide[] = ["L", "R"];
const EYE_STATES: EyeState[] = ["open", "demi", "closed"];

const PAINTINGS = products.filter((p) => p.category === "original-art");
const UI_ICONS = products.filter((p) => p.category === "ui-icons");

const PANELS: Record<PanelKind, { title: string; sub: string; backTo: string }> = {
  paintings: {
    title: "Canva Painting",
    sub: "Original hand-painted artworks ♥",
    backTo: "← Back to paintings",
  },
  icons: {
    title: "UI Icons",
    sub: "Cute interface icons made with love ♥",
    backTo: "← Back to UI Icons",
  },
};

const WELCOME = "Welcome!\nFind something\nbeautiful today ♡";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function FavoriteButton({
  active,
  label,
  onToggle,
}: {
  active: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.favBtn} ${active ? styles.favOn : ""}`}
      aria-label={label}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 19.2 S4.2 14.1 4.2 9.4 A4.1 4.1 0 0 1 12 7.6 A4.1 4.1 0 0 1 19.8 9.4 C19.8 14.1 12 19.2 12 19.2 Z" />
      </svg>
    </button>
  );
}

function StallBuyNow({ product }: { product: Product }) {
  const { add } = useCart();
  const href = product.buyUrl ?? "/checkout";
  const external = /^https?:/i.test(href);
  const download = href.includes("/download") || href.endsWith(".zip");
  const label = download ? "Download ♡" : "Buy Now ♡";

  if (external || download) {
    return (
      <a
        className={styles.buyNow}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={styles.buyNow}
      onClick={() => {
        if (href === "/checkout" || href.startsWith("/checkout?")) add(product.slug);
      }}
    >
      {label}
    </Link>
  );
}

const ICON_PREVIEW = [
  "today.png",
  "adam-asleep.png",
  "adam-awake.png",
  "giraffe.png",
  "sleep.png",
  "awake.png",
  "feeding.png",
  "bath.png",
  "bunny.png",
];

function pickIconPreview(all: string[], n = 9) {
  const byFile = new Map(all.map((src) => [src.slice(src.lastIndexOf("/") + 1), src]));
  const picked: string[] = [];
  for (const name of ICON_PREVIEW) {
    const src = byFile.get(name);
    if (src) picked.push(src);
    if (picked.length >= n) return picked;
  }
  for (const src of all) {
    if (!picked.includes(src)) picked.push(src);
    if (picked.length >= n) break;
  }
  return picked;
}

function collageCols(n: number) {
  if (n <= 1) return 1;
  if (n <= 4) return 2;
  if (n <= 9) return 3;
  if (n <= 16) return 4;
  if (n <= 25) return 5;
  if (n <= 36) return 6;
  return 7;
}

function IconCollage({ srcs, variant }: { srcs: string[]; variant: "card" | "detail" }) {
  const cols = variant === "card" ? 2 : collageCols(srcs.length);
  return (
    <span
      className={`${styles.collage} ${variant === "card" ? styles.collageCard : styles.collageDetail}`}
      style={{ "--cols": String(cols) } as CSSProperties}
    >
      {srcs.map((src) => (
        <span key={src} className={styles.collageCell}>
          <Image src={src} alt="" fill sizes={variant === "card" ? "4vw" : "3vw"} className={styles.collageImg} />
        </span>
      ))}
    </span>
  );
}

function StallProductDetail({
  product,
  activeImg,
  onThumb,
  icons,
}: {
  product: Product;
  activeImg: number;
  onThumb: (index: number) => void;
  icons: string[];
}) {
  const images = productImages(product);
  const src = images[activeImg] ?? images[0];
  const collection = getCollection(product.collection);
  const iconPack = product.category === "ui-icons" && icons.length > 0;
  const facts = product.facts?.length
    ? product.facts
    : ([
        product.size ? `Size: ${product.size}` : null,
        product.medium ? `Medium: ${product.medium}` : null,
        product.availability ?? null,
        product.note ?? null,
        collection ? `Collection: ${collection.label}` : null,
      ].filter(Boolean) as string[]);

  return (
    <div className={styles.detail}>
      <div className={styles.detailArt}>
        <div className={`${styles.detailFrame} ${iconPack ? styles.detailFrameCollage : ""}`}>
          {iconPack ? (
            <IconCollage srcs={icons} variant="detail" />
          ) : (
            <Image
              key={src}
              src={src}
              alt={product.name}
              fill
              sizes="20vw"
              className={styles.detailImg}
            />
          )}
        </div>
        {!iconPack && images.length > 1 ? (
          <div className={styles.thumbs}>
            {images.map((img, idx) => (
              <button
                key={img}
                type="button"
                className={`${styles.thumb} ${idx === activeImg ? styles.thumbOn : ""}`}
                aria-label={`${product.name} photo ${idx + 1}`}
                aria-pressed={idx === activeImg}
                onClick={() => onThumb(idx)}
              >
                <Image src={img} alt="" fill sizes="48px" className={styles.thumbImg} />
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.detailInfo}>
        <h3 className={styles.detailName}>{product.name}</h3>
        {product.price > 0 ? <p className={styles.detailPrice}>{formatPrice(product.price)}</p> : null}
        <p className={styles.detailDesc}>{product.description}</p>
        {facts.length ? (
          <ul className={styles.detailFacts}>
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        ) : null}
        <StallBuyNow product={product} />
      </div>
    </div>
  );
}

function ComingSoon() {
  return (
    <div className={styles.comingSoon}>
      <span className={`${styles.comingDeco} ${styles.comingDecoTL}`} aria-hidden>
        <Sparkle className={styles.comingSparkSvg} />
      </span>
      <span className={`${styles.comingDeco} ${styles.comingDecoTR}`} aria-hidden>
        <Leaf className={styles.comingLeafSvg} />
      </span>
      <span className={`${styles.comingDeco} ${styles.comingDecoBL}`} aria-hidden>
        <Leaf className={styles.comingLeafSvg} />
      </span>
      <span className={`${styles.comingDeco} ${styles.comingDecoBR}`} aria-hidden>
        <Sparkle className={styles.comingSparkSvg} />
      </span>
      <span className={styles.comingStar} aria-hidden>
        <Sparkle className={styles.comingStarSvg} />
      </span>
      <p className={styles.comingKicker}>UI Icons</p>
      <h3 className={styles.comingTitle}>Coming Soon</h3>
      <p className={styles.comingBlurb}>
        New cute UI icons are
        <br />
        being prepared with love ♥
      </p>
      <p className={styles.comingMarks} aria-hidden>
        ♡ ✦ ♡
      </p>
    </div>
  );
}

export function ArtShopScene({ adamIcons }: { adamIcons: string[] }) {
  const [eyes, setEyes] = useState<EyeState>("open");
  const [panel, setPanel] = useState<PanelKind>("paintings");
  const [panelOpen, setPanelOpen] = useState(false);
  const [board, setBoard] = useState<BoardView>("grid");
  const [selected, setSelected] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loved, setLoved] = useState<Set<string>>(new Set());
  const [typed, setTyped] = useState("");
  const [typedDone, setTypedDone] = useState(false);
  const gridFaceRef = useRef<HTMLDivElement>(null);
  const gridScroll = useRef(0);
  const detailBackRef = useRef<HTMLButtonElement>(null);

  function toggleLoved(id: string) {
    setLoved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function closePanel() {
    setBoard("grid");
    setPanelOpen(false);
  }

  function openPanel(next: PanelKind) {
    setSelected(null);
    setBoard("grid");
    setPanel(next);
    setPanelOpen(true);
  }

  function rememberGridScroll() {
    gridScroll.current = gridFaceRef.current?.scrollTop ?? 0;
  }

  function openProduct(product: Product) {
    setSelected(product);
    setActiveImg(0);
    requestAnimationFrame(() => setBoard("detail"));
  }

  function backToGrid() {
    const top = gridScroll.current;
    const slug = selected?.slug;
    setBoard("grid");
    const run = () => {
      const card = slug
        ? (gridFaceRef.current?.querySelector(`[data-product="${slug}"]`) as HTMLElement | null)
        : null;
      card?.focus({ preventScroll: true });
      if (gridFaceRef.current) gridFaceRef.current.scrollTop = top;
    };
    run();
    requestAnimationFrame(() => {
      run();
      requestAnimationFrame(run);
    });
  }

  useEffect(() => {
    let cancelled = false;

    const blink = async () => {
      setEyes("demi");
      await wait(90 + Math.random() * 30);
      if (cancelled) return;
      setEyes("closed");
      await wait(110 + Math.random() * 50);
      if (cancelled) return;
      setEyes("demi");
      await wait(90 + Math.random() * 30);
      if (cancelled) return;
      setEyes("open");
    };

    const loop = async () => {
      while (!cancelled) {
        await wait(3000 + Math.random() * 4000);
        if (!cancelled) await blink();
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(WELCOME);
      setTypedDone(true);
      return;
    }

    let index = 0;
    let timer = 0;
    let cancelled = false;

    const typeNext = () => {
      if (cancelled) return;
      index += 1;
      setTyped(WELCOME.slice(0, index));
      if (index < WELCOME.length) {
        timer = window.setTimeout(typeNext, 50);
      } else {
        setTypedDone(true);
      }
    };

    timer = window.setTimeout(typeNext, 360);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (board === "detail") backToGrid();
      else closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, board]);

  useEffect(() => {
    if (board === "detail") detailBackRef.current?.focus({ preventScroll: true });
  }, [board]);

  const copy = PANELS[panel];
  const catalog = panel === "icons" ? UI_ICONS : PAINTINGS;
  const emptyIcons = panel === "icons" && adamIcons.length === 0;
  const iconPreview = pickIconPreview(adamIcons, 4);

  return (
    <div className={styles.stage}>
      <div className={styles.wrap}>
      <Image
        src="/images/art-shop.png"
        alt="Art Shop stall"
        width={1681}
        height={936}
        unoptimized
        preload
        className={styles.shop}
        sizes="100vw"
      />

      <div className={styles.girlSlot}>
        <div className={styles.girl}>
          <Image
            src="/images/girlNoEyese2.png"
            alt=""
            width={1024}
            height={1536}
            unoptimized
            className={styles.girlBody}
            sizes="50vw"
          />
          {EYE_SIDES.map((side) => (
            <div
              key={side}
              className={`${styles.eyeSlot} ${side === "L" ? styles.eyeSlotL : styles.eyeSlotR}`}
            >
              {EYE_STATES.map((state) => {
                const file = EYE_FILES[state][side];
                return (
                  <Image
                    key={state}
                    src={file.src}
                    alt=""
                    width={file.w}
                    height={file.h}
                    unoptimized
                    className={`${styles.eye} ${state === "closed" ? styles.eyeClosed : ""} ${state === "demi" ? styles.eyeDemi : ""} ${eyes === state ? styles.eyeOn : ""}`}
                    sizes="8vw"
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p
        className={`${styles.welcomeBubble} ${typedDone ? styles.welcomeFloat : ""} ${panelOpen ? styles.welcomeHidden : ""}`}
        aria-live="polite"
      >
        {typed.endsWith("♡") ? (
          <>
            {typed.slice(0, -1)}
            <span className={styles.welcomeHeart}>♡</span>
          </>
        ) : (
          typed
        )}
        <span className={styles.welcomeTail} aria-hidden />
      </p>

      <div className={`${styles.cardRow} ${panelOpen ? styles.cardRowHidden : ""}`}>
        <button
          type="button"
          className={`${styles.catCard} ${styles.canvaTilt}`}
          aria-label="Canva Painting"
          aria-expanded={panelOpen && panel === "paintings"}
          aria-controls="stall-panel"
          onClick={() => openPanel("paintings")}
        >
          <span className={styles.catCardArt}>
            <Image
              src="/images/canvaPainting.png"
              alt=""
              width={1254}
              height={1254}
              unoptimized
              className={styles.catCardImg}
              sizes="20vw"
            />
          </span>
          <span className={styles.catCardLabel}>
            <span>Canva</span>
            <span>Painting</span>
          </span>
        </button>

        <button
          type="button"
          className={`${styles.catCard} ${styles.uiTilt}`}
          aria-label="UI Icons"
          aria-expanded={panelOpen && panel === "icons"}
          aria-controls="stall-panel"
          onClick={() => openPanel("icons")}
        >
          <span className={styles.catCardArt}>
            <Image
              src="/images/uiIcon.png"
              alt=""
              width={1536}
              height={1024}
              unoptimized
              className={`${styles.catCardImg} ${styles.uiCardImg}`}
              sizes="20vw"
            />
          </span>
          <span className={styles.catCardLabel}>
            <span>UI</span>
            <span>Icons</span>
          </span>
        </button>
      </div>

      <section
        id="stall-panel"
        className={`${styles.panel} ${panelOpen ? styles.panelOpen : ""}`}
        aria-hidden={!panelOpen}
        inert={!panelOpen}
        aria-label={board === "detail" && selected ? selected.name : copy.title}
      >
        <header className={`${styles.panelHead} ${board === "detail" ? styles.panelHeadSlim : ""}`}>
          <button
            ref={detailBackRef}
            type="button"
            className={`${styles.panelBack} ${board === "detail" ? styles.panelBackWide : ""}`}
            aria-label={board === "detail" ? undefined : "Back"}
            onClick={() => {
              if (board === "detail") backToGrid();
              else closePanel();
            }}
          >
            {board === "detail" ? copy.backTo : "← Back"}
          </button>
          {board === "grid" ? (
            <>
              <div className={styles.panelTitleRow}>
                <span className={styles.flourish} aria-hidden>
                  <Sparkle className={styles.flourishSpark} />
                  <Leaf className={styles.flourishLeaf} />
                </span>
                <h2 className={styles.panelTitle}>{copy.title}</h2>
                <span className={styles.flourish} aria-hidden>
                  <Leaf className={styles.flourishLeaf} />
                  <Sparkle className={styles.flourishSpark} />
                </span>
              </div>
              <p className={styles.panelSub}>{copy.sub}</p>
            </>
          ) : null}
        </header>

        <div className={styles.panelBody}>
          <div
            ref={gridFaceRef}
            className={`${styles.boardFace} ${board === "grid" ? styles.boardFaceShow : ""}`}
            inert={board !== "grid"}
          >
            <div className={`${styles.boardSlide} ${board === "grid" ? styles.boardShow : styles.boardHideLeft}`}>
              {emptyIcons ? (
                <ComingSoon />
              ) : (
                <ul className={panel === "icons" ? styles.iconCatalog : styles.catalogGrid}>
                  {catalog.map((product) => {
                    const iconPack = product.category === "ui-icons" && adamIcons.length > 0;
                    return (
                      <li key={product.slug} className={styles.productItem}>
                        <button
                          type="button"
                          className={styles.productCard}
                          data-product={product.slug}
                          onPointerDown={rememberGridScroll}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") rememberGridScroll();
                          }}
                          onClick={() => openProduct(product)}
                        >
                          <span className={`${styles.productArt} ${iconPack ? styles.productArtCollage : ""}`}>
                            {iconPack ? (
                              <IconCollage srcs={iconPreview} variant="card" />
                            ) : (
                              <Image
                                src={product.image}
                                alt=""
                                fill
                                sizes="18vw"
                                className={styles.productImg}
                              />
                            )}
                          </span>
                          <span className={styles.productMeta}>
                            <span className={styles.productName}>{product.name}</span>
                            <span className={styles.productPrice}>
                              {iconPack ? "Complete UI icon set" : formatPrice(product.price)}
                            </span>
                          </span>
                        </button>
                        <FavoriteButton
                          active={loved.has(product.slug)}
                          label={`Favorite ${product.name}`}
                          onToggle={() => toggleLoved(product.slug)}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          {selected ? (
            <div
              className={`${styles.boardFace} ${board === "detail" ? styles.boardFaceShow : ""}`}
              inert={board !== "detail"}
            >
              <div
                className={`${styles.boardSlide} ${board === "detail" ? styles.boardShow : styles.boardHideRight}`}
              >
                <StallProductDetail
                  product={selected}
                  activeImg={activeImg}
                  onThumb={setActiveImg}
                  icons={selected.category === "ui-icons" ? adamIcons : []}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Link href="/" className={styles.siteBubble} aria-label="Go to website">
        Go to website
        <span className={styles.siteBubbleTail} aria-hidden />
      </Link>

      <div className={styles.bunny}>
        <Image
          src="/images/Bunny1.png"
          alt=""
          width={1536}
          height={1024}
          unoptimized
          className={styles.bunnyImg}
          sizes="20vw"
        />
        <div className={styles.bunnyEars}>
          <Image
            src="/images/Bunny1.png"
            alt=""
            width={1536}
            height={1024}
            unoptimized
            className={styles.bunnyImg}
            sizes="20vw"
          />
        </div>
      </div>
    </div>
    </div>
  );
}
