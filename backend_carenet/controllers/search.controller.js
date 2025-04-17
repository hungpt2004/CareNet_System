const Event = require('../models/event.model');
const asyncHandler = require('../middleware/asyncHandler');

exports.requestSuggestByAI = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user.user;
    const listHobbies = currentUser.hobbies || [];
    const { street, ward, district, province, country } = currentUser.address;

    const locationQuery = {};
    if (street) locationQuery['location.street'] = { $regex: new RegExp(street, 'i') };
    if (ward) locationQuery['location.ward'] = { $regex: new RegExp(ward, 'i') };
    if (district) locationQuery['location.district'] = { $regex: new RegExp(district, 'i')};
    if (province) locationQuery['location.province'] = { $regex: new RegExp(province, 'i') };
    if (country) locationQuery['location.country'] = { $regex: new RegExp(country, 'i') };

    const fullAddress = currentUser.address.fullAddress?.toLowerCase() || "";

    // Tìm event có skillNeeds hoặc category trùng hobby và location phù hợp
    const matchedEvents = await Event.find({
      $and: [
        { skillNeeds: { $in: listHobbies } },
        { category: { $in: listHobbies } },
      ],
      // Toán tử spread
       ...Object.entries(locationQuery).map(([key, value]) => ({ [key]: value })),
    });

    if (matchedEvents.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Đây là kết quả từ CareNet",
        matchedEvents,
      });
    }

    console.log(`Su kien match truoc ${JSON.stringify(matchedEvents,null,2)}`)

    // Nếu không có matchedEvents, lấy top 5 event đang tuyển nhiều người nhất
    const fallbackEvents = await Event.find({ status: "hiring" })
      .sort({ currentParticipants: -1 })
      .limit(5);

    console.log(`Su kien match sau ${JSON.stringify(matchedEvents,null,2)}`)

    return res.status(200).json({
      status: "success",
      message: "Không tìm thấy sự kiện phù hợp, trả về 5 sự kiện nổi bật",
      matchedEvents: fallbackEvents,
    });

  } catch (err) {
    console.error("Lỗi gợi ý sự kiện:", err);
    return res.status(500).json({
      status: "fail",
      message: "Đã xảy ra lỗi khi tìm kiếm sự kiện phù hợp",
    });
  }
});
