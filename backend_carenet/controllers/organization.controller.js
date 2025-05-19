const Organization = require("../models/organization.model");
const User = require("../models/user.model");
const Event = require("../models/event.model");
const EventRegistration = require("../models/eventRegistration.model");
const HistoryEvent = require("../models/historyEvent.model");
const OrganizationLevel = require("../models/organizationLevel.model");
const asyncHandler = require("../middleware/asyncHandler");
const { sendApproveRequest, sendRejectRequest } = require("./email.controller");
const { getIO } = require("../socket");
const { generateCertificate } = require("../services/certificate.service");
const mongoose = require("mongoose");

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

exports.approveCancelledRequest = asyncHandler(async (req, res) => {
  const { organizationId } = req.body;

  try {
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi duyệt yêu cầu: " + error.message,
    });
  }
});

exports.rejectRequest = asyncHandler(async (req, res) => {
  const { id } = req.params; // id của event registration
  const { cancellationReason } = req.body;

  try {
    // 1. Check history event
    // 2. Check event registration

    const updateData = {
      status: "rejected",
      ...(cancellationReason && { cancellationReason }),
    };

    const request = await EventRegistration.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("event");

    if (!request) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu",
      });
    }

    // History event
    await HistoryEvent.findOneAndUpdate(
      {
        event: request.event._id,
        user: request.user._id,
      },
      {
        $set: { status: "rejected" },
      },
      {
        new: true,
      }
    );

    // Sô lượng của event
    await Event.findOneAndUpdate(
      { _id: request.event._id },
      {
        $inc: { currentParticipants: -1 },
      }
    );

    // Gửi email thông báo
    // await sendRejectRequest(
    //   request.user.fullname,
    //   request.user.email,
    //   request.event.title,
    //   request.event.startAt,
    //   request.event.endAt,
    //   request.event.location,
    //   cancellationReason,
    //   request.event.link
    // );

    // Gửi thông báo realtime qua Socket.IO
    const notificationData = {
      type: "request_rejected",
      message: `Đơn đăng ký tham gia sự kiện "${
        request.event.title
      }" đã bị từ chối${
        cancellationReason ? ` với lý do: ${cancellationReason}` : ""
      }`,
      eventId: request.event._id,
      eventTitle: request.event.title,
      cancellationReason: cancellationReason,
      timestamp: new Date(),
    };

    const io = getIO();
    if (!io) {
      console.error("Socket.IO instance not found");
      return res.status(500).json({
        status: "fail",
        message: "Lỗi kết nối thông báo",
      });
    }

    io.to(request.user.toString()).emit("requestRejected", notificationData);
    console.log("Socket.IO rejection notification sent successfully");

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
    const organizer = await User.findOne({ _id: currentUser._id });
    const organization = await Organization.findOne({
      _id: organizer.organizationId,
    });
    const staff = await User.find({
      organizationId: organization._id,
      role: "staff",
      status: "ready",
    });
    return res.status(200).json({
      status: "success",
      staff: staff,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy nhân viên",
    });
  }
});

exports.generateEventCertificate = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.user._id;

  try {
    // Lấy thông tin sự kiện và người dùng
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    const registration = await EventRegistration.findOne({
      event: eventId,
      user: userId,
      status: "approved",
    });

    if (!event || !user || !registration) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy thông tin sự kiện hoặc người dùng",
      });
    }

    // Tạo dữ liệu cho chứng chỉ
    const certificateData = {
      title: event.certificateTitle || "Chứng nhận tham gia tình nguyện",
      description:
        event.certificateDescription ||
        `Chứng nhận ${user.fullname} đã tham gia và hoàn thành xuất sắc sự kiện ${event.title}`,
      recipientName: user.fullname,
      issueDate: new Date().toLocaleDateString("vi-VN"),
      template: event.certificateTemplate || "classic",
      logo: event.certificateLogo,
    };

    // Tạo chứng chỉ
    const result = await generateCertificate(certificateData);

    if (!result.success) {
      return res.status(500).json({
        status: "fail",
        message: "Không thể tạo chứng chỉ: " + result.error,
      });
    }

    // Cập nhật thông tin chứng chỉ vào registration
    await EventRegistration.findByIdAndUpdate(registration._id, {
      certificateUrl: result.certificateUrl,
      certificateGeneratedAt: new Date(),
    });

    return res.status(200).json({
      status: "success",
      message: "Tạo chứng chỉ thành công",
      certificateUrl: result.certificateUrl,
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi tạo chứng chỉ: " + error.message,
    });
  }
});

exports.createEvent = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      skills,
      staffId,
      timeRange,
      location,
      maxParticipants,
      formData,
    } = req.body;

    console.log("Request body:", req.body);

    // Validate required fields
    if (!title || !description || !staffId || !timeRange || !location) {
      return res.status(400).json({
        status: "fail",
        message: "Thiếu thông tin bắt buộc",
      });
    }

    // Validate staffId format
    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({
        status: "fail",
        message: "ID nhân viên không hợp lệ",
      });
    }

    // Lấy thông tin organization từ user hiện tại
    const currentUser = req.user.user;
    const organization = await Organization.findOne({
      _id: currentUser.organizationId,
    });

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy thông tin tổ chức",
      });
    }

    // Xử lý location data
    const locationData = {
      street: location.street || null,
      ward: location.ward || null,
      district: location.district || null,
      province: location.province || "Đà Nẵng",
      country: "Việt Nam",
      fullAddress: [
        location.street,
        location.ward,
        location.district,
        location.province,
      ]
        .filter(Boolean)
        .join(", "),
    };

    // Xử lý formData
    const processedFormData = {
      questions: Array.isArray(formData?.questions)
        ? formData.questions.map((q) => ({
            question: q.question || "",
            type: q.type || "text",
            options: Array.isArray(q.options) ? q.options : [],
          }))
        : [],
    };

    // Check if the staffId is valid
    const staff = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(staffId) },
      {
        $set: {
          status: "busy",
        },
      },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy nhân viên phụ trách",
      });
    }

    // Tạo event mới
    const newEvent = await Event.create({
      title,
      description,
      category,
      skillNeeds: skills,
      assignChecker: new mongoose.Types.ObjectId(staffId),
      startAt: timeRange[0],
      endAt: timeRange[1],
      organizationId: organization._id,
      location: locationData,
      maxParticipants: maxParticipants || 0,
      formData: processedFormData,
      status: "hiring",
      adminStatus: "pending",
    });

    console.log("New event:", newEvent);

    return res.status(201).json({
      status: "success",
      message: "Tạo sự kiện thành công",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi tạo sự kiện: " + error.message,
    });
  }
});

exports.registerOrganization = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  console.log(JSON.stringify(req.body, null, 2));

  try {
    const { name, description, phone } = req.body;

    // Get organization level
    const basicLevel = await OrganizationLevel.findOne({ name: "basic" });

    // Create organization
    const newOrganization = new Organization({
      userId: currentUser._id,
      levelId: basicLevel._id,
      name: name,
      description: description,
      phone: phone,
      status: "pending",
    });

    // Update user with new organizationId
    const updatedUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      {
        $set: {
          organizationId: newOrganization._id,
        },
      },
      { new: true } // Return the updated document
    );

    await newOrganization.save();

    return res.status(201).json({
      status: "success",
      message: "Yêu cầu tạo thành công! Đợi duyệt",
      organization: newOrganization,
      user: updatedUser, // Return the updated user data
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi đăng ký tổ chức: " + error.message,
    });
  }
});

