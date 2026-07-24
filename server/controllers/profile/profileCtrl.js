const { v2 } = require("cloudinary");
const User = require("../../models/User");
const {
  error500,
  errorResponse,
  successResponse,
} = require("../../utils/response");

const getMyProfile = async (req, res) => {
  try {
    const myData = await User.findById(req.user._id).lean();
    if (!myData) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, "User profile data fetched", myData);
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const saveProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 400, "please upload an image");
    }
    const user = await User.findById(req.user.id).select(
      "profileImageUrl profileImagePublicId",
    );
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if (user.profileImagePublicId) {
      const result = await v2.uploader.destroy(user.profileImagePublicId);
      if (result.result !== "ok" && result.result !== "not found") {
        return errorResponse(
          res,
          500,
          "some error occured in profile image save.",
        );
      }
    }

    user.profileImageUrl = req.file.path;
    user.profileImagePublicId = req.file.filename;
    await user.save();
    return successResponse(res, 200, "Profile image saved successfully.", user);
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "profileImageUrl profileImagePublicId",
    );

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (!user.profileImagePublicId) {
      return errorResponse(res, 400, "No profile image found");
    }

    const result = await v2.uploader.destroy(user.profileImagePublicId);

    if (result.result !== "ok" && result.result !== "not found") {
      return errorResponse(
        res,
        500,
        "some error occured in profile image delete.",
      );
    }

    user.profileImageUrl = null;
    user.profileImagePublicId = null;

    await user.save();

    return successResponse(
      res,
      200,
      "Profile image deleted successfully.",
      user,
    );
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};

module.exports = { getMyProfile, saveProfileImage, deleteProfileImage };
