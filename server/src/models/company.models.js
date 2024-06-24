const { mongoose } = require("mongoose");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  website: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

module.exports = mongoose.model("company", companySchema);
