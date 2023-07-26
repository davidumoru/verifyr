const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Company = require("../models/company.models");
const responses = require("../utils/response");
const Pin = require("../utils/generateRandomPin");
const emailService = require("./email.services");
const Staff = require("../models/staff.models");

async function getAllCompanies() {
  try {
    const companies = await Company.find();
    return responses.buildSuccessResponse(
      "Successfully fetched all companies",
      200,
      companies
    );
  } catch (error) {
    return responses.buildFailureResponse("Failed to fetch companies", 500);
  }
}

async function createCompany(payload) {
  /**
   * Check if name and email and regNo [are already registered
   * Add the company to db
   */
  // const {name, contactEmail, regNo} = payload;
  const foundName = await Company.findOne({ name: payload.name });
  if (foundName) {
    return responses.buildFailureResponse(
      "Company Name Already registered",
      400
    );
  }

  const foundEmail = await Company.findOne({
    contactEmail: payload.contactEmail,
  });
  if (foundEmail) {
    return responses.buildFailureResponse(
      "Company email already registered",
      400
    );
  }

  // now that we have validated our data, let us now create the db

  // const newCompany = new Company(payload);
  // await newCompany.save();

  // OR

  const newCompany = await Company.create(payload);
  return responses.buildSuccessResponse(
    "Company created successfully",
    201,
    newCompany
  );
}

async function createAdmin(payload) {
  // const foundEmail = await staff.findOne({email: payload.email});
  // if(foundEmail) {
  //     return {
  //         message: "Staff email already registered",
  //         statusCode: 400,
  //         status: "failure"
  //     }
  // }

  // const foundPhone = await staff.findOne({phone: payload.phone});
  // if(foundPhone) {
  //     return {
  //         message: "Staff phone already registered",
  //         statusCode: 400,
  //         status: "failure"
  //     }
  // }

  const foundEmailOrPhone = await Staff.findOne({
    $or: [{ email: payload.email }, { phone: payload.phone }],
  });
  if (foundEmailOrPhone) {
    return responses.buildFailureResponse(
      "Staff phone or email duplicate",
      400
    );
  }
  // hashing the password here
  const saltRounds = 10;
  const generatedSalt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);

  payload.password = hashedPassword;
  payload.role = "admin";

  const savedStaff = await Staff.create(payload);
  return responses.buildSuccessResponse(
    "Staff created successfully",
    201,
    savedStaff
  );
}

async function createStaff(payload) {
  const foundEmailOrPhone = await Staff.findOne({
    $or: [{ email: payload.email }, { phone: payload.phone }],
  });
  if (foundEmailOrPhone) {
    return {
      message: "Staff phone or email duplicate",
      statusCode: 400,
      status: "failure",
    };
  }
  // hashing the password here
  const saltRounds = 10;
  const generatedSalt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);

  payload.password = hashedPassword;
  payload.role = "user";

  const savedStaff = await Staff.create(payload);
  return {
    message: "Staff created successfully",
    statusCode: 201,
    status: "success",
    data: savedStaff,
  };
}

const login = async (payload) => {
  try {
    const foundUser = await Staff.findOne({ email: payload.email }).lean();
    if (!foundUser) {
      return {
        message: "User not found",
        status: "failure",
        statusCode: 400,
      };
    }
    if (foundUser.role !== "admin") {
      return responses.buildFailureResponse("Only Admins Allowed", 403);
    }
    const foundPassword = await bcrypt.compare(
      payload.password,
      foundUser.password
    );
    if (!foundPassword) {
      return {
        message: "Password incorrect",
        status: "failure",
        statusCode: 403,
      };
    }

    const token = jwt.sign(
      {
        email: foundUser.email,
        firstName: foundUser.firstName,
        role: foundUser.role,
        _id: foundUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    foundUser.accessToken = token;
    return responses.buildSuccessResponse("Login successful", 200, foundUser);
  } catch (error) {
    return {
      message: "Unable to Login",
      status: "failure",
      statusCode: 500,
    };
  }
};

const forgotPassword = async (payload) => {
  // Find the user by email
  const foundUser = await Staff.findOne({ email: payload.email });
  if (!foundUser) {
    return responses.buildFailureResponse("Email not found", 404);
  }

  const resetPin = Pin.generateRandomPin();
  foundUser.resetPin = resetPin;
  await foundUser.save();

  const emailSubject = "Forgot Password - Reset Pin";
  const emailText = `You recently requested to reset your password.`;
  const emailHtml = `
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff;">
      <div style="background-color: #F7FFF2; padding: 15px;">
        <p style="color: #00140B; font-family: Helvetica, Arial, sans-serif; font-size: 45px; padding-bottom: 10px; text-align: center;"><strong>.staffVerify</strong></p>
      </div>
      <h1 style="color: #007bff; text-align: center;">Password Reset</h1>
      <p>Hello,</p>
      <p style="margin-bottom: 30px;">You recently requested to reset your password. Please use the following reset pin to complete the process:</p>
      <div style="padding: 20px; background-color: #007bff; color: #fff; text-align: center; font-size: 24px;">
        Your Reset Pin: <strong>${resetPin}</strong>
      </div>
      <p style="margin-bottom: 30px;">The pin is randomly generated. If it is made up of six digits, it means my code works well. Therefore, no one should be mad at my late submission :) </p>
      <p style="margin-top: 30px;">If you didn't request a password reset, please ignore this email.</p>
      <p style="margin-top: 30px;">Best regards,<br>Charles, Engineer @ <strong>staffVerify</strong></p>
      <h3 style="color: #007bff; text-align: center;"><a href = "https://www.apple.com/ng/macbook-pro/">Click Me for a Surprise!</a></h3>
    </div>
  </body>`;

  await emailService.sendEmail(
    foundUser.email,
    emailSubject,
    emailText,
    emailHtml
  );

  return responses.buildSuccessResponse("Password reset email sent", 200);
};

const searchStaff = async (query) => {
  try {
    const keyword = query.search
      ? {
          $or: [
            { firstName: { $regex: query.search, $options: "i" } },
            { lastName: { $regex: query.search, $options: "i" } },
            { email: { $regex: query.search, $options: "i" } },
          ],
          company: query.company,
        }
      : {};

    const foundStaff = await Staff.find(keyword);
    return responses.buildSuccessResponse("Staff Fetched", 200, foundStaff);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCompany,
  createAdmin,
  login,
  createStaff,
  forgotPassword,
  getAllCompanies,
  searchStaff,
};
