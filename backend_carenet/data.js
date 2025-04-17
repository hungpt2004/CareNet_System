// LEVEL ORGANIZATION
const organizationLevelIds = [
  ObjectId("67fa6d0994cb16b77d0f20df"),
  ObjectId("67fa6d0994cb16b77d0f20e0"),
];

// VOLUNTEER
const userIds = [
  ObjectId("67fa3d702cce68cd14c998e7"),
  ObjectId("67fa471a46145ca7c43163f1"),
  ObjectId("67fa90af4073bc8d18685877"),
  ObjectId("67fe21fb3b596870e54360e6"),
  ObjectId("67fe22763b596870e54360ea"),
];

// STAFF / HR
const checkerIds = [
  ObjectId("67fba63fc77384a09910ff3d"),
  ObjectId("67fba673c77384a09910ff41"),
  ObjectId("67fba69dc77384a09910ff45"),
  ObjectId("67fba6b2c77384a09910ff49"),
  ObjectId("67fba6c5c77384a09910ff4d"),
  ObjectId("67fba6d5c77384a09910ff51"),
  ObjectId("67fba6f5c77384a09910ff55"),
];

// ORGANIZATION
const organizationUserIds = [
  ObjectId("67fd26a93235b4c3a05f2ca8"),
  ObjectId("67fd270b3235b4c3a05f2cad"),
  ObjectId("67fd36d37bb49651da0e9914"),
  ObjectId("67fd379b34e364e936dc192d"),
  ObjectId("67fd37cf34e364e936dc1931"),
  ObjectId("67fd385334e364e936dc1935"),
];

// GIAY PHEP
const licenseDocumentUrl = [
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fanmedia.vn%2Fgiay-phep-to-chuc-su-kien%2F&psig=AOvVaw0gq85duXCPB0akBOMWxHwr&ust=1744605207125000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLj52f6W1IwDFQAAAAAdAAAAABAE",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.brandsvietnam.com%2Fcongdong%2Ftopic%2F339521-quy-trinh-xin-giay-phep-to-chuc-su-kien-cap-nhat-nam-2024&psig=AOvVaw0gq85duXCPB0akBOMWxHwr&ust=1744605207125000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLj52f6W1IwDFQAAAAAdAAAAABAd",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.dac.vn%2Fvi%2Fgioithieu%2Fhosophaply%2F2009%2F07%2F1E82131D%2F&psig=AOvVaw1eqlcqwkTa0QRQyWpUQ1EG&ust=1744605260063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCJC1tJiX1IwDFQAAAAAdAAAAABCYAQ",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fluatthanhdo.com.vn%2Fgiay-phep-xuat-khau-lao-dong&psig=AOvVaw1eqlcqwkTa0QRQyWpUQ1EG&ust=1744605260063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCJC1tJiX1IwDFQAAAAAdAAAAABCiAQ",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnewworldltd.edu.vn%2Ftin-tuc%2Fgiay-phep-hoat-dong%2F&psig=AOvVaw1eqlcqwkTa0QRQyWpUQ1EG&ust=1744605260063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCJC1tJiX1IwDFQAAAAAdAAAAABCsAQ",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsyt.daknong.gov.vn%2Fdanh-muc-phai%2Fthong-bao%2Fthong-bao-ve-viec-tam-ngung-tiep-nhan-ho-so-de-nghi-cap-giay-phep-hanh-nghe-cap-giay-phep-hoat-dong-kham-benh-chua-benh-.html&psig=AOvVaw1eqlcqwkTa0QRQyWpUQ1EG&ust=1744605260063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCJC1tJiX1IwDFQAAAAAdAAAAABC2AQ",
  "https://www.google.com/url?sa=i&url=http%3A%2F%2Fluattuvan.vn%2Fgiay-phep-nghe.html&psig=AOvVaw1eqlcqwkTa0QRQyWpUQ1EG&ust=1744605260063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCJC1tJiX1IwDFQAAAAAdAAAAABDUAQ",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftinphatgroup.com.vn%2Fgiay-phep-hoat-dong.htm&psig=AOvVaw1eqlcqwkTa0QRQyWpUQ1EG&ust=1744605260063000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqGAoTCJC1tJiX1IwDFQAAAAAdAAAAABDeAQ",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcongchung.edu.vn%2Fmau-hop-dong-hop-dong-mau-moi-nhat-theo-quy-dinh-cua-phap-luat%2F&psig=AOvVaw1jOn2ZSsFMmTQf38LnqX6D&ust=1744605395169000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCqs9iX1IwDFQAAAAAdAAAAABAE",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fluatthanhcong.com%2Fmau-hop-dong-lao-dong-chuan-theo-bo-luat%2F&psig=AOvVaw1jOn2ZSsFMmTQf38LnqX6D&ust=1744605395169000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCqs9iX1IwDFQAAAAAdAAAAABAI",
];

// LOCATION
const streets = [
  "Nguyễn Văn Linh",
  "Trần Phú",
  "Lê Duẩn",
  "Hùng Vương",
  "Lê Đình Dương",
  "Nguyễn Chí Thanh",
  "Hoàng Diệu",
  "Ngô Quyền",
  "Trưng Nữ Vương",
  "Lê Lợi",
  "Đống Đa",
  "Trần Cao Vân",
  "Nguyễn Thị Minh Khai",
  "Phan Châu Trinh",
  "Lê Hồng Phong",
  "Điện Biên Phủ",
  "Nguyễn Văn Thoại",
  "Võ Nguyên Giáp",
  "Hoàng Sa",
  "Trần Hưng Đạo",
  "Nguyễn Hữu Thọ",
  "Nguyễn Tri Phương",
  "Lý Thường Kiệt",
  "Trần Bình Trọng",
  "Hàm Nghi",
  "Bạch Đằng",
  "Lê Độ",
  "Nguyễn Công Trứ",
  "Phạm Văn Nghị",
  "Yên Bái",
  "Lê Thanh Nghị",
  "Nguyễn Thị Định",
  "Tôn Đức Thắng",
  "Nguyễn Văn Cừ",
  "Lê Đại Hành",
  "Nguyễn Tất Thành",
  "Nguyễn Văn Linh",
  "Điện Biên Phủ",
  "Lê Hữu Trác",
  "Nguyễn Văn Thoại",
];

const wards = [
  "Hải Châu I",
  "Hải Châu II",
  "Thạch Thang",
  "Thuận Phước",
  "Phước Ninh",
  "Hòa Thuận Đông",
  "Hòa Thuận Tây",
  "Nam Dương",
  "Bình Hiên",
  "Bình Thuận",
  "Hòa Cường Bắc",
  "Hòa Cường Nam",
  "Thanh Bình",
  "Vĩnh Trung",
  "Thạc Gián",
  "Chính Gián",
  "An Khê",
  "Tam Thuận",
  "Tân Chính",
  "An Hải Bắc",
  "An Hải Tây",
  "An Hải Đông",
  "Mân Thái",
  "Phước Mỹ",
  "Nại Hiên Đông",
  "Mỹ An",
  "Khuê Mỹ",
  "Hòa Hải",
  "Hòa Quý",
  "Hòa Phát",
  "Hòa Thọ Đông",
  "Hòa Thọ Tây",
  "Hòa Xuân",
  "Hòa Khánh Bắc",
  "Hòa Khánh Nam",
  "Hòa Minh",
  "Khuê Trung",
];

const districts = [
  "Hải Châu",
  "Thanh Khê",
  "Sơn Trà",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
  "Liên Chiểu",
  "Hòa Vang",
];

const postCodeDaNang = [
  "50000",
  "55200",
  "50217",
  "555700",
  "50506",
  "557737",
  "550000",
  "840511",
];

const orgNames = [
  "Hội Chữ thập đỏ Việt Nam",
  "Tổ chức Tầm nhìn Thế giới Việt Nam",
  "Trung tâm Nâng cao Năng lực Cộng đồng",
  "Hội Bảo trợ Trẻ em Việt Nam",
  "Tổ chức Cứu trợ Trẻ em",
  "Quỹ Bảo trợ Trẻ em Việt Nam",
  "Hội Bảo vệ Quyền Trẻ em Việt Nam",
  "Trung tâm Giáo dục và Phát triển",
  "Tổ chức Oxfam tại Việt Nam",
  "Hội Người khuyết tật Việt Nam",
  "Quỹ Vì Tầm vóc Việt",
  "Trung tâm Hỗ trợ Phát triển Cộng đồng LIN",
  "Tổ chức Plan International Việt Nam",
  "Hội Phụ nữ Việt Nam",
  "Quỹ Phòng chống Thiên tai",
  "Trung tâm Sống và Học tập vì Môi trường và Cộng đồng",
  "Tổ chức CARE Quốc tế tại Việt Nam",
  "Hội Nạn nhân chất độc da cam/dioxin Việt Nam",
  "Quỹ Bảo vệ và Phát triển rừng",
  "Trung tâm Nghiên cứu Giới và Xã hội",
  "Tổ chức Hướng tới Minh bạch",
  "Hội Bảo vệ Thiên nhiên và Môi trường Việt Nam",
  "Quỹ Hỗ trợ Chương trình, Dự án Việt Nam",
  "Trung tâm Nghiên cứu Phát triển Bền vững",
  "Tổ chức Hỗ trợ Phát triển Y tế Việt Nam",
  "Hội Kế hoạch hóa Gia đình Việt Nam",
  "Quỹ Sữa Vươn Cao Việt Nam",
  "Trung tâm Nghiên cứu và Ứng dụng Khoa học về Giới",
  "Tổ chức Phát triển Nông thôn Bền vững",
  "Hội Người cao tuổi Việt Nam",
  "Quỹ Bảo trợ Nạn nhân Thiên tai",
  "Trung tâm Hỗ trợ Giáo dục và Nâng cao Năng lực Phụ nữ",
  "Tổ chức Bảo tồn Thiên nhiên Quốc tế tại Việt Nam",
  "Hội Nông dân Việt Nam",
  "Quỹ Học bổng Vừ A Dính",
  "Trung tâm Nghiên cứu và Tư vấn Quản lý Tài nguyên",
  "Tổ chức Phát triển Hợp tác Kinh tế Việt Nam",
  "Hội Cứu trợ Trẻ em tàn tật Việt Nam",
  "Quỹ Bảo vệ Môi trường Việt Nam",
  "Trung tâm Hỗ trợ Phát triển Thanh niên",
  "Tổ chức Giáo dục và Đào tạo Việt Nam-Hàn Quốc",
  "Hội Bảo trợ Bệnh nhân nghèo",
  "Quỹ Khuyến học Việt Nam",
  "Trung tâm Nghiên cứu và Phát triển Cộng đồng",
  "Tổ chức Hỗ trợ Người khuyết tật Việt Nam",
  "Hội Liên hiệp Thanh niên Việt Nam",
  "Quỹ Vì Người nghèo",
  "Trung tâm Nghiên cứu Giáo dục và Phát triển",
  "Tổ chức Phát triển Nông nghiệp Việt Nam",
  "Hội Bảo vệ Quyền lợi Người tiêu dùng",
  "Quỹ Bảo trợ Trẻ em mồ côi",
  "Trung tâm Hỗ trợ Phát triển Giáo dục Hòa nhập",
  "Tổ chức Hỗ trợ Phụ nữ và Trẻ em",
  "Hội Chống HIV/AIDS Việt Nam",
  "Quỹ Bảo vệ Động vật hoang dã",
  "Trung tâm Nghiên cứu và Phát triển Y tế",
  "Tổ chức Phát triển Du lịch Bền vững",
  "Hội Bảo vệ Di sản Văn hóa",
  "Quỹ Hỗ trợ Sáng tạo Khoa học Kỹ thuật",
  "Trung tâm Nghiên cứu Kinh tế và Xã hội",
  "Tổ chức Phát triển Giáo dục và Văn hóa",
  "Hội Bảo vệ Môi trường Đô thị",
  "Quỹ Hỗ trợ Tài năng trẻ",
  "Trung tâm Nghiên cứu và Phát triển Nông thôn",
  "Tổ chức Hỗ trợ Người cao tuổi",
  "Hội Bảo vệ Người tiêu dùng",
  "Quỹ Phát triển Thanh niên",
  "Trung tâm Nghiên cứu và Ứng dụng Khoa học Xã hội",
  "Tổ chức Phát triển Cộng đồng Dân tộc thiểu số",
  "Hội Bảo vệ Di sản Thiên nhiên",
  "Quỹ Hỗ trợ Giáo dục Trẻ em nghèo",
  "Trung tâm Nghiên cứu và Phát triển Giáo dục",
  "Tổ chức Hỗ trợ Người khuyết tật vận động",
  "Hội Bảo vệ Di sản Văn hóa Phi vật thể",
  "Quỹ Hỗ trợ Phát triển Giáo dục",
  "Trung tâm Nghiên cứu và Phát triển Du lịch",
  "Tổ chức Hỗ trợ Phát triển Nông nghiệp Sạch",
  "Hội Bảo vệ Di sản Kiến trúc",
  "Quỹ Hỗ trợ Sáng tạo Văn học Nghệ thuật",
  "Trung tâm Nghiên cứu và Phát triển Văn hóa",
  "Tổ chức Hỗ trợ Phát triển Giáo dục Mầm non",
  "Hội Bảo vệ Di sản Biển đảo",
  "Quỹ Hỗ trợ Phát triển Thể thao",
  "Trung tâm Nghiên cứu và Phát triển Thể thao",
  "Tổ chức Hỗ trợ Phát triển Âm nhạc Dân tộc",
  "Hội Bảo vệ Di sản Ẩm thực",
  "Quỹ Hỗ trợ Phát triển Điện ảnh",
  "Trung tâm Nghiên cứu và Phát triển Nghệ thuật",
  "Tổ chức Hỗ trợ Phát triển Văn hóa Đọc",
  "Hội Bảo vệ Di sản Nghề truyền thống",
  "Quỹ Hỗ trợ Phát triển Sân khấu",
  "Trung tâm Nghiên cứu và Phát triển Mỹ thuật",
  "Tổ chức Hỗ trợ Phát triển Nghệ thuật Biểu diễn",
  "Hội Bảo vệ Di sản Lịch sử",
  "Quỹ Hỗ trợ Phát triển Nhiếp ảnh",
  "Trung tâm Nghiên cứu và Phát triển Kiến trúc",
  "Tổ chức Hỗ trợ Phát triển Thủ công mỹ nghệ",
  "Hội Bảo vệ Di sản Văn hóa Dân gian",
  "Quỹ Hỗ trợ Phát triển Văn hóa các Dân tộc",
];

