const paymentServices = require("../services/payment.services");

const initializePayment = async (req, res) => {
  try {
    const data = await paymentServices.initializePayment(req.body);
    res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to make payment",
      status: "failure",
    });
  }
};

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

module.exports = { initializePayment, paystackWebhook };
