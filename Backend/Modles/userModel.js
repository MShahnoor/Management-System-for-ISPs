const mongoose = require("mongoose");

userSchema = new mongoose.Schema(
  {
    autoID: {
      type: Number,
      maxLength: 2,
      required: true,
    },
    areaCode: {
      type: String,
      maxLength: 2,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
