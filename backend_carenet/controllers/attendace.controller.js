const HistoryEvent = require("../models/historyEvent.model");
const EventRegistration = require("../models/eventRegistration.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.makeAttendanceUser = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { userId, message, levelRating, status } = req.body;

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
    }

    if (levelRating === "Bad" || levelRating === "Very Bad") {
      // Logic send thank you mail to user without point 
    }

    // Cập nhật reputation points cho user
    await User.findByIdAndUpdate(userId, {
      $inc: { reputationPoints: reputationPointsChange },
    });

    // Tạo attendance
    const attendance = await Attendance.create({
      eventId: eventId,
      userId: userId,
      status: status,
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
        status: "completed",
      }
    );

    console.log("Đã cập nhật status trong historyEvent model");

    // Chuẩn bị dữ liệu để gửi email thông báo
    const emailData = {
      user: user,
      event: event,
      attendance: attendance,
      reputationPointsChange: reputationPointsChange,
      levelRating: levelRating,
    };

    // TODO: Implement email sending logic here
    // if (levelRating === 'Bad' || levelRating === 'Very Bad') {
    //   // Send warning email
    // }

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
