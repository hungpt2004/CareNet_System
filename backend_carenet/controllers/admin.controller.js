const User = require("../models/user.model");
const EventRegistration = require("../models/eventRegistration.model");
const HistoryEvent = require("../models/historyEvent.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.approveOrganizationRegister = asyncHandler(async (req, res) => {

  const { organizationId } = req.body;

  try {
    
   


  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Phê duyệt yêu cầu hủy tham gia thất bại",
    });
  }
});
