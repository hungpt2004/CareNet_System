module.exports = {
  // Email verification
  VERIFICATION_EMAIL_TEMPLATE: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xác minh tài khoản CareNet</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 10px;">
    <tr>
      <td>
        <!-- Logo and Header Section -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
          <tr>
            <td align="center" style="padding: 0 0 20px 0;">
              <img src="https://via.placeholder.com/180x60" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
            </td>
          </tr>
        </table>
        
        <!-- Main Content Container -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #118b50 0%, #5db996 100%); padding: 35px 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Xác minh tài khoản</h1>
              <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 16px;">Cùng nhau lan tỏa yêu thương</p>
            </td>
          </tr>
          
          <!-- Email Content -->
          <tr>
            <td style="padding: 40px 50px;">
              <p style="font-size: 17px; margin-top: 0; color: #02301a;">Xin chào,</p>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Cảm ơn bạn đã đăng ký tham gia <span style="font-weight: 600; color: #118b50;">CareNet</span> - nền tảng kết nối dịch vụ thiện nguyện. Chúng tôi rất vui mừng được chào đón bạn vào cộng đồng những người sẵn sàng tạo nên sự thay đổi tích cực!</p>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chỉ còn một bước nữa thôi để hoàn tất quá trình đăng ký:</p>
              
              <!-- Verification Button -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 35px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="background-color: #118b50; border-radius: 8px; box-shadow: 0 4px 12px rgba(17, 139, 80, 0.2);">
                          <a href="{verificationLink}" target="_blank" style="display: inline-block; padding: 16px 36px; color: white; text-decoration: none; font-size: 17px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">Xác minh tài khoản ngay</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Important Notice -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="background-color: #e3f0af30; padding: 20px; border-radius: 8px; border: 1px solid #e3f0af;">
                    <p style="font-size: 15px; color: #02301a; margin: 0; line-height: 1.6;">
                      <span style="font-weight: 600;">Lưu ý:</span> Liên kết này sẽ hết hạn sau 24 giờ vì lý do bảo mật. Nếu bạn không yêu cầu xác minh này, vui lòng bỏ qua email này.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7; margin-bottom: 25px;">Sau khi xác minh, bạn có thể truy cập tài khoản và bắt đầu kết nối với các hoạt động thiện nguyện phù hợp với sở thích và kỹ năng của mình.</p>
              
              <!-- Signature -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="font-size: 16px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                    <p style="font-size: 18px; margin: 0; font-weight: 600; color: #118b50;">Đội ngũ CareNet</p>
                  </td>
                </tr>
              </table>
              
              <!-- Social Icons -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Footer Information -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="font-size: 14px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                    <p style="font-size: 14px; color: #02301a; margin: 0;">&copy; {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `,

  // Email forgot password
  RESET_PASSWORD_TEMPLATE: `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đặt lại mật khẩu CareNet của bạn</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
    <tr>
      <td>
        <!-- Logo and Header Section -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
          <tr>
            <td align="center" style="padding: 0 0 20px 0;">
              <img src="https://via.placeholder.com/180x60" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
            </td>
          </tr>
        </table>
        
        <!-- Main Content Container -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #118b50 0%, #5db996 100%); padding: 35px 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">Đặt lại mật khẩu</h1>
              <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 16px;">Khôi phục quyền truy cập vào tài khoản của bạn</p>
            </td>
          </tr>
          
          <!-- Email Content -->
          <tr>
            <td style="padding: 40px 50px;">
              <p style="font-size: 17px; margin-top: 0; color: #02301a;">Xin chào,</p>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản <span style="font-weight: 600; color: #118b50;">CareNet</span> của bạn. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với đội hỗ trợ của chúng tôi.</p>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Để đặt lại mật khẩu, vui lòng nhấp vào nút bên dưới:</p>
              
              <!-- Reset Password Button -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 35px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="background-color: #118b50; border-radius: 8px; box-shadow: 0 4px 12px rgba(17, 139, 80, 0.2);">
                          <a href="{resetPasswordLink}" target="_blank" style="display: inline-block; padding: 16px 36px; color: white; text-decoration: none; font-size: 17px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">Đặt lại mật khẩu</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Important Notice -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="background-color: #e3f0af30; padding: 20px; border-radius: 8px; border: 1px solid #e3f0af;">
                    <p style="font-size: 15px; color: #02301a; margin: 0; line-height: 1.6;">
                      <span style="font-weight: 600;">Lưu ý quan trọng:</span> Liên kết này chỉ có hiệu lực trong vòng 1 giờ kể từ thời điểm yêu cầu vì lý do bảo mật. Sau khoảng thời gian này, bạn sẽ cần phải yêu cầu đặt lại mật khẩu mới.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7; margin-bottom: 25px;">Sau khi đặt lại mật khẩu thành công, bạn có thể đăng nhập và tiếp tục tham gia các hoạt động thiện nguyện cùng cộng đồng CareNet.</p>
              
              <p style="font-size: 17px; color: #02301a; line-height: 1.7; margin-bottom: 25px;">Nếu bạn gặp bất kỳ khó khăn nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi qua địa chỉ <a href="mailto:support@carenet.org" style="color: #118b50; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
              
              <!-- Signature -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px;">
                <tr>
                  <td>
                    <p style="font-size: 16px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                    <p style="font-size: 18px; margin: 0; font-weight: 600; color: #118b50;">Đội ngũ CareNet</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Security Tips Section -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 30px 50px; border-top: 1px solid #e3e3e3;">
              <p style="font-size: 16px; color: #118b50; margin: 0 0 15px 0; font-weight: 600;">Lời khuyên về bảo mật</p>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #02301a;">
                <li style="margin-bottom: 10px; font-size: 14px;">Không bao giờ chia sẻ mật khẩu của bạn với bất kỳ ai</li>
                <li style="margin-bottom: 10px; font-size: 14px;">Tạo mật khẩu mạnh với ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                <li style="margin-bottom: 10px; font-size: 14px;">Sử dụng mật khẩu khác nhau cho các tài khoản quan trọng</li>
                <li style="margin-bottom: 0; font-size: 14px;">Cân nhắc sử dụng trình quản lý mật khẩu để lưu trữ mật khẩu an toàn</li>
              </ul>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 25px 50px; text-align: center; border-top: 1px solid #e3e3e3;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
              
              <!-- Social Icons -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 20px;">
                <tr>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #118b50; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                        </td>
                      </tr>
              </table>
              
              <p style="font-size: 14px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
              <p style="font-size: 14px; color: #02301a; margin: 0;">&copy; 2025 CareNet. Tất cả các quyền được bảo lưu.</p>
            </td>
          </tr>
        </table>
        
        <!-- App Promotion -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px; text-align: center;">
          <tr>
            <td>
              <p style="font-size: 15px; color: #02301a; margin-bottom: 15px;">Tải ứng dụng CareNet để tham gia hoạt động thiện nguyện mọi lúc, mọi nơi</p>
              <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                <img src="https://via.placeholder.com/120x40" alt="App Store" style="height: 40px; width: auto;">
              </a>
              <a href="#" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                <img src="https://via.placeholder.com/120x40" alt="Google Play" style="height: 40px; width: auto;">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `,

  // Email thank you after finish event
  THANK_YOU_TEMPLATE: `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thư Cảm Ơn</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
      <tr>
        <td>
          <!-- Logo and Header Section -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
              <td align="center" style="padding: 0 0 20px 0;">
                <img src="../../frontend_carenet/public/volunteer_img/Carenet.png" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
              </td>
            </tr>
          </table>
          
          <!-- Main Content Container -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #0A6B3D 0%, #5db996 100%); padding: 35px 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">THƯ CẢM ƠN</h1>
                <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 16px;">Cảm ơn sự đóng góp của bạn</p>
              </td>
            </tr>
            
            <!-- Email Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <p style="font-size: 17px; margin-top: 0; color: #02301a;">Kính gửi <span style="font-weight: 600; color: #0A6B3D;">{userName}</span>,</p>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">CareNet xin chân thành cảm ơn Quý khách đã dành thời gian quý báu tham dự sự kiện của chúng tôi. Sự hiện diện và đóng góp của Quý khách đã góp phần quan trọng vào thành công chung của sự kiện.</p>
                
                <!-- Event Details Box -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; font-weight: 600; color: #0A6B3D; margin: 0 0 10px 0;">Chi tiết sự kiện</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Tên sự kiện:</strong> {eventName}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Ngày bắt đầu:</strong> {eventStartAt}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Ngày kết thúc:</strong> {eventEndAt}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Địa điểm:</strong> {location}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Số người tham gia:</strong> {participants}</p>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">{organizationName} rất vinh dự được đón tiếp Quý khách tại sự kiện này và hy vọng rằng những thông tin được chia sẻ sẽ mang lại giá trị cho Quý khách.</p>
                
                <!-- Special Message Box -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0; background-color: #e3f0af30; padding: 20px; border-radius: 8px; border: 1px solid #e3f0af;">
                  <tr>
                    <td>
                      <p style="font-size: 15px; color: #02301a; margin: 0; line-height: 1.6;">
                        <span style="font-weight: 600;">Lời cảm ơn đặc biệt:</span> Chúng tôi đặc biệt đánh giá cao sự tham gia nhiệt tình và những đóng góp quý báu của Quý khách trong suốt thời gian diễn ra sự kiện. Những ý kiến và câu hỏi sâu sắc của Quý khách đã góp phần làm phong phú thêm nội dung chương trình.
                      </p>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">CareNet tự hào được hợp tác cùng <span style="font-weight: 600; color: #0A6B3D;">{organizationName}</span> trong việc thúc đẩy sức khỏe cộng đồng và nâng cao chất lượng dịch vụ y tế. Chúng tôi hy vọng sẽ tiếp tục nhận được sự ủng hộ và đồng hành của Quý khách trong các hoạt động sắp tới.</p>
                
                <!-- Signature -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px; margin-bottom: 30px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                      <p style="font-size: 18px; margin: 0; font-weight: 600; color: #0A6B3D;">Ngo Nhu Phuong</p>
                      <p style="font-size: 16px; margin: 5px 0 0 0; color: #02301a;">CEO CareNet</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Social Icons -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Footer Information -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="font-size: 14px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                      <p style="font-size: 14px; color: #02301a; margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,

  // Email success register event
  SUCCESS_REGISTER_TEMPLATE: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận đăng ký sự kiện CareNet</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
      <tr>
        <td>
          <!-- Logo and Header Section -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
              <td align="center" style="padding: 0 0 20px 0;">
                <img src="../../frontend_carenet/public/volunteer_img/Carenet.png" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
              </td>
            </tr>
          </table>
          
          <!-- Main Content Container -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #0A6B3D 0%, #5db996 100%); padding: 35px 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">Đăng ký sự kiện thành công</h1>
                <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 16px;">Cảm ơn bạn đã tham gia cùng CareNet!</p>
              </td>
            </tr>
            
            <!-- Email Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <p style="font-size: 17px; margin-top: 0; color: #02301a;">Xin chào {userName},</p>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chúng tôi rất vui mừng thông báo rằng bạn đã ghi danh thành công cho sự kiện trên nền tảng <span style="font-weight: 600; color: #0A6B3D;">CareNet</span>. Vui lòng đợi kết quả từ Tổ Chức nhé ^^!</p>
                
                <!-- Event Details -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; font-weight: 600; color: #0A6B3D; margin: 0 0 10px 0;">Chi tiết sự kiện</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Tên sự kiện:</strong> {eventName}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Thời gian bắt đầu:</strong> {eventStartAt}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Thời gian kết thúc:</strong> {eventEndAt}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Địa điểm:</strong> {eventLocation}</p>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Vui lòng kiểm tra thông tin sự kiện và đảm bảo bạn có mặt đúng giờ. Nếu có bất kỳ câu hỏi nào, bạn có thể liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #0A6B3D; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
                
                <!-- Action Button -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 35px 0;">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="background-color: #0A6B3D; border-radius: 8px; box-shadow: 0 4px 12px rgba(10, 107, 61, 0.2);">
                            <a href="{eventDetailsLink}" target="_blank" style="display: inline-block; padding: 16px 36px; color: white; text-decoration: none; font-size: 17px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">Xem chi tiết sự kiện</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Important Notice -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                  <tr>
                    <td style="background-color: #e3f0af30; padding: 20px; border-radius: 8px; border: 1px solid #e3f0af;">
                      <p style="font-size: 15px; color: #02301a; margin: 0; line-height: 1.6;">
                        <span style="font-weight: 600;">Lưu ý:</span> Vui lòng lưu email này để theo dõi thông tin sự kiện. Nếu bạn không đăng ký sự kiện này, vui lòng liên hệ ngay với chúng tôi.
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!-- Signature -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px; margin-bottom: 30px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                      <p style="font-size: 18px; margin: 0; font-weight: 600; color: #0A6B3D;">Đội ngũ CareNet</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Social Icons -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Footer Information -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="font-size: 14px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                      <p style="font-size: 14px; color: #02301a; margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,

  // Email reject register
  REJECT_REGISTER_TEMPLATE: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông báo từ chối đăng ký sự kiện CareNet</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
      <tr>
        <td>
          <!-- Logo and Header Section -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
              <td align="center" style="padding: 0 0 20px 0;">
                <img src="https://via.placeholder.com/180x60" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
              </td>
            </tr>
          </table>
          
          <!-- Main Content Container -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #0A6B3D 0%, #5db996 100%); padding: 35px 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">Thông báo từ chối đăng ký</h1>
                <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 16px;">Cảm ơn bạn đã quan tâm đến CareNet</p>
              </td>
            </tr>
            
            <!-- Email Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <p style="font-size: 17px; margin-top: 0; color: #02301a;">Xin chào {userName},</p>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chúng tôi rất trân trọng sự quan tâm của bạn đối với sự kiện <span style="font-weight: 600; color: #0A6B3D;">{eventName}</span> trên nền tảng <span style="font-weight: 600; color: #0A6B3D;">CareNet</span>. Tuy nhiên, chúng tôi rất tiếc phải thông báo rằng đăng ký của bạn không được chấp thuận.</p>
                
                <!-- Rejection Reason -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; font-weight: 600; color: #0A6B3D; margin: 0 0 10px 0;">Lý do từ chối</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;">{rejectionReason}</p>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chúng tôi rất mong bạn tiếp tục tham gia các sự kiện khác trên CareNet. Bạn có thể xem các sự kiện sắp tới và đăng ký lại bất kỳ lúc nào.</p>
                
                <!-- Action Button -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 35px 0;">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="background-color: #0A6B3D; border-radius: 8px; box-shadow: 0 4px 12px rgba(10, 107, 61, 0.2);">
                            <a href="{eventsLink}" target="_blank" style="display: inline-block; padding: 16px 36px; color: white; text-decoration: none; font-size: 17px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">Xem các sự kiện khác</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #0A6B3D; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
                
                <!-- Signature -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px; margin-bottom: 30px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                      <p style="font-size: 18px; margin: 0; font-weight: 600; color: #0A6B3D;">Đội ngũ CareNet</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Social Icons -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Footer Information -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="font-size: 14px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                      <p style="font-size: 14px; color: #02301a; margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,

  // Email refund amount
  REFUND_AMOUNT_TEMPLATE: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông báo hoàn tiền CareNet</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
      <tr>
        <td>
          <!-- Logo and Header Section -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
              <td align="center" style="padding: 0 0 20px 0;">
                <img src="https://via.placeholder.com/180x60" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
              </td>
            </tr>
          </table>
          
          <!-- Main Content Container -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #0A6B3D 0%, #5db996 100%); padding: 35px 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 0.5px;">Thông báo hoàn tiền</h1>
                <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 16px;">Cảm ơn bạn đã sử dụng dịch vụ CareNet</p>
              </td>
            </tr>
            
            <!-- Email Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <p style="font-size: 17px; margin-top: 0; color: #02301a;">Xin chào {userName},</p>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chúng tôi xin thông báo rằng yêu cầu hoàn tiền của bạn cho sự kiện <span style="font-weight: 600; color: #0A6B3D;">{eventName}</span> trên nền tảng <span style="font-weight: 600; color: #0A6B3D;">CareNet</span> đã được xử lý thành công.</p>
                
                <!-- Refund Details -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; font-weight: 600; color: #0A6B3D; margin: 0 0 10px 0;">Chi tiết hoàn tiền</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Số tiền hoàn:</strong> {refundAmount}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Phương thức:</strong> {refundMethod}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Ngày xử lý:</strong> {refundDate}</p>
                      <p style="font-size: 15px; color: #02301a; margin: 5px 0;"><strong>Lý do:</strong> {refundReason}</p>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Số tiền hoàn lại sẽ được chuyển đến tài khoản của bạn trong vòng {refundProcessingTime}. Nếu bạn không nhận được tiền hoàn lại trong thời gian này, vui lòng liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #0A6B3D; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
                
                <p style="font-size: 17px; color: #02301a; line-height: 1.7;">Chúng tôi hy vọng bạn sẽ tiếp tục tham gia các sự kiện khác trên CareNet. Cảm ơn bạn đã đồng hành cùng chúng tôi!</p>
                
                <!-- Action Button -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 35px 0;">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="background-color: #0A6B3D; border-radius: 8px; box-shadow: 0 4px 12px rgba(10, 107, 61, 0.2);">
                            <a href="{eventsLink}" target="_blank" style="display: inline-block; padding: 16px 36px; color: white; text-decoration: none; font-size: 17px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">Khám phá sự kiện mới</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Important Notice -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                  <tr>
                    <td style="background-color: #e3f0af30; padding: 20px; border-radius: 8px; border: 1px solid #e3f0af;">
                      <p style="font-size: 15px; color: #02301a; margin: 0; line-height: 1.6;">
                        <span style="font-weight: 600;">Lưu ý:</span> Vui lòng kiểm tra tài khoản hoặc phương thức thanh toán của bạn để xác nhận hoàn tiền. Nếu bạn có thắc mắc, vui lòng liên hệ ngay với chúng tôi.
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!-- Signature -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px; margin-bottom: 30px;">
                  <tr>
                    <td>
                      <p style="font-size: 16px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                      <p style="font-size: 18px; margin: 0; font-weight: 600; color: #0A6B3D;">Đội ngũ CareNet</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Social Icons -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 10px 0; font-size: 14px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Footer Information -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="font-size: 14px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                      <p style="font-size: 14px; color: #02301a; margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,

  // Email approve register
  APPROVE_REGISTER_TEMPLATE: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác nhận phê duyệt đăng ký sự kiện CareNet</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #ffffff;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
      <tr>
        <td>
          <!-- Logo and Header Section -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
            <tr>
              <td align="center" style="padding: 0 0 20px 0;">
                <img src="../../frontend_carenet/public/volunteer_img/Carenet.png" alt="CareNet Logo" style="max-width: 180px; height: auto;" />
              </td>
            </tr>
          </table>
          
          <!-- Main Content Container -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(2, 48, 26, 0.08);">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #0A6B3D 0%, #5db996 100%); padding: 35px 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Đăng ký sự kiện đã được phê duyệt</h1>
                <p style="color: #e3f0af; margin: 10px 0 0 0; font-size: 14px;">Chào mừng bạn đến với sự kiện của CareNet!</p>
              </td>
            </tr>
            
            <!-- Email Content -->
            <tr>
              <td style="padding: 40px 50px;">
                <p style="font-size: 15px; margin-top: 0; color: #02301a;">Xin chào {userName},</p>
                
                <p style="font-size: 15px; color: #02301a; line-height: 1.7;">Chúng tôi rất vui mừng thông báo rằng đăng ký của bạn cho sự kiện đã được phê duyệt. Chúng tôi rất mong được gặp bạn tại sự kiện!</p>
                
                <!-- Event Details -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
                  <tr>
                    <td>
                      <p style="font-size: 14px; font-weight: 600; color: #0A6B3D; margin: 0 0 10px 0;">Chi tiết sự kiện</p>
                      <p style="font-size: 13px; color: #02301a; margin: 5px 0;"><strong>Tên sự kiện:</strong> {eventName}</p>
                      <p style="font-size: 13px; color: #02301a; margin: 5px 0;"><strong>Thời gian bắt đầu:</strong> {eventStartAt}</p>
                      <p style="font-size: 13px; color: #02301a; margin: 5px 0;"><strong>Thời gian kết thúc:</strong> {eventEndAt}</p>
                      <p style="font-size: 13px; color: #02301a; margin: 5px 0;"><strong>Địa điểm:</strong> {eventLocation}</p>
                    </td>
                  </tr>
                </table>
                
                <p style="font-size: 15px; color: #02301a; line-height: 1.7;">Vui lòng đến đúng giờ và mang theo các vật dụng cần thiết theo yêu cầu của sự kiện. Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #0A6B3D; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
                
                <!-- Action Button -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 35px 0;">
                  <tr>
                    <td align="center">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="background-color: #0A6B3D; border-radius: 8px; box-shadow: 0 4px 12px rgba(10, 107, 61, 0.2);">
                            <a href="{eventDetailsLink}" target="_blank" style="display: inline-block; padding: 16px 36px; color: white; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">Xem chi tiết sự kiện</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Important Notice -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px;">
                  <tr>
                    <td style="background-color: #e3f0af30; padding: 20px; border-radius: 8px; border: 1px solid #e3f0af;">
                      <p style="font-size: 13px; color: #02301a; margin: 0; line-height: 1.6;">
                        <span style="font-weight: 600;">Lưu ý:</span> Vui lòng lưu email này để tham khảo thông tin sự kiện. Nếu bạn không thể tham dự, vui lòng hủy đăng ký trước 24 giờ.
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!-- Signature -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e3f0af; padding-top: 25px; margin-bottom: 30px;">
                  <tr>
                    <td>
                      <p style="font-size: 14px; margin: 0 0 5px 0; color: #02301a;">Trân trọng,</p>
                      <p style="font-size: 16px; margin: 0; font-weight: 600; color: #0A6B3D;">Đội ngũ CareNet</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Social Icons -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                  <tr>
                    <td align="center">
                      <p style="margin: 0 0 10px 0; font-size: 12px; color: #02301a; font-weight: 600;">Kết nối với chúng tôi</p>
                      <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">C</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">A</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">R</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">N</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">E</a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="#" target="_blank" style="display: inline-block; width: 20px; height: 20px; background-color: #0A6B3D; border-radius: 50%; text-align: center; line-height: 20px; color: white; text-decoration: none; font-size: 10px;">T</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Footer Information -->
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="font-size: 12px; color: #02301a; margin: 0 0 5px 0;">Đây là email tự động, vui lòng không trả lời email này.</p>
                      <p style="font-size: 12px; color: #02301a; margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
};
