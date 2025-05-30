const express = require('express');
const AIController = require('../controllers/ai.controller');
const AIRouter = express.Router();

AIRouter.post('/generate-text', AIController.requestAIContent);

module.exports = AIRouter;