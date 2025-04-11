const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./config/sessionConfig");

const app = express();
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

module.exports = app;
