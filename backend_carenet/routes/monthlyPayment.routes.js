const express = require('express');
const router = express.Router();
const MonthlyPaymentController = require('../controllers/monthlyPayment.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');

console.log('---- MONTHLY PAYMENT CONTROLLER -----');

// Route để tính doanh thu theo tháng
router.get('/calculate', authenticateToken, MonthlyPaymentController.calculateMonthlyRevenue);

router.get('/calculate-full', authenticateToken, MonthlyPaymentController.calculateAllMonthsRevenue);
   
// Route để lấy doanh thu theo tháng
router.get('/', authenticateToken, MonthlyPaymentController.getRevenue);


module.exports = router;
