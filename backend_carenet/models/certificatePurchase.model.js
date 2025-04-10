const mongoose = require('mongoose');

const CertificatePurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate', required: true },

  // Chi tiết thanh toán
  amount: { type: Number, required: true },              // Số tiền thanh toán

  paymentMethod: {
    type: String,
    enum: ['MOMO', 'ZALOPAY', 'CREDIT_CARD', 'ONLINE'],
    required: true,
    default: 'ONLINE'
  },

  paymentStatus: {
    type: String,
    enum: ['notpaid', 'paid'],
    default: 'notpaid'
  },

  // Metadata
  paidAt: { type: Date },      // Ngày thanh toán thành công
  
  createdAt: { type: Date, default: Date.now },          // Ngày khởi tạo giao dịch

});

module.exports = mongoose.model('CertificatePurchase', CertificatePurchaseSchema);