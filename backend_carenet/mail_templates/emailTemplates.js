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

  // Email success register

  // Email reject register

  // Email refund amount
};
