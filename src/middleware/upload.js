import multer from "multer";
import path from "path";

let limit = {
  fileSize: 1024 * 1024 * 3, // 3 MB
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let staticFolder = "./public";
    cb(null, staticFolder);
  },
  filename: (req, file, cb) => {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

let fileFilter = (req, file, cb) => {
  const validExtensions = [
    ".jpeg", ".jpg", ".png", ".svg", ".doc", ".pdf", ".mp4"
  ].map(ext => ext.toLowerCase());

  let originalName = file.originalname;
  let originalExtension = path.extname(originalName);
  let isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limit,
});

export default upload;
