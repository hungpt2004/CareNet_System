// Admin lưu lỗi khi duyệt hủy đơn
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PenaltyLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Lí do bị trừ
  reason: {
    type: String,
    required: true,
  },
  scoreDeducted: {
    type: Number,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PenaltyLog', PenaltyLogSchema);
