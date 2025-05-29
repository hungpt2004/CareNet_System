const socketIO = require('socket.io');
require('dotenv').config();

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIO(httpServer, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Xử lý khi user join vào room của họ
      socket.on('joinUserRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
      });

      // Xử lý khi user rời khỏi room
      socket.on('leaveUserRoom', (userId) => {
        socket.leave(userId);
        console.log(`User ${userId} left their room`);
      });

      // Xử lý sự kiện duyệt yêu cầu
      socket.on('requestApproved', (data) => {
        // Gửi thông báo đến room của user cụ thể
        io.to(data.userId).emit('requestApproved', {
          type: 'request_approved',
          message: data.message,
          eventId: data.eventId,
          eventTitle: data.eventTitle,
          timestamp: new Date()
        });
        console.log(`Notification sent to user ${data.userId}: ${data.message}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
}; 