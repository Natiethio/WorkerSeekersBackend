const Worker = require("../models/worker");
const ServiceCategory = require("../models/servicesCategory");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const cookieParser = require("cookie-parser");
const cloudinary = require("../configration/cloudinary");
require('dotenv').config();
const { Readable } = require("stream");
const session = require('express-session');
// const { generateSecretToken } = require("../utils/jwtUtils")
// const { generateRefreshToken } = require("../utils/jwtUtils")
const fs = require("fs");
const path = require("path");


require('dotenv').config();

class workerService {
  async getAllWorkers() {
    const workers = await Worker.aggregate([
      // Worker -> User
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },

      // Worker -> Main Profession
      {
        $lookup: {
          from: "servicescategories",
          localField: "profession",
          foreignField: "_id",
          as: "profession",
        },
      },
      {
        $unwind: "$profession",
      },

      // Worker -> Other Professions
      {
        $lookup: {
          from: "servicescategories",
          localField: "other_professions",
          foreignField: "_id",
          as: "other_professions"
        }
      },

      // Worker -> Location
      {
        $lookup: {
          from: "locations",
          localField: "location_id",
          foreignField: "_id",
          as: "location"
        }
      },

      {
        $unwind: "$location"
      },

      // Location -> City
      {
        $lookup: {
          from: "cities",
          localField: "location.city_id",
          foreignField: "_id",
          as: "city"
        }
      },

      {
        $unwind: "$city"
      },

      {
        $lookup: {
          from: "reviews",

          let: {
            currentWorkerId: "$_id"
          },

          pipeline: [

            // Find reviews belonging to this worker
            {
              $match: {
                $expr: {
                  $eq: [
                    "$worker_id",
                    "$$currentWorkerId"
                  ]
                }
              }
            },

            // Return only fields Flutter needs
            {
              $project: {
                _id: 0,
                reviewer: 1,
                comment: 1,
                rating: 1,
                date: 1
              }
            }
          ],

          as: "reviews"
        }
      },

      // Final response sent toward Flutter
      {
        $project: {
          _id: 0,

          name: "$user.name",

          profession: "$profession.name",

          other_professions: {
            $map: {
              input: "$other_professions",
              as: "profession",
              in: "$$profession.name"
            }
          },

          city: "$city.cityname",

          location: "$location.name",

          // From profession category
          heroimage: "$profession.heroimage",

          // From user
          image: "$user.image",

          sex: "$user.sex",

          experience: 1,
          note: 1,
          wage: 1,
          rating: 1,
          defaultprevious: 1,
          previousworkimages: 1,

          reviews: 1
        }
      }
    ]);
    return workers;

    // return await Worker.find();
  }
  async getAllCategories() {
    return await ServiceCategory.find();
  }
  async getAllCategoriesName() {
    return await ServiceCategory.find();
  }
}

module.exports = new workerService();

// MONGODB_URL=mongodb+srv://NatnaelBerhanu:Ethiopiaaby3000@cluster0.6vtlw18.mongodb.net/WorkerSeeker?retryWrites=true&w=majority&appName=Cluster0