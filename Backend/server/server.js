const express = require("express");
const app = express();
var cors = require("cors");

const port = 3001;
const mongoose = require("mongoose");
const Area = require("../Modles/areaModel");
const Package = require("../Modles/packageModel");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => res.send("A Test String"));

app.post("/testp", (req, res) => res.send("A Test String form post"));

app.post("/addArea", async (req, res) => {
  const { code, name } = req.body;
  try {
    const area = await Area.create({ code, name });
    res.send(area);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
});

app.post("/addArea", async (req, res) => {
  const { code, name } = req.body;
  try {
    const area = await Area.create({ code, name });
    res.send(area);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
});

app.post("/addPackage", async (req, res) => {
  const { name, monthlyFee, mbs } = req.body;
  try {
    const package = await Package.create({ name, monthlyFee, mbs });
    res.send(package);
  } catch (err) {
    res.send("Error");
    console.log(err.message);
  }
});

app.get("/getAreas", async (req, res) => {
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
    res.send(areas);
  } catch (error) {
    res.send(error.message);
  }
});
app.get("/getPackages", async (req, res) => {
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

    // res.send(typeof(x))
    res.send(packages);
  } catch (error) {
    res.send(error.message);
  }
});

//DB Connection
mongoose
  .connect(
    "mongodb+srv://aneeqduraiz:unlock!!!@cluster0.ide38ku.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Mongo Atlas");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
    // app.listen(3001, "192.168.100.57");
  })
  .catch((error) => {
    console.log("Fooking error in connection to mongo");
  });
