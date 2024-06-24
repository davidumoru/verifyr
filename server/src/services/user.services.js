const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/user.models");
const response = require("../utils/response");

// Define Joi schemas
const signupSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signup = async (payload) => {
  try {
    // Validate payload against schema
    const { error } = signupSchema.validate(payload);
    if (error) {
      return response.buildFailureResponse(error.details[0].message, 400);
    }

    const { firstName, lastName, email, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.buildFailureResponse("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return response.buildSuccessResponse("User created successfully", 201, {
      token,
    });
  } catch (error) {
    console.error(error);
    return response.buildFailureResponse("Server Error", 500);
  }
};

const login = async (payload) => {
  try {
    // Validate payload against schema
    const { error } = loginSchema.validate(payload);
    if (error) {
      return response.buildFailureResponse(error.details[0].message, 400);
    }

    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      return response.buildFailureResponse("User not found", 400);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.buildFailureResponse("Invalid Password", 403);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return response.buildSuccessResponse("Login Successful", 200, { token });
  } catch (error) {
    console.error(error);
    return {
      message: "Server error",
      statusCode: 500,
    };
  }
};

module.exports = { signup, login };
