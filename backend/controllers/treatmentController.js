// controllers/treatmentController.js 
const Treatment = require("../models/Treatment"); 
const Patient = require("../models/Patient");
 
/*exports.addTreatment = async (req, res) => { 
    try { 
        const tr = await Treatment.create(req.body); 
        
        res.status(201).json(tr); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
}; */


exports.addTreatment = async (req, res) => {
  try {
    const doctorId = req.user.entityId;
    const tr = await Treatment.create({
      ...req.body,
     doctorId:req.user.entityId
      //doctorId: req.user.id   // 🔥 MUST
    });
await Patient.findByIdAndUpdate(req.body.patientId, {
      assignedDoctor: doctorId
    });
    res.status(201).json(tr);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 
/*exports.getAllTreatments = async (req, res) => { 
    try { 
        const list = await 
Treatment.find().populate('patientId','name').populate('doctorId','name'); 
        res.json(list); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
}; */
 
exports.getTreatmentsByPatient = async (req, res) => { 
    try { 
        const list = await Treatment.find({ patientId: 
req.params.patientId }).sort({ startDate: -1 }); 
        res.json(list); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
}; 
 

exports.getDoctorTreatments = async (req, res) => {
  try {
    if (req.user.role !== "Doctor") {
      return res.status(403).json({ message: "Doctor only" });
    }

  
    const doctorId = req.user.entityId;

   
    const patients = await Patient.find({
      assignedDoctor: doctorId
    }).select("_id");

    const patientIds = patients.map(p => p._id);

    const treatments = await Treatment.find({
      patientId: { $in: patientIds },
      doctorId: doctorId
    })
      .populate("patientId", "name")
      .sort({ startDate: -1 });

    res.json(treatments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTreatment = async (req, res) => { 
    try { 
        const updated = await Treatment.findByIdAndUpdate(req.params.id, 
req.body, { new: true }); 
        if (!updated) return res.status(404).json({ message: "Treatment not found" }); 
        res.json(updated); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
}; 
 
exports.deleteTreatment = async (req, res) => { 
    try { 
        const removed = await Treatment.findByIdAndDelete(req.params.id); 
        if (!removed) return res.status(404).json({ message: "Treatment not found" }); 
        res.json({ message: "Treatment deleted" }); 
    } catch (err) { res.status(500).json({ message: err.message }); } 
};