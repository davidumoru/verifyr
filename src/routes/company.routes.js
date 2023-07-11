const express = require("express");
const companyControllers = require("../controllers/company.controllers");
const authMiddleware = require("../middlewares/auth")

const router = express.Router();

router.post("/createAccount", companyControllers.createAccount);
router.post('/createAdmin', authMiddleware.authenticate, companyControllers.createAdmin);
router.post("/login", companyControllers.login);

module.exports = router;
