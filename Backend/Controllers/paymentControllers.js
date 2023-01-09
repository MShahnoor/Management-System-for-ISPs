const Payment = require("../Modles/paymentModel");
const mongoose = require("mongoose");


const getPayments = async (req, res) => {
    console.log("Get Payments Request Recieved");
    try {
      let response = await Payment.find().select("serialNo paymentDate amount");
  
    //   let areas = [];
    //   for (i = 0; i < response.length; i++) {
    //     obj = {
    //       id: response[i]._id,
    //       code: response[i].code,
    //       name: response[i].name,
    //       activeUsers: 2,
    //       streets: 3,
    //     };
    //     areas.push(obj);
    //   }
      res.status(200).send(response);
    } catch (error) {
      res.send(error.message);
    }
  }

  const addPayment = async (req, res) => {
    console.log("Add Payment req recieved");
    const { serialNo, paymentDate, amount } = req.body;
    //const paymentDate = new Date(paymentDate)
    try {
      const payment = await Payment.create({ serialNo, paymentDate, amount });
      res.status(200).json(payment);
    } catch (err) {
      res.send("Error");
      console.log(err.message);
    }
  }

  const deletePayment = async (req, res) => {
    console.log("Delete Payment request recieved.")
    const { id } = req.params;
  
    try {
      const payment = await Payment.findOneAndDelete({ _id: id });
  
      if (!payment) {
        return res.status(400).json({ error: "No such Payment" });
      }
      res.status(200).json(payment);
    } catch (err) {
      res.send(err.message);
    }
  }

  const editPayment = async(req, res) => {
    console.log("Payment Patch request recieved.")
    try {
   
      const payment = await Payment.findOneAndUpdate(
        { _id: req.params.id },
        {
          serialNo: req.body.serialNo,
          paymentDate: req.body.paymentDate,
          amount: req.body.amount
        }
      );
      if (payment) {
        res.status(200).json(payment);
      }
    } catch (e) {
      res.status(404).json({error: "Error in edit payment route"});
      console.log(e.message);
    }
  }

  module.exports = {
    getPayments,
    addPayment,
    deletePayment,
    editPayment
  }