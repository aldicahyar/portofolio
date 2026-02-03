// scripts/generate-icons.mjs
// Run with: node scripts/generate-icons.mjs

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const svgContent = readFileSync(join(publicDir, 'icon.svg'), 'utf-8');

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  // Generate 192x192 PNG
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(join(publicDir, 'icon-192.png'));
  console.log('✓ icon-192.png generated');

  // Generate 512x512 PNG
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(join(publicDir, 'icon-512.png'));
  console.log('✓ icon-512.png generated');

  // Generate apple-touch-icon (180x180)
  await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png generated');

  // Generate favicon.ico (32x32)
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .toFormat('png')
    .toFile(join(publicDir, 'favicon.png'));
  
  // For ICO format, we'll create a 32x32 PNG that browsers can use
  // Most modern browsers accept PNG as favicon
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .png()
    .toFile(join(publicDir, 'favicon-32.png'));
  console.log('✓ favicon-32.png generated');

  // Generate 16x16 for legacy support
  await sharp(Buffer.from(svgContent))
    .resize(16, 16)
    .png()
    .toFile(join(publicDir, 'favicon-16.png'));
  console.log('✓ favicon-16.png generated');

  console.log('\\nAll icons generated successfully!');
  console.log('\\nNote: For favicon.ico, you can use online converter or:');
  console.log('  - Use the PNG files directly (modern browsers support this)');
  console.log('  - Or convert favicon-32.png to .ico using https://favicon.io/favicon-converter/');
}

generateIcons().catch(console.error);
