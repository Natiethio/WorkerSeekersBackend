const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });
const bcrypt = require("bcryptjs");

const User = require("../models/users");
const connectDB = require("../configration/dbconfig");


const users = [
    {
        name: "John Smith",
        phone: "0911000001",
        email: "john.smith@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=60",
    },

    {
        name: "Sarah Johnson",
        phone: "0911000002",
        email: "sarah.johnson@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=47",
    },

    {
        name: "Michael Brown",
        phone: "0911000003",
        email: "michael.brown@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=13",
    },

    {
        name: "Emily Davis",
        phone: "0911000004",
        email: "emily.davis@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=32",
    },

    {
        name: "Daniel Wilson",
        phone: "0911000005",
        email: "daniel.wilson@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=12",
    },

    {
        name: "Daniel Adams",
        phone: "0911000006",
        email: "daniel.adams@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=18",
    },

    {
        name: "Sophia Miller",
        phone: "0911000007",
        email: "sophia.miller@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=21",
    },

    {
        name: "Mariya Wilson",
        phone: "0911000008",
        email: "mariya.wilson@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=36",
    },

    {
        name: "Olivia Martin",
        phone: "0911000009",
        email: "olivia.martin@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=44",
    },

    {
        name: "William Taylor",
        phone: "0911000010",
        email: "william.taylor@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=52",
    },
    {
        name: "Ava Anderson",
        phone: "0911000011",
        email: "ava.anderson@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=9",
    },
    {
        name: "Ethan Thomas",
        phone: "0911000012",
        email: "ethan.thomas@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=25",
    },
    {
        name: "Mia Harris",
        phone: "0911000013",
        email: "mia.harris@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=14",
    },
    {
        name: "Noah Clark",
        phone: "0911000014",
        email: "noah.clark@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=56",
    },
    {
        name: "Isabella Lewis",
        phone: "0911000015",
        email: "isabella.lewis@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=40",
    },
    {
        name: "Samuel Kediv",
        phone: "0912000001",
        email: "samuel.kediv@example.com",
        sex: "Male",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=22",
    },
    {
        name: "Grace Ferede",
        phone: "0912000002",
        email: "grace.ferede@example.com",
        sex: "Female",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=55",
    },
    {
        name: "Aron Mekonnen",
        phone: "0912000003",
        email: "aron.mekonnen@example.com",
        sex: "Male",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=17",
    },
    {
        name: "Helen Oliver",
        phone: "0912000004",
        email: "helen.oliver@example.com",
        sex: "Female",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=24",
    },
    {
        name: "Jerry Parker",
        phone: "0912000005",
        email: "jerry.parker@example.com",
        sex: "Male",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=31",
    },
    {
        name: "Sarah Harris",
        phone: "0912000006",
        email: "sarah.harris@example.com",
        sex: "Female",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=27",
    },
    {
        name: "Michael Adam",
        phone: "0912000007",
        email: "michael.adam@example.com",
        sex: "Male",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=65",
    },
    {
        name: "Daniel Cate",
        phone: "0912000008",
        email: "daniel.cate@example.com",
        sex: "Male",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=66",
    },
    {
        name: "Anna Laurence",
        phone: "0912000009",
        email: "anna.laurence@example.com",
        sex: "Female",
        password: "123456",
        role: "user",
        image: "https://i.pravatar.cc/150?img=29",
    },
    {
        name: "Natnael Berhanu",
        phone: "0912000010",
        email: "natnaelberhanumuluneh@gmail.com",
        sex: "Male",
        password: "112233",
        role: "admin",
        image: "https://i.pravatar.cc/150?img=14",
    },


    {
        name: "Abebe Kebede",
        phone: "0911000016",
        email: "abebe.kebede@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=3",
    },

    {
        name: "Abrham Kebede",
        phone: "0911000017",
        email: "abrham.kebede@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=14",
    },

    {
        name: "Derbew Asmammaw",
        phone: "0911000018",
        email: "derbew.asmammaw@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=3",
    },

    {
        name: "Kebede Debebe",
        phone: "0911000019",
        email: "kebede.debebe@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=14",
    },

    {
        name: "Demeke Abebe",
        phone: "0911000020",
        email: "demeke.abebe@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=66",
    },

    {
        name: "Rahel Kebede",
        phone: "0911000021",
        email: "rahel.kebede@example.com",
        sex: "Female",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=29",
    },

    {
        name: "Ketemaw Amare",
        phone: "0911000022",
        email: "ketemaw.amare@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=66",
    },

    {
        name: "Amare Legesse",
        phone: "0911000022",
        email: "amare.legesse@example.com",
        sex: "Male",
        password: "123456",
        role: "worker",
        image: "https://i.pravatar.cc/150?img=55",
    },
];


const seedUsers = async () => {
    try {

        console.log(process.env.MONGODB_URI);

        await connectDB();

        // await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Optional: remove existing worker users before seeding
        await User.deleteMany();

        // Hash passwords
        const usersWithHashedPasswords = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);

                return {
                    ...user,
                    password: hashedPassword,
                };
            })
        );

        await User.insertMany(usersWithHashedPasswords);

        console.log(`${users.length} worker users seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
};

seedUsers();