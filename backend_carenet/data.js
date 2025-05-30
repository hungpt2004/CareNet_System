const mongoose = require('mongoose');
require('dotenv').config();

// Import all models
const User = require('./models/user.model');
const Organization = require('./models/organization.model');
const OrganizationLevel = require('./models/organizationLevel.model');
const Event = require('./models/event.model');
const EventRegistration = require('./models/eventRegistration.model');
const Attendance = require('./models/attendance.model');
const HistoryEvent = require('./models/historyEvent.model');

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Utility functions
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubset(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// =========================
// REAL VIETNAM ADDRESSES
// =========================
const vietnamAddresses = [
  // HỒ CHÍ MINH
  {
    street: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    province: "Hồ Chí Minh"
  },
  {
    street: "456 Lê Lợi",
    ward: "Phường Bến Thành",
    district: "Quận 1", 
    province: "Hồ Chí Minh"
  },
  {
    street: "789 Đồng Khởi",
    ward: "Phường Đa Kao",
    district: "Quận 1",
    province: "Hồ Chí Minh"
  },
  {
    street: "234 Hai Bà Trưng",
    ward: "Phường Tân Định",
    district: "Quận 1",
    province: "Hồ Chí Minh"
  },
  {
    street: "567 Võ Văn Tần",
    ward: "Phường 6",
    district: "Quận 3",
    province: "Hồ Chí Minh"
  },
  {
    street: "890 Nam Kỳ Khởi Nghĩa",
    ward: "Phường 7",
    district: "Quận 3",
    province: "Hồ Chí Minh"
  },
  {
    street: "123 Nguyễn Đình Chiểu",
    ward: "Phường Đa Kao",
    district: "Quận 1",
    province: "Hồ Chí Minh"
  },
  {
    street: "456 Trần Hưng Đạo",
    ward: "Phường Cầu Ông Lãnh",
    district: "Quận 1",
    province: "Hồ Chí Minh"
  },
  {
    street: "789 Nguyễn Thị Minh Khai",
    ward: "Phường Đa Kao",
    district: "Quận 1",
    province: "Hồ Chí Minh"
  },
  {
    street: "321 Pasteur",
    ward: "Phường 6",
    district: "Quận 3",
    province: "Hồ Chí Minh"
  },

  // HÀ NỘI
  {
    street: "12 Hàng Bài",
    ward: "Phường Hàng Bài",
    district: "Quận Hoàn Kiếm",
    province: "Hà Nội"
  },
  {
    street: "34 Hàng Gai",
    ward: "Phường Hàng Gai",
    district: "Quận Hoàn Kiếm",
    province: "Hà Nội"
  },
  {
    street: "56 Hàng Bồ",
    ward: "Phường Hàng Bồ",
    district: "Quận Hoàn Kiếm",
    province: "Hà Nội"
  },
  {
    street: "78 Đinh Tiên Hoàng",
    ward: "Phường Lý Thái Tổ",
    district: "Quận Hoàn Kiếm",
    province: "Hà Nội"
  },
  {
    street: "90 Nguyễn Du",
    ward: "Phường Nguyễn Du",
    district: "Quận Hai Bà Trưng",
    province: "Hà Nội"
  },
  {
    street: "123 Bà Triệu",
    ward: "Phường Lê Đại Hành",
    district: "Quận Hai Bà Trưng",
    province: "Hà Nội"
  },
  {
    street: "456 Kim Mã",
    ward: "Phường Kim Mã",
    district: "Quận Ba Đình",
    province: "Hà Nội"
  },
  {
    street: "789 Điện Biên Phủ",
    ward: "Phường Điện Biên",
    district: "Quận Ba Đình",
    province: "Hà Nội"
  },
  {
    street: "101 Đội Cấn",
    ward: "Phường Đội Cấn",
    district: "Quận Ba Đình",
    province: "Hà Nội"
  },
  {
    street: "202 Láng",
    ward: "Phường Láng Thượng",
    district: "Quận Đống Đa",
    province: "Hà Nội"
  },

  // ĐÀ NẴNG
  {
    street: "23 Trần Phú",
    ward: "Phường Thạch Thang",
    district: "Quận Hải Châu",
    province: "Đà Nẵng"
  },
  {
    street: "45 Lê Duẩn",
    ward: "Phường Hải Châu 1",
    district: "Quận Hải Châu",
    province: "Đà Nẵng"
  },
  {
    street: "67 Nguyễn Văn Linh",
    ward: "Phường Nam Dương",
    district: "Quận Hải Châu",
    province: "Đà Nẵng"
  },
  {
    street: "89 Bach Đằng",
    ward: "Phường Hải Châu 2",
    district: "Quận Hải Châu",
    province: "Đà Nẵng"
  },
  {
    street: "111 Võ Nguyên Giáp",
    ward: "Phường Phước Mỹ",
    district: "Quận Sơn Trà",
    province: "Đà Nẵng"
  },
  {
    street: "133 Hoàng Sa",
    ward: "Phường Thuận Phước",
    district: "Quận Hải Châu",
    province: "Đà Nẵng"
  },
  {
    street: "155 Nguyễn Tất Thành",
    ward: "Phường Xuân Hà",
    district: "Quận Thanh Khê",
    province: "Đà Nẵng"
  },
  {
    street: "177 Lê Văn Hiến",
    ward: "Phường Khuê Trung",
    district: "Quận Cẩm Lệ",
    province: "Đà Nẵng"
  },

  // CẦN THƠ
  {
    street: "12 Hai Bà Trưng",
    ward: "Phường Tân An",
    district: "Quận Ninh Kiều",
    province: "Cần Thơ"
  },
  {
    street: "34 Nguyễn Văn Cừ",
    ward: "Phường An Hòa",
    district: "Quận Ninh Kiều",
    province: "Cần Thơ"
  },
  {
    street: "56 Mậu Thân",
    ward: "Phường Xuân Khánh",
    district: "Quận Ninh Kiều",
    province: "Cần Thơ"
  },
  {
    street: "78 Trần Hưng Đạo",
    ward: "Phường An Nghiệp",
    district: "Quận Ninh Kiều",
    province: "Cần Thơ"
  },

  // HẢI PHÒNG
  {
    street: "23 Lê Lai",
    ward: "Phường Máy Chai",
    district: "Quận Ngô Quyền",
    province: "Hải Phòng"
  },
  {
    street: "45 Đinh Tiên Hoàng",
    ward: "Phường Máy Tơ",
    district: "Quận Ngô Quyền",
    province: "Hải Phòng"
  },
  {
    street: "67 Lạch Tray",
    ward: "Phường Đông Khê",
    district: "Quận Ngô Quyền",
    province: "Hải Phòng"
  },

  // VŨNG TÀU
  {
    street: "89 Hạ Long",
    ward: "Phường 1",
    district: "Thành phố Vũng Tàu",
    province: "Bà Rịa - Vũng Tàu"
  },
  {
    street: "111 Thùy Vân",
    ward: "Phường 2",
    district: "Thành phố Vũng Tàu", 
    province: "Bà Rịa - Vũng Tàu"
  },
  {
    street: "133 Tran Phú",
    ward: "Phường 5",
    district: "Thành phố Vũng Tàu",
    province: "Bà Rịa - Vũng Tàu"
  },

  // NHA TRANG
  {
    street: "23 Trần Phú",
    ward: "Phường Lộc Thọ",
    district: "Thành phố Nha Trang",
    province: "Khánh Hòa"
  },
  {
    street: "45 Nguyễn Thị Minh Khai",
    ward: "Phường Tân Lập",
    district: "Thành phố Nha Trang",
    province: "Khánh Hòa"
  },
  {
    street: "67 Lê Thánh Tôn",
    ward: "Phường Vĩnh Nguyên",
    district: "Thành phố Nha Trang",
    province: "Khánh Hòa"
  },

  // HUẾ
  {
    street: "12 Lê Lợi",
    ward: "Phường Phú Hòa",
    district: "Thành phố Huế",
    province: "Thừa Thiên Huế"
  },
  {
    street: "34 Nguyễn Huệ",
    ward: "Phường Vĩnh Ninh",
    district: "Thành phố Huế",
    province: "Thừa Thiên Huế"
  },
  {
    street: "56 Trần Hưng Đạo",
    ward: "Phường Thuận Hòa",
    district: "Thành phố Huế",
    province: "Thừa Thiên Huế"
  },

  // BIÊN HÒA
  {
    street: "78 Võ Thị Sáu",
    ward: "Phường Thống Nhất",
    district: "Thành phố Biên Hòa",
    province: "Đồng Nai"
  },
  {
    street: "90 Phan Trung",
    ward: "Phường Tân Mai",
    district: "Thành phố Biên Hòa",
    province: "Đồng Nai"
  },

  // LONG XUYÊN
  {
    street: "123 Nguyễn Văn Cừ",
    ward: "Phường Đông Xuyên",
    district: "Thành phố Long Xuyên",
    province: "An Giang"
  },
  {
    street: "145 Trần Hưng Đạo",
    ward: "Phường Mỹ Bình",
    district: "Thành phố Long Xuyên",
    province: "An Giang"
  },

  // BUÔN MA THUỘT
  {
    street: "167 Y Wang",
    ward: "Phường Tân Lợi",
    district: "Thành phố Buôn Ma Thuột",
    province: "Đắk Lắk"
  },
  {
    street: "189 Lê Duẩn",
    ward: "Phường Thống Nhất",
    district: "Thành phố Buôn Ma Thuột",
    province: "Đắk Lắk"
  },

  // PLEIKU
  {
    street: "211 Lê Lợi",
    ward: "Phường Yên Đỗ",
    district: "Thành phố Pleiku",
    province: "Gia Lai"
  },
  {
    street: "233 Trần Phú",
    ward: "Phường Diên Hồng",
    district: "Thành phố Pleiku",
    province: "Gia Lai"
  },

  // QUY NHON
  {
    street: "255 Nguyễn Huệ",
    ward: "Phường Lê Hồng Phong",
    district: "Thành phố Quy Nhon",
    province: "Bình Định"
  },
  {
    street: "277 An Dương Vương",
    ward: "Phường Trần Quang Diệu",
    district: "Thành phố Quy Nhon",
    province: "Bình Định"
  }
];

// Tọa độ thực tế cho từng tỉnh/thành phố
const provinceCoordinates = {
  "Hồ Chí Minh": { lat: 10.8231, lng: 106.6297 },
  "Hà Nội": { lat: 21.0285, lng: 105.8542 },
  "Đà Nẵng": { lat: 16.0544, lng: 108.2022 },
  "Cần Thơ": { lat: 10.0452, lng: 105.7469 },
  "Hải Phòng": { lat: 20.8449, lng: 106.6881 },
  "Bà Rịa - Vũng Tàu": { lat: 10.4113, lng: 107.1362 },
  "Khánh Hòa": { lat: 12.2388, lng: 109.1967 },
  "Thừa Thiên Huế": { lat: 16.4637, lng: 107.5909 },
  "Đồng Nai": { lat: 10.9472, lng: 106.8441 },
  "An Giang": { lat: 10.3809, lng: 105.1258 },
  "Đắk Lắk": { lat: 12.6667, lng: 108.0428 },
  "Gia Lai": { lat: 13.9833, lng: 108.0000 },
  "Bình Định": { lat: 13.7831, lng: 109.2197 }
};

// Function để random địa chỉ thực tế
function getRandomRealAddress() {
  const address = getRandomElement(vietnamAddresses);
  const coords = provinceCoordinates[address.province];
  
  return {
    street: address.street,
    ward: address.ward,
    district: address.district,
    province: address.province,
    latitude: coords.lat + (Math.random() - 0.5) * 0.05,
    longitude: coords.lng + (Math.random() - 0.5) * 0.05
  };
}

// Event questions từ cũ của bạn
const eventQuestions = [
  {
    question: "Bạn có kinh nghiệm tình nguyện không?",
    type: "radio",
    options: ["Có", "Không", "Một chút"]
  },
  {
    question: "Tại sao bạn muốn tham gia sự kiện này?",
    type: "text",
    options: []
  },
  {
    question: "Bạn có sẵn sàng cam kết tham gia đầy đủ không?",
    type: "radio",
    options: ["Có", "Không", "Tùy tình hình"]
  },
  {
    question: "Bạn có kỹ năng đặc biệt nào có thể đóng góp?",
    type: "checkbox",
    options: ["Giao tiếp", "Tổ chức", "Kỹ thuật", "Y tế", "Giảng dạy", "Khác"]
  },
  {
    question: "Bạn đã từng tham gia hoạt động nào tương tự chưa?",
    type: "text",
    options: []
  },
  {
    question: "Thời gian nào bạn có thể tham gia?",
    type: "radio",
    options: ["Cả ngày", "Buổi sáng", "Buổi chiều", "Buổi tối"]
  },
  {
    question: "Bạn có phương tiện đi lại không?",
    type: "radio",
    options: ["Có", "Không", "Cần hỗ trợ"]
  },
  {
    question: "Ghi chú thêm (nếu có)",
    type: "text",
    options: []
  }
];

// Data arrays
const orgNames = [
  "Quỹ Bảo vệ Trẻ em Việt Nam",
  "Hội Chữ thập đỏ Việt Nam", 
  "Tổ chức Tầm nhìn Thế giới",
  "Quỹ Hy vọng",
  "Caritas Việt Nam",
  "Hội Phụ nữ Việt Nam",
  "Đoàn Thanh niên Việt Nam",
  "Hội Khuyến học Việt Nam",
  "Quỹ Vì Tầm vóc Việt",
  "Tổ chức SOS Villages",
  "Hội Người mù Việt Nam",
  "Quỹ Bảo vệ Môi trường",
  "Tổ chức Y tế Cộng đồng",
  "Hội Doanh nhân Trẻ",
  "Quỹ Phát triển Giáo dục"
];

const orgDescriptions = [
  "Tổ chức phi lợi nhuận hoạt động vì sự phát triển bền vững của cộng đồng",
  "Chúng tôi cam kết mang lại những giá trị tích cực cho xã hội",
  "Tạo ra những thay đổi tích cực trong cuộc sống của người dân",
  "Hỗ trợ các hoạt động thiện nguyện và phát triển cộng đồng",
  "Xây dựng một xã hội công bằng và nhân ái hơn"
];

const skills = [
  "Giao tiếp", "Lãnh đạo", "Làm việc nhóm", "Giảng dạy", "Y tế", 
  "Tư vấn", "Kỹ thuật", "Nghệ thuật", "Thể thao", "Nấu ăn",
  "Chăm sóc trẻ em", "Chăm sóc người già", "Môi trường", "Công nghệ"
];

const categories = [
  "Giáo dục", "Y tế", "Môi trường", "Cộng đồng", "Trẻ em",
  "Người già", "Người khuyết tật", "Phụ nữ", "Thanh niên", "Văn hóa"
];

const hobbies = [
  "Đọc sách", "Du lịch", "Thể thao", "Âm nhạc", "Nấu ăn",
  "Nhiếp ảnh", "Vẽ tranh", "Xem phim", "Chơi game", "Làm vườn"
];

const eventTitles = [
  "Hỗ trợ trẻ em khuyết tật", "Làm sạch môi trường", "Giảng dạy cho trẻ em vùng cao",
  "Chăm sóc người già", "Tặng quà cho người nghèo", "Trồng cây xanh",
  "Hiến máu nhân đạo", "Xây nhà cho người nghèo", "Hỗ trợ học sinh nghèo",
  "Khám bệnh miễn phí", "Tư vấn pháp luật", "Dạy nghề cho thanh niên",
  "Cứu trợ thiên tai", "Bảo vệ động vật hoang dã", "Làm sạch bãi biển"
];

// Main function to insert all data
async function insertData() {
  try {
    console.log('🔄 Starting data insertion...');
    
    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Organization.deleteMany({}),
      OrganizationLevel.deleteMany({}),
      Event.deleteMany({}),
      EventRegistration.deleteMany({}),
      Attendance.deleteMany({}),
      HistoryEvent.deleteMany({})
    ]);
    console.log('✅ Cleared existing data');

    // 1. INSERT ORGANIZATION LEVELS
    console.log('🔄 Inserting Organization Levels...');
    const orgLevels = [
      {
        name: "basic", // ✅ match với enum ['basic', 'pro']
        pricePerMonth: 0, // ✅ đúng field name trong model
        description: "Cấp độ cơ bản cho tổ chức mới"
      },
      {
        name: "pro", // ✅ match với enum ['basic', 'pro'] 
        pricePerMonth: 499000, // ✅ đúng field name trong model
        description: "Cấp độ Pro với nhiều tính năng hơn"
      }
    ];

    const insertedLevels = await OrganizationLevel.insertMany(orgLevels);
    const organizationLevelIds = insertedLevels.map(level => level._id);
    console.log(`✅ Inserted ${organizationLevelIds.length} Organization Levels`);

    // 2. INSERT ORGANIZATIONS WITH USERS
    console.log('🔄 Inserting Organizations...');
    const organizationIds = [];
    const organizationUserIds = [];

    for (let i = 1; i <= 50; i++) {
      // Tạo user cho organization
      const orgUser = new User({
        fullname: `${orgNames[(i - 1) % orgNames.length]} Manager`,
        email: `org${i}@carenet.com`,
        password: "$2b$10$jIj0mCP13..EeaVPY2xXXeL/utB2tHgPAOyzHdthRgbQZG/bJZA4G",
        role: "organization",
        phone: `0901${(i + 100000).toString().slice(-6)}`,
        dob: getRandomDate(new Date(1970, 0, 1), new Date(1990, 11, 31)),
        isVerified: true,
        status: "ready",
        reputationPoints: 100 + Math.floor(Math.random() * 200),
        hobbies: getRandomSubset(hobbies, Math.floor(Math.random() * 3) + 1),
      });

      const savedUser = await orgUser.save();
      organizationUserIds.push(savedUser._id);

      // Tạo organization - ✅ match với Organization model
      const organization = new Organization({
        name: `${orgNames[(i - 1) % orgNames.length]} ${i}`,
        description: orgDescriptions[(i - 1) % orgDescriptions.length],
        phone: `0901${(i + 200000).toString().slice(-6)}`,
        levelId: getRandomElement(organizationLevelIds),
        userId: savedUser._id,
        adminStatus: Math.random() > 0.1 ? "approved" : "pending",
        organizationStatus: "active",
        rating: 4.0 + Math.random() * 1.0,
        // Bỏ các fields không có trong model như address, email, website, etc.
      });

      const savedOrganization = await organization.save();
      organizationIds.push(savedOrganization._id);

      // Update user với organizationId
      await User.findByIdAndUpdate(savedUser._id, {
        organizationId: savedOrganization._id
      });

      if (i % 10 === 0) console.log(`✅ Inserted ${i} Organizations`);
    }

    // 3. INSERT STAFF
    console.log('🔄 Inserting Staff...');
    const staffIds = [];

    for (let i = 1; i <= 200; i++) {
      const staff = new User({
        fullname: `Nhân viên ${i}`,
        email: `staff${i}@carenet.com`,
        password: "$2b$10$jIj0mCP13..EeaVPY2xXXeL/utB2tHgPAOyzHdthRgbQZG/bJZA4G",
        role: "staff",
        phone: `0902${(i + 100000).toString().slice(-6)}`,
        dob: getRandomDate(new Date(1985, 0, 1), new Date(2000, 11, 31)),
        isVerified: true,
        status: "ready",
        reputationPoints: 80 + Math.floor(Math.random() * 40),
        totalHours: Math.floor(Math.random() * 500),
        activityPoints: Math.floor(Math.random() * 300),
        hobbies: getRandomSubset(hobbies, Math.floor(Math.random() * 3) + 1),
        organizationId: getRandomElement(organizationIds),
      });

      const savedStaff = await staff.save();
      staffIds.push(savedStaff._id);
      
      if (i % 50 === 0) console.log(`✅ Inserted ${i} Staff members`);
    }

    // 4. INSERT VOLUNTEERS
    console.log('🔄 Inserting Volunteers...');
    const volunteerIds = [];

    for (let i = 1; i <= 500; i++) {
      const volunteer = new User({
        fullname: `Tình nguyện viên ${i}`,
        email: `volunteer${i}@gmail.com`,
        password: "$2b$10$jIj0mCP13..EeaVPY2xXXeL/utB2tHgPAOyzHdthRgbQZG/bJZA4G",
        role: "volunteer",
        phone: `0903${(i + 100000).toString().slice(-6)}`,
        cccdNumber: 123456789000 + i,
        dob: getRandomDate(new Date(1990, 0, 1), new Date(2005, 11, 31)),
        isVerified: true,
        status: "ready",
        reputationPoints: 50 + Math.floor(Math.random() * 150),
        totalHours: Math.floor(Math.random() * 200),
        activityPoints: Math.floor(Math.random() * 400),
        hobbies: getRandomSubset(hobbies, Math.floor(Math.random() * 4) + 1),
      });

      const savedVolunteer = await volunteer.save();
      volunteerIds.push(savedVolunteer._id);
      
      if (i % 100 === 0) console.log(`✅ Inserted ${i} Volunteers`);
    }

    // 5. INSERT EVENTS
    console.log('🔄 Inserting Events...');
    const eventIds = [];

    for (let i = 1; i <= 300; i++) {
      const startDate = getRandomDate(new Date(), new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));
      const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 8) + 1) * 60 * 60 * 1000);
      
      const selectedQuestions = getRandomSubset(eventQuestions, Math.floor(Math.random() * 3) + 2);
      
      const event = new Event({
        title: `${getRandomElement(eventTitles)} ${i}`,
        description: `Mô tả chi tiết cho sự kiện ${i}. Chúng tôi cần tình nguyện viên có trách nhiệm và nhiệt tình.`,
        category: getRandomElement(categories),
        skillNeeds: getRandomSubset(skills, Math.floor(Math.random() * 4) + 2),
        organizationId: getRandomElement(organizationIds),
        assignChecker: getRandomElement(staffIds),
        startAt: startDate,
        endAt: endDate,
        location: getRandomRealAddress(),
        maxParticipants: Math.floor(Math.random() * 50) + 10,
        currentParticipants: 0,
        formData: {
          questions: selectedQuestions
        },
        // ✅ Sử dụng đúng enum values từ Event model
        status: getRandomElement(["hiring", "processing", "completed", "cancelled"]), 
        adminStatus: getRandomElement(["pending", "approved", "rejected"]),
        rating: 4.0 + Math.random() * 1.0,
        images: [],
      });

      const savedEvent = await event.save();
      eventIds.push(savedEvent._id);
      
      if (i % 50 === 0) console.log(`✅ Inserted ${i} Events`);
    }

    // 6. INSERT EVENT REGISTRATIONS
    console.log('🔄 Inserting Event Registrations...');
    let registrationCount = 0;

    for (const eventId of eventIds) {
      const event = await Event.findById(eventId);
      
      // Chỉ tạo registration cho events đã approved
      if (event.adminStatus === "approved") {
        const numRegistrations = Math.floor(Math.random() * 15) + 5;
        
        for (let j = 0; j < numRegistrations; j++) {
          // ✅ Sửa answers theo format trong model - chỉ là array of strings
          const answers = event.formData.questions.map(q => {
            let answer;
            if (q.type === "radio" || q.type === "checkbox") {
              answer = getRandomElement(q.options);
            } else {
              answer = `Câu trả lời mẫu cho "${q.question}"`;
            }
            return answer; // ✅ Chỉ return string, không phải object
          });

          const registration = new EventRegistration({
            user: getRandomElement(volunteerIds),
            event: eventId,
            // ✅ Sử dụng đúng field name: registeredAt thay vì registrationDate
            registeredAt: getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()),
            // ✅ Sử dụng đúng enum values
            status: getRandomElement(["pending", "approved", "rejected", "cancelled", "pendingCancel"]),
            answers: answers, // ✅ Array of strings
          });

          await registration.save();
          registrationCount++;

          // Update event currentParticipants nếu approved
          if (registration.status === "approved") {
            await Event.findByIdAndUpdate(eventId, {
              $inc: { currentParticipants: 1 }
            });
          }
        }
      }
    }

    console.log(`✅ Inserted ${registrationCount} Event Registrations`);

    // 7. INSERT ATTENDANCES  
    console.log('🔄 Inserting Attendances...');
    const approvedRegistrations = await EventRegistration.find({ status: "approved" }).populate('event');
    let attendanceCount = 0;

    for (const registration of approvedRegistrations) {
      const attendance = new Attendance({
        userId: registration.user,
        eventId: registration.event._id,
        checkInTime: null,
        checkOutTime: null,
        status: getRandomElement(["registered", "attended", "absent"]),
        // ✅ levelRating là String enum, không phải Number
        levelRating: getRandomElement(["Very Good", "Good", "Average", "Bad", "Very Bad"]),
        message: null,
      });

      if (attendance.status === "attended") {
        const event = registration.event;
        attendance.checkInTime = event.startAt;
        attendance.checkOutTime = new Date(event.startAt.getTime() + 2 * 60 * 60 * 1000);
      }

      await attendance.save();
      attendanceCount++;
    }

    console.log(`✅ Inserted ${attendanceCount} Attendances`);

    // 8. INSERT HISTORY EVENTS
    console.log('🔄 Inserting History Events...');
    const attendedRecords = await Attendance.find({ status: "attended" }).populate('eventId');
    let historyCount = 0;

    for (const attendance of attendedRecords) {
      const event = attendance.eventId;
      
      const historyEvent = new HistoryEvent({
        user: attendance.userId,     // Thay vì userId
        event: attendance.eventId,   // Thay vì eventId
        organizationId: event.organizationId,
        title: event.title,
        description: event.description,
        startAt: event.startAt,
        endAt: event.endAt,
        location: event.location,
        role: "volunteer",
        rating: attendance.levelRating,
        feedback: `Feedback cho sự kiện ${event.title}`,
        hoursContributed: Math.floor((event.endAt - event.startAt) / (1000 * 60 * 60)),
        certificateId: null,
      });

      const savedHistory = await historyEvent.save();
      historyCount++;

      // Update user historyEvents
      await User.findByIdAndUpdate(attendance.userId, {
        $push: { historyEvents: savedHistory._id }
      });
    }

    console.log(`✅ Inserted ${historyCount} History Events`);

    console.log('\n🎉 ===== INSERT DATA SUMMARY =====');
    console.log(`📊 Organization Levels: ${organizationLevelIds.length}`);
    console.log(`🏢 Organizations: ${organizationIds.length}`);
    console.log(`👥 Staff: ${staffIds.length}`);
    console.log(`🙋 Volunteers: ${volunteerIds.length}`);
    console.log(`📅 Events: ${eventIds.length}`);
    console.log(`📝 Event Registrations: ${registrationCount}`);
    console.log(`✅ Attendances: ${attendanceCount}`);
    console.log(`📚 History Events: ${historyCount}`);
    console.log('\n✨ All data inserted successfully!');

  } catch (error) {
    console.error('❌ Error inserting data:', error);
    throw error;
  }
}

// Main function
async function main() {
  try {
    await connectDB();
    await insertData();
  } catch (error) {
    console.error('❌ Main function error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { insertData };
