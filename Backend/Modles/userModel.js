const mongoose = require("mongoose");

userSchema = new mongoose.Schema(
  {
    autoID: {
      type: Number,
      required: true,
    },
    areaCode: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Area"
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Package'
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
