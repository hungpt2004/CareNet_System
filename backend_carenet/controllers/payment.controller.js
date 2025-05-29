require("dotenv").config();
const PayOs = require("@payos/node");
const asyncHandler = require("../middleware/asyncHandler");
const Organization = require("../models/organization.model");
const CertificatePurchase = require("../models/certificatePurchase.model");
const OrganizationSubscription = require("../models/organizationSubscription.model");
const OrganizationLevel = require("../models/organizationLevel.model");
const Certificate = require("../models/certificate.model");
const User = require("../models/user.model");
const Event = require("../models/event.model");

//Create object pay os
const payOs = new PayOs(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

exports.createPaymentLink = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  const { certificateId } = req.body;

  console.log("Backend: Certificate ID khi thanh toán:", certificateId);
  console.log("Backend: User thanh toán:", currentUser);

  const certificate = await Certificate.findById(certificateId);
  if (!certificate) {
    return res.status(404).json({ message: "Chứng chỉ không tồn tại" });
  }

  const event = await Event.findById(certificate.eventId);
  if (!event) {
    return res.status(404).json({ message: "Sự kiện không tồn tại" });
  }

  const order = {
    orderCode: Math.floor(Math.random() * 1000000), // Random number between 0-999999
    amount: 30000,
    currency: "VND",
    items: [
      {
        name: `Chứng chỉ sự kiện: ${event.title}`,
        price: 30000,
        quantity: 1,
      },
    ],
    buyerName: currentUser.fullname || "Khách hàng",
    buyerEmail: currentUser.email || "customer@example.com",
    buyerPhone: currentUser.phone || "0123456789",
    returnUrl: `${process.env.FRONTEND_URL}/payment-success/${certificateId}`,
    cancelUrl: `${process.env.FRONTEND_URL}/payment-cancel/${certificateId}`,
    description: "Thanh toán chứng chỉ", // Max 25 characters
    expiredAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
  };

  console.log("Order:", order);

  try {
    const paymentLink = await payOs.createPaymentLink(order);
    console.log("Payment Link Response:", paymentLink);

    const certificatePurchase = new CertificatePurchase({
      userId: currentUser._id,
      certificateId: certificate._id,
      eventId: certificate.eventId,
      amount: order.amount,
      paymentMethod: "ONLINE",
      paymentStatus: "notpaid",
      paidAt: null,
      createdAt: new Date(),
    });

    await certificatePurchase.save();

    return res.status(200).json({
      status: "success",
      checkoutUrl: paymentLink.checkoutUrl,
      certificatePurchase: certificatePurchase,
    });
  } catch (error) {
    console.error("Payment link creation error:", error);
    return res.status(500).json({
      status: "error",
      message: "Không thể tạo liên kết thanh toán",
      error: error.message,
    });
  }
});

exports.successPayment = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  const { certificateId } = req.body;

  const certificate = await Certificate.findById(certificateId);
  if (!certificate) {
    return res.status(404).json({ message: "Chứng chỉ không tồn tại" });
  }

  const certificatePurchase = await CertificatePurchase.findOneAndUpdate(
    {
      certificateId: certificateId,
      userId: currentUser._id,
      paymentStatus: "notpaid",
    },
    {
      $set: {
        paymentStatus: "paid",
        paidAt: new Date(),
      },
    },
    { new: true }
  );

  if (!certificatePurchase) {
    return res.status(404).json({ message: "Không tìm thấy đơn thanh toán" });
  }

  res.status(200).json({
    status: "success",
    message: "Thanh toán thành công cho chứng chỉ",
    certificatePurchase: certificatePurchase,
    certificate: certificate,
  });
});

exports.cancelPayment = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  const { certificateId } = req.body;

  const certificatePurchase = await CertificatePurchase.findOne({
    certificateId: certificateId,
    userId: currentUser._id,
    paymentStatus: "notpaid",
  });

  if (!certificatePurchase) {
    return res.status(404).json({ message: "Đơn hàng không tồn tại" });
  }

  await CertificatePurchase.findByIdAndDelete(certificatePurchase._id);

  res.status(200).json({
    status: "success",
    message: "Hủy thanh toán thành công",
  });
});

exports.createPaymentLinkForOrganization = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  try {

    const order = {
      orderCode: Math.floor(Math.random() * 1000000), // Random number between 0-999999
      amount: 499000,
      currency: "VND",
      items: [
        {
          name: `Gói dịch vụ PRO của CareNet (1 tháng)`,
          price: 499000,
          quantity: 1,
        },
      ],
      buyerName: currentUser.fullname || "Khách hàng",
      buyerEmail: currentUser.email || "customer@example.com",
      buyerPhone: currentUser.phone || "0123456789",
      returnUrl: `${process.env.FRONTEND_URL}/payment-success/${certificateId}`,
      cancelUrl: `${process.env.FRONTEND_URL}/payment-cancel/${certificateId}`,
      description: "Thanh toán gói dịch vụ", // Max 25 characters
      expiredAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
    };

    const paymentLink = await payOs.createPaymentLink(order);

    const organizationLevel = await OrganizationLevel.findOne({
      name: "premium", // Assuming 'pro' is the ID for the PRO level
    });

    // Tạo org subscription
    const organizationSubscription = new OrganizationSubscription({
      organizationId: currentUser.organizationId,
      levelId: organizationLevel._id, // Use the ID from the found organization level
      price: order.amount,
      subscribedAt: new Date(),
      expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: "not paid",
    });

    await organizationSubscription.save();

    return res.status(200).json({
      status: "success",
      checkoutUrl: paymentLink.checkoutUrl,
      organizationSubscription: organizationSubscription,
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Không thể tạo liên kết thanh toán cho tổ chức",
    });
  }
});
