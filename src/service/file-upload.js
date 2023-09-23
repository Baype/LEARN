import multer from "multer";

// Fungsi untuk mengonfigurasi tempat file akan disimpan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:/LEARN/public/assets/images'); // Folder penyimpanan file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Nama file yang disimpan
  },
});

// Fungsi untuk memeriksa tipe file yang diperbolehkan
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true); // Terima file
  } else {
    cb(new Error('File type not supported'), false); // Tolak file
  }
};

// Inisialisasi multer dengan konfigurasi di atas
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batasan ukuran file (5MB)
  fileFilter: fileFilter,
});

module.exports = upload;
