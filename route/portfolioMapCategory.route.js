const express = require("express");
const router = express.Router();

const PortfolioMapCategoryController = require("../controller/portfoliomapCategory.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get(
  "/:id",
  PortfolioMapCategoryController.getPortfolioMapCategoryByPortfolioId
);
router.post(
  "/",
  authMiddleware,
  PortfolioMapCategoryController.createPortfolioMapCategory
);
router.delete(
  "/:id/:portfolioId",
  authMiddleware,
  PortfolioMapCategoryController.deletePortfolioMapCategory
);
module.exports = router;
