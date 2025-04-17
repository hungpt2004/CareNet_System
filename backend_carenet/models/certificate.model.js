const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  // Liên kết
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },

  // Thông tin hiển thị
  fullName: { type: String, required: true },               // Tên người nhận
  email: { type: String, required: true },                  // Email để gửi chứng chỉ (nếu có)
  eventName: { type: String, required: true },              // Tên sự kiện
  organizationName: { type: String, required: true },       // Tên tổ chức cấp chứng chỉ
  completionDate: { type: Date, required: true },           // Ngày hoàn thành sự kiện
  duration: { type: Number, required: true },               // Tổng số giờ tham gia

  // Uy tín và nhận dạng
  signature: { type: String, required: true },              // Hash dựa trên org + event

  // Trạng thái và truy xuất
  price: { type: Number, default: 30000 },                  // Nếu trả phí thì bao nhiêu
  certificateUrl: { type: String },                         // Link PDF nếu có

});

module.exports = mongoose.model('Certificate', CertificateSchema);