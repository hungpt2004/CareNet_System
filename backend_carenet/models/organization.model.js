const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  levelId: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationLevel" }, // Từ level check xem được đăng nhiêu bài
  name: { type: String },
  description: { type: String },
  phone: {type: String},
  adminStatus: {
    type: String,
    default: "pending",
    enum: ["approved", "pending"],
  }, // Trạng thái admin duyệt -> reject thì xóa luôn
  organizationStatus: {
    type: String,
    default: "inactive",
    enum: ["active", "inactive"],
  },
  createdAt: {type: Date, default: Date.now},
  licenseDocuments: [{type: String, default: []}],
  rating: {type: Number, default: 0},
});

module.exports = mongoose.model('Organization', OrganizationSchema);