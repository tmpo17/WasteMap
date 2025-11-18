import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapView from "./pages/MapView";
import AddRequest from "./pages/AddRequest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import MyRequests from "./pages/MyRequests";

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Map</Link>
        <Link to="/add" style={{ marginRight: '10px' }}>Add Request</Link>
        <Link to="/my-requests" style={{ marginRight: '10px' }}>My Requests</Link>
        <Link to="/admin" style={{ marginRight: '10px' }}>Admin</Link>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
      </nav>

      <Routes>
      <Route path="/" element={<MapView />} />
      <Route path="/add" element={<AddRequest />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </Router>
  );
}