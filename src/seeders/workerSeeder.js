const mongoose = require("mongoose");

const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });

const User = require("../models/users");
const Worker = require("../models/worker");
const ServicesCategory = require("../models/servicesCategory");
const Location = require("../models/locations");

const connectDB = require("../configration/dbconfig");



const workers = [
    {
        name: "John Smith",
        profession: "Plumber",
        other_professions: ["Electrician"],

        city: "Addis Ababa",
        location: "Bole",

        // latitude: 8.9916,
        // longitude: 38.7869,

        rating: 4,
        wage: "120 ETB", 
        experience: "10 years", 

        note: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner4_pa7rus.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner4_pa7rus.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberhero_kwcpfw.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner1_ydc7ub.jpg",
        ],
    },

    {
        name: "Sarah Johnson",
        profession: "Cleaner",
        other_professions: ["Laundry"],

        city: "Addis Ababa",
        location: "Megenagna",

        // latitude: 9.0154,
        // longitude: 38.7998,

        rating: 5,
        wage: "100 ETB",
        experience: "5 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/banner_2_nriljz.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg"
        ],
    },

    {
        name: "Michael Brown",
        profession: "Electrician",
        other_professions: ["Electronics", "Plumber"],

        city: "Addis Ababa",
        location: "Piassa",

        // latitude: 9.0385,
        // longitude: 38.7469,

        rating: 4,
        wage: "150 ETB",
        experience: "12 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner1_uhqh2d.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/electricitybanner3_kl1qhw.jpg",
        ],
    },

    {
        name: "Emily Davis",
        profession: "Laundry",
        other_professions: ["Cleaner", "Plumber"],

        city: "Addis Ababa",
        location: "Kazanchis",

        // latitude: 9.0216,
        // longitude: 38.7585,

        rating: 5,
        wage: "90 ETB",
        experience: "7 years",

        note: "",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439538/laundry_4_ox01aj.png",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439538/laundry_4_ox01aj.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundry_2_fqpbi7.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundry_3_lujadw.png",
        ],
    },

    {
        name: "Daniel Wilson",
        profession: "Electronics",
        other_professions: ["Electrician", "Plumber"],

        city: "Addis Ababa",
        location: "Mexico",

        // latitude: 9.0095,
        // longitude: 38.7484,

        rating: 3,
        wage: "130 ETB",
        experience: "6 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner2_osiwna.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner1_gmxizs.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner2_osiwna.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/electronicsbanner3_krune6.jpg",
        ],
    },

    {
        name: "Daniel Adams",
        profession: "Plumber",
        other_professions: ["Electrician"],

        city: "Addis Ababa",
        location: "Sarbet",

        // latitude: 8.9994,
        // longitude: 38.7443,

        rating: 4,
        wage: "125 ETB",
        experience: "4 years",

        note: "",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner4_pa7rus.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner4_pa7rus.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberhero_kwcpfw.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner1_ydc7ub.jpg",
        ],
    },

    {
        name: "Sophia Miller",
        profession: "Cleaner",
        other_professions: [],

        city: "Addis Ababa",
        location: "Megenagna",

        // latitude: 9.0154,
        // longitude: 38.7998,

        rating: 5,
        wage: "95 ETB",
        experience: "2 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/banner_2_nriljz.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg"
        ],
    },

    {
        name: "Mariya Wilson",
        profession: "Electrician",
        other_professions: ["Electronics"],

        city: "Addis Ababa",
        location: "Bole",

        // latitude: 8.9916,
        // longitude: 38.7869,

        rating: 4,
        wage: "160 ETB",
        experience: "8 years",

        note: "",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner1_uhqh2d.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/electricitybanner3_kl1qhw.jpg",
        ],
    },

    {
        name: "Olivia Martin",
        profession: "Laundry",
        other_professions: [],

        city: "Addis Ababa",
        location: "Mexico",

        // latitude: 9.0095,
        // longitude: 38.7484,

        rating: 5,
        wage: "95 ETB",
        experience: "9 years",

        note: "",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439538/laundry_4_ox01aj.png",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439538/laundry_4_ox01aj.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundry_2_fqpbi7.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundry_3_lujadw.png",
        ],
    },

    {
        name: "William Taylor",
        profession: "Moving",
        other_professions: ["Cleaner"],

        city: "Addis Ababa",
        location: "Piassa",

        // latitude: 9.0385,
        // longitude: 38.7469,

        rating: 4,
        wage: "110 ETB",
        experience: "7 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/packing_and_movinghero_lqfty3.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_1_qzvp8t.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_2_yeghta.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_3_pa36lc.png",
        ],
    },

    {
        name: "Ava Anderson",
        profession: "Moving",
        other_professions: ["Cleaner"],

        city: "Addis Ababa",
        location: "Piassa",
        // latitude: 9.0385,
        // longitude: 38.7469,
        rating: 4,
        wage: "110 ETB",
        experience: "5 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/packing_and_movinghero_lqfty3.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_1_qzvp8t.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_2_yeghta.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_3_pa36lc.png",
        ],
    },

    {
        name: "Ethan Thomas",
        profession: "Electronics",
        otherprofessions: [],
        city: "Addis Ababa",
        location: "CMC",
        // latitude: 9.0397,
        // longitude: 38.8420,
        rating: 4,
        wage: "135 ETB",
        image: "https://i.pravatar.cc/150?img=25",
        heroimage: "assets/images/electronicshero.jpg",
        experience: "8 years",
        note: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        sex: "Male",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner2_osiwna.jpg",
        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner1_gmxizs.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner2_osiwna.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/electronicsbanner3_krune6.jpg",
        ],
    },

    {
        name: "Mia Harris",
        profession: "Cleaner",
        otherprofessions: [
            "Laundry",
        ],
        city: "Addis Ababa",
        location: "Sarbet",
        // latitude: 8.9994,
        // longitude: 38.7443,
        rating: 5,
        wage: "105 ETB",
        image: "https://i.pravatar.cc/150?img=14",
        heroimage: "assets/images/cleanning_Hero2.jpg",
        experience: "6 years",
        note: "",
        sex: "Female",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",
        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/banner_2_nriljz.png",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg"
        ],
    },

    {
        name: "Noah Clark",
        profession: "Plumber",
        otherprofessions: [
            "Laundry",
            "Cleaner",
            "Electronics",
            "Electrician",
            "Moving"
        ],
        city: "Addis Ababa",
        location: "Megenagna",
        // latitude: 9.0154,
        // longitude: 38.7998,
        rating: 4,
        wage: "130 ETB",
        image: "https://i.pravatar.cc/150?img=56",
        heroimage: "assets/images/plumberhero.jpg",
        experience: "6 years",
        note: "",
        sex: "Male",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner4_pa7rus.jpg",
        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner1_ydc7ub.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner3_vjzxgz.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner1_ydc7ub.jpg",
        ],
    },

    {
        name: "Isabella Lewis",
        profession: "Electrician",
        otherprofessions: [
            "Electronics",
        ],
        city: "Addis Ababa",
        location: "Sarbet",
        // latitude: 8.9994,
        // longitude: 38.7443,
        rating: 4,
        wage: "170 ETB",
        image: "https://i.pravatar.cc/150?img=40",
        heroimage: "assets/images/electricianhero.jpg",
        experience: "8 years",
        note: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        sex: "Female",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",
        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner1_uhqh2d.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/electricitybanner3_kl1qhw.jpg",
        ],
    },

    {
        name: "Abebe Kebede",
        profession: "WoodWork",
        otherprofessions: [
            "Electronics",
        ],
        city: "Addis Ababa",
        location: "Sarbet",
        // latitude: 8.9994,
        // longitude: 38.7443,
        rating: 5,
        wage: "170 ETB",
        experience: "8 years",
        note: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork2_haegvx.jpg",
        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork2_haegvx.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork1_fq47fu.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork3_udt7uc.jpg",
        ],
    },

    {
        name: "Abrham Kebede",
        profession: "WoodWork",
        otherprofessions: [
            "Laundry",
            "Cleaner",
        ],
        city: "Addis Ababa",
        location: "Megenagna",
        // latitude: 9.0154,
        // longitude: 38.7998,
        rating: 4,
        wage: "130 ETB",
        experience: "6 years",
        note: "",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork2_haegvx.jpg",
        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork2_haegvx.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork1_fq47fu.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork3_udt7uc.jpg",
        ],
    },

    {
        name: "Derbew Asmammaw",
        profession: "Carpenter",
        other_professions: ["WoodWork"],

        city: "Addis Ababa",
        location: "Piassa",
        // latitude: 9.0385,
        // longitude: 38.7469,
        rating: 4,
        wage: "110 ETB",
        experience: "5 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter1_rklkud.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter1_rklkud.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter3_pnorf9.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443324/carpenter2_jm39i8.jpg",
        ],
    },

    {
        name: "Kebede Debebe",
        profession: "Carpenter",
        other_professions: ["WoodWork"],

        city: "Addis Ababa",
        location: "CMC",

        // latitude: 9.0397,
        // longitude: 38.8420,

        rating: 4,
        wage: "110 ETB",
        experience: "5 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter1_rklkud.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter1_rklkud.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter3_pnorf9.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443324/carpenter2_jm39i8.jpg",
        ],
    },

    {
        name: "Demeke Abebe",
        profession: "Construction",
        other_professions: [],

        city: "Addis Ababa",
        location: "Mexico",

        // latitude: 9.0095,
        // longitude: 38.7484,

        rating: 5,
        wage: "95 ETB",
        experience: "9 years",

        note: "",
        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction1_zneogz.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443302/constraction3_l48noi.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction2_dprec6.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction1_zneogz.jpg",
        ],
    },

    {
        name: "Rahel Kebede",
        profession: "Refrigerator",
        other_professions: ["Washing Machine"],

        city: "Addis Ababa",
        location: "Lem Hotel",

        // latitude: 8.9992,
        // longitude: 38.8176,

        rating: 5,
        wage: "100 ETB",
        experience: "5 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439675/refrigrator2_ppjzex.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439675/refrigrator2_ppjzex.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439675/refrigrator3_u168jv.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439674/refrigrator1_hfsgcc.jpg",
        ],
    },

    {
        name: "Ketemaw Amare",
        profession: "Washing Machine",
        other_professions: ["Washing Machine", "Refrigerator", "Electronics"],

        city: "Addis Ababa",
        location: "Mexico",

        // latitude: 9.0095,
        // longitude: 38.7484,

        rating: 5,
        wage: "100 ETB",
        experience: "5 years",

        note:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439798/Washingmachion1_yilqvr.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439798/Washingmachion1_yilqvr.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439798/washingmachion2_yqvlpm.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439799/washingmachion3_rw2vyb.jpg",
        ],
    },

    {
        name: "Amare Legesse",
        profession: "Construction",
        other_professions: ["Carpenter", "WoodWork"],

        city: "Addis Ababa",
        location: "Lem Hotel",

        // latitude: 8.9992,
        // longitude: 38.8176,

        rating: 5,
        wage: "95 ETB",
        experience: "9 years",

        note: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",

        defaultprevious: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction1_zneogz.jpg",

        previousworkimages: [
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443302/constraction3_l48noi.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction2_dprec6.jpg",
            "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction1_zneogz.jpg",
        ],
    },
];

