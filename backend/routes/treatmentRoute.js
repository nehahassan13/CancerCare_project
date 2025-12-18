const express = require("express");
const router = express.Router();
const trCtrl = require("../controllers/treatmentController");
const auth = require("../middleware/auth");
const Treatment = require("../models/Treatment");


const verifyDoctor = (req, res, next) => {
  if (req.user.role !== "Doctor") {
    return res.status(403).json({ message: "Doctor access only" });
  }
  next();
};


router.post("/", auth, verifyDoctor, trCtrl.addTreatment);
router.put("/:id", auth, verifyDoctor, trCtrl.updateTreatment);
router.delete("/:id", auth, verifyDoctor, trCtrl.deleteTreatment);
// Doc can see his treatment
router.get("/doctor", auth, verifyDoctor, trCtrl.getDoctorTreatments);


//  Patient can see their own
router.get("/my", auth, async (req, res) => {
  try {
    if (req.user.role !== "Patient") {
      return res.status(403).json({ message: "Patient access only" });
    }

    const treatments = await Treatment.find({
      patientId: req.user.entityId,
    });

    res.json(treatments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//router.get("/", auth, trCtrl.getAllTreatments);
// can see by using pat id
router.get("/patient/:patientId", auth, trCtrl.getTreatmentsByPatient);
module.exports = router;
