const companyServices = require("../services/company.services");

async function createAccount(req, res) {
  const response = await companyServices.createCompany(req.body);
  res.status(response.status).json(response);
}

const createAdmin = async (req, res) => {
  const data = await companyServices.createAdmin(req.body)
  res.status(data.statusCode).json(data)
};

async function login(req, res) {
  const response = await companyServices.login(req.body);
  res.status(response.status).json(response);
}

module.exports = { createAccount, createAdmin, login };
