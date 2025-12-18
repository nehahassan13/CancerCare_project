

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients/my-patients");
        setPatients(res.data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <div style={styles.loader}>Loading...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>👥 My Patients</h2>
      </header>

      <div style={styles.grid}>
        {patients.map((patient) => (
          <div key={patient._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={{ margin: 0 }}>{patient.name}</h3>
              <span style={styles.stageBadge}>{patient.stage || "N/A"}</span>
            </div>

            <div style={styles.infoGrid}>
              <div style={styles.infoItem}><strong>Age:</strong> {patient.age}</div>
              <div style={styles.infoItem}><strong>Gender:</strong> {patient.gender}</div>
              <div style={{ ...styles.infoItem, gridColumn: "1/-1" }}>
                <strong>Cancer Type:</strong> {patient.cancerType}
              </div>
             
              <div style={{ ...styles.infoItem, gridColumn: "1/-1", color: "#007bff" }}>
                <strong>Diagnosis Date:</strong> {patient.diagnosisDate ? new Date(patient.diagnosisDate).toLocaleDateString() : "N/A"}
              </div>
            </div>

            <div style={styles.symptomSection}>
              <h4 style={{ fontSize: "14px", marginBottom: "8px" }}>Latest Symptoms</h4>
              {patient.symptoms && patient.symptoms.length > 0 ? (
                patient.symptoms.map((s) => (
                  <div key={s._id} style={styles.symptomBox}>
                    <div style={styles.symptomRow}>
                      <span style={styles.symptomName}>{s.symptom}</span>
                      <span style={styles.severityBadge(s.severity)}>Level: {s.severity}</span>
                    </div>
                    {/* ✅ Symptom ki Date yahan add ki hai */}
                    <p style={styles.symptomDate}>📅 Recorded: {s.date ? new Date(s.date).toLocaleDateString() : "N/A"}</p>
                    <p style={styles.symptomNotes}>{s.notes || "No notes"}</p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "12px", color: "#666" }}>No symptoms reported</p>
              )}
            </div>
            <button style={styles.viewBtn}>View Full History</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", color: "#fff" },
  header: { marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "10px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" },
  card: { background: "#1a1a1a", borderRadius: "16px", padding: "20px", border: "1px solid #333" },
  cardHeader: { display: "flex", justifyContent: "space-between", marginBottom: "15px" },
  stageBadge: { background: "#222", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", color: "#007bff", border: "1px solid #007bff" },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "14px", marginBottom: "15px" },
  infoItem: { background: "#252525", padding: "8px", borderRadius: "8px" },
  symptomSection: { background: "#111", padding: "12px", borderRadius: "12px", border: "1px solid #222" },
  symptomBox: { padding: "8px 0", borderBottom: "1px solid #222" },
  symptomRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  symptomName: { fontWeight: "600", fontSize: "13px" },
  symptomDate: { fontSize: "11px", color: "#888", margin: "4px 0" }, // New Style for Date
  symptomNotes: { fontSize: "12px", color: "#aaa", marginTop: "2px" },
  severityBadge: (val) => ({
    fontSize: "11px", padding: "2px 6px", borderRadius: "4px",
    background: val > 7 ? "#451a1a" : "#333",
    color: val > 7 ? "#ff4d4d" : "#ffcc00"
  }),
  viewBtn: { width: "100%", marginTop: "15px", padding: "10px", background: "#007bff", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer" },
  loader: { textAlign: "center", padding: "50px", color: "#fff" }
};