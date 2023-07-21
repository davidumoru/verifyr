const express = require("express");
const companyControllers = require("../controllers/company.controllers");
const authMiddleware = require("../middlewares/auth")

const router = express.Router();

router.post('/create-admin', authMiddleware.authenticate, companyControllers.createAdmin);
router.post('/create-staff', authMiddleware.authenticate, companyControllers.createStaff);
router.post('/create-account', companyControllers.createAccount);
router.post('/login', companyControllers.login);
router.post('/forgot-password', companyControllers.forgotPassword);
router.get('/staff', companyControllers.searchStaff);
router.get('/', companyControllers.getAllCompanies);

module.exports = router;
