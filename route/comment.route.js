const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const CommentController = require("../controller/comment.controller");
const uploadMiddlewarePartners = require("../middleware/upload/uploadMiddlewarePartners");
router.get("/", CommentController.getComment);
router.post(
  "/",
  authMiddleware,
  uploadMiddlewarePartners,
  CommentController.createComment
);

router.delete("/:id", CommentController.deleteComment);
module.exports = router;
