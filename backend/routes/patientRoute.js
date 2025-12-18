

const express = require("express");
const router = express.Router();
const patientCtrl = require("../controllers/patientController");
const auth = require("../middleware/auth");
const Patient = require("../models/Patient");


router.get("/profile/me", auth, patientCtrl.getMyProfile);
router.put("/profile/me", auth, patientCtrl.updateMyProfile);



router.get("/my/notes", auth, async (req, res) => {
  try {
    if (req.user.role !== "Patient") {
      return res.status(403).json({ message: "Patient access only" });
    }

    const patient = await Patient.findById(req.user.entityId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient.doctorNotes || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/my-patients", auth, patientCtrl.getMyPatientsWithSymptoms);



router.post("/", auth, patientCtrl.createPatient);
//router.get("/", auth, patientCtrl.getAllPatients);
//router.get("/:id", auth, patientCtrl.getPatientById);
//router.put("/:id", auth, patientCtrl.updatePatient);
router.delete("/:id", auth, patientCtrl.deletePatient);

module.exports = router;
