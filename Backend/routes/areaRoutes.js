const express = require("express");
const { response } = require("express");

const router = express.Router();

//MongoDB Modles
const Area = require("../Modles/areaModel");

router.get("/getAreas", async (req, res) => {
  console.log("Get Areas Req Recieved");
  try {
    let response = await Area.find().select("code name");

    let areas = [];
    for (i = 0; i < response.length; i++) {
      obj = {
        id: response[i]._id,
        code: response[i].code,
        name: response[i].name,
        activeUsers: 2,
        streets: 3,
      };
      areas.push(obj);
    }
    // res.send(typeof(x))
    res.status(200).send(areas);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/addArea", async (req, res) => {
  console.log("Add Area req recieved");
  const { code, name } = req.body;
  try {
    const area = await Area.create({ code, name });
    res.status(200).send(area);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
});

router.delete("/deleteArea/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedArea = await Area.findOneAndDelete({ _id: id });
    if (!deletedArea) {
      res.status(404).send("No Area Found!");
    }
    res.status(200).send(deletedArea);
  } catch (err) {
    res.send(err.message);
  }
});

router.patch("/editArea/:id", async (req, res) => {
  try {
    const area = Area.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (!area) {
      response.status(200).send(area);
    }
  } catch (e) {
    response.status(404).send("Errorr");
    console.log(e.message);
  }
});

module.exports = router;
