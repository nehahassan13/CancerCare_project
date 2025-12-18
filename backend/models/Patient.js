const mongoose = require("mongoose"); 
 
const PatientSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    age: { type: Number }, 
    gender: { type: String, enum: ["Male","Female","Other"], default: "Other" }, 
    cancerType: { type: String }, 
    stage: { type: String }, 
    diagnosisDate: { type: Date },  
    contact: { type: String }, 
email: { type: String, unique: true, sparse: true }, 
    password: { type: String}, 
    // models/Patient.js mein ye add karein:
nextAppointment: { type: Date },
lastCheckup: { type: Date },
 
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" 
}, 
    doctorNotes: [ 
        { 
            date: { type: Date, default: Date.now }, 
            note: { type: String }, 
            doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" } 
        } 
    ] 
}, { timestamps: true }); 
 
module.exports = mongoose.model("Patient", PatientSchema); 