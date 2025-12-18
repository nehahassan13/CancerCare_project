

import { useEffect, useState } from "react";
import API from "../api/axios";

export default function DoctorDashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeAlerts: 0,
    ongoingTreatments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
       
        const [patientsRes, alertsRes, treatmentsRes] = await Promise.all([
          API.get("/patients/my-patients"),
          API.get("/symptoms"), 
          API.get("/treatments"), 
        ]);

        setStats({
          totalPatients: patientsRes.data.length,
          activeAlerts: alertsRes.data.filter(a => a.severity >= 7).length,
          ongoingTreatments: treatmentsRes.data?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard data error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div style={styles.loader}>Initializing Dashboard...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>🏥 Doctor Dashboard</h2>
        <p style={{ color: "#888" }}>Welcome back! Here is what's happening today.</p>
      </header>

   
      <div style={styles.statsGrid}>
        <div style={styles.statCard("#007bff")}>
          <span style={styles.icon}>👥</span>
          <div>
            <h4 style={styles.statLabel}>Total Patients</h4>
            <h2 style={styles.statValue}>{stats.totalPatients}</h2>
          </div>
        </div>

        <div style={styles.statCard("#ff4d4d")}>
          <span style={styles.icon}>🚨</span>
          <div>
            <h4 style={styles.statLabel}>Critical Alerts</h4>
            <h2 style={styles.statValue}>{stats.activeAlerts}</h2>
          </div>
        </div>

        <div style={styles.statCard("#28a745")}>
          <span style={styles.icon}>💊</span>
          <div>
            <h4 style={styles.statLabel}>Treatments</h4>
            <h2 style={styles.statValue}>{stats.ongoingTreatments}</h2>
          </div>
        </div>
      </div>

     
      <div style={styles.recentActivity}>
        <h3 style={{ fontSize: "18px", marginBottom: "15px" }}>System Overview</h3>
        <div style={styles.infoBox}>
          <p>✔️ All patient data is synchronized.</p>
          <p>✔️ Real-time alert system is active.</p>
          <p style={{ color: stats.activeAlerts > 0 ? "#ff4d4d" : "#888" }}>
            {stats.activeAlerts > 0 
              ? `⚠️ Attention: You have ${stats.activeAlerts} critical alerts to review.` 
              : "✅ No critical actions required at the moment."}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", color: "#fff", minHeight: "100vh" },
  header: { marginBottom: "30px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: (borderColor) => ({
    background: "#1a1a1a",
    padding: "25px",
    borderRadius: "16px",
    borderLeft: `6px solid ${borderColor}`,
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  }),
  icon: { fontSize: "35px" },
  statLabel: { margin: 0, color: "#aaa", fontWeight: "400", fontSize: "14px" },
  statValue: { margin: "5px 0 0 0", fontSize: "28px", fontWeight: "bold" },
  recentActivity: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #333",
  },
  infoBox: { color: "#ccc", fontSize: "14px", lineHeight: "1.8" },
  loader: { textAlign: "center", padding: "50px", color: "#fff" },
};
