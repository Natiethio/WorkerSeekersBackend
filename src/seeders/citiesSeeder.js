const mongoose = require("mongoose");
const City = require("../models/cities");

const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });


const connectDB = require("../configration/dbconfig");

require("dotenv").config();

const cities = [
    { cityname: "Addis Ababa", country: "Ethiopia" },
    { cityname: "Bahir Dar", country: "Ethiopia" },
    { cityname: "Hawassa", country: "Ethiopia" },
    { cityname: "Arbaminch", country: "Ethiopia" },
    { cityname: "DireDawa", country: "Ethiopia" },
    { cityname: "Adama", country: "Ethiopia" },
    { cityname: "Mekelle", country: "Ethiopia" },
    { cityname: "Gondar", country: "Ethiopia" },
    { cityname: "Jimma", country: "Ethiopia" },
    { cityname: "Bishoftu", country: "Ethiopia" },
    { cityname: "Jijiga", country: "Ethiopia" },
    { cityname: "Harrar", country: "Ethiopia" },
]

const seedCities = async () => {
    try {

        console.log(process.env.MONGODB_URI);

        await connectDB();

        // await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Optional: remove existing cities before seeding
        await City.deleteMany();

        await City.insertMany(cities);

        console.log(`${cities.length} cities seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding cities:", error);
        process.exit(1);
    }
};

seedCities();