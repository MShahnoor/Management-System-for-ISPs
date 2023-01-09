const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {
  getPayments,
  addPayment,
  deletePayment,
  editPayment

} = require("../Controllers/paymentControllers")


router.get("/getPayments", getPayments);
router.post("/addPayment", addPayment);
router.delete("/deletePayment/:id", deletePayment);
router.patch("/editPayment/:id", editPayment)


module.exports = router;
