const paymentServices = require("../services/payment.services");

// initiate- payment controller
const initiatePayment = async (req, res) => {
  try {
    const response = await paymentServices.initiatePayment(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to make payment",
      status: "failure",
    });
  }
};

// paystack webhook controller
const paystackWebhook = async (req, res) => {
  try {
    const response = await paymentServices.paystackWebhook(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    return res.status(5000).json({
      message: "Unable to resolve",
      status: "failure",
    });
  }
};

module.exports = { initiatePayment, paystackWebhook };
