const express = require("express");
const router = express.Router();
const sCtrl = require("../controllers/symptomController");
const auth = require("../middleware/auth");


router.post("/", auth, sCtrl.addSymptom);


router.get("/", auth, sCtrl.getAlerts);

router.get("/patient/:patientId", auth, sCtrl.getSymptomsByPatient);


router.put("/:id", auth, sCtrl.updateSymptom);
router.delete("/:id", auth, sCtrl.deleteSymptom);

module.exports = router;