const orgDescriptions = [
  "Tổ chức phi lợi nhuận chuyên hỗ trợ phát triển cộng đồng dân cư ven biển Đà Nẵng thông qua các chương trình giáo dục môi trường và đào tạo nghề truyền thống.",
  "Chúng tôi tập trung vào việc bảo tồn hệ sinh thái biển tại vịnh Đà Nẵng bằng cách tổ chức các chiến dịch làm sạch bãi biển hàng tháng và giáo dục ngư dân địa phương về đánh bắt bền vững.",
  "Tổ chức này được thành lập với sứ mệnh cung cấp học bổng và hỗ trợ giáo dục toàn diện cho trẻ em có hoàn cảnh khó khăn tại các vùng nông thôn ven đô Đà Nẵng.",
  "Chuyên tổ chức các khóa đào tạo kỹ năng mềm và định hướng nghề nghiệp miễn phí cho thanh niên địa phương, giúp họ tự tin bước vào thị trường lao động.",
  "Hoạt động với mục tiêu bảo tồn và phát huy các giá trị văn hóa truyền thống của cộng đồng người Chăm tại khu vực Đà Nẵng và các tỉnh lân cận.",
  "Tập trung vào các dự án phát triển cơ sở hạ tầng giáo dục tại vùng sâu vùng xa, xây dựng trường học và cung cấp trang thiết bị học tập cần thiết.",
  "Tổ chức từ thiện chuyên hỗ trợ y tế cho người già neo đơn và trẻ em mồ côi thông qua các phòng khám lưu động và chương trình khám chữa bệnh miễn phí định kỳ.",
  "Thúc đẩy phong trào khởi nghiệp trong giới trẻ bằng cách tổ chức các cuộc thi ý tưởng kinh doanh, cung cấp vốn seed và đào tạo kỹ năng quản lý doanh nghiệp.",
  "Chuyên nghiên cứu và ứng dụng các giải pháp công nghệ cao vào nông nghiệp để giúp nông dân địa phương nâng cao năng suất và chất lượng sản phẩm.",
  "Tổ chức các hoạt động giao lưu văn hóa quốc tế, tạo cơ hội cho thanh niên Đà Nẵng mở rộng tầm nhìn và phát triển kỹ năng ngoại ngữ.",
  "Chuyên hỗ trợ phụ nữ đơn thân và nạn nhân bạo lực gia đình thông qua các khóa học nghề, tư vấn tâm lý và giới thiệu việc làm phù hợp.",
  "Phát triển hệ thống thư viện cộng đồng và tổ chức các buổi đọc sách định kỳ nhằm xây dựng văn hóa đọc cho trẻ em tại các khu vực khó khăn.",
  "Tập trung vào việc bảo tồn các công trình kiến trúc cổ tại Đà Nẵng thông qua các dự án trùng tu và chương trình giáo dục di sản cho cộng đồng.",
  "Tổ chức các lớp học ngoại khóa về khoa học công nghệ cho học sinh tiểu học và trung học cơ sở, khơi dậy đam mê nghiên cứu khoa học từ sớm.",
  "Chuyên hỗ trợ người khuyết tật thông qua các chương trình đào tạo nghề phù hợp, tư vấn việc làm và vận động xã hội thay đổi nhận thức về người khuyết tật.",
  "Phát triển các mô hình du lịch cộng đồng bền vững, giúp người dân địa phương khai thác tiềm năng du lịch một cách có trách nhiệm và hiệu quả.",
  "Tổ chức các chương trình đào tạo kỹ năng sống và giáo dục giới tính toàn diện cho thanh thiếu niên, giúp các em có kiến thức và kỹ năng tự bảo vệ bản thân.",
  "Chuyên nghiên cứu và phát triển các giải pháp năng lượng tái tạo phù hợp với điều kiện địa phương, góp phần giảm thiểu tác động của biến đổi khí hậu.",
  "Tổ chức các hoạt động thể thao cộng đồng nhằm nâng cao sức khỏe và tạo sân chơi lành mạnh cho thanh thiếu niên tại các khu vực đô thị.",
  "Chuyên hỗ trợ phát triển các làng nghề truyền thống thông qua việc cải tiến mẫu mã sản phẩm, đào tạo kỹ thuật và kết nối thị trường tiêu thụ.",
  "Tập trung vào các chương trình giáo dục dinh dưỡng và cải thiện bữa ăn học đường cho trẻ em tại các trường học vùng khó khăn.",
  "Phát triển hệ thống hỗ trợ pháp lý miễn phí cho người nghèo và các đối tượng yếu thế trong xã hội, giúp họ tiếp cận công lý một cách bình đẳng.",
  "Tổ chức các chương trình đào tạo kỹ năng công nghệ thông tin cho người cao tuổi, giúp họ hòa nhập với xã hội số và kết nối với con cháu.",
  "Chuyên nghiên cứu và bảo tồn đa dạng sinh học tại các khu rừng ngập mặn ven biển Đà Nẵng thông qua các chương trình trồng rừng và giáo dục môi trường.",
  "Phát triển các mô hình nông nghiệp đô thị và vườn rau cộng đồng, giúp người dân thành phố tiếp cận với thực phẩm sạch và lành mạnh.",
  "Tổ chức các lớp học tiếng Anh miễn phí cho trẻ em nghèo, giúp các em có cơ hội tiếp cận với ngôn ngữ toàn cầu và mở rộng tương lai.",
  "Chuyên hỗ trợ tâm lý và pháp lý cho nạn nhân của nạn buôn người, giúp họ tái hòa nhập cộng đồng và xây dựng cuộc sống mới.",
  "Phát triển các chương trình giáo dục âm nhạc và nghệ thuật cho trẻ em khuyết tật, giúp các em phát triển năng khiếu và tự tin thể hiện bản thân.",
  "Tổ chức các hoạt động giao lưu văn hóa giữa các dân tộc thiểu số, góp phần bảo tồn và phát huy bản sắc văn hóa các dân tộc tại khu vực miền Trung.",
  "Chuyên nghiên cứu và phát triển các giải pháp nhà ở giá rẻ cho người thu nhập thấp, giúp họ có chỗ ở ổn định và an toàn.",
  "Tập trung vào việc đào tạo kỹ năng lãnh đạo và quản lý dự án cho thanh niên, chuẩn bị nguồn nhân lực chất lượng cao cho sự phát triển của địa phương.",
  "Phát triển các chương trình hỗ trợ tinh thần và vật chất cho bệnh nhân ung thư và gia đình họ, giúp họ vượt qua khó khăn trong quá trình điều trị.",
  "Tổ chức các khóa đào tạo kỹ năng an toàn giao thông và sơ cấp cứu cho học sinh và người dân địa phương, góp phần giảm thiểu tai nạn giao thông.",
  "Chuyên nghiên cứu và ứng dụng các phương pháp giáo dục tiên tiến vào giảng dạy tại các trường học địa phương, nâng cao chất lượng giáo dục toàn diện.",
  "Phát triển các mô hình kinh tế tuần hoàn tại cộng đồng, khuyến khích tái chế và tái sử dụng rác thải để bảo vệ môi trường và tạo thu nhập.",
  "Tổ chức các chương trình đào tạo kỹ năng sống sót trong thiên tai và biến đổi khí hậu cho cộng đồng ven biển, giúp họ chủ động ứng phó với rủi ro.",
  "Chuyên hỗ trợ phát triển các sản phẩm thủ công mỹ nghệ địa phương, kết nối nghệ nhân với thị trường trong nước và quốc tế để nâng cao thu nhập.",
  "Phát triển các chương trình giáo dục giới tính và sức khỏe sinh sản cho thanh thiếu niên vùng sâu vùng xa, giúp các em có kiến thức toàn diện về sức khỏe.",
  "Tổ chức các hoạt động giao lưu thể thao và văn hóa cho người khuyết tật, giúp họ tự tin hòa nhập cộng đồng và phát huy năng lực bản thân.",
  "Chuyên nghiên cứu và phát triển các giống cây trồng vật nuôi bản địa có giá trị kinh tế cao, giúp nông dân nâng cao thu nhập và bảo tồn nguồn gen quý.",
  "Phát triển các chương trình đào tạo nghề du lịch và dịch vụ cho thanh niên địa phương, chuẩn bị nguồn nhân lực chất lượng cho ngành du lịch đang phát triển.",
  "Tổ chức các hoạt động thiện nguyện thường niên như hiến máu nhân đạo, khám chữa bệnh miễn phí và trao quà cho người nghèo vào dịp lễ tết.",
  "Chuyên hỗ trợ tư vấn tâm lý và pháp lý cho các gia đình có người thân mắc bệnh hiểm nghèo, giúp họ vượt qua khủng hoảng và tìm kiếm sự giúp đỡ.",
  "Phát triển các mô hình trồng rau sạch và chăn nuôi an toàn tại các trường học, vừa cung cấp thực phẩm sạch vừa giáo dục học sinh về nông nghiệp bền vững.",
  "Tổ chức các lớp học ngoại ngữ và kỹ năng mềm miễn phí cho người lao động nhập cư, giúp họ hòa nhập tốt hơn với cuộc sống đô thị.",
  "Chuyên nghiên cứu và phát triển các sản phẩm du lịch trải nghiệm văn hóa địa phương, tạo cơ hội cho du khách hiểu sâu hơn về đời sống cộng đồng.",
  "Phát triển các chương trình đào tạo kỹ năng sống cho trẻ em mồ côi và trẻ em có hoàn cảnh đặc biệt, giúp các em tự lập và vững vàng trước cuộc sống.",
  "Tổ chức các hoạt động bảo tồn và phát huy giá trị di sản văn hóa phi vật thể như dân ca, điệu múa truyền thống của các dân tộc thiểu số.",
  "Chuyên hỗ trợ xây dựng hệ thống nước sạch và vệ sinh môi trường tại các vùng nông thôn khó khăn, cải thiện điều kiện sống cho người dân.",
  "Phát triển các chương trình đào tạo kỹ năng sử dụng internet an toàn và hiệu quả cho người cao tuổi và trẻ em, giúp họ tránh các rủi ro trực tuyến.",
  "Tổ chức các hoạt động giao lưu văn hóa ẩm thực giữa các vùng miền, quảng bá nét đẹp ẩm thực địa phương và thúc đẩy du lịch ẩm thực.",
  "Chuyên nghiên cứu và ứng dụng công nghệ thông tin vào quản lý rác thải đô thị, góp phần xây dựng thành phố thông minh và bền vững.",
  "Phát triển các chương trình đào tạo kỹ năng làm cha mẹ cho các cặp vợ chồng trẻ, giúp họ có kiến thức chăm sóc và giáo dục con cái tốt hơn.",
  "Tổ chức các hoạt động thể thao và vui chơi giải trí lành mạnh cho thanh thiếu niên vào dịp hè, giúp các em có mùa hè bổ ích và an toàn.",
  "Chuyên hỗ trợ phát triển các sản phẩm nông nghiệp hữu cơ, kết nối nông dân với thị trường tiêu thụ ổn định và giá trị cao.",
  "Phát triển các chương trình giáo dục lịch sử địa phương thông qua các hoạt động trải nghiệm thực tế, giúp học sinh hiểu và yêu quê hương hơn.",
  "Tổ chức các lớp học tình thương cho trẻ em lang thang cơ nhỡ, giúp các em có cơ hội học tập và hòa nhập với xã hội.",
  "Chuyên nghiên cứu và phát triển các giải pháp nhà ở chống bão lũ cho cộng đồng ven biển, giúp họ an toàn hơn trong mùa mưa bão.",
  "Phát triển các chương trình đào tạo kỹ năng sống cho học sinh tiểu học, giúp các em tự tin, độc lập và có trách nhiệm với bản thân.",
  "Tổ chức các hoạt động giao lưu văn hóa giữa các thế hệ, kết nối người già và trẻ em để chia sẻ kinh nghiệm sống và giá trị truyền thống.",
  "Chuyên hỗ trợ phát triển các mô hình kinh tế tập thể tại nông thôn, giúp nông dân liên kết sản xuất và tiêu thụ sản phẩm hiệu quả hơn.",
  "Phát triển các chương trình giáo dục phòng chống xâm hại trẻ em, trang bị kiến thức và kỹ năng tự bảo vệ cho các em và phụ huynh.",
  "Tổ chức các hoạt động thiện nguyện chăm sóc sức khỏe cho người già neo đơn tại các trung tâm bảo trợ xã hội, mang lại niềm vui tuổi già.",
  "Chuyên nghiên cứu và phát triển các sản phẩm thủ công từ vật liệu tái chế, vừa bảo vệ môi trường vừa tạo thu nhập cho người lao động.",
  "Phát triển các chương trình đào tạo kỹ năng quản lý tài chính cá nhân cho thanh niên, giúp họ sử dụng tiền bạc hợp lý và hiệu quả.",
  "Tổ chức các hoạt động trồng cây xanh đô thị và chăm sóc công viên, góp phần làm đẹp cảnh quan và cải thiện môi trường sống.",
  "Chuyên hỗ trợ phát triển các sản phẩm du lịch cộng đồng, tạo cơ hội cho người dân địa phương tham gia và hưởng lợi từ du lịch.",
  "Phát triển các chương trình giáo dục hòa nhập cho trẻ em khuyết tật, giúp các em có cơ hội học tập bình đẳng như các bạn cùng trang lứa.",
  "Tổ chức các hoạt động giao lưu văn nghệ và thể thao cho công nhân khu công nghiệp, giúp họ giải tỏa căng thẳng và có đời sống tinh thần phong phú.",
  "Chuyên nghiên cứu và phát triển các giải pháp nông nghiệp thông minh thích ứng với biến đổi khí hậu, giúp nông dân giảm thiểu rủi ro.",
  "Phát triển các chương trình đào tạo kỹ năng sơ cấp cứu và phòng chống tai nạn thương tích cho cộng đồng, nâng cao khả năng tự cứu và cứu người.",
  "Tổ chức các hoạt động bảo tồn và phát huy nghệ thuật trình diễn dân gian truyền thống, tạo sân chơi cho các nghệ nhân và thế hệ trẻ.",
  "Chuyên hỗ trợ xây dựng các mô hình kinh tế xanh tại đô thị, khuyến khích sử dụng năng lượng sạch và giảm thiểu ô nhiễm môi trường.",
  "Phát triển các chương trình giáo dục kỹ năng sống cho trẻ em vùng cao, giúp các em tự tin hòa nhập và phát triển trong môi trường mới.",
  "Tổ chức các hoạt động giao lưu văn hóa giữa các tôn giáo, góp phần xây dựng khối đại đoàn kết dân tộc và tôn trọng sự khác biệt.",
  "Chuyên nghiên cứu và phát triển các sản phẩm du lịch sinh thái bền vững, bảo tồn thiên nhiên và mang lại lợi ích cho cộng đồng địa phương.",
  "Phát triển các chương trình đào tạo kỹ năng làm việc nhóm và giải quyết vấn đề cho thanh niên, chuẩn bị hành trang cho môi trường làm việc hiện đại.",
  "Tổ chức các hoạt động thiện nguyện chăm sóc và giáo dục trẻ em tại các trung tâm bảo trợ xã hội, mang lại niềm vui và hy vọng cho các em.",
  "Chuyên hỗ trợ phát triển các mô hình nuôi trồng thủy sản bền vững ven biển, giúp ngư dân nâng cao thu nhập và bảo vệ môi trường biển.",
  "Phát triển các chương trình giáo dục phòng chống bạo lực học đường, xây dựng môi trường học tập an toàn và thân thiện cho học sinh.",
  "Tổ chức các hoạt động giao lưu văn hóa giữa các dân tộc anh em, góp phần bảo tồn và phát huy bản sắc văn hóa các dân tộc thiểu số.",
  "Chuyên nghiên cứu và phát triển các giải pháp nhà ở tiết kiệm năng lượng, giúp người dân giảm chi phí sinh hoạt và bảo vệ môi trường.",
  "Phát triển các chương trình đào tạo kỹ năng giao tiếp và ứng xử văn hóa cho thanh niên, giúp họ tự tin và thành công trong cuộc sống.",
  "Tổ chức các hoạt động trồng và chăm sóc rừng ngập mặn ven biển, góp phần bảo vệ môi trường và giảm thiểu tác động của biến đổi khí hậu.",
  "Chuyên hỗ trợ phát triển các sản phẩm thủ công mỹ nghệ từ nguyên liệu địa phương, tạo việc làm và nâng cao thu nhập cho phụ nữ nông thôn.",
  "Phát triển các chương trình giáo dục phòng chống ma túy và tệ nạn xã hội cho thanh thiếu niên, giúp các em có lối sống lành mạnh.",
  "Tổ chức các hoạt động giao lưu thể thao và văn hóa cho người khuyết tật, giúp họ tự tin hòa nhập cộng đồng và phát huy năng lực bản thân.",
  "Chuyên nghiên cứu và phát triển các giống cây trồng vật nuôi bản địa có giá trị kinh tế cao, giúp nông dân nâng cao thu nhập và bảo tồn nguồn gen quý.",
  "Phát triển các chương trình đào tạo nghề du lịch và dịch vụ cho thanh niên địa phương, chuẩn bị nguồn nhân lực chất lượng cho ngành du lịch đang phát triển.",
  "Tổ chức các hoạt động thiện nguyện thường niên như hiến máu nhân đạo, khám chữa bệnh miễn phí và trao quà cho người nghèo vào dịp lễ tết.",
  "Chuyên hỗ trợ tư vấn tâm lý và pháp lý cho các gia đình có người thân mắc bệnh hiểm nghèo, giúp họ vượt qua khủng hoảng và tìm kiếm sự giúp đỡ.",
  "Phát triển các mô hình trồng rau sạch và chăn nuôi an toàn tại các trường học, vừa cung cấp thực phẩm sạch vừa giáo dục học sinh về nông nghiệp bền vững.",
  "Tổ chức các lớp học ngoại ngữ và kỹ năng mềm miễn phí cho người lao động nhập cư, giúp họ hòa nhập tốt hơn với cuộc sống đô thị.",
  "Chuyên nghiên cứu và phát triển các sản phẩm du lịch trải nghiệm văn hóa địa phương, tạo cơ hội cho du khách hiểu sâu hơn về đời sống cộng đồng.",
  "Phát triển các chương trình đào tạo kỹ năng sống cho trẻ em mồ côi và trẻ em có hoàn cảnh đặc biệt, giúp các em tự lập và vững vàng trước cuộc sống.",
  "Tổ chức các hoạt động bảo tồn và phát huy giá trị di sản văn hóa phi vật thể như dân ca, điệu múa truyền thống của các dân tộc thiểu số.",
  "Chuyên hỗ trợ xây dựng hệ thống nước sạch và vệ sinh môi trường tại các vùng nông thôn khó khăn, cải thiện điều kiện sống cho người dân.",
  "Phát triển các chương trình đào tạo kỹ năng sử dụng internet an toàn và hiệu quả cho người cao tuổi và trẻ em, giúp họ tránh các rủi ro trực tuyến.",
  "Tổ chức các hoạt động giao lưu văn hóa ẩm thực giữa các vùng miền, quảng bá nét đẹp ẩm thực địa phương và thúc đẩy du lịch ẩm thực.",
  "Chuyên nghiên cứu và ứng dụng công nghệ thông tin vào quản lý rác thải đô thị, góp phần xây dựng thành phố thông minh và bền vững.",
  "Phát triển các chương trình đào tạo kỹ năng làm cha mẹ cho các cặp vợ chồng trẻ, giúp họ có kiến thức chăm sóc và giáo dục con cái tốt hơn.",
  "Tổ chức các hoạt động thể thao và vui chơi giải trí lành mạnh cho thanh thiếu niên vào dịp hè, giúp các em có mùa hè bổ ích và an toàn.",
  "Chuyên hỗ trợ phát triển các sản phẩm nông nghiệp hữu cơ, kết nối nông dân với thị trường tiêu thụ ổn định và giá trị cao.",
  "Phát triển các chương trình giáo dục lịch sử địa phương thông qua các hoạt động trải nghiệm thực tế, giúp học sinh hiểu và yêu quê hương hơn.",
  "Tổ chức các lớp học tình thương cho trẻ em lang thang cơ nhỡ, giúp các em có cơ hội học tập và hòa nhập với xã hội.",
  "Chuyên nghiên cứu và phát triển các giải pháp nhà ở chống bão lũ cho cộng đồng ven biển, giúp họ an toàn hơn trong mùa mưa bão.",
  "Phát triển các chương trình đào tạo kỹ năng sống cho học sinh tiểu học, giúp các em tự tin, độc lập và có trách nhiệm với bản thân.",
  "Tổ chức các hoạt động giao lưu văn hóa giữa các thế hệ, kết nối người già và trẻ em để chia sẻ kinh nghiệm sống và giá trị truyền thống.",
  "Chuyên hỗ trợ phát triển các mô hình kinh tế tập thể tại nông thôn, giúp nông dân liên kết sản xuất và tiêu thụ sản phẩm hiệu quả hơn.",
  "Phát triển các chương trình giáo dục phòng chống xâm hại trẻ em, trang bị kiến thức và kỹ năng tự bảo vệ cho các em và phụ huynh.",
  "Tổ chức các hoạt động thiện nguyện chăm sóc sức khỏe cho người già neo đơn tại các trung tâm bảo trợ xã hội, mang lại niềm vui tuổi già.",
  "Chuyên nghiên cứu và phát triển các sản phẩm thủ công từ vật liệu tái chế, vừa bảo vệ môi trường vừa tạo thu nhập cho người lao động.",
  "Phát triển các chương trình đào tạo kỹ năng quản lý tài chính cá nhân cho thanh niên, giúp họ sử dụng tiền bạc hợp lý và hiệu quả.",
  "Tổ chức các hoạt động trồng cây xanh đô thị và chăm sóc công viên, góp phần làm đẹp cảnh quan và cải thiện môi trường sống.",
  "Chuyên hỗ trợ phát triển các sản phẩm du lịch cộng đồng, tạo cơ hội cho người dân địa phương tham gia và hưởng lợi từ du lịch.",
  "Phát triển các chương trình giáo dục hòa nhập cho trẻ em khuyết tật, giúp các em có cơ hội học tập bình đẳng như các bạn cùng trang lứa.",
  "Tổ chức các hoạt động giao lưu văn nghệ và thể thao cho công nhân khu công nghiệp, giúp họ giải tỏa căng thẳng và có đời sống tinh thần phong phú.",
  "Chuyên nghiên cứu và phát triển các giải pháp nông nghiệp thông minh thích ứng với biến đổi khí hậu, giúp nông dân giảm thiểu rủi ro.",
  "Phát triển các chương trình đào tạo kỹ năng sơ cấp cứu và phòng chống tai nạn thương tích cho cộng đồng, nâng cao khả năng tự cứu và cứu người.",
  "Tổ chức các hoạt động bảo tồn và phát huy nghệ thuật trình diễn dân gian truyền thống, tạo sân chơi cho các nghệ nhân và thế hệ trẻ.",
  "Chuyên hỗ trợ xây dựng các mô hình kinh tế xanh tại đô thị, khuyến khích sử dụng năng lượng sạch và giảm thiểu ô nhiễm môi trường.",
  "Phát triển các chương trình giáo dục kỹ năng sống cho trẻ em vùng cao, giúp các em tự tin hòa nhập và phát triển trong môi trường mới.",
  "Tổ chức các hoạt động giao lưu văn hóa giữa các tôn giáo, góp phần xây dựng khối đại đoàn kết dân tộc và tôn trọng sự khác biệt.",
  "Chuyên nghiên cứu và phát triển các sản phẩm du lịch sinh thái bền vững, bảo tồn thiên nhiên và mang lại lợi ích cho cộng đồng địa phương.",
  "Phát triển các chương trình đào tạo kỹ năng làm việc nhóm và giải quyết vấn đề cho thanh niên, chuẩn bị hành trang cho môi trường làm việc hiện đại.",
  "Tổ chức các hoạt động thiện nguyện chăm sóc và giáo dục trẻ em tại các trung tâm bảo trợ xã hội, mang lại niềm vui và hy vọng cho các em.",
];

