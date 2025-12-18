
const mongoose = require("mongoose"); 
 
const DoctorSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    specialization: { type: String },
    experience: { type: Number, default: 0 }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    role: { type: String, default: "Doctor" }, 
    phone: { type: String }, 
 
    patientsAssigned: [ 
        { type: mongoose.Schema.Types.ObjectId, ref: "Patient" } 
    ], 
}, { timestamps: true }); 
 
module.exports = mongoose.model("Doctor", DoctorSchema);