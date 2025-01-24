const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const BlogDetailsController = require("../controller/bog_details.controller");
const uploadMiddlewareBlogDetails = require("../middleware/upload/uploadMiddlewareBlogDetails");

router.get("/:id", BlogDetailsController.getBlogDetailsContent);
router.post(
  "/:id",
  authMiddleware,
  uploadMiddlewareBlogDetails,
  BlogDetailsController.createBlogDetailsContent
);

router.put(
  "/:id",
  authMiddleware,
  uploadMiddlewareBlogDetails,
  BlogDetailsController.updateBlogDetailsContent
);
router.delete(
  "/:id",
  authMiddleware,
  BlogDetailsController.deleteBlogDetailsContent
);

module.exports = router;
