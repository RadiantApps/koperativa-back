const express = require("express");
const router = express.Router();
const PortfolioController = require("../controller/portfolio.controller");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/upload/uploadMiddleware");

router.get("/", PortfolioController.getPortfolios);
router.get("/:id", PortfolioController.getPortfolio);
router.get("/getPortfolioDetails/:id", PortfolioController.getPortfolioDetails);
router.post(
  "/",
  authMiddleware,
  checkRole("admin", "user"),
  uploadMiddleware,
  PortfolioController.createPortfolio
);

router.put(
  "/:id",
  authMiddleware,
  checkRole("admin", "user"),
  PortfolioController.updatePortfolio
);

router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin", "user"),
  PortfolioController.deletePortfolio
);
module.exports = router;
