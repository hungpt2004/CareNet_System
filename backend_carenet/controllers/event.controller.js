const Event = require("../models/event.model");
const EventRegistration = require("../models/eventRegistration.model");
const Feedback = require("../models/feedback.model");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { sendSuccessRegisterEvent } = require("./email.controller");
const HistoryEventModel = require("../models/historyEvent.model");

exports.getEventDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    console.log(`EventId is invalid`);
    return;
  }
  try {
    // Get Event Information
    const currentEvent = await Event.findOne({ _id: id }).populate(
      "organizationId",
      "name description"
    );
    // Get Feedback Event
    const feedbackArray = await Feedback.find({
      _id: { $in: currentEvent.feedbacks },
    }).populate("userId", "fullname");

    if (!currentEvent) {
      console.log(`Event is not found!`);
      return;
    }
    return res.status(200).json({
      status: "success",
      message: "Get event detail success",
      event: currentEvent,
      feedback: feedbackArray,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Get event detail failed",
    });
  }
});

exports.registerEvent = asyncHandler(async (req, res) => {
  const currentUser = req.user.user; // Lấy thông tin người dùng từ middleware auth
  const { id } = req.params;
  const { answers } = req.body; // Lấy eventId và answers từ body

  console.log(answers);
  console.log(id);
  console.log(currentUser);

  try {
    // Kiểm tra đầu vào
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "fail",
        message: "ID sự kiện không hợp lệ",
      });
    }

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({
        status: "fail",
        message: "Dữ liệu câu trả lời không hợp lệ",
      });
    }

    // Kiểm tra xem người dùng đã đăng ký sự kiện này chưa
    const existRegistration = await EventRegistration.findOne({
      user: currentUser._id,
      event: id,
    });

    if (existRegistration) {
      console.log("Đã ghi danh rồi");
      return res.status(400).json({
        status: "fail",
        message: "Bạn đã đăng ký sự kiện này rồi",
      });
    }

    // Chuyển đổi answers thành mảng chuỗi (tùy thuộc vào yêu cầu)
    // Cách 1: Chuyển toàn bộ object thành chuỗi JSON
    const answersArray = [JSON.stringify(answers)];

    // Cách 2 (tùy chọn): Chuyển các giá trị thành mảng chuỗi phẳng
    // const answersArray = Object.entries(answers).map(([key, value]) => `${key}: ${value}`);

    // Tạo bản ghi đăng ký mới
    const newRegistration = new EventRegistration({
      event: id,
      user: currentUser._id,
      registeredAt: new Date(),
      status: "pending",
      answers: answersArray,
      cancellationReason: null,
      approvedBy: null,
      approvedAt: null,
    });

    const currentEvent = await Event.findOne({ _id: id });

    const eventDetailsLink = `http://localhost:3000/event-detail/${id}`;

    const fullAddress = `
      ${currentEvent.location.street}, 
      ${currentEvent.location.ward}, 
      ${currentEvent.location.district}, 
      ${currentEvent.location.province}
      `;

    // Gửi email thành công
    await sendSuccessRegisterEvent(
      currentUser.fullname,
      currentUser.email,
      currentEvent.title,
      currentEvent.startAt,
      currentEvent.endAt,
      fullAddress,
      eventDetailsLink
    );

    // Lưu vào history event
    const newHistoryEvent = new HistoryEventModel({
      event: id,
      user: currentUser._id,
      status: "waiting",
      registeredAt: newRegistration.registeredAt,
    });


    // Lưu vào database
    await newRegistration.save();
    await newHistoryEvent.save();

    // Update số lượng người tham gia tăng lên
    await Event.findByIdAndUpdate(id, { $inc: { currentParticipants: 1 } });

    // Trả về phản hồi thành công
    return res.status(201).json({
      status: "success",
      message: "Ghi danh sự kiện thành công",
      registration: newRegistration,
    });
  } catch (error) {
    console.error("Lỗi khi ghi danh:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi ghi danh: " + error.message,
    });
  }
});

exports.getMyEvents = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  try {
    const myEvents = await HistoryEventModel.find({
      user: currentUser._id,
    }).populate("event");
    return res.status(200).json({
      status: "success",
      message: "Lấy sự kiện thành công",
      events: myEvents,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lấy events thất bại",
    });
  }
});

exports.getFinishedEvents = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  console.log(currentUser.organizationId);
  try {
    const events = await Event.find({
      organizationId: currentUser.organizationId,
      // endAt: { $lt: new Date() }
    }).populate("organizationId");
    
    return res.status(200).json({
      status: "success",
      message: "Lấy sự kiện đã hoàn thành",
      events: events,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lấy sự kiện đã hoàn thành thất bại",
    });
  }
});

exports.getPendingVolunteers = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  console.log(currentUser.organizationId);
  
  try {
    const pendingVolunteers = await EventRegistration.find({
      organizationId: currentUser.organizationId,
      status: "pending",
    }).populate("user");
    return res.status(200).json({
      status: "success",
      message: "Lấy tình nguyện viên đang chờ phê duyệt",
      volunteers: pendingVolunteers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lấy tình nguyện viên đang chờ phê duyệt thất bại",
    });
  }
});

exports.getEventsByOrganizationId = asyncHandler(async (req, res) => {
  try {
    const { organizationId } = req.query;

    if (!organizationId) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp organizationId",
      });
    }

    const events = await Event.find({ organizationId: organizationId })
      .populate("assignChecker", "fullname email")
      .lean();

    console.log(`Fetched ${events.length} events for organization ${organizationId}`, events);
    return res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy danh sách sự kiện: " + error.message,
    });
  }
});