const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  amount: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  reference: {
    type: String,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
