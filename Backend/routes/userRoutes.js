const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  editUser,
} = require("../Controllers/userController");

router.get("/getUsers", getUsers);

router.post("/addUser", addUser);

router.delete("/deleteUser/:id", deleteUser);

router.patch("/editUser/:id", editUser);

module.exports = router;
