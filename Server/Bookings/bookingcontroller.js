const Booking = require("./Bookingschema");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { date, time, mentor } = req.body;

    // Prevent double booking
    const exists = await Booking.findOne({ date, time, mentor });
    if (exists) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL BOOKINGS
exports.getBookings = async (req, res) => {
  try {
    const data = await Booking.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};