import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signuppage.css";
import loginimg from '../assets/loginbanner.png';
import axios from "axios";

function Signuppage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/users")
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
      await axios.post("http://localhost:5000/users", {
        name, email, password
      });

      setName("");
      setEmail("");
      setPassword("");
      setError("");

      navigate("/login");
    } catch (err) {
      console.error("Error registering user:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div id="regi-forms">
      <img src={loginimg} alt="" />
      <div className="login-register-links">
        <h2 id="login-heading">
          <Link>Sign In</Link>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <p className="line">If you already have an account, please <Link to="/login">log in</Link>.</p>
        {error && <p className="error-message">{error}</p>}

        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signuppage;
