// routes/certificate.routes.js
const express = require('express');
const router = express.Router();
const { getCertificateHistory } = require('../controllers/certificatehistorycontroller');

// Route: GET /api/certificates/history/:userId
router.get('/history/:userId', getCertificateHistory);

module.exports = router;
