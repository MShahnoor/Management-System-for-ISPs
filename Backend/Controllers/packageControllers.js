const Package = require("../Modles/packageModel");
const mongoose = require("mongoose");

const getPackages = async (req, res) => {
  try {
    let response = await Package.find().select("name monthlyFee mbs");

    res.send(response);
  } catch (error) {
    res.status(200).send(error.message);
  }
};

const addPackage = async (req, res) => {
  console.log("Get Package");
  const { name, monthlyFee, mbs } = req.body;

  try {
    const package = await Package.create({ name, monthlyFee, mbs });
    res.status(200).json(package);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const package = await Package.findOneAndDelete({ _id: id });

    if (!package) {
      return res.status(400).json({ error: "No such Package" });
    }
    res.status(200).json(package);
  } catch (err) {
    res.send(err.message);
  }
};

const editPackage = async (req, res) => {
  console.log("Patch Package request recieved.");

  try {
    const package = await Package.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        monthlyFee: req.body.monthlyFee,
        mbs: req.body.mbs,
      }
    );
    if (package) {
      res.status(200).json(package);
    }
  } catch (e) {
    res.status(404).json({ error: "Error in edit package route" });
    console.log(e.message);
  }
};

module.exports = {
  getPackages,
  addPackage,
  deletePackage,
  editPackage,
};
