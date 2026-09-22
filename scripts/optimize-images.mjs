import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

const keep = new Set([
  "hiro-hero",
  "hiro-mission",
  "hiro-trail-green",
  "hiro-trail-charcoal",
  "hiro-trail-platinum",
  "hiro-city-white",
  "hiro-city-maroon",
  "hiro-city-cyan",
  "hiro-fold-lemon",
  "hiro-fold-gray",
  "hiro-fold-pink",
]);

const files = await readdir(publicDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") continue;
  if (!keep.has(base)) continue;

  const input = path.join(publicDir, file);
  const output = path.join(publicDir, `${base}.webp`);
  const before = (await stat(input)).size;
  await sharp(input).webp({ quality: 72, effort: 6 }).toFile(output);
  const after = (await stat(output)).size;
  console.log(
    `${file} -> ${base}.webp (${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`,
  );
  await unlink(input);
}

console.log("Done.");
