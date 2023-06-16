const express = require("express")
const paymentsControl = require("../controllers/company.controllers")

const router = express.Router ()

router.post("/signup", companyControllers.registerCompany)

module.exports = router