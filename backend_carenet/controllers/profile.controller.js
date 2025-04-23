const User = require("../models/user.model");
const { avatarUpload } = require("../middleware/uploadMiddleware");
const HistoryEvent = require("../models/historyEvent.model");
const Feedback = require("../models/feedback.model");

// backend for profile-information
exports.editProfile = async (req, res) => {
  
  const user = req.user.user;
  const userId = user._id;
  const { fullname, dob, phone, address, gender } = req.body;

  // Kiểm tra xem có thay đổi thông tin gì không
  if (!fullname && !dob && !phone && !address && !gender) {
    return res
      .status(400)
      .json({ error: true, message: "Không có thay đổi nào được cung cấp." });
  }

  try {
    // Cập nhật thông tin người dùng
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, _id: user._id }, // Chỉ cho phép người dùng cập nhật chính mình
      {
        $set: {
          fullname: fullname,
          dob: dob,
          phone: phone,
          gender: gender,
          "address.country": address.country, // Cập nhật country trong address
        },
      },
      { new: true }
    );

    // Nếu không tìm thấy người dùng
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
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Cập nhật hồ sơ thất bại" });
  }
};

// backend for profile-avatar
exports.uploadAvatar = [
  avatarUpload.single("avatar"), // "avatar" is the field name in the request
  async (req, res) => {
    const user = req.user.user;
    const userId = user._id; 

    if (!req.file) {
      return res.status(400).json({ error: true, message: "No file uploaded" });
    }

    try {
      // Save the uploaded avatar URL in the database
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId, _id: user._id }, // Ensure the user can only update their own avatar
        { $set: { avatarUrl: req.file.path } }, // Save the Cloudinary URL
        { new: true } // Return the updated user
      );

      // If user is not found
      if (!updatedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }

      // Return the updated user with the new avatarUrl
      return res.status(200).json({
        error: false,
        user: updatedUser,
        message: "Avatar uploaded successfully.",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to upload avatar" });
    }
  },
];

//backend for profile-history
exports.sendFeedbackHistoryEvents = async (req, res) => {
  const user = req.user.user;
  const userId = user._id;
  const eventId = req.params.eventId; // Getting the eventId from route parameters
  
  const { rating, content } = req.body;


  try {
    if (userId !== user._id.toString()) {
      return res.status(403).json({ error: true, message: "Unauthorized." });
    }

    // Check if the user has completed or finished the event
    const history = await HistoryEvent.findOne({
      user: user._id,
      event: eventId,
      status: { $in: ["completed", "finished"] }, // allow both statuses
    });

    if (!history) {
      return res.status(400).json({
        error: true,
        message: "You are not eligible to send feedback for this event.",
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
    if (history.status === "completed") {
      history.status = "finished";
      await history.save();
    }

    return res.status(200).json({
      error: false,
      feedback,
      message: "Feedback submitted successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "Failed to submit or update feedback.",
    });
  }
};