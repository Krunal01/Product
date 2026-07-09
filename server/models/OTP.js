const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;
