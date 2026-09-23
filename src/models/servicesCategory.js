const mongoose = require("mongoose");
// const mongoose = require("../configration/dbconfig");

const servicesCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // icon key
  iconwhite: { type: String, required: true }, // icon key
  order: { type: Number, default: 0 }, // order key
  description: { type: String, required: true },
  detail: { type: String, required: true },
  heroimage: {type: String, required: true},
  images: {type: [String], required: true}, 
});

module.exports = mongoose.model("ServicesCategory", servicesCategorySchema);