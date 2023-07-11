const users = require("../dummies/users");
const usersServices = require("../services/users.services");

function loginControllers(req, res) {
  const response = usersServices.loginUser(req.body);
  res.status(response.status).json(response);
}

function registerControllers(req, res) {
  console.log(req.body);
  res.status(200).json({ message: "User created" });
}

module.exports = {
  loginControllers,
  registerControllers
};
