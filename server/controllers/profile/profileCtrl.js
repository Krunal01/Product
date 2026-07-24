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
const updateMyProfile = async (req, res) => {
  try {
    const { fullname, gender, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    user.fullname = fullname;
    user.gender = gender;
    user.phone = phone;

    await user.save();

    return successResponse(res, 200, "Profile updated successfully.", user);
  } catch (error) {
    return errorResponse(res, 500, error500(error));
  }
};
const changeEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;

    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if (user.email === newEmail) {
      return errorResponse(
        res,
        400,
        "New email must be different from the current email",
      );
    }

    const userExist = await User.findOne({
      email: newEmail,
      _id: { $ne: req.user._id },
    });

    if (userExist) {
      return errorResponse(res, 409, "Email Already Exist!");
    }

    user.email = newEmail;

    await user.save();

    return successResponse(res, 200, "Email updated successfully");
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

module.exports = {
  getMyProfile,
  changeEmail,
  updateMyProfile,
  saveProfileImage,
  deleteProfileImage,
};