const categories = [
  "Môi trường",
  "Giáo dục",
  "Cộng đồng",
  "Văn hóa",
  "Từ thiện",
  "Thể thao",
  "Nghệ thuật",
];

const eventTitles = [
  "Chiến dịch Làm sạch Bãi biển",
  "Hội thảo Kỹ năng Lãnh đạo",
  "Ngày hội Tình nguyện viên",
  "Trồng cây Xanh Thành phố",
  "Hỗ trợ Trẻ em Mồ côi",
  "Chạy bộ Vì Môi trường",
  "Workshop Nhiếp ảnh",
  "Festival Văn hóa Đà Nẵng",
  "Hội chợ Từ thiện",
  "Khóa học Kỹ năng Mềm",
  "Đêm nhạc Gây quỹ",
  "Triển lãm Công nghệ 4.0",
  "Diễn đàn Doanh nghiệp Trẻ",
  "Ngày hội Hiến máu",
  "Cuộc thi Sáng tạo Trẻ",
  "Lớp học Lập trình cho Trẻ",
  "Hội thảo Du học và Học bổng",
  "Ngày hội Việc làm",
  "Giải đấu Bóng đá Sinh viên",
  "Tuần lễ Sách và Tri thức",
  "Lễ hội Ẩm thực Đường phố",
  "Khóa học Thiền và Yoga",
  "Talkshow Khởi nghiệp",
  "Ngày hội STEM",
  "Festival Nghệ thuật Đương đại",
  "Hội nghị Bảo vệ Động vật",
  "Cuộc thi Nấu ăn Gia đình",
  "Ngày hội Gia đình",
  "Workshop Trang điểm Chuyên nghiệp",
  "Chương trình Ước mơ cho Em",
  "Khóa học Thiết kế Đồ họa",
  "Diễn đàn Nhà lãnh đạo Trẻ",
  "Ngày hội Viết chữ đẹp",
  "Cuộc thi Hùng biện Tiếng Anh",
  "Trại hè Kỹ năng sống",
  "Chương trình Tri ân Thầy Cô",
  "Hội chợ Công nghệ Xanh",
  "Hội thảo Tài chính Cá nhân",
  "Ngày hội Sinh viên Quốc tế",
  "Cuộc thi Lập trình Hackathon",
  "Sự kiện Giao lưu Văn hóa",
  "Chiến dịch Vì Trái Đất Xanh",
  "Chạy Marathon Thành phố",
  "Ngày hội Chụp ảnh Miễn phí",
  "Hội thảo Thiết kế UI/UX",
  "Triển lãm Ảnh Nghệ thuật",
  "Lớp học Làm Bánh",
  "Giải Cờ vua Học sinh",
  "Ngày hội Trải nghiệm Nghề nghiệp",
  "Workshop Làm Video Tiktok",
  "Sự kiện Tìm hiểu Văn hóa Nhật",
  "Khóa học Thuyết trình Hiệu quả",
  "Chương trình Khám sức khỏe Miễn phí",
  "Lớp học Vẽ Tranh Thiếu nhi",
  "Hội thảo Du lịch Bền vững",
  "Diễn đàn Công nghệ Thông tin",
  "Talkshow Truyền cảm hứng",
  "Chương trình Dọn rác Thành phố",
  "Sự kiện Giao lưu Sinh viên ASEAN",
  "Ngày hội Bảo vệ Động vật",
  "Workshop Làm Nến Thủ công",
  "Khóa học Làm phim ngắn",
  "Hội thi Robocon Học sinh",
  "Chương trình Tư vấn Tâm lý",
  "Hội chợ Hàng Việt Nam",
  "Cuộc thi Ảnh Thiên nhiên",
  "Festival Sáng tạo Trẻ",
  "Hội thảo Phát triển Bản thân",
  "Khóa học Tiếng Nhật Sơ cấp",
  "Sự kiện Đổi đồ cũ Lấy cây xanh",
  "Ngày hội Nghệ thuật Đường phố",
  "Talkshow Tình yêu Tuổi trẻ",
  "Workshop Kỹ năng Phỏng vấn",
  "Diễn đàn Nông nghiệp Sạch",
  "Cuộc thi Ảnh Du lịch",
  "Hội chợ Handmade",
  "Khóa học Marketing Online",
  "Chương trình “Tôi yêu Lịch sử Việt”",
  "Lớp học Kỹ năng Sống cho Trẻ",
  "Hội thảo Công nghệ Thực tế Ảo",
  "Cuộc thi Thiết kế Thời trang",
  "Triển lãm Kiến trúc Xanh",
  "Ngày hội Kết nối Doanh nghiệp",
  "Hội nghị Giáo dục Toàn cầu",
  "Workshop Tự tay Làm Đồ da",
  "Diễn đàn Đổi mới Sáng tạo",
  "Talkshow Hành trình Thành công",
  "Ngày hội Truyền thống Quê hương",
  "Chương trình Ca nhạc đường phố",
  "Hội chợ Giao lưu Kết bạn",
  "Cuộc thi Trang trí Lồng đèn",
  "Lớp học Kỹ năng Giao tiếp",
  "Hội thảo Viết CV & Resume",
  "Triển lãm Sản phẩm Học sinh",
  "Ngày hội Làm cha mẹ",
  "Giải Đua xe đạp Thiếu niên",
  "Cuộc thi Lập trình Game",
  "Chương trình Phát động Khởi nghiệp",
  "Sự kiện Kết nối Tình nguyện viên",
  "Workshop Làm Đồ chơi Tái chế",
  "Talkshow Nghề nghiệp và Định hướng",
  "Hội nghị Môi trường và Biến đổi Khí hậu",
];

