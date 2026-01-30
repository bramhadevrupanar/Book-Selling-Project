import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import Book from "../assets/Book.png";
import "./Navbar.css";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLogged(!!loggedInUser);

    if (loggedInUser) {
      fetchCartCount(); // ✅ fetch only if logged in
    } else {
      setCartCount(0); // ✅ reset if not logged in
    }

    fetchCategories();

    const handleCartAdd = () => setCartCount((prev) => prev + 1);
    const handleCartRemove = () =>
      setCartCount((prev) => (prev > 0 ? prev - 1 : 0));

    window.addEventListener("cartUpdated", handleCartAdd);
    window.addEventListener("cartUpdatedRemove", handleCartRemove);

    return () => {
      window.removeEventListener("cartUpdated", handleCartAdd);
      window.removeEventListener("cartUpdatedRemove", handleCartRemove);
    };
  }, [isLogged]); // ✅ run when login/logout state changes

  const fetchCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart");
      setCartCount(res.data.length);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/books");
      const uniqueCategories = [...new Set(res.data.map((book) => book.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLogged(false);
    setCartCount(0); // ✅ empty cart on logout
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          {/* <img src={Book} alt="Logo" className="logo-img" /> */}
          <h1 id="book-web-name">BookishBay</h1>
        </NavLink>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          </li>

          <li className="dropdown">
            <NavLink to="/morebook" onClick={() => setMenuOpen(false)}>Books ▾</NavLink>
            <ul className="dropdown-content">
              <li>
                <NavLink to="/morebook" onClick={() => setMenuOpen(false)}>All Books</NavLink>
              </li>
              {categories.map((cat, index) => (
                <li key={index}>
                  <NavLink to={`/books/${cat}`} onClick={() => setMenuOpen(false)}>
                    {cat}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </li>

          <li className="dropdown">
            {!isLogged ? (
              <>
                <button className="dropbtn">
                  <FaRegUserCircle /> Login ▾
                </button>
                <ul className="dropdown-content">
                  <li>
                    <NavLink to="/login" onClick={() => setMenuOpen(false)}>User</NavLink>
                  </li>
                  <li>
                    <NavLink to="/adminlogin" onClick={() => setMenuOpen(false)}>Admin</NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            )}
          </li>

          <li>
            <NavLink to="/order" className="nav-item cart-icon" onClick={() => setMenuOpen(false)}>
              <FaCartShopping />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </li>
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
