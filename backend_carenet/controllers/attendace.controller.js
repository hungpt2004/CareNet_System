const HistoryEvent = require("../models/historyEvent.model");
const EventRegistration = require("../models/eventRegistration.model");
const Organization = require("../models/organization.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");
const asyncHandler = require("../middleware/asyncHandler");
const { sendThankYouMail } = require("./email.controller");

exports.makeAttendanceUser = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { userId, message, levelRating } = req.body;

  try {
    // Điểm danh cho từng User
    // Lấy user id
    // Lấy event id
    // 1. Tạo attendance
    // 2. Cập nhật attendanceAt, completedAt trong event model
    // 3. Cập nhật status trong historyEvent model
    // 4. Cập nhật reputationPoints dựa trên levelRating

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({
        message: "Không tìm thấy sự kiện hoặc người dùng",
      });
    }

    // Kiểm tra user đã điểm danh chưa
    const existAttendance = await Attendance.findOne({
      event: eventId,
      user: userId,
    });
    if (existAttendance) {
      return res.status(400).json({
        message: "User đã điểm danh",
      });
    }

    // Tính toán reputation points dựa trên levelRating
    let reputationPointsChange = 0;
    if (levelRating === "Very Good" || levelRating === "Good") {
      reputationPointsChange = 1;
      // send mail thank you mail with point

      // Lấy organization hiện tại
      const currentOrganization = await Organization.findOne({_id: event.organizationId});

      const currentOrganizationAccount = await User.findOne(
        {
          organizationId: currentOrganization._id, 
          role: "organization"
        }
      );

      // Gửi email thông báo cho user
      await sendThankYouMail(
        user.fullname,
        user.email,
        event.name,
        event.startAt,
        event.endAt,
        event.location,
        event.maxParticipants,
        currentOrganizationAccount.fullname
      )

    }

    // Cập nhật reputation points cho user
    await User.findByIdAndUpdate(userId, {
      $inc: { reputationPoints: reputationPointsChange },
    });

    // Tính khoảng thời gian đã điểm danh
    const attendanceTimeMs = event.endAt - event.startAt;
    const attendanceHours = attendanceTimeMs / (1000 * 60 * 60); // chuyển mili giây -> giờ

    // Cập nhật totalHours cho user
    await User.findByIdAndUpdate(userId, {
      $inc: { totalHours: attendanceHours },
    });

    // Tạo attendance
    const attendance = await Attendance.create({
      eventId: eventId,
      userId: userId,
      status: 'attended',
      checkInTime: event.endAt,
      checkOutTime: Date.now(),
      message: message || null,
      levelRating: levelRating || "Good",
    });

    console.log("Đã điểm danh cho user: ", user.fullname);

    // Cập nhật attendanceAt, completedAt trong event model
    await HistoryEvent.findOneAndUpdate(
      { event: event._id, user: user._id },
      {
        attendanceAt: new Date(),
        completedAt: new Date(),
      }
    );

    console.log("Đã cập nhật attendanceAt, completedAt trong event model");

    // Cập nhật status trong historyEvent model
    await HistoryEvent.findOneAndUpdate(
      { event: event._id, user: user._id },
      {
        $set: {status: 'completed'},
      }
    );

    console.log("Đã cập nhật status trong historyEvent model");

    return res.status(200).json({
      status: "success",
      message: "Điểm danh thành công",
      attendance: attendance,
      reputationPointsChange: reputationPointsChange,
    });
  } catch (error) {
    console.error("Error in makeAttendanceUser:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi điểm danh",
    });
  }
});

exports.makeAbsentUser = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  // 1. Nhận evenId và userId
  // 2. Trừ điểm uy tín của user - 15 điểm
  // 3. Tạo attendance với status = absent, level - verybad, message - "User không điểm danh"
  // 4. Cập nhật status trong historyEvent model - status = cancelled
  // 5. Gửi email thông báo cho user
  // 6. Trả về message thành công

  try {
    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(404).json({
        message: "Không tìm thấy user",
      });
    }
    await User.findByIdAndUpdate(userId, {
      $inc: { reputationPoints: -15 },
    });

    // Tạo attendance
    const attendance = await Attendance.create({
      eventId: eventId,
      userId: userId,
      status: "absent",
      levelRating: "verybad",
      message: "User vắng mặt không tham gia sự kiện",
    });

    // Cập nhật status trong historyEvent model
    await HistoryEvent.findOneAndUpdate(
      { event: eventId, user: userId },
      {
        $set: {status: 'cancelled'},
      }
    );
    
    // Gửi email thông báo cho user
    await sendAbsentMail(
      currentUser.fullname,
      currentUser.email,
      event.name,
      event.startAt,
    )

    return res.status(200).json({
      status: "success",
      message: "User vắng mặt không tham gia sự kiện",
    });

  } catch (error) {
    console.error("Error in makeAbsent:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi điểm danh",
    });
  }
});
