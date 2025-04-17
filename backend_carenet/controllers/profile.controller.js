const User = require("../models/user.model");
const {avatarUpload}=require("../middleware/uploadMiddleware")

exports.editProfile = async (req, res) => {
  const userId = req.params.userId;
  const user = req.user.user;
  const { fullname, dob, phone, address, gender } = req.body;

  // Kiểm tra xem có thay đổi thông tin gì không
  if (!fullname  && !dob && !phone && !address && !gender) {
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
          "address.fullAddress": address.fullAddress, // Cập nhật fullAddress trong address
        },
      },
      { new: true }
    );

    // Nếu không tìm thấy người dùng
    if (!updatedUser) {
      return res.status(404).json({ error: true, message: "Người dùng không tìm thấy" });
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

exports.getProfile = async (req, res) => {
  const userId = req.params.userId;
  const user = req.user.user;

  try {
    // Tìm người dùng trong cơ sở dữ liệu bằng userId
    const foundUser = await User.findOne({ _id: userId, _id: user._id }).select(
      "fullname cccdNumber dob phone gender email address.fullAddress"
    );

    // Nếu không tìm thấy người dùng
    if (!foundUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Trả về thông tin người dùng
    return res.status(200).json({
      error: false,
      user: foundUser,
      message: "Profile retrieved successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Failed to retrieve profile" });
  }
};

// Middleware for avatar upload
exports.uploadAvatar = [
  avatarUpload.single("avatar"), // "avatar" is the field name in the request
  async (req, res) => {
    const userId = req.params.userId;
    const user = req.user.user; // Get the authenticated user

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
      return res.status(500).json({ error: true, message: "Failed to upload avatar" });
    }
  },
];

exports.viewAvatar = async (req, res) => {
  const userId = req.params.userId;
  const user = req.user.user; // Get the authenticated user

  try {
    // Find the user and retrieve the avatarUrl
    const foundUser = await User.findOne({ _id: userId, _id: user._id }).select(
      "avatarUrl"
    );

    // If user is not found
    if (!foundUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Return the avatar URL
    return res.status(200).json({
      error: false,
      avatarUrl: foundUser.avatarUrl,
      message: "Avatar retrieved successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Failed to retrieve avatar" });
  }
};