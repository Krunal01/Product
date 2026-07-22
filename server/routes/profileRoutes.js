const express = require("express");
const { getMyProfile } = require("../controllers/profile/profileCtrl");

const profileRoutes = express.Router();

profileRoutes.get("/", getMyProfile);

module.exports = profileRoutes;
