// Organization 
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
  members: [{ type: Schema.ObjectId, ref: "User" }],
  createdAt: {type: Date},
  licenseDocuments: [{type: String, default: []}],
  rating: {type: Number},
  subscribedAt: { type: Date }, // Ngày nâng cấp gói
  expiresAt: { type: Date }, // null nếu basic
});


//Event
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
    enum: ["hiring", "prccessing", "completed", "cancelled", "full"], // full là đủ người - waiting là đang tuyển
    default: "hiring",
  },

  createdAt: { type: Date, default: Date.now },

  acceptDate: { type: Date, default: Date.now},

  // Những user đã điểm danh
  attendedUsers: [
    {
      attendanceId: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance", default: null},
    },
  ],

  // Đánh giá sự kiện
  feedbacks: [
    {
      feedbackId: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
    },
  ],

});

// ORGANIZATION SUBSCRIPTION
const OrganizationSubscription = new Schema({
  _id: {type: Schema.ObjectId, ref: 'User'}, 
  organizationId: {type: Schema.ObjectId, ref: 'Organization'}, 
  levelId: {type: Schema.ObjectId, ref: 'OrganizationLevel'}, 
  price: {type: Number},
  subscribedAt: {type: Date, default: new Date.now}, // Ngày bắt đầu dùng gói
  expiredAt:  {type: Date, default: new Date.now}, // Ngày hết hạn
  status: {type: String, default: 'not paid', enum: ["paid","not paid"]},
});

// Event History 
const historyEventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "completed", //duoc phep feedback
      "finished",  //sau khi feedback
      "waiting",
      "processing",
      "approved",
      "pending",
      "cancelled",
    ],
    default: "waiting",
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  attendedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  earnedPoints: {
    type: Number,
    default: 0,
  },
  earnedHours: {
    type: Number,
    default: 0,
  },
  certificateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Certificate",
    default: null,
  },
});

// Feedback chỉ dành cho history event với status là finished thôi 
const FeedbackSchema = new Schema({
   userId: {type: Schema.ObjectId, ref: 'User'},
   eventId: {type: Schema.ObjectId, ref: 'Event'},
   rating: {type: Number, min: 1, max: 5},
   content: {type: String, default: null},
   createdAt: {type: Date, default: Date.now},
   like: {type: Number, default: 0}
})

