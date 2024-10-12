const express = require("express");
const router = express.Router();
const JobsController = require("../controller/jobs.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
router.get("/", JobsController.getJobs);
router.get("/:id", JobsController.getJobsById);
router.post("/", authMiddleware, JobsController.createJobs);
router.delete("/:id", authMiddleware, JobsController.deleteJobs);

module.exports = router;
