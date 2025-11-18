import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import MapView from "./pages/MapView";
import AddRequest from "./pages/AddRequest";
import MyRequests from "./pages/MyRequests";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";

// simple reusable nav
function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.clear();     // remove token + user
    navigate("/login");       // redirect to login page
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Map</Link>
      <Link to="/add" style={{ marginRight: "10px" }}>Add Request</Link>
      <Link to="/my-requests" style={{ marginRight: "10px" }}>My Requests</Link>
      {user?.role === "admin" && (
        <Link to="/admin" style={{ marginRight: "10px" }}>Admin</Link>
      )}
      {!user ? (
        <>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <span style={{ marginRight: "10px" }}>
            👋 {user.name || "User"}
          </span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/add" element={<AddRequest />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}