// 8비트 아이콘(src/assets/brand/jusiai-icon-8bit-*.png)으로 파비콘 세트를 만듭니다.
// 실행: npm run favicons
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brandDir = path.join(root, 'src/assets/brand');
const publicDir = path.join(root, 'public');
// 모서리가 둥근 아이콘은 브라우저 탭용, 꽉 찬 사각형은 OS가 모서리를 깎는 홈 화면용
const roundIconPath = path.join(brandDir, 'jusiai-icon-8bit-512.png');
const squareIconPath = path.join(brandDir, 'jusiai-icon-8bit-square-1024.png');
const GRID = 40;

// 40×40칸 픽셀 아트를 칸 단위 SVG로 옮깁니다. 어떤 크기에서도 칸 경계가 선명합니다.
async function pixelSvg(file) {
	const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const cell = info.width / GRID;
	const colorAt = (x, y) => {
		const i = (Math.floor((y + 0.5) * cell) * info.width + Math.floor((x + 0.5) * cell)) * 4;
		if (data[i + 3] < 128) return null;
		return `#${[0, 1, 2].map((k) => data[i + k].toString(16).padStart(2, '0')).join('')}`.toUpperCase();
	};
	const paths = new Map();
	for (let y = 0; y < GRID; y++) {
		let x = 0;
		while (x < GRID) {
			const color = colorAt(x, y);
			const start = x;
			while (x < GRID && colorAt(x, y) === color) x++;
			if (color) paths.set(color, (paths.get(color) ?? '') + `M${start} ${y}h${x - start}v1h-${x - start}z`);
		}
	}
	const body = [...paths].map(([color, d]) => `  <path fill="${color}" d="${d}"/>`).join('\n');
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${GRID} ${GRID}" shape-rendering="crispEdges">\n${body}\n</svg>\n`;
}

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

const faviconSvg = await pixelSvg(roundIconPath);
await fs.writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);
const icoImages = await Promise.all(
	[16, 32, 48].map(async (size) => ({
		size,
		data: await sharp(Buffer.from(faviconSvg), { density: 300 }).resize(size, size).png().toBuffer(),
	})),
);
await fs.writeFile(path.join(publicDir, 'favicon.ico'), toIco(icoImages));

const homeIcons = { 'apple-touch-icon.png': 180, 'icon-192.png': 192, 'icon-512.png': 512 };
await Promise.all(
	Object.entries(homeIcons).map(([name, size]) =>
		sharp(squareIconPath).resize(size, size).png().toFile(path.join(publicDir, name)),
	),
);

const manifest = {
	name: 'JUSIAI GAMES',
	short_name: 'JUSIAI',
	icons: [
		{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
		{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
	],
	theme_color: '#2D3343',
	background_color: '#2D3343',
	display: 'standalone',
};
await fs.writeFile(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

console.log('favicons generated in public/');
