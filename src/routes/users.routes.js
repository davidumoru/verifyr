const express = require("express");
const usersControllers = require("../controllers/users.controllers");

const router = express.Router();

router.post("/login", usersControllers.loginControllers);

module.exports = router;
