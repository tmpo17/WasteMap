import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../api";

export default function AddRequest() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    photo: ''
  });
  const [loading, setLoading] = useState(false);

const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first!');
    navigate('/login');
  }
}, [navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get location automatically
      navigator.geolocation.getCurrentPosition(async (position) => {
        const payload = {
          name: form.name,
          address: form.address,
          coordinates: [
            position.coords.latitude,
            position.coords.longitude
          ],
          photo: form.photo
        };

        const token = localStorage.getItem('token');



        await axios.post(
  `${API_BASE_URL}/api/waste-requests`,
  payload,
  { headers: { Authorization: `Bearer ${token}` } }
);
        alert('✅ Request created successfully!');
        setForm({ name: '', address: '', photo: '' });
        setLoading(false);
      },
      (error) => {
        console.error('Location error:', error);
        alert('❌ Unable to get your location. Please enable location permissions.');
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to create request.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add Waste Pickup Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="photo"
          placeholder="Photo URL (optional)"
          value={form.photo}
          onChange={handleChange}
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}