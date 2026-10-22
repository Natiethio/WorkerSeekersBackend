const Worker = require("../models/worker");
const Review = require("../models/review");
const mongoose = require("mongoose");
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


      // Final response sent toward Flutter
      {
        $project: {
          _id: 0,

          id: "$_id",

          name: "$user.name",

          profession: "$profession.name",


          city: "$city.cityname",

          location: "$location.name",

          // From profession category
          heroimage: "$profession.heroimage",

          // From user
          image: "$user.image",

          sex: "$user.sex",

          experience: 1,
          // note: 1,
          wage: 1,
          rating: 1,
          defaultprevious: 1,
        }
      }
    ]);
    return workers;

  }

  async getWorkerById(workerId) {
    const workers = await Worker.aggregate([
      // =========================
      // Find ONLY this worker
      // =========================
      {
        $match: {
          _id: new mongoose.Types.ObjectId(workerId),
        },
      },

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
          as: "other_professions",
        },
      },

      // Worker -> Location
      {
        $lookup: {
          from: "locations",
          localField: "location_id",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $unwind: "$location",
      },

      // Location -> City
      {
        $lookup: {
          from: "cities",
          localField: "location.city_id",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $unwind: "$city",
      },

      // Worker -> Reviews
      {
        $lookup: {
          from: "reviews",

          let: {
            currentWorkerId: "$_id",
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    "$worker_id",
                    "$$currentWorkerId",
                  ],
                },
              },
            },

            {
              $project: {
                _id: 0,
                reviewer: 1,
                comment: 1,
                rating: 1,
                date: 1,
              },
            },
          ],

          as: "reviews",
        },
      },

      // Final response
      {
        $project: {
          _id: 0,

          // IMPORTANT
          // Keep the worker ID for Flutter
          id: "$_id",

          name: "$user.name",

          profession: "$profession.name",

          other_professions: {
            $map: {
              input: "$other_professions",
              as: "profession",
              in: "$$profession.name",
            },
          },

          city: "$city.cityname",

          location: "$location.name",

          heroimage: "$profession.heroimage",

          image: "$user.image",

          sex: "$user.sex",

          experience: 1,
          note: 1,
          wage: 1,
          rating: 1,
          defaultprevious: 1,
          previousworkimages: 1,

          reviews: 1,
        },
      },
    ]);

    return workers[0] || null;
  }


  async getWorkersByCategory(categoryId) {
    const workers = await Worker.aggregate([
      {
        $match: {
          profession: new mongoose.Types.ObjectId(categoryId),
        },
      },

      // User
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // Category
      {
        $lookup: {
          from: "servicescategories",
          localField: "profession",
          foreignField: "_id",
          as: "profession",
        },
      },
      { $unwind: "$profession" },

      // Location
      {
        $lookup: {
          from: "locations",
          localField: "location_id",
          foreignField: "_id",
          as: "location",
        },
      },
      { $unwind: "$location" },

      // City
      {
        $lookup: {
          from: "cities",
          localField: "location.city_id",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: "$city" },

      {
        $project: {
          _id: 0,
          id: "$_id",

          name: "$user.name",
          profession: "$profession.name",

          city: "$city.cityname",
          location: "$location.name",

          image: "$user.image",
          sex: "$user.sex",

          experience: "$experiance",
          wage: 1,
          rating: 1,
          defaultprevious: 1,
        },
      },
    ]);

    // No workers found
    if (workers.length === 0) {
      return null;
    }

    const category = await ServiceCategory.findById(categoryId)
      .select("_id name heroimage description detail")
      .lean();

    return {
      id: category?._id || null,
      heroimage: category?.heroimage || "",
      category: category?.name || "",
      description: category.description || "",
      detail: category.detail || "",
      workers,
    };
  }

  async getAllCategories() {
    return await ServiceCategory.find();
  }

  // async getAllCategoriesName() {
  //   return await ServiceCategory.find();
  // }

  async getAllCategoriesName() {
    return await ServiceCategory.find(
      {},
      {
        id: 1,
        name: 1,
        icon: 1,
        iconwhite: 1,
        order: 1,
        heroimage: 1,
      }
    ).sort({ order: 1 });
  }


  async getTopRatedWorkers() {
    // Minimum number of reviews considered "meaningful"
    const MIN_REVIEWS = 5;

    // Get the overall average rating across all reviews
    const overallStats = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    const globalAverageRating =
      overallStats.length > 0
        ? overallStats[0].averageRating
        : 0;

    const workers = await Worker.aggregate([
      // =========================
      // 1. Get User
      // =========================
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: false,
        },
      },

      // =========================
      // 2. Get Profession
      // =========================
      {
        $lookup: {
          from: "servicescategories",
          localField: "profession",
          foreignField: "_id",
          as: "professionData",
        },
      },

      {
        $unwind: {
          path: "$professionData",
          preserveNullAndEmptyArrays: false,
        },
      },

      // =========================
      // 3. Get Reviews
      // =========================
      {
        $lookup: {
          from: "reviews",
          let: {
            workerId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$worker_id", "$$workerId"],
                },
              },
            },
            {
              $group: {
                _id: null,

                // Number of reviews
                reviewCount: {
                  $sum: 1,
                },

                // Actual average rating
                averageRating: {
                  $avg: "$rating",
                },
              },
            },
          ],
          as: "reviewData",
        },
      },


      {
        $addFields: {
          reviewCount: {
            $ifNull: [
              {
                $arrayElemAt: [
                  "$reviewData.reviewCount",
                  0,
                ],
              },
              0,
            ],
          },

          numericRating: {
            $ifNull: [
              {
                $arrayElemAt: [
                  "$reviewData.averageRating",
                  0,
                ],
              },
              0,
            ],
          },

          numericExperience: {
            $convert: {
              input: "$experiance",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },

      {
        $addFields: {
          weightedRating: {
            $cond: [
              {
                $gt: ["$reviewCount", 0],
              },

              {
                $add: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$reviewCount",
                          {
                            $add: [
                              "$reviewCount",
                              MIN_REVIEWS,
                            ],
                          },
                        ],
                      },
                      "$numericRating",
                    ],
                  },

                  {
                    $multiply: [
                      {
                        $divide: [
                          MIN_REVIEWS,
                          {
                            $add: [
                              "$reviewCount",
                              MIN_REVIEWS,
                            ],
                          },
                        ],
                      },
                      globalAverageRating,
                    ],
                  },
                ],
              },

              // Workers with no reviews
              // should rank below reviewed workers
              0,
            ],
          },
        },
      },

      // =========================
      // 6. Rank workers
      // =========================
      {
        $sort: {
          weightedRating: -1,
          reviewCount: -1,
          numericExperience: -1,
          _id: 1,
        },
      },

      // =========================
      // 7. Only ONE worker
      //    per category
      // =========================
      {
        $group: {
          _id: "$professionData._id",
          worker: {
            $first: "$$ROOT",
          },
        },
      },

      {
        $replaceRoot: {
          newRoot: "$worker",
        },
      },

      // =========================
      // 8. Rank the category winners
      // =========================
      {
        $sort: {
          weightedRating: -1,
          reviewCount: -1,
          numericExperience: -1,
          _id: 1,
        },
      },

      // =========================
      // 9. Take top 8
      // =========================
      {
        $limit: 8,
      },

      // =========================
      // 10. Response
      // =========================
      {
        $project: {
          _id: 0,

          id: "$_id",

          name: "$user.name",

          profession: "$professionData.name",

          rating: "$numericRating",

          reviewCount: 1,

          experience: "$experiance",

          image: "$user.image",

          icon: "$professionData.icon",

          iconwhite: "$professionData.iconwhite",

          sex: "$user.sex",

          // note: 1,

          wage: 1,
        },
      },
    ]);

    return workers;
  };

  async getHomeData() {
    const [categories, topRatedWorkers] = await Promise.all([  // both promice can execute at the same time
      this.getAllCategoriesName(),
      this.getTopRatedWorkers(),
    ]);

    const heroimage =
      "https://res.cloudinary.com/dgrj6cljo/image/upload/v1792676767/heroasset_gfnum7.png";

    return {
      heroimage,
      categories,
      topRatedWorkers,
    };
  }

}
module.exports = new workerService();

// MONGODB_URL=mongodb+srv://NatnaelBerhanu:Ethiopiaaby3000@cluster0.6vtlw18.mongodb.net/WorkerSeeker?retryWrites=true&w=majority&appName=Cluster0