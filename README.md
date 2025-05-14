# CareNet - Nền tảng kết nối thiện nguyện

CareNet là một nền tảng giúp kết nối nhanh chóng giữa tổ chức và tình nguyện viên thông qua các bộ lọc thông minh và công nghệ tiên tiến. Sau mỗi hoạt động, tình nguyện viên có thể nhận thư cảm ơn hoặc chứng chỉ điện tử có giá trị trong việc xây dựng hồ sơ cá nhân, tương tự như Coursera.

---

## Hướng dẫn
```bash
git clone https://github.com/hungpt2004/PROJECT_CARENET.git
cd frontend_carenet
cd backend_carenet
```

## 🛠️ Công nghệ sử dụng

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Cơ sở dữ liệu**: MongoDB
- **Realtime Communication**: WebSocket
- **AI Matching**: Gemini Flash 2.0
- **Email Service**: Nodemailer + Scheduler
- **Authentication**: JWT + CCCD verification
- **Deployment**: Docker, PM2, Vercel/Render

---

## 🔐 Đăng nhập & Hồ sơ người dùng

- Người dùng đăng nhập sẽ chọn **sở thích** để cá nhân hóa trải nghiệm.
- Có thể **cập nhật CCCD** trong hồ sơ để nhận **chứng chỉ** (bắt buộc).
- Hệ thống sẽ hiển thị các hoạt động phù hợp theo sở thích đã chọn.

---

## 💼 Gói dịch vụ

### Hiện tại
- **Free**:
  - 1 bài đăng/tháng.
  - Tự kiểm tra đơn đăng ký.
- **Pro** (300.000đ/tháng):
  - Đăng bài không giới hạn.
  - Dashboard quản lý volunteer.
  - Gợi ý volunteer tiềm năng.
  - Gửi email tự động khi volunteer được duyệt hoặc từ chối.
  - AI quét form apply.

### Tương lai
- Thêm nhiều gói dịch vụ nâng cao hơn, phục vụ đa dạng nhu cầu của tổ chức.

---

## 📧 Email Marketing

- Gửi email hàng tuần (thứ Sáu) dựa trên sở thích volunteer.
- Không thông báo trước để tạo sự bất ngờ.
- Tích hợp chia sẻ tips apply thành công từ fanpage.

---

## 📝 Đăng ký sự kiện (Apply Form)

- Mở form không giới hạn, đóng form trước 5 ngày sự kiện.
- Tổ chức tạo danh sách vị trí, kỹ năng yêu cầu (chỉ admin thấy).
- Volunteer chọn vị trí/kỹ năng từ bảng tương tác (như LinkedIn).
- Hệ thống gợi ý tuyển vượt chỉ tiêu để đề phòng rủi ro.

---

## 🤖 Quy trình xét duyệt Volunteer

- AI (Gemini Flash 2.0) tự động quét và đối chiếu kỹ năng.
- Phù hợp → gửi danh sách cho tổ chức.
- Không phù hợp → gửi email từ chối trước 12h trước sự kiện.
- Volunteer được chia thành:
  - Danh sách chính thức
  - Danh sách dự phòng

---

## ⏳ Deadline & Hủy đăng ký

- Tổ chức phải **chốt danh sách volunteer trước 48h**.
- Nếu có volunteer hủy → hệ thống gửi thông báo cho danh sách dự phòng.
- Volunteer phản hồi qua email hoặc web (không mở lại form apply).

---

## 🎖️ Hệ thống điểm số

- **Điểm hoạt động** & **Điểm uy tín** (reputation).
- Ban đầu: 100 điểm uy tín.
- +1 điểm uy tín mỗi khi tham gia.
- <20 điểm uy tín → bị khóa tính năng đăng ký.
- Hủy trước 48h: không bị trừ điểm.
- Không tham gia mà không hủy: bị trừ điểm.
- Trung bình điểm cao 3 sự kiện gần nhất → 1 lần nhận chứng chỉ miễn phí.

---

## ✅ Điểm danh & Đánh giá

- Staff điểm danh và đánh giá volunteer qua form.
- Đánh giá kém → gửi cảnh báo tự động đến admin.
- Có **lịch sử đánh giá** giúp minh bạch hồ sơ volunteer.

---

## 💬 Feedback & Hỗ trợ

- Volunteer có thể gửi phản hồi (không bắt buộc).
- Box chat AI:
  - Trả lời câu hỏi thường gặp.
  - Chuyển câu hỏi cá nhân đến tổ chức.

---

## 📜 Chứng chỉ & Xác thực

- Phí cấp chứng chỉ: 30.000đ/lần.
- Sau khi hoàn thành:
  - Gửi thư cảm ơn.
  - Đính watermark chứng chỉ vào hồ sơ.
  - Yêu cầu CCCD nếu muốn nhận chứng chỉ.

---

## 🔍 Bộ lọc hoạt động

- Lọc theo ngành: Môi trường, Y tế, Giáo dục,...
- Hệ thống chặn nội dung nhạy cảm trong tin nhắn.

---

## ⚖️ Cam kết pháp lý

- Tổ chức phải ký cam kết offline (giai đoạn đầu tại Đà Nẵng).
- Sẽ triển khai bản hợp đồng điện tử khi mở rộng quy mô.

---

## 🔗 Tích hợp App (Tương lai)

- App mobile hỗ trợ điểm danh và theo dõi hoạt động.

---

## 🚀 Khởi chạy dự án

```bash
# Frontend
cd client
npm install
npm run dev

# Backend
cd server
npm install
npm run dev
```

### Cấu trúc thư mục 


### Liên hệ 
- Website: CareNet
- Email: hungptfpt2004@gmail.com
