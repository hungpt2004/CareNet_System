const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Kiểm tra ngày hết hạn auto là 1 tháng kể từ ngày tạo

const OrganizationSubscription = new Schema({
  _id: {type: Schema.ObjectId, ref: 'User'}, 
  organizationId: {type: Schema.ObjectId, ref: 'Organization'}, 
  levelId: {type: Schema.ObjectId, ref: 'OrganizationLevel'}, 
  price: {type: Number},
  subscribedAt: {type: Date, default: new Date.now}, // Ngày bắt đầu dùng gói
  expiredAt:  {type: Date, default: new Date.now}, // Ngày hết hạn
  status: {type: String, default: 'not paid', enum: ["paid","not paid"]},
});

module.exports = mongoose.model(
  "OrganizationSubscription",
  OrganizationSubscription
);
