const mongoose = require("mongoose"); 
 
const TreatmentSchema = new mongoose.Schema({ 
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", 
required: true }, 
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, 
    treatmentType: { type: String, required: true }, 
    startDate: { type: Date }, 
    endDate: { type: Date }, 
    medications: { type: String }, 
    notes: { type: String }, 
    completed: { type: Boolean, default: false } 
}, { timestamps: true }); 
 
module.exports = mongoose.model("Treatment", TreatmentSchema); 