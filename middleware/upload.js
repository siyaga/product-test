const multer = require("multer");



var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '././public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;