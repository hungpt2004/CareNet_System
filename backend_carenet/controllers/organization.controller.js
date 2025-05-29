const Organization = require("../models/organization.model");
const User = require("../models/user.model");
const Event = require("../models/event.model");
const EventRegistration = require("../models/eventRegistration.model");
const HistoryEvent = require("../models/historyEvent.model");
const asyncHandler = require("../middleware/asyncHandler");
const { sendApproveRequest } = require("./email.controller");

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
    }).populate("user", "fullname email phone hobbies dob status reputationPoints totalHours activityPoints");

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
  try {
    const currentEventRegistration = await EventRegistration.findById(id);
    if (!currentEventRegistration) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu",
      });
    }

    const currentEvent = await Event.findById(currentEventRegistration.event);
    if (!currentEvent) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sự kiện",
      });
    }

    const request = await EventRegistration.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    // Tìm và cập nhật HistoryEvent tương ứng
    const historyEvent = await HistoryEvent.findOne({ 
      eventId: currentEvent._id,
      userId: currentEventRegistration.user
    });

    if (historyEvent) {
      await HistoryEvent.findByIdAndUpdate(
        historyEvent._id,
        { status: "approved" },
        { new: true }
      );
    }

    const fullAddress = `
    ${currentEvent.location.street}, 
    ${currentEvent.location.ward}, 
    ${currentEvent.location.district}, 
    ${currentEvent.location.province}
    `;

    await sendApproveRequest(
      fullname,
      email,
      currentEvent.title,
      currentEvent.startAt,
      currentEvent.endAt,
      fullAddress,
    );

    return res.status(200).json({
      status: "success",
      message: "Duyệt yêu cầu thành công",
    });
  } catch (err) {
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
    // Kiểm tra user có organizationId không
    if (!currentUser.organizationId) {
      console.log("User has no organizationId");
      return res.status(400).json({
        status: "fail",
        message: "Người dùng chưa thuộc tổ chức nào",
      });
    }

    const organizer = await User.findOne({ _id: currentUser._id });

    if (!organizer) {
      console.log("Organizer not found");
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy thông tin người dùng",
      });
    }

    const organization = await Organization.findOne({
      _id: organizer.organizationId,
    });
    console.log("Organization:", organization);

    if (!organization) {
      console.log("Organization not found");
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy thông tin tổ chức",
      });
    }

    // Tìm tất cả nhân viên của tổ chức
    const staff = await User.find({
      organizationId: organization._id,
      role: "staff",
    });

    return res.status(200).json({
      status: "success",
      staff: staff,
    });
  } catch (error) {
    console.error("Error in getOwnStaff:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy nhân viên: " + error.message,
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
}});
  
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

    // Validate time range
    if (!Array.isArray(timeRange) || timeRange.length !== 2) {
      return res.status(400).json({
        status: "fail",
        message: "Thời gian không hợp lệ",
      });
    }

    const startTime = new Date(timeRange[0]);
    const endTime = new Date(timeRange[1]);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return res.status(400).json({
        status: "fail",
        message: "Định dạng thời gian không hợp lệ",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        status: "fail",
        message: "Thời gian kết thúc phải sau thời gian bắt đầu",
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
    console.log("Current user:", currentUser);

    const organization = await Organization.findOne({
      _id: currentUser.organizationId,
    });

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy thông tin tổ chức",
      });
    }

    console.log("Organization found:", organization);

    // Check organization service package
    const checkServicePackageOrganization = await Organization.findOne({
      _id: organization._id,
    }).populate("levelId");

    console.log("Organization with level:", checkServicePackageOrganization);

    if (
      !checkServicePackageOrganization ||
      !checkServicePackageOrganization.levelId
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Không tìm thấy thông tin gói dịch vụ của tổ chức",
      });
    }

    const numberOfEvent = await Event.find({
      organizationId: organization._id,
    });
    const numberOfEventConvert = numberOfEvent.length;

    console.log("Current number of events:", numberOfEventConvert);

    if (
      checkServicePackageOrganization.levelId.name === "basic" &&
      numberOfEventConvert > 1
    ) {
      return res.status(400).json({
        status: "fail",
        message: `Tổ chức đã đạt giới hạn số lượng sự kiện (${checkServicePackageOrganization.levelId.maxPost}). Vui lòng nâng cấp gói dịch vụ để tạo thêm sự kiện.`,
      });
    }

    // Check if staff is available during the time range
    const existingEvent = await Event.findOne({
      assignChecker: staffId,
      status: "hiring",
      $or: [
        {
          startAt: { $lte: endTime },
          endAt: { $gte: startTime },
        },
      ],
    });

    if (existingEvent) {
      return res.status(400).json({
        status: "fail",
        message:
          "Nhân viên đã được phân công cho sự kiện khác trong khoảng thời gian này",
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

    // Check if the staffId is valid and update status
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

    console.log("Staff found and updated:", staff);

    // Tạo event mới
    const newEvent = await Event.create({
      title,
      description,
      category,
      skillNeeds: skills,
      assignChecker: new mongoose.Types.ObjectId(staffId),
      startAt: startTime,
      endAt: endTime,
      organizationId: organization._id,
      location: locationData,
      maxParticipants: maxParticipants || 0,
      formData: processedFormData,
      status: "hiring",
      adminStatus: "pending",
    });

    console.log("New event created successfully:", newEvent);

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
// Import file excel hoặc là file 
// Đọc file
// Lấy tên 
// Tạo mail
exports.createStaffList = asyncHandler(async (req, res) => {})

exports.getOrganizationById = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  console.log('---- THÔNG TIN TỔ CHỨC ----');
  console.log(`Param organizationId: ${JSON.stringify(currentUser)}`);

  try {
    const organizationId = currentUser.organizationId;

    console.log(`Organization ID: ${organizationId}`);

    if (!organizationId) {
      return res.status(400).json({
        status: "fail",
        message: "Người dùng chưa thuộc tổ chức nào",
      });
    }

    const organization = await Organization.findById(organizationId)
      .populate("userId", "fullname email avatar")
      .populate("levelId", "name description maxPost")
      .lean();

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy tổ chức",
      });
    }

    console.log(`Dữ liệu organization ${organization.name}`, JSON.stringify(organization));

    return res.status(200).json({
      status: "success",
      data: organization,
    });

  } catch (error) {
    console.error("Error fetching organization:", error.message, error.stack);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy thông tin tổ chức: " + error.message,
    });
  }
});
