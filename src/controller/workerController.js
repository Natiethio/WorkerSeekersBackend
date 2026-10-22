const workerService = require("../services/workerService");
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

  async getWorkerById(req, res) {
    try {
      const worker = await workerService.getWorkerById(
        req.params.id
      );

      if (!worker) {
        return res.status(404).json({
          message: "Worker not found",
        });
      }

      return res.status(200).json(worker);
    } catch (error) {
      console.error("Error getting worker by ID:", error);

      return res.status(500).json({
        message: "Failed to load worker",
        error: error.message,
      });
    }
  };

  async getWorkersByCategory(req, res) {
    try {
      const { categoryId } = req.params;

      const workers =
        await workerService.getWorkersByCategory(categoryId);

      return res.status(200).json(workers);
    } catch (error) {
      console.error("Error getting workers by category:", error);

      return res.status(500).json({
        message: "Failed to load workers",
        error: error.message,
      });
    }
  };

  async getTopRatedWorkers(req, res) {
    try {
      const topRatedWorkers = await workerService.getTopRatedWorkers();
      res.status(200).json(topRatedWorkers);
    }
    catch (error) {

      console.error("Error getting top rated workers:", error);

      return res.status(500).json({
        message: "Failed to load top rated workers",
        error: error.message,
      });
    }
  }

  async getHomeData(req, res) {
  try {
    const homeData = await workerService.getHomeData();

    return res.status(200).json(homeData);
  } catch (error) {
    console.error("Error getting home data:", error);

    return res.status(500).json({
      message: "Failed to load home data",
      error: error.message,
    });
  }
}

}

module.exports = new workerController();