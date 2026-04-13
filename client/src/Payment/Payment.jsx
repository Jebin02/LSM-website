import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [timeLeft, setTimeLeft] = useState(600);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || paid) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, paid]);

  const formatTime = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!data) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <h2>No Payment Data</h2>
          <p>Please enroll again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">

        <h2>Checkout</h2>

        {!paid && (
          <p className="timer">
            ⏳ Complete within {formatTime(timeLeft)}
          </p>
        )}

        {/* Course Summary */}
        <div className="course-summary">
          <h3>{data.course}</h3>

          <div className="price-row">
            <span>Course Price</span>
            <span>{data.price}</span>
          </div>

          <div className="price-row total">
            <span>Total</span>
            <span>{data.price}</span>
          </div>
        </div>

        {!paid ? (
          <>
            <div className="qr-section">
              <h4>Scan & Pay (UPI)</h4>

              <img
                src="/gpay-qr.png"
                alt="QR Code"
                className="qr-img"
              />

              <p>UPI ID: jebinsingh2020@okaxis</p>
            </div>

            <button
              className="pay-btn"
              disabled={timeLeft === 0}
              onClick={() => setPaid(true)}
            >
              Complete Payment
            </button>

            {timeLeft === 0 && (
              <p className="expired">Session expired</p>
            )}
          </>
        ) : (
          <div className="success-box">
            <h3>✅ Payment Successful</h3>
            <p>You now have access to this course 🎉</p>

            {/* ✅ NEW BUTTON */}
            <button
              className="go-course-btn"
              onClick={() => navigate("/Coursepage")}
            >
              Go to Course
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Payment;