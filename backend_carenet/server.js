const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('./socket');
const http = require("http");
// const setupWebSocket = require("./services/websocketService");
const { gracefulShutdown } = require("./utils/gracefulShutdown");
const connectDB = require("./config/connectDatabase");
const app = require("./app");
require('dotenv').config();


// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
socketIO.init(server);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Bắt các tín hiệu
process.on("SIGINT", () => gracefulShutdown(server, socketIO.wss));  // Ctrl + C
process.on("SIGTERM",() => gracefulShutdown(server, socketIO.wss));  // Kill signal
