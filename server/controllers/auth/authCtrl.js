const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  errorResponse,
  successResponse,
  error500,
} = require("../../utils/response");
const OTP = require("../../models/OTP");
const sendMail = require("./sendMail");

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );
    if (!user) {
      return errorResponse(res, 404, "user not exist!");
    }
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return errorResponse(res, 401, "user not exist");
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
      status: true,
      statusCode: 200,
      message: "Login Successfull",
    });
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return errorResponse(res, 409, "user already exist!");
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
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "+password",
    );
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if (req.body.currentPassword === req.body.newPassword) {
      return errorResponse(
        res,
        409,
        "New password should not be the same as current password",
      );
    }
    const isMatched = await bcrypt.compare(
      req.body.currentPassword,
      user.password,
    );
    if (!isMatched) {
      return errorResponse(res, 401, "current password is incorrect");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.newPassword, salt);
    user.password = hash;
    await user.save();
    return successResponse(res, 200, "Password changed successfully");
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const forgotPassword = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email });
    if (!result) {
      return errorResponse(res, 404, "email not exist");
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
      return errorResponse(res, 500, "Failed to send OTP");
    }
    return successResponse(res, 200, "OTP sent successfully");
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const verifyOTP = async (req, res) => {
  try {
    const result = await OTP.findOne({
      otp: req.body.otp,
      email: req.body.email,
    });
    if (!result) {
      return errorResponse(res, 404, "invalid otp");
    }
    if (result.expiresAt < new Date()) {
      return errorResponse(res, 400, "OTP has expired");
    }

    result.verified = true;
    await result.save();

    return successResponse(res, 200, "OTP verified successfully");
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const resetPassword = async (req, res) => {
  try {
    const result = await OTP.findOne({
      verified: true,
      email: req.body.email,
    });
    if (!result) {
      return errorResponse(res, 404, "OTP not verified");
    }
    if (result.expiresAt < new Date()) {
      return errorResponse(res, 400, "OTP has expired");
    }

    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    user.password = hash;
    await user.save();

    await OTP.deleteOne({ _id: result._id });

    return successResponse(res, 200, "password reset successfully");
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};

module.exports = {
  login,
  register,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
