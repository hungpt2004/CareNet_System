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

      // Xử lý khi organization join vào room của họ
      socket.on('joinOrganizationRoom', (organizationId) => {
        socket.join(organizationId);
        console.log(`Organization ${organizationId} joined their room`);
      });

      // Xử lý khi user rời khỏi room
      socket.on('leaveUserRoom', (userId) => {
        socket.leave(userId);
        console.log(`User ${userId} left their room`);
      });

      // Xử lý khi organization rời khỏi room
      socket.on('leaveOrganizationRoom', (organizationId) => {
        socket.leave(organizationId);
        console.log(`Organization ${organizationId} left their room`);
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

      // Xử lý sự kiện mua chứng chỉ
      socket.on('certificatePurchased', (data) => {
        // Gửi thông báo đến room của organization
        io.to(data.organizationId).emit('certificatePurchased', {
          type: 'certificate_purchased',
          message: 'Có người mới mua chứng chỉ',
          certificateId: data.certificateId,
          amount: data.amount,
          timestamp: new Date()
        });
        console.log(`Certificate purchase notification sent to organization ${data.organizationId}`);
      });

      // Thêm xử lý chat events
      socket.on('joinChat', (chatId) => {
        socket.join(`chat_${chatId}`);
        console.log(`User joined chat room: ${chatId}`);
      });

      socket.on('leaveChat', (chatId) => {
        socket.leave(`chat_${chatId}`);
        console.log(`User left chat room: ${chatId}`);
      });

      socket.on('sendMessage', async (data) => {
        try {
          const { chatId, senderId, message, receiverId } = data;
          
          // Lưu tin nhắn vào database thông qua controller
          const savedMessage = await require('./controllers/chat.controller').saveMessage({
            chatId,
            senderId,
            message,
            receiverId
          });

          // Gửi tin nhắn đến room chat
          io.to(`chat_${chatId}`).emit('newMessage', {
            ...savedMessage,
            timestamp: new Date()
          });

          // Gửi notification đến người nhận
          io.to(receiverId).emit('messageNotification', {
            type: 'new_message',
            senderId,
            message: message.substring(0, 30) + '...',
            timestamp: new Date()
          });
        } catch (error) {
          console.error('Error handling message:', error);
          socket.emit('messageError', { error: 'Could not send message' });
        }
      });

      socket.on('typing', (data) => {
        socket.to(`chat_${data.chatId}`).emit('userTyping', {
          userId: data.userId,
          isTyping: data.isTyping
        });
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