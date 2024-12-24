const express = require("express");
const router = express.Router();

const PartnerLogoController = require("../controller/partnerLogo.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddlewarePartnerLogo = require("../middleware/upload/uploadMiddlewarePartnerLogo");

router.get("/partnerlogo", PartnerLogoController.getPartnerLogo);
router.post(
  "/createpartnerlogo",
  authMiddleware,
  uploadMiddlewarePartnerLogo,
  PartnerLogoController.createPartnerLogo
);
router.delete(
  "/deletepartnerlogo/:id",
  authMiddleware,
  PartnerLogoController.deletePartnerLogo
);
module.exports = router;
