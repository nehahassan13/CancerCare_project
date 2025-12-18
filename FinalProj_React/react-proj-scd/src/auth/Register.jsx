

import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Doctor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        role === "Doctor"
          ? "/auth/register-doctor"
          : "/auth/register-patient";

      await API.post(endpoint, { name, email, password });

      alert(`${role} registered successfully `);
      navigate("/login");
    } catch {
      alert("Registration failed ");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Join CancerCare Portal</p>

        <input
          placeholder="👤 Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.select}
        >
          <option value="Doctor">👨‍⚕️ Doctor</option>
          <option value="Patient">🧑 Patient</option>
        </select>

        <button style={styles.button}>Register</button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    background: "#1e1e1e",
    padding: "40px",
    width: "380px",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color: "#fff",
  },

  title: { textAlign: "center", fontSize: "26px" },
  subtitle: { textAlign: "center", color: "#aaa", marginBottom: "20px" },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2a2a2a",
    color: "#fff",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2a2a2a",
    color: "#fff",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    background: "linear-gradient(90deg, #1e90ff, #00c6ff)",
  },

  footer: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "13px",
    color: "#bbb",
  },

  link: {
    color: "#00c6ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};






