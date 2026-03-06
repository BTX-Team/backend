import Jimp from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT  = path.join(__dirname, '../assets/캐릭터.png');
const OUTPUT = path.join(__dirname, '../assets/캐릭터.png');

const img = await Jimp.read(INPUT);
const { width, height } = img.bitmap;

img.scan(0, 0, width, height, function (x, y, idx) {
  const r = this.bitmap.data[idx + 0];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];
  // 흰색/밝은 회색 계열 픽셀을 투명하게
  if (r > 220 && g > 220 && b > 220) {
    this.bitmap.data[idx + 3] = 0;
  }
});

await img.writeAsync(OUTPUT);
console.log('✅ 배경 제거 완료:', OUTPUT);
