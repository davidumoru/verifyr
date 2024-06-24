const express = require("express");
const paymentControllers = require("../controllers/payment.controllers");

const router = express.Router();

router.post("/initiate", paymentControllers.initiatePayment);

module.exports = router;
