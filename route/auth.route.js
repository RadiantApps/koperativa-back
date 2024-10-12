const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const { authMiddleware, checkRole } = require("../middleware/authMiddleware");
router.get("/", authMiddleware, checkRole("admin"), UserController.getUsers);
router.get("/:id", authMiddleware, checkRole("admin"), UserController.getUser);
router.post("/", authMiddleware, checkRole("admin"), UserController.createUser);
router.put(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  UserController.updateUser
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole("admin"),
  UserController.deleteUser
);
router.post("/login", UserController.login);

module.exports = router;
