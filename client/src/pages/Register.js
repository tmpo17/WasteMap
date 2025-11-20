import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, form);
      alert("✅ Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}