const express = require("express");
const { response } = require("express");
const router = express.Router();

const Package = require("../Modles/packageModel");

router.get("/getPackages", async (req, res) => {
  console.log("get req in packages");
  try {
    let response = await Package.find().select("name monthlyFee mbs");

    let packages = [];
    for (i = 0; i < response.length; i++) {
      obj = {
        id: response[i]._id,
        name: response[i].name,
        monthlyFee: response[i].monthlyFee,
        mbs: response[i].mbs,
      };
      packages.push(obj);
    }
    res.send(packages);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/addPackage", async (req, res) => {
  console.log("Get Package");
  const { name, monthlyFee, mbs } = req.body;
  try {
    const package = await Package.create({ name, monthlyFee, mbs });
    res.send(package);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
});

module.exports = router;
