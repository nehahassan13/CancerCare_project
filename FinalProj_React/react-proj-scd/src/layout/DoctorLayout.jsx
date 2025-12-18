


import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

export default function DoctorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();       
    navigate("/login"); 
  };

  return (
    <div style={styles.layout}>
      
     
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>Doctor Panel</h2>

        <NavLink to="/doctor/dashboard" style={styles.link}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/doctor/profile" style={styles.link}>
          👨‍⚕️ Profile
        </NavLink>

        <NavLink to="/doctor/patients" style={styles.link}>
          🧑‍🤝‍🧑 My Patients
        </NavLink>

        <NavLink to="/doctor/alerts" style={styles.link}>
          🚨 Alerts
        </NavLink>

        <NavLink to="/doctor/treatments" style={styles.link}>
          💊 Treatments
        </NavLink>

        <NavLink to="/doctor/notes" style={styles.link}>
          📝 Patient Notes
        </NavLink>

       
        <button onClick={handleLogout} style={styles.logout}>
          🚪 Logout
        </button>
      </aside>

      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}


const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#203a43",
    color: "#fff",
  },

  sidebar: {
    width: "260px",
    backgroundColor: "#1e1e1e",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.5)",
  },

  title: {
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "bold",
  },

  link: ({ isActive }) => ({
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: isActive ? "#1e90ff" : "#2a2a2a",
    fontWeight: "500",
  }),

  logout: {
    marginTop: "auto",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#8b0000",
    color: "#fff",
    fontWeight: "600",
  },

  content: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#121212",
    minHeight: "100vh",
  },
};
