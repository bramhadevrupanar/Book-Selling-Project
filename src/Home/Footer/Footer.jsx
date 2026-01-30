import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-about">
          <h2><span className="logo-green">Book</span>Place</h2>
          <p>
            Discover a wide collection of books across all genres. From bestsellers to academic resources,
            we bring knowledge and stories closer to you.
          </p>
          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Books</li>
            <li>About</li>
            <li>Resources</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li>Order Track</li>
            <li>Contact Us</li>
            <li>Find My Product</li>
            <li>Guide</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Policies</h3>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Happy Return</li>
            <li>Return Policy</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 All rights reserved || Made with ❤️ by Bramhadev Rupanar</p>
      </div>
    </footer>
  );
}

export default Footer;
