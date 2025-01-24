const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/blog/blogs";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadMiddlewareBlogDetails = (req, res, next) => {
  const uploadHandler = upload.fields([
    { name: "file", maxCount: 1 },
    { name: "secondFile", maxCount: 1 },
  ]);

  uploadHandler(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = req.files?.file ? req.files.file[0] : null;
    const secondFile = req.files?.secondFile ? req.files.secondFile[0] : null;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "video/mp4", // Allow mp4 videos
    ];

    const validateFile = (file) => {
      if (!file) return null;
      if (!allowedTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.path);
        return `Invalid file type: ${file.originalname}`;
      }

      return null;
    };

    let errorMessage = validateFile(file);
    if (errorMessage) {
      return res.status(400).json({ error: errorMessage });
    }

    errorMessage = validateFile(secondFile);
    if (errorMessage) {
      return res.status(400).json({ error: errorMessage });
    }

    next();
  });
};

module.exports = uploadMiddlewareBlogDetails;
