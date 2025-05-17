// routes/certificate.routes.js
const express = require('express');
const router = express.Router();
const certificateHistoryController = require('../controllers/certificateHistory.controller');
const certificateController = require('../controllers/certificate.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');

// Route: GET /api/certificates/history/:userId
router.get('/history/:userId', certificateHistoryController.getCertificateHistory);

// Route: POST /api/certificates/create
router.post('/create-certificate', authenticateToken, certificateController.createCertificate);

module.exports = router;
