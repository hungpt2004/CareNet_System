const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./config/sessionConfig");
const authRouter = require("./routes/authenticate.routes");
const userRouter = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use('/auth', authRouter)
app.use('/volunteer', userRouter)

module.exports = app;
