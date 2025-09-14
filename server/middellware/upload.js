// middellware/upload.js

const multer = require('multer');
const fs = require('fs');
const path = require('path');

/**
 * Storage directory for uploaded files.
 * If it does not exist, it will be created automatically.
 */
const storagePath = "./Storage";
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

/**
 * Multer disk storage configuration
 * - destination: defines where the uploaded files will be stored
 * - filename: generates a unique name by prefixing original filename with a timestamp
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

/**
 * Multer upload middleware configuration
 * - storage: uses disk storage
 * - fileFilter: only accepts image files (png, jpeg, jpg)
 */
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type. Only .png, .jpg and .jpeg are allowed."));
    }
  }
});

module.exports = upload;
