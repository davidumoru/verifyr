const express = require("express");
const companyControllers = require("../controllers/company.controllers");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/create-admin",
  authMiddleware.authenticate,
  companyControllers.createAdmin
);
router.post(
  "/create-staff",
  authMiddleware.authenticate,
  companyControllers.createStaff
);
router.get(
  "/staff",
  authMiddleware.authenticate,
  companyControllers.searchStaff
);
router.get(
  "/",
  authMiddleware.authenticate,
  companyControllers.getAllCompanies
);

module.exports = router;
