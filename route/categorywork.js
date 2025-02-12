const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const CategoryWorkController = require("../controller/categorywork.controller");
router.get("/", CategoryWorkController.getCategoryWorks);
router.post("/", authMiddleware, CategoryWorkController.createCategoryWorks);
router.delete(
  "/:id",
  authMiddleware,
  CategoryWorkController.deleteCategoryWorks
);
module.exports = router;
