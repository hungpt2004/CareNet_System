// routes/certificate.routes.js
const express = require('express');
const router = express.Router();
const certificateHistoryController = require('../controllers/certificateHistory.controller');
const certificateController = require('../controllers/certificate.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');

router.get('/get-certificate/:eventId', authenticateToken, certificateController.getCertificate);
router.get('/history/:userId', certificateHistoryController.getCertificateHistory);
router.post('/create-certificate', authenticateToken, certificateController.createCertificate);


module.exports = router;