const eventDescriptions = [
  "Cùng nhau làm sạch bãi biển, bảo vệ môi trường sống xanh.",
  "Khám phá và rèn luyện kỹ năng lãnh đạo cho giới trẻ.",
  "Nơi kết nối các tình nguyện viên đầy nhiệt huyết vì cộng đồng.",
  "Góp phần phủ xanh thành phố với hoạt động trồng cây ý nghĩa.",
  "Mang yêu thương đến với trẻ em có hoàn cảnh khó khăn.",
  "Tham gia chạy bộ gây quỹ vì một môi trường trong lành.",
  "Học cách chụp ảnh chuyên nghiệp cùng chuyên gia trong lĩnh vực.",
  "Khám phá văn hóa đặc sắc Đà Nẵng qua các hoạt động thú vị.",
  "Gây quỹ cho người nghèo qua các gian hàng từ thiện hấp dẫn.",
  "Phát triển kỹ năng mềm thiết yếu để thành công trong cuộc sống.",
  "Đêm nhạc từ thiện kết nối trái tim và sẻ chia yêu thương.",
  "Cập nhật những công nghệ tiên tiến và xu hướng tương lai.",
  "Gặp gỡ, học hỏi và kết nối cùng các doanh nhân trẻ thành đạt.",
  "Hiến máu cứu người – nghĩa cử cao đẹp lan tỏa yêu thương.",
  "Thỏa sức sáng tạo với các ý tưởng độc đáo, mới mẻ.",
  "Khơi dậy đam mê lập trình cho trẻ em thông qua hoạt động thực tế.",
  "Tư vấn toàn diện về học bổng và hành trình du học.",
  "Giao lưu với các nhà tuyển dụng và tìm kiếm cơ hội việc làm.",
  "Tranh tài trên sân cỏ, nâng cao tinh thần thể thao đoàn kết.",
  "Khơi nguồn tri thức, lan tỏa văn hóa đọc đến cộng đồng.",
  "Thưởng thức tinh hoa ẩm thực từ khắp vùng miền đất nước.",
  "Tái tạo năng lượng với yoga và thiền định trong không gian yên bình.",
  "Lắng nghe câu chuyện khởi nghiệp truyền cảm hứng từ các diễn giả.",
  "Khám phá khoa học, công nghệ và toán học qua trải nghiệm thực tế.",
  "Sân chơi cho nghệ sĩ trẻ thể hiện tài năng và sáng tạo.",
  "Nâng cao nhận thức về quyền và phúc lợi động vật.",
  "Cuộc thi nấu ăn hấp dẫn, kết nối các gia đình cùng nhau.",
  "Một ngày gắn kết yêu thương và sẻ chia bên gia đình.",
  "Học cách trang điểm chuyên nghiệp từ các chuyên gia đầu ngành.",
  "Tạo dựng tương lai tươi sáng cho trẻ em có hoàn cảnh khó khăn.",
  "Khám phá thế giới thiết kế đồ họa cùng chuyên gia trong ngành.",
  "Giao lưu, chia sẻ kinh nghiệm từ các nhà lãnh đạo trẻ tiêu biểu.",
  "Rèn luyện chữ viết, giữ gìn nét đẹp truyền thống Việt.",
  "Cơ hội rèn luyện kỹ năng nói tiếng Anh trước đám đông.",
  "Trại hè đầy ắp hoạt động vui chơi và học tập bổ ích.",
  "Bày tỏ lòng biết ơn với những người thầy đáng kính.",
  "Trưng bày và giới thiệu công nghệ thân thiện với môi trường.",
  "Hướng dẫn cách quản lý tài chính cá nhân hiệu quả.",
  "Không gian đa văn hóa dành cho sinh viên quốc tế gặp gỡ và giao lưu.",
  "Cạnh tranh lập trình sáng tạo trong thời gian giới hạn.",
  "Giao lưu văn hóa giữa các quốc gia và vùng miền.",
  "Chung tay hành động vì một hành tinh xanh hơn.",
  "Tham gia giải chạy quy mô lớn vì sức khỏe và môi trường.",
  "Cùng chụp ảnh nghệ thuật miễn phí với đội ngũ nhiếp ảnh gia chuyên nghiệp.",
  "Khám phá quy trình thiết kế giao diện người dùng hiện đại.",
  "Triển lãm ảnh nghệ thuật đặc sắc từ nhiều nhiếp ảnh gia tài năng.",
  "Tự tay học làm bánh và thưởng thức thành phẩm do chính bạn làm ra.",
  "Sân chơi trí tuệ cho các em học sinh yêu thích cờ vua.",
  "Cơ hội trải nghiệm thực tế các ngành nghề khác nhau.",
  "Tạo nội dung sáng tạo và học cách làm video cuốn hút.",
  "Tìm hiểu văn hóa Nhật Bản qua trò chơi, ẩm thực và giao lưu.",
  "Rèn luyện kỹ năng thuyết trình chuyên nghiệp và tự tin.",
  "Khám sức khỏe miễn phí cùng các bác sĩ giàu kinh nghiệm.",
  "Không gian cho bé phát huy khả năng sáng tạo nghệ thuật.",
  "Nâng cao kiến thức du lịch bền vững và bảo vệ môi trường.",
  "Cập nhật xu hướng công nghệ mới và giao lưu chuyên gia trong ngành.",
  "Câu chuyện truyền cảm hứng từ những người dám mơ và thực hiện.",
  "Làm sạch thành phố, giữ gìn mỹ quan đô thị cùng nhau hành động.",
  "Kết nối sinh viên khu vực ASEAN qua các hoạt động đa dạng.",
  "Nâng cao ý thức cộng đồng trong việc bảo vệ động vật hoang dã.",
  "Tự tay làm nến thơm thủ công tặng người thân yêu.",
  "Học cách làm phim ngắn từ viết kịch bản đến hậu kỳ dựng phim.",
  "Thi đấu lắp ráp và điều khiển robot sáng tạo.",
  "Chăm sóc tinh thần và tâm lý cùng chuyên gia trong lĩnh vực.",
  "Hội chợ đặc sản Việt Nam và sản phẩm thủ công truyền thống.",
  "Ghi lại vẻ đẹp thiên nhiên qua ống kính của bạn.",
  "Khơi nguồn cảm hứng và sáng tạo trong thế hệ trẻ.",
  "Khám phá bản thân và học cách phát triển toàn diện.",
  "Bắt đầu học tiếng Nhật với những bài học đơn giản, thú vị.",
  "Đổi đồ cũ lấy cây xanh - cùng nhau sống xanh hơn mỗi ngày.",
  "Sân chơi nghệ thuật dành cho giới trẻ yêu nghệ thuật đường phố.",
  "Chia sẻ kinh nghiệm yêu đương và xây dựng mối quan hệ lành mạnh.",
  "Tự tin chinh phục nhà tuyển dụng qua kỹ năng phỏng vấn hiệu quả.",
  "Hướng tới nền nông nghiệp xanh và phát triển bền vững.",
  "Trình diễn các bức ảnh du lịch ấn tượng khắp mọi miền đất nước.",
  "Không gian trưng bày và giao lưu sản phẩm handmade độc đáo.",
  "Xây dựng thương hiệu cá nhân với kiến thức marketing online.",
  "Khơi dậy tinh thần yêu nước và tìm hiểu lịch sử dân tộc.",
  "Dạy trẻ kỹ năng sống thông qua hoạt động và trò chơi.",
  "Khám phá công nghệ thực tế ảo thông minh và sáng tạo.",
  "Thể hiện phong cách cá nhân qua thiết kế thời trang độc đáo.",
  "Không gian kiến trúc xanh với các ý tưởng sáng tạo.",
  "Nơi doanh nghiệp và sinh viên gặp gỡ, tuyển dụng và hợp tác.",
  "Giao lưu học hỏi cùng các nhà giáo dục từ khắp nơi trên thế giới.",
  "Trải nghiệm làm đồ da thủ công với hướng dẫn chi tiết.",
  "Chia sẻ giải pháp đổi mới trong kinh doanh và công nghệ.",
  "Gặp gỡ người truyền cảm hứng và lắng nghe hành trình thành công.",
  "Tái hiện không khí lễ hội quê hương với các trò chơi dân gian.",
  "Chương trình biểu diễn đường phố sôi động và gần gũi.",
  "Tạo cơ hội kết nối bạn bè qua các hoạt động thú vị.",
  "Thắp sáng đêm Trung thu với những chiếc lồng đèn do chính bạn trang trí.",
  "Giao tiếp hiệu quả trong công việc và cuộc sống hàng ngày.",
  "Viết CV ấn tượng và chuẩn bị hồ sơ xin việc chuyên nghiệp.",
  "Trưng bày sản phẩm sáng tạo từ học sinh các cấp.",
  "Thảo luận những chủ đề nuôi dạy con thời hiện đại.",
  "Giải đua xe đạp dành cho các em nhỏ đam mê thể thao.",
  "Tạo ra những trò chơi thú vị qua lập trình cơ bản.",
  "Hỗ trợ thanh niên khởi nghiệp với các chương trình cố vấn.",
  "Gặp gỡ cộng đồng tình nguyện viên để mở rộng kết nối.",
  "Tận dụng đồ tái chế để sáng tạo đồ chơi hữu ích.",
  "Chia sẻ kiến thức định hướng nghề nghiệp và chọn ngành học.",
  "Bảo vệ môi trường, đối phó biến đổi khí hậu cùng cộng đồng.",
];

const skillNeedsArr = [
  "Giao tiếp",
  "Lãnh đạo",
  "Làm việc nhóm",
  "Tư duy phản biện",
  "Giải quyết vấn đề",
  "Lập kế hoạch",
  "Thuyết trình",
  "Tổ chức sự kiện",
  "Chăm sóc khách hàng",
  "Chụp ảnh",
  "Dựng video",
  "Thiết kế đồ họa",
  "Sáng tạo nội dung",
  "Quản lý thời gian",
  "Lập trình",
  "Viết báo cáo",
  "Marketing",
  "Thiết kế UI/UX",
  "Lắng nghe",
  "Quản lý dự án",
  "Tư duy logic",
  "Giải quyết xung đột",
  "Tiếng Anh giao tiếp",
  "Làm việc độc lập",
  "Phân tích dữ liệu",
  "Tin học văn phòng",
  "MC sự kiện",
  "Nghiên cứu thị trường",
  "Thiết kế poster",
  "Chạy Ads",
  "Viết nội dung truyền thông",
  "Kỹ năng đối thoại",
  "Kỹ năng bán hàng",
  "Hỗ trợ kỹ thuật",
  "Xử lý tình huống",
  "Quay phim",
  "Biên tập video",
  "Nhiệt tình",
  "Tỉ mỉ",
  "Cẩn thận",
  "Thích nghi nhanh",
  "Tự học",
  "Tổ chức thời gian",
  "Kỹ năng ghi chép",
  "Phát triển cá nhân",
  "Chịu được áp lực",
  "Tinh thần trách nhiệm",
  "Chăm chỉ",
  "Quản lý tài chính",
  "Kỹ năng sư phạm",
  "Huấn luyện",
  "Tư duy sáng tạo",
  "Thiết kế Canva",
  "Làm việc với trẻ em",
  "Kỹ năng xã hội",
  "Tổ chức trò chơi",
  "Hướng dẫn viên",
  "Diễn đạt ý tưởng",
  "Viết kịch bản",
  "Phát triển chiến lược",
  "Sử dụng Excel",
  "Làm infographic",
  "Thực hiện khảo sát",
  "Phối hợp nhóm",
  "Tiếng Nhật cơ bản",
  "Tiếng Trung cơ bản",
  "Kỹ năng thuyết phục",
  "Tư duy kinh doanh",
  "Trình bày PowerPoint",
  "Tự tin trước đám đông",
  "Quan sát tốt",
  "Làm MC",
  "Thiết kế slide",
  "Kỹ năng viết CV",
  "Kỹ năng phỏng vấn",
  "Giảng dạy",
  "Kỹ năng phân tích",
  "Kỹ năng nấu ăn",
  "Kỹ năng tổ chức lớp học",
  "Viết bài SEO",
  "Thiết kế website",
  "Quản lý mạng xã hội",
  "Viết blog",
  "Dịch thuật",
  "Quản lý nhân sự",
  "Thực hiện báo cáo",
  "Điều phối chương trình",
  "Giao tiếp qua email",
  "Giải thích kỹ thuật",
  "Phát triển ứng dụng",
  "Định hướng nghề nghiệp",
  "Kỹ năng nghiên cứu",
  "Sáng tác nhạc",
  "Lập trình web",
  "Chỉnh sửa ảnh",
  "Thiết kế logo",
  "Học nhanh",
  "Tư duy hệ thống",
  "Kỹ năng vẽ tay",
  "Diễn xuất",
  "Giao tiếp phi ngôn ngữ",
  "Làm truyền thông nội bộ",
  "Truyền cảm hứng",
  "Giữ gìn vệ sinh",
  "Kỹ năng chăm sóc cây",
  "Phát thanh",
  "Sáng tạo video Tiktok",
  "Làm việc đa nhiệm",
  "Cộng tác",
  "Kỹ năng điều hành cuộc họp",
  "Viết email chuyên nghiệp",
  "Giải quyết mâu thuẫn",
  "Sắp xếp tài liệu",
  "Định giá sản phẩm",
  "Sáng tạo meme",
  "Tổ chức hội thảo",
  "Thiết kế banner",
  "Sử dụng Photoshop",
  "Giảng bài",
  "Tự tin thể hiện bản thân",
  "Nắm bắt tâm lý",
  "Thống kê",
  "Báo cáo số liệu",
  "Giao tiếp qua điện thoại",
  "Kỹ năng hoạt náo",
  "Viết thư cảm ơn",
  "Hỗ trợ sự kiện",
  "Giải mã hành vi",
  "Tiếp nhận phản hồi",
  "Làm checklist",
  "Trình bày số liệu",
  "Phối màu",
  "Tạo nội dung viral",
  "Báo cáo sau sự kiện",
  "Làm việc online",
  "Đăng bài Facebook",
  "Kỹ năng chăm sóc bản thân",
  "Tự tạo động lực",
  "Giao tiếp với người lớn tuổi",
  "Xử lý âm thanh",
  "Thiết kế thiệp",
  "Giám sát tình nguyện viên",
  "Đóng vai trò hỗ trợ",
  "Hướng dẫn sử dụng phần mềm",
  "Tư duy chiến lược",
  "Tạo khảo sát Google Form",
  "Thống kê phản hồi",
  "Tư vấn tâm lý",
  "Kỹ năng lắng nghe chủ động",
  "Tạo fanpage",
  "Tổ chức minigame",
  "Tạo timeline chương trình",
  "Sáng tạo poster",
  "Thiết kế brochure",
  "Kỹ năng phân vai",
  "Tự học phần mềm mới",
  "Chỉnh sửa bài viết",
  "Xử lý sự cố kỹ thuật",
  "Trả lời bình luận MXH",
  "Kết nối cộng đồng",
  "Học hỏi nhanh",
  "Tư duy phục vụ",
];

