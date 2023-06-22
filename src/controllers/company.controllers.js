const companyServices = require("../services/company.services");

async function createAccount(req, res) {
  const response = await companyServices.createCompany(req.body);
  res.status(response.status).json(response);
}

module.exports = { createAccount };
