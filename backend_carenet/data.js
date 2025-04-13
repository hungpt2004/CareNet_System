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

const skillNeeds = [
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

// Random rating from 1.0 -> 5.0
function randomRating() {
   // Sinh số ngẫu nhiên từ 10 đến 50 (tương ứng 1.0 đến 5.0)
   const min = 10;
   const max = 50;
   const random = Math.floor(Math.random() * (max - min + 1)) + min;
   // Chuyển về dạng số thập phân (1.0 đến 5.0)
   return (random / 10).toFixed(1);
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


// INSERT ORGANIZATION
const organizationIds = [];
for (let i = 0; i < orgNames.length; i++) {
   let nameRandomIndex = i % orgNames.length; // random name org
   let userRandomIndex = i % userIds.length;  // random user id
   let staffRandomIndex = i % checkerIds.length;  // random member id
   let desRandomIndex = i % orgDescriptions.length;  // random user id
   let licenseRandomIndex = i % licenseDocumentUrl.length; // random license
   let orgLevel = i % organizationLevelIds.length; // random level org
 
   let existedOrganization = db.organizations.findOne({ name: orgNames[i] });
 
   if (!existedOrganization) {
     let organizations = db.organizations.insertOne({
       user: userIds[userRandomIndex],
       name: orgNames[nameRandomIndex],
       description: orgDescriptions[desRandomIndex],
       phone: generateRandomPhone(),
       adminStatus: 'approved',
       organizationStatus: 'active',
       members: checkerIds[staffRandomIndex],
       licenseDocumentUrl: licenseDocumentUrl[licenseRandomIndex],
       rating: randomRating(),
     }); // Lưu ID để sử dụng sau này
     organizationIds.push(organizations.insertedId);
   }
}

// UPDATE USER STAFF + ORGANIZATION ID
for (var i = 0; i < checkerIds.length; i++) {
  var staffRandomIndex = i % checkerIds.length; // Random staffId, giống nameRandomIndex
  var orgRandomIndex = i % organizationIds.length; // Random organizationId, giống userRandomIndex

  var staffId = checkerIds[staffRandomIndex];
  var orgId = organizationIds[orgRandomIndex];

  // Kiểm tra xem user có tồn tại và role là "staff" không, tương tự existedOrganization
  var existedUser = db.users.findOne({
    _id: staffId,
    role: "staff"
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

// ORGANIZATION SUBSCRIPTION
const organizationSubscriptionIds = [];
const paymentStatus = ["not paid", "paid"]
for (var i = 0; i < organizationIds.length; i++) {
  var userRandomIndex = i % userIds.length; // Random user id
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
      _id: userIds[userRandomIndex], // Dùng userId làm _id, theo schema bạn cung cấp trước đó
      organizationId: orgId,
      levelId: levelId,
      price: price,
      subscribedAt: subscribedAt,
      expiredAt: expiredAt,
      status: paymentStatus[statusRandomIndex]
    });

    // Lưu insertedId
    organizationSubscriptionIds.push(organizationsubscriptions.insertedId);
    print("Inserted subscription for organization: " + orgId + ", user: " + userIds[userRandomIndex]);
  } else {
    print("Organization not found or missing levelId for: " + orgId + ", skipping...");
  }
}
 
// EVENT REGISTRATION 


// EVENT HISTORY


// FEEDBACK


// CERTIFICATE 


// CERTIFICATE PURCHASE

