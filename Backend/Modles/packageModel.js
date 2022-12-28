const mongoose = require("mongoose");

packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    monthlyFee: {
      type: Number,
      required: true,
    },
    mbs: {
      type: Number,
      maxLength: 2,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Package", packageSchema);
