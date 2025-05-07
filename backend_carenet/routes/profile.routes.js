const profileController = require("../controllers/profile.controller");
const express = require("express");
const {authenticateToken} = require("../middleware/isAuthenticate");
const profileRouter = express.Router();

profileRouter.put("/edit-profile",authenticateToken, profileController.editProfile);

profileRouter.put("/upload-avatar/",authenticateToken, profileController.uploadAvatar);
profileRouter.get("/get-current-user-for-profile-avatar",authenticateToken, profileController.getCurrentUserForProfileAvatar);

profileRouter.post("/send-feedback-history-events/:eventId",authenticateToken, profileController.sendFeedbackHistoryEvents);
profileRouter.get("/get-history-events", profileController.getHistoryEventById);
profileRouter.get("/get-all-history-events",authenticateToken, profileController.getAllHistoryEvent);

module.exports = profileRouter;
