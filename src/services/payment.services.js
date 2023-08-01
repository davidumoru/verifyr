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
      response
    );
  } catch (error) {
    console.log(error);
    return responses.buildFailureResponse(error?.message, error?.statusCode);
  }
};

module.exports = {
  initiatePayment,
};
