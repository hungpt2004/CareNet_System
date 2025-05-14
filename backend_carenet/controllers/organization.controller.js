const Organization = require("../models/organization.model");
const User = require("../models/user.model");
const Event = require("../models/event.model");
const EventRegistration = require("../models/eventRegistration.model");
const HistoryEvent = require("../models/historyEvent.model");
const asyncHandler = require("../middleware/asyncHandler");
const { sendApproveRequest } = require("./email.controller");
const { getIO } = require("../socket");

exports.getOwnEvent = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  try {
    const organizationId = await currentUser.organizationId;
    const eventData = await Event.find({
      organizationId: organizationId,
      status: "hiring",
    });
    return res.status(200).json({
      status: "success",
      eventData: eventData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy sự kiện",
    });
  }
});

exports.getRequestEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const currentEvent = await Event.findById(id);
    if (!currentEvent) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sự kiện",
      });
    }

    const currentEventRegistration = await EventRegistration.find({
      event: currentEvent._id,
    }).populate(
      "user",
      "fullname email phone hobbies dob status reputationPoints totalHours activityPoints"
    );

    if (!currentEventRegistration.length) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu",
      });
    }
    return res.status(200).json({
      status: "success",
      eventData: currentEvent,
      eventRegistrationData: currentEventRegistration,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy yêu cầu",
    });
  }
});

exports.approveRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullname, email } = req.body;
  console.log("Approving request:", { requestId: id, fullname, email });

  try {
    const currentEventRegistration = await EventRegistration.findById(id);
    if (!currentEventRegistration) {
      console.log("Request not found:", id);
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu",
      });
    }
    console.log("Found event registration:", currentEventRegistration);

    const currentEvent = await Event.findById(currentEventRegistration.event);
    if (!currentEvent) {
      console.log("Event not found:", currentEventRegistration.event);
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sự kiện",
      });
    }
    console.log("Found event:", currentEvent);

    const request = await EventRegistration.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    console.log("Updated registration status:", request);

    // Tìm và cập nhật HistoryEvent tương ứng
    const historyEvent = await HistoryEvent.findOne({
      event: currentEvent._id,
      user: currentEventRegistration.user,
    });

    if (historyEvent) {
      await HistoryEvent.findByIdAndUpdate(
        historyEvent._id,
        { status: "approved" },
        { new: true }
      );
      console.log("Updated history event status:", historyEvent._id);
    }

    const fullAddress = `
    ${currentEvent.location.street}, 
    ${currentEvent.location.ward}, 
    ${currentEvent.location.district}, 
    ${currentEvent.location.province}
    `;

    // Gửi email thông báo
    console.log("Sending approval email to:", email);
    await sendApproveRequest(
      fullname,
      email,
      currentEvent.title,
      currentEvent.startAt,
      currentEvent.endAt,
      fullAddress
    );

    // Đưa user về bận
    await User.findOneAndUpdate(
      { _id: currentEventRegistration.user },
      {
        $set: { status: "busy" },
      }
    );

    // Gửi thông báo realtime qua Socket.IO
    const notificationData = {
      type: "request_approved",
      message: `Đơn đăng ký tham gia sự kiện "${currentEvent.title}" đã được duyệt`,
      eventId: currentEvent._id,
      eventTitle: currentEvent.title,
      startAt: currentEvent.startAt,
      endAt: currentEvent.endAt,
      location: fullAddress,
      timestamp: new Date(),
    };
    console.log("Emitting Socket.IO notification:", notificationData);

    const io = getIO();
    if (!io) {
      console.error("Socket.IO instance not found");
      return res.status(500).json({
        status: "fail",
        message: "Lỗi kết nối thông báo",
      });
    }

    io.to(currentEventRegistration.user.toString()).emit(
      "requestApproved",
      notificationData
    );
    console.log("Socket.IO notification sent successfully");

    return res.status(200).json({
      status: "success",
      message: "Duyệt yêu cầu thành công",
    });
  } catch (err) {
    console.error("Error in approveRequest:", err);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi duyệt yêu cầu",
    });
  }
});

exports.rejectRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cancellationReason } = req.body; // Lấy lý do từ chối từ body request

  try {
    const updateData = {
      status: "rejected",
      ...(cancellationReason && { cancellationReason }), // Chỉ thêm cancellationReason nếu có
    };

    const request = await EventRegistration.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!request) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Từ chối yêu cầu thành công",
      data: request,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi từ chối yêu cầu: " + error.message,
    });
  }
});

exports.filterRequestsBySkills = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { minMatchPercentage = 50 } = req.query; // Default minimum match percentage is 50%

  try {
    // Get event details to check required skills
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sự kiện",
      });
    }

    // Get all pending registrations for this event
    const registrations = await EventRegistration.find({
      event: id,
      status: "pending",
    }).populate({
      path: "user",
      select: "hobbies fullname email phone",
    });

    // Calculate match percentage for each registration
    const filteredRegistrations = registrations.map((registration) => {
      const userHobbies = registration.user.hobbies || [];
      const eventSkills = event.skills || [];

      // Calculate how many hobbies match with required skills
      const matchingSkills = userHobbies.filter((hobby) =>
        eventSkills.some(
          (skill) =>
            skill.toLowerCase().includes(hobby.toLowerCase()) ||
            hobby.toLowerCase().includes(skill.toLowerCase())
        )
      );

      // Calculate match percentage
      const matchPercentage =
        eventSkills.length > 0
          ? (matchingSkills.length / eventSkills.length) * 100
          : 0;

      return {
        registration: registration,
        matchPercentage: matchPercentage,
        matchingSkills: matchingSkills,
        requiredSkills: eventSkills,
      };
    });

    // Filter registrations based on minimum match percentage
    const qualifiedRegistrations = filteredRegistrations.filter(
      (item) => item.matchPercentage >= minMatchPercentage
    );

    // Sort by match percentage in descending order
    qualifiedRegistrations.sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );

    return res.status(200).json({
      status: "success",
      data: {
        totalRegistrations: registrations.length,
        qualifiedRegistrations: qualifiedRegistrations.length,
        registrations: qualifiedRegistrations.map((item) => ({
          registrationId: item.registration._id,
          user: {
            fullname: item.registration.user.fullname,
            email: item.registration.user.email,
            phone: item.registration.user.phone,
            hobbies: item.registration.user.hobbies,
          },
          matchPercentage: item.matchPercentage,
          matchingSkills: item.matchingSkills,
          requiredSkills: item.requiredSkills,
          registeredAt: item.registration.registeredAt,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lọc yêu cầu đăng ký: " + error.message,
    });
  }
});

exports.getOwnStaff = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  try {
    const organizer = await User.findOne({_id: currentUser._id})
    const organization = await Organization.findOne({_id: organizer.organizationId})
    const staff = await User.find({
      organizationId: organization._id,
      role: "staff"
    })
    return res.status(200).json({
      status: "success",
      staff: staff,
    })
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy nhân viên",
    });
  }
});

