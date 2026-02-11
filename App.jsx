import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"; // now imported

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Admin Login */}
        <Route path="/" element={<AdminLogin />} />

        {/* After login, redirect here */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;