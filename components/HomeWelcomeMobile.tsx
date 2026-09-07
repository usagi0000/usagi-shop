import Image from "next/image";
import Link from "next/link";
import { Sparkle } from "./Icons";
import { ShareButton } from "./ShareButton";
import styles from "./HomeWelcome.module.css";

export function HomeWelcomeMobile() {
  return (
    <div className={styles.wrap}>
      <span className={styles.deco} style={{ left: "0.65rem", top: "0.45rem" }} aria-hidden>
        <Sparkle className="h-3 w-3" />
      </span>
      <span className={`${styles.deco} ${styles.decoHeart}`} style={{ right: "38%", top: "0.35rem" }} aria-hidden>
        ♡
      </span>
      <span className={styles.deco} style={{ left: "44%", top: "2.4rem" }} aria-hidden>
        <Sparkle className="h-2.5 w-2.5 text-pink" />
      </span>
      <span className={styles.deco} style={{ right: "1.1rem", top: "3.2rem" }} aria-hidden>
        <Sparkle className="h-2 w-2" />
      </span>

      <div className={styles.heroRow}>
        <div className={styles.copy}>
          <p className={styles.kicker}>hello! ♡</p>
          <div className={styles.titleRow}>
            <Image
              src="/images/logo1.png"
              alt=""
              width={851}
              height={1051}
              className={styles.bunny}
            />
            <h2 className={styles.title}>Welcome ♡</h2>
          </div>
          <p className={styles.blurb}>
            Acrylic paintings, works in progress, and finished pieces. I hope they bring a little joy to your day. ♡
          </p>
          <div className={styles.btns}>
            <Link href="/shop" className={`${styles.btn} ${styles.btnShop}`}>
              <span className={styles.btnGlyph} aria-hidden>
                <PawIcon />
              </span>
              Shop paintings
              <span aria-hidden>→</span>
            </Link>
            <Link href="/custom-order" className={`${styles.btn} ${styles.btnCustom}`}>
              <span className={styles.btnGlyph} aria-hidden>
                <PaletteIcon />
              </span>
              Custom order
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        <div className={styles.girlWrap}>
          <Image
            src="/images/usagi.png"
            alt="Shopkeeper with a sketchbook and paintbrush"
            fill
            className="object-contain object-right-bottom"
            sizes="(max-width: 767px) 42vw, 10rem"
          />
        </div>
      </div>

      <div className={styles.divider} aria-hidden>
        ♡
      </div>

      <div className={styles.stall}>
        <div className={styles.stallHead}>
          <div>
            <h3 className={styles.stallTitle}>The stall ♡</h3>
            <p className={styles.stallBlurb}>Add a canvas to the bag, check out here. I pack originals myself.</p>
          </div>
          <Image
            src="/images/logo1.png"
            alt=""
            width={851}
            height={1051}
            className={styles.stallBunny}
          />
        </div>
        <div className={styles.actions}>
          <Link href="/shop" className={styles.action}>
            <span className={`${styles.icon} ${styles.iconShop}`}>
              <BagMini />
            </span>
            Shop
          </Link>
          <Link href="/contact" className={styles.action}>
            <span className={`${styles.icon} ${styles.iconNews}`}>
              <MailMini />
            </span>
            Newsletter
          </Link>
          <ShareButton
            className={styles.action}
            iconClassName={`${styles.icon} ${styles.iconShare}`}
            icon={<ShareMini />}
          />
          <Link href="/custom-order" className={styles.action}>
            <span className={`${styles.icon} ${styles.iconCustom}`}>
              <StarMini />
            </span>
            Custom
          </Link>
        </div>
      </div>
    </div>
  );
}

function PawIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
      <circle cx="7" cy="6.2" r="1.7" fill="currentColor" />
      <circle cx="13" cy="6.2" r="1.7" fill="currentColor" />
      <circle cx="4.6" cy="10" r="1.55" fill="currentColor" />
      <circle cx="15.4" cy="10" r="1.55" fill="currentColor" />
      <ellipse cx="10" cy="13.6" rx="3.1" ry="2.6" fill="currentColor" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M10 3.2 c3.8 0 6.8 2.7 6.8 6.1 c0 1.7-1.3 2.4-2.5 2.4 c-.7 0-1.1-.3-1.4-.3 c-.6 0-.8.5-.8 1.1 0 1.8-1.1 2.9-2.1 2.9 C6.2 15.4 3.2 12.6 3.2 9.2 3.2 5.9 6.2 3.2 10 3.2 Z"
        fill="currentColor"
        opacity="0.2"
      />
      <circle cx="8" cy="7.2" r="1.05" fill="#e07870" />
      <circle cx="12.2" cy="7.4" r="1.05" fill="#6b9bc4" />
      <circle cx="7.4" cy="11" r="1.05" fill="#e8c56a" />
    </svg>
  );
}

function BagMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M6 8 h12 l-.8 11.2 a1.5 1.5 0 0 1-1.5 1.3 H8.3 a1.5 1.5 0 0 1-1.5-1.3 L6 8 Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9 8 V7.2 A3 3 0 0 1 15 7.2 V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 12.2 v4.2 M10 14.3 h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MailMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <rect x="4" y="6.5" width="16" height="11.2" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.2 8.2 L12 13.1 L18.8 8.2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ShareMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <circle cx="18" cy="6.2" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6" cy="12" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="17.8" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11.1 L16 7.1 M8 12.9 L16 16.9" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function StarMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        d="M12 4.2 l1.7 4.6 h4.8 l-3.9 2.9 1.5 4.7 L12 13.8 7.9 16.4 l1.5-4.7-3.9-2.9 h4.8 Z"
        fill="currentColor"
      />
    </svg>
  );
}
