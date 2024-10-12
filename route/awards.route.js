const express = require("express");
const router = express.Router();

const AwardController = require("../controller/awards.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/", AwardController.getAwards);
router.post("/", authMiddleware, AwardController.creteAwards);
router.delete("/:id", authMiddleware, AwardController.deleteAwards);
module.exports = router;
