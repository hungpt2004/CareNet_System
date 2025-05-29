const express = require('express');
const attendanceController = require('../controllers/attendace.controller');
const attendanceRouter = express.Router();
const { authenticateToken } = require('../middleware/isAuthenticate');

attendanceRouter.post('/attendance-user/:eventId', attendanceController.makeAttendanceUser);

module.exports = attendanceRouter;







