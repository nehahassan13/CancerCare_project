import { useEffect, useState } from "react";
import API from "../api/axios";

export default function PatientProfile() {
  const [form, setForm] = useState({
    name: "", age: "", gender: "", cancerType: "", stage: "",
    diagnosisDate: "", contact: "", email: "", assignedDoctor: "",
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
   
    API.get("/doctors").then((res) => setDoctors(res.data)).catch((err) => console.log(err));
    
  
    API.get("/patients/profile/me").then((res) => {
      setForm({ 
        ...res.data, 
        assignedDoctor: res.data.assignedDoctor?._id || "", 
       
        diagnosisDate: res.data.diagnosisDate ? res.data.diagnosisDate.split('T')[0] : "" 
      });
    }).catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      await API.put("/patients/profile/me", form);
      alert("Profile Saved!");
    } catch (err) { alert("Error saving profile"); }
  };
  
  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Kya aap waqai apna account delete karna chahte hain? Ye action wapas nahi liya ja sakay ga."
    );
    if (confirmDelete) {
      try {
        await API.delete("/patients/profile/me");
        alert("Account deleted successfully.");
        window.location.href = "/login"; 
      } catch (err) {
        alert("Delete failed ");
      }
    }
  };


  const styles = {
    container: { padding: "40px", maxWidth: "800px", margin: "0 auto", color: "#fff" },
    card: { 
      background: "#1f1f1f", 
      padding: "30px", 
      borderRadius: "20px", 
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      border: "1px solid #333",
    },
    header: { marginBottom: "30px" },
    
  
    avatarSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '25px',
        borderBottom: "1px solid #333",
        paddingBottom: "20px",
    },
    avatarBadge: {
        width: "60px",
        height: "60px",
        background: "#4db6ac", 
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        fontWeight: "bold",
    },
    
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "20px"
    },
    inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
    label: { fontSize: "14px", color: "#bbb", fontWeight: "500" },
    input: {
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #444",
      background: "#2a2a2a",
      color: "#fff",
      outline: "none",
    },
    sectionTitle: {
      color: "#4db6ac", 
      borderBottom: "1px solid #2a2a2a", 
      paddingBottom: "8px", 
      marginBottom: "20px",
      marginTop: "30px",
      fontWeight: '600'
    },
    

    actions: {
        marginTop: "40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #333",
        paddingTop: "20px",
    },
    saveBtn: {
        padding: "12px 30px",
        background: "#4db6ac", 
        color: "#203a43",
        border: "none",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer",
        transition: "0.3s",
    },
    deleteBtn: {
        padding: "10px 20px",
        background: "transparent",
        color: "#ff4d4d", 
        border: "1px solid #ff4d4d",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "0.3s",
        fontWeight: '600'
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
     
        <div style={styles.avatarSection}>
          <div style={styles.avatarBadge}>{form.name?.charAt(0).toUpperCase() || "P"}</div>
          <div>
            <h2 style={{margin: 0, fontWeight: '700'}}>Medical Profile</h2>
            <p style={{color: '#aaa', margin: '5px 0 0 0'}}>Manage your personal and medical information.</p>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Personal Details</h3>
        <div style={styles.formGrid}>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Contact Number</label>
                <input name="contact" value={form.contact} onChange={handleChange} style={styles.input} />
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address (Read-only)</label>
                <input value={form.email} disabled style={{ ...styles.input, opacity: 0.6, cursor: "not-allowed" }} />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>Age</label>
                <input name="age" type="number" value={form.age} onChange={handleChange} style={styles.input} />
            </div>
            
            <div style={styles.inputGroup}>
                <label style={styles.label}>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} style={styles.input}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
        </div>
        
        <h3 style={styles.sectionTitle}>Oncology Information</h3>
        <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Cancer Type</label>
                <input name="cancerType" value={form.cancerType} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Stage</label>
                <input name="stage" value={form.stage} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Diagnosis Date</label>
                <input name="diagnosisDate" type="date" value={form.diagnosisDate} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Assigned Doctor</label>
                <select style={styles.input} name="assignedDoctor" value={form.assignedDoctor} onChange={handleChange}>
                    <option value="">Select Doctor</option>
                    {doctors.map(d => <option key={d._id} value={d._id} style={{color: "#000"}}>Dr. {d.name}</option>)}
                </select>
            </div>
        </div>
        
   
        <div style={styles.actions}>
          <button style={styles.saveBtn} onClick={saveProfile}>
            Save Changes
          </button>
          
          <button style={styles.deleteBtn} onClick={deleteAccount}>
            🗑️ Delete Account
          </button>
        </div>
        
      </div>
    </div>
  );
}