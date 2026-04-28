import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = './public';

const pngs = readdirSync(publicDir).filter(f => extname(f).toLowerCase() === '.png');

for (const file of pngs) {
  const input = join(publicDir, file);
  const output = join(publicDir, basename(file, '.png') + '.webp');

  const info = await sharp(input)
    .webp({ quality: 90, lossless: false, effort: 6 })
    .toFile(output);

  const original = statSync(input).size;
  const savings = (((original - info.size) / original) * 100).toFixed(1);
  console.log(`✓ ${file} → ${basename(output)}  (${(original/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB, -${savings}%)`);
}

console.log('\nDone. All PNGs converted to WebP.');
