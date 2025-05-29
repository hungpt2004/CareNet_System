const express = require('express');
const attendanceController = require('../controllers/attendace.controller');
const attendanceRouter = express.Router();

attendanceRouter.post('/attendance-user/:eventId', attendanceController.makeAttendanceUser);
attendanceRouter.post('/absent-user/:eventId', attendanceController.makeAbsentUser);

module.exports = attendanceRouter;







