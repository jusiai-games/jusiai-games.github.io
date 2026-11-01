// 브랜드 아이콘(src/assets/brand/guppy-app-icon.svg)으로 파비콘 세트를 만듭니다.
// 실행: npm run favicons
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appIconPath = path.join(root, 'src/assets/brand/guppy-app-icon.svg');
const publicDir = path.join(root, 'public');

const appIcon = await fs.readFile(appIconPath, 'utf8');

// 작은 크기용: 수초와 물방울을 빼고 구피를 키운 둥근 사각형 아이콘
const fishGroup = appIcon.slice(appIcon.indexOf('<g transform'), appIcon.indexOf('</g>') + 4).replace(/\s*<!--.*?-->/g, '');
const fishOnly = fishGroup.replace('<g transform="translate(40 0)">', '<g>');
const smallIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" rx="200" fill="#3B531A"/>
  <g transform="translate(512 512) scale(1.4) translate(-473 -510)">
    ${fishOnly}
  </g>
</svg>
`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 300 }).resize(size, size).png().toBuffer();

// PNG 데이터를 담은 ICO 파일
function toIco(images) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(images.length, 4);
	const entries = [];
	let offset = 6 + 16 * images.length;
	for (const { size, data } of images) {
		const e = Buffer.alloc(16);
		e.writeUInt8(size >= 256 ? 0 : size, 0);
		e.writeUInt8(size >= 256 ? 0 : size, 1);
		e.writeUInt8(0, 2);
		e.writeUInt8(0, 3);
		e.writeUInt16LE(1, 4);
		e.writeUInt16LE(32, 6);
		e.writeUInt32LE(data.length, 8);
		e.writeUInt32LE(offset, 12);
		offset += data.length;
		entries.push(e);
	}
	return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

await fs.writeFile(path.join(publicDir, 'favicon.svg'), smallIcon);
const icoImages = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(smallIcon, size) })));
await fs.writeFile(path.join(publicDir, 'favicon.ico'), toIco(icoImages));

// 홈 화면·앱 아이콘: 원본 앱 아이콘 그대로 (OS가 모서리를 둥글게 깎음)
await fs.writeFile(path.join(publicDir, 'apple-touch-icon.png'), await png(appIcon, 180));
await fs.writeFile(path.join(publicDir, 'icon-192.png'), await png(appIcon, 192));
await fs.writeFile(path.join(publicDir, 'icon-512.png'), await png(appIcon, 512));

const manifest = {
	name: 'JUSIAI GAMES',
	short_name: 'JUSIAI',
	icons: [
		{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
	],
	theme_color: '#3B531A',
	background_color: '#F4F5EC',
	display: 'standalone',
};
await fs.writeFile(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

console.log('favicons generated in public/');
