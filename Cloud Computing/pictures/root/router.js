const express = require('express');
const app = express();
const path = require('path');

const router = express.Router();
const upload = require("./middleware");
const Resize = require("./size");

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, "./public/images");
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Upload Image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});

module.exports = router;