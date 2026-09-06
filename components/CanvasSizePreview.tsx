import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./CanvasSizePreview.module.css";

const FALLBACK_W = 30;
const FALLBACK_H = 40;

export function CanvasSizePreview({
  width,
  height,
  onWidthChange,
  onHeightChange,
}: {
  width: string;
  height: string;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
}) {
  const w = toCm(width, FALLBACK_W);
  const h = toCm(height, FALLBACK_H);

  return (
    <aside className={styles.panel} aria-label="Canvas size">
      <h2 className={styles.title}>
        Choose your canvas size <span className={styles.heart}>♡</span>
      </h2>
      <p className={styles.hint}>Enter the width and height to see a preview of your canvas</p>

      <div className={styles.body}>
        <div className={styles.stage} style={{ "--cw": w, "--ch": h } as CSSProperties}>
          <div className={styles.heightRail}>
            <svg className={styles.vArrow} viewBox="0 0 12 200" preserveAspectRatio="none" aria-hidden>
              <path d="M6 1 L1.8 11 H10.2 Z" fill="#8a6a4a" />
              <line x1="6" y1="10" x2="6" y2="190" stroke="#8a6a4a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M6 199 L1.8 189 H10.2 Z" fill="#8a6a4a" />
            </svg>
            <label className={styles.chip}>
              Height:
              <input
                className={styles.num}
                type="number"
                name="canvasHeight"
                inputMode="numeric"
                min={1}
                max={300}
                step={1}
                required
                value={height}
                onChange={(e) => onHeightChange(e.target.value)}
                aria-label="Canvas height in centimetres"
              />
              <span className={styles.unit}>cm</span>
            </label>
          </div>

          <div className={styles.frame} data-canvas="preview" aria-hidden>
            <div className={styles.linen} />
          </div>

          <div className={styles.widthRail}>
            <svg className={styles.hArrow} viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
              <path d="M1 6 L11 1.8 V10.2 Z" fill="#8a6a4a" />
              <line x1="10" y1="6" x2="190" y2="6" stroke="#8a6a4a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M199 6 L189 1.8 V10.2 Z" fill="#8a6a4a" />
            </svg>
            <label className={styles.chip}>
              Width:
              <input
                className={styles.num}
                type="number"
                name="canvasWidth"
                inputMode="numeric"
                min={1}
                max={300}
                step={1}
                required
                value={width}
                onChange={(e) => onWidthChange(e.target.value)}
                aria-label="Canvas width in centimetres"
              />
              <span className={styles.unit}>cm</span>
            </label>
          </div>
        </div>

        <div className={styles.mascot}>
          <Image
            src="/images/size.png"
            alt=""
            width={1516}
            height={1037}
            className={styles.sizeArt}
          />
          <p className={styles.note}>A canvas as unique as your ideas ♡</p>
          <svg className={styles.flowers} viewBox="0 0 72 24" aria-hidden>
            <g stroke="#8a6a4a" strokeWidth="1">
              <g transform="translate(14 14)">
                <path d="M0-6.5 Q2.8-2.8 0 0 Q-2.8-2.8 0-6.5 Z" fill="#fff" />
                <path d="M0-6.5 Q2.8-2.8 0 0 Q-2.8-2.8 0-6.5 Z" fill="#fff" transform="rotate(72)" />
                <path d="M0-6.5 Q2.8-2.8 0 0 Q-2.8-2.8 0-6.5 Z" fill="#fff" transform="rotate(144)" />
                <path d="M0-6.5 Q2.8-2.8 0 0 Q-2.8-2.8 0-6.5 Z" fill="#fff" transform="rotate(216)" />
                <path d="M0-6.5 Q2.8-2.8 0 0 Q-2.8-2.8 0-6.5 Z" fill="#fff" transform="rotate(288)" />
                <circle cx="0" cy="0" r="1.5" fill="#f4b6b0" stroke="none" />
              </g>
              <g transform="translate(36 13)">
                <path d="M0-5.6 Q2.4-2.4 0 0 Q-2.4-2.4 0-5.6 Z" fill="#fff" />
                <path d="M0-5.6 Q2.4-2.4 0 0 Q-2.4-2.4 0-5.6 Z" fill="#fff" transform="rotate(72)" />
                <path d="M0-5.6 Q2.4-2.4 0 0 Q-2.4-2.4 0-5.6 Z" fill="#fff" transform="rotate(144)" />
                <path d="M0-5.6 Q2.4-2.4 0 0 Q-2.4-2.4 0-5.6 Z" fill="#fff" transform="rotate(216)" />
                <path d="M0-5.6 Q2.4-2.4 0 0 Q-2.4-2.4 0-5.6 Z" fill="#fff" transform="rotate(288)" />
                <circle cx="0" cy="0" r="1.3" fill="#f4b6b0" stroke="none" />
              </g>
              <g transform="translate(56 14.5)">
                <path d="M0-4.8 Q2.1-2.1 0 0 Q-2.1-2.1 0-4.8 Z" fill="#fff" />
                <path d="M0-4.8 Q2.1-2.1 0 0 Q-2.1-2.1 0-4.8 Z" fill="#fff" transform="rotate(72)" />
                <path d="M0-4.8 Q2.1-2.1 0 0 Q-2.1-2.1 0-4.8 Z" fill="#fff" transform="rotate(144)" />
                <path d="M0-4.8 Q2.1-2.1 0 0 Q-2.1-2.1 0-4.8 Z" fill="#fff" transform="rotate(216)" />
                <path d="M0-4.8 Q2.1-2.1 0 0 Q-2.1-2.1 0-4.8 Z" fill="#fff" transform="rotate(288)" />
                <circle cx="0" cy="0" r="1.15" fill="#f4b6b0" stroke="none" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <p className={styles.tip}>
        <svg className={styles.bulb} viewBox="0 0 16 16" aria-hidden>
          <path
            d="M8 1.4 A5 5 0 0 0 4.4 9.6 C5 10.4 5.4 11.2 5.4 12 h5.2 c0-.8.4-1.6 1-2.4 A5 5 0 0 0 8 1.4 Z"
            fill="#e8c56a"
            stroke="#4a3728"
            strokeWidth="0.9"
          />
          <path d="M6.2 13.2 h3.6 M6.6 14.6 h2.8" stroke="#4a3728" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
        <span>Tip: Common sizes are 20×20 cm, 30×40 cm, 40×50 cm, but you can choose any size!</span>
      </p>
    </aside>
  );
}

function toCm(raw: string, fallback: number) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(300, n);
}
