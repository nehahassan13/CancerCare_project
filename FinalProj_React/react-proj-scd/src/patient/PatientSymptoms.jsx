import API from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PatientSymptoms() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const decoded = jwtDecode(token);
        const patientId = decoded.id;
       
        const res = await API.get(`/symptoms/patient/${patientId}`);
        
        setSymptoms(res.data.sort((a, b) => new Date(b.date) - new Date(a.date))); 
      } catch (err) {
        console.error("FETCH ERROR:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSymptoms();
  }, []);

  const deleteSymptom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this symptom log?")) return;
    try {
      await API.delete(`/symptoms/${id}`);
      setSymptoms(symptoms.filter((s) => s._id !== id));
      alert("Symptom deleted ");
    } catch (err) {
      alert("Delete failed ");
    }
  };

 
  const styles = {
    container: { 
      maxWidth: "900px", 
      margin: "0 auto", 
      padding: "20px 0" 
    },
    title: { 
      fontSize: "28px", 
      color: "#4db6ac", 
      marginBottom: "30px", 
      borderBottom: "1px solid rgba(77,182,172,0.2)", 
      paddingBottom: "10px" 
    },
    card: {
      background: "#1f1f1f", 
      borderRadius: "16px",
      padding: "25px",
      marginBottom: "20px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
      border: "1px solid #333" 
    },
    infoRow: { 
      marginBottom: "12px", 
      fontSize: "15px",
      display: 'flex',
      gap: '10px'
    },
    label: { 
      color: "#4db6ac", 
      fontWeight: "bold", 
      flexShrink: 0
    },
    
    symptomText: {
        color: '#fff',
        fontWeight: '500',
        lineHeight: 1.5,
    },
  
    notesText: {
        color: '#aaa',
        fontStyle: 'italic',
        lineHeight: 1.5
    },
    btnGroup: { 
      marginTop: "20px", 
      display: "flex", 
      gap: "15px",
      borderTop: "1px solid #333", 
      paddingTop: "15px"
    },
    editBtn: { 
      background: "#4db6ac", 
      color: "#203a43", 
      border: "none", 
      padding: "10px 20px", 
      borderRadius: "10px", 
      cursor: "pointer", 
      fontWeight: "700",
      transition: "0.3s"
    },
    deleteBtn: { 
      background: "transparent", 
      color: "#ff5252", 
      border: "1px solid #ff5252", 
      padding: "10px 20px", 
      borderRadius: "10px", 
      cursor: "pointer",
      fontWeight: '600',
      transition: "0.3s"
    }
  };

  if (loading) return <div style={{ color: "#fff", padding: "30px" }}>Loading symptom records...</div>;

  return (
    <div style={{ color: "white" }}>
      <div style={styles.container}>
        <h2 style={styles.title}>My Symptom Logs</h2>

        {symptoms.length === 0 ? (
          <p style={{opacity: 0.7}}>No records found. Please use the "Add Symptom" link to log your first symptom.</p>
        ) : (
          symptoms.map((s) => (
            <div key={s._id} style={styles.card}>
              
              <div style={styles.infoRow}>
                <span style={styles.label}>DATE:</span> 
                <span style={{color: '#fff'}}>{s.date ? new Date(s.date).toLocaleDateString() : 'N/A'}</span>
              </div>
              
              <div style={styles.infoRow}>
                <span style={styles.label}>SYMPTOM:</span> 
                <span style={styles.symptomText}>{s.symptom}</span>
              </div>
              
              <div style={styles.infoRow}>
                <span style={styles.label}>SEVERITY:</span> 
                <span style={{color: s.severity > 6 ? "#ff5252" : "#ffb74d", fontWeight: 'bold'}}>
                  {s.severity} / 10
                </span>
              </div>
              
              {s.notes && (
                <div style={{...styles.infoRow, marginTop: '15px'}}>
                  <span style={styles.label}>NOTES:</span> 
                  <span style={styles.notesText}>{s.notes}</span>
                </div>
              )}

              <div style={styles.btnGroup}>
                <button
                  style={styles.editBtn}
                  onClick={() => navigate("/patient/add-symptom", { state: { symptom: s } })}
                >
                  Edit ✏️
                </button>
                <button style={styles.deleteBtn} onClick={() => deleteSymptom(s._id)}>
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}