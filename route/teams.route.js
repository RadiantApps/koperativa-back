const express = require("express");
const router = express.Router();
const TeamsController = require("../controller/teams.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadMiddlewareTeams = require("../middleware/upload/uploadMiddlewareTeam");

router.get("/", TeamsController.getTeams);
router.post(
  "/",
  authMiddleware,
  uploadMiddlewareTeams,
  TeamsController.createTeams
);
router.delete("/:id", authMiddleware, TeamsController.deleteTeams);
module.exports = router;
