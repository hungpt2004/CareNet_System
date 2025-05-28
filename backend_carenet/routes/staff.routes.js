const express = require('express');
const StaffRouter = express.Router();
const { authenticateToken } = require('../middleware/isAuthenticate');
const StaffController = require('../controllers/staff.controller');

StaffRouter.get('/get-assign-event', authenticateToken, StaffController.getAssignEvent);
StaffRouter.get('/get-volunteer-list', authenticateToken, StaffController.getVolunteerByEventId);
StaffRouter.post('/take-attendance', authenticateToken, StaffController.takeAttendance);
StaffRouter.post('/take-absent', authenticateToken, StaffController.takeAbsent);

module.exports = StaffRouter;
