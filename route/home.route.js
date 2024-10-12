const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const HomeController = require("../controller/home.controller");
router.post("/createContent", authMiddleware, HomeController.createContents);
router.get("/getContent", HomeController.getContent);
router.put("/editContent", authMiddleware, HomeController.editContent);
module.exports = router;
