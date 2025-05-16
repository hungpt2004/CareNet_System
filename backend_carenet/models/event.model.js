const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // URL ảnh của event
  category: { type: String },
  rating: { type: Number },
  maxParticipants: {type: Number, default: 0},
  currentParticipants: { type: Number, default: 0 },
  // pointReward: { type: Number, default: 0 }, // điểm cộng khi hoàn thành
  assignChecker: { type: mongoose.Schema.ObjectId, ref: "User" },
  startAt: { type: Date, required: true, default: Date.now },
  endAt: { type: Date, required: true, default: null },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },

  skillNeeds: [{ type: String }],

  location: {
    street: { type: String, default: null }, // Số nhà, tên đường (tùy chọn)
    ward: { type: String, default: null }, // Phường/Xã
    district: { type: String, default: null }, // Quận/Huyện
    province: { type: String, default: "Da Nang" }, // Tỉnh/Thành phố
    country: { type: String, default: "VietNam" },
    postalCode: String, // (tùy chọn) Mã bưu chính nếu cần
    fullAddress: { type: String },
  },

  formData: {
    questions: [
      {
        question: { type: String },
        type: { type: String, enum: ["text", "checkbox", "radio", "dropdown"] },
        options: [{ type: String, default: [] }], // nếu applicable
      },
    ],
  },

  status: {
    type: String,
    enum: ["hiring", "processing", "completed", "cancelled"], // full là đủ người - waiting là đang tuyển
    default: "hiring",
  },

  createdAt: { type: Date, default: Date.now },

  acceptDate: { type: Date, default: Date.now },

  // Những user đã điểm danh
  attendedUsers: [
    {
      attendanceId: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance", default: null},
    },
  ],

  // Đánh giá sự kiện
  feedbacks: [
    {
      feedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback", default: null},
    },
  ],

  // Lọc theo nguoi dung phu hop voi skill need

  // Certificate fields
  certificateTitle: {
    type: String,
    default: "Chứng nhận tham gia tình nguyện"
  },
  certificateDescription: {
    type: String,
    default: "Chứng nhận đã tham gia và hoàn thành xuất sắc sự kiện"
  },
  certificateTemplate: {
    type: String,
    enum: ["classic", "modern", "minimal"],
    default: "classic"
  },
  certificateLogo: {
    type: String
  }
}, {
  timestamps: true,
});

// Lưu fulladress middleware
EventSchema.pre("save", function (next) {
  const parts = [this.street, this.ward, this.district, this.province].filter(
    Boolean
  );
  this.fullAddress = parts.join(", ");
  next();
});

module.exports = mongoose.model("Event", EventSchema);
