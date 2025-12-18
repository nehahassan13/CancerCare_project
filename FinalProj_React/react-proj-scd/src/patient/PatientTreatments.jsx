import { useEffect, useState } from "react";
import API from "../api/axios";

export default function PatientTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const res = await API.get("/treatments/my");
        setTreatments(res.data || []);
      } catch (err) {
        console.log("Error loading treatments", err);
      } finally {
        setLoading(false);
      }
    };

    loadTreatments();
  }, []);

 
  const styles = {
    container: { padding: "30px 0", color: "#fff", maxWidth: "900px" },
    header: { marginBottom: "25px", borderBottom: "1px solid #333", paddingBottom: "10px" },
    loader: { color: "#4db6ac", padding: "30px", fontSize: "16px" },
    
    
    card: { 
      background: "#1f1f1f", 
      borderRadius: "16px", 
      padding: "25px", 
      marginBottom: "20px",
      border: "1px solid #333",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
    },
    
    typeTitle: { 
      fontSize: "22px", 
      color: "#4db6ac", 
      marginBottom: "15px",
      fontWeight: "700"
    },
    
    
    infoGrid: { 
      display: "grid", 
      gridTemplateColumns: "1fr 1fr", 
      gap: "20px", 
      marginBottom: "20px" 
    },
    
   
    infoBox: {
      background: "#2a2a2a", 
      padding: "12px", 
      borderRadius: "10px", 
      fontSize: "14px"
    },
    
    
    detailSection: {
      marginTop: "15px",
      padding: "15px",
      background: "#151515", 
      borderRadius: "10px",
      borderLeft: "4px solid #4db6ac" 
    },
    
    label: { fontWeight: "bold", color: "#aaa", display: "block", marginBottom: "3px" },
    detailText: { margin: "0 0 10px 0", fontSize: "14px", lineHeight: "1.6" },
    statusBadge: (completed) => ({
      padding: "5px 10px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: "600",
      backgroundColor: completed ? "#28a74533" : "#ffc10733", 
      color: completed ? "#28a745" : "#ffc107"
    })
  };

  if (loading) {
    return <p style={styles.loader}>Loading treatments...</p>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>💊 My Treatments</h2>
      </header>

      {treatments.length === 0 && (
        <p style={{ color: "#aaa" }}>No treatments assigned yet.</p>
      )}

      {treatments.map((t) => (
        <div key={t._id} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={styles.typeTitle}>{t.treatmentType}</h3>
            <span style={styles.statusBadge(t.completed)}>
              {t.completed ? "✅ Completed" : "⏳ Ongoing"}
            </span>
          </div>

     
          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <span style={styles.label}>Start Date</span>
              {t.startDate ? new Date(t.startDate).toLocaleDateString() : "—"}
            </div>
            <div style={styles.infoBox}>
              <span style={styles.label}>End Date</span>
              {t.endDate ? new Date(t.endDate).toLocaleDateString() : "—"}
            </div>
          </div>

         
          {t.medications && (
            <div style={styles.detailSection}>
              <span style={styles.label}>Medications</span>
              <p style={styles.detailText}>{t.medications}</p>
            </div>
          )}

         
          {t.notes && (
            <div style={styles.detailSection}>
              <span style={styles.label}>Doctor Notes</span>
              <p style={styles.detailText}>{t.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}