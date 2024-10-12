const express = require("express");
const router = express.Router();
const CommentStaffController = require("../controller/commentStaff.controller");
const uploadMiddlewareComment = require("../middleware/upload/uploadMiddlewareComment");
const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/", CommentStaffController.getCommentStaff);
router.post(
  "/",
  uploadMiddlewareComment,
  authMiddleware,
  CommentStaffController.createCommentStaff
);
router.delete(
  "/:id",
  authMiddleware,
  CommentStaffController.deleteCommentStaff
);
module.exports = router;
