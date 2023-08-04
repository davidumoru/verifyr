const paymentServices = require("../services/payment.services");

// initiate- payment controller
const initiatePayment = async (req, res) => {
  try {
    const response = await paymentServices.initiatePayment(req.user);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
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
