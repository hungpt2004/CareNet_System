const Certificate = require("../models/certificate.model");
const asyncHandler = require("../middleware/asyncHandler");
const CertifcatePurchase = require("../models/certificatePurchase.model");
const { generateCertificateHTML } = require("../utils/generateCertificateForm");
const Event = require("../models/event.model");
const Organization = require("../models/organization.model");
const User = require("../models/user.model");
const { generateSignature } = require("../utils/generateSignatureCert");
const { cloudinary } = require("../services/uploadCloundinary");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");

// Hàm chuyển đổi HTML thành ảnh PNG
const convertHTMLToPNG = async (html) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html);

  // Thiết lập kích thước viewport phù hợp với chứng chỉ
  await page.setViewport({
    width: 900,
    height: 650,
    deviceScaleFactor: 2, // Tăng độ phân giải
  });

  // Chụp ảnh toàn bộ trang
  const screenshot = await page.screenshot({
    type: "png",
    fullPage: true,
    omitBackground: false,
  });

  await browser.close();
  return screenshot;
};

// Hàm upload ảnh lên Cloudinary
const uploadImageToCloudinary = async (imageBuffer, certificateId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "certificates",
          public_id: `certificate_${certificateId}`,
          format: "png",
          // Cấu hình cho ảnh
          quality: "auto",
          fetch_format: "png",
          // Tùy chọn bảo mật
          type: "upload",
          access_mode: "public",
          // Tùy chọn file
          use_filename: false,
          unique_filename: false,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(imageBuffer);
  });
};

exports.createCertificate = asyncHandler(async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !req.body.eventId) {
      return res.status(400).json({
        status: "fail",
        message: "Thiếu thông tin sự kiện",
      });
    }

    const currentUser = req.user.user;
    const { eventId } = req.body;

    // Validate eventId format
    if (typeof eventId !== "string" || eventId.length !== 24) {
      return res.status(400).json({
        status: "fail",
        message: "ID sự kiện không hợp lệ",
      });
    }

    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sự kiện",
      });
    }

    const organization = await Organization.findOne({
      _id: event.organizationId,
    });
    if (!organization) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy tổ chức",
      });
    }

    const certifcatePurchase = await CertifcatePurchase.findOne({
      eventId: eventId,
      userId: currentUser._id,
    });
    if (certifcatePurchase) {
      return res.status(400).json({
        status: "fail",
        message: "Đã mua chứng chỉ trước đó",
      });
    }

    const eventDurationInMs = event.endAt - event.startAt;
    const eventDurationInHours = eventDurationInMs / (1000 * 60 * 60);

    // Tạo chứng chỉ mới
    const newCertificate = new Certificate({
      userId: currentUser._id,
      eventId: eventId,
      fullName: currentUser.fullname,
      email: currentUser.email,
      eventName: event.title,
      organizationName: organization.name,
      completionDate: new Date(),
      duration: eventDurationInHours,
      organizationId: organization._id,
      signature: generateSignature(organization.name, event.title),
      price: 30000,
      certificateUrl: "",
    });

    await newCertificate.save();

    const fullAdress = `${event.location.street}, ${event.location.ward}, ${event.location.district}, ${event.location.city}`;

    // Tạo URL tạm thời cho chứng chỉ
    const tempCertificateLink = `${process.env.FRONTEND_URL}/certificate/${newCertificate._id}`;

    // Tạo HTML chứng chỉ với URL tạm thời
    const certificateHTML = await generateCertificateHTML(
      currentUser,
      event,
      organization,
      tempCertificateLink,
      fullAdress
    );

    // Chuyển HTML thành ảnh PNG
    const imageBuffer = await convertHTMLToPNG(certificateHTML);

    // Upload ảnh lên Cloudinary
    const uploadResult = await uploadImageToCloudinary(
      imageBuffer,
      newCertificate._id
    );

    // Cập nhật URL chứng chỉ với link Cloudinary
    await Certificate.findByIdAndUpdate(newCertificate._id, {
      certificateUrl: uploadResult.secure_url,
    });

    return res.status(200).json({
      status: "success",
      message: "Tạo chứng chỉ thành công",
      currentCertificate: newCertificate,
      certificate: {
        ...newCertificate.toObject(),
        certificateUrl: uploadResult.secure_url,
        certificateLink: tempCertificateLink,
      },
    });
  } catch (error) {
    console.error("Error creating certificate:", error);

    // Handle specific error types
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: "Dữ liệu không hợp lệ: " + error.message,
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "fail",
        message: "Token không hợp lệ",
      });
    }

    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi tạo chứng chỉ: " + error.message,
    });
  }
});

exports.getCertificate = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  try {
    const { eventId } = req.params;

    console.log(eventId);
    console.log(currentUser._id);

    const certificate = await Certificate.findOne({
      eventId: eventId,
      userId: currentUser._id,
    });

    if (!certificate) {
      return res.status(200).json({
        status: "fail",
        message: "Chứng chỉ không tồn tại",
      });
    }

    const certifcatePurchase = await CertifcatePurchase.findOne({
      certificateId: certificate._id,
      userId: currentUser._id,
      paymentStatus: "paid",
    });


    if (!certifcatePurchase) {
      return res.status(200).json({
        status: "fail",
        message: "Chứng chỉ không tồn tại",
      });
    }

    return res.status(200).json({
      status: "success",
      certificate: certificate,
      certifcatePurchase: certifcatePurchase,
    });
  } catch (error) {
    console.error("Error getting certificate:", error);
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy chứng chỉ: " + error.message,
    });
  }
});
