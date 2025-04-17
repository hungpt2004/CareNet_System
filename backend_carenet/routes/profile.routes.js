const profileController = require("../controllers/profile.controller");
const express = require("express");
const {authenticateToken} = require("../middleware/isAuthenticate");
const profileRouter = express.Router();

profileRouter.put("/edit-profile/:userId",authenticateToken, profileController.editProfile);
profileRouter.get("/get-profile/:userId",authenticateToken, profileController.getProfile);
profileRouter.put("/upload-avatar/:userId",authenticateToken, profileController.uploadAvatar);
profileRouter.get("/get-avatar/:userId",authenticateToken, profileController.getUploadAvatarById);
module.exports = profileRouter;
