const express = require("express");
const feedbackRouter = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const { authenticateToken } = require("../middleware/isAuthenticate");

feedbackRouter.post("/create-feedback/:id", authenticateToken, feedbackController.createFeedback);
feedbackRouter.get("/get-all-feedback-for-current-user",authenticateToken,feedbackController.getAllFeedback);
feedbackRouter.put("/update-feedback/:id", authenticateToken, feedbackController.editFeedback);
feedbackRouter.delete("/delete-feedback/:id", authenticateToken, feedbackController.deleteFeedback);
module.exports = feedbackRouter;
