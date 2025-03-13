const express = require("express");
const router = express.Router();
const LatestWork = require("../controller/latestwork.controller");

const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/", LatestWork.getLatestWork);
router.post("/", authMiddleware, LatestWork.createLatestWork);
router.delete("/:id", authMiddleware, LatestWork.deleteLatestWork);
router.post("/updateOrders", authMiddleware, LatestWork.updateOrder);
module.exports = router;
