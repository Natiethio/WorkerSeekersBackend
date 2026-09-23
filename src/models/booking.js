// const mongoose = require("../configration/dbconfig");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  date: String,
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);