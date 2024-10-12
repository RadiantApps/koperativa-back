const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/comment";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const uploadMiddlewareComment = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = req.file;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
    ];

    if (file) {
      if (!allowedTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.path);
        return res
          .status(400)
          .json({ error: `Invalid file type: ${file.originalname}` });
      }
    } else {
      return res.status(400).json({ error: "Please upload a photo" });
    }

    next();
  });
};

module.exports = uploadMiddlewareComment;
