const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getPackages,
  addPackage,
  deletePackage,
  editPackage,
} = require("../Controllers/packageControllers");

router.get("/getPackages", getPackages);

router.post("/addPackage", addPackage);

router.delete("/deletePackage/:id", deletePackage);

router.patch("/editPackage/:id", editPackage);

module.exports = router;
