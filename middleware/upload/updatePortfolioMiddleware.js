const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/portfolio";

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

const updatePortfolioMiddleware = (req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = req.file;

    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "video/mp4",
      ];

      if (!allowedTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.path);
        return res
          .status(400)
          .json({ error: `Invalid file type: ${file.originalname}` });
      }

      req.filePath = file.path.replace(/\\/g, "/");
    }

    next();
  });
};

module.exports = updatePortfolioMiddleware;
