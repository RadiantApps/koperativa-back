const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const AboutController = require("../controller/about.controller");
const uploadMiddlewareSlider = require("../middleware/upload/uploadMiddlewareSlider");
const uploadMiddlewareAbout = require("../middleware/upload/uploadMiddlewareAbout");

router.post("/createContent", authMiddleware, AboutController.createContents);
router.get("/getContent", AboutController.getContent);
router.put("/editContent", authMiddleware, AboutController.editContent);
router.post(
  "/createSlider",
  authMiddleware,
  uploadMiddlewareSlider,
  AboutController.createSlider
);

router.get("/getSlider", AboutController.getSlider);
router.delete(
  "/deleteSlider/:id",
  authMiddleware,
  AboutController.deleteSlider
);

router.post(
  "/addphoto",
  authMiddleware,
  uploadMiddlewareAbout,
  AboutController.addPhoto
);

router.delete("/deleteVideo/:id", authMiddleware, AboutController.deletePhoto);
router.put(
  "/updatePhoto/:id",
  authMiddleware,
  uploadMiddlewareAbout,
  AboutController.updatePhoto
);
module.exports = router;
