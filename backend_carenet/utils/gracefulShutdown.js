const { default: mongoose } = require("mongoose");

// Graceful shutdown
// Tác dụng đảm bảo ứng dụng được đóng gọn gàng
// Không gây ra lỗi
// Không mất dữ liệu khi server bị dừng hoặc restart

exports.gracefulShutdown = async (server, wss) => {
  console.log("\n🛑 Gracefully shutting down...");

  // 1. Đóng WebSocket
  if (wss) {
    console.log("🧹 Closing WebSocket server...");
    wss.clients.forEach((client) => client.terminate());
    wss.close();
  }

  // 2. Đóng HTTP server
  if (server) {
    console.log("🧹 Closing HTTP server...");
    server.close(() => {
      console.log("✅ HTTP server closed");
    });
  }

  // 3. Đóng MongoDB connection
  console.log("🧹 Closing MongoDB connection...");
  await mongoose.connection.close();

  console.log("✅ Shutdown complete");
  process.exit(0);
};
