const users = require("../dummies/users");

function loginService(payload) {
  const { email, password } = payload;

  const foundUsers = users.filter((user) => user.email === email);

  if (foundUsers.length === 0) {
    return {
      message: "User not found",
      status: "failure",
      statusCode: 404,
    };
  }

  const foundUser = foundUsers[0];

  if (foundUser.password !== password) {
    return {
      message: "Password is incorrect",
      status: "failure",
      statusCode: 400,
    };
  }

  return {
    message: "Login Successful",
    status: "success",
    statusCode: 200,
    data: foundUser,
  };
}

module.exports = {
  loginService,
};