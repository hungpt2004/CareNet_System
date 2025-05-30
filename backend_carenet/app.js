const express = require("express");
const cors = require("cors");
const sessionMiddleware = require("./config/sessionConfig");
const authRouter = require("./routes/authenticate.routes");
const userRouter = require("./routes/user.routes");
const searchRouter = require("./routes/search.routes");
const eventRouter = require("./routes/event.routes");
const feedbackRouter = require("./routes/feedback.routes");
const organizationRouter = require("./routes/organization.routes");
const certificateRoutes = require('./routes/certificate.routes');
const attendanceRouter = require("./routes/attendance.routes");
const imageRouter = require('./routes/image.routes');
const paymentRouter = require('./routes/payment.routes');
const AdminRouter = require("./routes/admin.routes");
const StaffRouter = require("./routes/staff.routes");
const LevelRouter = require("./routes/level.routes");
const monthlyPaymentRouter = require('./routes/monthlyPayment.routes');

const certificatePurchaseRoutes = require('./routes/certificatepurchase.routes');
const AIRouter = require("./routes/ai.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: 'Có lỗi xảy ra!', error: err.message });
});

app.use('/auth', authRouter)
app.use('/volunteer', userRouter)
app.use('/search', searchRouter);
app.use('/event', eventRouter);
app.use('/feedback', feedbackRouter);
app.use('/organization', organizationRouter);
app.use('/certificates', certificateRoutes);
app.use('/attendance', attendanceRouter);
app.use('/images', imageRouter);
app.use('/payment', paymentRouter);
app.use('/admin', AdminRouter);
app.use('/staff', StaffRouter);
app.use('/level', LevelRouter);
app.use('/api/monthly-payment', monthlyPaymentRouter);
app.use('/ai', AIRouter);

app.use('/api/certificate-purchases', certificatePurchaseRoutes);
module.exports = app;
