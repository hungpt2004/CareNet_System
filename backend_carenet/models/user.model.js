const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["volunteer", "staff", "organization", "admin"] },
  cccdNumber: { type: Number },
  cccdImages: [{ type: String }], // Mã hóa ảnh để bảo mật
  dob: {type: Date},
  address: {
    street: String, // Số nhà, tên đường (tùy chọn)
    ward: String, // Phường/Xã
    district: String, // Quận/Huyện
    province: String, // Tỉnh/Thành phố
    country: {
      code: "VN",
      name: "Vietnam",
    },
    postalCode: String, // (tùy chọn) Mã bưu chính nếu cần
    fullAddress: { type: String },
  },
  isVerified: { type: Boolean, default: false },
  status: { type: String, default: "ready", enum: ["ready", "busy"] },
  reputationPoints: { type: Number, default: 100 },
  totalHours: { type: Number, default: 0 },
  activityPoints: { type: Number, default: 0 },
  organizationId: { type: Schema.ObjectId, ref: "Organization" },
  historyEvents: [{ type: Schema.ObjectId, ref: "Event" }],
  favorites: [{ type: Schema.ObjectId, ref: "Event" }],
  certificates: [{ type: Schema.ObjectId, ref: "Certificate" }],
  hobbies: [{ type: String, default: [] }],
  position: [{ type: String, default: [] }],
});

module.exports = mongoose.model("User", UserSchema);
