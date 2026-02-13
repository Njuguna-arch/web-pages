import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false); // toggle between login/register

  const handleSubmit = async () => {
    if (!email || !password || (isRegister && !username)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const endpoint = isRegister ? "admin/register" : "admin/login";
      const body = isRegister
        ? { username, email, password }
        : { email, password };

      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      console.log(`${endpoint} response:`, response.status, data);

      if (response.ok) {
        //Redirect to dashboard for both register and login
        localStorage.setItem("adminToken", data.token);
        alert(
          isRegister
            ? "Admin registration successful! Redirecting to dashboard..."
            : "Admin login successful!"
        );
        window.location.href = "/admin/dashboard";
      } else {
        setError(
          data.message ||
            `${isRegister ? "Registration" : "Login"} failed. Please try again.`
        );
      }
    } catch (err) {
      console.error(`${isRegister ? "Register" : "Login"} error:`, err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#e4e7efff",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          width: "350px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          {isRegister ? "Admin Registration" : "Admin Login"}
        </h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
              backgroundColor: "#334155",
              color: "white",
            }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            backgroundColor: "#334155",
            color: "white",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            backgroundColor: "#334155",
            color: "white",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#3b82f6",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#3b82f6")
          }
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          style={{
            marginTop: "15px",
            cursor: "pointer",
            color: "#3b82f6",
            textAlign: "center",
          }}
          onClick={() => {
            setError("");
            setIsRegister(!isRegister);
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New admin? Register"}
        </p>

        {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      </div>
    </div>
  );
}