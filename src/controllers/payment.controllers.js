function paymentControllers(req, res) {
  console.log(req.body);
  res.status(200).json({
    message: "Payment Successful",
  });
}

function getReceipt(req, res) {
  console.log(req.body);
  res.status(200).json({
    message: "Receipt gotten",
  });
}

module.exports = {
  paymentControllers,
  getReceipt,
};
