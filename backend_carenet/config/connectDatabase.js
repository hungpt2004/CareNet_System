const mongoose = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Hết thời gian chọn server sau 5s
    socketTimeoutMS: 45000, // Hết thời gian socket sau 45s
    maxPoolSize: 10,  // Tối đa 10 connection cùng lúc
    retryWrites: true, // Tự động retry khi write thất bại
    w: "majority", // Ghi dữ liệu vào đa số replica set (nếu có)
  };

  let retries = 5;
  let delay = 2000;
  while (retries) {
    try {
      await mongoose.connect(uri, options);
      console.log("✅ MongoDB connected");
      break;
    } catch (err) {
      console.error(`❌ MongoDB connection failed. Retries left: ${retries - 1}`);
      retries -= 1;
      if (retries === 0) {
        console.error("❌ All retries exhausted. Exiting...");
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, delay)); 
    }
  }
};

module.exports = connectDB;
