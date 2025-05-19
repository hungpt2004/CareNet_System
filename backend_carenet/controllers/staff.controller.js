const User = require("../models/user.model");
const Event = require("../models/event.model");
const EventRegistration = require("../models/eventRegistration.model");
const Organization = require("../models/organization.model");
const Attendance = require("../models/attendance.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAssignEvent = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  const events = await Event.find({
    assignChecker: currentUser._id,
    // status: "active",
    // adminStatus: "approved",
  });

  if (!events) {
    return res.status(404).json({
      status: "fail",
      message: "Không tìm thấy sự kiện",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Lấy danh sách sự kiện thành công",
    eventData: events,
  });
});

exports.getVolunteerByEventId = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  const currentAssignEvent = await Event.findOne({
    assignChecker: currentUser._id,
    // status: "active",
    // adminStatus: "approved",
  });

  if (!currentAssignEvent) {
    return res.status(404).json({
      status: "fail",
      message: "Không tìm thấy sự kiện",
    });
  }

  const listVolunteers = await EventRegistration.find({
    event: currentAssignEvent._id,
    status: "approved",
  }).populate("user");

  if (!listVolunteers) {
    return res.status(404).json({
      status: "fail",
      message: "Không tìm thấy danh sách đăng ký",
    });
  }

  const volunteers = await Organization.find({
    eventId: currentUser.organizationId,
    adminStatus: "approved",
    organizationStatus: "active",
  });

  if (!volunteers) {
    return res.status(404).json({
      status: "fail",
      message: "Không tìm thấy danh sách đăng ký",
    });
  }

  console.log(listVolunteers.map((volunteer) => volunteer.user));

  return res.status(200).json({
    status: "success",
    message: "Lấy danh sách đăng ký thành công",
    volunteers: volunteers,
    listVolunteers: listVolunteers,
  });
});

exports.takeAttendance = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  const { userId, message, levelRating } = req.body;

  console.log(userId, message, levelRating);

  const currentEvent = await Event.findOne({
    assignChecker: currentUser._id,
    // status: "active",
    // adminStatus: "approved",
  });

  if (!currentEvent) {
    return res.status(404).json({
      status: "fail",
      message: "Không tìm thấy sự kiện",
    });
  }

  console.log(currentEvent.status);

  if (currentEvent.status !== "completed") {
    return res.status(400).json({
      status: "fail",
      message: "Sự kiện chưa hoàn tất, không thể điểm danh",
    });
  }

  const currentOrganization = await Organization.findOne({
    _id: currentEvent.organizationId,
    // adminStatus: "approved",
    // organizationStatus: "active",
  });

  if (!currentOrganization) {
    return res.status(404).json({
      status: "fail",
      message: "Không tìm thấy tổ chức",
    });
  }

  const attendance = await Attendance.findOne({
    eventId: currentEvent._id,
    userId: userId,
  });

  if (!attendance) {
    return res.status(400).json({
      status: "fail",
      message: "Không tìm thấy đơn điểm danh",
    });
  }

  // Update status attendance
  await Attendance.findOneAndUpdate(
    {
      eventId: currentEvent._id,
      userId: userId,
    },
    {
      $set: {
        status: "attended",
        levelRating: levelRating,
        message: message || null,
        checkOutTime: Date.now(),
      },
    }
  );

  return res.status(200).json({
    status: "success",
    message: "Điểm danh thành công",
  });
});

exports.takeAbsent = asyncHandler(async (req, res) => {});
