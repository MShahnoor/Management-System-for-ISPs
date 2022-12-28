const mongoose = require("mongoose");

paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    monthlyFee: {
      type: int,
      required: true,
    },
    mbs: {
      type: int,
      maxLength: 1,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Payment", paymentSchema);
