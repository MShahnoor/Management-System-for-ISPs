const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getAreas,
  addArea,
  deleteArea,
  editArea
} = require("../Controllers/areaControllers")



router.get("/getAreas", getAreas);

router.post("/addArea", addArea);

router.delete("/deleteArea/:id",deleteArea );


router.patch("/editArea2/:id", editArea)

module.exports = router;
