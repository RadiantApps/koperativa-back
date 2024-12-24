const express = require("express");
const router = express.Router();
const PortfolioItemController = require("../controller/portfolioItem.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/upload/uploadMiddleware");
const uploadMiddlewarePortfolioContent = require("../middleware/upload/upoadMiddlewarePortfilioContent");
router.get(
  "/getPorfolioItemById/:id",
  authMiddleware,
  PortfolioItemController.getPortfolioItemById
);
router.post(
  "/",
  authMiddleware,
  uploadMiddleware,
  PortfolioItemController.createPortfolioItem
);

router.put(
  "/updatePortfolioItem",
  authMiddleware,
  PortfolioItemController.updatePortfolioContent
);

router.post(
  "/createDeliverables",
  authMiddleware,
  PortfolioItemController.createDeliverables
);

router.delete(
  "/deleteDeliverables/:id",
  authMiddleware,
  PortfolioItemController.deleteDeliverables
);

router.get(
  "/getDeliverables/:portfolioId",
  authMiddleware,
  PortfolioItemController.getDeliverableByPortfolioId
);

router.put(
  "/portfolioDeliverablesUpdateOrder",
  authMiddleware,
  PortfolioItemController.deliverablesUpdateOrder
);

router.post(
  "/createPortfolioContent/:id",
  authMiddleware,
  uploadMiddlewarePortfolioContent,
  PortfolioItemController.createPortfolioContent
);

router.get(
  "/getPortfolioContentByPortfilioId/:id",
  authMiddleware,
  PortfolioItemController.getPortfolioContentByPortfilioId
);

router.put(
  "/updatePortfolioContentOrder",
  authMiddleware,
  PortfolioItemController.updatePortfolioContentOrder
);
module.exports = router;
