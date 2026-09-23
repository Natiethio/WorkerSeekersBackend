const express = require("express");

const jwt = require('jsonwebtoken');

const workerController = require("../controller/workerController");
// const upload = require('../Middlewares/upload');

const router = express.Router(); 


// router.post(
//   "/addvehicle", upload.single("vehicleImage"),vehicleController.addVehicle
// );



router.get("/getallworkers",   workerController.getAllWorkers) 

router.get("/getallcategories",   workerController.getAllCategories) 

router.get("/getallcategoriesname",   workerController.getAllCategoriesName) 


// router.get("/getworkerbyid/:id", workerController.getWorkerById)

// router.post("/updateworker/:id",
//   upload.single("workerImage"), 

//   async (req, res, next) => {

//     next();
//   },

//   workerController.updateWorker
// );

// router.delete("/deleteworker/:id", workerController.deleteWorker);

router.get("/",   (req, res) => {
  res.json("Back End");
})

// router.get("/getauthuser", authMiddlewareupd.authenticateToken, userController.Getauthuser);

// router.post("/logout", authMiddleware.isAuthenticated, userController.Logout);


module.exports = router;