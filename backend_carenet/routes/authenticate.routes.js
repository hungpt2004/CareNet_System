const authenticateController = require('../controllers/authenticate.controller')
const express = require('express');
const { authenticateToken } = require('../middleware/isAuthenticate');
const authRouter = express.Router();

authRouter.post('/login', authenticateController.signInWithUsernamePassword);
authRouter.post('/register', authenticateController.signUpWithUsernamePassword);
authRouter.get('/verify-email', authenticateController.verifyAccountByLink);

module.exports = authRouter