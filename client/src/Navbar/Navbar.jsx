 import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Load & listen for user changes
  useEffect(() => {
    const loadUser = () => {
      const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(loggedUser);
    };

    loadUser(); // initial load

    // 🔥 listen for login/logout changes
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    // 🔥 trigger update instantly
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* Logo */}
          <div className="logo" onClick={() => navigate("/")}>
            <h2>LMS</h2>
          </div>

          {/* Hamburger */}
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid fa-bars"></i>
          </div>

          {/* Links */}
          <ul className={menuOpen ? "nav-links active" : "nav-links"}>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/")}>Courses</li>
            <li onClick={() => navigate("/appointments")}>
              Book Appointment
            </li>
          </ul>

          {/* Right Side */}
          <div className={menuOpen ? "nav-right active" : "nav-right"}>
            
            {!user ? (
              <>
                {/* Profile icon */}
               <button
                  className="signup-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

                <button
                  className="signup-btn"
                  onClick={() => navigate("/register")}
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                {/* ✅ Username */}
                <span className="username">
                  Hi, {user.name}
                </span>

                {/* ✅ Logout */}
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}

           
          </div>
        </div>
      </nav>

      {/* ✅ Welcome text */}
      {user && (
        <div className="welcome-text">
          Hello, {user.name} 👋
        </div>
      )}
    </>
  );
};

export default Navbar;