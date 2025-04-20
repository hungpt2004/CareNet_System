const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      "processing",//sk đang diễn ra
      "rejected",  //đã bị từ chối 
      "approved",  //đã được chấp nhận 
      "pending",   //yêu cầu hủy tham gia
      "cancelled", //sau khi được duyệt hủy tham gia
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

module.exports = mongoose.model("HistoryEvent", historyEventSchema);
