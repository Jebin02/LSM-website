const express = require("express");
const router = express.Router();

const userController = require("./User/Usercontroller");
const bookingController = require("./Bookings/Bookingcontroller");
const doubtController = require("./Doubt/doubtcontroller");

// ✅ use EXACT names
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.forgotPassword);

router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Booking Routes
router.post("/bookings", bookingController.createBooking);
router.get("/bookings", bookingController.getBookings);

// POST doubt
router.post("/doubt", doubtController.createDoubt);

// GET doubts
router.get("/doubt", doubtController.getDoubts);


module.exports = router;