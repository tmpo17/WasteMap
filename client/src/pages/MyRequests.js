import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/waste-requests/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Error fetching user requests:", err));
  }, [navigate]);

  const statusColor = {
    pending: "orange",
    "in-progress": "blue",
    completed: "green",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Waste Pickup Requests</h2>

      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Address</th>
              <th>Date Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.address}</td>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
                <td style={{ color: statusColor[req.status] || "gray" }}>
                  {req.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}