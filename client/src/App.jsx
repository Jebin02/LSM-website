import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Homepage from "./Homepage/Homepage";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Appointment from "./Appointment/Appointment";
import Enroll from "./Enroll/Enroll";
import Payment from "./Payment/Payment";
import Coursepage from "./Coursepage/Coursepage";
import Certificate from "./Certificate/Certificate";


function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/coursepage" element={<Coursepage />} />
        <Route path="/certificate" element={<Certificate />} />
        
        
      </Routes>

      {/* Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;