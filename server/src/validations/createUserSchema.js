const Joi = require("joi");

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  contactNo: Joi.string().required(),
  email: Joi.string().email().required(),
  staffId: Joi.string().required(),
  companyRole: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  company: Joi.string().required(),
});

module.exports = createUserSchema;
