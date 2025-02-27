const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "tmp");
console.log(tempDir);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFIle = multer({ storage: multerConfig })

module.exports = uploadFIle;