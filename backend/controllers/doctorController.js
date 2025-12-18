



const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

//exports.createDoctor = async (req, res) => {
  //try {
    //const doc = await Doctor.create(req.body);
    //res.status(201).json(doc);
  //} catch (err) {
    //res.status(500).json({ message: err.message });
  //}
//};


exports.getAllDoctors = async (req, res) => {
  try {
    const docs = await Doctor.find()
      .populate("patientsAssigned", "name cancerType stage");
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//exports.getDoctorById = async (req, res) => {
  //try {
    //const doc = await Doctor.findById(req.params.id)
      //.populate("patientsAssigned", "name cancerType stage");

    //if (!doc) {
      //return res.status(404).json({ message: "Doctor not found" });
    //}

    //res.json(doc);
  //} catch (err) {
    //res.status(500).json({ message: err.message });
  //}
//};


exports.getMyProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id)
      .select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to load profile" });
  }
};


exports.updateMyProfile = async (req, res) => {
  try {
   console.log("REQ BODY:", req.body);
    delete req.body.email;
    delete req.body.password;
    delete req.body.role;
    delete req.body.patientsAssigned;

    const updated = await Doctor.findByIdAndUpdate(
      req.user.id,   
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};

//exports.updateDoctor = async (req, res) => {

  //if (req.user.role !== "Doctor") {
    //return res.status(403).json({ message: "Access denied" });
  //}
  //console.log(req.user); 
  //console.log(req.params.id);

  //try {
    //const updated = await Doctor.findByIdAndUpdate(
      //req.params.id,
      //req.body,
      //{ new: true,
        //runValidators: true
       //}
    //);

    //if (!updated) {
      //return res.status(404).json({ message: "Doctor not found" });
    //}

    //res.json(updated);
  //} catch (err) {
    //res.status(500).json({ message: err.message });
  //}
//};

exports.deleteMyProfile = async (req, res) => {
  try {
    const removed = await Doctor.findByIdAndDelete(req.user.id);

    if (!removed) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await Patient.updateMany(
      { assignedDoctor: removed._id },
      { $unset: { assignedDoctor: "" } }
    );

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


//exports.deleteDoctor = async (req, res) => {
  //if (req.user.role !== "Doctor" || req.user.id !== req.params.id) {
    //return res.status(403).json({ message: "Access denied" });
  //}

  //try {
    //const removed = await Doctor.findByIdAndDelete(req.params.id);

    //if (!removed) {
      //return res.status(404).json({ message: "Doctor not found" });
    //}

    //await Patient.updateMany(
      //{ assignedDoctor: removed._id },
      //{ $unset: { assignedDoctor: "" } }
    //);

    //res.json({ message: "Doctor deleted" });
  //} catch (err) {
    //res.status(500).json({ message: err.message });
 // }
//};
