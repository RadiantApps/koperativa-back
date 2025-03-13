const express = require("express");
const router = express.Router();
const JobsController = require("../controller/jobs.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddlewareJobs = require("../middleware/upload/uploadMiddlewareJobs");

router.get("/", JobsController.getJobs);
router.get("/:id", JobsController.getJobsById);
router.post(
  "/",
  authMiddleware,
  uploadMiddlewareJobs,
  JobsController.createJobs
);
router.delete("/:id", authMiddleware, JobsController.deleteJobs);

module.exports = router;
