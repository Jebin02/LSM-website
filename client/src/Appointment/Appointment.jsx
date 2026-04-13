 import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Appointment.css";

const Appointment = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountType: "",
    course: "",
    mentor: "",
    purpose: "",
    date: null,
    time: "",
    mode: "",
    notes: "",
  });

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
  ];

  // ✅ Load user + fetch appointments
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedUser) {
      setUser(loggedUser);
      setFormData((prev) => ({
        ...prev,
        name: loggedUser.name || "",
        email: loggedUser.email || "",
      }));
    }

    fetchAppointments();
  }, []);

  // ✅ GET appointments
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Better validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.accountType ||
      !formData.course ||
      !formData.mentor ||
      !formData.purpose ||
      !formData.date ||
      !formData.time ||
      !formData.mode
    ) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date.toISOString(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book");
      }

      // ✅ Update UI instantly
      setAppointments((prev) => [...prev, data]);

      alert("✅ Appointment Booked!");

      // ✅ Reset form (keep name/email)
      setFormData((prev) => ({
        ...prev,
        accountType: "",
        course: "",
        mentor: "",
        purpose: "",
        date: null,
        time: "",
        mode: "",
        notes: "",
      }));
    } catch (err) {
      console.error("Booking Error:", err);
      alert("❌ Error booking appointment");
    }

    setLoading(false);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      // ✅ Remove from UI
      setAppointments((prev) => prev.filter((a) => a._id !== id));

      alert("🗑️ Appointment cancelled");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("❌ Failed to delete");
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card">
        <h2>Book an Appointment</h2>

        <form onSubmit={handleSubmit}>
          {/* Personal */}
          <div className="form-section">
            <h3>Personal Information</h3>

            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter Name"
              onChange={handleChange}
              readOnly={!!user}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter Email"
              onChange={handleChange}
              readOnly={!!user}
            />

            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="">Account Type</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
            </select>
          </div>

          {/* Details */}
          <div className="form-section">
            <h3>Appointment Details</h3>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="AI">AI</option>
            </select>

            <select
              name="mentor"
              value={formData.mentor}
              onChange={handleChange}
            >
              <option value="">Select Mentor</option>
              <option value="John">John</option>
              <option value="Sarah">Sarah</option>
            </select>

            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              placeholder="Purpose"
              onChange={handleChange}
            />
          </div>

          {/* Date & Time */}
          <div className="form-section">
            <h3>Date & Time</h3>

            <DatePicker
              selected={formData.date}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, date }))
              }
              minDate={new Date()}
              placeholderText="Select Date"
            />

            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Mode */}
          <div className="form-section">
            <h3>Mode</h3>

            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Phone">Phone</option>
              <option value="Chat">Chat</option>
            </select>
          </div>

          {/* Notes */}
          <div className="form-section">
            <h3>Additional Notes</h3>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Write something..."
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>

        {/* Appointment List */}
        <div className="appointments-list">
          <h3>Your Appointments</h3>

          {appointments.length === 0 ? (
            <p>No appointments yet</p>
          ) : (
            appointments.map((a) => (
              <div key={a._id} className="appointment-item">
                <p>
                  <strong>{a.course}</strong> with {a.mentor}
                </p>
                <p>
                  {new Date(a.date).toLocaleDateString()} | {a.time}
                </p>

                <button onClick={() => handleDelete(a._id)}>
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;