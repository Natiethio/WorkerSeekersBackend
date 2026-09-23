const mongoose = require("mongoose");

const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });

const Location = require("../models/locations");
const City = require("../models/cities");

const connectDB = require("../configration/dbconfig");

const locations = [
    {
        name: "Bole",
        city: "Addis Ababa",
        latitude: 8.9916,
        longitude: 38.7869,
    },

    {
        name: "Megenagna",
        city: "Addis Ababa",
        latitude: 9.0154,
        longitude: 38.7998,
    },

    {
        name: "Piassa",
        city: "Addis Ababa",
        latitude: 9.0385,
        longitude: 38.7469,
    },

    {
        name: "Kazanchis",
        city: "Addis Ababa",
        latitude: 9.0216,
        longitude: 38.7585,
    },

    {
        name: "Mexico",
        city: "Addis Ababa",
        latitude: 9.0095,
        longitude: 38.7484,
    },

    {
        name: "Sarbet",
        city: "Addis Ababa",
        latitude: 8.9994,
        longitude: 38.7443,
    },

    {
        name: "Lem Hotel",
        city: "Addis Ababa",
        latitude: 8.9992,
        longitude: 38.8176,
    },

    {
        name: "CMC",
        city: "Addis Ababa",
        latitude: 9.0397,
        longitude: 38.8420,
    },

];

async function seedLocations() {
    try {

        console.log(process.env.MONGODB_URI);

        await connectDB();

        // await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");


        await Location.deleteMany({});

        for (const location of locations) {
            const city = await City.findOne({
                cityname: location.city,
            });

            if (!city) {
                console.log(
                    `City not found: ${location.city}`
                );
                continue;
            }

            await Location.create({
                name: location.name,
                city_id: city._id,
                latitude: location.latitude,
                longitude: location.longitude,
            });
        }

        console.log(`${locations.length} Locations seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Location seeder error:", error);
        process.exit(1);
    }
}

seedLocations();