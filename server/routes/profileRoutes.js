const express = require("express");
const {
  getMyProfile,
  saveProfileImage,
  deleteProfileImage,
  updateMyProfile,
} = require("../controllers/profile/profileCtrl");
const upload = require("../middlewares/upload.middleware");
const profileUpdate = require("../validations/profileValidations");
const { validateRequest } = require("../validations/common.validation");

const profileRoutes = express.Router();

profileRoutes.get("/", getMyProfile);
profileRoutes.put("/update", validateRequest(profileUpdate), updateMyProfile);
profileRoutes.post("/image", upload.single("profileImage"), saveProfileImage);
profileRoutes.delete("/image", deleteProfileImage);

module.exports = profileRoutes;
