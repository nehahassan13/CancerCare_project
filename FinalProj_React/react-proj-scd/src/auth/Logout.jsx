import { useEffect } from "react";
import { clearAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuth();          
   navigate("/login", { replace: true });  
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f2027",
      color: "#fff"
    }}>
      Logging out...
    </div>
  );
}
