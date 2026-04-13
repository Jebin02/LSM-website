import React from "react";
import "./Footer.css"; // Make sure you have the CSS saved as Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About / Logo */}
        <div className="footer-section">
          <h3>LSM</h3>
          <p>
            Empowering learners everywhere. Explore courses, grow your skills,
            and achieve your goals online.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/help">Help Center</a></li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div className="footer-section">
          <h4>Stay Connected</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
         
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LSM. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;