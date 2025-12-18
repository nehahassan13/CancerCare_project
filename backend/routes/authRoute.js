console.log("🔥 AUTH ROUTE FILE LOADED");
const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

router.post("/register-doctor", authCtrl.registerDoctor);
router.post("/register-patient", authCtrl.registerPatient);
router.post("/login", authCtrl.login);

module.exports = router;