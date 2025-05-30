const eventRegistrationController = require("../controllers/eventRegistration.controller");
const express = require("express");
const { authenticateToken } = require("../middleware/isAuthenticate");
const eventRegistrationRouter = express.Router();

eventRegistrationRouter.post("/event-registration",authenticateToken,eventRegistrationController.eventRegistration);
eventRegistrationRouter.get("/get-current-user-for-event-registration",authenticateToken, eventRegistrationController.getCurrentUserForEventRegistration);
eventRegistrationRouter.get("/get-event-registration",authenticateToken, eventRegistrationController.getEventRegistration);
module.exports = eventRegistrationRouter;