// Random phone number

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomPhone() {
  const prefixes = [
    "086",
    "096",
    "097",
    "098",
    "032",
    "033",
    "034",
    "035",
    "036",
    "037",
    "038",
    "039",
  ];
  return (
    getRandomElement(prefixes) +
    Math.floor(1000000 + Math.random() * 9000000).toString()
  );
}

const answersArray = [
  "Tôi muốn học hỏi thêm kỹ năng tổ chức sự kiện.",
  "Có",
  "Không",
  "Giao tiếp, Tổ chức",
  "Tôi yêu thích công việc ngoài trời và sẵn sàng tham gia.",
  "Tôi có thể làm việc vào buổi chiều các ngày trong tuần.",
  "Vận chuyển",
  "Găng tay, Túi rác",
  "Tôi muốn hỗ trợ phần hậu cần.",
  "Tôi mong muốn thử sức với vai trò truyền thông.",
  "Tôi có kinh nghiệm làm việc nhóm và muốn áp dụng vào hoạt động này.",
  "Tôi muốn giúp chuẩn bị tài liệu cho sự kiện.",
  "Có thể làm việc vào cuối tuần.",
  "Tôi quan tâm đến việc hỗ trợ trẻ em hoặc người già.",
  "Kỹ năng thuyết trình, Quản lý thời gian",
  "Tôi cần thêm thông tin về lịch trình trước khi đăng ký.",
  "Tôi có thể mang theo nước uống và dụng cụ vệ sinh.",
  "Tôi muốn tham gia nhóm trang trí địa điểm.",
  "Tôi thích làm việc trực tiếp với cộng đồng địa phương.",
  "Không có kinh nghiệm nhưng rất nhiệt tình học hỏi.",
  "Tôi có thể hỗ trợ quay video hoặc chụp ảnh.",
  "Tôi muốn đảm nhận vai trò hướng dẫn người tham gia.",
  "Tôi có xe máy, có thể hỗ trợ di chuyển vật dụng.",
  "Tôi cần khẩu trang và nước rửa tay khi tham gia.",
  "Tôi muốn học cách phối hợp với các tổ chức phi lợi nhuận.",
  "Tôi có thể làm việc vào buổi tối thứ Tư và thứ Năm.",
  "Tôi muốn hỗ trợ phân phát thực phẩm hoặc nhu yếu phẩm.",
  "Kỹ năng viết lách, Thiết kế đồ họa",
  "Tôi từng tham gia tình nguyện dọn rác bãi biển.",
  "Tôi có thể mang theo bàn ghế nếu cần.",
  "Tôi muốn tham gia để kết nối với những người cùng sở thích.",
  "Tôi quan tâm đến các hoạt động bảo vệ môi trường.",
  "Tôi có thể hỗ trợ đăng bài trên mạng xã hội.",
  "Tôi muốn làm việc ở khu vực gần trung tâm thành phố.",
  "Tôi có thể tham gia 2-3 buổi mỗi tuần.",
  "Tôi cần mũ bảo hộ nếu làm việc ngoài trời lâu.",
  "Tôi muốn hỗ trợ dạy kỹ năng cho trẻ em.",
  "Tôi có thể giúp dịch tài liệu nếu cần.",
  "Tôi muốn thử sức với vai trò điều phối viên.",
  "Tôi có thể mang theo đồ ăn nhẹ cho đội tình nguyện.",
  "Tôi thích các hoạt động liên quan đến giáo dục cộng đồng.",
  "Tôi có kỹ năng nấu ăn, có thể chuẩn bị bữa ăn.",
  "Tôi muốn tham gia sự kiện từ thiện cuối năm.",
  "Tôi có thể hỗ trợ kiểm tra danh sách người tham gia.",
  "Tôi cần giày chống trượt nếu làm việc ở khu vực ẩm ướt.",
  "Tôi muốn học thêm về quản lý dự án tình nguyện.",
  "Tôi có thể làm việc vào sáng thứ Bảy và Chủ nhật.",
  "Tôi muốn hỗ trợ phân loại rác thải tái chế.",
  "Tôi có máy chiếu, có thể mang theo nếu cần.",
  "Tôi quan tâm đến các hoạt động gây quỹ cộng đồng.",
  "Kỹ năng lắng nghe, Giải quyết vấn đề",
  "Tôi muốn làm việc với các nhóm tình nguyện quốc tế.",
  "Tôi có thể hỗ trợ thiết kế poster cho sự kiện.",
  "Tôi cần áo phản quang nếu làm việc buổi tối.",
  "Tôi muốn tham gia để nâng cao kỹ năng lãnh đạo.",
  "Tôi có thể mang theo loa di động cho sự kiện ngoài trời.",
  "Tôi thích các hoạt động liên quan đến trồng cây xanh.",
  "Tôi có thể hỗ trợ chăm sóc người tham gia lớn tuổi.",
  "Tôi muốn làm việc ở khu vực ngoại ô nếu có xe đưa đón.",
  "Tôi có thể tham gia toàn thời gian trong kỳ nghỉ hè.",
  "Tôi cần bản đồ khu vực làm việc trước khi tham gia.",
  "Tôi muốn hỗ trợ tổ chức các trò chơi cho trẻ em.",
  "Tôi có kỹ năng sử dụng Excel để quản lý danh sách.",
  "Tôi muốn tham gia để hiểu thêm về văn hóa địa phương.",
  "Tôi có thể mang theo đồ dùng học tập để tặng trẻ em.",
  "Tôi quan tâm đến các dự án xây dựng cộng đồng bền vững.",
  "Tôi có thể hỗ trợ viết báo cáo sau sự kiện.",
  "Tôi muốn làm việc với đội kỹ thuật âm thanh, ánh sáng.",
  "Tôi cần thời gian nghỉ giữa các ca làm việc.",
  "Tôi muốn học thêm về quản lý khủng hoảng trong sự kiện.",
  "Tôi có thể làm việc vào buổi trưa các ngày thứ Hai.",
  "Tôi muốn hỗ trợ các hoạt động liên quan đến sức khỏe cộng đồng.",
  "Tôi có thể mang theo dụng cụ làm vườn nếu cần.",
  "Tôi quan tâm đến các chương trình hỗ trợ người khuyết tật.",
  "Kỹ năng đàm phán, Làm việc nhóm",
  "Tôi muốn tham gia để cải thiện kỹ năng giao tiếp.",
  "Tôi có thể hỗ trợ kiểm tra thiết bị trước sự kiện.",
  "Tôi cần thông tin về chỗ nghỉ nếu làm việc xa.",
  "Tôi muốn làm việc với nhóm tình nguyện trẻ tuổi.",
  "Tôi có thể mang theo máy ảnh để ghi lại hoạt động.",
  "Tôi thích các hoạt động liên quan đến tái chế sáng tạo.",
  "Tôi có thể hỗ trợ hướng dẫn giao thông trong sự kiện.",
  "Tôi muốn tham gia để gặp gỡ các nhà hoạt động xã hội.",
  "Tôi có thể làm việc vào sáng sớm các ngày trong tuần.",
  "Tôi cần găng tay y tế nếu làm việc với rác thải nguy hại.",
  "Tôi muốn hỗ trợ tổ chức hội thảo hoặc buổi đào tạo.",
  "Tôi có kỹ năng biên tập video, có thể làm nội dung sau sự kiện.",
  "Tôi muốn tham gia các hoạt động liên quan đến nghệ thuật cộng đồng.",
  "Tôi có thể mang theo bảng trắng và bút lông nếu cần.",
  "Tôi quan tâm đến các dự án hỗ trợ phụ nữ và trẻ em gái.",
  "Tôi có thể hỗ trợ liên lạc với các nhà tài trợ.",
  "Tôi muốn làm việc ở khu vực có kết nối internet ổn định.",
  "Tôi có thể tham gia các buổi họp nhóm trước sự kiện.",
  "Tôi cần áo mưa nếu làm việc vào mùa mưa.",
  "Tôi muốn học thêm về lập kế hoạch sự kiện tình nguyện.",
  "Tôi có thể làm việc vào cuối tuần và ngày lễ.",
  "Tôi muốn hỗ trợ các hoạt động liên quan đến giáo dục môi trường.",
  "Tôi có thể mang theo đèn pin nếu làm việc buổi tối.",
  "Tôi quan tâm đến các chương trình hỗ trợ người vô gia cư.",
  "Kỹ năng tổ chức, Chăm sóc khách hàng",
  "Tôi muốn tham gia để phát triển mạng lưới quan hệ.",
  "Tôi có thể hỗ trợ sắp xếp lịch trình cho đội tình nguyện.",
  "Tôi cần hướng dẫn cụ thể trước khi bắt đầu công việc.",
  "Tôi muốn làm việc với các tổ chức bảo vệ động vật.",
  "Tôi có thể mang theo dây thừng để hỗ trợ dựng lều.",
  "Tôi thích các hoạt động liên quan đến thể thao cộng đồng.",
  "Tôi có thể hỗ trợ kiểm tra an toàn khu vực làm việc.",
  "Tôi muốn tham gia để trải nghiệm các hoạt động mới.",
  "Tôi có thể làm việc vào buổi chiều thứ Sáu.",
  "Tôi cần bình nước cá nhân khi làm việc ngoài trời.",
  "Tôi muốn hỗ trợ tổ chức các buổi chiếu phim cộng đồng.",
  "Tôi có kỹ năng vẽ, có thể trang trí backdrop.",
  "Tôi muốn tham gia các dự án hỗ trợ học sinh nghèo.",
  "Tôi có thể mang theo ghế xếp nếu cần thêm chỗ ngồi.",
  "Tôi quan tâm đến các hoạt động thúc đẩy bình đẳng giới.",
  "Tôi có thể hỗ trợ ghi chép trong các buổi họp.",
  "Tôi muốn làm việc ở khu vực gần trường học.",
  "Tôi có thể tham gia các hoạt động kéo dài 1-2 ngày.",
  "Tôi cần khẩu trang vải để sử dụng lâu dài.",
  "Tôi muốn học thêm về quản lý ngân sách sự kiện.",
  "Tôi có thể làm việc vào buổi sáng thứ Năm.",
  "Tôi muốn hỗ trợ các hoạt động liên quan đến sức khỏe tâm lý.",
  "Tôi có thể mang theo ô dù lớn nếu trời nắng nóng.",
  "Tôi quan tâm đến các chương trình hỗ trợ người nhập cư.",
  "Kỹ năng phân tích, Lập kế hoạch",
  "Tôi muốn tham gia để nâng cao nhận thức cộng đồng.",
  "Tôi có thể hỗ trợ kiểm tra chất lượng vật liệu trước sự kiện.",
  "Tôi cần thông tin về phương tiện di chuyển công cộng.",
  "Tôi muốn làm việc với các nhóm tình nguyện đa văn hóa.",
  "Tôi có thể mang theo micro không dây nếu cần.",
  "Tôi thích các hoạt động liên quan đến âm nhạc cộng đồng.",
  "Tôi có thể hỗ trợ hướng dẫn người tham gia mới.",
  "Tôi muốn tham gia để học hỏi từ các tình nguyện viên khác.",
  "Tôi có thể làm việc vào buổi tối thứ Sáu và thứ Bảy.",
  "Tôi cần băng keo và kéo nếu làm việc thủ công.",
  "Tôi muốn hỗ trợ tổ chức các buổi workshop kỹ năng.",
  "Tôi có kỹ năng chụp ảnh, có thể ghi lại khoảnh khắc.",
  "Tôi muốn tham gia các dự án hỗ trợ người cao tuổi.",
  "Tôi có thể mang theo bình xịt côn trùng nếu làm việc ngoài trời.",
  "Tôi quan tâm đến các hoạt động xây dựng thư viện cộng đồng.",
  "Tôi có thể hỗ trợ quản lý mạng xã hội trong sự kiện.",
  "Tôi muốn làm việc ở khu vực có nhiều cây xanh.",
  "Tôi có thể tham gia các buổi đào tạo trước sự kiện.",
  "Tôi cần găng tay cao su nếu làm việc với nước.",
  "Tôi muốn học thêm về quản lý tình nguyện viên.",
  "Tôi có thể làm việc vào sáng thứ Tư và thứ Sáu.",
  "Tôi muốn hỗ trợ các hoạt động liên quan đến dinh dưỡng cộng đồng.",
  "Tôi có thể mang theo bảng chỉ dẫn nếu cần.",
  "Tôi quan tâm đến các chương trình hỗ trợ trẻ mồ côi.",
  "Kỹ năng đào tạo, Giải thích ý tưởng",
  "Tôi muốn tham gia để tạo tác động tích cực đến xã hội.",
  "Tôi có thể hỗ trợ dọn dẹp sau sự kiện.",
  "Tôi cần thông tin về thời tiết trước khi tham gia.",
  "Tôi muốn làm việc với các tổ chức giáo dục phi lợi nhuận.",
  "Tôi có thể mang theo túi sơ cứu nếu cần.",
  "Tôi thích các hoạt động liên quan đến văn hóa truyền thống.",
  "Tôi có thể hỗ trợ kiểm tra vé vào cửa nếu có.",
  "Tôi muốn tham gia để khám phá các cơ hội mới.",
  "Tôi có thể làm việc vào buổi chiều thứ Ba.",
  "Tôi cần khăn lau nếu làm việc với bụi bẩn.",
  "Tôi muốn hỗ trợ tổ chức các buổi giao lưu cộng đồng.",
  "Tôi có kỹ năng kể chuyện, có thể tương tác với trẻ em.",
  "Tôi muốn tham gia các dự án hỗ trợ người dân tộc thiểu số.",
  "Tôi có thể mang theo bình nước lớn cho cả đội.",
  "Tôi quan tâm đến các hoạt động thúc đẩy du lịch bền vững.",
  "Tôi có thể hỗ trợ phân phát quà tặng trong sự kiện.",
  "Tôi muốn làm việc ở khu vực gần sông hoặc hồ.",
  "Tôi có thể tham gia các hoạt động kéo dài cả ngày.",
  "Tôi cần áo dài tay để bảo vệ khi làm việc ngoài trời.",
  "Tôi muốn học thêm về tổ chức sự kiện cộng đồng.",
  "Tôi có thể làm việc vào buổi tối thứ Hai.",
  "Tôi muốn hỗ trợ các hoạt động liên quan đến an toàn thực phẩm.",
  "Tôi có thể mang theo chổi và xẻng nhỏ nếu cần.",
  "Tôi quan tâm đến các chương trình hỗ trợ người tị nạn.",
  "Kỹ năng sáng tạo nội dung, Quản lý mạng xã hội",
  "Tôi muốn tham gia để truyền cảm hứng cho người khác.",
  "Tôi có thể hỗ trợ kiểm tra âm thanh trước sự kiện.",
  "Tôi cần thông tin về chỗ gửi xe nếu làm việc xa.",
  "Tôi muốn làm việc với các nhóm tình nguyện sáng tạo.",
  "Tôi có thể mang theo bút và sổ để ghi chú.",
  "Tôi thích các hoạt động liên quan đến khoa học cộng đồng.",
  "Tôi có thể hỗ trợ hướng dẫn các hoạt động nhóm.",
  "Tôi muốn tham gia để xây dựng kỹ năng tổ chức.",
  "Tôi có thể làm việc vào sáng thứ Hai và thứ Ba.",
  "Tôi cần chai xịt nước nếu làm việc trong thời tiết nóng.",
  "Tôi muốn hỗ trợ tổ chức các buổi triển lãm cộng đồng.",
  "Tôi có kỹ năng giao tiếp, có thể hỗ trợ tiếp khách.",
  "Tôi muốn tham gia các dự án hỗ trợ học sinh vùng cao.",
  "Tôi có thể mang theo thùng đựng rác nếu cần.",
  "Tôi quan tâm đến các hoạt động thúc đẩy hòa bình.",
  "Tôi có thể hỗ trợ phân phát tài liệu trong sự kiện.",
  "Tôi muốn làm việc ở khu vực có không gian mở.",
  "Tôi có thể tham gia các hoạt động trong 1 tuần liên tiếp.",
  "Tôi cần mũ lưỡi trai nếu làm việc dưới nắng lâu.",
];

