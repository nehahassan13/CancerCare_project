const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Symptom = require("../models/Symptom");


exports.createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);

        if (req.body.assignedDoctor) {
            await Doctor.findByIdAndUpdate(
                req.body.assignedDoctor,
                { $addToSet: { patientsAssigned: patient._id } }
            );
        }

        res.status(201).json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





/*exports.getAllPatients = async (req, res) => {
  if (req.user.role !== "Doctor") {
    return res.status(403).json({ message: "Only Doctor can view patient" });
  }

  try {
    const doctor = await Doctor.findById(req.user.id)
      .populate({
        path: "patientsAssigned",
        select: "name age gender cancerType stage diagnosisDate symptoms",
        populate: [
          {
            path: "symptoms",
            select: "title severity createdAt"
          },
          {
            path: "assignedDoctor",
            select: "name specialization"
          }
        ]
      });

    res.json(doctor.patientsAssigned);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/

exports.getMyPatientsWithSymptoms = async (req, res) => {
  try {
    if (req.user.role !== "Doctor") {
      return res.status(403).json({ message: "Doctor only route" });
    }

   
    const patients = await Patient.find({
      assignedDoctor: req.user.id
    })
      .select("-password")
      .lean(); // 🔥 important

    if (patients.length === 0) {
      return res.json([]);
    }

    // 2️⃣ Patient IDs
    const patientIds = patients.map(p => p._id);

    // 3️⃣ Symptoms fetch karo
    const symptoms = await Symptom.find({
      patientId: { $in: patientIds }
    }).sort({ date: -1 });

    // 4️⃣ Map banao (patientId → symptoms[])
    const symptomMap = {};
    symptoms.forEach(s => {  
      const key = s.patientId.toString();
      if (!symptomMap[key]) {
        symptomMap[key] = [];
      }
      symptomMap[key].push(s);
    });

    // 5️⃣ Attach symptoms to patients
    const result = patients.map(p => ({
      ...p,
      symptoms: symptomMap[p._id.toString()] || []
    }));

    res.json(result);
  } catch (err) {
    console.error("GET MY PATIENTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};


/*exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
            .populate("assignedDoctor", "name specialization")
            .select("-password");

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (
            req.user.role === "Patient" &&
            patient._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Can view our profile only"
            });
        }

        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};*/


/*exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        if (
            req.user.role === "Patient" &&
            patient._id.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Permission denied"
            });
        }

        const updated = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};*/


exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        await Patient.findByIdAndDelete(req.params.id);

        if (patient.assignedDoctor) {
            await Doctor.findByIdAndUpdate(
                patient.assignedDoctor,
                { $pull: { patientsAssigned: patient._id } }
            );
        }

        res.json({ message: "Patient deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getMyProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user.id)
            .populate("assignedDoctor", "name specialization")
            .select("-password");

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.updateMyProfile = async (req, res) => {
    try {
        const patientId = req.user.id;
        const { assignedDoctor } = req.body;

        
        const restrictedFields = [
            "email",
            "doctorNotes",
            "patientsAssigned"
        ];
        restrictedFields.forEach(field => delete req.body[field]);

        const oldPatient = await Patient.findById(patientId);
        if (!oldPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        
        if (
            assignedDoctor &&
            (!oldPatient.assignedDoctor ||
                oldPatient.assignedDoctor.toString() !== assignedDoctor)
        ) {
            // 🔹 remove from old doctor
            if (oldPatient.assignedDoctor) {
                await Doctor.findByIdAndUpdate(
                    oldPatient.assignedDoctor,
                    { $pull: { patientsAssigned: patientId } }
                );
            }

            // 🔹 add to new doctor
            await Doctor.findByIdAndUpdate(
                assignedDoctor,
                { $addToSet: { patientsAssigned: patientId } }
            );
        }

       
        const updatedPatient = await Patient.findByIdAndUpdate(
            patientId,
            {
                ...req.body,
                assignedDoctor
            },
            { new: true }
        ).populate("assignedDoctor", "name specialization");

        res.json(updatedPatient);

    } catch (err) {
        console.error("UPDATE PROFILE ERROR:", err);
        res.status(500).json({ message: "Profile update failed" });
    }
};

