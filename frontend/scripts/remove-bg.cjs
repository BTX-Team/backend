const { Jimp } = require('jimp');
const path = require('path');

const INPUT  = path.join(__dirname, '../assets/캐릭터.png');
const OUTPUT = path.join(__dirname, '../assets/캐릭터.png');

(async () => {
  const img = await Jimp.read(INPUT);
  const { width, height } = img.bitmap;

  img.scan(0, 0, width, height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    // 흰색/밝은 회색 계열 픽셀 → 투명 처리
    if (r > 220 && g > 220 && b > 220) {
      this.bitmap.data[idx + 3] = 0;
    }
  });

  await img.write(OUTPUT);
  console.log('✅ 배경 제거 완료:', OUTPUT);
})();
