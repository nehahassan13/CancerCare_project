import React, { useState } from "react";
import API from "../api/axios";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
        userType: e.target.userType.value,
      };

      const res = await API.post("/auth/login", formData);
      
   
      saveAuth(res.data.token, res.data.role);

      
      if (res.data.role === "Doctor") {
        window.location.href = "/doctor/dashboard";
      } else if (res.data.role === "Patient") {
        window.location.href = "/patient/dashboard";
      } else {
       
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={submit} style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        <input
          name="email"
          type="email"
          placeholder="📧 Email address"
          required
          style={styles.input}
          disabled={loading}
        />

        <input
          name="password"
          type="password"
          placeholder="🔒 Password"
          required
          style={styles.input}
          disabled={loading}
        />

        <select 
          name="userType" 
          style={styles.select}
          disabled={loading}
          defaultValue="Doctor"
        >
          <option value="Doctor">👨‍⚕️ Doctor</option>
          <option value="Patient">🧑 Patient</option>
        </select>

        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footer}>
          Secure CancerCare Portal 🛡️
        </p>
      </form>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    backgroundColor: "#1e1e1e",
    padding: "40px",
    width: "100%",
    maxWidth: "360px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    color: "#fff",
  },

  title: {
    textAlign: "center",
    marginBottom: "5px",
    fontSize: "26px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#aaa",
    fontSize: "14px",
  },

  errorBox: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    color: "#ff6b6b",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
    border: "1px solid rgba(255, 0, 0, 0.2)",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },

  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(90deg, #1e90ff, #00c6ff)",
    transition: "0.3s",
  },

  footer: {
    marginTop: "15px",
    fontSize: "12px",
    color: "#777",
    textAlign: "center",
  },
};