const User = require("../models/user.model");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAssignEvent = asyncHandler(async (req, res) => {
    // 1. Lấy danh sách event đã được phân công
    // 3. Lấy danh sách event đã hoàn thành
    // 4. Lấy danh sách event đã hủy bỏ
    // 5. Lấy danh sách event đã được phân công cho user hiện tại
    // 6. Lấy danh sách event chưa được phân công cho user hiện tại
    
});

