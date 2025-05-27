const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.SPACES_REGION,
  endpoint: process.env.SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/gif",
  "video/mp4",
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.originalname}`));
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.SPACES_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/blog/blogs/${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 10MB
  fileFilter,
});

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

    const validateFile = (file) => {
      if (!file) return null;
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
