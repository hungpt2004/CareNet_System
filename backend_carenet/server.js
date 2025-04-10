const http = require("http");
const app = require("./app");
// const setupWebSocket = require("./services/websocketService");
const { gracefulShutdown } = require("./utils/gracefulShutdown");
const connectDB = require("./config/connectDatabase");
require('dotenv').config();

let server; // Khai báo server và wss ở ngoài để dùng trong shutdown
let wss;

const startServer = async () => {
  await connectDB();

  server = http.createServer(app); // Tạo http server
//   wss = setupWebSocket(server);    // Tạo socket server

  server.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
  });
};

startServer();

// Bắt các tín hiệu
process.on("SIGINT", () => gracefulShutdown(server, wss));  // Ctrl + C
process.on("SIGTERM",() => gracefulShutdown(server, wss));  // Kill signal