// Random rating from 1.0 -> 5.0
function randomRating() {
  // Sinh số ngẫu nhiên từ 10 đến 50 (tương ứng 1.0 đến 5.0)
  const min = 10;
  const max = 50;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  // Chuyển về dạng số thập phân (1.0 đến 5.0)
  return (random / 10).toFixed(1);
}

// Random participant
function randomParticipants() {
  // Sinh số ngẫu nhiên từ 10 đến 50 (tương ứng 1.0 đến 5.0)
  const min = 100;
  const max = 250;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

// Random date start
function getRandomDate() {
  var currentDate = new Date("2025-04-13"); // Ngày hiện tại
  var daysBack = Math.floor(Math.random() * 90); // Random 0-90 ngày trước
  var randomDate = new Date(currentDate);
  randomDate.setDate(currentDate.getDate() - daysBack);
  return randomDate;
}

// Random date end
function getExpiredDate(subscribedAt) {
  var expired = new Date(subscribedAt);
  expired.setMonth(expired.getMonth() + 1);
  return expired;
}

// ===== Hàm tạo ngày bắt đầu =====
function generateStartAt(inFuture = false, maxFutureMonths = 1) {
  var now = new Date();
  if (!inFuture) return now;

  var futureMonths = Math.floor(Math.random() * maxFutureMonths) + 1;
  var result = new Date(now);
  result.setMonth(now.getMonth() + futureMonths);
  return result;
}

// ===== Hàm tạo ngày kết thúc (cách 1-2 tháng) =====
function generateEndAt(startAt, minMonths = 1, maxMonths = 2) {
  if (!(startAt instanceof Date) || isNaN(startAt.getTime())) {
    throw "startAt phải là ngày hợp lệ";
  }

  var monthDiff =
    Math.floor(Math.random() * (maxMonths - minMonths + 1)) + minMonths;
  var result = new Date(startAt);
  result.setMonth(result.getMonth() + monthDiff);
  return result;
}

// Get random data in array
function getRandomSubset(arr, size) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

const formQuestion = [
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn tự tin nhất ở kỹ năng nào?",
        type: "checkbox",
        options: ["Giao tiếp", "Tổ chức", "Làm việc nhóm", "Xử lý tình huống"],
      },
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn muốn đóng góp vào hoạt động nào?",
        type: "dropdown",
        options: ["Hậu cần", "Truyền thông", "Vận chuyển", "Hướng dẫn"],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
      {
        question: "Bạn mong muốn học hỏi kỹ năng gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có thể tham gia vào thời gian nào?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn đã từng tham gia hoạt động tương tự chưa?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
    ],
  },
  {
    questions: [
      {
        question: "Bạn có sẵn sàng làm việc ngoài trời không?",
        type: "radio",
        options: ["Có", "Không"],
      },
      {
        question: "Bạn mong muốn điều gì từ sự kiện này?",
        type: "text",
        options: [],
      },
      {
        question: "Bạn có thể mang theo những vật dụng nào?",
        type: "checkbox",
        options: ["Găng tay", "Túi rác", "Kẹp rác", "Không mang gì"],
      },
    ],
  },
];

// INSERT STAFF
for (let i = 9; i <= 150; i++) {
  const staff = {
    fullname: `Staff ${i}`,
    email: `carenetstaff${i}@gmail.com`,
    password: "$2b$10$jIj0mCP13..EeaVPY2xXXeL/utB2tHgPAOyzHdthRgbQZG/bJZA4G",
    role: "staff",
    cccdImages: [],
    phone: `098765432${i % 10}`,
    dob: new Date(1990, 0, 1),
    isVerified: true,
    status: "ready",
    reputationPoints: 100,
    totalHours: 0,
    activityPoints: 0,
    historyEvents: [],
    favorites: [],
    certificates: [],
    hobbies: [],
    __v: 0,
  };

  const result = db.users.insertOne(staff);
  checkerIds.push(result.insertedId);
}

// INSERT VOLUNTEER
for (let i = 1; i <= 150; i++) {
  const staff = {
    fullname: `Volunteer ${i}`,
    email: `volunteer${i}@gmail.com`,
    password: "$2b$10$jIj0mCP13..EeaVPY2xXXeL/utB2tHgPAOyzHdthRgbQZG/bJZA4G",
    role: "volunteer",
    cccdImages: [],
    phone: `098765432${i % 10}`,
    dob: new Date(1990, 0, 1),
    isVerified: true,
    status: "ready",
    reputationPoints: 100,
    totalHours: 0,
    activityPoints: 0,
    historyEvents: [],
    favorites: [],
    certificates: [],
    hobbies: [],
    __v: 0,
  };

  const result = db.users.insertOne(staff);
  userIds.push(result.insertedId);
}

// INSERT ORGANIZATION
// Số lượng organization phù hợp với số lượng organization id đang có
const organizationIds = [];
for (let i = 0; i < organizationUserIds.length; i++) {
  let nameRandomIndex = i % orgNames.length; // random name org
  let userRandomIndex = i % organizationUserIds.length; // random user id
  let desRandomIndex = i % orgDescriptions.length; // random user id
  let orgLevelRandomIndex = i % organizationLevelIds.length; // random level org

  let existedOrganization = db.organizations.findOne({ name: orgNames[i] });

  if (!existedOrganization) {
    let organizations = db.organizations.insertOne({
      userId: organizationUserIds[userRandomIndex],
      levelId: organizationLevelIds[orgLevelRandomIndex],
      name: orgNames[nameRandomIndex],
      description: orgDescriptions[desRandomIndex],
      phone: generateRandomPhone(),
      adminStatus: "approved",
      organizationStatus: "active",
      licenseDocumentUrl: getRandomSubset(licenseDocumentUrl, 4), // Lấy 4 ảnh random trong licenseDocumentUrl
      rating: randomRating(),
    }); // Lưu ID để sử dụng sau này
    organizationIds.push(organizations.insertedId);
  }
}

// UPDATE USER STAFF + ORGANIZATION ID
// Làm thêm 20 staff nữa
for (var i = 0; i < checkerIds.length; i++) {
  var staffRandomIndex = i % checkerIds.length; // Random staffId, giống nameRandomIndex
  var orgRandomIndex = i % organizationIds.length; // Random organizationId, giống userRandomIndex

  var staffId = checkerIds[staffRandomIndex];
  var orgId = organizationIds[orgRandomIndex];

  // Kiểm tra xem user có tồn tại và role là "staff" không, tương tự existedOrganization
  var existedUser = db.users.findOne({
    _id: staffId,
    role: "staff",
  });

  if (existedUser) {
    // Cập nhật organizationId, tương tự insertOne
    var updateResult = db.users.updateOne(
      { _id: staffId },
      { $set: { organizationId: orgId } }
    );

    // Kiểm tra xem có cập nhật thành công không
    if (updateResult.modifiedCount > 0) {
      print("Updated organizationId " + orgId + " for staff: " + staffId);
    } else {
      print("No changes for staff: " + staffId);
    }
  } else {
    print("Staff not found or not a staff role: " + staffId + ", skipping...");
  }
}

// UPDATE USER ORGANIZATION + ORGANIZATION ID
// Thêm organization id vào trong organization account
for (var i = 0; i < organizationUserIds.length; i++) {
  var organizationUserRandomIndex = i % organizationUserIds.length; // Random staffId, giống nameRandomIndex
  var orgRandomIndex = i % organizationIds.length; // Random organizationId, giống userRandomIndex

  var organizationUserId = organizationUserIds[organizationUserRandomIndex];
  var orgId = organizationIds[orgRandomIndex];

  // Kiểm tra xem user có tồn tại và role là "organization" không, tương tự existedOrganization
  var existedUser = db.users.findOne({
    _id: organizationUserId,
    role: "organization",
  });

  if (existedUser) {
    // Cập nhật organizationId, tương tự insertOne
    var updateResult = db.users.updateOne(
      { _id: organizationUserId },
      { $set: { organizationId: orgId } }
    );

    // Kiểm tra xem có cập nhật thành công không
    if (updateResult.modifiedCount > 0) {
      print(
        "Updated organizationId " + orgId + " for organization: " + staffId
      );
    } else {
      print("No changes for staff: " + staffId);
    }
  } else {
    print("Staff not found or not a staff role: " + staffId + ", skipping...");
  }
}

// ORGANIZATION SUBSCRIPTION
// Mỗi organization sẽ mặc định có
const organizationSubscriptionIds = [];
const paymentStatus = ["not paid", "paid"];
for (var i = 0; i < organizationIds.length; i++) {
  var statusRandomIndex = i % paymentStatus.length; // Random status
  var orgId = organizationIds[i]; // Lấy organizationId tuần tự

  // Lấy organization từ db.organizations để lấy levelId
  var existedOrganization = db.organizations.findOne({ _id: orgId });

  if (existedOrganization && existedOrganization.levelId) {
    var levelId = existedOrganization.levelId;

    // Lấy price từ db.organizationlevels
    var levelDoc = db.organizationlevels.findOne({ _id: levelId });
    var price = levelDoc ? levelDoc.pricePerMonth || 100000 : 100000; // Giá mặc định nếu không tìm thấy

    // Tạo ngày subscribedAt ngẫu nhiên
    var subscribedAt = getRandomDate();
    var expiredAt = getExpiredDate(subscribedAt);

    // Insert vào organizationsubscriptions
    var organizationSubscriptions = db.organizationsubscriptions.insertOne({
      organizationId: orgId,
      levelId: levelId,
      price: price,
      subscribedAt: subscribedAt,
      expiredAt: expiredAt,
      status: paymentStatus[statusRandomIndex],
    });

    // Lưu insertedId
    organizationSubscriptionIds.push(organizationSubscriptions.insertedId);
  } else {
    print(
      "Organization not found or missing levelId for: " +
        orgId +
        ", skipping..."
    );
  }
}

// EVENT
const eventStatus = ["hiring", "processing", "completed", "cancelled"];

