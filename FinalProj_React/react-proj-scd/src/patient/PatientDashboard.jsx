/*import React from "react";

export default function PatientDashboard() {
 
  const stats = [
    { label: "Active Treatments", value: "2", icon: "💊", color: "#007bff" },
    { label: "Doctor Notes", value: "1", icon: "📝", color: "#ffc107" },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome Back! 👋</h1>
        <p style={styles.subtitle}>Progress of your health and treatment summary </p>
      </header>

     
      <div style={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} style={s.card}>
            <div style={{ ...s.iconCircle, backgroundColor: item.color }}>{item.icon}</div>
            <div>
              <div style={s.statLabel}>{item.label}</div>
              <div style={s.statValue}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

   
      <div style={styles.contentGrid}>
        <div style={s.mainCard}>
          <h3 style={{ marginTop: 0 }}>Current Health Status</h3>
          <hr style={s.divider} />
          
          <div style={s.statusItem}>
            <strong>Condition Status:</strong> 
            <span style={{ color: "#28a745" }}>Stable ✅</span>
          </div>
          
          <div style={s.statusItem}>
            <strong>Next Appointment:</strong> 
            <span></span>
          </div>
          
          <div style={s.statusItem}>
            <strong>Primary Doctor:</strong> 
            <span></span>
          </div>

          <div style={s.statusItem}>
            <strong>Last Checkup:</strong> 
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}


const styles = {
  container: { color: "#fff", padding: "10px" },
  header: { marginBottom: "30px" },
  title: { fontSize: "32px", marginBottom: "5px" },
  subtitle: { color: "#aaa", fontSize: "16px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  contentGrid: {
    maxWidth: "800px", 
  },
};

const s = {
  card: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid #333",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  statLabel: { color: "#888", fontSize: "14px" },
  statValue: { fontSize: "24px", fontWeight: "bold" },
  mainCard: {
    background: "#1e1e1e",
    padding: "25px",
    borderRadius: "15px",
    border: "1px solid #333",
  },
  divider: { border: "0.5px solid #333", margin: "15px 0" },
  statusItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #2a2a2a",
  },
};
*/







/*import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Patient ki profile fetch kar rahe hain taake assigned doctor mil sakay
        const res = await API.get("/patients/profile/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Dashboard data load failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Stats ko dynamic banane ke liye (Agar backend se counts aa rahe hon)
  const stats = [
    { label: "Active Treatments", value: profile?.treatmentCount || "2", icon: "💊", color: "#007bff" },
    { label: "Doctor Notes", value: profile?.notesCount || "1", icon: "📝", color: "#ffc107" },
  ];

  if (loading) return <div style={{ color: "#fff", padding: "20px" }}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome Back! 👋</h1>
        <p style={styles.subtitle}>Progress of your health and treatment summary</p>
      </header>

      <div style={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} style={s.card}>
            <div style={{ ...s.iconCircle, backgroundColor: item.color }}>{item.icon}</div>
            <div>
              <div style={s.statLabel}>{item.label}</div>
              <div style={s.statValue}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.contentGrid}>
        <div style={s.mainCard}>
          <h3 style={{ marginTop: 0 }}>Current Health Status</h3>
          <hr style={s.divider} />
          
          <div style={s.statusItem}>
            <strong>Condition Status:</strong> 
            <span style={{ color: "#28a745" }}>Stable ✅</span>
          </div>
          
          <div style={s.statusItem}>
            <strong>Next Appointment:</strong> 
            <span>{profile?.nextAppointment || "Dec 20, 2025 🗓️"}</span>
          </div>
          
      
          <div style={s.statusItem}>
            <strong>Primary Doctor:</strong> 
            <span style={{ color: "#4db6ac", fontWeight: "bold" }}>
              {profile?.assignedDoctor ? ` ${profile.assignedDoctor.name} 👨‍⚕️` : "Not Assigned"}
            </span>
          </div>

          <div style={s.statusItem}>
            <strong>Last Checkup:</strong> 
            <span>{profile?.lastCheckup || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles (Aapke purane styles hi hain)
const styles = {
  container: { color: "#fff", padding: "10px" },
  header: { marginBottom: "30px" },
  title: { fontSize: "32px", marginBottom: "5px" },
  subtitle: { color: "#aaa", fontSize: "16px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  contentGrid: { maxWidth: "800px" },
};

const s = {
  card: {
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid #333",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  iconCircle: {
    width: "50px", height: "50px", borderRadius: "12px",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
  },
  statLabel: { color: "#888", fontSize: "14px" },
  statValue: { fontSize: "24px", fontWeight: "bold" },
  mainCard: {
    background: "#1e1e1e", padding: "25px", borderRadius: "15px", border: "1px solid #333",
  },
  divider: { border: "0.5px solid #333", margin: "15px 0" },
  statusItem: {
    display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #2a2a2a",
  },
};*/




