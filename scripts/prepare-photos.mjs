import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Source pages identify these as free Unsplash photos. See docs/photo-credits.md.
const photos = [
  ["lunch", "https://unsplash.com/photos/a-plate-of-rice-and-various-south-asian-dishes-_WQ1qARALg4"],
  ["crafts", "https://unsplash.com/photos/person-using-chisel-while-curving-wood-3cIvvzjE6Lk"],
  ["herbs", "https://unsplash.com/photos/a-table-topped-with-bowls-filled-with-different-types-of-spices-SychJcGUzOI"],
  ["spa", "https://unsplash.com/photos/reed-diffuser-with-candles-and-towel-W7AyAs7azHc"],
  ["heritage", "https://unsplash.com/photos/a-wall-full-of-masks-hanging-on-a-wall-H-qDQSXBBBc"],
];
await mkdir("public/images", { recursive: true });
for (const [name, pageUrl] of photos) {
  const response = await fetch(pageUrl);
  if (!response.ok) throw new Error(`${name} page: ${response.status}`);
  const html = await response.text();
  const tag = html.match(/<meta[^>]*property="og:image"[^>]*>/)?.[0];
  const src = tag?.match(/content="([^"]+)"/)?.[1]?.replaceAll("&amp;", "&");
  if (!src) throw new Error(`${name}: missing image metadata`);
  const url = new URL(src);
  if (url.hostname !== "images.unsplash.com") throw new Error(`${name}: unexpected image host`);
  // Use the original photo rather than the page's branded social preview.
  url.search = "";
  url.searchParams.set("auto", "format");
  url.searchParams.set("w", "1200");
  url.searchParams.set("q", "85");
  url.searchParams.set("fit", "max");
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) throw new Error(`${name} image: ${imageResponse.status}`);
  const buffer = Buffer.from(await imageResponse.arrayBuffer());
  await sharp(buffer).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/images/${name}.webp`);
  await writeFile(`public/images/${name}.source.txt`, `${pageUrl}\n${url}\n`);
  console.log(`Saved ${name}.webp`);
}
