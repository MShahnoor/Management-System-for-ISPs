const User = require("../Modles/userModel");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  try {
    let response = await User.find()
    .populate("areaCode" , "code")
    .populate("package" , "name")
    .select(
      "autoID areaCode firstName lastName contact package balance status address"
    );
    // let newUsers = [];
    // for (i = 0; i < response.length; i++) {
    //   obj = {
    //     id: response[i]._id,
    //     userID: response[i].autoID + response[i].areaCode,
    //     name: response[i].firstName + " " + response[i].lastName,
    //     package: response[i].package,
    //     balance: response[i].balance,
    //     status: response[i].status == true ? "Active" : "Inactive",
    //   };
    //   newUsers.push(obj);
    // }

    res.status(200).send(response);
  } catch (error) {
    res.send(error.message);
  }
};

const addUser = async (req, res) => {
  const addUser = {
    autoID: req.body.autoID,
    areaCode: req.body.areaCode.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    package: req.body.package._id,
    balance: req.body.balance,
    status: req.body.status,
    address: req.body.address,
  } 
  console.log("add user", addUser)

  try {
    const user = await User.create(addUser);
    res.status(200).json(user);
  } catch (err) {
    res.send("Error" + err);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await User.findOneAndDelete({ _id: id });
    console.log(user);

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.send(err.message);
  }
};

const editUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        autoID: req.body.autoID,
        
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contact: req.body.contact,
        package: req.body.package._id,
        balance: req.body.balance,
        status: req.body.status,
        address: req.body.address,
      }
    );
    if (user) {
      console.log( "From Edit USer router",req.body)
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(404).json({ error: "Error in edit user route" });
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  editUser,
};
