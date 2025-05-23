const User = require("../models/user.model");
const HistoryEvent = require("../models/historyEvent.model");
const EventRegistration = require("../models/eventRegistration.model");
const Feedback = require('../models/feedback.model');
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

exports.requestCancelEvent = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;
  const { eventId, cancelReason } = req.body;
  
  try {
    const eventRegistration = await EventRegistration.findOne({
      user: currentUser._id,
      event: eventId,
    });

    const historyEvent = await HistoryEvent.findOne({
      event: eventId,
      user: currentUser._id,
    });

    if(!historyEvent) {
      return res.status(500).json({
        status: "fail",
        message: "Bạn chưa tham gia sự kiện này",
      });
    }

    await HistoryEvent.findOneAndUpdate(
      { _id: historyEvent._id },
      { $set: { status: "pending" } },
      { new: true }
    );

    // Thêm cancel reason vào event registration
    await EventRegistration.findOneAndUpdate(
      { _id: eventRegistration._id },
      { $set: { cancelReason: cancelReason, status: "pendingCancel" } },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Yêu cầu hủy tham gia đã được gửi",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Yêu cầu hủy tham gia thất bại",
    });
  }
});

exports.getMyFeedback = asyncHandler(async (req, res) => {

  const currentUser = req.user.user;

  const feedbacks = await Feedback.find({userId: currentUser._id})

  if(!feedbacks) {
    return res.status(200).json({
      status: 'true',
      message: 'Đang không có feedback nào',
      feedbacks: []
    })
  }

  return res.status(200).json({
    status: 'success',
    message: 'Lấy feedback thành công',
    feedback: feedbacks
  })

});

exports.getUserFollowRole = asyncHandler(async (req, res) => {

  const {role} = req.params

});
