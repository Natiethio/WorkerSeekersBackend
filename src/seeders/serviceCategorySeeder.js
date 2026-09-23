const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../../.env') });

const connectDB = require("../configration/dbconfig");
const ServiceCategory = require("../models/servicesCategory");

const seedData = async () => {
    try {

        console.log(process.env.MONGODB_URI);

        await connectDB();

        // Clear existing data (optional)
        await ServiceCategory.deleteMany();

        // Insert data
        await ServiceCategory.insertMany([
            {
                name: "Cleaner",
                // icon: "cleaning_services",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460096/cleaning_yvweq9.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440968/cleaningwhite_hj1vaj.png",
                description: "Professional home and office cleaning services.",
                order: 1,
                detail: "Choose from our range of professional cleaning services",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/banner_1_abeizr.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/cleanerhero_ac06pq.jpg",
                ],
            },
            {
                name: "Laundry",
                // icon: "local_laundry_service",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460097/laundry_crgdkw.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440967/laundrywhite_kwsjfe.png",
                description: "Affordable and fast laundry   services.",
                order: 11,
                detail: "Choose from our range of professional laundry services to clean your cloths",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundryhero_ow0z6a.jpg",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439538/laundry_4_ox01aj.png",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundry_2_fqpbi7.png",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/laundry_3_lujadw.png",
                ],
            },
            {
                name: "Moving",
                // icon: "local_shipping",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460181/moving1_q3yxdj.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440966/moving1white_nzm4wp.png",
                description: "Safe and reliable moving and packing services.",
                order: 10,
                detail: "Choose from our range of professional moving and packing services to safely move your properties",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_1_qzvp8t.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_1_qzvp8t.png",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_2_yeghta.png",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/moving_3_pa36lc.png",
                ],
            },
            {
                name: "Electronics",
                // icon: "electrical_services",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460098/electronics1_zqzzgn.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786441309/electronicswhite_ebrubb.png",
                description: "Safe and reliable Repair services.",
                order: 2,
                detail: "Choose from our range of professional Repair services to repair any house holds",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1783501136/electronicsrepair1_c1mv16.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner1_gmxizs.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electronicsbanner2_osiwna.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918136/electronicsbanner3_krune6.jpg",
                ],
            },
            {
                name: "Electrician",
                // icon: "electrical_services",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460094/electrician_sseqrr.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440965/electricianwhite_ipotqy.png",
                description: "Safe and reliable Repair services.",
                order: 9,
                detail: "Choose from our range of professional Repair services to repair any house holds",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1783080493/electricityheroimage2_yrvzfl.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner1_uhqh2d.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918138/electricitybanner2_q72gsf.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918137/electricitybanner3_kl1qhw.jpg",
                ],
            },
            {
                name: "Plumber",
                // icon: "plumbing",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460093/plumber_w4y5dm.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440965/plumberwhite_dher5u.png",
                description: "Safe and reliable Plumber services.",
                order: 3,
                detail: "Choose from our range of professional Plumber services to fix your water lines",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1783080494/plumberheroimage3_epi3wg.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner4_pa7rus.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberhero_kwcpfw.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1773918139/plumberbanner1_ydc7ub.jpg",
                ],
            },
            {
                name: "Refrigerator",
                // icon: "kitchen",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460091/refrigrator1_vlqar5.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440963/refrigratorwhite_ukc3a0.png",
                description: "Safe and reliable Refrigerator Repair services.",
                order: 4,
                detail: "Choose from our range of professional Refrigerator Repair services to fix your refrigerator",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439676/refrigratorhero_aqxcaz.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439675/refrigrator2_ppjzex.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439675/refrigrator3_u168jv.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439674/refrigrator1_hfsgcc.jpg",
                ],
            },
            {
                name: "Washing Machine",
                // icon: "local_laundry_service_outlined",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460092/washing-machine_etk4tk.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440964/washing-machinewhite_lzjmlb.png",
                description: "Safe and reliable Washing Machine Repair services.",
                order: 5,
                detail: "Choose from our range of professional Washing Machine Repair services to fix your washing machine",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786530537/folkd-removebg-preview_snpyd7.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439798/Washingmachion1_yilqvr.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439798/washingmachion2_yqvlpm.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786439799/washingmachion3_rw2vyb.jpg",
                ],
            },
            {
                name: "WoodWork",
                // icon: "handyman",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460097/woodworking_ndqshk.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440967/woodworkingwhite_yfcsmo.png",
                description: "Safe and reliable WoodWork Repair services.",
                order: 8,
                detail: "Choose from our range of professional WoodWork Repair services to fix your woodwork",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodworkhero_gvjbai.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork2_haegvx.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork1_fq47fu.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443282/woodwork3_udt7uc.jpg",
                ],
            },
            {
                name: "Carpenter",
                // icon: "carpenter",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460091/carpenter_2_l9huji.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440964/carpenterwhite_nelmhe.png",
                description: "Safe and reliable Carpenter Repair services.",
                order: 6,
                detail: "Choose from our range of professional Carpenter Repair services to fix your carpentry",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenterhero_hdtyq9.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter1_rklkud.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443323/carpenter3_pnorf9.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443324/carpenter2_jm39i8.jpg",
                ],
            },
            {
                name: "Construction",
                // icon: "construction",
                icon: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786460091/constraction_wa7sck.png",
                iconwhite: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786440963/constractionwhite_i3zod2.png",
                description: "Safe and reliable Construction services.",
                order: 7,
                detail: "Choose from our range of professional Construction services to fix your construction needs",
                heroimage: "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constructionhero_qkclbr.png",
                images: [
                    "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443302/constraction3_l48noi.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction2_dprec6.jpg",
                    // "https://res.cloudinary.com/dgrj6cljo/image/upload/v1786443301/constraction1_zneogz.jpg",
                ],
            },
        ]);

        console.log("Service Categories Seeded ✅");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();