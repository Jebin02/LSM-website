const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    accountType: { type: String, required: true },

    course: { type: String, required: true },
    mentor: { type: String, required: true },
    purpose: String,

    date: { type: Date, required: true },
    time: { type: String, required: true },

    mode: { type: String, required: true },
    notes: String,

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);