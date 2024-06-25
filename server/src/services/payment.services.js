require("dotenv").config();
const axios = require("axios");

const Payment = require("../models/payment.models");
const responses = require("../utils/response");
const reference = require("../utils/generateRandomReference");

const initializePayment = async (payload) => {
  try {
    console.log(payload);
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: Number(process.env.AMOUNT) * 100,
      email: payload.email,
      reference: reference.generateReference(),
    };

    const response = await axios.post(process.env.PAYSTACK_URL, body, options);
    console.log("Payment initialized:", response.data);
    await Payment.create({ ...body, amount: body.amount / 100 });

    return responses.buildSuccessResponse(
      "Transaction initialized successfully",
      200,
      response.data
    );
  } catch (error) {
    console.error("Error initializing payment:", error);
    return responses.buildFailureResponse(
      error?.message,
      error?.response?.status
    );
  }
};

const paystackWebhook = async (payload) => {
  try {
    const foundUser = await Payment.findOne({
      reference: payload.data.reference,
    });

    const updateObject = {
      ipAddress: payload.data.ip_address,
      currency: payload.data.currency,
      channel: payload.data.channel,
      transactionId: payload.data.id,
      status: payload.data.status,
      paidAt: payload.data.paid_at,
    };
    const updatedPayment = await Payment.findByIdAndUpdate(
      { _id: foundUser._id },
      updateObject,
      { new: true }
    );
    return responses.buildSuccessResponse("Transaction Noted", 200);
  } catch (error) {
    console.error("Error processing webhook:", error);
    return responses.buildFailureResponse(
      "Unable to get payment information",
      500
    );
  }
};

module.exports = {
  initializePayment,
  paystackWebhook,
};
