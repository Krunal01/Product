const express = require("express");
const {
  getMyProfile,
  saveProfileImage,
  deleteProfileImage,
} = require("../controllers/profile/profileCtrl");
const upload = require("../middlewares/upload.middleware");

const profileRoutes = express.Router();

profileRoutes.get("/", getMyProfile);
profileRoutes.post("/image", upload.single("profileImage"), saveProfileImage);
profileRoutes.delete("/image", deleteProfileImage);

module.exports = profileRoutes;
