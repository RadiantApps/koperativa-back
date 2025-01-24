const express = require("express");
const router = express.Router();
const BlogController = require("../controller/blog.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddlewareBlog = require("../middleware/upload/uploadMiddlewareBlog");
router.get("/", BlogController.getBlogs);
router.get("/:id", BlogController.getBlgById);
router.post(
  "/",
  authMiddleware,
  uploadMiddlewareBlog,
  BlogController.createBlogs
);

router.delete("/:id", authMiddleware, BlogController.deleteBlogs);

module.exports = router;
