const express = require("express");
const usersControllers = require("../controllers/users.controllers");

const router = express.Router();

router.post("/login", usersControllers.loginControllers);
router.post("/users", usersControllers.getUsers);

module.exports = router;
