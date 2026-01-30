import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminLogin.css";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/admin")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      toast.success("✅ Login Successful!");

      setTimeout(() => {
        navigate("/adminpanel");
        window.location.reload();
      }, 1500);
    } else {
      toast.error("❌ Invalid Email or Password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div id="login-forms">
      <div className="login-register-links">
        <h1 id="login-heading">
          <Link to="/adminlogin">Admin Login</Link>
        </h1>
      </div>

      <ToastContainer position="top-center" />

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {/* <p>
          If you do not have an account, please <Link to="/adminresister">Sign up</Link>.
        </p> */}

        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;