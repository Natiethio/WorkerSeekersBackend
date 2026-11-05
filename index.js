const express = require("express")
require('dotenv').config();
const bodyParser = require("body-parser")
const workerSeekersRoutes = require("./src/routes/workerseekersRoute");
const authRoutes  = require("./src/routes/authserviceroute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const path = require('path');
const connectDB = require("./src/configration/dbconfig");

const app = express()
connectDB();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors());

app.get("/", (req, res) => {
  res.json("Node BackEnd");
})

app.get('/favicon.ico', (req, res) => res.status(204).end()); // Handle favicon requests


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/workerseekers", workerSeekersRoutes);  //base route is /api/workerseekers in workerSeekersRoutes it will have a child route to to have the controller function 

app.use("/api/workerseekers/auth", authRoutes);


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

module.exports = app;