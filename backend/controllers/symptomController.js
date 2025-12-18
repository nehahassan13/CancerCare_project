const Symptom = require("../models/Symptom"); 
const Patient = require('../models/Patient'); 
 
exports.addSymptom = async (req, res) => { 
    try { 
        const s = await Symptom.create(req.body); 
        res.status(201).json(s); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
}; 
 
 
exports.getSymptomsByPatient = async (req, res) => { 
    try { 
        const list = await Symptom.find({ patientId: req.params.patientId 
}).sort({ date: -1 }); 
        res.json(list); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
}; 
 
 
/*exports.getAlerts = async (req, res) => { 
    try { 
       
        const doctorId = req.user.id; 
 
        // 2. Woh saare Patients khojen jo is Doctor ko assigned hain 
        const assignedPatients = await Patient.find({ assignedDoctor: 
doctorId }).select('_id'); 
 
        // Agar Doctor ko koi Patient assign nahi hai, toh empty array 
return karein 
        if (!assignedPatients || assignedPatients.length === 0) { 
            return res.status(200).json([]); 
        } 
        
        // Assigned Patients ki IDs ka array bana lein 
        const patientIds = assignedPatients.map(p => p._id); 
 
    
 
        const alerts = await Symptom.find({ 
            patientId: { $in: patientIds }, 
            severity: { $gte: 7 } 
        }).populate('patientId', 'name email').sort({ date: -1 
}).limit(50); // Patient ka naam aur email bhi laayein 
 
        res.json(alerts); 
    } catch (err) { 
   
        res.status(500).json({ message: err.message }); 
    } 
}; */


exports.getAlerts = async (req, res) => {
  try {
    
    if (req.user.role !== "Doctor") {
      return res.status(403).json({ message: "Doctor only alerts" });
    }

    const doctorId = req.user.id;

   
    const patients = await Patient.find({
      assignedDoctor: doctorId
    }).select("_id");

    if (patients.length === 0) {
      return res.json([]);
    }

    const patientIds = patients.map(p => p._id);

  
    const alerts = await Symptom.find({
      patientId: { $in: patientIds },
      severity: { $gte: 7 }
    })
      .populate("patientId", "name email")
      .sort({ date: -1 });

    res.json(alerts);

  } catch (err) {
    console.error("GET ALERTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

 
 
exports.updateSymptom = async (req, res) => { 
    try { 
        const updatedSymptom = await Symptom.findByIdAndUpdate( 
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        ); 
 
        if (!updatedSymptom) { 
            return res.status(404).json({ message: "Symptom not found" }); 
        } 
        res.status(200).json(updatedSymptom); 
    } catch (err) { 
 
        res.status(400).json({ message: err.message }); 
    } 
}; 
 
 
exports.deleteSymptom = async (req, res) => { 
    try { 
        const result = await Symptom.findByIdAndDelete(req.params.id); 
 
        if (!result) { 
            return res.status(404).json({ message: "Symptom not found" }); 
        } 
        res.status(200).json({ message: "Symptom deleted successfully" }); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
}; 