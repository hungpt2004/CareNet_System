const CertificatePurchase = require('../models/certificatePurchase.model');
const Certificate = require('../models/certificate.model');

// Lấy tất cả giao dịch mua chứng chỉ
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await CertificatePurchase.find()
      .populate('userId', 'name email')
      .populate('certificateId');
    
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching certificate purchases:', error);
    res.status(500).json({ message: 'Failed to fetch certificate purchases', error: error.message });
  }
};

// Lấy giao dịch mua chứng chỉ theo ID
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await CertificatePurchase.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('certificateId');
    
    if (!purchase) {
      return res.status(404).json({ message: 'Certificate purchase not found' });
    }
    
    res.status(200).json(purchase);
  } catch (error) {
    console.error('Error fetching certificate purchase:', error);
    res.status(500).json({ message: 'Failed to fetch certificate purchase', error: error.message });
  }
};

// Lấy lịch sử mua chứng chỉ của một người dùng
exports.getUserPurchaseHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const purchases = await CertificatePurchase.find({ userId })
      .populate('certificateId')
      .sort({ createdAt: -1 });
    
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching user purchase history:', error);
    res.status(500).json({ message: 'Failed to fetch purchase history', error: error.message });
  }
};

// Tạo giao dịch mua chứng chỉ mới
exports.createPurchase = async (req, res) => {
  try {
    const { userId, certificateId, amount, paymentMethod } = req.body;
    
    // Kiểm tra xem chứng chỉ có tồn tại không
    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Kiểm tra xem người dùng đã mua chứng chỉ này chưa
    const existingPurchase = await CertificatePurchase.findOne({ 
      userId, 
      certificateId,
      paymentStatus: 'paid'
    });
    
    if (existingPurchase) {
      return res.status(400).json({ message: 'User has already purchased this certificate' });
    }
    
    const newPurchase = new CertificatePurchase({
      userId,
      certificateId,
      amount,
      paymentMethod,
      paymentStatus: 'notpaid'
    });
    
    const savedPurchase = await newPurchase.save();
    
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Error creating certificate purchase:', error);
    res.status(400).json({ message: 'Failed to create certificate purchase', error: error.message });
  }
};

// Cập nhật trạng thái thanh toán
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    
    const purchase = await CertificatePurchase.findById(id);
    
    if (!purchase) {
      return res.status(404).json({ message: 'Certificate purchase not found' });
    }
    
    purchase.paymentStatus = paymentStatus;
    
    // Nếu đã thanh toán, cập nhật thời gian thanh toán
    if (paymentStatus === 'paid') {
      purchase.paidAt = new Date();
    }
    
    const updatedPurchase = await purchase.save();
    
    res.status(200).json(updatedPurchase);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(400).json({ message: 'Failed to update payment status', error: error.message });
  }
};

// Xóa giao dịch mua chứng chỉ
exports.deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    
    const purchase = await CertificatePurchase.findByIdAndDelete(id);
    
    if (!purchase) {
      return res.status(404).json({ message: 'Certificate purchase not found' });
    }
    
    res.status(200).json({ message: 'Certificate purchase deleted successfully' });
  } catch (error) {
    console.error('Error deleting certificate purchase:', error);
    res.status(500).json({ message: 'Failed to delete certificate purchase', error: error.message });
  }
};