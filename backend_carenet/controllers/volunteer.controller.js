const User = require("../models/user.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.createHobbies = asyncHandler(async (req, res) => {
  let formData = req.body.formData;

  console.log(`Du lieu : ${formData}`);

  if (!formData) {
    return res.status(500).json({
      status: "fail",
      message: "Dữ liệu trống !",
    });
  }

  // Nếu formData là chuỗi, tách nó thành mảng
  if (typeof formData === "string") {
    formData = formData.split(",").map((hobby) => hobby.trim()); // Tách và loại bỏ khoảng trắng thừa
  }

  console.log(formData);

  const currentUser = req.user.user;

  console.log(currentUser._id);

  try {
    const semiUpdatedUser = await User.findOne({
      _id: currentUser._id,
    });

    // Kiểm tra xem sở thích đã tồn tại hay chưa
    const existedHobby = formData.find((hobby) =>
      semiUpdatedUser.hobbies.includes(hobby)
    );

    if (existedHobby) {
      return res.status(500).json({
        status: "fail",
        message: `Sở thích '${existedHobby}' đã tồn tại`,
      });
    }

    // Cập nhật sở thích vào người dùng
    const updatedUser = await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $push: { hobbies: { $each: formData } } },
      { new: true }
    );

    return res.status(201).json({
      status: "success",
      message: "Đã thêm vào sở thích",
      userHobbies: updatedUser.hobbies,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Thêm vào sở thích không thành công",
    });
  }
});
