const bcrypt = require("bcrypt");
const Company = require("../models/company.models");
const Staff = require("../models/staff.models");
const responses = require("../utils/response");
const createCompanySchema = require("../validations/createCompanySchema");
const createUserSchema = require("../validations/createUserSchema");

const getAllCompanies = async () => {
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
};

const createCompany = async (payload) => {
  try {
    const { error } = createCompanySchema.validate(payload);
    if (error) {
      return responses.buildFailureResponse(error.details[0].message, 400);
    }

    const foundName = await Company.findOne({ name: payload.name });
    if (foundName) {
      return responses.buildFailureResponse(
        "Company name already registered",
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

    const newCompany = await Company.create(payload);
    return responses.buildSuccessResponse(
      "Company created successfully",
      201,
      newCompany
    );
  } catch (error) {
    console.error(error);
    return responses.buildFailureResponse("Server Error", 500);
  }
};

const createAdmin = async (payload) => {
  try {
    // Validate payload against Joi schema
    const { error } = createUserSchema.validate(payload);
    if (error) {
      return responses.buildFailureResponse(error.details[0].message, 400);
    }

    const foundEmailOrPhone = await Staff.findOne({
      $or: [{ email: payload.email }, { contactNo: payload.contactNo }],
    });
    if (foundEmailOrPhone) {
      return responses.buildFailureResponse(
        "Staff email or contact number already exists",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    payload.password = hashedPassword;
    payload.role = "admin";

    const savedStaff = await Staff.create(payload);
    return responses.buildSuccessResponse(
      "Admin created successfully",
      201,
      savedStaff
    );
  } catch (error) {
    console.error(error);
    return responses.buildFailureResponse("Server Error", 500);
  }
};

const createStaff = async (payload) => {
  try {
    // Validate payload against Joi schema
    const { error } = createUserSchema.validate(payload);
    if (error) {
      return responses.buildFailureResponse(error.details[0].message, 400);
    }

    const foundEmailOrPhone = await Staff.findOne({
      $or: [{ email: payload.email }, { contactNo: payload.contactNo }],
    });
    if (foundEmailOrPhone) {
      return responses.buildFailureResponse(
        "Staff email or contact number already exists",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    payload.password = hashedPassword;
    payload.role = "user";

    const savedStaff = await Staff.create(payload);
    return responses.buildSuccessResponse(
      "Staff created successfully",
      201,
      savedStaff
    );
  } catch (error) {
    console.error(error);
    return responses.buildFailureResponse("Server Error", 500);
  }
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
    console.error(error);
    return responses.buildFailureResponse("Server Error", 500);
  }
};

module.exports = {
  createCompany,
  createAdmin,
  createStaff,
  getAllCompanies,
  searchStaff,
};
