const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const otsu = require("../utils/otsu");
const toGray = require("../utils/grayscale");

const router = express.Router();
const upload = multer();

router.post("/", upload.single("image"), async (req, res) => {
  const image = sharp(req.file.buffer);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  let grayPixels = [];
  for (let i = 0; i < data.length; i += info.channels) {
    grayPixels.push(toGray(data[i], data[i + 1], data[i + 2]));
  }

  const t = otsu(grayPixels);

  let binary = Buffer.alloc(grayPixels.length);
  grayPixels.forEach((p, i) => {
    binary[i] = p > t ? 255 : 0;
  });

  const output = await sharp(binary, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 1
    }
  }).png().toBuffer();

  res.set("Content-Type", "image/png");
  res.send(output);
});

module.exports = router;
