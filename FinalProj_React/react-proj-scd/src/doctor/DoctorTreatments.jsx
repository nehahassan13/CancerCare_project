import { useEffect, useState } from "react";
import API from "../api/axios";

export default function DoctorTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    patientId: "",
    treatmentType: "",
    startDate: "",
    endDate: "",
    medications: "",
    notes: "",
    completed: false,
  });


  const loadTreatments = async () => {
    try {
      const res = await API.get("/treatments/doctor");
      setTreatments(res.data || []);
    } catch (err) {
      setTreatments([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPatients = async () => {
    try {
      const res = await API.get("/patients/my-patients");
      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTreatments();
    loadPatients();
  }, []);

  
  const submitTreatment = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
       
        await API.put(`/treatments/${editingId}`, form);
        alert("Treatment updated successfully! ");
      } else {
        
        await API.post("/treatments", form);
        alert("New treatment plan created! ");
      }
      resetForm();
      loadTreatments();
    } catch (err) {
      alert("Error saving treatment ");
    }
  };

  // 🔹 DELETE Logic
  const deleteTreatment = async (id) => {
    if (window.confirm("Do you want to delete the treatment")) {
      try {
        await API.delete(`/treatments/${id}`);
        alert("Treatment deleted! ");
        loadTreatments();
      } catch (err) {
        alert("Error deleting treatment ");
      }
    }
  };


  const editTreatment = (t) => {
    setEditingId(t._id);
    setForm({
      patientId: t.patientId?._id || "",
      treatmentType: t.treatmentType,
      startDate: t.startDate ? t.startDate.split("T")[0] : "", 
      endDate: t.endDate ? t.endDate.split("T")[0] : "",
      medications: t.medications,
      notes: t.notes,
      completed: t.completed,
    });
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm({ patientId: "", treatmentType: "", startDate: "", endDate: "", medications: "", notes: "", completed: false });
    setEditingId(null);
  };

 
  const styles = {
    container: { padding: "30px", maxWidth: "1000px", margin: "0 auto", color: "#fff" },
    card: { background: "#1f1f1f", padding: "25px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", marginBottom: "40px", border: "1px solid #333" },
    inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
    label: { fontSize: "14px", color: "#bbb", marginLeft: "4px" },
    input: { padding: "12px", borderRadius: "10px", border: "1px solid #444", background: "#2a2a2a", color: "#fff", fontSize: "15px" },
    button: { gridColumn: "1 / -1", padding: "14px", borderRadius: "10px", border: "none", background: editingId ? "#28a745" : "#007bff", color: "white", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
    treatmentCard: { background: "#181818", border: "1px solid #333", borderRadius: "12px", padding: "20px", marginBottom: "15px", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" },
    cancelBtn: { gridColumn: "1 / -1", background: "none", border: "1px solid #555", color: "#888", padding: "8px", borderRadius: "8px", cursor: "pointer", marginTop: "5px" }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "10px" }}>💊 My Treatments</h2>

      <div style={styles.card}>
        <h3 style={{ marginBottom: "20px" }}>{editingId ? "✏️ Update Treatment" : "➕ Add New Treatment"}</h3>
        
        <form onSubmit={submitTreatment} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Patient</label>
            <select style={styles.input} value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} required>
              <option value="">Select Patient</option>
              {patients.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Treatment Type</label>
            <input style={styles.input} placeholder="e.g. Physiotherapy" value={form.treatmentType} onChange={(e) => setForm({ ...form, treatmentType: e.target.value })} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Start Date</label>
            <input type="date" style={styles.input} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>End Date</label>
            <input type="date" style={styles.input} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Medications</label>
            <input style={styles.input} placeholder="Enter medicines..." value={form.medications} onChange={(e) => setForm({ ...form, medications: e.target.value })} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Status</label>
            <select style={styles.input} value={form.completed} onChange={(e) => setForm({ ...form, completed: e.target.value === "true" })}>
              <option value="false">Ongoing ⏳</option>
              <option value="true">Completed ✅</option>
            </select>
          </div>

          <div style={{ ...styles.inputGroup, gridColumn: "1 / -1" }}>
            <label style={styles.label}>Special Notes</label>
            <textarea rows="3" style={{ ...styles.input, resize: "none" }} placeholder="Add details..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>

          <button type="submit" style={styles.button}>
            {editingId ? "Save Changes" : "Create Treatment Plan"}
          </button>
          
          {editingId && (
            <button type="button" onClick={resetForm} style={styles.cancelBtn}>Cancel Editing</button>
          )}
        </form>
      </div>

      <h3 style={{ marginBottom: "20px" }}>Active Plans</h3>
      {loading ? <p>Loading...</p> : treatments.length === 0 ? <p style={{color: '#666'}}>No active treatment plans found.</p> : treatments.map((t) => (
        <div key={t._id} style={styles.treatmentCard}>
          <div>
            <h4 style={{ color: "#007bff", margin: "0 0 5px 0" }}>{t.treatmentType}</h4>
            <p style={{ fontSize: "14px", margin: "0", color: "#ccc" }}>
              <strong>Patient:</strong> {t.patientId?.name || "Unknown"} | <strong>Status:</strong> {t.completed ? "Done" : "In Progress"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => editTreatment(t)} style={{ background: "none", border: "1px solid #555", color: "#fff", padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}>Edit</button>
            <button onClick={() => deleteTreatment(t._id)} style={{ background: "#dc3545", border: "none", color: "#fff", padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}