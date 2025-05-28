const mongoose = require('mongoose');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

// Tạo hoặc lấy chat giữa 2 users
exports.createOrGetChat = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        
        let chat = await Chat.findOne({
            participants: { 
                $all: [userId1, userId2],
                $size: 2
            }
        });

        if (!chat) {
            chat = await Chat.create({
                participants: [userId1, userId2],
                type: 'private'
            });
        }

        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách chat của user
exports.getUserChats = async (req, res) => {

   const currentUser = req.usee.user;

    try {
        const userId = req.params.userId;
        const chats = await Chat.find({
            participants: userId
        })
        .populate('participants', 'fullname avatar')
        .populate({
            path: 'lastMessage',
            select: 'message sender createdAt'
        });

        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lưu tin nhắn mới
exports.saveMessage = async (messageData) => {
    try {
        const { chatId, senderId, message, receiverId } = messageData;
        
        const newMessage = await Message.create({
            chat: chatId,
            sender: senderId,
            receiver: receiverId,
            message: message
        });

        // Cập nhật lastMessage trong chat
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: newMessage._id,
            lastMessageAt: new Date()
        });

        return newMessage;
    } catch (error) {
        throw error;
    }
};

// Lấy tin nhắn của một chat
exports.getChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        const messages = await Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('sender', 'fullname avatar')
            .populate('receiver', 'fullname avatar');

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};