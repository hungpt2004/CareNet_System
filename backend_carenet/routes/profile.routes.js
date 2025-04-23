const profileController = require("../controllers/profile.controller");
const express = require("express");
const {authenticateToken} = require("../middleware/isAuthenticate");
const profileRouter = express.Router();

profileRouter.put("/edit-profile",authenticateToken, profileController.editProfile);
profileRouter.put("/upload-avatar/",authenticateToken, profileController.uploadAvatar);
profileRouter.post("/send-feedback-history-events/:eventId",authenticateToken, profileController.sendFeedbackHistoryEvents);
module.exports = profileRouter;
