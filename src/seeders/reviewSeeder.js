const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });

const User = require("../models/users");
const Worker = require("../models/worker");
const Review = require("../models/review");
const connectDB = require("../configration/dbconfig");


const reviews = [
    {
        reviewerEmail: "samuel.kediv@example.com",
        workerName: "John Smith",
        comment:
            "John is very professional and fixed the issue quickly. Highly recommended!",
        rating: 4,
        date: new Date("2026-08-08"),
    },

    {
        reviewerEmail: "grace.ferede@example.com",
        workerName: "John Smith",
        comment:
            "On time and very clean work. I was really happy with the service.",
        rating: 4,
        date: new Date("2026-08-03"),
    },

    {
        reviewerEmail: "aron.mekonnen@example.com",
        workerName: "Sarah Johnson",
        comment:
            "Absolutely spotless cleaning. Very polite and careful.",
        rating: 5,
        date: new Date("2026-08-09"),
    },

    {
        reviewerEmail: "helen.oliver@example.com",
        workerName: "Sarah Johnson",
        comment:
            "Excellent service, will book again.",
        rating: 5,
        date: new Date("2026-08-06"),
    },

    {
        reviewerEmail: "jerry.parker@example.com",
        workerName: "Sarah Johnson",
        comment:
            "Very professional and fast.",
        rating: 5,
        date: new Date("2026-08-01"),
    },

    {
        reviewerEmail: "sarah.harris@example.com",
        workerName: "Michael Brown",
        comment:
            "Solved the wiring issue quickly.",
        rating: 4,
        date: new Date("2026-08-07"),
    },

    {
        reviewerEmail: "michael.adam@example.com",
        workerName: "Michael Brown",
        comment:
            "Good work and explained everything clearly.",
        rating: 4,
        date: new Date("2026-08-04"),
    },

    {
        reviewerEmail: "daniel.cate@example.com",
        workerName: "Emily Davis",
        comment:
            "Clothes were perfectly cleaned and folded.",
        rating: 5,
        date: new Date("2026-08-08"),
    },

    {
        reviewerEmail: "anna.laurence@example.com",
        workerName: "Emily Davis",
        comment:
            "Very neat and on time.",
        rating: 5,
        date: new Date("2026-08-05"),
    },

    {
        reviewerEmail: "samuel.kediv@example.com",
        workerName: "Daniel Wilson",
        comment:
            "Fixed the device but took longer than expected.",
        rating: 3,
        date: new Date("2026-08-06"),
    },

    {
        reviewerEmail: "grace.ferede@example.com",
        workerName: "Daniel Wilson",
        comment:
            "Average service, but the problem was solved.",
        rating: 3,
        date: new Date("2026-08-02"),
    },

    {
        reviewerEmail: "aron.mekonnen@example.com",
        workerName: "Daniel Adams",
        comment:
            "Quick response and quality repair.",
        rating: 4,
        date: new Date("2026-08-08"),
    },

    {
        reviewerEmail: "helen.oliver@example.com",
        workerName: "Daniel Adams",
        comment:
            "Very friendly and professional.",
        rating: 4,
        date: new Date("2026-08-04"),
    },

    {
        reviewerEmail: "jerry.parker@example.com",
        workerName: "Sophia Miller",
        comment:
            "Super clean and well organized work.",
        rating: 5,
        date: new Date("2026-08-09"),
    },

    {
        reviewerEmail: "sarah.harris@example.com",
        workerName: "Mariya Wilson",
        comment:
            "Very skilled electrician.",
        rating: 4,
        date: new Date("2026-08-07"),
    },

    {
        reviewerEmail: "michael.adam@example.com",
        workerName: "Mariya Wilson",
        comment:
            "Good job and fair pricing.",
        rating: 4,
        date: new Date("2026-08-02"),
    },

    {
        reviewerEmail: "daniel.cate@example.com",
        workerName: "Olivia Martin",
        comment:
            "Outstanding laundry service.",
        rating: 5,
        date: new Date("2026-08-08"),
    },

    {
        reviewerEmail: "anna.laurence@example.com",
        workerName: "William Taylor",
        comment:
            "Handled items carefully and efficiently.",
        rating: 4,
        date: new Date("2026-08-05"),
    },
    {
        reviewerEmail: "anna.laurence@example.com",
        workerName: "Ava Anderson",
        comment:
            "Handled items carefully and efficiently.",
        rating: 4,
        date: new Date("2026-08-05"),
    },
    {
        reviewerEmail: "jerry.parker@example.com",
        workerName: "Ava Anderson",
        comment:
            "Handled items carefully and efficiently.",
        rating: 4,
        date: new Date("2026-08-05"),
    },
    {
        reviewerEmail: "jerry.parker@example.com",
        workerName: "Ava Anderson",
        comment:
            "Handled items carefully and efficiently.",
        rating: 4,
        date: new Date("2026-08-05"),
    },
    {
        reviewerEmail: "jerry.parker@example.com",
        workerName: "Isabella Lewis",
        comment:
            "Handled items carefully and efficiently.",
        rating: 4,
        date: new Date("2026-08-05"),
    },
    {
        reviewerEmail: "natnaelberhanumuluneh@gmail.com",
        workerName: "Isabella Lewis",
        comment:
            "Handled items carefully and efficiently.",
        rating: 4,
        date: new Date("2026-08-05"),
    },
];

const seedReviews = async () => {

  try {

        console.log(process.env.MONGODB_URI);

        await connectDB();

        // await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Review.deleteMany();

        const reviewDocuments = [];

    for (const review of reviews) {

      // Find the person writing the review
      const reviewer = await User.findOne({
        email: review.reviewerEmail,
      });

      if (!reviewer) {
        console.log(
          `Reviewer not found: ${review.reviewerEmail}`
        );
        continue;
      }

      // Find the user account belonging to the worker
      const workerUser = await User.findOne({
        name: review.workerName,
        role: "worker",
      });

      if (!workerUser) {
        console.log(
          `Worker user not found: ${review.workerName}`
        );
        continue;
      }

      // Find the actual Worker document
      const worker = await Worker.findOne({
        user_id: workerUser._id,
      });

      if (!worker) {
        console.log(
          `Worker profile not found: ${review.workerName}`
        );
        continue;
      }

      reviewDocuments.push({

        reviewer_id: reviewer._id,

        worker_id: worker._id,

        reviewer: reviewer.name,

        comment: review.comment,

        rating: review.rating,

        date: review.date,

      });
    }

    await Review.insertMany(reviewDocuments);

    console.log(
      `${reviewDocuments.length} reviews seeded successfully`
    );

    process.exit(0);

  } catch (error) {

    console.error(
      "Error seeding reviews:",
      error
    );

    process.exit(1);
  }
};

seedReviews();

