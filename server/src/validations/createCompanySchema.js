const Joi = require("joi");

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  regNo: Joi.string().required(),
  email: Joi.string().email().required(),
  website: Joi.string().required(),
  contactPhone: Joi.string().required(),
  logo: Joi.string().valid("active", "inactive").default("active"),
});

module.exports = createCompanySchema;
