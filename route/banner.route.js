const express = require("express");
const router = express.Router();

const BannerContoller = require("../controller/banner.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddlewareSlide = require("../middleware/upload/uploadMiddlewareSlider");
router.get("/", BannerContoller.getBanner);
router.post(
  "/career",
  authMiddleware,
  uploadMiddlewareSlide,
  BannerContoller.createCareerSlider
);

router.get("/getCareerSlider", BannerContoller.getCareerSlider);
router.delete(
  "/deleteCareerSlider/:id",
  authMiddleware,
  BannerContoller.deleteCareerSlider
);
module.exports = router;
