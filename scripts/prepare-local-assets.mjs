import sharp from "sharp";

for (const name of ["hero-red", "story-red", "dambulla-cave", "lake", "safari"]) {
  const result = await sharp(`public/images/${name}.png`).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/images/${name}.webp`);
  console.log(`${name}: ${Math.round(result.size / 1024)} KB`);
}
// Scenic detail, without presenting it as a photograph from the climb.
await sharp("public/images/hero-red.png").extract({ left: 0, top: 0, width: 1024, height: 580 }).resize({ width: 1000 }).webp({ quality: 82 }).toFile("public/images/sigiriya-view.webp");
