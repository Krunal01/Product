const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorResponse } = require("../../utils/response");

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
    errorResponse(res, 500, error?.error || error?.message || "Network Error");
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
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const response = await User.create(newUser);
    const userObj = response.toObject();
    delete userObj.password;
    return res.status(201).json({
      message: "user registered successfully",
      status: true,
      statusCode: 201,
      data: userObj,
    });
  } catch (error) {
    errorResponse(res, 500, error?.error || error?.message || "Network Error");
  }
};

module.exports = { login, register };
