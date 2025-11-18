import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix the default icon path issue
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker colors by status
const icons = {
  pending: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  "in-progress": new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  completed: new L.Icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

export default function MapView() {
  const [requests, setRequests] = useState([]);

  // Fetch requests
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/waste-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchData(); // initial load
    const interval = setInterval(fetchData, 10000); // every 10 s
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Community Waste Map</h2>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "85vh", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {requests.map((r) => (
          <Marker
            key={r._id}
            position={r.coordinates}
            icon={icons[r.status] || icons.pending}
          >
            <Popup>
              <b>{r.name}</b><br />
              {r.address}<br />
              Status: {r.status}<br />
              {r.photo && (
                <img
                  src={r.photo}
                  alt="Waste"
                  width="100"
                  style={{ marginTop: "8px" }}
                />
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}