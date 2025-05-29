const jwt = require("jsonwebtoken");
require('dotenv').config();

// Lấy người dùng từ việc kiểm tra access token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Chạy ở authenToken");
  console.log("Header: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access token missing or invalid" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Invalid token" });
    }
    req.user = user; // Gắn thông tin người dùng vào req.user

    next(); // Tiếp tục xử lý
  });
};

// Phân quyền route
exports.authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    console.log(`Lay tu middleware ${req.user.user.role}`);
    if (!allowedRoles.includes(req.user.user.role)) {
      console.log(allowedRoles);
      console.log(req.user.user.role)
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }
    next();
  };
};
