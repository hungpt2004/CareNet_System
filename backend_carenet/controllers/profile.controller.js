const User = require("../models/user.model");
const { avatarUpload } = require("../middleware/uploadMiddleware");
const HistoryEvent = require("../models/historyEvent.model");
const Feedback = require("../models/feedback.model");
const asyncHandler = require("../middleware/asyncHandler");
const checkWordByGemini = require("../services/geminiCheckInstance");

// backend for profile-information
exports.editProfile = asyncHandler(async (req, res) => {
  const user = req.user.user;
  const userId = user._id;
  const { fullname, dob, phone, address, gender } = req.body;

  // Kiểm tra xem có thay đổi thông tin gì không
  if (!fullname && !dob && !phone && !address && !gender) {
    return res
      .status(400)
      .json({ error: true, message: "Không có thay đổi nào được cung cấp." });
  }

  // Cập nhật thông tin người dùng
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId }, // Không cần `_id: user._id` 2 lần
    {
      $set: {
        fullname: fullname,
        dob: dob,
        phone: phone,
        gender: gender,
        "address.country": address?.country, // dùng optional chaining để tránh lỗi nếu address là undefined
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    return res
      .status(404)
      .json({ error: true, message: "Người dùng không tìm thấy" });
  }

  return res.status(200).json({
    error: false,
    user: updatedUser,
    message: "Hồ sơ đã được cập nhật thành công.",
  });
});

// backend for profile-avatar
exports.uploadAvatar = [
  avatarUpload.single("avatar"), // "avatar" is the field name in the request
  async (req, res) => {
    const user = req.user.user;
    const userId = user._id;

    // Kiểm tra nếu không có file
    if (!req.file) {
      return res.status(400).json({ error: true, message: "No file uploaded" });
    }

    console.log(req.file.path);

    try {
      // Nếu bạn đang sử dụng Cloudinary, thay 'req.file.path' bằng 'req.file.secure_url'
      // Kiểm tra lại đường dẫn Cloudinary URL (secure_url) thay vì 'path' nếu bạn dùng Cloudinary
      const newAvatarurl = req.file.secure_url || req.file.path; // Đảm bảo sử dụng đúng URL từ Cloudinary

      // Cập nhật URL avatar vào cơ sở dữ liệu
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId }, // Đảm bảo người dùng chỉ có thể cập nhật avatar của mình
        { $set: { avatarUrl: newAvatarurl } }, // Lưu URL avatar vào cơ sở dữ liệu
        { new: true } // Trả về đối tượng người dùng mới sau khi cập nhật
      );

      // Nếu không tìm thấy người dùng
      if (!updatedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      console.log("Hit route upload avatar");

      // Trả về thông tin người dùng và thông báo thành công
      return res.status(200).json({
        error: false,
        user: updatedUser, // Trả về thông tin người dùng đã cập nhật
        image: newAvatarurl,
        message: "Ảnh đại diện đã được tải lên thành công.",
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        error: true,
        message: "Tải ảnh đại diện lên không thành công.",
      });
    }
  },
];

exports.getCurrentUserForProfileAvatar = asyncHandler(async (req, res) => {
  const user = req.user.user;
  console.log("Hit route");
  return res.status(200).json({
    status: "success",
    message: "Get current user successfully",
    user: user,
  });
});

//backend for profile-history
exports.getHistoryEventById = asyncHandler(async (req, res) => {
  const id = "67fe2ef4edac0fe2989b88b7";
  const historyEvent = await HistoryEvent.findById(id).populate("event");

  console.log(historyEvent.event.title);
  console.log(historyEvent.event.startAt);
  console.log(historyEvent.status);

  return res.status(200).json({
    status: "success",
    message: "Get history event successfully",
    historyEvent: historyEvent,
  });
});

exports.getAllHistoryEvent = asyncHandler(async (req, res) => {
  const user = req.user.user;
  const historyEvents = await HistoryEvent.find({ user: user._id }).populate("event"); 
  const feedbacks = await Feedback.find({ userId: user._id });
  return res.status(200).json({
    status: "success",
    message: "Get all history event successfully",
    historyEvents: historyEvents,
    feedbacks: feedbacks,
  });
});

exports.sendFeedbackHistoryEvents = asyncHandler(async (req, res) => {
  const user = req.user.user;
  const userId = user._id;
  const eventId = req.params.eventId; // Getting the eventId from route parameters

  const { rating, content } = req.body;

  if (userId !== user._id.toString()) {
    return res.status(403).json({ error: true, message: "Unauthorized." });
  }

  // Check if the user has completed the event
  const history = await HistoryEvent.findOne({
    user: user._id,
    event: eventId,
    status: { $in: ["completed"] },
  });

  if (!history) {
    return res.status(400).json({
      error: true,
      message: "You are not eligible to send feedback for this event.",
    });
  }

  const response = await checkWordByGemini(content);
  if (response) {
    return res.status(500).json({
      status: "fail",
      message: `Word ${content} is not allowed`,
    });
  }

  // Either update existing feedback or create new
  const feedback = await Feedback.findOneAndUpdate(
    { userId: user._id, eventId: eventId },
    {
      rating,
      content,
      createdAt: new Date(),
    },
    { new: true, upsert: true } // create if not exists
  );

  // If history is still "completed", update it to "finished"
  //Fix set status completed to finished
  if (history.status === "completed") {
    await HistoryEvent.findOneAndUpdate(
      { _id: history._id },
      { status: "finished" },
      { new: true }
    );
  }

  return res.status(200).json({
    error: false,
    feedback: feedback,
    message: "Feedback submitted successfully.",
  });
});
// CCCD image upload
const { cccdUpload } = require("../middleware/uploadMiddleware");
// Upload CCCD image(s)
exports.uploadCCCD = [
  cccdUpload.array("cccdImages", 2), // Accept up to 2 images (front/back)
  async (req, res) => {
    const user = req.user.user;
    const userId = user._id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: true, message: "No CCCD images uploaded" });
    }

    // Extract URLs from uploaded files
    const imageUrls = req.files.map(f => f.secure_url || f.path);

    try {
      // Push new images to the cccdImages array
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { cccdImages: { $each: imageUrls } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      return res.status(200).json({
        error: false,
        user: updatedUser,
        cccdImages: updatedUser.cccdImages,
        message: "CCCD images uploaded successfully."
      });
    } catch (err) {
      console.error("Error uploading CCCD images:", err);
      return res.status(500).json({ error: true, message: "Failed to upload CCCD images." });
    }
  }
];
// Remove a CCCD image by URL
exports.removeCCCD = require("../middleware/asyncHandler")(async (req, res) => {
  const user = req.user.user;
  const userId = user._id;
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ error: true, message: "Thiếu đường dẫn ảnh cần xóa." });
  }
  try {
    // Remove the image URL from the user's cccdImages array
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cccdImages: imageUrl } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: true, message: "Không tìm thấy người dùng." });
    }
    return res.status(200).json({
      error: false,
      user: updatedUser,
      cccdImages: updatedUser.cccdImages,
      message: "Đã xóa ảnh CCCD thành công."
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: "Xóa ảnh CCCD thất bại." });
  }
});