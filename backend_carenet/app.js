const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./config/sessionConfig");
const authRouter = require("./routes/authenticate.routes");
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.routes");
const searchRouter = require("./routes/search.routes");


const app = express();
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use('/auth', authRouter)
app.use('/volunteer', userRouter)
app.use('/profile', profileRouter)
app.use('/search', searchRouter);

module.exports = app;
