import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const ROOT = path.join(process.cwd(), "public", "images");
const CREAM = { r: 255, g: 248, b: 236 };
const FLATTEN_TO_JPEG = new Set(["large-scan.png"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function maxSide(file, width, height) {
  const base = path.basename(file);
  const rel = path.relative(ROOT, file);
  if (/^eye-[lr]-/.test(base)) return 256;
  if (rel.startsWith(`adam-icons${path.sep}`)) return 512;
  if (/^logo/.test(base)) return 512;
  if (base === "girlNoEyese2.png" || base === "usagi.png") return Math.max(width, height);
  if (base === "art-shop.png" || /^header[123]\.png$/.test(base)) return Math.max(width, height);
  if (/\.jpe?g$/i.test(base) || rel.startsWith(`blog${path.sep}`)) return 1920;
  if (base === "star-catcher.jpeg") return 1400;
  return 1600;
}

function spritePng(base) {
  return /girl|eye-|Bunny|usagi|logo|canvaPainting|uiIcon/i.test(base);
}

async function optimizeOne(file) {
  const orig = fs.statSync(file).size;
  const base = path.basename(file);
  const img = sharp(file, { failOn: "none" });
  const meta = await img.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const cap = maxSide(file, width, height);
  const pipeline = sharp(file, { failOn: "none" }).rotate();
  if (width > cap || height > cap) {
    pipeline.resize({ width: cap, height: cap, fit: "inside", withoutEnlargement: true });
  }

  const isJpeg = meta.format === "jpeg";
  const isWebp = meta.format === "webp";
  const flatten = !meta.hasAlpha || FLATTEN_TO_JPEG.has(base);
  const toJpeg = isJpeg || (meta.format === "png" && flatten);

  let buf;
  let dest = file;
  if (toJpeg) {
    if (meta.hasAlpha) pipeline.flatten({ background: CREAM });
    buf = await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer();
    if (meta.format === "png") dest = file.replace(/\.png$/i, ".jpg");
  } else if (isWebp) {
    buf = await pipeline.webp({ quality: 80, effort: 4 }).toBuffer();
  } else {
    buf = await pipeline
      .png({
        compressionLevel: 9,
        palette: true,
        quality: spritePng(base) ? 90 : 80,
        effort: 7,
        adaptiveFiltering: true,
      })
      .toBuffer();
  }

  if (buf.length >= orig * 0.98 && dest === file) {
    return { file, orig, next: orig, skipped: true };
  }

  const tmp = dest + ".tmp";
  fs.writeFileSync(tmp, buf);
  fs.renameSync(tmp, dest);
  if (dest !== file) fs.unlinkSync(file);
  return { file, dest, orig, next: buf.length, skipped: false };
}

const files = walk(ROOT);
let saved = 0;
let before = 0;
let after = 0;
const renamed = [];
for (const file of files) {
  const result = await optimizeOne(file);
  before += result.orig;
  after += result.next;
  if (!result.skipped) saved += result.orig - result.next;
  const kb = (n) => `${Math.round(n / 1024)}k`;
  const mark = result.skipped ? "skip" : result.dest && result.dest !== file ? "jpg" : "ok";
  console.log(mark, kb(result.orig), "->", kb(result.next), path.relative(ROOT, result.dest || file));
  if (result.dest && result.dest !== file) {
    renamed.push({
      from: "/" + path.relative(path.join(process.cwd(), "public"), file).replaceAll("\\", "/"),
      to: "/" + path.relative(path.join(process.cwd(), "public"), result.dest).replaceAll("\\", "/"),
    });
  }
}

console.log(
  "TOTAL",
  `${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB saved ${(saved / 1e6).toFixed(1)}MB`,
);
if (renamed.length) {
  console.log("RENAMED");
  for (const row of renamed) console.log(row.from, "=>", row.to);
}