const eventImages = [
  "https://i.pinimg.com/736x/21/af/e9/21afe9b7d4af3209eb1b1ff13ce4ae68.jpg",
  "https://i.pinimg.com/736x/ff/1d/07/ff1d0780dc6a7094b40521073e406150.jpg",
  "https://i.pinimg.com/736x/61/68/71/6168710391de29f8b22d0c1d4b7ba729.jpg",
  "https://i.pinimg.com/736x/1e/98/0f/1e980f17e4b17e899a2b730ea07285ae.jpg",
  "https://i.pinimg.com/736x/98/81/e5/9881e5b926e5825fc82d647d16e0d4da.jpg",
  "https://i.pinimg.com/736x/f4/a0/fd/f4a0fdecb6439e19539d97fa96a71ecb.jpg",
  "https://i.pinimg.com/736x/1f/36/7a/1f367a27d48d58dfd668f9e0c8df4254.jpg",
  "https://i.pinimg.com/736x/d1/87/72/d187729274fede2b5bd38c55eed501ad.jpg",
  "https://i.pinimg.com/736x/93/c3/07/93c307d02c46087e24a1d596a45cf0e3.jpg",
  "https://i.pinimg.com/736x/70/4c/53/704c53f486106768fcb8174070aa2a02.jpg",
  "https://i.pinimg.com/736x/eb/f9/47/ebf9471d9ee6deadb826d5454961b3c9.jpg",
  "https://i.pinimg.com/736x/a9/73/37/a973379baf48d0d12f6c1aca4730c5d1.jpg",
  "https://i.pinimg.com/736x/08/da/3e/08da3ed10f6d0bfddc4889e02d4e48c1.jpg",
  "https://i.pinimg.com/736x/cc/9e/f1/cc9ef1474faeade8ecce6242628f1dc6.jpg",
  "https://i.pinimg.com/736x/c1/33/d9/c133d9be77dfa1784ca6fb94e70042aa.jpg",
  "https://i.pinimg.com/736x/99/e7/f2/99e7f24b5c328cacef21205fd64c2541.jpg",
  "https://i.pinimg.com/736x/72/fe/07/72fe07ee3945c7f09ea30ecc98ca65b2.jpg",
  "https://i.pinimg.com/736x/2d/d3/79/2dd379968693700ec12af8f1974b491e.jpg",
  "https://i.pinimg.com/736x/ae/96/f1/ae96f1572d810acedff0363098ebb9f2.jpg",
  "https://i.pinimg.com/736x/d8/a8/16/d8a816495548996b07e824a9d93fc951.jpg",
  "https://i.pinimg.com/736x/49/f5/e9/49f5e95ee672093c4c35db91f4c9310e.jpg",
  "https://i.pinimg.com/736x/1c/d4/ea/1cd4ea832582b8edf60639ff474ddc40.jpg",
  "https://i.pinimg.com/736x/fa/64/be/fa64beecfbdfe131fee39d8176ea594f.jpg",
  "https://i.pinimg.com/736x/a2/b1/65/a2b165daf541f4c1939ca51315f93e0a.jpg",
  "https://i.pinimg.com/736x/6d/3c/70/6d3c7039a05d2f0ee82f2a716846a53e.jpg",
  "https://i.pinimg.com/736x/a6/fc/a6/a6fca61a3ce7dce76380861f2ab9434b.jpg",
  "https://i.pinimg.com/736x/36/be/61/36be614f54d2f39fca3a446330ec3f01.jpg",
  "https://i.pinimg.com/736x/12/d2/06/12d206d8251d624c30c05e98c64d726e.jpg",
  "https://i.pinimg.com/736x/91/32/bd/9132bdc5b285ad7e94b5998d86caf9e1.jpg",
  "https://i.pinimg.com/736x/07/b9/73/07b97396b95de7c61699cb3dec60c5b9.jpg",
  "https://i.pinimg.com/736x/1d/1b/4c/1d1b4cd4363fcc806d28afe1c6017fe4.jpg",
  "https://i.pinimg.com/736x/81/ef/08/81ef0895894c4a4e012c04439571129a.jpg",
  "https://i.pinimg.com/736x/c4/7a/55/c47a55cf28388b1a2809bef228b5ad5c.jpg",
  "https://i.pinimg.com/736x/1d/06/b1/1d06b127bb46d7ca04670004edbe60ad.jpg",
  "https://i.pinimg.com/736x/0f/19/42/0f1942a694bb1cda0a30a4efd00889cb.jpg",
  "https://i.pinimg.com/736x/bc/60/b2/bc60b2d40e88ec53d96d99dbf50a5e3b.jpg",
  "https://i.pinimg.com/736x/35/7e/ba/357ebac31b1f319aa550b7fe46cd2223.jpg",
  "https://i.pinimg.com/736x/d9/b6/aa/d9b6aa4be3f756a695c3302c7070fa17.jpg",
  "https://i.pinimg.com/736x/47/92/4c/47924c52a9f6fa38d623ebc7813105bb.jpg",
  "https://i.pinimg.com/736x/7f/7c/a5/7f7ca5edce69dcca7dbc36e515aa752e.jpg",
  "https://i.pinimg.com/736x/cb/37/c8/cb37c8aa6453d5cbd805032c5c60643a.jpg",
  "https://i.pinimg.com/736x/6c/ae/07/6cae0794cb32ca5a5efbeb62457c752a.jpg",
  "https://i.pinimg.com/736x/0d/e4/a2/0de4a24d26a2bf62e0b4e7f8cbc4ce93.jpg",
  "https://i.pinimg.com/736x/0d/02/d6/0d02d60c3ee6c2a1fc9f908842f47c94.jpg",
  "https://i.pinimg.com/736x/40/35/14/40351430d1a259b751a38f0bf8c8e90a.jpg",
  "https://i.pinimg.com/736x/51/ff/d0/51ffd051d53d2d5e52f27573bf371773.jpg",
  "https://i.pinimg.com/736x/39/01/4d/39014d07906e31191eb6f7168bf413f1.jpg",
  "https://i.pinimg.com/736x/1a/73/b8/1a73b8f20fd94a0fe57657d4d6b313df.jpg",
  "https://i.pinimg.com/736x/d2/ca/6a/d2ca6a2b227fd396a11906b6715b6caa.jpg",
  "https://i.pinimg.com/736x/77/19/13/7719133e8002a582765fbdb21ad2d162.jpg",
  "https://i.pinimg.com/736x/0a/bb/a8/0abba89755f5bf73559eda060aa88d0c.jpg",
];

const eventIds = [];

for (let i = 0; i < 150; i++) {
  const titleRandomIndex = i % eventTitles.length;
  const desRandomIndex = i % eventDescriptions.length;
  const categoryRandomIndex = i % categories.length;

  // 👉 Dùng orgNames lặp lại (6 org)
  const orgName = orgNames[i % orgNames.length];
  let existedOrganization = db.organizations.findOne({ name: orgName });

  const currentStaffs = db.users
    .find({
      organizationId: existedOrganization._id,
    })
    .toArray(); // cần toArray để dùng map

  const currentStaffIdsArray = currentStaffs.map((user) => user._id);
  const staffRandomIndex = i % currentStaffIdsArray.length;
  const startDate = generateStartAt(true, 1);
  const skillNeeds = getRandomSubset(skillNeedsArr, 4);
  const imageRandom = getRandomSubset(eventImages, 4);
  const streetRandomIndex = i % streets.length;
  const wardRandomIndex = i % wards.length;
  const districtRandomIndex = i % districts.length;
  const randomPostCodeIndex = i % postCodeDaNang.length;
  const formDataRandomIndex = i % formQuestion.length;
  const eventStatusRandomIndex = i % eventStatus.length;

  let event = db.events.insertOne({
    title: eventTitles[titleRandomIndex],
    description: eventDescriptions[desRandomIndex],
    images: imageRandom,
    category: categories[categoryRandomIndex],
    rating: randomRating(),
    currentParticipants: randomParticipants(),
    assignChecker: currentStaffIdsArray[staffRandomIndex],
    startAt: startDate,
    endAt: generateEndAt(startDate),
    organizationId: existedOrganization._id,
    skillNeeds: skillNeeds,
    location: {
      street: streets[streetRandomIndex],
      ward: wards[wardRandomIndex],
      district: districts[districtRandomIndex],
      province: "Da Nang",
      postalCode: postCodeDaNang[randomPostCodeIndex],
    },
    formData: formQuestion[formDataRandomIndex],
    status: eventStatus[eventStatusRandomIndex],
  });

  eventIds.push(event.insertedId);
}

// EVENT REGISTRATION
const eventRegistrationStatus = [
  "pending",
  "approved",
  "rejected",
  "cancelled",
];
const cancellationReasons = [
  "Rất tiếc, mình không thể tham gia sự kiện lần này.",
  "Cảm ơn bạn đã mời, nhưng mình đã có kế hoạch khác.",
  "Lịch của mình đang khá bận, hẹn bạn dịp sau nhé!",
  "Mình rất muốn tham gia nhưng hiện tại không tiện.",
  "Xin lỗi, mình không thể sắp xếp thời gian tham gia.",
  "Cảm ơn thông tin, nhưng lần này mình xin phép từ chối.",
  "Mình đang có việc cá nhân nên không tham gia được.",
  "Mình có sự kiện khác trùng ngày, xin lỗi nhé!",
  "Mình sẽ ủng hộ từ xa, chúc chương trình thành công!",
  "Rất tiếc vì không thể góp mặt cùng mọi người lần này.",
  "Hẹn bạn ở những sự kiện sau nhé!",
  "Hiện tại mình đang ở xa nên không thể tham dự.",
  "Mình không đủ sức khỏe tham gia thời gian này.",
  "Đợt này mình phải tập trung cho việc học/thi cử.",
  "Rất tiếc, mình đang có việc gia đình cần giải quyết.",
  "Cảm ơn đã liên hệ, nhưng mình xin phép không tham gia.",
  "Mình đã đăng ký một hoạt động khác rồi.",
  "Xin lỗi, mình không tiện di chuyển vào hôm đó.",
  "Mình vừa mới hết thời gian nghỉ phép rồi.",
  "Mình không đủ điều kiện sức khỏe tham gia ngoài trời.",
  "Thật tiếc, đợt này mình đang khá stress nên không tiện.",
  "Mình sợ không thể cam kết đúng lịch trình chương trình.",
  "Lần này mình xin vắng mặt, nhưng rất ủng hộ tinh thần!",
  "Mình sẽ chia sẻ sự kiện cho bạn bè nhé!",
  "Dù không tham gia được, mình chúc mọi người thành công!",
  "Rất tiếc vì đã không thể đồng hành cùng các bạn lần này.",
  "Mình đang đi công tác xa, mong được tham gia lần sau!",
  "Mình hiện không ở Việt Nam nên không thể tham dự.",
  "Tôi xin phép không nhận thêm hoạt động thời gian này.",
  "Thời gian không phù hợp với lịch học/làm việc của mình.",
];

const eventRegistrationIds = [];

for (let i = 0; i < eventIds.length; i++) {
  let existedEvents = db.events.findOne({ title: eventTitles[i] });

  if (existedEvents) {
    const eventId = existedEvents._id;
    const userRandomIndex = i % userIds.length;
    const statusRandomIndex = i % eventRegistrationStatus.length;
    const status = eventRegistrationStatus[statusRandomIndex];
    const answerRandom = getRandomSubset(answersArray, 4);
    const cancelMessageRandom = i % cancellationReasons.length;

    const registrationData = {
      event: eventId,
      user: userIds[userRandomIndex],
      status: status,
      answers: answerRandom,
    };

    // Thêm message nếu status là pending hoặc cancelled
    if (status === "pending" || status === "cancelled") {
      registrationData.message = cancellationReasons[cancelMessageRandom];
    }

    const result = db.eventregistrations.insertOne(registrationData);
    eventRegistrationIds.push(result.insertedId);
  }
}

// ATTENDANCE
// Lấy thông tin từ bảng event registration
const attendanceStatus = ["registered", "attended", "cancelled"];
const attendanceMessage = [
  "Chúng tôi ghi nhận bạn đã vắng mặt trong sự kiện vừa qua. Mong bạn thông báo trước nếu có lý do chính đáng.",
  "Bạn đã không tham gia sự kiện như đã đăng ký. Vui lòng cam kết trách nhiệm hơn trong những lần tới.",
  "Bạn đã vi phạm quy định trong sự kiện. Chúng tôi mong bạn sẽ rút kinh nghiệm để không tái diễn.",
  "Sự kiện yêu cầu đúng giờ nhưng bạn đã đến trễ mà không thông báo. Điều này ảnh hưởng đến tổ chức chung.",
  "Bạn đã bỏ về giữa chừng sự kiện mà không xin phép. Hành vi này không được khuyến khích.",
  "Chúng tôi rất tiếc vì bạn không thể tham gia. Lần sau hãy báo trước để BTC sắp xếp hợp lý hơn.",
  "Chúng tôi đã ghi nhận hành vi không phù hợp trong sự kiện. Vui lòng tuân thủ nội quy lần sau.",
  "Bạn đã không mang đầy đủ dụng cụ cần thiết như quy định. Vui lòng chuẩn bị kỹ hơn cho lần sau.",
  "Bạn đã không hoàn thành nhiệm vụ được giao trong sự kiện. Điều này ảnh hưởng đến kết quả chung.",
  "Mong bạn nghiêm túc hơn khi tham gia các sự kiện sau. Vắng mặt mà không báo là hành vi không tôn trọng BTC.",
  "Vui lòng đọc kỹ nội quy trước khi tham gia các sự kiện tiếp theo. Chúng tôi đánh giá cao tinh thần kỷ luật.",
  "Bạn đã có lời nói không phù hợp với người khác trong sự kiện. Mong bạn giữ thái độ tích cực và tôn trọng.",
  "Bạn đã gây ồn ào và làm gián đoạn hoạt động trong sự kiện. Vui lòng hợp tác giữ trật tự lần sau.",
  "Hành vi bỏ về khi chưa kết thúc sự kiện không được phép. BTC rất mong bạn sẽ cam kết tham gia đầy đủ.",
  "Chúng tôi mong bạn phản hồi lý do vắng mặt để cải thiện chất lượng sự kiện cho cộng đồng.",
];

const attendanceIds = [];

for (let i = 0; i < eventRegistrationIds.length; i++) {
  const existedEventRegistration = db.eventregistrations.findOne({
    _id: eventRegistrationIds[i],
  });

  if (existedEventRegistration) {
    const status = attendanceStatus[i % attendanceStatus.length];
    const message = attendanceMessage[i % attendanceMessage.length];
    const startDate =
      db.events.findOne({ _id: existedEventRegistration.event })?.startDate ||
      new Date();

    const attendanceData = {
      event: existedEventRegistration.event,
      user: existedEventRegistration.user,
      status: status,
    };

    if (status === "attended" || status === "cancelled") {
      attendanceData.message = message;

      // Giả lập checkOutTime sau khi sự kiện bắt đầu 2-5 tiếng
      const randomDays = Math.floor(Math.random() * 2) + 5; // 2 hoặc 3
      const checkOut = new Date(startDate);
      checkOut.setDate(checkOut.getDate() + randomDays);
      attendanceData.checkOutTime = checkOut;
    }

    const result = db.attendances.insertOne(attendanceData);
    attendanceIds.push(result.insertedId);
  }
}

// EVENT HISTORY
const historyEventIds = [];
// Các trạng thái hợp lệ theo schema
const historyStatusList = [
  "completed",
  "finished",
  "waiting",
  "processing",
  "approved",
  "pending",
  "cancelled",
  "rejected",
];

