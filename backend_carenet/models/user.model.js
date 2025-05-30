const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["volunteer", "staff", "organization", "admin"], default: 'volunteer'},
  cccdNumber: { type: Number },
  cccdImages: [{ type: String }], // Mã hóa ảnh để bảo mật
  phone: { type: String },
  dob: { type: Date },
  gender: { type: String },
  avatar: { type: String },
  avatarUrl: { type: String },
  address: {
    street: { type: String }, // Số nhà, tên đường (tùy chọn)
    ward: { type: String }, // Phường/Xã
    district: { type: String }, // Quận/Huyện
    province: { type: String, default: 'Da Nang'}, // Tỉnh/Thành phố
    country: { type: String, default: "VietNam" },
    postalCode: { type: String }, // (tùy chọn) Mã bưu chính nếu cần
    fullAddress: { type: String },
  },
  isVerified: { type: Boolean, default: false },
  status: { type: String, default: "ready", enum: ["ready", "busy"] },
  reputationPoints: { type: Number, default: 100 },
  totalHours: { type: Number, default: 0 },
  activityPoints: { type: Number, default: 0 },
  organizationId: { type: Schema.ObjectId, ref: "Organization", default: null},
  historyEvents: [{ type: Schema.ObjectId, ref: "Event" }],
  favorites: [{ type: Schema.ObjectId, ref: "Event" }],
  certificates: [{ type: Schema.ObjectId, ref: "Certificate" }],
  hobbies: [{ type: String, default: [] }],
});

// Lưu fulladress middleware
UserSchema.pre("save", function (next) {
  const parts = [this.street, this.ward, this.district, this.province].filter(
    Boolean
  );
  this.fullAddress = parts.join(", ");
  next();
});

module.exports = mongoose.model("User", UserSchema);


