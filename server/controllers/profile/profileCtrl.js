const { v2 } = require("cloudinary");
const User = require("../../models/User");
const { successResponse } = require("../../utils/response");
const AppError = require("../../utils/AppError");

const getMyProfile = async (req, res) => {
  const myData = await User.findById(req.user._id).lean();
  if (!myData) {
    throw new AppError(404, "User not found");
  }
  return successResponse(res, 200, "User profile data fetched", myData);
};
const updateMyProfile = async (req, res) => {
  const { fullname, gender, phone } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  user.fullname = fullname;
  user.gender = gender;
  user.phone = phone;

  await user.save();

  return successResponse(res, 200, "Profile updated successfully.", user);
};
const changeEmail = async (req, res) => {
  const { newEmail } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (user.email === newEmail) {
    throw new AppError(
      400,
      "New email must be different from the current email",
    );
  }

  const userExist = await User.findOne({
    email: newEmail,
    _id: { $ne: req.user._id },
  });

  if (userExist) {
    throw new AppError(409, "Email Already Exist!");
  }

  user.email = newEmail;

  await user.save();

  return successResponse(res, 200, "Email updated successfully");
};
const saveProfileImage = async (req, res) => {
  if (!req.file) {
    throw new AppError(400, "please upload an image");
  }
  const user = await User.findById(req.user.id).select(
    "profileImageUrl profileImagePublicId",
  );
  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (user.profileImagePublicId) {
    const result = await v2.uploader.destroy(user.profileImagePublicId);
    if (result.result !== "ok" && result.result !== "not found") {
      throw new AppError(500, "some error occured in profile image save.");
    }
  }

  user.profileImageUrl = req.file.path;
  user.profileImagePublicId = req.file.filename;

  await user.save();
  return successResponse(res, 200, "Profile image saved successfully.", user);
};
const deleteProfileImage = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "profileImageUrl profileImagePublicId",
  );

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.profileImagePublicId) {
    throw new AppError(400, "No profile image found");
  }

  const result = await v2.uploader.destroy(user.profileImagePublicId);

  if (result.result !== "ok" && result.result !== "not found") {
    throw new AppError(500, "some error occured in profile image delete.");
  }

  user.profileImageUrl = null;
  user.profileImagePublicId = null;

  await user.save();

  return successResponse(res, 200, "Profile image deleted successfully.", user);
};

module.exports = {
  getMyProfile,
  changeEmail,
  updateMyProfile,
  saveProfileImage,
  deleteProfileImage,
};
