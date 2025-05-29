const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./config/sessionConfig");
const authRouter = require("./routes/authenticate.routes");
const userRouter = require("./routes/user.routes");
const profileRouter = require("./routes/profile.routes");
const searchRouter = require("./routes/search.routes");
const eventRegistrationRouter = require("./routes/eventRegistration.routes");
const eventRouter = require("./routes/event.routes");
const feedbackRouter = require("./routes/feedback.routes");
const organizationRouter = require("./routes/organization.routes");
const certificateRoutes = require('./routes/certificate.routes');
const attendanceRouter = require("./routes/attendance.routes");

const certificatePurchaseRoutes = require('./routes/certificatepurchase.routes');
const app = express();
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use("/auth", authRouter);
app.use("/volunteer", userRouter);
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/eventRegistration", eventRegistrationRouter);
app.use('/auth', authRouter)
app.use('/volunteer', userRouter)
app.use('/search', searchRouter);
app.use('/event', eventRouter);
app.use('/feedback', feedbackRouter);
app.use('/organization', organizationRouter);
app.use('/api/certificates', certificateRoutes);
app.use('/attendance', attendanceRouter);

app.use('/api/certificate-purchases', certificatePurchaseRoutes);
module.exports = app;
