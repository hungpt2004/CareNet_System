const express = require('express')
const eventRouter = express.Router();
const eventController = require('../controllers/event.controller')
const { authenticateToken } = require('../middleware/isAuthenticate') 
const { getEventsByOrganizationId } = require("../controllers/event.controller");
eventRouter.get('/get-event-detail/:id',eventController.getEventDetail);
eventRouter.post('/register-event/:id',authenticateToken, eventController.registerEvent);
eventRouter.get('/get-my-events',authenticateToken, eventController.getMyEvents);
eventRouter.get('/get-finished-events',authenticateToken, eventController.getFinishedEvents);
eventRouter.get("/events-by-organization",eventController.getEventsByOrganizationId);
module.exports = eventRouter;