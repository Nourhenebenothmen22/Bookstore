// middellware/upload.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Créer le dossier s'il n'existe pas
const storagePath = "./Storage";
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    const uniquename = Date.now() + "-" + file.originalname;
    cb(null, uniquename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non supporté")); // Correction de 'error' à 'Error'
    }
  }
});

module.exports = upload;