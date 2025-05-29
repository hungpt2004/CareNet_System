const User = require("../models/user.model");
const EventRegistration = require("../models/eventRegistration.model");
const HistoryEvent = require("../models/historyEvent.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.approveCancelRequest = asyncHandler(async (req, res) => {
  const { eventId } = req.body;

  try {
    
   // 1. Thay đổi status của history event -> cancelled
   // 2. Thay đổi status của event registration -> rejected
   // 3. Logic trừ điểm
   // 4. Trừ đí số lượng người đang tham gia (event)
   // 5. Thêm message vào penalty log
   // 


  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Phê duyệt yêu cầu hủy tham gia thất bại",
    });
  }
});
