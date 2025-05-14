const express = require('express');
const router = express.Router();
const certificatePurchaseController = require('../controllers/certificatepurchase.controller');

// Lấy tất cả giao dịch mua chứng chỉ
router.get('/', certificatePurchaseController.getAllPurchases);

// Lấy lịch sử mua chứng chỉ của một người dùng
router.get('/user/:userId', certificatePurchaseController.getUserPurchaseHistory);

// Lấy giao dịch mua chứng chỉ theo ID
router.get('/:id', certificatePurchaseController.getPurchaseById);

// Tạo giao dịch mua chứng chỉ mới
router.post('/', certificatePurchaseController.createPurchase);

// Cập nhật trạng thái thanh toán
router.patch('/:id/payment-status', certificatePurchaseController.updatePaymentStatus);

// Xóa giao dịch mua chứng chỉ
router.delete('/:id', certificatePurchaseController.deletePurchase);

module.exports = router;