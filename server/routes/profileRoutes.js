const express = require("express");
const {
  getMyProfile,
  saveProfileImage,
  deleteProfileImage,
  updateMyProfile,
  changeEmail,
} = require("../controllers/profile/profileCtrl");
const upload = require("../middlewares/upload.middleware");
const { validateRequest } = require("../validations/common.validation");
const {
  profileUpdateValidation,
  changeEmailValidation,
} = require("../validations/profileValidations");
const profileRoutes = express.Router();

profileRoutes.get("/", getMyProfile);
profileRoutes.put(
  "/update",
  validateRequest(profileUpdateValidation),
  updateMyProfile,
);
profileRoutes.put(
  "/update-email",
  validateRequest(changeEmailValidation),
  changeEmail,
);
profileRoutes.post("/image", upload.single("profileImage"), saveProfileImage);
profileRoutes.delete("/image", deleteProfileImage);

module.exports = profileRoutes;
