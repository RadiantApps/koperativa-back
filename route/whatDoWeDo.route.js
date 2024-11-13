const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const WhatDoWeDoController = require("../controller/whatDoWeDo.controller");

router.post("/", authMiddleware, WhatDoWeDoController.createWhatDoWeDo);
router.get("/", WhatDoWeDoController.getWhatDoWedo);
router.delete("/:id", authMiddleware, WhatDoWeDoController.deleteWhatDoWeDo);
module.exports = router;
