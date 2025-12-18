

const express = require("express");
const router = express.Router();

const {
  //createDoctor,
  getAllDoctors,
  //getDoctorById,
  //updateDoctor,
  //deleteDoctor,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile
} = require("../controllers/doctorController");

const auth = require("../middleware/auth");

// 🔐 MY PROFILE ROUTES
router.get("/profile/me", auth, getMyProfile);

router.put("/profile/me", auth, updateMyProfile);
router.delete("/profile/me", auth, deleteMyProfile);

// 🔧 GENERAL DOCTOR ROUTES
//router.post("/", createDoctor);
router.get("/", getAllDoctors);
//router.get("/:id", getDoctorById);
//router.put("/:id", auth, updateDoctor);
//router.delete("/:id", auth, deleteDoctor);

module.exports = router;



