require("dotenv").config();
const PayOs = require("@payos/node");
const asyncHandler = require("../middleware/asyncHandler");
const Organization = require("../models/organization.model");
const CertificatePurchase = require('../models/certificatePurchase.model')
const Certificate = require('../models/certificate.model')

//Create object pay os
const payOs = new PayOs(
   process.env.CLIENT_ID,
   process.env.API_KEY,
   process.env.CHECKSUM_KEY
);

exports.createCertificatePayment = asyncHandler(async (req, res) => {

  const currentUser = req.user.user; 
  const { eventId } = req.body;

  // Kiểm tra sự kiện và người dùng
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Sự kiện không tồn tại" });
  }

  const user = await User.findById(userId);
  if (!user) { 
    return res.status(404).json({ message: "Người dùng không tồn tại" });        
  }

  // Kiểm tra sự kiện đã được thanh toán chưa
  const newCertificatePurchase = await CertificatePurchase.findOne({
    eventId: eventId,
    userId: userId
  });

  if (newCertificatePurchase) {
    return res.status(400).json({ message: "Sự kiện đã được thanh toán" });
  }

  // Tạo đơn hàng
  const order = await payOs.createOrder({
    amount: event.price,
    currency: "VND",
    description: `Thanh toán chứng chỉ sự kiện: ${event.name}`
  });

  // Lưu đơn hàng vào cơ sở dữ liệu
  const certificatePurchase = new CertificatePurchase({
    eventId: eventId,
    userId: userId,
    orderId: order.id,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await certificatePurchase.save(); 

  // Trả về thông tin đơn hàng
  res.status(200).json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    redirectUrl: order.redirectUrl
  });
});

