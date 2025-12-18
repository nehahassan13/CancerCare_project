import { useEffect, useState } from "react";
import API from "../api/axios";

export default function DoctorProfile() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/doctors/profile/me");
        setForm(res.data);
      } catch (err) {
        console.error("Profile load failed");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      await API.put("/doctors/profile/me", form);
      alert("Profile updated successfully! ");
    } catch (err) {
      alert("Update failed ");
    }
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Do you want to delete this account."
    );
    if (confirmDelete) {
      try {
        await API.delete("/doctors/profile/me");
        alert("Account deleted successfully.");
        window.location.href = "/login"; 
      } catch (err) {
        alert("Delete failed ");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>👤 My Profile</h2>
        <p style={{ color: "#aaa" }}>Please manage your professional details here.</p>
      </div>

      <div style={styles.card}>
        
        <div style={styles.avatarSection}>
          <div style={styles.avatarBadge}>{form.name?.charAt(0) || "D"}</div>
          <h3>{form.name || "Doctor Name"}</h3>
        </div>

       
        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Experience (Years)</label>
            <input name="experience" type="number" value={form.experience} onChange={handleChange} style={styles.input} />
          </div>

          <div style={{ ...styles.inputGroup, gridColumn: "1 / -1" }}>
            <label style={styles.label}>Specialization</label>
            <input name="specialization" value={form.specialization} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address (Read-only)</label>
            <input value={form.email} disabled style={{ ...styles.input, opacity: 0.6, cursor: "not-allowed" }} />
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.saveBtn} onClick={saveProfile}>
            Update Profile
          </button>
          
          <button style={styles.deleteBtn} onClick={deleteAccount}>
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "800px", color: "#fff" },
  header: { marginBottom: "30px" },
  card: {
    background: "#1f1f1f",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  avatarSection: {
    textAlign: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #333",
    paddingBottom: "20px",
  },
  avatarBadge: {
    width: "80px",
    height: "80px",
    background: "#007bff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 auto 10px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", color: "#bbb", fontWeight: "500" },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #444",
    background: "#2a2a2a",
    color: "#fff",
    outline: "none",
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
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "10px 20px",
    background: "transparent",
    color: "#ff4d4d",
    border: "1px solid #ff4d4d",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },
};