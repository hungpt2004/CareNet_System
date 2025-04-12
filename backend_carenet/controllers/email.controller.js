const emailTransporter = require("../services/transporterEmail");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../middleware/asyncHandler");
const { VERIFICATION_EMAIL_TEMPLATE } = require("../mail_templates/emailTemplates");
require('dotenv').config();

exports.sendVerificationLink = async (
   verificationLink,
   email
 ) => {
   try {
     await emailTransporter.sendMail({
       from: process.env.EMAIL_USERNAME,
       to: email,
       subject: "Xác thực tài khoản",
       html: VERIFICATION_EMAIL_TEMPLATE
         .replace("{verificationLink}", verificationLink)
         .replace("{currentYear}", new Date().getFullYear())
     });
      console.log("Đã gửi email")
   } catch (error) {
      console.log(error)
   }
};

exports.sendRequestForgotPassword = async () => {
   
}