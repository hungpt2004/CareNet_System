const Organization = require("../models/organization.model");
const OrganizationLevel = require("../models/organizationLevel.model");
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
exports.getAllOrganizations = asyncHandler(async (req, res) => {
  try {
    const organizations = await Organization.find()
   .populate('userId', 'avatar')
      .populate("levelId", "name")
      .lean();

    if (!organizations.length) {
      console.log("No organizations found in database");
    }

    for (const org of organizations) {
      org.staffCount = await User.countDocuments({
        organizationId: org._id,
        role: "staff",
      });
      org.eventCount = await Event.countDocuments({
        organizationId: org._id,
      });
      console.log(`Org ${org.name}: staffCount=${org.staffCount}, eventCount=${org.eventCount}, userId.dob=${org.userId?.dob}`);
    }

    console.log("Organizations found:", organizations.length, organizations);
    return res.status(200).json({
      status: "success",
      data: organizations,
    });
  } catch (error) {
    console.error("Error fetching organizations:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy danh sách tổ chức: " + error.message,
    });
  }
});

exports.updateOrganizationStatus = asyncHandler(async (req, res) => {
  try {
    const { organizationId, status } = req.body;

    if (!organizationId || !status) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp organizationId và status",
      });
    }

    const validStatuses = ["active", "inactive"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Status phải là 'active' hoặc 'inactive'",
      });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy tổ chức",
      });
    }

    organization.organizationStatus = status;
    await organization.save();

    console.log(`Updated status of organization ${organization.name} to ${status}`);
    return res.status(200).json({
      status: "success",
      message: "Cập nhật trạng thái tổ chức thành công",
      data: organization,
    });
  } catch (error) {
    console.error("Error updating organization status:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi cập nhật trạng thái tổ chức: " + error.message,
    });
  }
});
exports.updateOrganizationLevel = asyncHandler(async (req, res) => {
  try {
    const { organizationId, levelId } = req.body;

    if (!organizationId || !levelId) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp organizationId và levelId",
      });
    }

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy tổ chức",
      });
    }

    const organizationLevel = await OrganizationLevel.findById(levelId);
    if (!organizationLevel) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy loại tổ chức",
      });
    }

    organization.levelId = levelId;
    await organization.save();

    console.log(`Updated level of organization ${organization.name} to ${organizationLevel.name}`);
    return res.status(200).json({
      status: "success",
      message: "Cập nhật loại tổ chức thành công",
      data: organization,
    });
  } catch (error) {
    console.error("Error updating organization level:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi cập nhật loại tổ chức: " + error.message,
    });
  }
});

exports.getAllOrganizationLevels = asyncHandler(async (req, res) => {
  try {
    const levels = await OrganizationLevel.find().lean();
    console.log("Fetched organization levels:", levels);
    return res.status(200).json({
      status: "success",
      data: levels,
    });
  } catch (error) {
    console.error("Error fetching organization levels:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy danh sách loại tổ chức: " + error.message,
    });
  }
});

exports.getOrganizationMembers = asyncHandler(async (req, res) => {
  try {
    const { organizationId } = req.query;

    if (!organizationId) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp organizationId",
      });
    }

    const members = await User.find({
      organizationId: organizationId,
      role: "staff",
    })
      .select("_id fullname email avatar role") // Explicitly include _id as userId
      .lean();

    console.log(`Fetched ${members.length} members for organization ${organizationId}`, members);
    return res.status(200).json({
      status: "success",
      data: members,
    });
  } catch (error) {
    console.error("Error fetching organization members:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy danh sách thành viên: " + error.message,
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
      .populate("assignChecker", "fullname email") // Optional: Populate assignChecker details
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