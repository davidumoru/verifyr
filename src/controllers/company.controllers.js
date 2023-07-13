const companyServices = require("../services/company.services")

// Create account function
const createAccount = async (req, res) => {
  const data = await companyServices.createCompany(req.body)
  res.status(data.statusCode).json(data)
};
//create admin function
const createAdmin = async (req, res) => {
  const data = await companyServices.createAdmin(req.body)
  res.status(data.statusCode).json(data)
};

//createStaff function
const createStaff = async (req, res) => {
  const data = await companyServices.createStaff(req.body)
  res.status(data.statusCode).json(data)
};

//login function
const login = async (req, res) => {
  const data = await companyServices.login(req.body)
  res.status(data.statusCode).json(data)
};

//get companies function
const getAllCompanies = async (req, res) => {
    const data = await companyServices.getAllCompanies();
    res.status(data.statusCode).json(data);
 
};

//forgot password function
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await companyService.forgotPassword({ email });
    res.status(response.statusCode).json(response);
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    res.status(500).json({
      message: 'Internal server error',
      status: 'failure',
      statusCode: 500,
    });
  }
};


module.exports = { createAccount, createAdmin, login, createStaff, getAllCompanies, forgotPassword };
