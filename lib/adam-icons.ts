import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { deflateRawSync } from "node:zlib";

const DIR = path.join(process.cwd(), "public/images/adam-icons");
const EXT = /\.(png|jpe?g|webp|svg)$/i;
const FOLDER = "adam-app-icon-collection";

const GROUPS: { label: string; files: string[] }[] = [
  { label: "Today, History & Health", files: ["today.png", "history.png", "health.png"] },
  { label: "Adam", files: ["adam-asleep.png", "adam-awake.png"] },
  { label: "Sleep & wake", files: ["sleep.png", "awake.png"] },
  { label: "Feeding", files: ["breast.png", "feeding.png", "food.png"] },
  { label: "Daily care", files: ["bath.png", "diaper.png", "pee.png", "poop.png"] },
  {
    label: "Health & growth",
    files: [
      "giraffe.png",
      "health-record.png",
      "vaccine.png",
      "appointment.png",
      "medicine.png",
      "thermo.png",
      "growth.png",
      "head.png",
      "mesure.png",
    ],
  },
  {
    label: "Milestones",
    files: [
      "milestone.png",
      "hatch.png",
      "bunny.png",
      "crawler.png",
      "sitter.png",
      "player.png",
      "dino.png",
      "walker.png",
    ],
  },
  { label: "Notes & extras", files: ["calendar.png", "note.png", "upload.png", "history-empty.png", "no-note.png"] },
];

const ORDER = GROUPS.flatMap((group) => group.files);

function sortIconNames(names: string[]) {
  const rank = new Map(ORDER.map((name, i) => [name, i]));
  return names.sort((a, b) => {
    const ia = rank.get(a) ?? 1000;
    const ib = rank.get(b) ?? 1000;
    if (ia !== ib) return ia - ib;
    return a.localeCompare(b);
  });
}

function listAdamIconFiles() {
  if (!fs.existsSync(DIR)) return [];
  const seen = new Set<string>();
  const names = sortIconNames(
    fs.readdirSync(DIR).filter((name) => EXT.test(name) && !name.startsWith(".")),
  );

  const out: { name: string; abs: string }[] = [];
  for (const name of names) {
    if (name === "change.png") continue;
    const abs = path.join(DIR, name);
    const hash = crypto.createHash("md5").update(fs.readFileSync(abs)).digest("hex");
    if (seen.has(hash)) continue;
    seen.add(hash);
    out.push({ name, abs });
  }
  return out;
}

export function listAdamIcons(): string[] {
  try {
    return listAdamIconFiles().map((file) => `/images/adam-icons/${file.name}`);
  } catch {
    return [];
  }
}

export function listAdamIconsGrouped(): { label: string; srcs: string[] }[] {
  try {
    const files = listAdamIconFiles();
    const byName = new Map(files.map((file) => [file.name, `/images/adam-icons/${file.name}`]));
    const used = new Set<string>();
    const groups: { label: string; srcs: string[] }[] = [];
    for (const group of GROUPS) {
      const srcs = group.files.map((name) => byName.get(name)).filter((src): src is string => Boolean(src));
      for (const src of srcs) used.add(src);
      if (srcs.length) groups.push({ label: group.label, srcs });
    }
    const rest = files
      .map((file) => `/images/adam-icons/${file.name}`)
      .filter((src) => !used.has(src));
    if (rest.length) groups.push({ label: "More", srcs: rest });
    return groups;
  } catch {
    return [];
  }
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zipFiles(files: { name: string; data: Buffer }[]) {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const name = Buffer.from(file.name, "utf8");
    const compressed = deflateRawSync(file.data);
    const crc = crc32(file.data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(file.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    const localFull = Buffer.concat([local, name, compressed]);
    locals.push(localFull);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(file.data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(Buffer.concat([central, name]));
    offset += localFull.length;
  }

  const centralDir = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDir.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralDir, end]);
}

export function zipAdamIcons() {
  const files = listAdamIconFiles().map((file) => ({
    name: `${FOLDER}/${file.name}`,
    data: fs.readFileSync(file.abs),
  }));
  return zipFiles(files);
}
