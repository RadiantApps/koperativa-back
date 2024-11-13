const express = require("express");
const router = express.Router();

const NextPostRoute = require("../controller/nextPost.controller");
const uploadMiddlewareNextPost = require("../middleware/upload/uploadMiddlewareNextPost");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/:portfolioId", NextPostRoute.getNextPostByPortfolioId);
router.post(
  "/",
  authMiddleware,
  uploadMiddlewareNextPost,
  NextPostRoute.createNextPost
);
router.delete("/:id", authMiddleware, NextPostRoute.deleteNextPost);

module.exports = router;
