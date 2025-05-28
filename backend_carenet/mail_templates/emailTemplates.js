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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Xác minh tài khoản</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Xin chào,</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Cảm ơn bạn đã đăng ký tham gia <span style="font-weight: 600; color: #2e8b57;">CareNet</span> - nền tảng kết nối dịch vụ thiện nguyện. Chúng tôi rất vui mừng được chào đón bạn vào cộng đồng những người sẵn sàng tạo nên sự thay đổi tích cực!</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chỉ còn một bước nữa thôi để hoàn tất quá trình đăng ký:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
          <tr>
            <td align="center">
              <a href="{verificationLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e8b57; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 4px;">Xác minh tài khoản ngay</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666666; margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <strong>Lưu ý:</strong> Liên kết này sẽ hết hạn sau 24 giờ vì lý do bảo mật. Nếu bạn không yêu cầu xác minh này, vui lòng bỏ qua email này.
        </p>
        <p style="font-size: 16px; margin: 0 0 20px;">Sau khi xác minh, bạn có thể truy cập tài khoản và bắt đầu kết nối với các hoạt động thiện nguyện phù hợp với sở thích và kỹ năng của mình.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Đội ngũ CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Đặt lại mật khẩu</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Xin chào,</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản <span style="font-weight: 600; color: #2e8b57;">CareNet</span> của bạn. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với đội hỗ trợ của chúng tôi.</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Để đặt lại mật khẩu, vui lòng nhấp vào nút bên dưới:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
          <tr>
            <td align="center">
              <a href="{resetPasswordLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e8b57; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 4px;">Đặt lại mật khẩu</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666666; margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <strong>Lưu ý quan trọng:</strong> Liên kết này chỉ có hiệu lực trong vòng 1 giờ kể từ thời điểm yêu cầu vì lý do bảo mật. Sau khoảng thời gian này, bạn sẽ cần phải yêu cầu đặt lại mật khẩu mới.
        </p>
        <p style="font-size: 16px; margin: 0 0 20px;">Sau khi đặt lại mật khẩu thành công, bạn có thể đăng nhập và tiếp tục tham gia các hoạt động thiện nguyện cùng cộng đồng CareNet.</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Nếu bạn gặp bất kỳ khó khăn nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi qua <a href="mailto:support@carenet.org" style="color: #2e8b57; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Đội ngũ CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Thư Cảm Ơn</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Kính gửi <span style="font-weight: 600; color: #2e8b57;">{userName}</span>,</p>
        <p style="font-size: 16px; margin: 0 0 20px;">CareNet xin chân thành cảm ơn Quý khách đã dành thời gian quý báu tham dự sự kiện của chúng tôi. Sự hiện diện và đóng góp của Quý khách đã góp phần quan trọng vào thành công chung của sự kiện.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <tr>
            <td>
              <p style="font-size: 14px; font-weight: 600; color: #2e8b57; margin: 0 0 10px;">Chi tiết sự kiện</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Tên sự kiện:</strong> {eventName}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Ngày bắt đầu:</strong> {eventStartAt}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Ngày kết thúc:</strong> {eventEndAt}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Địa điểm:</strong> {location}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Số người tham gia:</strong> {participants}</p>
            </td>
          </tr>
        </table>
        <p style="font-size: 16px; margin: 0 0 20px;">{organizationName} rất vinh dự được đón tiếp Quý khách tại sự kiện này và hy vọng rằng những thông tin được chia sẻ sẽ mang lại giá trị cho Quý khách.</p>
        <p style="font-size: 14px; color: #666666; margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <strong>Lời cảm ơn đặc biệt:</strong> Chúng tôi đặc biệt đánh giá cao sự tham gia nhiệt tình và những đóng góp quý báu của Quý khách trong suốt thời gian diễn ra sự kiện. Những ý kiến và câu hỏi sâu sắc của Quý khách đã góp phần làm phong phú thêm nội dung chương trình.
        </p>
        <p style="font-size: 16px; margin: 0 0 20px;">CareNet tự hào được hợp tác cùng <span style="font-weight: 600; color: #2e8b57;">{organizationName}</span> trong việc thúc đẩy sức khỏe cộng đồng và nâng cao chất lượng dịch vụ y tế. Chúng tôi hy vọng sẽ tiếp tục nhận được sự ủng hộ và đồng hành của Quý khách trong các hoạt động sắp tới.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Ngo Nhu Phuong</p>
              <p style="font-size: 14px; margin: 5px 0 0; color: #333333;">CEO CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Đăng ký sự kiện thành công</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Xin chào {userName},</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi rất vui mừng thông báo rằng bạn đã ghi danh thành công cho sự kiện trên nền tảng <span style="font-weight: 600; color: #2e8b57;">CareNet</span>. Vui lòng đợi kết quả từ Tổ Chức nhé ^^!</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <tr>
            <td>
              <p style="font-size: 14px; font-weight: 600; color: #2e8b57; margin: 0 0 10px;">Chi tiết sự kiện</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Tên sự kiện:</strong> {eventName}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Thời gian bắt đầu:</strong> {eventStartAt}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Thời gian kết thúc:</strong> {eventEndAt}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Địa điểm:</strong> {eventLocation}</p>
            </td>
          </tr>
        </table>
        <p style="font-size: 16px; margin: 0 0 20px;">Vui lòng kiểm tra thông tin sự kiện và đảm bảo bạn có mặt đúng giờ. Nếu có bất kỳ câu hỏi nào, bạn có thể liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #2e8b57; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
          <tr>
            <td align="center">
              <a href="{eventDetailsLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e8b57; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 4px;">Xem chi tiết sự kiện</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666666; margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <strong>Lưu ý:</strong> Vui lòng lưu email này để theo dõi thông tin sự kiện. Nếu bạn không đăng ký sự kiện này, vui lòng liên hệ ngay với chúng tôi.
        </p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Đội ngũ CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Thông báo từ chối đăng ký</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Xin chào {userName},</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Trước tiên, chúng tôi xin gửi lời cảm ơn chân thành đến bạn vì đã dành sự quan tâm và mong muốn tham gia sự kiện <span style="font-weight: 600; color: #2e8b57;">{eventName}</span> trên nền tảng <span style="font-weight: 600; color: #2e8b57;">CareNet</span>. Sự nhiệt tình và tinh thần tình nguyện của bạn thực sự đáng trân trọng.</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi rất tiếc phải thông báo rằng, sau khi xem xét kỹ lưỡng, chúng tôi không thể chấp nhận đăng ký của bạn cho sự kiện này. Đây là một quyết định không dễ dàng đối với chúng tôi.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <tr>
            <td>
              <p style="font-size: 14px; font-weight: 600; color: #2e8b57; margin: 0 0 10px;">Lý do từ chối</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;">{rejectionReason}</p>
            </td>
          </tr>
        </table>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi rất mong bạn không vì điều này mà nản lòng. CareNet có rất nhiều sự kiện ý nghĩa khác đang chờ đón sự tham gia của bạn. Chúng tôi tin rằng với tinh thần tình nguyện và sự nhiệt huyết của mình, bạn sẽ tìm được những cơ hội phù hợp để cống hiến và phát triển.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
          <tr>
            <td align="center">
              <a href="{eventsLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e8b57; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 4px;">Khám phá các sự kiện khác</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 16px; margin: 0 0 20px;">Nếu bạn có bất kỳ thắc mắc nào hoặc cần hỗ trợ thêm, đừng ngần ngại liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #2e8b57; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Đội ngũ CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Thông báo hoàn tiền</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Xin chào {userName},</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi xin thông báo rằng yêu cầu hoàn tiền của bạn cho sự kiện <span style="font-weight: 600; color: #2e8b57;">{eventName}</span> trên nền tảng <span style="font-weight: 600; color: #2e8b57;">CareNet</span> đã được xử lý thành công.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <tr>
            <td>
              <p style="font-size: 14px; font-weight: 600; color: #2e8b57; margin: 0 0 10px;">Chi tiết hoàn tiền</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Số tiền hoàn:</strong> {refundAmount}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Phương thức:</strong> {refundMethod}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Ngày xử lý:</strong> {refundDate}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Lý do:</strong> {refundReason}</p>
            </td>
          </tr>
        </table>
        <p style="font-size: 16px; margin: 0 0 20px;">Số tiền hoàn lại sẽ được chuyển đến tài khoản của bạn trong vòng {refundProcessingTime}. Nếu bạn không nhận được tiền hoàn lại trong thời gian này, vui lòng liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #2e8b57; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi hy vọng bạn sẽ tiếp tục tham gia các sự kiện khác trên CareNet. Cảm ơn bạn đã đồng hành cùng chúng tôi!</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
          <tr>
            <td align="center">
              <a href="{eventsLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e8b57; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 4px;">Khám phá sự kiện mới</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666666; margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <strong>Lưu ý:</strong> Vui lòng kiểm tra tài khoản hoặc phương thức thanh toán của bạn để xác nhận hoàn tiền. Nếu bạn có thắc mắc, vui lòng liên hệ ngay với chúng tôi.
        </p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Đội ngũ CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff;">
    <tr>
      <td style="background-color: #2e8b57; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Đăng ký sự kiện đã được phê duyệt</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="font-size: 16px; margin: 0 0 20px;">Xin chào {userName},</p>
        <p style="font-size: 16px; margin: 0 0 20px;">Chúng tôi rất vui mừng thông báo rằng đăng ký của bạn cho sự kiện đã được phê duyệt. Chúng tôi rất mong được gặp bạn tại sự kiện!</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <tr>
            <td>
              <p style="font-size: 14px; font-weight: 600; color: #2e8b57; margin: 0 0 10px;">Chi tiết sự kiện</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Tên sự kiện:</strong> {eventName}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Thời gian bắt đầu:</strong> {eventStartAt}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Thời gian kết thúc:</strong> {eventEndAt}</p>
              <p style="font-size: 14px; color: #333333; margin: 5px 0;"><strong>Địa điểm:</strong> {eventLocation}</p>
            </td>
          </tr>
        </table>
        <p style="font-size: 16px; margin: 0 0 20px;">Vui lòng đến đúng giờ và mang theo các vật dụng cần thiết theo yêu cầu của sự kiện. Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua <a href="mailto:support@carenet.org" style="color: #2e8b57; text-decoration: none; font-weight: 600;">support@carenet.org</a>.</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
          <tr>
            <td align="center">
              <a href="{eventDetailsLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #2e8b57; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 4px;">Xem chi tiết sự kiện</a>
            </td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666666; margin: 20px 0; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <strong>Lưu ý:</strong> Vui lòng lưu email này để tham khảo thông tin sự kiện. Nếu bạn không thể tham dự, vui lòng hủy đăng ký trước 24 giờ.
        </p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <tr>
            <td>
              <p style="font-size: 14px; margin: 0 0 5px; color: #333333;">Trân trọng,</p>
              <p style="font-size: 16px; margin: 0; font-weight: 600; color: #2e8b57;">Đội ngũ CareNet</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f9f9f9; font-size: 12px; color: #666666;">
        <p style="margin: 0 0 5px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        <p style="margin: 0;">© {currentYear} CareNet. Tất cả các quyền được bảo lưu.</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `,
};