const express = require("express");
const feedbackRouter = express.Router();
const feedbackController = require("../controllers/feedback.controller");
const { authenticateToken } = require("../middleware/isAuthenticate");

feedbackRouter.post("/create-feedback/:id", authenticateToken, feedbackController.createFeedback);

module.exports = feedbackRouter;
