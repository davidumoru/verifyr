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

module.exports = { initiatePayment }