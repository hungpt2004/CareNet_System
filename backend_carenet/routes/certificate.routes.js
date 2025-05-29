// routes/certificate.routes.js
const express = require('express');
const router = express.Router();
const certificateHistoryController = require('../controllers/certificateHistory.controller');

// Route: GET /api/certificates/history/:userId
router.get('/history/:userId', certificateHistoryController.getCertificateHistory);

module.exports = router;
