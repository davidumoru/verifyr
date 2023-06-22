const express = require("express");
const companyControllers = require("../controllers/company.controllers");

const router = express.Router();

router.post("/createAccount", companyControllers.createAccount);

module.exports = router;
