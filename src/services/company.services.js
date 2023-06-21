const Company = require("../models/company.models");

const createCompany = async (payload) => {
  const [name, contactEmail, regNo] = payload;

  const foundName = await Company.findOne({ name: name });
  if (foundName) {
    return {
      message: "Company already exists",
      status: 400,
      status: "failure",
    };
  }

  const foundContactEmail = await Company.findOne({
    contactEmail: contactEmail,
  });
  if (foundContactEmail) {
    return {
      message: "Contact email already exists",
      status: 400,
      status: "failure",
    };
  }

  const foundRegNo = await Company.findOne({ regNo: regNo });
  if (foundRegNo) {
    return {
      message: "Registration number already exists",
      status: 400,
      status: "failure",
    };
  }

  const newCompany = await Company.create(payload);
  return {
    message: "Company created successfully",
    status: 201,
    status: "success",
    data: newCompany,
  };
};

module.exports = createCompany;
