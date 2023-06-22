const express = require("express");
const paymentControllers = require("../controllers/payment.controllers");

const router = express.Router();

router.post("/pay", paymentControllers.paymentControllers);

module.exports = router;
