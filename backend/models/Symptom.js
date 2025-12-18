const mongoose = require("mongoose"); 
 
const SymptomSchema = new mongoose.Schema({ 
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", 
required: true }, 
    date: { type: Date, default: Date.now }, 
    symptom: { type: String, required: true }, 
    severity: { type: Number, min: 0, max: 10, required: true }, 
    notes: { type: String } 
}, { timestamps: true }); 
 
module.exports = mongoose.model("Symptom", SymptomSchema); 