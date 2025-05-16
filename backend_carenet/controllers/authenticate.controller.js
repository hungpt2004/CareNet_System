const User = require("../models/user.model");
const asyncHandler = require("../middleware/asyncHandler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { sendVerificationLink } = require("./email.controller");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createJsonToken = async (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

const createVerifyToken = async (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

// Đăng ký
exports.signUpWithUsernamePassword = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, phone, dob } = req.body;

  console.log(req.body)

  if (!fullname || !email || !password || !phone || !dob) {
    return res.status(500).json({
      status: "fail",
      message: "Vui lòng nhập đầy đủ họ tên, email, mật khẩu, ngày sinh và số điện thoại.",
    });
  }

  // Validate dob format
  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime())) {
    return res.status(500).json({
      status: "fail",
      message: "Định dạng ngày sinh không hợp lệ",
    });
  }

  // Kiểm tra email đã tồn tại
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
   return res.status(500).json({
      status: "fail",
      message: "Email đã tồn tại",
    });
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo người dùng mới
  try {
    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      phone: phone,
      dob: dobDate,
      isVerified: false,
    });

    // Lưu user
    await newUser.save();

    // Tạo verify token
    const verificationToken = await createVerifyToken({ newUser });

    // Tạo verification link
    const verificationLink = `${process.env.SERVER_URL}/auth/verify-email?token=${verificationToken}`;

    console.log(verificationLink);

    // Gửi mail
    if (verificationLink) {
      await sendVerificationLink(verificationLink, newUser.email);
    }

    // Gửi response
    return res.status(201).json({
      status: "success",
      message: "Vui lòng kiểm tra email !",
      verificationToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Đăng kí không thành công",
    });
  }
});

// Đăng nhập
exports.signInWithUsernamePassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body)

  if (!email || !password) {
    // Trả về status và message ở front-end thì lấy ra bằng error.response.data.status và .message
    return res.status(500).json({
      status: "fail",
      message: 'Hãy nhập mật khẩu',
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
   //  const currentUser = await User.findOne({email: email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
         status: "fail",
         message: 'Sai tài khoản hoặc mật khẩu',
       });
    }

    const accessToken = await createJsonToken({ user });

    return res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

// Xác thực
exports.verifyAccountByLink = asyncHandler(async (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return next(new AppError("Token không hợp lệ hoặc đã hết hạn", 400));
  }

  try {
    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const currentUser = decodedToken.newUser;

    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $set: { isVerified: true } }
    );

    console.log("Đã verify thành công");

   //  return res.status(200).send("Đã verify thành công");

    // Sau khi xác thực xong thì redirect về trang login
     return res.redirect(`${process.env.CLIENT_URL}/login`); // hoặc bất kỳ route nào bạn muốn
  } catch (err) {
    return next(new AppError("Token đã hết hạn hoặc không hợp lệ", 401));
  }
});

// Yêu cầu quên MK
exports.requestResetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email không tìm thấy ! Vui lòng thử lại", 404));
  }

  try {
    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return next(new AppError("Không tìm thấy người dùng !", 404));
    }

    const requestToken = await createJsonToken(currentUser._id);

    return res.status(200).json({
      status: "success",
      message: "Vui lòng kiểm tra mail !",
    });
  } catch (error) {}
});
