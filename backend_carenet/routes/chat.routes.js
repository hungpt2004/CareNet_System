const express = require('express')
const ChatRouter = express.Router();
const ChatController = require('../controllers/chat.controller');

ChatRouter.post('/create-chat', ChatController.createOrGetChat);
ChatRouter.