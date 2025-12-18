


import { useEffect, useState } from "react";
import API from "../api/axios";

export default function DoctorAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/symptoms")
      .then((res) => {
        setAlerts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ALERT ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.loader}>Loading critical alerts...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
          🚨 Patient Alerts
        </h2>
        <p style={{ color: "#888", marginTop: "5px" }}>High severity symptoms reported by patients.</p>
      </header>

      {alerts.length === 0 ? (
        <div style={styles.emptyState}>✅ All patients are stable. No new alerts.</div>
      ) : (
        <div style={styles.grid}>
          {alerts.map((a) => (
            <div key={a._id} style={styles.alertCard(a.severity)}>
              <div style={styles.cardHeader}>
                <h3 style={{ margin: 0, fontSize: "18px" }}>{a.patientId?.name || "Unknown Patient"}</h3>
                <span style={styles.severityBadge(a.severity)}>
                  Severity: {a.severity}
                </span>
              </div>

              <div style={styles.content}>
                <p style={styles.symptomText}>
                  <strong>Symptom:</strong> {a.symptom}
                </p>
                
                <p style={styles.dateText}>
                  📅 <strong>Date:</strong> {a.date ? new Date(a.date).toLocaleDateString() : "N/A"}
                </p>

                <div style={styles.notesBox}>
                  <strong style={{ fontSize: "12px", color: "#007bff" }}>Patient/Doctor Notes:</strong>
                  <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#ccc", lineHeight: "1.4" }}>
                    {a.notes || "No additional notes provided."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px", color: "#fff", minHeight: "100vh" },
  header: { marginBottom: "30px", borderBottom: "1px solid #333", paddingBottom: "15px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  alertCard: (severity) => ({
    background: "#1a1a1a",
    borderRadius: "16px",
    padding: "20px",
   
    borderLeft: severity >= 8 ? "5px solid #ff4d4d" : "5px solid #ffcc00",
    borderTop: "1px solid #333",
    borderRight: "1px solid #333",
    borderBottom: "1px solid #333",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  }),
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  severityBadge: (severity) => ({
    background: severity >= 8 ? "rgba(255, 77, 77, 0.1)" : "rgba(255, 204, 0, 0.1)",
    color: severity >= 8 ? "#ff4d4d" : "#ffcc00",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
    border: `1px solid ${severity >= 8 ? "#ff4d4d" : "#ffcc00"}`,
  }),
  content: { display: "flex", flexDirection: "column", gap: "10px" },
  symptomText: { fontSize: "15px", margin: 0 },
  dateText: { fontSize: "13px", color: "#888", margin: 0 },
  notesBox: {
    background: "#222",
    padding: "12px",
    borderRadius: "10px",
    marginTop: "5px",
  },
  loader: { textAlign: "center", padding: "50px", color: "#fff" },
  emptyState: { 
    textAlign: "center", 
    padding: "40px", 
    background: "#1a1a1a", 
    borderRadius: "12px", 
    color: "#888",
    border: "1px dashed #333" 
  },
};