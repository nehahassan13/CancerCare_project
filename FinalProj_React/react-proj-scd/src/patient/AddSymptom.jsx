

import API from "../api/axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddSymptom() {
  const token = localStorage.getItem("authToken");
  const { id } = jwtDecode(token);

  const location = useLocation();
  const navigate = useNavigate();

  const editingSymptom = location.state?.symptom;

  const [form, setForm] = useState({
    date: "",
    symptom: "",
    severity: "",
    notes: "",
  });

  useEffect(() => {
    if (editingSymptom) {
      setForm({
        date: editingSymptom.date?.slice(0, 10),
        symptom: editingSymptom.symptom,
        severity:
          editingSymptom.severity <= 3
            ? "Mild"
            : editingSymptom.severity <= 6
            ? "Moderate"
            : "Severe",
        notes: editingSymptom.notes || "",
      });
    }
  }, [editingSymptom]);

  const submit = async (e) => {
    e.preventDefault();
    const severityMap = { Mild: 3, Moderate: 6, Severe: 9 };
    const payload = {
      patientId: id,
      date: form.date,
      symptom: form.symptom,
      severity: severityMap[form.severity],
      notes: form.notes,
    };

    try {
      if (editingSymptom) {
        await API.put(`/symptoms/${editingSymptom._id}`, payload);
        alert("Symptom Updated ");
      } else {
        await API.post("/symptoms", payload);
        alert("Symptom Added ");
      }
      navigate("/patient/symptoms");
    } catch (err) {
      alert("Failed ");
    }
  };

  const styles = {
    wrapper: { 
      background: "#203a43", 
      minHeight: "100vh", 
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Roboto, sans-serif" 
    },
    card: {
      background: "#2a2a2a", 
      maxWidth: "700px",
      margin: "0 auto",
      padding: "35px",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    title: { 
      fontSize: "26px", 
      fontWeight: "bold", 
      color: "#4db6ac", 
      marginBottom: "25px",
      borderBottom: "1px solid rgba(77, 182, 172, 0.2)",
      paddingBottom: "10px"
    },
    label: { 
      display: "block", 
      fontSize: "14px", 
      marginBottom: "8px", 
      color: "rgba(255,255,255,0.8)"
    },
    input: { 
      width: "100%", 
      padding: "12px", 
      marginBottom: "20px", 
      borderRadius: "6px", 
      border: "1px solid #444", 
      background: "#1e1e1e", 
      color: "white", 
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none"
    },
    textarea: { 
      width: "100%", 
      padding: "12px", 
      height: "100px",
      marginBottom: "25px", 
      borderRadius: "6px", 
      border: "1px solid #444", 
      background: "#1e1e1e", 
      color: "white", 
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none",
      resize: "none"
    },
    button: { 
      background: "#4db6ac", 
      color: "#203a43", 
      border: "none", 
      padding: "14px", 
      borderRadius: "8px", 
      fontWeight: "bold", 
      cursor: "pointer", 
      fontSize: "16px",
      width: "100%",
      transition: "0.3s"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {editingSymptom ? "Edit Symptom Details" : "Add New Symptom"}
        </h2>

        <form onSubmit={submit}>
          <label style={styles.label}>Date *</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            style={styles.input}
          />

          <label style={styles.label}>Symptom *</label>
          <input
            placeholder="What are you feeling?"
            value={form.symptom}
            onChange={(e) => setForm({ ...form, symptom: e.target.value })}
            required
            style={styles.input}
          />

          <label style={styles.label}>Severity Level *</label>
          <select
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
            required
            style={styles.input}
          >
            <option value="" style={{color: "#000"}}>Select Severity</option>
            <option value="Mild" style={{color: "#000"}}>Mild</option>
            <option value="Moderate" style={{color: "#000"}}>Moderate</option>
            <option value="Severe" style={{color: "#000"}}>Severe</option>
          </select>

          <label style={styles.label}>Additional Notes</label>
          <textarea
            placeholder="Any extra details..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            style={styles.textarea}
          />

          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.background = "#64ffda"}
            onMouseOut={(e) => e.target.style.background = "#4db6ac"}
          >
            {editingSymptom ? "Update Symptom" : "Add Symptom"}
          </button>
        </form>
      </div>
    </div>
  );
}