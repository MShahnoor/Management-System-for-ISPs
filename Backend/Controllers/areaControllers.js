const Area = require("../Modles/areaModel");
const mongoose = require("mongoose");

const getAreas = async (req, res) => {
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
    res.send(areas);
  } catch (error) {
    res.send(error.message);
  }
};

const addArea = async (req, res) => {
  console.log("Add Area req recieved");
  const { code, name } = req.body;
  try {
    const area = await Area.create({ code, name });
    res.status(200).json(area);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
};

const deleteArea = async (req, res) => {
  const { id } = req.params;

  try {
    const area = await Area.findOneAndDelete({ _id: id });

    if (!area) {
      return res.status(400).json({ error: "No such area" });
    }
    res.status(200).json(area);
  } catch (err) {
    res.send(err.message);
  }
};

const editArea = async (req, res) => {
  console.log("Patch2 request recieved.");
  try {
    console.log(req.params.id);
    console.log(req.body);
    const area = await Area.findOneAndUpdate(
      { _id: req.params.id },
      {
        code: req.body.code,
        name: req.body.name,
      }
    );
    if (area) {
      res.status(200).json(area);
    }
  } catch (e) {
    res.status(404).json({ error: "Error in edit area route" });
    console.log(e.message);
  }
};

module.exports = {
  getAreas,
  addArea,
  deleteArea,
  editArea,
};
