const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddlewarePartners = require("../middleware/upload/uploadMiddlewarePartners");

const PartnersController = require("../controller/partners.contoller");
router.post(
  "/",
  authMiddleware,
  uploadMiddlewarePartners,
  PartnersController.createPartners
);

router.get("/", PartnersController.getPartners);
router.delete("/:id", authMiddleware, PartnersController.deletePartners);
module.exports = router;
