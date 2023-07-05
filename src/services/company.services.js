const Company = require("../models/company.models");
const responses = require("../utils/response");
const jwt = require("jsonwebtoken");

const createCompany = async (payload) => {
  const {name, contactEmail, regNo} = payload;

  const foundName = await Company.findOne({ name: name });
  if (foundName) {
    return responses.buildFailureResponse("Company name already exists", 400);
  }

  const foundContactEmail = await Company.findOne({
    contactEmail: contactEmail,
  });
  if (foundContactEmail) {
    return responses.buildFailureResponse("Contact email already exists", 400);
  }

  const foundRegNo = await Company.findOne({ regNo: regNo });
  if (foundRegNo) {
    return responses.buildFailureResponse(
      "Registration number already exists",
      400
    );
  }

  const newCompany = await Company.create(payload);
  return responses.buildSuccessResponse(
    "Company created successfully",
    201,
    newCompany
  );
};

const login = async (payload) => {
  try {
    const foundUser = await staff.findOne({ email: payload.email });
    if (!foundUser) {
      return responses.buildFailureResponse("User does not exist", 404);
    }
    const foundPassword = await bcrypt.compare(
      payload.password,
      foundUser.password
    );
    if (!foundPassword) {
      return responses.buildFailureResponse("Password is incorrect", 400);
    }
    const token = jwt.sign(
      {
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30" }
    );
  } catch (error) {
    return responses.buildFailureResponse("Something went wrong", 500);
  }
};

module.exports = { createCompany, login };
