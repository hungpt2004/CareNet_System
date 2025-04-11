const session = require('express-session');
require('dotenv').config();

const sessionMiddleware = session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 giờ
  }
});

module.exports = sessionMiddleware;
