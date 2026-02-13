import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      alert("Unauthorized. Please log in as admin.");
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Welcome, Admin</h2>
        <p style={{ marginBottom: "10px" }}>
          You are now logged in to the admin dashboard.
        </p>
        <p style={{ marginBottom: "20px" }}>
          From here you can manage teachers, pupils, and system settings.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/");
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc2626")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#ef4444")
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
}