const sharp = require('sharp');
const fs = require('fs');

async function processOak() {
  const inputPath = 'public/images/professor_oak.jpg';
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4: R, G, B, A

  // Remove white background (flood fill or threshold from outer edges)
  // Let's do a flood fill from (0,0) or color threshold for near-white background
  const visited = new Uint8Array(width * height);
  const queue = [[0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]];

  const isWhite = (x, y) => {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Check if close to white / light gray background
    return r > 240 && g > 240 && b > 240;
  };

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    const index = y * width + x;
    if (visited[index]) continue;
    visited[index] = 1;

    if (isWhite(x, y)) {
      const idx = index * channels;
      data[idx + 3] = 0; // set Alpha to 0

      // Also remove soft shadow under feet if desired or keep
      if (x > 0 && !visited[y * width + (x - 1)]) queue.push([x - 1, y]);
      if (x < width - 1 && !visited[y * width + (x + 1)]) queue.push([x + 1, y]);
      if (y > 0 && !visited[(y - 1) * width + x]) queue.push([x, y - 1]);
      if (y < height - 1 && !visited[(y + 1) * width + x]) queue.push([x, y + 1]);
    }
  }

  // Save transparent full body
  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    }
  })
  .png()
  .toFile('public/images/professor_oak_full.png');

  console.log('Saved professor_oak_full.png');

  // Also create a zoomed-in bust avatar (head & shoulders)
  // Crop around the face and upper chest (top ~45% of character)
  await sharp('public/images/professor_oak_full.png')
    .extract({
      left: Math.floor(width * 0.22),
      top: Math.floor(height * 0.05),
      width: Math.floor(width * 0.56),
      height: Math.floor(height * 0.45)
    })
    .resize(300, 300, { fit: 'cover' })
    .png()
    .toFile('public/images/professor_oak_avatar.png');

  console.log('Saved professor_oak_avatar.png');
}

processOak().catch(err => {
  console.error(err);
  process.exit(1);
});
