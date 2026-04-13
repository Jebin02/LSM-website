const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional if not logged in
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doubt", doubtSchema);