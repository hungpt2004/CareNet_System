const Event = require("../models/event.model");
const Organization = require("../models/organization.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.requestSuggestByAI = asyncHandler(async (req, res) => {
  try {
    const currentUser = req.user.user;
    const listHobbies = currentUser.hobbies || [];
    const { street, ward, district, province, country } = currentUser.address;

    const locationQuery = {};
    if (street)
      locationQuery["location.street"] = { $regex: new RegExp(street, "i") };
    if (ward)
      locationQuery["location.ward"] = { $regex: new RegExp(ward, "i") };
    if (district)
      locationQuery["location.district"] = {
        $regex: new RegExp(district, "i"),
      };
    if (province)
      locationQuery["location.province"] = {
        $regex: new RegExp(province, "i"),
      };
    if (country)
      locationQuery["location.country"] = { $regex: new RegExp(country, "i") };

    const fullAddress = currentUser.address.fullAddress?.toLowerCase() || "";

    // Tìm event có skillNeeds hoặc category trùng hobby và location phù hợp
    const matchedEvents = await Event.find({
      $and: [
        { skillNeeds: { $in: listHobbies } },
        { category: { $in: listHobbies } },
      ],
      // Toán tử spread
      ...Object.entries(locationQuery).map(([key, value]) => ({
        [key]: value,
      })),
    });

    if (matchedEvents.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "Đây là kết quả từ CareNet",
        matchedEvents,
      });
    }

    console.log(
      `Su kien match truoc ${JSON.stringify(matchedEvents, null, 2)}`
    );

    // Nếu không có matchedEvents, lấy top 5 event đang tuyển nhiều người nhất
    const fallbackEvents = await Event.find({ status: "hiring" })
      .sort({ currentParticipants: -1 })
      .limit(5);

    console.log(`Su kien match sau ${JSON.stringify(matchedEvents, null, 2)}`);

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

exports.searchEvents = asyncHandler(async (req, res) => {
  try {
    const {
      name = "",
      province = "",
      district = "",
      ward = "",
      startDate,
      endDate,
      category = "",
    } = req.query;

    const query = {
      status: "hiring",
    };

    console.log(province);

    // Search theo tên sự kiện
    if (name.trim()) {
      query.title = { $regex: name.trim(), $options: "i" };
    }

    // Tìm theo category
    if (category.trim()) {
      query.category = category.trim();
    }

    // Search theo địa điểm (location)
    if (province.trim()) {
      query["location.province"] = { $regex: province.trim(), $options: "i" };
    }
    if (district.trim()) {
      query["location.district"] = { $regex: district.trim(), $options: "i" };
    }
    if (ward.trim()) {
      query["location.ward"] = { $regex: ward.trim(), $options: "i" };
    }

    // Search theo thời gian
    if (startDate && endDate) {
      query.startAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      query.startAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.startAt = { $lte: new Date(endDate) };
    }

    console.log(query);

    const events = await Event.find(query)
      .sort({
        startAt: 1,
      })
      .populate("organizationId", "name rating");

    console.log(events[0]);

    if (events.length <= 0)
      return res
        .status(500)
        .json({ status: "fail", message: "Không có sự kiện nào phù hợp" });

    return res.status(200).json({
      status: "success",
      message: "Kết quả tìm kiếm của bạn đã có",
      events,
    });
  } catch (error) {
    console.error("Lỗi search:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

exports.getAllCategoryFromEvents = asyncHandler(async (req, res) => {
  try {
    const eventCategories = await Event.find().select("category");

    const mapCategory = eventCategories.map((item) => item.category);

    return res.status(200).json({
      status: "success",
      message: "Lấy tất cả category",
      mapCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi khi lấy category",
    });
  }
});

exports.searchByRatingOrganization = asyncHandler(async (req, res) => {
  const { rating } = req.query;

  try {
    const organizations = await Organization.find({
      rating: { $gte: Number(rating) },
    });

    const organizationIds = organizations.map((org) => org._id);

    if (!organizationIds.length < 0) {
      console.log("No have any org Id");
    }

    const mapEvents = await Event.find({
      organizationId: { $in: organizationIds },
    });

    if (mapEvents.length <= 0) {
      return res.status(500).json({
        status: "fail",
        message: "Không tìm thấy event phù hợp",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Đây là kết quả tìm kiếm",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Lỗi tìm kiếm",
    });
  }
});
