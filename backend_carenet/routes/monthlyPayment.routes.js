const express = require('express');
const router = express.Router();
const MonthlyPaymentController = require('../controllers/monthlyPayment.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');

// Route để tính doanh thu theo tháng
router.get('/calculate', authenticateToken, MonthlyPaymentController.calculateMonthlyRevenue);

// Route để lấy doanh thu theo tháng
router.get('/', authenticateToken, MonthlyPaymentController.getRevenue);


module.exports = router;
