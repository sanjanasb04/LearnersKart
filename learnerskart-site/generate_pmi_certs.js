const sharp = require('sharp');
const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

function rgbaToInt(r, g, b, a = 255) {
  return ((r & 0xFF) * 0x1000000 + (g & 0xFF) * 0x10000 + (b & 0xFF) * 0x100 + (a & 0xFF)) >>> 0;
}

function lerpRect(img, xMin, xMax, yTop, yBot) {
  for (let x = xMin; x <= xMax; x++) {
    const cTop = img.getPixelColor(x, yTop);
    const rTop = (cTop >>> 24) & 0xff;
    const gTop = (cTop >>> 16) & 0xff;
    const bTop = (cTop >>> 8) & 0xff;

    const cBot = img.getPixelColor(x, yBot);
    const rBot = (cBot >>> 24) & 0xff;
    const gBot = (cBot >>> 16) & 0xff;
    const bBot = (cBot >>> 8) & 0xff;

    for (let y = yTop + 1; y < yBot; y++) {
      const t = (y - yTop) / (yBot - yTop);
      const r = Math.round((1 - t) * rTop + t * rBot);
      const g = Math.round((1 - t) * gTop + t * gBot);
      const b = Math.round((1 - t) * bTop + t * bBot);
      img.setPixelColor(rgbaToInt(r, g, b, 255), x, y);
    }
  }
}

async function main() {
  const publicDir = 'C:/Users/sanju/.gemini/antigravity/scratch/LK-repo/learnerskart-site/public';
  const certDir = path.join(publicDir, 'cert_images');
  const distDir = 'C:/Users/sanju/.gemini/antigravity/scratch/LK-repo/learnerskart-site/dist/cert_images';
  const pmpPath = path.join(publicDir, 'pmp-certificate-demo.jpg');
  const tempBlankPath = 'C:/Users/sanju/.gemini/antigravity/brain/1d351952-a862-4c68-a360-0e4b9318a841/scratch/pmi_blank_template.jpg';

  // 1. Create pristine blank PMI template from pmp-certificate-demo.jpg
  const pmpImg = await Jimp.read(pmpPath);
  lerpRect(pmpImg, 140, 1060, 490, 550);
  await pmpImg.write(tempBlankPath);
  console.log('Created pristine blank PMI template.');

  // Courses that require custom PMI-style certificates with their exact course names
  const pmiCourses = [
    { filename: 'capm-cert-demo.jpg', title: 'Certified Associate in Project Management (CAPM)®', fontSize: 32 },
    { filename: 'cpmai-cert-demo.jpg', title: 'PMI Certified Professional in Managing AI (PMI-CPMAI)™', fontSize: 30 },
    { filename: 'dm-cert-demo.jpg', title: 'Digital Marketing Professional', fontSize: 36 },
    { filename: 'acp-cert-demo.jpg', title: 'PMI Agile Certified Practitioner (PMI-ACP)®', fontSize: 34 },
    { filename: 'pgmp-cert-demo.jpg', title: 'Program Management Professional (PgMP)®', fontSize: 34 },
    { filename: 'rmp-cert-demo.jpg', title: 'PMI Risk Management Professional (PMI-RMP)®', fontSize: 33 }
  ];

  for (const item of pmiCourses) {
    const svgText = `
      <svg width="1200" height="896">
        <text 
          x="600" 
          y="534" 
          font-family="Georgia, 'Times New Roman', serif" 
          font-weight="bold" 
          font-size="${item.fontSize}" 
          fill="#0d0d0d" 
          text-anchor="middle"
        >${item.title}</text>
      </svg>
    `;

    const outPublicPath = path.join(certDir, item.filename);
    await sharp(tempBlankPath)
      .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
      .jpeg({ quality: 95 })
      .toFile(outPublicPath);

    if (fs.existsSync(distDir)) {
      const outDistPath = path.join(distDir, item.filename);
      await sharp(tempBlankPath)
        .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
        .jpeg({ quality: 95 })
        .toFile(outDistPath);
    }

    console.log(`Generated custom PMI certificate for ${item.filename}: "${item.title}"`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