import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function PatientDashboard() {
  const [profile, setProfile] = useState({
    nextAppointment: "",
    lastCheckup: "",
    assignedDoctor: null,
    treatmentCount: 0,
    notesCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await API.get("/patients/profile/me");
        setProfile(res.data);
      } catch (err) {
        console.error("Dashboard data load failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);


  const handleUpdateStatus = async () => {
    setUpdating(true);
    try {
      await API.put("/patients/profile/me", {
        nextAppointment: profile.nextAppointment,
        lastCheckup: profile.lastCheckup,
      });
      alert("Status updated successfully! ");
    } catch (err) {
      alert("Update failed! Make sure backend fields exist. ");
    } finally {
      setUpdating(false);
    }
  };

  const stats = [
    { label: "Active Treatments", value: profile?.treatmentCount || "0", icon: "💊", color: "#007bff" },
    { label: "Doctor Notes", value: profile?.notesCount || "0", icon: "📝", color: "#ffc107" },
  ];

  if (loading) return <div style={{ color: "#fff", padding: "20px" }}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome Back! 👋</h1>
        <p style={styles.subtitle}>Manage your health status and treatment summary.</p>
      </header>

      <div style={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} style={s.card}>
            <div style={{ ...s.iconCircle, backgroundColor: item.color }}>{item.icon}</div>
            <div>
              <div style={s.statLabel}>{item.label}</div>
              <div style={s.statValue}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.contentGrid}>
        <div style={s.mainCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Current Health Status</h3>
            <button 
                onClick={handleUpdateStatus} 
                disabled={updating}
                style={s.updateBtn}
            >
              {updating ? "Saving..." : "Update Info"}
            </button>
          </div>
          <hr style={s.divider} />
          
          <div style={s.statusItem}>
            <strong>Condition Status:</strong> 
            <span style={{ color: "#28a745" }}>Stable ✅</span>
          </div>
          
       
          <div style={s.statusItem}>
            <strong>Next Appointment:</strong> 
            <input 
                type="date" 
                style={s.dateInput}
                value={profile?.nextAppointment ? profile.nextAppointment.split('T')[0] : ""}
                onChange={(e) => setProfile({...profile, nextAppointment: e.target.value})}
            />
          </div>
          
          <div style={s.statusItem}>
            <strong>Primary Doctor:</strong> 
            <span style={{ color: "#4db6ac", fontWeight: "bold" }}>
              {profile?.assignedDoctor ? `Dr. ${profile.assignedDoctor.name} 👨‍⚕️` : "Not Assigned"}
            </span>
          </div>

       
          <div style={s.statusItem}>
            <strong>Last Checkup:</strong> 
            <input 
                type="date" 
                style={s.dateInput}
                value={profile?.lastCheckup ? profile.lastCheckup.split('T')[0] : ""}
                onChange={(e) => setProfile({...profile, lastCheckup: e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { color: "#fff", padding: "10px" },
  header: { marginBottom: "30px" },
  title: { fontSize: "32px", marginBottom: "5px" },
  subtitle: { color: "#aaa", fontSize: "16px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  contentGrid: { maxWidth: "800px" },
};

const s = {
  card: {
    background: "#1e1e1e", padding: "20px", borderRadius: "15px",
    display: "flex", alignItems: "center", gap: "15px", border: "1px solid #333",
  },
  iconCircle: {
    width: "50px", height: "50px", borderRadius: "12px",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
  },
  statLabel: { color: "#888", fontSize: "14px" },
  statValue: { fontSize: "24px", fontWeight: "bold" },
  mainCard: {
    background: "#1e1e1e", padding: "25px", borderRadius: "15px", border: "1px solid #333",
  },
  divider: { border: "0.5px solid #333", margin: "15px 0" },
  statusItem: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 0", borderBottom: "1px solid #2a2a2a",
  },
 
  dateInput: {
    background: "#2a2a2a",
    border: "1px solid #444",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "8px",
    outline: "none",
    fontSize: "14px"
  },
  
  updateBtn: {
    background: "#4db6ac",
    color: "#1e1e1e",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "12px"
  }
};