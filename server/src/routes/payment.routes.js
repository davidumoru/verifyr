const express = require("express");
const paymentControllers = require("../controllers/payment.controllers");

const router = express.Router();

router.post("/initialize", paymentControllers.initializePayment);
router.post("/webhook", paymentControllers.paystackWebhook);

module.exports = router;
