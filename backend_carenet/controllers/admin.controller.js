const User = require("../models/user.model");
const EventRegistration = require("../models/eventRegistration.model");
const Organization = require("../models/organization.model");
const HistoryEvent = require("../models/historyEvent.model");
const MonthlyPayment = require("../models/monthlyPayment.model");
const Event = require("../models/event.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.approveOrganizationRegister = asyncHandler(async (req, res) => {
  const { organizationId } = req.body;

  const organization = await Organization.findById(organizationId);

  if (!organization) {
    return res.status(404).json({
      status: "fail",
      message: "Tổ chức không tồn tại",
    });
  }

  await Organization.findByIdAndUpdate(organizationId, {
    $set: {
      adminStatus: "approved",
      organizationStatus: "active",
    },
  });

  await User.findOneAndUpdate(
    {
      organizationId: organization._id,
      role: 'volunteer'
    },
    {
      $set: {role: 'organization'}
    }
  )

  res.status(200).json({
    status: "success",
    message: "Phê duyệt tổ chức thành công",
  });

  try {
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Phê duyệt yêu cầu hủy tham gia thất bại",
    });
  }
});

exports.rejectOrganizationRegister = asyncHandler(async (req, res) => {
  const { organizationId, rejectReason } = req.body;

  try {
    const organization = await Organization.findById(organizationId);

    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Tổ chức không tồn tại",
      });
    }

    await Organization.findByIdAndUpdate(organizationId, {
      $set: {
        adminStatus: "rejected",
        rejectReason: rejectReason || null,
      },
    });


    await Event.findOneAndUpdate(
      {organizationId: organizationId},
      {$set: {status: 'cancelled'}}
    )

    // Gửi mail tới tổ chức

    return res.status(200).json({
      status: "success",
      message: "Từ chối tổ chức thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Từ chối tổ chức thất bại",
    });
  }
});

exports.approveEventRegister = asyncHandler(async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Sự kiện không tồn tại",
      });
    }

    await Event.findByIdAndUpdate(eventId, {
      $set: {
        adminStatus: "approved",
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Phê duyệt sự kiện thành công",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Phê duyệt sự kiện thất bại",
    });
  }
});

exports.rejectEventRegister = asyncHandler(async (req, res) => {
  const { eventId, rejectReason } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Sự kiện không tồn tại",
      });
    }

    await Event.findByIdAndUpdate(eventId, {
      $set: {
        adminStatus: "rejected",
        rejectReason: rejectReason || null,
      },
    });

    // Gửi mail đến tổ chức


    return res.status(200).json({
      status: "success",
      message: "Từ chối sự kiện thành công",
    });

  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Từ chối sự kiện thất bại",
    });
  }

});

exports.getPendingOrganization = asyncHandler(async (req, res) => {
  try {
    const pendingOrganizations = await Organization.find({
      adminStatus: "pending",
      organizationStatus: "inactive",
    });
    res.status(200).json({
      status: "success",
      organizations: pendingOrganizations,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lấy danh sách tổ chức đang chờ duyệt thất bại",
    });
  }
});

exports.getPendingEvent = asyncHandler(async (req, res) => {
  try {
    const pendingEvents = await Event.find({ adminStatus: "pending" });
    res.status(200).json({
      status: "success",
      events: pendingEvents,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lấy danh sách sự kiện đang chờ duyệt thất bại",
    });
  }
});

exports.getAllAccounts = asyncHandler(async (req, res) => {
  try {
    
    const organizationList = await Organization.find();

    const userList = await User.find();

    const eventList = await Event.find();

    res.status(200).json({
      status: "success",
      users: userList,
      organizations: organizationList,
      events: eventList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lấy danh sách tài khoản thất bại",
    });
  }
});

exports.refundMoney = asyncHandler(async (req, res) => {
  const {
    organizationId,
    month,
    year,
  } = req.body;

  try {
    
    const currentMonthlyPayments = await MonthlyPayment.findOne({
      organization: organizationId,
      month: month,
      year: year,
      status: 'NOT PAID',
    }).populate("organization");

    if (!currentMonthlyPayments) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu thanh toán từ người dùng",
      });
    }

    // Update the monthly payment status to 'PAID'
    await MonthlyPayment.findByIdAndUpdate(currentMonthlyPayments._id, {
      $set: { status: 'PAID' },
    });

    // Gửi hóa đơn hoàn tiên



    return res.status(200).json({
      status: "success",
      message: "Hoàn tiền thành công",
      currentMonthlyPayments: currentMonthlyPayments,
    });

  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Hoàn tiền thất bại",
    });
  }
});
