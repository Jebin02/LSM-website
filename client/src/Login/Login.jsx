  import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlert({ show: true, type: "error", message: data.message || "Login failed. Try again." });
        return;
      }

      setAlert({ show: true, type: "success", message: "Login Successful!" });
      localStorage.setItem("data", JSON.stringify(data));
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setAlert({ show: true, type: "error", message: "Server error. Please try again." });
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">

        {/* Left Image */}
        <div className="login-image">
          <img
            src="https://i.pinimg.com/1200x/d4/0e/6c/d40e6cad3a109a93a1c1c103e699d528.jpg"
            alt="Learning"
          />
        </div>

        {/* Right Form */}
        <div className="login-form">
          {alert.show && (
            <div className={`alert ${alert.type}`}>
              {alert.message}
            </div>
          )}

          <h2>Welcome Back!</h2>
          <p>Sign in to continue to LearnHub</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn" >
              Login
            </button>
          </form>

          <p className="signup">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;