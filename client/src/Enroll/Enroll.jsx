import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Enroll.css";

const Enroll = () => {
  const location = useLocation();
  const courseData = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    price: ""
  });

  const [error, setError] = useState("");

  // ✅ Auto fill course + price
  useEffect(() => {
    if (courseData) {
      setFormData((prev) => ({
        ...prev,
        course: courseData.title,
        price: courseData.price
      }));
    }
  }, [courseData]);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Submit + validation + navigation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email) {
      setError("Please fill all required fields!");
      return;
    }

    setError("");

    // ✅ Navigate to payment with data
    navigate("/payment", {
      state: {
        course: formData.course,
        price:
          formData.price === 0
            ? "Free"
            : `₹${formData.price}`
      }
    });
  };

  return (
    <div className="enroll-container">
      <div className="enroll-card">
        <h2>Enroll Course</h2>

        <form onSubmit={handleSubmit}>
          {/* Error */}
          {error && <p className="error">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Course Name */}
          <input
            type="text"
            value={formData.course}
            readOnly
          />

          {/* Price */}
          <input
            type="text"
            value={
              formData.price === 0
                ? "Free"
                : `₹${formData.price}`
            }
            readOnly
          />

          {/* ✅ FIXED BUTTON */}
          <button type="submit">
            Confirm Enrollment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enroll;