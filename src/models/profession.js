// const mongoose = require("../configration/dbconfig");
const mongoose = require("mongoose");

const profssionSchema = new mongoose.Schema({
  profession: {type: String, required: true},
  heroimage: {type: String, required: true},
  icon: {type: String, required: true},
});

module.exports = mongoose.model("Profession", profssionSchema);

// MONGODB_URL=mongodb+srv://NatnaelBerhanu:Ethiopiaaby3000@cluster0.6vtlw18.mongodb.net/WorkerSeeker?retryWrites=true&w=majority&appName=Cluster0