for (let i = 0; i < eventRegistrationIds.length; i++) {
  const eventRegistration = db.eventregistrations.findOne({
    _id: eventRegistrationIds[i],
  });

  if (eventRegistration) {
    const event = db.events.findOne({ _id: eventRegistration.event });

    if (!event) continue;

    const status = historyStatusList[i % historyStatusList.length];
    const registeredAt = new Date(event.startDate);
    registeredAt.setDate(
      registeredAt.getDate() - Math.floor(Math.random() * 7)
    ); // Đăng ký trước 0–6 ngày

    const attendedAt = new Date(event.startDate);
    attendedAt.setHours(8 + Math.floor(Math.random() * 5)); // Giờ ngẫu nhiên 8h–12h

    const completedAt =
      status === "completed" || status === "finished"
        ? new Date(event.endDate)
        : null;

    const historyData = {
      user: eventRegistration.user,
      event: event._id,
      status: status,
      registeredAt: registeredAt,
      attendedAt: attendedAt,
      completedAt: completedAt,
      earnedPoints:
        status === "completed" || status === "finished"
          ? Math.floor(Math.random() * 50 + 10)
          : 0,
      earnedHours:
        status === "completed" || status === "finished"
          ? Math.floor(Math.random() * 5 + 1)
          : 0,
    };

    const result = db.historyevents.insertOne(historyData);
    historyEventIds.push(result.insertedId);
  }
}

// FEEDBACK - DONE
const feedbackContents = [
  "Sự kiện rất bổ ích và có ý nghĩa.",
  "Tôi đã học hỏi được nhiều điều mới.",
  "Tổ chức rất chuyên nghiệp, sẽ tham gia lần sau!",
  "Rất vui khi được giúp đỡ cộng đồng.",
  "Mọi người thân thiện và vui vẻ.",
  "Sự kiện cần chuẩn bị kỹ hơn.",
  "Rất tiếc vì không tham gia đầy đủ.",
  "Không gian tổ chức hơi nhỏ, nhưng vẫn ổn.",
  "Thời gian hơi gấp, mong sắp xếp hợp lý hơn.",
  "Rất tuyệt vời! Mong có nhiều sự kiện như vậy nữa.",
  "Ban tổ chức rất tận tâm và chu đáo.",
  "Sự kiện diễn ra suôn sẻ và đúng kế hoạch.",
  "Địa điểm dễ tìm và thuận tiện di chuyển.",
  "Hoạt động giúp tôi gắn bó hơn với cộng đồng.",
  "Lần đầu tham gia và trải nghiệm rất tuyệt.",
  "Mọi người hỗ trợ lẫn nhau rất tốt.",
  "Tôi rất tự hào khi là một phần của chương trình.",
  "Mong chương trình được tổ chức thường xuyên hơn.",
  "Thời tiết không thuận lợi nhưng mọi người vẫn nhiệt tình.",
  "Thiếu nước uống trong suốt sự kiện.",
  "Chương trình có ý nghĩa nhân văn sâu sắc.",
  "Cảm ơn BTC đã tạo cơ hội cho chúng tôi tham gia.",
  "Sự kiện giúp tôi mở rộng mối quan hệ xã hội.",
  "Ban tổ chức phản hồi rất chậm.",
  "Sự kiện có nhiều khoảnh khắc đáng nhớ.",
  "Chất lượng âm thanh chưa tốt.",
  "Lịch trình có sự thay đổi đột ngột.",
  "Cảm giác rất hạnh phúc khi tham gia.",
  "Được hỗ trợ tận tình từ BTC.",
  "Một trải nghiệm không thể quên.",
  "Tôi thấy bản thân trưởng thành hơn sau sự kiện.",
  "Không khí rất sôi động và tích cực.",
  "Cần thêm chỗ đậu xe cho người tham gia.",
  "Tôi sẽ giới thiệu sự kiện này cho bạn bè.",
  "Hoạt động nhóm rất thú vị.",
  "Tôi cảm thấy được lắng nghe và trân trọng.",
  "Sự kiện mang lại năng lượng tích cực.",
  "Cảm ơn vì những đóng góp thầm lặng của tình nguyện viên.",
  "Thời gian diễn ra hơi dài so với dự kiến.",
  "Cần cải thiện phần đón tiếp ban đầu.",
  "Hoạt động dọn dẹp rất ý nghĩa.",
  "Tôi học được cách làm việc nhóm hiệu quả.",
  "Chương trình diễn ra đúng giờ.",
  "Cảm xúc rất khó tả, vui và tự hào.",
  "Sự kiện được tổ chức bài bản.",
  "BTC còn thiếu vài thiết bị cần thiết.",
  "Các bạn tình nguyện viên làm việc rất tích cực.",
  "Bài phát biểu truyền cảm hứng sâu sắc.",
  "Thời lượng chương trình vừa đủ.",
  "Tôi mong muốn đóng góp nhiều hơn trong tương lai.",
  "Phần chia sẻ kinh nghiệm rất hữu ích.",
  "Không gian hoạt động rộng rãi, thoải mái.",
  "Chương trình gợi lại nhiều ký ức tuổi trẻ.",
  "Cần thêm phần giao lưu để gắn kết.",
  "Hoạt động sáng tạo và mang tính giáo dục cao.",
  "Tôi thấy mình được sống chậm lại để yêu thương hơn.",
  "Mọi người đều hòa đồng, vui vẻ.",
  "Cảm giác ấm áp từ những hành động nhỏ.",
  "Đội ngũ hỗ trợ nhanh chóng và hiệu quả.",
  "Tôi thấy sự đoàn kết trong từng hành động.",
  "Tham gia lần này tôi học được rất nhiều điều.",
  "Cần thêm thời gian nghỉ giữa các hoạt động.",
  "Sự kiện này thực sự chạm đến trái tim tôi.",
  "Tôi đã có cơ hội giao lưu với nhiều người mới.",
  "Sự kiện được tổ chức rất chuyên nghiệp.",
  "Tôi hy vọng có thể góp mặt lần sau.",
  "Chương trình nên có thêm phần hỏi đáp.",
  "Tôi cảm nhận được tinh thần nhân ái lan tỏa.",
  "Cảm ơn BTC vì đã lắng nghe ý kiến người tham gia.",
  "Tôi rất ấn tượng với công tác tổ chức.",
  "Có những giây phút khiến tôi xúc động thật sự.",
  "Tôi thấy mình có trách nhiệm với cộng đồng hơn.",
  "Chương trình khơi gợi nhiều cảm xúc tích cực.",
  "Cần thêm người hỗ trợ hướng dẫn ban đầu.",
  "Được tham gia khiến tôi thấy cuộc sống thêm ý nghĩa.",
  "Mong chương trình tiếp tục lan tỏa điều tốt đẹp.",
  "Tôi học được cách đồng cảm với người khác.",
  "Hoạt động gắn liền với thực tế xã hội.",
  "Có chút khó khăn về việc di chuyển.",
  "Tôi cảm thấy rất được chào đón.",
  "Tổ chức rất linh hoạt và thích nghi tốt.",
  "Địa điểm tổ chức rất đẹp và thân thiện.",
  "Cần bổ sung thêm vật dụng y tế dự phòng.",
  "Tôi thấy chương trình nên có thêm trò chơi.",
  "Cảm ơn vì những kỷ niệm khó quên.",
  "Ban tổ chức nên khảo sát ý kiến người tham gia.",
  "Tôi cảm thấy tự hào khi được góp sức nhỏ bé.",
  "Sự kiện giúp tôi thay đổi tư duy tích cực hơn.",
  "Tôi đã tìm được nhiều người bạn mới.",
  "Mỗi hoạt động đều để lại dấu ấn riêng.",
  "Không khí chan hòa, thân thiện.",
  "Tôi rất hào hứng tham gia ngay từ đầu.",
  "Phần khai mạc cần rút ngắn lại.",
  "Cần thêm phần chia sẻ kinh nghiệm từ người đi trước.",
  "Không gian tổ chức sạch sẽ và an toàn.",
  "Tôi thấy trân trọng hơn những gì mình đang có.",
  "Sự kiện mang tính giáo dục cao.",
  "Tôi hy vọng chương trình ngày càng phát triển.",
  "Cần cải thiện phần đăng ký ban đầu.",
  "Mọi thứ diễn ra rất suôn sẻ.",
  "Tôi cảm thấy mình đang góp phần thay đổi xã hội.",
  "Sự kiện thực sự mang lại niềm vui.",
  "Tôi có cảm giác như được tiếp thêm động lực.",
  "Các bạn tổ chức rất nhiệt tình và thân thiện.",
  "Tôi sẽ tiếp tục tham gia nếu có cơ hội.",
  "Chương trình truyền cảm hứng sống đẹp.",
  "Rất cảm ơn sự hỗ trợ từ BTC.",
  "Tôi học được cách lắng nghe nhiều hơn.",
  "Sự kiện rất gần gũi và thân mật.",
  "Tôi mong được chia sẻ câu chuyện của mình lần tới.",
  "Tôi rất biết ơn những người đã tổ chức chương trình.",
  "Mỗi hoạt động đều mang lại giá trị khác nhau.",
  "Tôi cảm thấy mình đang góp phần xây dựng cộng đồng.",
  "Chương trình nên có thêm phần hướng dẫn kỹ năng.",
  "Sự kiện rất nhân văn và đáng trân trọng.",
  "Tôi thấy cuộc sống mình ý nghĩa hơn sau sự kiện.",
  "Mọi người phối hợp rất ăn ý và chuyên nghiệp.",
  "Không khí thân mật khiến tôi dễ hòa nhập.",
  "Tôi thấy yêu đời hơn khi được tham gia.",
  "Sự kiện giúp tôi gắn kết với cộng đồng địa phương.",
  "Tôi nhận ra tầm quan trọng của việc cho đi.",
  "Thời gian tổ chức rất hợp lý.",
  "Cần chuẩn bị thêm phần hậu cần.",
  "Tôi cảm thấy tự tin hơn sau khi tham gia.",
  "Chương trình có sức lan tỏa lớn.",
  "Tôi cảm thấy được truyền cảm hứng từ người khác.",
  "Tôi mong muốn được đóng góp nhiều hơn nữa.",
  "Cảm ơn sự hy sinh thầm lặng của các tình nguyện viên.",
  "Sự kiện giúp tôi nhìn nhận lại bản thân.",
  "Cần thêm hoạt động gắn kết người tham gia.",
  "Tôi hy vọng chương trình sẽ tiếp tục phát triển.",
  "Tôi cảm thấy có trách nhiệm với xã hội hơn.",
  "Chương trình khơi gợi lòng nhân ái.",
  "Tôi sẽ ghi nhớ kỷ niệm này mãi mãi.",
  "Tôi học được giá trị của sự sẻ chia.",
  "Không khí rất ấm áp và đầy tình người.",
  "Mong có thêm các hoạt động tương tự.",
  "Tôi cảm thấy mình thuộc về một cộng đồng tốt đẹp.",
  "Một trải nghiệm khiến tôi cảm thấy sống có ích.",
  "Tôi thấy chương trình rất thiết thực.",
  "Chương trình truyền tải thông điệp rõ ràng.",
  "Mọi người hợp tác rất hiệu quả.",
  "Tôi mong sự kiện được nhân rộng.",
  "Tôi đã học được những bài học quý báu.",
  "Tôi thấy mình có nhiều động lực hơn.",
  "Một hoạt động thực sự đáng tham gia.",
  "Tôi cảm thấy tự hào về chính mình.",
  "Cảm ơn những nụ cười và niềm vui đã nhận được.",
  "Tôi mong muốn lan tỏa tinh thần này đến nhiều người.",
  "Tôi cảm thấy được tiếp sức để sống tích cực hơn.",
];

const historyEvents = db.historyevents
  .find({ status: { $in: ["completed", "finished"] } })
  .limit(200)
  .toArray();

const feedbackIds = [];

historyEvents.forEach((history, i) => {
  const feedback = {
    userId: history.user,
    eventId: history.event,
    rating: randomRating(),
    content:
      feedbackContents[Math.floor(Math.random() * feedbackContents.length)],
    createdAt: new Date(
      history.completedAt || history.attendedAt || Date.now()
    ),
    like: Math.floor(Math.random() * 30),
  };

  const inserted = db.feedbacks.insertOne(feedback);
  feedbackIds.push(inserted.insertedId);
});

// CERTIFICATE
const historyEventsGet = db.historyevents
  .find({ status: { $in: ["completed", "finished"] } })
  .toArray();

const certificateIds = [];

historyEventsGet.forEach((history, i) => {
  const user = db.users.findOne({ _id: history.user });
  const event = db.events.findOne({ _id: history.event });
  const organization = db.organizations.findOne({ _id: user.organizationId });

  if (user && event) {
    const fullName = user.fullName;
    const email = user.email;
    const eventName = event.title;
    const organizationName = organization.name;
    const completionDate = history.completedAt || new Date();
    const duration = history.earnedHours;

    // Signature đơn giản
    const signature = (organizationName + "-" + eventName + "-" + i)
      .replace(/\s+/g, "-")
      .toLowerCase();

    const certificate = {
      userId: user._id,
      eventId: event._id,
      fullName: fullName,
      email: email,
      eventName: eventName,
      organizationName: organizationName,
      completionDate: new Date(completionDate),
      duration: duration,
      signature: signature,
      price: 30000,
      certificateUrl: "certificate.url",
    };

    const inserted = db.certificates.insertOne(certificate);
    certificateIds.push(inserted.insertedId);
  }
});

// CERTIFICATE PURCHASE
// Giả sử bạn đã có danh sách userIds và certificates chưa được mua
const certificatePurchaseIds = [];

// Tìm các historyEvent đã hoàn thành và có chứng chỉ (limit 5)
const historyEvent = db.historyevents
  .find({
    status: { $in: ["completed", "finished"] },
    certificateId: { $ne: null },
  })
  .limit(5)
  .toArray();

historyEvent.forEach((history, i) => {
  const certificate = db.certificates.findOne({ _id: history.certificateId });

  if (!certificate) return;

  const purchase = {
    userId: history.user,
    certificateId: history.certificateId,
    amount: certificate.price,
    paymentMethod: "ONLINE",
    paymentStatus: "paid",
    paidAt: new Date(history.completedAt || Date.now()),
    createdAt: new Date(),
  };

  const result = db.certificatepurchases.insertOne(purchase);
  certificatePurchaseIds.push(result.insertedId);
});
