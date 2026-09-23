
const mongoose = require("mongoose");
// const reviewSchema = require("./review");

const workerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Main profession
    profession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServicesCategory",
      required: true,
    },

    // Other professions
    other_professions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServicesCategory",
      },
    ],

    city: {
      type: String,
      required: true,
    },

    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },

    defaultprevious: {
      type: String,
      required: true,
    },

    previousworkimages: {
      type: [String],
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    wage: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    note: {
      type: String,
      default: "",
    },

    // reviews: {
    //   type: [reviewSchema],
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);

// Very important for nearby worker searches
workerSchema.index({
  location: "2dsphere",
});

module.exports = mongoose.model("Worker", workerSchema);


