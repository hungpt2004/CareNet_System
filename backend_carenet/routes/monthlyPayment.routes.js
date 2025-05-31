const express = require('express');
const router = express.Router();
const MonthlyPaymentController = require('../controllers/monthlyPayment.controller');
const { authenticateToken } = require('../middleware/isAuthenticate');

console.log('---- MONTHLY PAYMENT CONTROLLER -----');

// Route để tính doanh thu theo tháng
router.get('/calculate', authenticateToken, MonthlyPaymentController.calculateMonthlyRevenue);

router.get('/calculate-full', authenticateToken, MonthlyPaymentController.calculateAllMonthsRevenue);
   
router.post('/pay-refund', MonthlyPaymentController.refundPayment);

router.get('/get-revenue-table', MonthlyPaymentController.getMonthlyPaymentByOrganizationId)

// Route để lấy doanh thu theo tháng
router.get('/get-revenue', authenticateToken, MonthlyPaymentController.getRevenue);


module.exports = router;
