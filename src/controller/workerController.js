const workerService  = require("../services/workerService");
const cookieParser = require("cookie-parser");
const secretKey = process.env.TOKEN_KEY;

require('dotenv').config();
const session = require('express-session');
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');



class workerController {
  async getAllWorkers(req, res) {
    try {
      const allworkers = await workerService.getAllWorkers();
      res.status(200).json(allworkers);
    }
    catch (error) {
      res.status(500).json({ error: error.message, success: false })
    }
  }

    async getAllCategories(req, res) {
    try {
      const allcategories = await workerService.getAllCategories();
      res.status(200).json(allcategories);
    }
    catch (error) {
      res.status(500).json({ error: error.message, success: false })
    }
  }
  async getAllCategoriesName(req, res) {
    try {
      const allcategoriesName = await workerService.getAllCategoriesName();
      // console.log("allcategoriesName", allcategoriesName);
      res.status(200).json(allcategoriesName);
    }
    catch (error) {
      res.status(500).json({ error: error.message, success: false })
    }
}
}

module.exports = new workerController();