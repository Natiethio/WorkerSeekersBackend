// const mongoose = require("../configration/dbconfig");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},
  sex: { type: String, required: true},
  password: {type: String, required: true},
  role: { type: String, enum: ['user', 'admin', 'worker'], default: 'user' },
  image: { type: String, default: '' },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);