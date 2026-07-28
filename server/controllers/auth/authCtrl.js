const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../../utils/response");
const OTP = require("../../models/OTP");
const sendMail = require("./sendMail");
const AppError = require("../../utils/AppError");

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) {
    throw new AppError(401, "User not exist");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    },
  );
  const userObj = user.toObject();
  delete userObj.password;
  return res.status(200).json({
    token,
    data: userObj,
    success: true,
    statusCode: 200,
    message: "Login Successfull",
  });
};
const register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw new AppError(409, "User already exist!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const profileImageUrl = req.file ? req?.file?.path : null;
  const profileImagePublicId = req?.file ? req?.file?.filename : null;
  const newUser = {
    ...req.body,
    password: hashedPassword,
    profileImageUrl,
    profileImagePublicId,
  };
  const response = await User.create(newUser);
  const userObj = response.toObject();
  delete userObj.password;
  return successResponse(res, 201, "user registered successfully", userObj);
};
const changePassword = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).select(
    "+password",
  );
  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (req.body.currentPassword === req.body.newPassword) {
    throw new AppError(
      409,
      "New password should not be the same as current password",
    );
  }
  const isMatched = await bcrypt.compare(
    req.body.currentPassword,
    user.password,
  );
  if (!isMatched) {
    throw new AppError(401, "Current password is incorrect");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.newPassword, salt);
  user.password = hash;
  await user.save();
  return successResponse(res, 200, "Password changed successfully");
};
const forgotPassword = async (req, res) => {
  const result = await User.findOne({ email: req.body.email });
  if (!result) {
    throw new AppError(404, "Email not exist");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.deleteMany({ email: req.body.email });
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const result2 = await OTP.create({
    email: req.body.email,
    otp,
    expiresAt,
    verified: false,
  });

  const info = await sendMail(req.body.email, otp);

  if (info.accepted.length === 0) {
    throw new AppError(500, "Failed to send OTP");
  }
  return successResponse(res, 200, "OTP sent successfully");
};
const verifyOTP = async (req, res) => {
  const result = await OTP.findOne({
    otp: req.body.otp,
    email: req.body.email,
  });
  if (!result) {
    throw new AppError(404, "Invalid OTP");
  }
  if (result.expiresAt < new Date()) {
    throw new AppError(400, "OTP has expired");
  }

  result.verified = true;
  await result.save();

  return successResponse(res, 200, "OTP verified successfully");
};
const resetPassword = async (req, res) => {
  const result = await OTP.findOne({
    verified: true,
    email: req.body.email,
  });
  if (!result) {
    throw new AppError(404, "OTP not verified");
  }
  if (result.expiresAt < new Date()) {
    throw new AppError(404, "OTP has expired");
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  user.password = hash;
  await user.save();

  await OTP.deleteOne({ _id: result._id });

  return successResponse(res, 200, "password reset successfully");
};

module.exports = {
  login,
  register,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
