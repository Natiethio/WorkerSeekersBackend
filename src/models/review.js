// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   reviewer: {type: String, required: true},
//   comment: {type: String, required: true},
//   rating: {type: Number, required: false},
//   date: {type: String, required: true},
// });

// module.exports = reviewSchema;

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    worker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },

    reviewer: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);