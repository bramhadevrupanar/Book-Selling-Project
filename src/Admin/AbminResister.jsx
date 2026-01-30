import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminRegistration.css";
import axios from "axios";

function AdminResister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/admin")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exists = users.some((user) => user.email === email);
    if (exists) {
      setError("⚠️ Account already exists. Please login instead.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/admin", {
        name, email, password, gender
      });

      setName("");
      setEmail("");
      setPassword("");
      setGender("");
      setError("");

      navigate("/adminlogin");
    } catch (err) {
      console.error("Error registering user:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div id="regi-forms">
      <div className="login-register-links">
        <h2 id="login-heading">
          <Link>New Admin Sign In</Link>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <p>If you already have an account, please <Link to="/adminlogin">log in</Link>.</p>
        {error && <p className="error-message">{error}</p>}

        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default AdminResister;
