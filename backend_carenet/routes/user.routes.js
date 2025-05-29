const userController = require("../controllers/volunteer.controller");
const express = require("express");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/isAuthenticate");
const userRouter = express.Router();

userRouter.post(
  "/hobby",
  authenticateToken,
  authorizeRoles(["volunteer"]),
  userController.createHobbies
);

module.exports = userRouter;
