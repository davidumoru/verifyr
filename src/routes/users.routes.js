const express = require("express")
const userControllers = require("../controllers/users.controllers")

const router = express.Router ()

router.post("/login", userControllers.loginControllers)
router.get("/users", usersControllers.getUsers)

module.exports = router