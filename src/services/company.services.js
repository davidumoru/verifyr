const Company = require("../models/company.models");
const jwt = require("jsonwebtoken");

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

const login = async (payload) => {
  try {
    const foundUser = await staff.findOne({ email: payload.email });
    if (!foundUser) {
      return {
        message: "User does not exist",
        statusCode: 404,
        status: "failure",
      };
    }
    const foundPassword = await bcrypt.compare(
      payload.password,
      foundUser.password
    );
    if (!foundPassword) {
      return {
        message: "Password is incorrect",
        status: 403,
        status: "failure",
      };
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
    return {
      message: "Something went wrong",
      status: 500,
      status: "failure",
    };
  }
};

module.exports = { createCompany, login };
