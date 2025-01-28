const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const HomeController = require("../controller/home.controller");
const uploadMiddlewareBannerHome = require("../middleware/upload/uploadMiddlewareBannerHome");
router.post("/createContent", authMiddleware, HomeController.createContents);
router.get("/getContent", HomeController.getContent);
router.put("/editContent", authMiddleware, HomeController.editContent);
router.get("/getBannerHome", HomeController.getBannerHome);
router.post(
  "/createBannerHome",
  authMiddleware,
  uploadMiddlewareBannerHome,
  HomeController.createBannerHome
);
router.delete(
  "/deleteBannerHome/:id",
  authMiddleware,
  HomeController.deleteBannerHome
);
module.exports = router;
