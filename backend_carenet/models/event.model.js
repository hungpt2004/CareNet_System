import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  requirement: { type: String },
  images: [{ type: String }], // URL ảnh của event
  category: { type: String },
  rating: { type: Number },
  currentParticipants: { type: Number, default: 0 },
  pointReward: { type: Number, default: 0 }, // điểm cộng khi hoàn thành
  assignChecker: {type: mongoose.Schema.ObjectId, ref:'User'},
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },

  skillNeeds: [
    {type: String}
  ],

  location: {
    street: { type: String, default: null }, // Số nhà, tên đường (tùy chọn)
    ward: { type: String, default: null }, // Phường/Xã
    district: { type: String, default: null }, // Quận/Huyện
    province: { type: String, default: null }, // Tỉnh/Thành phố
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
    enum: ["hiring", "prccessing", "completed", "cancelled", "full"], // full là đủ người - waiting là đang tuyển
    default: "hiring",
  },

  createdAt: { type: Date, default: Date.now },

  acceptDate: { type: Date, default: Date.now},

  // Những user đã hoàn thành
  completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // Những user đã điểm danh
  attendedUsers: [
    {
      attendanceId: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
    },
  ],

  // Đánh giá sự kiện
  feedbacks: [
    {
      feedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
    },
  ],

  // Lọc theo 

});

export default mongoose.model("Event", EventSchema);
