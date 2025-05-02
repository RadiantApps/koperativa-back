const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const OurStoryController = require("../controller/ourstory.controller");
const uploadOurStoryMiddleware = require("../middleware/upload/uploadOurStoryMiddleware");

router.get("/", OurStoryController.getOurStory);
router.put("/", authMiddleware, OurStoryController.updateOrder);
router.post(
  "/",
  authMiddleware,
  uploadOurStoryMiddleware,
  OurStoryController.createOurStory
);
router.delete("/:id", authMiddleware, OurStoryController.deleteOurStory);

module.exports = router;
