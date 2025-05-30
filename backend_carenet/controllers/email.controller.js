const emailTransporter = require("../services/transporterEmail");
const { 
   VERIFICATION_EMAIL_TEMPLATE, 
   SUCCESS_REGISTER_TEMPLATE, 
   APPROVE_REGISTER_TEMPLATE, 
   THANK_YOU_TEMPLATE, 
   REJECT_REGISTER_TEMPLATE 
} = require("../mail_templates/emailTemplates");
const { formatDateVN } = require("../utils/formatDateVN");
require('dotenv').config();

exports.sendVerificationLink = async (
   verificationLink,
   email
 ) => {
   try {
     await emailTransporter.sendMail({
       from: `Hệ thống Carenet`,
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

exports.sendSuccessRegisterEvent = async (
   userName,
   email,
   eventName,
   eventStartAt,
   eventEndAt,
   eventLocation,
   eventDetailsLink
) => {  
   try {
      await emailTransporter.sendMail({
         from: 'Hệ thống Carenet',
         to: email,
         subject: "Xác nhận ghi danh sự kiện",
         html: SUCCESS_REGISTER_TEMPLATE
         .replace("{userName}", userName)
         .replace("{eventName}", eventName)
         .replace("{eventStartAt}", formatDateVN(eventStartAt))
         .replace("{eventEndAt}", formatDateVN(eventEndAt))
         .replace("{eventLocation}", eventLocation)
         .replace("{eventDetailsLink}", eventDetailsLink)
         .replace("{currentYear}", new Date().getFullYear())
      });
      console.log("Đã gửi email cảm ơn")
   } catch (error) {
      console.log(error)
   }
};

exports.sendApproveRequest = async (   
   userName,
   email,
   eventName,
   eventStartAt,
   eventEndAt, 
   eventLocation,
) => {
   try {
      await emailTransporter.sendMail({
         from: 'Hệ thống Carenet',
         to: email,
         subject: "Xác nhận tham gia sự kiện",
         html: APPROVE_REGISTER_TEMPLATE
         .replace("{userName}", userName)
         .replace("{eventName}", eventName)
         .replace("{eventStartAt}", formatDateVN(eventStartAt))
         .replace("{eventEndAt}", formatDateVN(eventEndAt))
         .replace("{eventLocation}", eventLocation)
         .replace("{currentYear}", new Date().getFullYear())
      });
      console.log("Đã gửi email duyệt yêu cầu thành công");
   } catch (error) {
      console.log(error)
   }
}

exports.sendThankYouMail = async (
   userName,
   email,
   eventName,
   eventStartAt,
   eventEndAt,
   eventLocation,
   participants,
   organizationName,
) => {
   try {
      await emailTransporter.sendMail({
         from: 'Hệ thống Carenet',
         to: email,
         subject: "Cảm ơn bạn đã tham gia sự kiện",
         html: THANK_YOU_TEMPLATE
         .replace("{userName}", userName)
         .replace("{eventName}", eventName)
         .replace("{organizationName}", organizationName)
         .replace("{eventStartAt}", formatDateVN(eventStartAt))
         .replace("{eventEndAt}", formatDateVN(eventEndAt))
         .replace("{location}", eventLocation)
         .replace("{participants}", participants)
         .replace("{currentYear}", new Date().getFullYear())
      })
   } catch (error) {
      console.log(error)
   }
}

exports.sendRejectRequest = async (
   userName,
   email,
   eventName,
   eventStartAt,
   eventEndAt,
   eventLocation,
   rejectionReason,
   eventsLink
) => {
   try { 
      await emailTransporter.sendMail({
         from: 'Hệ thống Carenet',
         to: email,
         subject: "Thông báo từ chối tham gia sự kiện",
         html: REJECT_REGISTER_TEMPLATE
         .replace("{userName}", userName)
         .replace("{eventName}", eventName)
         .replace("{eventStartAt}", formatDateVN(eventStartAt))
         .replace("{eventEndAt}", formatDateVN(eventEndAt))
         .replace("{eventLocation}", eventLocation)
         .replace("{rejectionReason}", rejectionReason)
         .replace("{eventsLink}", eventsLink)
      })
   } catch (error) {
      console.log(error)
   }
}
