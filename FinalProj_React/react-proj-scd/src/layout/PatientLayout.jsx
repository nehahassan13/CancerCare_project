
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

export default function PatientLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();        
    navigate("/login"); 
  };

  const links = [
    { name: "Dashboard", path: "/patient/dashboard", icon: "🏠" },
    { name: "Profile", path: "/patient/profile", icon: "👤" },
    { name: "Add Symptom", path: "/patient/add-symptom", icon: "➕" },
    { name: "My Symptoms", path: "/patient/symptoms", icon: "🧬" },
    { name: "Doctor Notes", path: "/patient/doctor-notes", icon: "📝" },
    { name: "Treatments", path: "/patient/treatments", icon: "💊" },
  ];

  return (
    <div style={styles.layout}>
     
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>Patient Panel</h2>

        <nav style={styles.menu}>
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  ...styles.menuItem,
                  ...(active ? styles.active : {}),
                }}
              >
                <span style={styles.icon}>{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        
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
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    backgroundColor: "#203a43",
    color: "#ffffff",
  },

  sidebar: {
    width: "260px",
    backgroundColor: "#1e1e1e",
    padding: "30px 20px",
    boxShadow: "4px 0 15px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "30px",
    fontWeight: "600",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    backgroundColor: "#2a2a2a",
    color: "#cfd8ff",
    fontSize: "15px",
  },

  active: {
    backgroundColor: "#0d6efd",
    color: "#ffffff",
  },

  icon: {
    fontSize: "18px",
  },

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
  },
};
