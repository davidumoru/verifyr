require("dotenv").config();
const axios = require("axios");

const payment = require("../models/payment.models");
const responses = require("../utils/response");
const reference = require("../utils/generateRandomReference");

const initiatePayment = async (payload) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    };
    const body = {
      amount: Number(process.env.AMOUNT) * 100,
      email: payload,
      reference: reference.generateReference(),
    };

    const response = await axios.post(process.env.PAYSTACK_URL, body, options);
    console.log(response);
    await payment.create(body);
    return responses.buildSuccessResponse(
      "Transaction Initiated",
      200,
      response.data
    );
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse(error?.message, error?.statusCode);
  }
};

const paystackWebhook = async (payload) => {
  try {
    const foundUser = await payment.findOne({
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
    const updatedPayment = await payment.findByIdAndUpdate(
      { _id: foundUser._id },
      updateObject,
      { new: true }
    );
    return responses.buildSuccessResponse("Transaction Noted", 200);
  } catch (error) {
    return responses.buildFailureResponse(
      "Unable to get payment information",
      200
    );
  }
};

module.exports = {
  initiatePayment,
  paystackWebhook,
};