async function seedWorkers() {
    try {

        console.log(process.env.MONGODB_URI);

        await connectDB();

        // await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Optional: remove existing worker users before seeding
        await Worker.deleteMany({});

        for (const worker of workers) {

            // Find worker's User
            const user = await User.findOne({
                name: worker.name,
                role: "worker",
            });

            if (!user) {
                console.log(
                    `User not found: ${worker.name}`
                );
                continue;
            }

            // Main profession
            const profession =
                await ServicesCategory.findOne({
                    name: worker.profession,
                });

            if (!profession) {
                console.log(
                    `Profession not found: ${worker.profession}`
                );
                continue;
            }

            // Other professions
            const otherProfessions =
                await ServicesCategory.find({
                    name: {
                        $in: worker.other_professions,
                    },
                });

            // Location
            const location =
                await Location.findOne({
                    name: worker.location,
                });

            if (!location) {
                console.log(
                    `Location not found: ${worker.location}`
                );
                continue;
            }

            await Worker.create({
                user_id: user._id,

                profession: profession._id,

                other_professions:
                    otherProfessions.map(
                        (item) => item._id
                    ),
                
                city: worker.city,

                location_id: location._id,

                defaultprevious: 
                    worker.defaultprevious,

                previousworkimages:
                    worker.previousworkimages,

                experience: worker.experience,

                wage: worker.wage,

                rating: worker.rating,

                note: worker.note,
            });

            console.log(
                `Worker seeded: ${worker.name}`
            );
        }

        console.log(
            "All workers seeded successfully"
        );

        process.exit(0);

    } catch (error) {

        console.error(
            "Worker seeder error:",
            error
        );

        process.exit(1);
    }
}

seedWorkers();