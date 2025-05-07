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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #f6f4ef;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #f6f4ef; padding: 10px;">
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #f6f4ef;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #f6f4ef; padding: 20px;">
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
    <style>
        /* Reset CSS for email clients */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f6f4ef;
        }
        
        /* Main container */
        .email-container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Header styling */
        .header {
            background-color: #118b50;
            padding: 20px 0;
            text-align: center;
            border-bottom: 5px solid #5db996;
        }
        
        .header img {
            height: 60px;
            width: auto;
        }
        
        /* Content area */
        .content {
            padding: 30px 40px;
            background-color: #ffffff;
        }
        
        /* Event info box */
        .event-box {
            background-color: #f5f5f5;
            border-left: 4px solid #5db996;
            padding: 20px;
            margin: 25px 0;
        }
        
        .event-title {
            color: #118b50;
            font-size: 20px;
            font-weight: bold;
            margin: 0 0 10px 0;
        }
        
        .event-details {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 15px;
        }
        
        .event-detail-item {
            display: flex;
            align-items: center;
            font-size: 14px;
        }
        
        .event-detail-item img {
            width: 16px;
            height: 16px;
            margin-right: 8px;
        }
        
        /* Special message */
        .special-message {
            background-color: #e3f0af;
            padding: 20px;
            border-radius: 6px;
            margin: 25px 0;
            position: relative;
        }
        
        .special-message:before {
            content: """;
            font-size: 60px;
            color: #5db996;
            position: absolute;
            top: -15px;
            left: 10px;
            opacity: 0.3;
        }
        
        /* Signature area */
        .signature-area {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            align-items: flex-end;
        }
        
        .signature {
            flex: 1;
            text-align: right;
            padding-right: 30px;
        }
        
        .signature-name {
            font-weight: bold;
            color: #118b50;
            font-size: 18px;
            margin-bottom: 5px;
        }
        
        .signature-title {
            color: #02301a;
            font-style: italic;
            margin-bottom: 15px;
        }
        
        .signature-line {
            width: 120px;
            height: 2px;
            background-color: #118b50;
            margin-left: auto;
            margin-bottom: 10px;
        }
        
        /* Stamp/Seal */
        .stamp {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background-color: #f6f4ef;
            border: 2px dashed #118b50;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 5px;
        }
        
        .stamp-inner {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid #5db996;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(227, 240, 175, 0.4);
        }
        
        .stamp-title {
            font-weight: bold;
            color: #118b50;
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        .stamp-subtitle {
            font-size: 10px;
            color: #02301a;
            text-align: center;
            margin-bottom: 5px;
        }
        
        .stamp-divider {
            width: 40px;
            height: 1px;
            background-color: #5db996;
            margin: 5px 0;
        }
        
        .stamp-signature {
            font-family: 'Brush Script MT', cursive;
            color: #118b50;
            font-size: 18px;
        }
        
        /* Footer */
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 3px solid #e3f0af;
        }
        
        .footer-logo {
            color: #118b50;
            font-weight: bold;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .social-links {
            margin: 15px 0;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 5px;
            color: #118b50;
            text-decoration: none;
        }
        
        /* Typography */
        h1 {
            color: #ffffff;
            font-size: 28px;
            margin: 10px 0;
            font-weight: 600;
            letter-spacing: 1px;
        }
        
        h2 {
            color: #118b50;
            font-size: 22px;
            margin: 25px 0 15px 0;
            font-weight: 600;
            border-bottom: 2px solid #e3f0af;
            padding-bottom: 8px;
        }
        
        p {
            margin: 15px 0;
            color: #333333;
        }
        
        .greeting {
            font-size: 18px;
            color: #02301a;
            font-weight: 500;
        }
        
        .highlight {
            color: #118b50;
            font-weight: 600;
        }
        
        /* Responsive adjustments */
        @media only screen and (max-width: 650px) {
            .content {
                padding: 20px;
            }
            
            .signature-area {
                flex-direction: column;
                align-items: center;
            }
            
            .signature {
                text-align: center;
                padding-right: 0;
                margin-bottom: 30px;
                order: 2;
            }
            
            .signature-line {
                margin: 0 auto 10px auto;
            }
            
            .stamp {
                order: 1;
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>THƯ CẢM ƠN</h1>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <p class="greeting">Kính gửi <span class="highlight">[Tên Người Tham Gia]</span>,</p>
            
            <p>CareNet xin chân thành cảm ơn Quý khách đã dành thời gian quý báu tham dự sự kiện của chúng tôi. Sự hiện diện và đóng góp của Quý khách đã góp phần quan trọng vào thành công chung của sự kiện.</p>
            
            <div class="event-box">
                <div class="event-title">[TÊN SỰ KIỆN]</div>
                <p>Chúng tôi rất vinh dự được đón tiếp Quý khách tại sự kiện này và hy vọng rằng những thông tin được chia sẻ sẽ mang lại giá trị cho Quý khách.</p>
                
                <div class="event-details">
                    <div class="event-detail-item">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23118b50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E" alt="Calendar">
                        <span>[Ngày Tháng Năm]</span>
                    </div>
                    <div class="event-detail-item">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23118b50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E" alt="Location">
                        <span>[Địa Điểm]</span>
                    </div>
                    <div class="event-detail-item">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23118b50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='9' cy='7' r='4'%3E%3C/circle%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'%3E%3C/path%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'%3E%3C/path%3E%3C/svg%3E" alt="Participants">
                        <span>[Số Người Tham Dự]</span>
                    </div>
                </div>
            </div>
            
            <h2>Lời Cảm Ơn Đặc Biệt</h2>
            
            <p>Chúng tôi đặc biệt đánh giá cao sự tham gia nhiệt tình và những đóng góp quý báu của Quý khách trong suốt thời gian diễn ra sự kiện. Những ý kiến và câu hỏi sâu sắc của Quý khách đã góp phần làm phong phú thêm nội dung chương trình.</p>
            
            <div class="special-message">
                <p><em>[Thông điệp đặc biệt hoặc lời chúc mừng cá nhân dành cho người tham gia. Đây có thể là lời cảm ơn về một đóng góp cụ thể hoặc ghi nhận sự tham gia tích cực của họ trong sự kiện.]</em></p>
            </div>
            
            <p>CareNet tự hào được hợp tác cùng <span class="highlight">[Tên Tổ Chức]</span> trong việc thúc đẩy sức khỏe cộng đồng và nâng cao chất lượng dịch vụ y tế. Chúng tôi hy vọng sẽ tiếp tục nhận được sự ủng hộ và đồng hành của Quý khách trong các hoạt động sắp tới.</p>
            
            <p>Một lần nữa, xin chân thành cảm ơn Quý khách đã dành thời gian tham dự sự kiện. Chúng tôi mong được gặp lại Quý khách trong những sự kiện tiếp theo.</p>
            
            <!-- Signature Area -->
            <div class="signature-area">
                <div class="signature">
                    <div class="signature-line"></div>
                    <div class="signature-name">Ngo Nhu Phuong</div>
                    <div class="signature-title">CEO CareNet</div>
                </div>
                
                <div class="stamp">
                    <div class="stamp-inner">
                        <div class="stamp-title">CARENET</div>
                        <div class="stamp-subtitle">CHỨNG NHẬN THAM DỰ</div>
                        <div class="stamp-divider"></div>
                        <div class="stamp-subtitle">Đối tác chính thức của</div>
                        <div class="stamp-subtitle" style="font-weight: bold">FPT Education</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">CARENET</div>
            <p>Kết nối thiện nguyện cộng đồng</p>
            <p>© 2025 CareNet. Tất cả các quyền được bảo lưu.</p>
            <p>[Địa chỉ] | [Số điện thoại] | [Email]</p>
        </div>
    </div>
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
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #f6f4ef;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #f6f4ef; padding: 20px;">
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
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #f6f4ef;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #f6f4ef; padding: 20px;">
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
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #02301a; margin: 0; padding: 0; background-color: #f6f4ef;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 650px; margin: 0 auto; background-color: #f6f4ef; padding: 20px;">
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
};
