const express = require("express");
const PaymentController = require("../controllers/payment.controller");
const PaymentRouter = express.Router();
const { authenticateToken } = require("../middleware/isAuthenticate");

PaymentRouter.post("/create-payment-link", authenticateToken, PaymentController.createPaymentLink);
PaymentRouter.post("/success-payment", authenticateToken, PaymentController.successPayment);
PaymentRouter.post("/cancel-payment", authenticateToken, PaymentController.cancelPayment);
PaymentRouter.post("/create-payment-service", authenticateToken, PaymentController.createPaymentLinkForOrganization);

module.exports = PaymentRouter;
